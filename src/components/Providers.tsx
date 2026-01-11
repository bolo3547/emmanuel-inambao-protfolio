'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth'
import { ProjectsProvider } from '@/lib/projects'
import { ProfileProvider } from '@/lib/profile'
import { ExperienceProvider } from '@/lib/experience'
import { TestimonialProvider } from '@/lib/testimonials'
import { CertificationProvider } from '@/lib/certifications'
import { ServiceProvider } from '@/lib/services'
import { ThemeProvider } from '@/lib/theme'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <ProjectsProvider>
            <ExperienceProvider>
              <TestimonialProvider>
                <CertificationProvider>
                  <ServiceProvider>
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
                  </ServiceProvider>
                </CertificationProvider>
              </TestimonialProvider>
            </ExperienceProvider>
          </ProjectsProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
