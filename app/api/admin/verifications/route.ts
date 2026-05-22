import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit
    
    // Build the query with user information
    let query = supabase
      .from('verification_requests')
      .select(`
        *,
        user:users!verification_requests_user_id_fkey(
          full_name,
          email,
          role
        )
      `, { count: 'exact' })
    
    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (search) {
      query = query.or(`user.full_name.ilike.%${search}%,user.email.ilike.%${search}%,national_id.ilike.%${search}%`)
    }
    
    // Apply pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('submitted_at', { ascending: false })
    
    const { data: verifications, error, count } = await query

    if (error) {
      console.error('Error fetching verifications:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch verifications' 
      }, { status: 500 })
    }

    return NextResponse.json({
      verifications: verifications || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Error in verifications API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
