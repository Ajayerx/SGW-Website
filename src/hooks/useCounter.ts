'use client'

/**
 * useCounter
 * ──────────
 * Animates a number from 0 → target when `triggered` becomes true.
 * Returns the current rounded display value.
 *
 * Usage:
 *   const val = useCounter(150, isInView, { duration: 1600, delay: 200 })
 */

import { useState, useEffect, useRef } from 'react'

interface CounterOptions {
  /** Animation duration in ms. Default 1600. */
  duration?: number
  /** Start delay in ms after `triggered` becomes true. Default 0. */
  delay?: number
  /** Easing fn, receives progress 0→1, returns eased 0→1. */
  easing?: (t: number) => number
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function useCounter(
  target: number,
  triggered: boolean,
  options: CounterOptions = {},
): number {
  const { duration = 1600, delay = 0, easing = easeOutCubic } = options
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return

    const timeoutId = setTimeout(() => {
      const start = performance.now()

      const tick = (now: number) => {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        setValue(Math.round(target * easing(progress)))
        if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [triggered, target, duration, delay]) // eslint-disable-line react-hooks/exhaustive-deps

  return value
}
