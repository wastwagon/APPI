import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build the query with user information
    let query = supabase
      .from('media_files')
      .select(`
        *,
        uploader:users!media_files_uploaded_by_fkey(
          full_name,
          email
        )
      `, { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`filename.ilike.%${search}%,original_name.ilike.%${search}%`)
    }

    // Apply pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    const { data: mediaFiles, error, count } = await query

    if (error) {
      console.error('Error fetching media files:', error)
      return NextResponse.json({
        error: 'Failed to fetch media files'
      }, { status: 500 })
    }

    // Generate public URLs for each file
    const mediaFilesWithUrls = await Promise.all((mediaFiles || []).map(async file => {
      // Determine file type from MIME type
      const fileType = file.mime_type?.startsWith('image/') ? 'image' :
                      file.mime_type?.startsWith('video/') ? 'video' :
                      file.mime_type?.startsWith('audio/') ? 'audio' : 'document'
      
      // Try to get public URL from the appropriate bucket
      const buckets = ['media-files', 'member-avatars', 'verification-documents', 'admin-uploads', 'temp-uploads']
      let publicUrl = null
      
      for (const bucket of buckets) {
        try {
          // Clean up the file path - remove leading slash and handle different path formats
          let cleanPath = file.file_path
          if (cleanPath.startsWith('/')) {
            cleanPath = cleanPath.substring(1)
          }
          
          // If the path doesn't match our expected format, try to find it in the images folder
          if (!cleanPath.startsWith('images/') && file.mime_type?.startsWith('image/')) {
            // Try to find the file in the images folder
            const { data: files } = await supabase.storage
              .from(bucket)
              .list('images', { limit: 100 })
            
            if (files) {
              const matchingFile = files.find(f => 
                f.name.includes(file.filename) || 
                f.name.includes(file.original_name?.split('.')[0])
              )
              if (matchingFile) {
                cleanPath = `images/${matchingFile.name}`
              }
            }
          }
          
          const { data: { publicUrl: url } } = supabase.storage
            .from(bucket)
            .getPublicUrl(cleanPath)
          
          // Test if the URL is accessible
          const response = await fetch(url, { method: 'HEAD' })
          if (response.ok) {
            publicUrl = url
            break
          }
        } catch (e) {
          // Continue to next bucket
        }
      }

      return {
        ...file,
        public_url: publicUrl,
        file_type: fileType
      }
    }))

    return NextResponse.json({
      mediaFiles: mediaFilesWithUrls,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Error in media files API:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const formData = await request.formData()

    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const tags = formData.get('tags') as string
    const isPublic = formData.get('isPublic') === 'true'

    if (!file) {
      return NextResponse.json({
        error: 'File is required'
      }, { status: 400 })
    }

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({
        error: 'File size must be less than 50MB'
      }, { status: 400 })
    }

    // Determine file type and storage bucket
    const mimeType = file.type
    let fileType = 'document'
    let storageBucket = 'media-files'
    
    if (mimeType.startsWith('image/')) {
      fileType = 'image'
      storageBucket = 'media-files'
    } else if (mimeType.startsWith('video/')) {
      fileType = 'video'
      storageBucket = 'media-files'
    } else if (mimeType.startsWith('audio/')) {
      fileType = 'audio'
      storageBucket = 'media-files'
    } else if (mimeType.includes('pdf') || mimeType.includes('document')) {
      fileType = 'document'
      storageBucket = 'media-files'
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`
    const filePath = `${fileType}s/${fileName}`

    // Upload to appropriate Supabase Storage bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(storageBucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({
        error: 'Failed to upload file',
        details: uploadError.message
      }, { status: 500 })
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(storageBucket)
      .getPublicUrl(filePath)

    // Save to database using existing schema
    const { data: mediaFile, error: dbError } = await supabase
      .from('media_files')
      .insert({
        filename: fileName,
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: mimeType,
        uploaded_by: null // Will be set when we have admin user context
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving media file:', dbError)
      return NextResponse.json({
        error: 'Failed to save media file',
        details: dbError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      mediaFile: {
        ...mediaFile,
        public_url: publicUrl,
        file_type: fileType
      }
    })

  } catch (error) {
    console.error('Error uploading media file:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
