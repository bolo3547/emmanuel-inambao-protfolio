import { NextResponse } from 'next/server'
import { AUTH_CONFIG } from '@/lib/auth-config'

// Debug endpoint to check auth config (REMOVE IN PRODUCTION!)
export async function GET() {
  return NextResponse.json({
    configuredEmail: AUTH_CONFIG.adminEmail,
    configuredPasswordLength: AUTH_CONFIG.adminPassword.length,
    configuredPasswordFirstChar: AUTH_CONFIG.adminPassword[0],
    configuredPasswordLastChar: AUTH_CONFIG.adminPassword[AUTH_CONFIG.adminPassword.length - 1],
    envEmailSet: !!process.env.ADMIN_EMAIL,
    envPasswordSet: !!process.env.ADMIN_PASSWORD,
    envEmailValue: process.env.ADMIN_EMAIL,
    envPasswordLength: process.env.ADMIN_PASSWORD?.length,
  })
}
