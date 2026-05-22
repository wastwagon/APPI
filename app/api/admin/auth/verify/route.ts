import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get session token from cookie
    const sessionToken = request.cookies.get('admin_session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ 
        error: 'No session found' 
      }, { status: 401 })
    }

    // Verify session in database
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        admin_users (
          id,
          email,
          full_name,
          role,
          permissions
        )
      `)
      .eq('session_token', sessionToken)
      .eq('expires_at', 'gt', new Date().toISOString())
      .single()

    if (error || !session) {
      return NextResponse.json({ 
        error: 'Invalid or expired session' 
      }, { status: 401 })
    }

    return NextResponse.json({
      user: session.admin_users
    })

  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
