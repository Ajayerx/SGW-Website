import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{ scaleX, opacity }}
      >
        <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary" />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-sm opacity-60" />
      </motion.div>

      {/* Progress percentage indicator */}
      <motion.div
        className="fixed top-4 right-4 z-[99] px-3 py-1.5 rounded-full glass border border-border/50 text-xs font-medium"
        style={{ opacity }}
      >
        <motion.span>
          {scrollYProgress.get() > 0 && (
            <span className="gradient-text font-semibold">
              {Math.round(scrollYProgress.get() * 100)}%
            </span>
          )}
        </motion.span>
      </motion.div>
    </>
  )
}
