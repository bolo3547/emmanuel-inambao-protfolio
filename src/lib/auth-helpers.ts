import { cookies } from 'next/headers'
import { AUTH_CONFIG } from './auth-config'

// Server-side auth check for API routes
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(AUTH_CONFIG.cookieName)

    if (!sessionCookie) {
      return false
    }

    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )

    return sessionData.exp > Date.now()
  } catch {
    return false
  }
}

// Get current user from session
export async function getCurrentUser(): Promise<{ email: string } | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(AUTH_CONFIG.cookieName)

    if (!sessionCookie) {
      return null
    }

    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )

    if (sessionData.exp < Date.now()) {
      return null
    }

    return { email: sessionData.email }
  } catch {
    return null
  }
}
