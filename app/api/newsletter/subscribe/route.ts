import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    
    const { email, language = 'en', source = 'Website Footer' } = body

    // Basic validation
    if (!email) {
      return NextResponse.json({ 
        error: 'Email address is required' 
      }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Please provide a valid email address' 
      }, { status: 400 })
    }

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active, unsubscribed_at')
      .eq('email', email)
      .single()

    if (existingSubscription) {
      if (existingSubscription.is_active) {
        return NextResponse.json({ 
          error: 'This email is already subscribed to our newsletter' 
        }, { status: 400 })
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            is_active: true,
            unsubscribed_at: null,
            language
          })
          .eq('id', existingSubscription.id)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json({ 
            error: 'Failed to reactivate subscription. Please try again.' 
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.',
          subscriptionId: existingSubscription.id
        })
      }
    }

    // Insert new subscription
    const { data: subscription, error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email,
        language,
        is_active: true,
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to subscribe. Please try again.' 
      }, { status: 500 })
    }

    // Log the subscription for admin tracking
    console.log(`New newsletter subscription from ${email} via ${source}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      subscriptionId: subscription.id
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
