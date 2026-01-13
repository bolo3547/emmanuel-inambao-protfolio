'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
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

// Simple AI response generator
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase()
  
  // Greetings
  if (lowerQuery.match(/^(hi|hello|hey|greetings)/)) {
    return `Hello! 👋 I'm Emmanuel's AI assistant. I can tell you about his skills, projects, experience, and services. What would you like to know?`
  }
  
  // Name
  if (lowerQuery.includes('name') || lowerQuery.includes('who')) {
    return `I represent ${knowledgeBase.name}, a ${knowledgeBase.title}. He's passionate about building innovative IoT and robotics solutions.`
  }
  
  // Skills
  if (lowerQuery.includes('skill') || lowerQuery.includes('know') || lowerQuery.includes('tech')) {
    return `Emmanuel is skilled in:\n\n**Programming:** Python, JavaScript, TypeScript, C++\n**Frameworks:** React, Next.js, Node.js, TensorFlow\n**Hardware:** Arduino, Raspberry Pi, ESP32, STM32\n**Cloud:** AWS, Docker, Kubernetes\n\nIs there a specific technology you'd like to know more about?`
  }
  
  // Projects
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
    return `Some of Emmanuel's notable projects include:\n\n🌱 **Smart Agriculture IoT System** - Automated farming with sensors and AI\n🤖 **Industrial Automation Robot** - Manufacturing process automation\n📊 **Real-time Monitoring Dashboard** - Data visualization platform\n🚁 **Autonomous Drone System** - AI-powered navigation\n\nWould you like more details on any of these?`
  }
  
  // Experience
  if (lowerQuery.includes('experience') || lowerQuery.includes('years') || lowerQuery.includes('background')) {
    return `Emmanuel has ${knowledgeBase.experience}. He has worked with startups and enterprises to deliver innovative solutions in IoT, robotics, and software development.`
  }
  
  // Services
  if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('hire') || lowerQuery.includes('help')) {
    return `Emmanuel offers professional services in:\n\n⚡ **IoT Development** - Connected devices and sensors\n🤖 **Robotics Solutions** - Custom robots and automation\n💻 **Full-Stack Development** - Web and mobile apps\n🔧 **PCB Design** - Custom circuit boards\n🧠 **AI/ML Integration** - Smart solutions\n\nInterested in discussing a project?`
  }
  
  // Contact
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('message')) {
    return `You can reach Emmanuel at:\n\n📧 Email: ${knowledgeBase.contact}\n\nOr use the contact form on this website. He typically responds within 24 hours!`
  }
  
  // Education
  if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
    return `Emmanuel holds a ${knowledgeBase.education}. He continues to learn and stay updated with the latest technologies in IoT, robotics, and software development.`
  }
  
  // Availability
  if (lowerQuery.includes('available') || lowerQuery.includes('free') || lowerQuery.includes('book')) {
    return `Emmanuel is currently available for new projects and collaborations! Feel free to reach out through the contact form or email to discuss your requirements.`
  }
  
  // Default response
  return `I'd be happy to help you learn more about Emmanuel! You can ask me about:\n\n• His **skills** and technologies\n• **Projects** he's worked on\n• **Services** he offers\n• His **experience** and background\n• How to **contact** him\n\nWhat interests you?`
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Emmanuel's AI assistant. Ask me anything about his skills, projects, or services!",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(userMessage)
    setIsTyping(false)
    setMessages((prev) => [...prev, { role: 'assistant', content: response }])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
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
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
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
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
