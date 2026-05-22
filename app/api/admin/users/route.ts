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
    
    // Build the query - use admin_users table
    let query = supabase
      .from('admin_users')
      .select('*', { count: 'exact' })
    
    // Apply filters
    if (role && role !== 'all') {
      query = query.eq('role', role)
    }
    
    if (status && status !== 'all') {
      query = query.eq('is_active', status === 'active')
    }
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }
    
    // Apply pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })
    
    const { data: users, error, count } = await query

    if (error) {
      console.error('Error fetching admin users:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch admin users' 
      }, { status: 500 })
    }

    return NextResponse.json({
      users: users || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Error in admin users API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { email, full_name, role, permissions } = body

    if (!email || !full_name) {
      return NextResponse.json({ 
        error: 'Email and full name are required' 
      }, { status: 400 })
    }

    // Create admin user in the admin_users table
    const { data: user, error } = await supabase
      .from('admin_users')
      .insert({
        email,
        full_name,
        role: role || 'admin',
        is_active: true,
        permissions: permissions || {},
        password_hash: 'temp_hash', // This should be properly hashed in production
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating admin user:', error)
      return NextResponse.json({ 
        error: `Failed to create admin user: ${error.message}` 
      }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Admin user created successfully',
      user
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { userId, is_active, role, permissions } = body

    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 })
    }

    const updateData: any = {}
    if (is_active !== undefined) updateData.is_active = is_active
    if (role) updateData.role = role
    if (permissions) updateData.permissions = permissions

    const { data: user, error } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating admin user:', error)
      return NextResponse.json({ 
        error: 'Failed to update admin user' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user updated successfully',
      user
    })

  } catch (error) {
    console.error('Error updating admin user:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', userId)

    if (error) {
      console.error('Error deleting admin user:', error)
      return NextResponse.json({ 
        error: 'Failed to delete admin user' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting admin user:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
