'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'fr' | 'pt'

interface Translations {
  [key: string]: {
    en: string
    fr: string
    pt: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', fr: 'Accueil', pt: 'Início' },
  'nav.about': { en: 'About', fr: 'À propos', pt: 'Sobre' },
  'nav.skills': { en: 'Skills', fr: 'Compétences', pt: 'Habilidades' },
  'nav.projects': { en: 'Projects', fr: 'Projets', pt: 'Projetos' },
  'nav.experience': { en: 'Experience', fr: 'Expérience', pt: 'Experiência' },
  'nav.contact': { en: 'Contact', fr: 'Contact', pt: 'Contato' },
  'nav.services': { en: 'Services', fr: 'Services', pt: 'Serviços' },
  'nav.blog': { en: 'Blog', fr: 'Blog', pt: 'Blog' },
  
  // Hero Section
  'hero.greeting': { en: "Hi, I'm", fr: 'Bonjour, je suis', pt: 'Olá, eu sou' },
  'hero.subtitle': { en: 'Electronic Engineer | IoT & Robotics Developer', fr: 'Ingénieur Électronique | Développeur IoT & Robotique', pt: 'Engenheiro Eletrônico | Desenvolvedor IoT & Robótica' },
  'hero.cta.projects': { en: 'View Projects', fr: 'Voir les projets', pt: 'Ver Projetos' },
  'hero.cta.contact': { en: 'Contact Me', fr: 'Me contacter', pt: 'Entre em Contato' },
  'hero.cta.cv': { en: 'Download CV', fr: 'Télécharger CV', pt: 'Baixar CV' },
  
  // About Section
  'about.title': { en: 'About Me', fr: 'À propos de moi', pt: 'Sobre Mim' },
  'about.description': { en: 'I am a passionate engineer dedicated to building innovative solutions', fr: 'Je suis un ingénieur passionné dédié à la création de solutions innovantes', pt: 'Sou um engenheiro apaixonado dedicado a construir soluções inovadoras' },
  
  // Skills Section
  'skills.title': { en: 'Skills & Technologies', fr: 'Compétences & Technologies', pt: 'Habilidades & Tecnologias' },
  'skills.subtitle': { en: 'Technologies I work with', fr: 'Technologies avec lesquelles je travaille', pt: 'Tecnologias com as quais trabalho' },
  
  // Projects Section
  'projects.title': { en: 'Featured Projects', fr: 'Projets en vedette', pt: 'Projetos em Destaque' },
  'projects.subtitle': { en: 'Some of my recent work', fr: 'Quelques-uns de mes travaux récents', pt: 'Alguns dos meus trabalhos recentes' },
  'projects.viewAll': { en: 'View All Projects', fr: 'Voir tous les projets', pt: 'Ver Todos os Projetos' },
  'projects.viewProject': { en: 'View Project', fr: 'Voir le projet', pt: 'Ver Projeto' },
  'projects.viewCode': { en: 'View Code', fr: 'Voir le code', pt: 'Ver Código' },
  
  // Services Section
  'services.title': { en: 'Services', fr: 'Services', pt: 'Serviços' },
  'services.subtitle': { en: 'What I can do for you', fr: 'Ce que je peux faire pour vous', pt: 'O que posso fazer por você' },
  
  // Contact Section
  'contact.title': { en: 'Get In Touch', fr: 'Contactez-moi', pt: 'Entre em Contato' },
  'contact.subtitle': { en: "Let's work together", fr: 'Travaillons ensemble', pt: 'Vamos trabalhar juntos' },
  'contact.name': { en: 'Your Name', fr: 'Votre nom', pt: 'Seu Nome' },
  'contact.email': { en: 'Your Email', fr: 'Votre email', pt: 'Seu Email' },
  'contact.message': { en: 'Your Message', fr: 'Votre message', pt: 'Sua Mensagem' },
  'contact.send': { en: 'Send Message', fr: 'Envoyer le message', pt: 'Enviar Mensagem' },
  'contact.sending': { en: 'Sending...', fr: 'Envoi en cours...', pt: 'Enviando...' },
  'contact.success': { en: 'Message sent successfully!', fr: 'Message envoyé avec succès!', pt: 'Mensagem enviada com sucesso!' },
  'contact.error': { en: 'Failed to send message. Please try again.', fr: "Échec de l'envoi. Veuillez réessayer.", pt: 'Falha ao enviar. Por favor, tente novamente.' },
  
  // Experience Section
  'experience.title': { en: 'Experience', fr: 'Expérience', pt: 'Experiência' },
  'experience.subtitle': { en: 'My professional journey', fr: 'Mon parcours professionnel', pt: 'Minha jornada profissional' },
  
  // Testimonials Section
  'testimonials.title': { en: 'Testimonials', fr: 'Témoignages', pt: 'Depoimentos' },
  'testimonials.subtitle': { en: 'What clients say about me', fr: 'Ce que les clients disent de moi', pt: 'O que os clientes dizem sobre mim' },
  
  // Footer
  'footer.rights': { en: 'All rights reserved', fr: 'Tous droits réservés', pt: 'Todos os direitos reservados' },
  'footer.built': { en: 'Built with ❤️ using Next.js', fr: 'Construit avec ❤️ en utilisant Next.js', pt: 'Construído com ❤️ usando Next.js' },
  
  // Newsletter
  'newsletter.title': { en: 'Subscribe to Newsletter', fr: "S'abonner à la newsletter", pt: 'Assine a Newsletter' },
  'newsletter.placeholder': { en: 'Enter your email', fr: 'Entrez votre email', pt: 'Digite seu email' },
  'newsletter.subscribe': { en: 'Subscribe', fr: "S'abonner", pt: 'Assinar' },
  'newsletter.success': { en: 'Thanks for subscribing!', fr: 'Merci de votre abonnement!', pt: 'Obrigado por assinar!' },
  
  // Common
  'common.learnMore': { en: 'Learn More', fr: 'En savoir plus', pt: 'Saiba Mais' },
  'common.readMore': { en: 'Read More', fr: 'Lire la suite', pt: 'Leia Mais' },
  'common.loading': { en: 'Loading...', fr: 'Chargement...', pt: 'Carregando...' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Auto-detect language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && ['en', 'fr', 'pt'].includes(savedLang)) {
      setLanguage(savedLang)
    } else {
      // Auto-detect from browser
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'fr') setLanguage('fr')
      else if (browserLang === 'pt') setLanguage('pt')
    }
  }, [])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return default values if outside provider (SSR)
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => translations[key]?.en || key,
    }
  }
  return context
}

// Language Switcher Component
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ]

  const currentLang = languages.find((l) => l.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang?.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as Language)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
