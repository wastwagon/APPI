import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    // Build the query
    let query = supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        role,
        status,
        party_id,
        country_id,
        avatar_url,
        created_at,
        updated_at
      `)
      .eq('role', 'party_focal_person') // Only get members (party focal persons)
    
    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }
    
    // Order by creation date (newest first)
    query = query.order('created_at', { ascending: false })
    
    const { data: members, error } = await query

    if (error) {
      console.error('Error fetching members:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch members' 
      }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedMembers = members?.map(member => ({
      id: member.id,
      name: member.full_name || 'Unknown',
      email: member.email,
      role: member.role,
      status: member.status || 'pending_approval',
      party: member.party_id ? `Party ID: ${member.party_id}` : 'No party affiliation',
      country: member.country_id ? `Country ID: ${member.country_id}` : 'Unknown',
      city: 'Unknown', // users table doesn't have city
      phone: 'No phone', // users table doesn't have phone
      position: 'No position', // users table doesn't have position
      lastLogin: 'Never', // users table doesn't have last_login
      joinedDate: new Date(member.created_at).toLocaleDateString(),
      accessLevel: member.status === 'verified' ? 'Full Access' : 'Pending Approval',
      organization: member.party_id ? `Party ID: ${member.party_id}` : 'No organization',
      organizationType: 'Not specified'
    })) || []

    return NextResponse.json({
      members: transformedMembers,
      total: transformedMembers.length
    })

  } catch (error) {
    console.error('Error in members API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { memberId, status, role, name, email, organization, party_id } = body

    if (!memberId) {
      return NextResponse.json({ 
        error: 'Member ID is required' 
      }, { status: 400 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (role) updateData.role = role
    if (name) updateData.full_name = name
    if (email) updateData.email = email
    if (party_id !== undefined) updateData.party_id = party_id || null
    updateData.updated_at = new Date().toISOString()

    const { data: member, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', memberId)
      .eq('role', 'party_focal_person')
      .select()
      .single()

    if (error) {
      console.error('Error updating member:', error)
      return NextResponse.json({ 
        error: 'Failed to update member',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member updated successfully',
      member
    })

  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('id')

    if (!memberId) {
      return NextResponse.json({ 
        error: 'Member ID is required' 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', memberId)
      .eq('role', 'party_focal_person')

    if (error) {
      console.error('Error deleting member:', error)
      return NextResponse.json({ 
        error: 'Failed to delete member' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
