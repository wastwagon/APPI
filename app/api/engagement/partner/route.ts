import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { 
      organizationName,
      contactName,
      email,
      phone,
      website,
      partnershipType,
      description,
      goals,
      source = 'Partner Engagement Form'
    } = body

    // Basic validation
    if (!organizationName || !contactName || !email || !partnershipType) {
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
        name: contactName,
        email,
        phone,
        organization: organizationName,
        subject: `Partnership Inquiry - ${partnershipType}`,
        message: `Organization: ${organizationName}
Website: ${website || 'Not provided'}
Partnership Type: ${partnershipType}
Description: ${description || 'Not provided'}
Goals: ${goals || 'Not provided'}`,
        source: 'Partner Engagement Form',
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
        error: 'Failed to submit partnership inquiry. Please try again.' 
      }, { status: 500 })
    }

    // Log the partnership inquiry
    console.log(`New partnership inquiry from ${organizationName} via ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your partnership inquiry! We will review your request and get back to you within 3-5 business days.',
      submissionId: submission.id
    })

  } catch (error) {
    console.error('Partnership inquiry error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
