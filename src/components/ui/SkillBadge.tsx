'use client'

import { motion } from 'framer-motion'

interface SkillBadgeProps {
  name: string
  level?: number
  variant?: 'default' | 'outline' | 'filled'
}

/**
 * Reusable skill badge component
 * Used in Skills section and project tech stacks
 */
export default function SkillBadge({
  name,
  level,
  variant = 'default',
}: SkillBadgeProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200'
  
  const variantStyles = {
    default: 'bg-dark-800 text-dark-300 border border-dark-700 hover:border-primary-500/50 hover:text-primary-400',
    outline: 'border border-dark-600 text-dark-400 hover:border-primary-500 hover:text-primary-400',
    filled: 'bg-primary-600/10 text-primary-400 border border-primary-600/30',
  }

  return (
    <motion.span
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {name}
      {level !== undefined && (
        <span className="text-xs opacity-60 font-mono">{level}%</span>
      )}
    </motion.span>
  )
}
