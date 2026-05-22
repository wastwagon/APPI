import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { 
      partyName,
      contactName,
      email,
      phone,
      country,
      partyType,
      memberCount,
      interests,
      message,
      source = 'Political Party Engagement Form'
    } = body

    // Basic validation
    if (!partyName || !contactName || !email || !country) {
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
        organization: partyName,
        subject: `Political Party Engagement - ${partyName}`,
        message: `Party Name: ${partyName}
Country: ${country}
Party Type: ${partyType || 'Not specified'}
Member Count: ${memberCount || 'Not specified'}
Areas of Interest: ${interests || 'Not specified'}
Additional Message: ${message || 'Not provided'}`,
        source: 'Political Party Engagement Form',
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
        error: 'Failed to submit party engagement inquiry. Please try again.' 
      }, { status: 500 })
    }

    // Log the party engagement inquiry
    console.log(`New party engagement inquiry from ${partyName} in ${country} via ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest in APPI! We will review your party information and contact you within 2-3 business days.',
      submissionId: submission.id
    })

  } catch (error) {
    console.error('Party engagement error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
