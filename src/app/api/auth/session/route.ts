import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/lib/auth-config'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(AUTH_CONFIG.cookieName)

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false })
    }

    // Decode and validate session
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )

    // Check expiration
    if (sessionData.exp < Date.now()) {
      cookieStore.delete(AUTH_CONFIG.cookieName)
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      user: { email: sessionData.email },
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
