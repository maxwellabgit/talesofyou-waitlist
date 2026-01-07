import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (!phone || phone.trim().length === 0) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Insert email and phone into waitlist_signups table
    const { data, error } = await supabaseAdmin
      .from('waitlist_signups')
      .insert({ 
        email,
        phone: phone.trim(),
        source: 'nextjs_waitlist_app'
      })
      .select()

    if (error) {
      // Handle duplicate email error
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Email already exists in waitlist' },
          { status: 409 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

