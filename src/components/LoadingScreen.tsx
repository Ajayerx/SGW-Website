import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface LoadingScreenProps {
  minDuration?: number
  brandName?: string
  brandLetter?: string
}

export function LoadingScreen({
  minDuration = 2000,
  brandName = 'Softgoway',
  brandLetter = 'S',
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const doneRef = useRef(false)

  useEffect(() => {
    const start = performance.now()

    const interval = setInterval(() => {
      const elapsed = performance.now() - start
      const fake = Math.min((elapsed / minDuration) * 95, 95)
      setProgress(fake)
    }, 80)

    const timer = setTimeout(() => {
      doneRef.current = true
      setProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    }, minDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [minDuration])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full"
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
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <span className="text-lg font-bold text-white font-[var(--font-heading)] select-none">
                  {brandLetter}
                </span>
              </motion.div>
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <h2 className="text-xl font-bold font-[var(--font-heading)] gradient-text tracking-wide">
                {brandName}
              </h2>
            </motion.div>

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
                        'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                    }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs font-mono font-semibold text-primary tabular-nums w-8 text-right">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
