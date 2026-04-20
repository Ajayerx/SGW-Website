import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { cn } from '@/lib/utils'


interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  tiltAmount?: number
  glowIntensity?: number
  scale?: number
  perspective?: number
}


export function TiltCard({
  children,
  className,
  glowColor = 'rgba(139, 92, 246, 0.4)',
  tiltAmount = 10,
  glowIntensity = 0.4,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Spring config for smooth tilt
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]), springConfig)

  // FIX #2: Scale as a MotionValue so useSpring receives a MotionValue, not a plain number.
  // Previously: useSpring(isHovered ? scale : 1) — passed a plain number directly,
  // which is unconventional and doesn't respond reactively to hover state changes.
  const scaleTarget = useMotionValue(1)
  const scaleValue = useSpring(scaleTarget, springConfig)

  // FIX #2: Glow position as reactive MotionValues fed into useMotionTemplate.
  // Previously: glowX.get() / glowY.get() inside style={{}} read a static snapshot
  // at render time — the glow circle was frozen and never followed the cursor.
  // useMotionTemplate creates a reactive string that updates every frame without
  // triggering a React re-render, making the glow track the cursor in real time.
  const glowX = useTransform(mouseX, [0, 1], [0, 100])
  const glowY = useTransform(mouseY, [0, 1], [0, 100])
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 60%)`

  // FIX #3: Border rotation uses a dedicated motionValue for the angle,
  // driven by a CSS rotate transform on a conic-gradient div.
  // Previously animated `background` between gradient strings — FM cannot
  // interpolate CSS gradient strings so it snapped between keyframes.
  // Now the conic-gradient is static; only the div's rotation animates,
  // which FM handles perfectly as a numeric transform.
  const borderRotation = useMotionValue(0)
  const borderRotateSpring = useSpring(borderRotation, { stiffness: 60, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scaleTarget.set(scale)
    borderRotation.set(360)
  }, [scale, scaleTarget, borderRotation])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    scaleTarget.set(1)
    borderRotation.set(0)
  }, [mouseX, mouseY, scaleTarget, borderRotation])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: scaleValue,
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
      }}
      className={cn('relative', className)}
    >
      {/* FIX #2: Dynamic glow that genuinely follows cursor via useMotionTemplate */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: glowBackground,
          opacity: isHovered ? glowIntensity : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Spotlight sweep effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${glowColor} 60deg, transparent 120deg)`,
            opacity: 0.15,
          }}
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* FIX #3: Border glow — static conic-gradient div that rotates as a transform.
          The gradient itself never changes; only the CSS rotate value animates.
          This is something Framer Motion handles perfectly as a numeric interpolation. */}
      <div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none overflow-hidden"
        style={{ opacity: isHovered ? 0.8 : 0, transition: 'opacity 0.3s ease' }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${glowColor}, transparent 40%, transparent 60%, ${glowColor})`,
            rotate: borderRotateSpring,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      </div>

      {/* Content with 3D depth */}
      <div
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {children}
      </div>

      {/* Depth shadow */}
      <motion.div
        className="absolute inset-0 rounded-3xl -z-10"
        animate={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px ${glowColor}`
            : '0 10px 20px -5px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: 'translateZ(-20px)' }}
      />
    </motion.div>
  )
}


// Hover card with reveal effect — unchanged, no bugs
interface HoverRevealCardProps {
  children: React.ReactNode
  overlay?: React.ReactNode
  className?: string
}


export function HoverRevealCard({ children, overlay, className }: HoverRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn('relative overflow-hidden rounded-3xl', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {overlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {overlay}
        </motion.div>
      )}
    </motion.div>
  )
}