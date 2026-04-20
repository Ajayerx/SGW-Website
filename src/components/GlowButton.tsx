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
  // FIX #7: Track whether shimmer is mid-animation so we never reset it early.
  // Previously the shimmer x was driven directly by isHovered state:
  //   animate={{ x: isHovered ? '100%' : '-100%' }}
  // When mouse left mid-sweep, x snapped back to '-100%' instantly — visible flicker.
  // Now we use a separate isShimmering flag. On mouse enter we start the sweep.
  // On mouse leave we let it complete naturally via onAnimationComplete before resetting.
  const [isShimmering, setIsShimmering] = useState(false)
  const [shimmerKey, setShimmerKey] = useState(0)

  // Magnetic effect — split into two refs to avoid the unsafe `as any` cast
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic) return
    const el = buttonRef.current ?? anchorRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }, [magnetic, x, y])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // Increment key to force a fresh shimmer animation on every hover entry,
    // even if the previous one didn't finish completing.
    setShimmerKey(k => k + 1)
    setIsShimmering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    // Do NOT stop shimmer here — let onAnimationComplete handle the reset.
    // This way a mid-sweep shimmer always finishes its travel before disappearing.
  }, [x, y])

  // Called by Framer Motion when the shimmer sweep finishes travelling to '100%'.
  // Only then do we reset — guaranteeing the animation always completes fully.
  const handleShimmerComplete = useCallback(() => {
    setIsShimmering(false)
  }, [])

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border border-border hover:border-primary/30',
    ghost: 'bg-transparent text-foreground hover:bg-secondary',
  }

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: cn(
      'relative group inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors duration-300 overflow-hidden cursor-pointer',
      sizeClasses[size],
      variantClasses[variant],
      className
    ),
    style: { x: xSpring, y: ySpring },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  }

  const innerContent = (
    <>
      {/* Animated border gradient for secondary variant */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan), var(--color-primary))',
            backgroundSize: '300% 300%',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Glow effect for primary variant */}
      {variant === 'primary' && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl"
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl" />
        </>
      )}

      {/* Ghost variant hover fill */}
      {variant === 'ghost' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* FIX #7: Shimmer sweep — key prop forces a fresh animation instance on
          each hover entry. isShimmering gates rendering so the element is removed
          from the DOM once the sweep completes, keeping the DOM clean.
          animate always drives x from '-100%' → '100%' in one direction only.
          Mouse leave no longer interrupts it — onAnimationComplete resets state
          only after the full sweep has finished travelling across the button. */}
      <AnimatePresence>
        {isShimmering && (
          <motion.div
            key={shimmerKey}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onAnimationComplete={handleShimmerComplete}
          />
        )}
      </AnimatePresence>

      {/* Ripple on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  // FIX: Split href vs button into two explicit render paths with correctly
  // typed refs — removes the unsafe `as any` cast from the original code.
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


// Magnetic wrapper for any element — unchanged, no bugs
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