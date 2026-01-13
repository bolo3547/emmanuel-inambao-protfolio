'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Resource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'template' | 'guide' | 'checklist'
  fileUrl: string
  fileSize: string
  downloads: number
  icon: string
  createdAt: string
}

interface ResourcesContextType {
  resources: Resource[]
  addResource: (resource: Omit<Resource, 'id' | 'downloads' | 'createdAt'>) => void
  updateResource: (id: string, resource: Partial<Resource>) => void
  deleteResource: (id: string) => void
  audioIntroUrl: string
  setAudioIntroUrl: (url: string) => void
}

const ResourcesContext = createContext<ResourcesContextType | null>(null)

const STORAGE_KEY = 'portfolio_resources'
const AUDIO_STORAGE_KEY = 'portfolio_audio_intro'

const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'IoT Project Starter Guide',
    description: 'Complete guide to starting your first IoT project, from hardware selection to cloud deployment.',
    type: 'guide',
    fileUrl: '/resources/iot-starter-guide.pdf',
    fileSize: '2.4 MB',
    downloads: 1250,
    icon: '📘',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'PCB Design Checklist',
    description: 'Essential checklist for PCB design review before manufacturing. Avoid common mistakes.',
    type: 'checklist',
    fileUrl: '/resources/pcb-design-checklist.pdf',
    fileSize: '850 KB',
    downloads: 890,
    icon: '✅',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'ESP32 Project Template',
    description: 'Ready-to-use ESP32 project template with WiFi, MQTT, and OTA updates pre-configured.',
    type: 'template',
    fileUrl: '/resources/esp32-template.zip',
    fileSize: '1.2 MB',
    downloads: 2100,
    icon: '📦',
    createdAt: new Date().toISOString(),
  },
]

export function ResourcesProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(defaultResources)
  const [audioIntroUrl, setAudioIntroUrl] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setResources(JSON.parse(stored))
        } catch (e) {
          console.error('Failed to parse resources:', e)
        }
      }
      
      const storedAudio = localStorage.getItem(AUDIO_STORAGE_KEY)
      if (storedAudio) {
        setAudioIntroUrl(storedAudio)
      }
      
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever resources change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resources))
    }
  }, [resources, isLoaded])

  // Save audio URL to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(AUDIO_STORAGE_KEY, audioIntroUrl)
    }
  }, [audioIntroUrl, isLoaded])

  const addResource = (resource: Omit<Resource, 'id' | 'downloads' | 'createdAt'>) => {
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      downloads: 0,
      createdAt: new Date().toISOString(),
    }
    setResources(prev => [newResource, ...prev])
  }

  const updateResource = (id: string, updates: Partial<Resource>) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  return (
    <ResourcesContext.Provider value={{ 
      resources, 
      addResource, 
      updateResource, 
      deleteResource,
      audioIntroUrl,
      setAudioIntroUrl
    }}>
      {children}
    </ResourcesContext.Provider>
  )
}

export function useResources() {
  const context = useContext(ResourcesContext)
  if (!context) {
    throw new Error('useResources must be used within a ResourcesProvider')
  }
  return context
}
