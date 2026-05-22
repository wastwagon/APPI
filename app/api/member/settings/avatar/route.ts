import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const formData = await request.formData()
    
    const userId = formData.get('userId') as string
    const image = formData.get('image') as File

    if (!userId || !image) {
      return NextResponse.json({ 
        error: 'User ID and image are required' 
      }, { status: 400 })
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json({ 
        error: 'File must be an image' 
      }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'Image size must be less than 5MB' 
      }, { status: 400 })
    }

    // Generate unique filename
    const fileExtension = image.name.split('.').pop()
    const fileName = `avatars/${userId}/${Date.now()}.${fileExtension}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('member-avatars')
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return NextResponse.json({ 
        error: 'Failed to upload avatar',
        details: uploadError.message 
      }, { status: 500 })
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('member-avatars')
      .getPublicUrl(fileName)

    // Update user record with new avatar URL
    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating user avatar:', updateError)
      return NextResponse.json({ 
        error: 'Failed to update user avatar',
        details: updateError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar_url: publicUrl,
      user
    })

  } catch (error) {
    console.error('Error uploading avatar:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
