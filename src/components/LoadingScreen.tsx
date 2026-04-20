import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useTheme } from '@/hooks/useTheme'

interface LoadingScreenProps {
  minDuration?: number
  brandName?: string
  brandLetter?: string
}

// Animated counter with lighter spring
function ProgressNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    motionVal.set(value)
  }, [value, motionVal])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return <>{display}</>
}

export function LoadingScreen({
  minDuration = 2000,
  brandName = 'Softgoway',
  brandLetter = 'S',
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading')
  const progressRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    // Lower interval rate to reduce React updates
    intervalRef.current = setInterval(() => {
      progressRef.current += Math.random() * 10 * (1 - progressRef.current / 120)
      const capped = Math.min(progressRef.current, 90)
      setProgress((prev) => (capped > prev ? capped : prev))

      if (capped >= 90 && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 160)

    const doneTimer = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(100)
      setPhase('complete')
      setTimeout(() => setIsLoading(false), 500)
    }, minDuration)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      clearTimeout(doneTimer)
    }
  }, [minDuration])

  // Stable particle meta (used only for static positions; animation via CSS)
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2,
        radius: 50 + Math.random() * 14,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 0.6,
      })),
    [],
  )

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(124, 58, 237, 0.22)'
  const orbViolet = isDark ? 'rgba(88,28,135,0.5)' : 'rgba(139,92,246,0.12)'
  const orbPurple = isDark ? 'rgba(30,64,175,0.5)' : 'rgba(168,85,247,0.1)'

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          {/* Ambient background orbs – slower, simpler */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full"
              style={{
                background: `radial-gradient(circle, ${orbViolet} 0%, transparent 70%)`,
                filter: 'blur(36px)',
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, isDark ? 0.9 : 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
              style={{
                background: `radial-gradient(circle, ${orbPurple} 0%, transparent 70%)`,
                filter: 'blur(36px)',
              }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, isDark ? 0.8 : 0.6, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>

          {/* Grid – static */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(${gridColor} 1px, transparent 1px),
                linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo cluster */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Orbiting particles – CSS animation only */}
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary animate-[orbit_3.4s_ease-in-out_infinite]"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${Math.cos(p.angle) *
                      p.radius}px, ${Math.sin(p.angle) * p.radius}px)`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}

              {/* Outer static ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20" />

              {/* Middle dashed ring – subtle spin */}
              <motion.div
                className="absolute inset-3 rounded-full"
                style={{ border: '1px dashed rgba(139,92,246,0.28)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />

              {/* Conic spinner ring – main motion */}
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, var(--color-primary), var(--color-accent), transparent 60%)',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulse ring on complete */}
              <AnimatePresence>
                {phase === 'complete' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.1, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>

              {/* Center logo */}
              <motion.div
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"
                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                animate={{
                  scale: phase === 'complete' ? [1, 1.1, 1] : 1,
                  rotate: 0,
                  opacity: 1,
                }}
                transition={{
                  scale: { duration: 0.35 },
                  rotate: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.3 },
                }}
                style={{
                  boxShadow:
                    '0 0 24px rgba(139,92,246,0.35), 0 0 48px rgba(139,92,246,0.18)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/16 to-transparent"
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="relative text-2xl font-bold text-white font-[var(--font-heading)] select-none"
                  animate={phase === 'complete' ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.35 }}
                >
                  {brandLetter}
                </motion.span>
              </motion.div>
            </div>

            {/* Brand name + tagline */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
            >
              <motion.h2
                className="text-xl font-bold font-[var(--font-heading)] gradient-text mb-1 tracking-wide"
                animate={phase === 'complete' ? { opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {brandName}
              </motion.h2>
              <motion.p
                className="text-xs text-muted-foreground tracking-[0.2em] uppercase"
                animate={{
                  opacity: phase === 'complete' ? 0 : [0.5, 1, 0.5],
                }}
                transition={
                  phase === 'complete'
                    ? { duration: 0.25 }
                    : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                {phase === 'complete' ? 'Ready' : 'Crafting your experience'}
              </motion.p>
            </motion.div>

            {/* Progress track */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-48 h-[3px] bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan))',
                    }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>

                <span className="text-xs font-mono font-semibold text-primary tabular-nums w-8 text-right">
                  <ProgressNumber value={Math.min(progress, 100)} />%
                </span>
              </div>

              <div className="flex items-center gap-2">
                {['Init', 'Assets', 'Ready'].map((label, i) => {
                  const threshold = i === 0 ? 0 : i === 1 ? 45 : 90
                  const isActive = progress >= threshold
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <motion.div
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: isActive ? 1 : 0.3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: isActive
                              ? 'var(--color-primary)'
                              : 'var(--color-muted-foreground)',
                          }}
                          animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                          {label}
                        </span>
                      </motion.div>
                      {i < 2 && (
                        <motion.div
                          className="w-6 h-px"
                          style={{
                            backgroundColor:
                              progress >= (i === 0 ? 45 : 90)
                                ? 'var(--color-primary)'
                                : 'var(--color-border)',
                          }}
                          animate={{
                            opacity: progress >= (i === 0 ? 45 : 90) ? 1 : 0.3,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Corner accents – static, no animation */}
          {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map(
            (pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-6 h-6 pointer-events-none opacity-40`}
              >
                <div
                  className="w-full h-full"
                  style={{
                    borderTop: i < 2 ? '1px solid var(--color-primary)' : 'none',
                    borderBottom: i >= 2 ? '1px solid var(--color-primary)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid var(--color-primary)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid var(--color-primary)' : 'none',
                  }}
                />
              </div>
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}