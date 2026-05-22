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
      position,
      country,
      dietaryRestrictions,
      specialRequirements,
      source = 'Summit Registration Form'
    } = body

    // Basic validation
    if (!firstName || !lastName || !email || !organization || !country) {
      return NextResponse.json({ 
        error: 'Please fill in all required fields' 
      }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Please provide a valid email address' 
      }, { status: 400 })
    }

    // Get client IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Create contact submission
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        organization,
        subject: 'APP Summit Registration',
        message: `Summit Registration Details:
Name: ${firstName} ${lastName}
Organization: ${organization}
Position: ${position || 'Not specified'}
Country: ${country}
Dietary Restrictions: ${dietaryRestrictions || 'None'}
Special Requirements: ${specialRequirements || 'None'}`,
        source: 'Summit Registration Form',
        priority: 'high',
        status: 'new',
        ip_address: ipAddress,
        user_agent: request.headers.get('user-agent')
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to submit summit registration. Please try again.' 
      }, { status: 500 })
    }

    // Log the summit registration
    console.log(`New summit registration from ${firstName} ${lastName} at ${organization}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for registering for the APP Summit! You will receive a confirmation email with event details within 24 hours.',
      submissionId: submission.id
    })

  } catch (error) {
    console.error('Summit registration error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
