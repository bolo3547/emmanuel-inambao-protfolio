'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
  image?: string
  featured: boolean
}

interface ServiceContextType {
  services: Service[]
  addService: (service: Service) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined)

const defaultServices: Service[] = []

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-services')
    if (saved) {
      try {
        setServices(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse services:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('portfolio-services', JSON.stringify(services))
    }
  }, [services, isLoaded])

  const addService = (service: Service) => {
    setServices(prev => [service, ...prev])
  }

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <ServiceContext.Provider value={{ services, addService, updateService, deleteService }}>
      {children}
    </ServiceContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider')
  }
  return context
}
