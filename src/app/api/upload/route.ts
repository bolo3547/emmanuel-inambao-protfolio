import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/lib/auth-config'

// Simple rate limiting for uploads
const uploadAttempts = new Map<string, { count: number; resetTime: number }>()
const MAX_UPLOADS_PER_MINUTE = 10

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = uploadAttempts.get(ip)
  
  if (!record || now > record.resetTime) {
    uploadAttempts.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }
  
  if (record.count >= MAX_UPLOADS_PER_MINUTE) {
    return false
  }
  
  record.count++
  return true
}

// Check authentication directly in this route
async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(AUTH_CONFIG.cookieName)

    if (!sessionCookie) {
      console.log('Upload auth: No session cookie found')
      return false
    }

    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )

    const isValid = sessionData.exp > Date.now()
    if (!isValid) {
      console.log('Upload auth: Session expired')
    }
    return isValid
  } catch (error) {
    console.error('Upload auth error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await checkAuth()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    // Check rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many uploads. Please wait a minute.' },
        { status: 429 }
      )
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary not configured. Missing environment variables.')
      return NextResponse.json(
        { error: 'Cloudinary not configured. Please set environment variables in .env.local' },
        { status: 500 }
      )
    }

    // Configure Cloudinary (inside the handler to ensure env vars are loaded)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    let formData: FormData
    try {
      formData = await request.formData()
    } catch (error) {
      console.error('FormData parse error:', error)
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    const file = formData.get('file') as File | null
    const type = formData.get('type') as string // 'profile', 'project', or 'cv'
    const projectId = formData.get('projectId') as string | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (basic check before processing)
    if (file.size === 0) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 })
    }

    // Validate file type based on upload type
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const videoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    const documentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    const isCV = type === 'cv'
    const isVideo = type === 'video' || type === 'testimonial-video'
    
    let validTypes: string[]
    if (isCV) {
      validTypes = [...documentTypes, ...imageTypes]
    } else if (isVideo) {
      validTypes = videoTypes
    } else {
      validTypes = imageTypes
    }
    
    if (!validTypes.includes(file.type)) {
      if (isCV) {
        return NextResponse.json(
          { error: 'Invalid file type. Use PDF, DOC, DOCX, or image files' },
          { status: 400 }
        )
      }
      if (isVideo) {
        return NextResponse.json(
          { error: 'Invalid video type. Use MP4, WebM, MOV, or AVI' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Invalid file type. Use JPG, PNG, WebP, or GIF' },
        { status: 400 }
      )
    }

    // Validate file size (max 100MB for videos, 10MB for CV, 5MB for images)
    let maxSize: number
    if (isVideo) {
      maxSize = 100 * 1024 * 1024 // 100MB for videos
    } else if (isCV) {
      maxSize = 10 * 1024 * 1024 // 10MB for CV
    } else {
      maxSize = 5 * 1024 * 1024 // 5MB for images
    }
    
    if (file.size > maxSize) {
      const maxSizeStr = isVideo ? '100MB' : isCV ? '10MB' : '5MB'
      return NextResponse.json(
        { error: `File too large. Maximum size is ${maxSizeStr}` },
        { status: 400 }
      )
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Determine folder and public_id for Cloudinary
    let folder = 'portfolio/uploads'
    let publicId = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '')}`

    if (type === 'profile') {
      folder = 'portfolio/profile'
      publicId = 'profile-picture'
    } else if (type === 'cv') {
      folder = 'portfolio/cv'
      publicId = `cv-${Date.now()}`
    } else if (type === 'project' && projectId) {
      folder = 'portfolio/projects'
      publicId = `project-${projectId}-${Date.now()}`
    } else if (type === 'video' || type === 'testimonial-video') {
      folder = 'portfolio/videos'
      publicId = `video-${Date.now()}`
    } else if (type === 'testimonial') {
      folder = 'portfolio/testimonials'
      publicId = `testimonial-${Date.now()}`
    } else if (type === 'certification') {
      folder = 'portfolio/certifications'
      publicId = `certification-${Date.now()}`
    } else if (type === 'experience') {
      folder = 'portfolio/experience'
      publicId = `experience-${Date.now()}`
    } else if (type === 'service') {
      folder = 'portfolio/services'
      publicId = `service-${Date.now()}`
    }

    // Determine resource type based on file
    const isPDF = file.type === 'application/pdf'
    const isDocument = file.type.includes('document') || file.type.includes('msword')
    const isVideoFile = videoTypes.includes(file.type)
    
    let resourceType: 'image' | 'video' | 'raw' = 'image'
    if (isPDF || isDocument) {
      resourceType = 'raw'
    } else if (isVideoFile) {
      resourceType = 'video'
    }

    // Upload to Cloudinary
    const uploadOptions: Record<string, unknown> = {
      folder,
      public_id: publicId,
      overwrite: true,
      resource_type: resourceType,
    }

    // Only apply image transformations for images
    if (resourceType === 'image') {
      uploadOptions.transformation = [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ]
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(dataURI, uploadOptions)

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: file.name,
      })
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError)
      const errorMessage = cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown Cloudinary error'
      return NextResponse.json(
        { error: `Upload to cloud storage failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to upload file: ${errorMessage}` },
      { status: 500 }
    )
  }
}
