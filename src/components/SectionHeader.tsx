import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GradientText } from '@/components/TextReveal'

interface SectionHeaderProps {
  badge?: string
  title: string
  gradientWord?: string
  description?: string
  className?: string
  align?: 'center' | 'left'
  badgeClassName?: string
}

export function SectionHeader({
  badge,
  title,
  gradientWord,
  description,
  className,
  align = 'center',
  badgeClassName,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const isCenter = align === 'center'

  return (
    <div
      ref={ref}
      className={cn(
        isCenter ? 'text-center' : 'text-left',
        'mb-16 lg:mb-20',
        className,
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={cn(
            'inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20',
            badgeClassName,
          )}
        >
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={cn(
          'text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6',
          isCenter ? 'text-balance' : 'text-pretty',
        )}
      >
        {title}
        {gradientWord && <GradientText>{gradientWord}</GradientText>}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            'text-lg lg:text-xl text-muted-foreground leading-relaxed',
            isCenter ? 'max-w-3xl mx-auto text-pretty' : 'max-w-2xl',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
