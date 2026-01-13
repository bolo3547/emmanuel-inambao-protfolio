import { NextRequest, NextResponse } from 'next/server'

// Admin contact details
const ADMIN_EMAIL = 'denuelinambao@gmail.com'
const ADMIN_WHATSAPP = '+260973914432'

interface BookingData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  timezone: string
  duration: number
  topic: string
  whatsappConsent: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.date || !data.time) {
      return NextResponse.json(
        { error: 'Name, email, date, and time are required' },
        { status: 400 }
      )
    }

    // Format booking details
    const bookingDetails = `
📅 NEW BOOKING REQUEST

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone || 'Not provided'}

📆 Date: ${data.date}
⏰ Time: ${data.time}
🌍 Timezone: ${data.timezone}
⏱️ Duration: ${data.duration} minutes

📝 Topic: ${data.topic || 'Not specified'}

💬 WhatsApp consent: ${data.whatsappConsent ? 'Yes' : 'No'}
    `.trim()

    // 1. Send email notification to admin via Web3Forms
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY
    
    if (WEB3FORMS_KEY) {
      // Email to admin
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🗓️ New Booking: ${data.name} - ${data.date} at ${data.time}`,
          from_name: 'Portfolio Booking System',
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: bookingDetails,
        }),
      })

      // Email confirmation to booker
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `✅ Booking Confirmed: Meeting with Prof. Emmanuel Inambao`,
          from_name: 'Prof. Emmanuel Inambao',
          to: data.email,
          replyto: ADMIN_EMAIL,
          message: `
Hello ${data.name},

Thank you for booking a meeting with Prof. Emmanuel Inambao!

📅 BOOKING DETAILS:
• Date: ${data.date}
• Time: ${data.time} (${data.timezone})
• Duration: ${data.duration} minutes
• Topic: ${data.topic || 'General discussion'}

You will receive a calendar invite shortly. If you need to reschedule, please reply to this email.

Best regards,
Prof. Emmanuel Inambao
Electronic Engineer | IoT & Robotics Developer
          `.trim(),
        }),
      })

      console.log('✅ Booking emails sent successfully')
    }

    // 2. Send WhatsApp notification to admin via Twilio
    const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
    const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN
    const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM

    if (TWILIO_SID && TWILIO_AUTH && TWILIO_WHATSAPP_FROM) {
      const whatsappMessage = `🗓️ *New Booking*\n\n👤 ${data.name}\n📧 ${data.email}\n📱 ${data.phone || 'N/A'}\n\n📅 ${data.date} at ${data.time}\n⏱️ ${data.duration} min\n🌍 ${data.timezone}\n\n📝 ${data.topic || 'No topic specified'}`

      // Send to admin
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`
      const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64')

      await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_FROM,
          To: `whatsapp:${ADMIN_WHATSAPP}`,
          Body: whatsappMessage,
        }),
      })

      console.log('✅ WhatsApp notification sent to admin')

      // Send to booker if they consented and provided phone
      if (data.whatsappConsent && data.phone) {
        const bookerMessage = `✅ *Booking Confirmed*\n\nHi ${data.name}!\n\nYour meeting with Prof. Emmanuel Inambao is confirmed:\n\n📅 ${data.date}\n⏰ ${data.time} (${data.timezone})\n⏱️ ${data.duration} minutes\n\nYou'll receive a calendar invite at ${data.email}.\n\nThank you! 🙏`

        // Format phone number (assume Zambia +260 if not provided with country code)
        let formattedPhone = data.phone.replace(/\s/g, '')
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+260' + formattedPhone.substring(1)
        } else if (!formattedPhone.startsWith('+')) {
          formattedPhone = '+260' + formattedPhone
        }

        await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: TWILIO_WHATSAPP_FROM,
            To: `whatsapp:${formattedPhone}`,
            Body: bookerMessage,
          }),
        })

        console.log('✅ WhatsApp confirmation sent to booker')
      }
    } else {
      console.log('⚠️ Twilio not configured - WhatsApp notifications skipped')
    }

    // Log booking for records
    console.log('📅 Booking recorded:', {
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      timezone: data.timezone,
      duration: data.duration,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed! Check your email for details.',
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again.' },
      { status: 500 }
    )
  }
}
