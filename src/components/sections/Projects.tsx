'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import { useProjects } from '@/lib/projects'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { projects } = useProjects()

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 lg:py-32 bg-dark-900/50"
      aria-labelledby="projects-heading"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 id="projects-heading" className="section-heading mt-2">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Real-world engineering solutions that combine embedded hardware, 
            IoT connectivity, and intuitive interfaces to solve tangible problems.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-dark-400 mb-4">
            Want to see more projects or discuss a collaboration?
          </p>
          <a
            href="https://github.com/bolo3574"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
