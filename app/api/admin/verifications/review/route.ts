import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const body = await request.json()
    const { verificationId, action, notes } = body

    if (!verificationId || !action) {
      return NextResponse.json({ 
        error: 'Verification ID and action are required' 
      }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ 
        error: 'Action must be either approve or reject' 
      }, { status: 400 })
    }

    // Get the verification request
    const { data: verification, error: fetchError } = await supabase
      .from('verification_requests')
      .select('*')
      .eq('id', verificationId)
      .single()

    if (fetchError || !verification) {
      return NextResponse.json({ 
        error: 'Verification request not found' 
      }, { status: 404 })
    }

    if (verification.status !== 'pending') {
      return NextResponse.json({ 
        error: 'Verification request has already been reviewed' 
      }, { status: 400 })
    }

    // Update verification request
    const updateData: any = {
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewed_at: new Date().toISOString(),
      review_notes: notes || null
    }

    const { data: updatedVerification, error: updateError } = await supabase
      .from('verification_requests')
      .update(updateData)
      .eq('id', verificationId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating verification:', updateError)
      return NextResponse.json({ 
        error: 'Failed to update verification',
        details: updateError.message 
      }, { status: 500 })
    }

    // If approved, update user status to active
    if (action === 'approve') {
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ 
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', verification.user_id)

      if (userUpdateError) {
        console.error('Error updating user status:', userUpdateError)
        // Don't fail the entire operation, just log the error
      }
    }

    return NextResponse.json({
      success: true,
      message: `Verification ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      verification: updatedVerification
    })

  } catch (error) {
    console.error('Error reviewing verification:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
