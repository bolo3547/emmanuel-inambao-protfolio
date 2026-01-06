'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth'
import { ProjectsProvider } from '@/lib/projects'
import { ProfileProvider } from '@/lib/profile'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <AuthProvider>
      <ProfileProvider>
        <ProjectsProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                      bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>
          
          {/* Navigation - hidden on admin pages */}
          {!isAdminPage && <Navbar />}
          
          {/* Main content */}
          <main id="main-content">
            {children}
          </main>
          
          {/* Footer - hidden on admin pages */}
          {!isAdminPage && <Footer />}
        </ProjectsProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}
