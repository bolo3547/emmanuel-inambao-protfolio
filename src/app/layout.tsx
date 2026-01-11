import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

// SEO metadata for the portfolio
export const metadata: Metadata = {
  title: 'Prof. Emmanuel Inambao | Electronic Engineer & IoT Developer',
  description: 'Professional portfolio of Professor Emmanuel Inambao - Electronic Engineer, IoT & Robotics Developer, Full-Stack Systems Engineer based in Lusaka, Zambia. Specializing in embedded systems, industrial automation, and smart solutions.',
  keywords: [
    'Emmanuel Inambao',
    'Electronic Engineer',
    'IoT Developer',
    'Robotics',
    'Embedded Systems',
    'Arduino',
    'ESP32',
    'Full-Stack Developer',
    'Zambia',
    'Industrial Automation',
    'Smart Systems',
  ],
  authors: [{ name: 'Emmanuel Inambao' }],
  creator: 'Emmanuel Inambao',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emmanuelinambao.com',
    title: 'Prof. Emmanuel Inambao | Electronic Engineer & IoT Developer',
    description: 'Electronic Engineer, IoT & Robotics Developer, Full-Stack Systems Engineer. Building intelligent systems that solve real-world problems.',
    siteName: 'Emmanuel Inambao Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prof. Emmanuel Inambao | Electronic Engineer & IoT Developer',
    description: 'Electronic Engineer, IoT & Robotics Developer, Full-Stack Systems Engineer. Building intelligent systems that solve real-world problems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { generatePersonSchema, generateWebsiteSchema } from '@/lib/schema'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
      </head>
      <body className={`${inter.className} bg-dark-950 text-dark-100 light:bg-slate-50 light:text-slate-900`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
