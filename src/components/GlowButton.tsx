import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
}

export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-border',
    ghost: 'bg-transparent text-foreground hover:bg-secondary',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative group inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 overflow-hidden',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      {variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
        </>
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Component>
  )
}
