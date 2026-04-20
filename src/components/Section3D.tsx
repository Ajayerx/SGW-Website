import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Icosahedron,
  Torus,
  Box,
  Octahedron,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/hooks/useTheme'


// ─────────────────────────────────────────────
// CONSTANTS — defined outside components so they
// are never recreated on re-render
// ─────────────────────────────────────────────
const GRID_SIZE = 6
const GRID_SPACING = 1.5

// BUG FIX: TechGrid used Math.random() inside useMemo with no stable seed.
// On remount (React Strict Mode double-invoke, HMR, section re-entry) the
// grid generated completely different heights — visible pop/reflow.
// Fixed by pre-computing a stable dataset at module level, outside React,
// so it is identical across every render and every remount.
const TECH_GRID_DATA = (() => {
  // Seeded pseudo-random using a simple LCG so output is deterministic
  let seed = 42
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return (seed >>> 0) / 0xffffffff
  }
  const items: { x: number; z: number; height: number; speed: number }[] = []
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const x = (i - GRID_SIZE / 2) * GRID_SPACING
      const z = (j - GRID_SIZE / 2) * GRID_SPACING
      const height = rand() * 0.5 + 0.1
      const speed = 1 + (i + j) * 0.1
      items.push({ x, z, height, speed })
    }
  }
  return items
})()


// ─────────────────────────────────────────────
// PERFORMANCE: Shared geometries & materials
// Reusing the same THREE objects across instances
// avoids duplicate GPU uploads every frame.
// ─────────────────────────────────────────────
const sharedGeometries = {
  sphere32: new THREE.SphereGeometry(1, 32, 32),
  sphere16: new THREE.SphereGeometry(1, 16, 16),
  torus: new THREE.TorusGeometry(1, 0.25, 16, 100),
  icosahedron: new THREE.IcosahedronGeometry(1, 0),
  octahedron: new THREE.OctahedronGeometry(1, 0),
  box: new THREE.BoxGeometry(1, 1, 1),
}


// ─────────────────────────────────────────────
// HOOK: visibility-based pause
// Stops the rAF loop when the Canvas is off-screen,
// saving GPU/CPU for sections the user hasn't reached.
// ─────────────────────────────────────────────
function useCanvasPause(containerRef: React.RefObject<HTMLDivElement | null>) {
  const { gl, scene, camera } = useThree()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gl.setAnimationLoop(() => {
            gl.render(scene, camera)
          })
        } else {
          gl.setAnimationLoop(null)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [gl, scene, camera, containerRef])
}

// ─────────────────────────────────────────────
// SCENE PAUSER — thin component that wires up
// the visibility hook inside the Canvas context
// ─────────────────────────────────────────────
function ScenePauser({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  useCanvasPause(containerRef)
  return null
}


// ─────────────────────────────────────────────
// FloatingShapes — Services section
// ─────────────────────────────────────────────
function FloatingShapes({
  color,
  secondaryColor,
}: {
  color: string
  secondaryColor: string
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.05
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh
          geometry={sharedGeometries.icosahedron}
          position={[-4, 2, -5]}
          scale={0.8}
        >
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh
          geometry={sharedGeometries.octahedron}
          position={[4, -1, -4]}
          scale={0.6}
        >
          <meshStandardMaterial
            color={secondaryColor}
            wireframe
            transparent
            opacity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh
          geometry={sharedGeometries.box}
          position={[3, 3, -6]}
          scale={0.5}
          rotation={[0.5, 0.5, 0]}
        >
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh
          geometry={sharedGeometries.torus}
          position={[-3, -2, -4]}
          scale={0.7}
        >
          <meshStandardMaterial
            color={secondaryColor}
            wireframe
            transparent
            opacity={0.4}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  )
}


// ─────────────────────────────────────────────
// AboutParticles — About section
// BUG FIX: `speeds` array was generated in useMemo
// but never used in useFrame — wasted allocation.
// Removed speeds, kept only positions.
// ─────────────────────────────────────────────
function AboutParticles({
  count = 300,
  color,
}: {
  count?: number
  color: string
}) {
  // PERFORMANCE: lower default count 400→300, still visually rich
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return arr
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })


  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}


// ─────────────────────────────────────────────
// GlowingOrbs — Footer section
// ─────────────────────────────────────────────
function GlowingOrbs({
  color,
  secondaryColor,
}: {
  color: string
  secondaryColor: string
}) {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orb1Ref.current) {
      orb1Ref.current.position.y = Math.sin(t * 0.5) * 0.5
      orb1Ref.current.position.x = Math.cos(t * 0.3) * 0.3
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.y = Math.sin(t * 0.7 + 2) * 0.4
      orb2Ref.current.position.x = Math.cos(t * 0.4 + 1) * 0.4
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.y = Math.sin(t * 0.6 + 4) * 0.3
      orb3Ref.current.position.x = Math.cos(t * 0.5 + 2) * 0.5
    }
  })

  return (
    <group>
      <Sphere
        ref={orb1Ref}
        args={[0.5, 32, 32]}
        position={[-3, 0, -3]}
      >
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </Sphere>
      <Sphere
        ref={orb2Ref}
        args={[0.3, 32, 32]}
        position={[3, 1, -4]}
      >
        <MeshDistortMaterial
          color={secondaryColor}
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.5}
        />
      </Sphere>
      <Sphere
        ref={orb3Ref}
        args={[0.4, 32, 32]}
        position={[0, -1, -2]}
      >
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </group>
  )
}


// ─────────────────────────────────────────────
// RotatingRings — Process section
// ─────────────────────────────────────────────

// PERFORMANCE: Shared torus geometries for rings at module level
const ringGeo1 = new THREE.TorusGeometry(3, 0.05, 16, 100)
const ringGeo2 = new THREE.TorusGeometry(2.5, 0.04, 16, 100)
const ringGeo3 = new THREE.TorusGeometry(2, 0.03, 16, 100)

function RotatingRings({
  color,
  secondaryColor,
}: {
  color: string
  secondaryColor: string
}) {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2
      ring1Ref.current.rotation.y = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.15
      ring2Ref.current.rotation.z = t * 0.2
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.25
      ring3Ref.current.rotation.z = -t * 0.1
    }
  })

  return (
    <group position={[0, 0, -8]}>
      <mesh ref={ring1Ref} geometry={ringGeo1}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={ring2Ref}
        geometry={ringGeo2}
        rotation={[Math.PI / 4, 0, 0]}
      >
        <meshStandardMaterial
          color={secondaryColor}
          transparent
          opacity={0.25}
          metalness={0.9}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={ring3Ref}
        geometry={ringGeo3}
        rotation={[0, Math.PI / 4, Math.PI / 6]}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          metalness={0.9}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}


// ─────────────────────────────────────────────
// TechGrid — Technologies section
// BUG FIX: Math.random() inside useMemo caused
// different heights on every remount → visual pop.
// Now uses TECH_GRID_DATA pre-computed at module level.
// ─────────────────────────────────────────────
function TechGrid({ color }: { color: string }) {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + 0.3
    gridRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={gridRef} position={[0, -3, -10]}>
      {TECH_GRID_DATA.map((box, index) => (
        <Float key={index} speed={box.speed} floatIntensity={0.3}>
          <Box
            args={[0.8, box.height, 0.8]}
            position={[box.x, box.height / 2, box.z]}
          >
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.15 + box.height * 0.3}
              metalness={0.9}
              roughness={0.1}
              depthWrite={false}
            />
          </Box>
        </Float>
      ))}
    </group>
  )
}


// ─────────────────────────────────────────────
// SceneContent — picks the right scene per variant
// ─────────────────────────────────────────────
type Variant = 'services' | 'about' | 'process' | 'technologies' | 'footer'

function SceneContent({
  variant,
  containerRef,
}: {
  variant: Variant
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const primaryColor = isDark ? '#8b5cf6' : '#7c3aed'
  const accentColor = isDark ? '#a855f7' : '#9333ea'
  const particleColor = isDark ? '#a78bfa' : '#8b5cf6'

  return (
    <>
      {/* ScenePauser wires up IntersectionObserver inside Canvas context */}
      <ScenePauser containerRef={containerRef} />

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 5]} intensity={0.5} color={primaryColor} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color={accentColor} />

      {variant === 'services' && <FloatingShapes color={primaryColor} secondaryColor={accentColor} />}
      {variant === 'about' && <AboutParticles count={300} color={particleColor} />}
      {variant === 'process' && <RotatingRings color={primaryColor} secondaryColor={accentColor} />}
      {variant === 'technologies' && <TechGrid color={primaryColor} />}
      {variant === 'footer' && <GlowingOrbs color={primaryColor} secondaryColor={accentColor} />}
    </>
  )
}


// ─────────────────────────────────────────────
// Section3D — public export
// PERFORMANCE: frameloop="demand" means R3F only
// renders a new frame when something actually changes,
// instead of the default 60fps loop running even when
// the scene is completely static (e.g. between user interactions).
// Scenes with constant useFrame motion override this automatically.
// ─────────────────────────────────────────────

// PERFORMANCE: Variants that run constant useFrame loops
// need 'always' frameloop. Static or near-static scenes
// use 'demand' to save GPU cycles.
const ALWAYS_LOOP_VARIANTS: Variant[] = [
  'services',
  'about',
  'process',
  'technologies',
  'footer',
]

interface Section3DProps {
  variant: Variant
  className?: string
}

export function Section3D({ variant, className }: Section3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameloop = ALWAYS_LOOP_VARIANTS.includes(variant) ? 'always' : 'demand'

  // PERFORMANCE: Reduce DPR on low-end devices
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5])

  useEffect(() => {
    // Cap DPR at 1 on mobile to avoid heavy GPU load on small canvases
    if (window.matchMedia('(max-width: 768px)').matches) {
      setDpr([1, 1])
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className ?? ''}`}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={dpr}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          // PERFORMANCE: These two flags reduce overdraw cost on transparent scenes
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
        }}
        style={{ background: 'transparent' }}
        // PERFORMANCE: Prevent R3F from auto-resizing every frame
        resize={{ scroll: false, debounce: { scroll: 50, resize: 200 } }}
      >
        <Suspense fallback={null}>
          <SceneContent variant={variant} containerRef={containerRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}