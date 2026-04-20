import { useRef, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'


gsap.registerPlugin(ScrollTrigger)


interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  parallax?: boolean
  parallaxSpeed?: number
}
// FIX #10: Removed dead `stagger` prop from interface.
// It was declared but never read or used anywhere in the component body.
// Keeping unused props in interfaces creates false expectations for consumers
// who might pass stagger={true} and wonder why nothing changes.


const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
}


export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  parallax = false,
  parallaxSpeed = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // FIX #9: Store the ScrollTrigger instance and call .kill() in cleanup.
  // Previously the useEffect returned nothing when parallax=true, so the
  // ScrollTrigger instance was never destroyed on unmount. On pages with
  // multiple AnimatedSection components (or during React strict mode double
  // invocation) this caused stale triggers to stack up, firing on scroll
  // after the component was gone and potentially causing ghost animations
  // or "Cannot read properties of null" errors on the unmounted ref.
  useEffect(() => {
    if (!parallax || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -10 * parallaxSpeed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, ref) // scope context to this ref

    // FIX #9: ctx.revert() kills all GSAP animations and ScrollTrigger
    // instances created inside this context, cleanly on every unmount.
    return () => ctx.revert()
  }, [parallax, parallaxSpeed])


  return (
    <motion.div
      ref={ref}
      initial="hidden"
      // Simplified: useAnimation + separate controls.start() removed.
      // useInView directly drives animate — cleaner, same result,
      // and avoids the stale closure risk with useAnimation.
      animate={isInView ? 'visible' : 'hidden'}
      variants={directionVariants[direction]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}


export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}