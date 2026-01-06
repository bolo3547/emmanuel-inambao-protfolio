'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    as?: 'button'
  }

type ButtonAsAnchor = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    as: 'a'
    href: string
  }

type ButtonAsLink = BaseButtonProps & {
  as: 'link'
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

/**
 * Reusable button component with multiple variants
 * Supports button, anchor, and Next.js Link elements
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900'
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'border border-dark-600 text-dark-200 hover:border-primary-500 hover:text-primary-400 focus:ring-primary-500',
    accent: 'bg-accent-500 text-dark-900 hover:bg-accent-400 focus:ring-accent-500',
    ghost: 'text-dark-400 hover:text-white hover:bg-dark-800 focus:ring-dark-500',
  }
  
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  // Motion wrapper for subtle hover animation
  const MotionWrapper = ({ children }: { children: ReactNode }) => (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  )

  if (props.as === 'a') {
    const { as, ...anchorProps } = props as ButtonAsAnchor
    return (
      <MotionWrapper>
        <a className={combinedStyles} {...anchorProps}>
          {children}
        </a>
      </MotionWrapper>
    )
  }

  if (props.as === 'link') {
    const { as, href, ...linkProps } = props as ButtonAsLink
    return (
      <MotionWrapper>
        <Link href={href} className={combinedStyles}>
          {children}
        </Link>
      </MotionWrapper>
    )
  }

  const { as, ...buttonProps } = props as ButtonAsButton
  return (
    <MotionWrapper>
      <button className={combinedStyles} {...buttonProps}>
        {children}
      </button>
    </MotionWrapper>
  )
}
