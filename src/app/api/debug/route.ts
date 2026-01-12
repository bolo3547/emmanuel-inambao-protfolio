import { NextResponse } from 'next/server'

// Debug endpoint to check if environment variables are configured
export async function GET() {
  return NextResponse.json({
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
      apiKey: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing',
    },
    admin: {
      email: process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Missing (using default)',
      password: process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Missing (using default)',
    },
    timestamp: new Date().toISOString(),
  })
}
