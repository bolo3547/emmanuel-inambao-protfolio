import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/lib/auth-config'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_CONFIG.cookieName)

  return NextResponse.json({ success: true })
}
