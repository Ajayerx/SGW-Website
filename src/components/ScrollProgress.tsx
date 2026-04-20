import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion'
import { useState, useCallback, useId } from 'react'
import { getLenis } from '@/hooks/useLenis'


export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  // ENHANCEMENT: Unique gradient ID per instance via useId —
  // if ScrollProgress is ever rendered more than once (e.g. in tests,
  // Storybook, or portals), duplicate SVG gradient IDs cause the wrong
  // gradient to be applied. useId guarantees uniqueness per React tree.
  const gradientId = useId().replace(/:/g, '-')

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const barOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  // BUG FIX: useTransform called inside JSX (inside style prop of motion.button)
  // is a Rules of Hooks violation — hooks cannot be called conditionally or
  // inside render expressions. Moved outside to the component body.
  const scrollTopButtonOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  // ENHANCEMENT: Spring-smooth the displayed percentage so the number
  // animates fluidly rather than jumping in integer steps on fast scroll.
  const displayMotion = useMotionValue(0)
  const displaySpring = useSpring(displayMotion, { stiffness: 80, damping: 20 })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const pct = Math.round(latest * 100)
    setProgress(pct)
    displayMotion.set(pct)
  })

  useMotionValueEvent(displaySpring, 'change', (latest) => {
    setProgress(Math.round(latest))
  })

  // BUG FIX: window.scrollTo({ behavior: 'smooth' }) conflicts with Lenis —
  // same issue as the Navbar fix. Use getLenis().scrollTo(0) to keep
  // Lenis as the single scroll controller.
  const scrollToTop = useCallback(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {/* ── Progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ scaleX, opacity: barOpacity }}
        aria-hidden="true"
      >
        {/* Base gradient fill */}
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan))',
          }}
        />

        {/* Glow layer */}
        <div
          className="absolute inset-0 blur-md opacity-60"
          style={{
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan))',
          }}
        />

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
        />

        {/* Leading glow dot */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full -mr-1"
          style={{
            background: 'var(--color-neon-cyan)',
            boxShadow: '0 0 6px 2px var(--color-neon-cyan)',
          }}
        />
      </motion.div>

      {/* ── Side indicator ── */}
      <motion.div
        className="fixed top-20 right-4 z-[99] hidden lg:flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
        aria-label={`Page scroll progress: ${progress}%`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Percentage ring */}
        <motion.div
          className="relative w-14 h-14 rounded-full glass border border-border/50 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            {/* Track ring */}
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="2"
            />

            {/* ENHANCEMENT: Use pathLength={1} + style={{ pathLength: scrollYProgress }}
                instead of manually computing strokeDasharray/strokeDashoffset.
                The old value of 150.8 was hardcoded as 2π×24 ≈ 150.796 — correct
                mathematically but fragile if radius ever changes. pathLength={1}
                lets Framer Motion handle the math automatically and reactively. */}
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: scrollYProgress }}
            />

            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="50%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-neon-cyan)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage number */}
          <span
            className="relative text-xs font-bold gradient-text tabular-nums leading-none select-none"
            aria-hidden="true"
          >
            {progress}
          </span>
        </motion.div>

        {/* Section tick marks — subtle visual enhancement */}
        <motion.div
          className="flex flex-col items-center gap-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const tickThreshold = (i + 1) / 8
            const isActive = scrollYProgress.get() >= tickThreshold - 0.01
            return (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: i % 4 === 3 ? 6 : 3,
                  height: 1.5,
                  backgroundColor: 'var(--color-border)',
                }}
                animate={{
                  backgroundColor: progress / 100 >= tickThreshold - 0.01
                    ? 'var(--color-primary)'
                    : 'var(--color-border)',
                  opacity: progress / 100 >= tickThreshold - 0.01 ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
            )
          })}
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          // BUG FIX: useTransform moved out of JSX — was a Rules of Hooks violation
          style={{ opacity: scrollTopButtonOpacity }}
          className="w-10 h-10 rounded-full glass border border-border/50 flex items-center
                     justify-center hover:border-primary/30 transition-colors group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {/* Arrow icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="text-muted-foreground group-hover:text-primary transition-colors"
            aria-hidden="true"
          >
            <path
              d="M8 12V4M8 4L4 8M8 4L12 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Ripple on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            initial={{ scale: 0, opacity: 0.6 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      </motion.div>
    </>
  )
}