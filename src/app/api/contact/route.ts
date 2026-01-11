import { NextRequest, NextResponse } from 'next/server'

// Simple rate limiting
const submissions = new Map<string, { count: number; resetTime: number }>()
const MAX_SUBMISSIONS_PER_HOUR = 5

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = submissions.get(ip)
  
  if (!record || now > record.resetTime) {
    submissions.set(ip, { count: 1, resetTime: now + 3600000 }) // 1 hour
    return true
  }
  
  if (record.count >= MAX_SUBMISSIONS_PER_HOUR) {
    return false
  }
  
  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Option 1: Use Web3Forms (free, no backend needed)
    // Sign up at https://web3forms.com to get your access key
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY

    if (WEB3FORMS_KEY) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject: subject || 'New Contact Form Submission',
          message,
          from_name: 'Portfolio Contact Form',
        }),
      })

      const result = await response.json()

      if (result.success) {
        return NextResponse.json({ success: true, message: 'Message sent successfully!' })
      } else {
        throw new Error('Web3Forms submission failed')
      }
    }

    // Option 2: If no email service configured, just log it
    console.log('Contact form submission:', { name, email, subject, message, timestamp: new Date().toISOString() })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message received! (Note: Email delivery not configured yet)' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
