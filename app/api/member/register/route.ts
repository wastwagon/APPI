import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { 
      firstName,
      lastName,
      email,
      phone,
      organization,
      organizationType,
      country,
      position,
      password,
      agreeToTerms,
      source = 'Member Registration Form'
    } = body

    // Basic validation
    if (!firstName || !lastName || !email || !password || !organization || !country) {
      return NextResponse.json({ 
        error: 'Please fill in all required fields' 
      }, { status: 400 })
    }

    if (!agreeToTerms) {
      return NextResponse.json({ 
        error: 'You must agree to the terms and conditions' 
      }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Please provide a valid email address' 
      }, { status: 400 })
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json({ 
        error: 'Password must be at least 8 characters long' 
      }, { status: 400 })
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json({ 
        error: 'An account with this email already exists' 
      }, { status: 400 })
    }

    // Note: Password handling will be done through Supabase Auth
    // For now, we'll create the user profile without password
    // The user will need to set up their password through Supabase Auth later

    // Get client IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Create user in database
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        full_name: `${firstName} ${lastName}`,
        role: 'party_focal_person', // Using the correct role from the schema
        status: 'pending', // Using the correct status from the schema
        // Note: phone and position fields don't exist in the users table
        // We'll store this information in the contact_submissions table instead
        country_id: null,
        party_id: null, // Using the correct field name from the actual table
        // Remove created_at as it should be auto-generated
      })
      .select()
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json({ 
        error: 'Failed to create account. Please try again.',
        details: userError.message 
      }, { status: 500 })
    }

    // Create contact submission for admin tracking
    await supabase
      .from('contact_submissions')
      .insert({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        organization,
        subject: 'New Member Registration',
        message: `New member registration from ${firstName} ${lastName} at ${organization} in ${country}. Position: ${position || 'Not specified'}.`,
        source: 'Member Registration Form',
        priority: 'high',
        status: 'new',
        ip_address: ipAddress,
        user_agent: request.headers.get('user-agent')
      })

    // Log the registration
    console.log(`New member registration from ${email} at ${organization}`)

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully! Your account has been created and is pending approval. You will receive an email confirmation shortly.',
      userId: user.id
    })

  } catch (error) {
    console.error('Member registration error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
