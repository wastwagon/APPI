import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()
    const { id } = params

    // Get the media file details
    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching media file:', error)
      return NextResponse.json({
        error: 'Media file not found'
      }, { status: 404 })
    }

    // Try to get public URL from different buckets
    const buckets = ['media-files', 'member-avatars', 'verification-documents', 'admin-uploads', 'temp-uploads']
    let downloadUrl = null

    for (const bucket of buckets) {
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(mediaFile.file_path)
      
      // Test if the URL is accessible
      try {
        const response = await fetch(publicUrl, { method: 'HEAD' })
        if (response.ok) {
          downloadUrl = publicUrl
          break
        }
      } catch (e) {
        // Continue to next bucket
      }
    }

    if (!downloadUrl) {
      return NextResponse.json({
        error: 'File not found in storage'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl,
      fileName: mediaFile.original_name || mediaFile.filename
    })

  } catch (error) {
    console.error('Error in download API:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
