import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/hooks/useTheme'

function FloatingSphere({
  position,
  scale,
  speed = 1,
  distort = 0.3,
  color,
}: {
  position: [number, number, number]
  scale: number
  speed?: number
  distort?: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.3}
          metalness={0.9}
          envMapIntensity={0.5}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField({ count = 800, color }: { count?: number; color: string }) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      sizes[i] = Math.random() * 0.5 + 0.1
    }
    return { positions, sizes }
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.015
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function RotatingTorus({
  position,
  scale = 1,
  color,
}: {
  position: [number, number, number]
  scale?: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.25, 16, 100]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.05}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function GlowingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <Trail width={2} length={8} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </Trail>
  )
}

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, mouse } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (mouse.x * viewport.width) / 2,
        0.05
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (mouse.y * viewport.height) / 2,
        0.05
      )
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function SceneContent() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const primaryColor = isDark ? '#8b5cf6' : '#7c3aed'
  const accentColor = isDark ? '#a855f7' : '#9333ea'
  const particleColor = isDark ? '#a78bfa' : '#8b5cf6'

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color={accentColor} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color={primaryColor} />

      <FloatingSphere position={[-5, 2, -6]} scale={2} speed={0.4} distort={0.5} color={primaryColor} />
      <FloatingSphere position={[5, -1, -4]} scale={1} speed={0.6} distort={0.3} color={accentColor} />
      <FloatingSphere position={[2, 4, -8]} scale={0.6} speed={0.8} distort={0.4} color={primaryColor} />
      <FloatingSphere position={[-3, -3, -5]} scale={0.8} speed={0.7} distort={0.35} color={accentColor} />

      <RotatingTorus position={[6, 2, -5]} scale={1.2} color={primaryColor} />
      <RotatingTorus position={[-6, -2, -4]} scale={0.8} color={accentColor} />

      <GlowingOrb position={[3, 1, -3]} color={primaryColor} />
      <GlowingOrb position={[-4, -1, -4]} color={accentColor} />
      <GlowingOrb position={[0, 3, -5]} color={primaryColor} />

      <ParticleField count={1000} color={particleColor} />

      <MouseFollower />

      {isDark && (
        <Stars radius={120} depth={60} count={3000} factor={5} saturation={0} fade speed={0.5} />
      )}
    </>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
