import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

function getRateLimitKey(request: NextRequest): string {
  // Get IP from various headers (works with Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfIp = request.headers.get('cf-connecting-ip')
  return forwarded?.split(',')[0] || realIp || cfIp || 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count++
  return false
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Phone number validation - allows various formats
const PHONE_REGEX = /^[\d\s\-\(\)\+\.]{7,20}$/

function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim().toLowerCase()
  return trimmed.length <= 254 && EMAIL_REGEX.test(trimmed)
}

function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false
  const trimmed = phone.trim()
  // Remove all formatting to check digit count
  const digitsOnly = trimmed.replace(/\D/g, '')
  // Must have between 7 and 15 digits
  return digitsOnly.length >= 7 && digitsOnly.length <= 15 && PHONE_REGEX.test(trimmed)
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500) // Limit input length
}

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch count' },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error: unknown) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const email = sanitizeInput(body.email || '')
    const phone = sanitizeInput(body.phone || '')

    // Validate email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate phone
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number (7-15 digits)' },
        { status: 400 }
      )
    }

    // Insert email and phone into waitlist_signups table
    const { data, error } = await supabaseAdmin
      .from('waitlist_signups')
      .insert({ 
        email: email.toLowerCase(),
        phone: phone.trim(),
        source: 'nextjs_waitlist_app'
      })
      .select()

    if (error) {
      // Handle duplicate email error
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'This email is already on the waitlist!' },
          { status: 409 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
