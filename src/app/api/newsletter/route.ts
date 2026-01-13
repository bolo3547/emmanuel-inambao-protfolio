import { NextRequest, NextResponse } from 'next/server'

// In production, store subscribers in a database
const subscribers: Set<string> = new Set()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if already subscribed (in production, check database)
    if (subscribers.has(email)) {
      return NextResponse.json(
        { message: 'Already subscribed!' },
        { status: 200 }
      )
    }

    // Add to subscribers (in production, save to database)
    subscribers.add(email)

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to email marketing service (Mailchimp, ConvertKit, etc.)

    console.log(`New subscriber: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return subscriber count (for admin dashboard)
  return NextResponse.json({
    count: subscribers.size,
  })
}
