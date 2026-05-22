import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { email, password } = body

    // Get admin user from database
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError || !adminUser) {
      return NextResponse.json({ 
        error: 'User not found',
        details: userError
      }, { status: 404 })
    }

    // Test password verification
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)
    
    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(password, 12)

    return NextResponse.json({
      userFound: true,
      passwordValid: isValidPassword,
      storedHash: adminUser.password_hash,
      newHash: newHash,
      passwordLength: password.length,
      hashComparison: adminUser.password_hash === newHash
    })

  } catch (error) {
    console.error('Password test error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
