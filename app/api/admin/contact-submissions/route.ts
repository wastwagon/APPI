import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const priority = searchParams.get('priority') || 'all'
    
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('contact_submissions')
      .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`)
    }

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    if (priority !== 'all') {
      query = query.eq('priority', priority)
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: submissions, error, count } = await query

    if (error) {
      console.error('Error fetching contact submissions:', error)
      return NextResponse.json({
        error: 'Failed to fetch contact submissions'
      }, { status: 500 })
    }

    return NextResponse.json({
      submissions: submissions || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Contact submissions fetch error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { id, status, priority, notes } = body

    if (!id) {
      return NextResponse.json({
        error: 'Submission ID is required'
      }, { status: 400 })
    }

    const updateData: any = {}
    if (status) {
      updateData.status = status
      if (status === 'responded') {
        updateData.updated_at = new Date().toISOString()
      }
    }
    if (priority) {
      updateData.priority = priority
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact submission:', error)
      return NextResponse.json({
        error: 'Failed to update submission'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      submission
    })

  } catch (error) {
    console.error('Contact submission update error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { id } = body

    if (!id) {
      return NextResponse.json({
        error: 'Submission ID is required'
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact submission:', error)
      return NextResponse.json({
        error: 'Failed to delete submission'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully'
    })

  } catch (error) {
    console.error('Contact submission delete error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
