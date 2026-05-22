import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get basic statistics
    const { data: stats, error } = await supabase
      .from('media_files')
      .select('file_size, mime_type')

    if (error) {
      console.error('Error fetching media files stats:', error)
      return NextResponse.json({
        error: 'Failed to fetch media files statistics'
      }, { status: 500 })
    }

    // Calculate statistics
    const totalFiles = stats?.length || 0
    const totalSize = stats?.reduce((sum, file) => sum + (file.file_size || 0), 0) || 0
    
    // Count by file type
    const imageCount = stats?.filter(file => file.mime_type?.startsWith('image/')).length || 0
    const videoCount = stats?.filter(file => file.mime_type?.startsWith('video/')).length || 0
    const audioCount = stats?.filter(file => file.mime_type?.startsWith('audio/')).length || 0
    const documentCount = stats?.filter(file => 
      file.mime_type?.includes('pdf') || 
      file.mime_type?.includes('document') ||
      file.mime_type?.includes('text')
    ).length || 0

    // Format file sizes
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formattedStats = {
      total_files: totalFiles,
      total_size: totalSize,
      total_size_formatted: formatFileSize(totalSize),
      image_count: imageCount,
      video_count: videoCount,
      document_count: documentCount,
      audio_count: audioCount,
      total_downloads: 0, // Not tracked in current schema
      category_distribution: {} // Not tracked in current schema
    }

    return NextResponse.json({
      stats: formattedStats
    })

  } catch (error) {
    console.error('Error in media files stats API:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
