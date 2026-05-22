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
    
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.ilike('email', `%${search}%`)
    }

    if (status !== 'all') {
      if (status === 'active') {
        query = query.eq('is_active', true)
      } else if (status === 'inactive') {
        query = query.eq('is_active', false)
      }
    }

    // Apply pagination
    query = query
      .order('subscribed_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: subscriptions, error, count } = await query

    if (error) {
      console.error('Error fetching newsletter subscriptions:', error)
      return NextResponse.json({
        error: 'Failed to fetch newsletter subscriptions'
      }, { status: 500 })
    }

    return NextResponse.json({
      subscriptions: subscriptions || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      }
    })

  } catch (error) {
    console.error('Newsletter subscriptions fetch error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { id, is_active, language } = body

    if (!id) {
      return NextResponse.json({
        error: 'Subscription ID is required'
      }, { status: 400 })
    }

    const updateData: any = {}
    if (typeof is_active === 'boolean') {
      updateData.is_active = is_active
      if (!is_active) {
        updateData.unsubscribed_at = new Date().toISOString()
      } else {
        updateData.unsubscribed_at = null
      }
    }
    if (language) {
      updateData.language = language
    }

    const { data: subscription, error } = await supabase
      .from('newsletter_subscriptions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating newsletter subscription:', error)
      return NextResponse.json({
        error: 'Failed to update subscription'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      subscription
    })

  } catch (error) {
    console.error('Newsletter subscription update error:', error)
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
        error: 'Subscription ID is required'
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting newsletter subscription:', error)
      return NextResponse.json({
        error: 'Failed to delete subscription'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully'
    })

  } catch (error) {
    console.error('Newsletter subscription delete error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
