import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// FIX #4: Expose a module-level singleton so any component can call
// scrollTo() without prop-drilling or context. The instance is set
// when useLenis() mounts and cleared when it unmounts.
let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    lenisInstance = lenis  // expose globally

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null  // clean up on unmount
    }
  }, [])

  return lenisRef
}