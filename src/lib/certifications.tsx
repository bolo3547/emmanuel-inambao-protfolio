'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
  description?: string
}

interface CertificationContextType {
  certifications: Certification[]
  addCertification: (certification: Certification) => void
  updateCertification: (id: string, certification: Partial<Certification>) => void
  deleteCertification: (id: string) => void
}

const CertificationContext = createContext<CertificationContextType | undefined>(undefined)

const defaultCertifications: Certification[] = []

export function CertificationProvider({ children }: { children: ReactNode }) {
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-certifications')
    if (saved) {
      try {
        setCertifications(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse certifications:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolio-certifications', JSON.stringify(certifications))
    }
  }, [certifications, isLoaded])

  const addCertification = (certification: Certification) => {
    setCertifications(prev => [certification, ...prev])
  }

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    setCertifications(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const deleteCertification = (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id))
  }

  return (
    <CertificationContext.Provider value={{ certifications, addCertification, updateCertification, deleteCertification }}>
      {children}
    </CertificationContext.Provider>
  )
}

export function useCertifications() {
  const context = useContext(CertificationContext)
  if (!context) {
    throw new Error('useCertifications must be used within CertificationProvider')
  }
  return context
}
