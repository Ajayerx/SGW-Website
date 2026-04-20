import { useState, useEffect, useCallback, useRef } from 'react'


export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const calculate = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

    // EDGE CASE FIX: On pages where content is shorter than the viewport
    // (e.g. during loading, or on very short pages), scrollHeight is 0.
    // Dividing by 0 produces NaN which propagates silently into consumers
    // and breaks any derived animation values (e.g. scaleX on ScrollProgress bar).
    if (scrollHeight <= 0) {
      setProgress(1)
      return
    }

    const raw = window.scrollY / scrollHeight

    // Clamp to [0, 1] — handles overscroll on iOS rubber-band bounce
    // where scrollY can briefly exceed scrollHeight, giving values > 1.
    setProgress(Math.min(Math.max(raw, 0), 1))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // PERFORMANCE: Throttle via rAF — the scroll event fires up to ~120 times/sec
      // on high refresh-rate displays. Without throttling this triggers 120 React
      // state updates/sec, each causing a re-render of every consumer.
      // rAF coalesces them into one update per display frame (~16ms at 60fps).
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        calculate()
        rafRef.current = null
      })
    }

    // EDGE CASE FIX: Calculate immediately on mount so consumers get the correct
    // value if the page loads mid-scroll (e.g. browser restores scroll position,
    // or user refreshes while scrolled down). Without this, progress stays 0
    // until the first scroll event fires.
    calculate()

    window.addEventListener('scroll', handleScroll, { passive: true })

    // EDGE CASE FIX: Recalculate when page content changes height
    // (e.g. images load, sections expand, fonts swap in).
    // Without this, scrollHeight used in calculate() is stale and
    // progress values are wrong until the next scroll event.
    const resizeObserver = new ResizeObserver(() => {
      calculate()
    })
    resizeObserver.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [calculate])

  return progress
}