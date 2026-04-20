import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'


interface LoadingScreenProps {
  minDuration?: number
  brandName?: string
  brandLetter?: string
}


// ─────────────────────────────────────────────
// Animated counter for the percentage display
// ─────────────────────────────────────────────
function ProgressNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 })
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

  useEffect(() => {
    // Realistic progress simulation — starts fast, slows near 90, 
    // never auto-completes to 100 (avoids the "done but waiting" look)
    intervalRef.current = setInterval(() => {
      progressRef.current += Math.random() * 12 * (1 - progressRef.current / 120)
      const capped = Math.min(progressRef.current, 90)
      setProgress(capped)

      if (capped >= 90 && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 120)

    // When minDuration elapses: snap to 100, show complete state, then exit
    const doneTimer = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(100)
      setPhase('complete')

      // Small hold at 100% so user sees it, then unmount
      setTimeout(() => setIsLoading(false), 600)
    }, minDuration)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      clearTimeout(doneTimer)
    }
  }, [minDuration])

  // Particle positions — stable, computed once
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      radius: 56 + Math.random() * 20,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 1.5,
    }))
  ).current

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
          }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* ── Ambient background orbs ── */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          {/* ── Floating grid lines ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Main content ── */}
          <div className="relative flex flex-col items-center gap-8">

            {/* ── Logo cluster ── */}
            <div className="relative w-32 h-32 flex items-center justify-center">

              {/* Orbiting particles */}
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [
                      Math.cos(p.angle) * p.radius * 0.5,
                      Math.cos(p.angle) * p.radius,
                      Math.cos(p.angle + Math.PI) * p.radius * 0.3,
                    ],
                    y: [
                      Math.sin(p.angle) * p.radius * 0.5,
                      Math.sin(p.angle) * p.radius,
                      Math.sin(p.angle + Math.PI) * p.radius * 0.3,
                    ],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* Outer slow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* Middle dashed ring */}
              <motion.div
                className="absolute inset-3 rounded-full"
                style={{
                  border: '1px dashed rgba(139,92,246,0.3)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Conic spinner ring */}
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, var(--color-primary), var(--color-accent), transparent 60%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulse ring on complete */}
              <AnimatePresence>
                {phase === 'complete' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>

              {/* Center logo */}
              <motion.div
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"
                initial={{ scale: 0, rotate: -20 }}
                animate={{
                  scale: phase === 'complete' ? [1, 1.15, 1] : 1,
                  rotate: 0,
                }}
                transition={{
                  scale: { duration: 0.4, delay: phase === 'complete' ? 0 : 0 },
                  rotate: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                }}
                style={{
                  boxShadow: '0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.2)',
                }}
              >
                {/* Inner shimmer */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="relative text-2xl font-bold text-white font-[var(--font-heading)] select-none"
                  animate={phase === 'complete' ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {brandLetter}
                </motion.span>
              </motion.div>
            </div>

            {/* ── Brand name + tagline ── */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
            >
              <motion.h2
                className="text-xl font-bold font-[var(--font-heading)] gradient-text mb-1 tracking-wide"
                animate={phase === 'complete' ? { opacity: [1, 0.6, 1] } : {}}
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
                    ? { duration: 0.3 }
                    : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                {phase === 'complete' ? 'Ready' : 'Crafting your experience'}
              </motion.p>
            </motion.div>

            {/* ── Progress track ── */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Bar + percentage row */}
              <div className="flex items-center gap-3">
                {/* Progress bar */}
                <div className="relative w-48 h-[3px] bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-neon-cyan))',
                    }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  {/* Shimmer sweep on bar */}
                  <motion.div
                    className="absolute inset-y-0 w-12 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                    animate={{ x: ['-48px', '192px'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                  />
                </div>

                {/* Percentage */}
                <span className="text-xs font-mono font-semibold text-primary tabular-nums w-8 text-right">
                  <ProgressNumber value={Math.min(progress, 100)} />%
                </span>
              </div>

              {/* Step dots */}
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
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: isActive
                              ? 'var(--color-primary)'
                              : 'var(--color-muted-foreground)',
                          }}
                          animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ duration: 0.4 }}
                        />
                        <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
                          {label}
                        </span>
                      </motion.div>
                      {i < 2 && (
                        <motion.div
                          className="w-6 h-px"
                          style={{
                            backgroundColor: progress >= (i === 0 ? 45 : 90)
                              ? 'var(--color-primary)'
                              : 'var(--color-border)',
                          }}
                          animate={{
                            opacity: progress >= (i === 0 ? 45 : 90) ? 1 : 0.3,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* ── Corner accents ── */}
          {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map(
            (pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-6 h-6 pointer-events-none`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
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
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}