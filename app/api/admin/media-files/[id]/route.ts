import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()
    const { id } = params

    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .select(`
        *,
        uploader:users!media_files_uploaded_by_fkey(
          full_name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching media file:', error)
      return NextResponse.json({
        error: 'Media file not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      mediaFile
    })

  } catch (error) {
    console.error('Error in media file API:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()
    const { id } = params
    const body = await request.json()

    const { category, description, tags, is_public } = body

    const updateData: any = {}
    if (category !== undefined) updateData.category = category
    if (description !== undefined) updateData.description = description
    if (tags !== undefined) updateData.tags = tags
    if (is_public !== undefined) updateData.is_public = is_public

    const { data: mediaFile, error } = await supabase
      .from('media_files')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating media file:', error)
      return NextResponse.json({
        error: 'Failed to update media file',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Media file updated successfully',
      mediaFile
    })

  } catch (error) {
    console.error('Error updating media file:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()
    const { id } = params

    // Get the file path before deleting
    const { data: mediaFile, error: fetchError } = await supabase
      .from('media_files')
      .select('file_path')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching media file:', fetchError)
      return NextResponse.json({
        error: 'Media file not found'
      }, { status: 404 })
    }

    // Delete from storage (try multiple buckets)
    const buckets = ['media-files', 'member-avatars', 'verification-documents', 'admin-uploads', 'temp-uploads']
    let storageError = null

    for (const bucket of buckets) {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([mediaFile.file_path])
      
      if (!error) {
        break // File found and deleted
      }
      storageError = error
    }

    if (storageError) {
      console.error('Error deleting from storage:', storageError)
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id)

    if (dbError) {
      console.error('Error deleting media file:', dbError)
      return NextResponse.json({
        error: 'Failed to delete media file',
        details: dbError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Media file deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting media file:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
