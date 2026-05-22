import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { 
      name, 
      email, 
      phone, 
      organization, 
      subject, 
      message, 
      source = 'General Contact Form',
      priority = 'medium'
    } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: 'Name, email, and message are required' 
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

    // Insert submission into database
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to submit form. Please try again.' 
      }, { status: 500 })
    }

    // Log the submission for admin tracking
    console.log(`New contact submission from ${email} via ${source}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      submissionId: submission.id
    })

  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
