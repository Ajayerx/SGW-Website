import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  magnetic?: boolean
}

export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  magnetic = true,
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isShimmering, setIsShimmering] = useState(false)
  const [shimmerKey, setShimmerKey] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic) return
      const el = buttonRef.current ?? anchorRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      x.set((e.clientX - centerX) * 0.2)
      y.set((e.clientY - centerY) * 0.2)
    },
    [magnetic, x, y],
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShimmerKey((k) => k + 1)
    setIsShimmering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleShimmerComplete = useCallback(() => {
    setIsShimmering(false)
  }, [])

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20',
    secondary:
      // light text in dark mode
      'bg-secondary text-secondary-foreground dark:text-white border border-border hover:border-primary/40 dark:hover:border-accent/50',
    ghost:
      'bg-transparent text-foreground hover:bg-secondary/70 dark:hover:bg-secondary/60 border border-transparent',
  }

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: cn(
      'relative group inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors duration-300 overflow-hidden cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      sizeClasses[size],
      variantClasses[variant],
      className,
    ),
    style: { x: xSpring, y: ySpring },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  }

  const innerContent = (
    <>
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan), var(--color-primary))',
            backgroundSize: '300% 300%',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={
            isHovered
              ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {variant === 'primary' && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl"
            animate={{
              opacity: isHovered ? 0.9 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl" />
        </>
      )}

      {variant === 'ghost' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/8 to-accent/8"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <AnimatePresence>
        {isShimmering && (
          <motion.div
            key={shimmerKey}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-xl pointer-events-none dark:via-white/25"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onAnimationComplete={handleShimmerComplete}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-xl bg-white/20 dark:bg-white/10"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <motion.a ref={anchorRef} href={href} {...motionProps}>
        {innerContent}
      </motion.a>
    )
  }

  return (
    <motion.button ref={buttonRef} onClick={onClick} {...motionProps}>
      {innerContent}
    </motion.button>
  )
}

interface MagneticWrapProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticWrap({ children, strength = 0.3, className }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}