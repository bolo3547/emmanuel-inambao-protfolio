'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
  logo?: string
}

interface ExperienceContextType {
  experiences: Experience[]
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  deleteExperience: (id: string) => void
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined)

const defaultExperiences: Experience[] = []

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-experiences')
    if (saved) {
      try {
        setExperiences(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse experiences:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolio-experiences', JSON.stringify(experiences))
    }
  }, [experiences, isLoaded])

  const addExperience = (experience: Experience) => {
    setExperiences(prev => [experience, ...prev])
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp))
  }

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id))
  }

  return (
    <ExperienceContext.Provider value={{ experiences, addExperience, updateExperience, deleteExperience }}>
      {children}
    </ExperienceContext.Provider>
  )
}

export function useExperience() {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('useExperience must be used within ExperienceProvider')
  }
  return context
}
