import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const sessionToken = request.cookies.get('admin_session')?.value

    if (sessionToken) {
      // Delete session from database
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken)

      // Create audit log entry
      const { data: session } = await supabase
        .from('admin_sessions')
        .select('admin_user_id')
        .eq('session_token', sessionToken)
        .single()

      if (session?.admin_user_id) {
        await supabase
          .from('audit_log_entries')
          .insert({
            admin_user_id: session.admin_user_id,
            action: 'logout',
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            user_agent: request.headers.get('user-agent')
          })
      }
    }

    const response = NextResponse.json({
      message: 'Logout successful'
    })

    // Clear session cookie
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
