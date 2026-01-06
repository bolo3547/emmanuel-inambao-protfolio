import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'

/**
 * Main portfolio page for Prof. Emmanuel Inambao
 * Electronic Engineer | IoT & Robotics Developer | Full-Stack Systems Engineer
 * 
 * This page assembles all sections of the portfolio in a clean,
 * professional layout optimized for investors, clients, and recruiters.
 */
export default function Home() {
  return (
    <>
      {/* Hero Section - First impression with name, title, and mission */}
      <Hero />
      
      {/* About Section - Engineering story and core values */}
      <About />
      
      {/* Skills Section - Technical expertise grouped by domain */}
      <Skills />
      
      {/* Projects Section - Featured engineering projects with details */}
      <Projects />
      
      {/* Education Section - Mentorship and teaching programs */}
      <Education />
      
      {/* Gallery Section - Visual portfolio of builds and diagrams */}
      <Gallery />
      
      {/* Contact Section - Get in touch form and contact info */}
      <Contact />
    </>
  )
}
