import { NextResponse } from 'next/server'

// Debug endpoint to check if environment variables are configured
export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
  const apiKey = process.env.CLOUDINARY_API_KEY || ''
  const apiSecret = process.env.CLOUDINARY_API_SECRET || ''
  
  return NextResponse.json({
    cloudinary: {
      cloudName: cloudName ? '✅ Set' : '❌ Missing',
      cloudNameLength: cloudName.length,
      cloudNameTrimmed: cloudName.trim(),
      apiKey: apiKey ? '✅ Set' : '❌ Missing',
      apiKeyLength: apiKey.length,
      apiKeyFirstChars: apiKey.trim().substring(0, 4),
      apiSecret: apiSecret ? '✅ Set' : '❌ Missing',
      apiSecretLength: apiSecret.length,
    },
    admin: {
      email: process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Missing (using default)',
      password: process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Missing (using default)',
    },
    timestamp: new Date().toISOString(),
  })
}
