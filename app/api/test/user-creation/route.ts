import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    const body = await request.json()
    const { email, password, full_name, role } = body

    console.log('Creating test user:', { email, full_name, role })

    // Step 1: Create user in Auth
    const { data: authData, error: createAuthError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        role: role || 'public',
      },
      app_metadata: {
        role: role || 'public',
      },
    })

    if (createAuthError) {
      console.error('Auth creation error:', createAuthError)
      return NextResponse.json({ 
        error: `Auth creation failed: ${createAuthError.message}`,
        details: createAuthError
      }, { status: 400 })
    }

    console.log('Auth user created:', authData.user?.id)

    // Step 2: Check if profile was auto-created by trigger
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user?.id)
      .single()

    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error('Profile check error:', profileCheckError)
      return NextResponse.json({ 
        error: `Profile check failed: ${profileCheckError.message}`,
        details: profileCheckError
      }, { status: 500 })
    }

    if (existingProfile) {
      console.log('Profile already exists (created by trigger):', existingProfile)
      
      // Update the existing profile with additional data
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: full_name || existingProfile.full_name,
          role: role || existingProfile.role,
        })
        .eq('id', authData.user?.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        return NextResponse.json({ 
          error: `Profile update failed: ${updateError.message}`,
          details: updateError
        }, { status: 500 })
      }

      return NextResponse.json({
        message: 'User created successfully (profile auto-created by trigger)',
        user: {
          id: authData.user?.id,
          email: authData.user?.email,
          full_name,
          role: role || 'public',
        },
        profile: existingProfile,
      })
    } else {
      console.log('No existing profile found, creating one manually')
      
      // Step 3: Create profile manually
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user?.id,
          email: authData.user?.email,
          full_name: full_name || null,
          role: role || 'public',
        })

      if (profileError) {
        console.error('Profile creation error:', profileError)
        
        // Try to delete the auth user if profile creation fails
        try {
          await supabase.auth.admin.deleteUser(authData.user?.id!)
        } catch (deleteError) {
          console.error('Failed to delete auth user after profile creation failure:', deleteError)
        }
        
        return NextResponse.json({ 
          error: `Profile creation failed: ${profileError.message}`,
          details: profileError
        }, { status: 500 })
      }

      return NextResponse.json({
        message: 'User created successfully (profile created manually)',
        user: {
          id: authData.user?.id,
          email: authData.user?.email,
          full_name,
          role: role || 'public',
        },
      })
    }
  } catch (error) {
    console.error('Error in test user creation:', error)
    return NextResponse.json(
      { 
        error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error
      },
      { status: 500 }
    )
  }
}
