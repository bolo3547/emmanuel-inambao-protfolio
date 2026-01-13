'use client'

import { useLanguage } from '@/lib/i18n'

export default function SkipToContent() {
  const { t } = useLanguage()
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      {t('a11y.skipToContent')}
    </a>
  )
}
