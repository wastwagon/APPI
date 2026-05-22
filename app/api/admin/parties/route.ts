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
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit
    
    // Build the query
    let query = supabase
      .from('political_parties')
      .select('*', { count: 'exact' })
    
    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%`)
    }
    
    // Apply pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })
    
    const { data: parties, error, count } = await query

    if (error) {
      console.error('Error fetching parties:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch parties' 
      }, { status: 500 })
    }

    return NextResponse.json({
      parties: parties || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Error in parties API:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { name, abbreviation, description, country_id, status } = body

    if (!name || !abbreviation) {
      return NextResponse.json({ 
        error: 'Name and abbreviation are required' 
      }, { status: 400 })
    }

    const { data: party, error } = await supabase
      .from('political_parties')
      .insert({
        name,
        abbreviation,
        description: description || null,
        country_id: country_id || null,
        status: status || 'active'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating party:', error)
      return NextResponse.json({ 
        error: 'Failed to create party' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Party created successfully',
      party
    })

  } catch (error) {
    console.error('Error creating party:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { partyId, name, abbreviation, description, country_id, status } = body

    if (!partyId) {
      return NextResponse.json({ 
        error: 'Party ID is required' 
      }, { status: 400 })
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (abbreviation) updateData.abbreviation = abbreviation
    if (description !== undefined) updateData.description = description
    if (country_id !== undefined) updateData.country_id = country_id
    if (status) updateData.status = status

    const { data: party, error } = await supabase
      .from('political_parties')
      .update(updateData)
      .eq('id', partyId)
      .select()
      .single()

    if (error) {
      console.error('Error updating party:', error)
      return NextResponse.json({ 
        error: 'Failed to update party' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Party updated successfully',
      party
    })

  } catch (error) {
    console.error('Error updating party:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const partyId = searchParams.get('id')

    if (!partyId) {
      return NextResponse.json({ 
        error: 'Party ID is required' 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('political_parties')
      .delete()
      .eq('id', partyId)

    if (error) {
      console.error('Error deleting party:', error)
      return NextResponse.json({ 
        error: 'Failed to delete party' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Party deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting party:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
