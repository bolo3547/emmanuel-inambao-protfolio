'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const caseStudies = [
  {
    id: 'smart-agriculture',
    title: 'Smart Agriculture IoT Platform',
    subtitle: 'Revolutionizing farming with connected sensors and AI',
    image: '/images/projects/smart-agriculture.jpg',
    tags: ['IoT', 'AI/ML', 'AWS', 'Python'],
    metrics: [
      { label: 'Crop Yield Increase', value: '30%' },
      { label: 'Water Savings', value: '45%' },
      { label: 'Farms Connected', value: '50+' },
    ],
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'industrial-automation',
    title: 'Industrial Automation Robot',
    subtitle: 'Custom robotic solution for manufacturing efficiency',
    image: '/images/projects/industrial-robot.jpg',
    tags: ['Robotics', 'ROS', 'C++', 'OpenCV'],
    metrics: [
      { label: 'Cost Reduction', value: '25%' },
      { label: 'Efficiency Gain', value: '40%' },
      { label: 'Error Reduction', value: '95%' },
    ],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'autonomous-drone',
    title: 'Autonomous Drone Navigation',
    subtitle: 'AI-powered drone system for surveying and monitoring',
    image: '/images/projects/drone.jpg',
    tags: ['Drone', 'AI', 'Computer Vision', 'Python'],
    metrics: [
      { label: 'Flight Accuracy', value: '99.2%' },
      { label: 'Survey Area', value: '500+ km²' },
      { label: 'Processing Time', value: '-60%' },
    ],
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'smart-home',
    title: 'Smart Home Automation System',
    subtitle: 'Complete home IoT ecosystem with voice control',
    image: '/images/projects/smart-home.jpg',
    tags: ['IoT', 'Home Automation', 'ESP32', 'React'],
    metrics: [
      { label: 'Energy Savings', value: '35%' },
      { label: 'Devices Supported', value: '100+' },
      { label: 'Response Time', value: '<50ms' },
    ],
    color: 'from-orange-500 to-red-600',
  },
]

export default function CaseStudyList() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/case-studies/${study.id}`}>
            <motion.article
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className={`relative h-48 bg-gradient-to-r ${study.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/20 text-9xl font-bold">
                    {study.title.charAt(0)}
                  </div>
                </div>
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {study.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {study.subtitle}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Read More */}
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Read Case Study
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.article>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
