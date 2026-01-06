'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Admin credentials (in production, use proper auth like NextAuth.js)
// You can override these by adding NEXT_PUBLIC_ADMIN_EMAIL and NEXT_PUBLIC_ADMIN_PASSWORD in your environment
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'denuelinambao@gmail.com'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123' // Change this to a secure password

interface AuthContextType {
  isAuthenticated: boolean
  user: { email: string } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('portfolio_auth')
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth)
          if (authData.email && authData.expiry > Date.now()) {
            setIsAuthenticated(true)
            setUser({ email: authData.email })
          } else {
            localStorage.removeItem('portfolio_auth')
          }
        } catch {
          localStorage.removeItem('portfolio_auth')
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const authData = {
        email,
        expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }
      localStorage.setItem('portfolio_auth', JSON.stringify(authData))
      setIsAuthenticated(true)
      setUser({ email })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('portfolio_auth')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
