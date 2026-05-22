import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const formData = await request.formData()
    
    const userId = formData.get('userId') as string
    const nationalId = formData.get('national_id') as string
    const nationalIdFile = formData.get('national_id_file') as File

    if (!userId || !nationalId || !nationalIdFile) {
      return NextResponse.json({ 
        error: 'User ID, National ID number, and document are required' 
      }, { status: 400 })
    }

    // Upload the national ID document to Supabase Storage
    const fileName = `verification/${userId}/${Date.now()}_${nationalIdFile.name}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('verification-documents')
      .upload(fileName, nationalIdFile)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({ 
        error: 'Failed to upload document',
        details: uploadError.message 
      }, { status: 500 })
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('verification-documents')
      .getPublicUrl(fileName)

    // Store verification data in the database
    const { data: verification, error: dbError } = await supabase
      .from('verification_requests')
      .insert({
        user_id: userId,
        national_id: nationalId,
        document_url: publicUrl,
        status: 'pending',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving verification data:', dbError)
      return NextResponse.json({ 
        error: 'Failed to save verification data',
        details: dbError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Verification documents submitted successfully',
      verification
    })

  } catch (error) {
    console.error('Error submitting verification:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
