'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  image?: string
  video?: string
  rating: number
  featured: boolean
}

interface TestimonialContextType {
  testimonials: Testimonial[]
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined)

const defaultTestimonials: Testimonial[] = []

export function TestimonialProvider({ children }: { children: ReactNode }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-testimonials')
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse testimonials:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolio-testimonials', JSON.stringify(testimonials))
    }
  }, [testimonials, isLoaded])

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [testimonial, ...prev])
  }

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial, updateTestimonial, deleteTestimonial }}>
      {children}
    </TestimonialContext.Provider>
  )
}

export function useTestimonials() {
  const context = useContext(TestimonialContext)
  if (!context) {
    throw new Error('useTestimonials must be used within TestimonialProvider')
  }
  return context
}
