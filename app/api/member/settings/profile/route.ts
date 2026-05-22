import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { userId, full_name, email, phone, position, organization, bio, party_id } = body

    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 })
    }

    const updateData: any = {}
    if (full_name) updateData.full_name = full_name
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (position) updateData.position = position
    if (organization) updateData.organization = organization
    if (bio) updateData.bio = bio
    if (party_id !== undefined) updateData.party_id = party_id || null
    updateData.updated_at = new Date().toISOString()

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return NextResponse.json({ 
        error: 'Failed to update profile',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user
    })

  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
