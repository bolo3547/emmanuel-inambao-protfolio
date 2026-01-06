'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Image as ImageIcon, 
  Monitor, 
  Cpu, 
  GitBranch,
  X,
  ZoomIn
} from 'lucide-react'

// Gallery categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'hardware', label: 'Hardware Builds' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'diagrams', label: 'Diagrams' },
]

// Gallery items data
const galleryItems = [
  {
    id: 1,
    category: 'hardware',
    title: 'ESP32 Control Board Assembly',
    description: 'Custom PCB with ESP32, relay modules, and power regulation for irrigation system',
  },
  {
    id: 2,
    category: 'hardware',
    title: 'Ultrasonic Sensor Array',
    description: 'Dual HC-SR04 setup for bottle height detection in sorting system',
  },
  {
    id: 3,
    category: 'dashboards',
    title: 'Oil Level Monitoring Dashboard',
    description: 'Real-time tank level visualization with trend analysis and alerts',
  },
  {
    id: 4,
    category: 'hardware',
    title: 'Motor Driver Integration',
    description: 'L298N driver connected to cutter robot motors with PWM control',
  },
  {
    id: 5,
    category: 'diagrams',
    title: 'Smart Irrigation System Architecture',
    description: 'Complete system block diagram showing sensor-to-cloud data flow',
  },
  {
    id: 6,
    category: 'dashboards',
    title: 'Irrigation Control Panel',
    description: 'Web-based control interface for remote pump management',
  },
  {
    id: 7,
    category: 'hardware',
    title: 'Smart Walking Stick Prototype',
    description: 'Compact design with ultrasonic sensor and vibration feedback',
  },
  {
    id: 8,
    category: 'diagrams',
    title: 'Cutter Robot Wiring Diagram',
    description: 'Detailed electrical connections for motor and sensor integration',
  },
  {
    id: 9,
    category: 'dashboards',
    title: 'Bottle Sorting Statistics',
    description: 'Production dashboard showing sorting counts and efficiency metrics',
  },
  {
    id: 10,
    category: 'hardware',
    title: 'Conveyor Belt Mechanism',
    description: 'Automated bottle transport system with speed control',
  },
  {
    id: 11,
    category: 'diagrams',
    title: 'Oil Monitor Data Flow',
    description: 'MQTT-based architecture diagram for industrial monitoring',
  },
  {
    id: 12,
    category: 'hardware',
    title: 'Solar Power Integration',
    description: 'Off-grid power system for remote irrigation controller',
  },
]

// Helper function to get category icon
function getCategoryIcon(category: string) {
  switch (category) {
    case 'hardware':
      return Cpu
    case 'dashboards':
      return Monitor
    case 'diagrams':
      return GitBranch
    default:
      return ImageIcon
  }
}

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 lg:py-32 bg-dark-900/50"
      aria-labelledby="gallery-heading"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h2 id="gallery-heading" className="section-heading mt-2">
            Engineering{' '}
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Visual documentation of hardware builds, dashboards, and system architectures 
            from real-world projects.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => {
            const Icon = getCategoryIcon(item.category)
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-square bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label={`View ${item.title}`}
              >
                {/* Placeholder background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900" />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-dark-700/50 group-hover:bg-primary-600/20 transition-colors">
                    <Icon className="w-8 h-8 text-dark-400 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm truncate">{item.title}</p>
                    <p className="text-dark-400 text-xs mt-1 truncate">{item.description}</p>
                  </div>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 p-2 bg-dark-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400">No items found in this category.</p>
          </div>
        )}

        {/* Note about placeholders */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-dark-500 text-sm mt-8"
        >
          💡 Replace placeholder images with actual project photos to showcase your work.
        </motion.p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 rounded-full text-dark-300 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image placeholder */}
              <div className="aspect-video bg-dark-900 flex items-center justify-center">
                <div className="text-center p-8">
                  {(() => {
                    const Icon = getCategoryIcon(selectedItem.category)
                    return (
                      <div className="p-6 rounded-full bg-dark-800 inline-block mb-4">
                        <Icon className="w-12 h-12 text-primary-400" />
                      </div>
                    )
                  })()}
                  <p className="text-dark-500">Image Placeholder</p>
                  <p className="text-dark-600 text-sm mt-1">{selectedItem.category.toUpperCase()}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-dark-400">{selectedItem.description}</p>
                <div className="mt-4">
                  <span className="tech-badge">{selectedItem.category}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
