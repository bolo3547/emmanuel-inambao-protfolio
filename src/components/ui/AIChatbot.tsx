'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  options?: string[]
}

interface BookingState {
  active: boolean
  step: 'name' | 'email' | 'phone' | 'date' | 'time' | 'topic' | 'notification' | 'confirm' | null
  data: {
    name: string
    email: string
    phone: string
    date: string
    time: string
    topic: string
    notificationMethod: 'email' | 'whatsapp' | 'both' | null
  }
}

// Knowledge base about Emmanuel
const knowledgeBase = {
  name: "Emmanuel Inambao",
  title: "Electronic Engineer | IoT & Robotics Developer | Full-Stack Systems Engineer",
  skills: ["Python", "JavaScript", "TypeScript", "C++", "React", "Next.js", "Arduino", "Raspberry Pi", "ESP32", "TensorFlow", "AWS", "Docker"],
  experience: "5+ years of experience in IoT development, robotics, and full-stack engineering",
  education: "Bachelor's degree in Electronic Engineering",
  contact: "denuelinambao@gmail.com",
  services: ["IoT Development", "Robotics Solutions", "Full-Stack Development", "PCB Design", "Embedded Systems", "AI/ML Integration"],
  projects: [
    "Smart Agriculture IoT System",
    "Industrial Automation Robot",
    "Real-time Monitoring Dashboard",
    "Autonomous Drone System",
  ],
}

// Get available dates (next 14 business days)
function getAvailableDates(): string[] {
  const dates: string[] = []
  const today = new Date()
  
  for (let i = 1; i <= 21 && dates.length < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const day = date.getDay()
    if (day !== 0 && day !== 6) {
      const formatted = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      dates.push(formatted)
    }
  }
  return dates
}

// Get available times
function getAvailableTimes(): string[] {
  return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Emmanuel's AI assistant. I can help you:\n\n• Learn about his skills & projects\n• Book a meeting with him\n• Get contact information\n\nWhat would you like to do?",
      options: ['Book a meeting', 'View skills', 'See projects', 'Contact info'],
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [booking, setBooking] = useState<BookingState>({
    active: false,
    step: null,
    data: { name: '', email: '', phone: '', date: '', time: '', topic: '', notificationMethod: null }
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle booking flow
  const processBookingStep = (userInput: string): { response: string; options?: string[]; nextStep: BookingState['step'] } => {
    const input = userInput.toLowerCase().trim()
    
    switch (booking.step) {
      case 'name':
        setBooking(prev => ({ ...prev, data: { ...prev.data, name: userInput } }))
        return {
          response: `Nice to meet you, ${userInput}! 📧\n\nWhat's your email address?`,
          nextStep: 'email'
        }
      
      case 'email':
        if (!userInput.includes('@')) {
          return { response: "That doesn't look like a valid email. Please enter your email address:", nextStep: 'email' }
        }
        setBooking(prev => ({ ...prev, data: { ...prev.data, email: userInput } }))
        return {
          response: `Great! 📱\n\nWhat's your phone number? (Include country code, e.g., +260973XXXXXX)\n\nOr type "skip" if you prefer not to share.`,
          nextStep: 'phone'
        }
      
      case 'phone':
        const phone = input === 'skip' ? '' : userInput
        setBooking(prev => ({ ...prev, data: { ...prev.data, phone } }))
        return {
          response: `📅 When would you like to meet?\n\nSelect a date:`,
          options: getAvailableDates(),
          nextStep: 'date'
        }
      
      case 'date':
        setBooking(prev => ({ ...prev, data: { ...prev.data, date: userInput } }))
        return {
          response: `⏰ What time works best for you?\n\nAll times are in Central Africa Time (CAT):`,
          options: getAvailableTimes(),
          nextStep: 'time'
        }
      
      case 'time':
        setBooking(prev => ({ ...prev, data: { ...prev.data, time: userInput } }))
        return {
          response: `📝 What would you like to discuss in the meeting?\n\n(e.g., IoT project, consulting, collaboration)`,
          nextStep: 'topic'
        }
      
      case 'topic':
        setBooking(prev => ({ ...prev, data: { ...prev.data, topic: userInput } }))
        const hasPhone = booking.data.phone && booking.data.phone !== ''
        if (hasPhone) {
          return {
            response: `📬 How would you like to receive the meeting confirmation?`,
            options: ['Email only', 'WhatsApp only', 'Both Email & WhatsApp'],
            nextStep: 'notification'
          }
        }
        setBooking(prev => ({ ...prev, data: { ...prev.data, notificationMethod: 'email' } }))
        return {
          response: `Perfect! Here's your booking summary:\n\n👤 Name: ${booking.data.name}\n📧 Email: ${booking.data.email}\n📅 Date: ${booking.data.date}\n⏰ Time: ${userInput}\n📝 Topic: ${userInput}\n\nShall I confirm this booking?`,
          options: ['✅ Confirm Booking', '❌ Cancel'],
          nextStep: 'confirm'
        }
      
      case 'notification':
        let method: 'email' | 'whatsapp' | 'both' = 'email'
        if (input.includes('whatsapp') && input.includes('email')) method = 'both'
        else if (input.includes('whatsapp')) method = 'whatsapp'
        else method = 'email'
        
        setBooking(prev => ({ ...prev, data: { ...prev.data, notificationMethod: method } }))
        
        const methodText = method === 'both' ? 'Email & WhatsApp' : method === 'whatsapp' ? 'WhatsApp' : 'Email'
        return {
          response: `Perfect! Here's your booking summary:\n\n👤 Name: ${booking.data.name}\n📧 Email: ${booking.data.email}\n📱 Phone: ${booking.data.phone}\n📅 Date: ${booking.data.date}\n⏰ Time: ${booking.data.time}\n📝 Topic: ${booking.data.topic}\n📬 Confirmation via: ${methodText}\n\nShall I confirm this booking?`,
          options: ['✅ Confirm Booking', '❌ Cancel'],
          nextStep: 'confirm'
        }
      
      case 'confirm':
        if (input.includes('confirm') || input.includes('yes') || input.includes('✅')) {
          // Submit the booking
          submitBooking()
          return {
            response: `🎉 Booking confirmed!\n\nYou'll receive a confirmation ${booking.data.notificationMethod === 'both' ? 'via email and WhatsApp' : booking.data.notificationMethod === 'whatsapp' ? 'on WhatsApp' : 'via email'}.\n\nEmmanuel will be in touch soon. Is there anything else I can help with?`,
            options: ['Book another meeting', 'View projects', 'Contact info'],
            nextStep: null
          }
        } else {
          setBooking({ active: false, step: null, data: { name: '', email: '', phone: '', date: '', time: '', topic: '', notificationMethod: null } })
          return {
            response: `No problem! The booking has been cancelled.\n\nIs there anything else I can help you with?`,
            options: ['Book a meeting', 'View skills', 'See projects'],
            nextStep: null
          }
        }
      
      default:
        return { response: '', nextStep: null }
    }
  }

  // Submit booking to API
  const submitBooking = async () => {
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.data.name,
          email: booking.data.email,
          phone: booking.data.phone,
          date: booking.data.date,
          time: booking.data.time,
          timezone: 'Africa/Lusaka',
          duration: 30,
          topic: booking.data.topic,
          whatsappConsent: booking.data.notificationMethod === 'whatsapp' || booking.data.notificationMethod === 'both',
        }),
      })
    } catch (error) {
      console.error('Booking submission error:', error)
    }
  }

  // Generate response based on query
  function generateResponse(query: string): { response: string; options?: string[] } {
    const lowerQuery = query.toLowerCase()
    
    // Check if booking flow is active
    if (booking.active && booking.step) {
      const result = processBookingStep(query)
      if (result.nextStep === null) {
        setBooking(prev => ({ ...prev, active: false, step: null }))
      } else {
        setBooking(prev => ({ ...prev, step: result.nextStep }))
      }
      return { response: result.response, options: result.options }
    }
    
    // Start booking flow
    if (lowerQuery.includes('book') || lowerQuery.includes('meeting') || lowerQuery.includes('schedule') || lowerQuery.includes('appointment')) {
      setBooking(prev => ({ ...prev, active: true, step: 'name' }))
      return {
        response: "Great! Let's schedule a meeting with Emmanuel. 📅\n\nFirst, what's your name?"
      }
    }
    
    // Greetings
    if (lowerQuery.match(/^(hi|hello|hey|greetings)/)) {
      return {
        response: `Hello! 👋 I'm Emmanuel's AI assistant. How can I help you today?`,
        options: ['Book a meeting', 'View skills', 'See projects', 'Contact info']
      }
    }
    
    // Skills
    if (lowerQuery.includes('skill') || lowerQuery.includes('know') || lowerQuery.includes('tech')) {
      return {
        response: `Emmanuel is skilled in:\n\n**Programming:** Python, JavaScript, TypeScript, C++\n**Frameworks:** React, Next.js, Node.js, TensorFlow\n**Hardware:** Arduino, Raspberry Pi, ESP32, STM32\n**Cloud:** AWS, Docker, Kubernetes\n\nWant to discuss a project using these skills?`,
        options: ['Book a meeting', 'See projects', 'Contact info']
      }
    }
    
    // Projects
    if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
      return {
        response: `Emmanuel's notable projects:\n\n🌱 **Smart Agriculture IoT** - Automated farming\n🤖 **Industrial Robot** - Manufacturing automation\n📊 **Monitoring Dashboard** - Real-time data viz\n🚁 **Autonomous Drone** - AI navigation\n\nInterested in discussing a similar project?`,
        options: ['Book a meeting', 'View skills', 'Contact info']
      }
    }
    
    // Services
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('hire') || lowerQuery.includes('help')) {
      return {
        response: `Emmanuel offers:\n\n⚡ IoT Development\n🤖 Robotics Solutions\n💻 Full-Stack Development\n🔧 PCB Design\n🧠 AI/ML Integration\n\nWant to book a consultation?`,
        options: ['Book a meeting', 'See projects', 'Contact info']
      }
    }
    
    // Contact
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
      return {
        response: `You can reach Emmanuel at:\n\n📧 Email: ${knowledgeBase.contact}\n📱 WhatsApp: +260 973 914 432\n\nOr book a meeting directly!`,
        options: ['Book a meeting', 'View skills', 'See projects']
      }
    }
    
    // Default
    return {
      response: `I can help you with:\n\n• 📅 **Book a meeting** with Emmanuel\n• 💡 Learn about his **skills**\n• 🚀 See his **projects**\n• 📧 Get **contact info**\n\nWhat would you like?`,
      options: ['Book a meeting', 'View skills', 'See projects', 'Contact info']
    }
  }

  const handleSend = (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isTyping) return

    setInput('')
    
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setIsTyping(true)

    // Generate response
    const delay = 600 + Math.random() * 500
    setTimeout(() => {
      const { response, options } = generateResponse(text)
      setMessages((prev) => [...prev, { role: 'assistant', content: response, options }])
      setIsTyping(false)
    }, delay)
  }

  const handleOptionClick = (option: string) => {
    handleSend(option)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[4.5rem] right-6 z-50 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          1
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-white/80">Ask me about Emmanuel</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {/* Quick reply options */}
                  {message.role === 'assistant' && message.options && index === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                      {message.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionClick(option)}
                          className="px-3 py-1.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={booking.active ? "Type your answer..." : "Ask about skills, projects..."}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
