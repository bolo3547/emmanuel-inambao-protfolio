'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingFormData {
  name: string
  email: string
  date: string
  time: string
  timezone: string
  duration: number
  topic: string
}

const TIMEZONES = [
  { value: 'Africa/Lusaka', label: 'Lusaka (CAT)', offset: '+02:00' },
  { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00' },
  { value: 'Europe/Paris', label: 'Paris (CET)', offset: '+01:00' },
  { value: 'America/New_York', label: 'New York (EST)', offset: '-05:00' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: '-08:00' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+04:00' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+08:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', offset: '+10:00' },
]

const DURATIONS = [15, 30, 45, 60]

export default function BookingScheduler() {
  const { t, language, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lusaka',
    duration: 30,
    topic: '',
  })

  // Generate available dates (next 14 days, excluding weekends)
  const getAvailableDates = () => {
    const dates: string[] = []
    const today = new Date()
    
    for (let i = 1; i <= 21 && dates.length < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const day = date.getDay()
      // Exclude weekends (0 = Sunday, 6 = Saturday)
      if (day !== 0 && day !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  // Generate time slots for selected date
  useEffect(() => {
    if (selectedDate) {
      const slots: TimeSlot[] = []
      const startHour = 9 // 9 AM
      const endHour = 17 // 5 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
          // Randomly mark some slots as unavailable for demo
          const available = Math.random() > 0.3
          slots.push({ time, available })
        }
      }
      setAvailableSlots(slots)
    }
  }, [selectedDate])

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setFormData(prev => ({ ...prev, date }))
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, send to calendar API (Google Calendar, Calendly, etc.)
    console.log('Booking submitted:', formData)
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setStep(1)
      setSelectedDate('')
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lusaka',
        duration: 30,
        topic: '',
      })
    }, 3000)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat(language, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <>
      {/* Floating Booking Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 end-6 z-40 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('booking.title')}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </motion.button>

      {/* Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{t('booking.title')}</h2>
                    <p className="text-green-100 text-sm mt-1">{t('booking.subtitle')}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= s ? 'bg-white text-green-600' : 'bg-green-700 text-green-200'
                      }`}>
                        {submitted && s === 3 ? '✓' : s}
                      </div>
                      {s < 3 && (
                        <div className={`flex-1 h-1 mx-2 rounded ${
                          step > s ? 'bg-white' : 'bg-green-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {language === 'ar' ? 'تم تأكيد الحجز!' : 'Booking Confirmed!'}
                    </h3>
                    <p className="text-gray-400">
                      {language === 'ar' 
                        ? 'ستتلقى رسالة تأكيد بالبريد الإلكتروني قريباً'
                        : "You'll receive a confirmation email shortly"}
                    </p>
                  </motion.div>
                ) : step === 1 ? (
                  // Step 1: Select Date & Duration
                  <div className="space-y-6">
                    {/* Duration Selection */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-3">
                        {t('booking.duration')}
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {DURATIONS.map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setFormData(prev => ({ ...prev, duration }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.duration === duration
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {duration} {t('booking.minutes')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timezone Selection */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-3">
                        {t('booking.timezone')}
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label} ({tz.offset})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-3">
                        {language === 'ar' ? 'اختر التاريخ' : 'Select Date'}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {getAvailableDates().map((date) => (
                          <button
                            key={date}
                            onClick={() => handleDateSelect(date)}
                            className={`p-3 rounded-lg text-center transition-colors ${
                              selectedDate === date
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            <div className="text-sm font-medium">{formatDate(date)}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : step === 2 ? (
                  // Step 2: Select Time
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setStep(1)}
                        className="text-gray-400 hover:text-white flex items-center gap-2"
                      >
                        <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {language === 'ar' ? 'العودة' : 'Back'}
                      </button>
                      <span className="text-green-400 font-medium">{formatDate(selectedDate)}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                            !slot.available
                              ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                              : formData.time === slot.time
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Step 3: Enter Details
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-gray-400 hover:text-white flex items-center gap-2"
                      >
                        <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {language === 'ar' ? 'العودة' : 'Back'}
                      </button>
                      <span className="text-green-400 font-medium">
                        {formatDate(selectedDate)} • {formData.time}
                      </span>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder={t('contact.name')}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {t('contact.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder={t('contact.email')}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        {language === 'ar' ? 'موضوع الاجتماع' : 'Meeting Topic'}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.topic}
                        onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder={language === 'ar' ? 'ما الذي تريد مناقشته؟' : 'What would you like to discuss?'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {t('common.loading')}
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {t('booking.confirm')}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
