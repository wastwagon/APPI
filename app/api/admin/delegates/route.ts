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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit
    
    // Build the query - delegates are users with specific roles
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
    
    // Filter for delegate roles (fellow, platform_collaborator)
    query = query.in('role', ['fellow', 'platform_collaborator'])
    
    // Apply additional filters
    if (role && role !== 'all') {
      query = query.eq('role', role)
    }
    
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }
    
    // Apply pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })
    
    const { data: delegates, error, count } = await query

    if (error) {
      console.error('Error fetching delegates:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch delegates' 
      }, { status: 500 })
    }

    // Transform the data to match the frontend interface
    const transformedDelegates = delegates?.map(delegate => ({
      id: delegate.id,
      full_name: delegate.full_name || 'Unknown',
      email: delegate.email,
      role: delegate.role,
      status: delegate.status || 'pending_approval',
      party_id: delegate.party_id || null,
      country_id: delegate.country_id || null,
      avatar_url: delegate.avatar_url || null,
      created_at: delegate.created_at,
      updated_at: delegate.updated_at || null
    })) || []

    return NextResponse.json({
      delegates: transformedDelegates,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Error in delegates API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { email, full_name, role, party_id, country_id } = body

    if (!email || !full_name || !role) {
      return NextResponse.json({ 
        error: 'Email, full name, and role are required' 
      }, { status: 400 })
    }

    // Validate role is a delegate role
    if (!['fellow', 'platform_collaborator'].includes(role)) {
      return NextResponse.json({ 
        error: 'Role must be fellow or platform_collaborator' 
      }, { status: 400 })
    }

    const { data: delegate, error } = await supabase
      .from('users')
      .insert({
        email,
        full_name,
        role,
        status: 'pending_approval',
        party_id: party_id || null,
        country_id: country_id || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating delegate:', error)
      return NextResponse.json({ 
        error: 'Failed to create delegate' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Delegate created successfully',
      delegate
    })

  } catch (error) {
    console.error('Error creating delegate:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { delegateId, status, role } = body

    if (!delegateId) {
      return NextResponse.json({ 
        error: 'Delegate ID is required' 
      }, { status: 400 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (role) {
      // Validate role is a delegate role
      if (!['fellow', 'platform_collaborator'].includes(role)) {
        return NextResponse.json({ 
          error: 'Role must be fellow or platform_collaborator' 
        }, { status: 400 })
      }
      updateData.role = role
    }

    const { data: delegate, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', delegateId)
      .in('role', ['fellow', 'platform_collaborator'])
      .select()
      .single()

    if (error) {
      console.error('Error updating delegate:', error)
      return NextResponse.json({ 
        error: 'Failed to update delegate' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Delegate updated successfully',
      delegate
    })

  } catch (error) {
    console.error('Error updating delegate:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { delegateId } = body

    if (!delegateId) {
      return NextResponse.json({ 
        error: 'Delegate ID is required' 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', delegateId)
      .in('role', ['fellow', 'platform_collaborator'])

    if (error) {
      console.error('Error deleting delegate:', error)
      return NextResponse.json({ 
        error: 'Failed to delete delegate' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Delegate deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting delegate:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
