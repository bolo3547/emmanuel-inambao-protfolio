import { Metadata } from 'next'
import CaseStudyList from './CaseStudyList'

export const metadata: Metadata = {
  title: 'Case Studies | Emmanuel Inambao',
  description: 'Detailed case studies of IoT, robotics, and engineering projects with problem-solution-results format.',
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deep dive into my most impactful projects with detailed analysis of challenges, solutions, and measurable results.
          </p>
        </div>
        
        <CaseStudyList />
      </div>
    </main>
  )
}
