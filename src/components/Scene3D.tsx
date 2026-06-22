import { useRef, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'

// ─────────────────────────────────────────────
// Simplex Noise (compact)
// ─────────────────────────────────────────────
class SimplexNoise {
  private perm: number[]
  
  constructor(seed = 0) {
    this.perm = []
    const p = new Array(256)
    for (let i = 0; i < 256; i++) p[i] = i
    for (let i = 255; i > 0; i--) {
      seed = (seed * 16807) % 2147483647
      const j = seed % (i + 1)
      ;[p[i], p[j]] = [p[j], p[i]]
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255]
  }

  private grad(hash: number, x: number, y: number) {
    const h = hash & 7
    const u = h < 4 ? x : y
    const v = h < 4 ? y : x
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v)
  }

  noise2D(x: number, y: number) {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10)
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10)
    const aa = this.perm[this.perm[X] + Y]
    const ab = this.perm[this.perm[X] + Y + 1]
    const ba = this.perm[this.perm[X + 1] + Y]
    const bb = this.perm[this.perm[X + 1] + Y + 1]
    const x1 = this.grad(aa, xf, yf) + u * (this.grad(ba, xf - 1, yf) - this.grad(aa, xf, yf))
    const x2 = this.grad(ab, xf, yf - 1) + u * (this.grad(bb, xf - 1, yf - 1) - this.grad(ab, xf, yf - 1))
    return x1 + v * (x2 - x1)
  }
}

// ─────────────────────────────────────────────
// Flow Field Point
// ─────────────────────────────────────────────
interface FlowPoint {
  x: number; y: number
  px: number; py: number
  speed: number
  life: number; maxLife: number
  hue: number
  width: number
}

// ─────────────────────────────────────────────
// Tech Label
// ─────────────────────────────────────────────
interface TechLabel {
  text: string
  x: number; y: number
  targetX: number; targetY: number
  alpha: number
  scale: number
  rotation: number
  speed: number
  phase: number
}

export function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 })
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)
  const flowPointsRef = useRef<FlowPoint[]>([])
  const labelsRef = useRef<TechLabel[]>([])
  const noiseRef = useRef(new SimplexNoise(42))

  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!
    const noise = noiseRef.current
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ── Tech labels ──
    const techTexts = [
      'TypeScript', 'React', 'Next.js', 'Node.js', 'Go',
      'Kubernetes', 'Docker', 'PostgreSQL', 'Redis', 'GraphQL',
      'AWS', 'AI/ML'
    ]

    const initLabels = () => {
      labelsRef.current = techTexts.map((text, i) => ({
        text,
        x: Math.random() * W,
        y: Math.random() * H,
        targetX: Math.random() * W,
        targetY: Math.random() * H,
        alpha: 0.08 + Math.random() * 0.12,
        scale: 0.8 + Math.random() * 0.6,
        rotation: (Math.random() - 0.5) * 0.3,
        speed: 0.0003 + Math.random() * 0.0005,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    // ── Init flow points ──
    const initFlow = () => {
      const count = W < 768 ? 200 : 500
      flowPointsRef.current = Array.from({ length: count }, () => createFlowPoint())
    }

    const createFlowPoint = (): FlowPoint => {
      const maxLife = 200 + Math.random() * 300
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        px: 0, py: 0,
        speed: 0.8 + Math.random() * 1.5,
        life: Math.random() * maxLife,
        maxLife,
        hue: Math.random() < 0.5 ? 160 : 220,
        width: 0.5 + Math.random() * 1.5,
      }
    }

    // ── Resize ──
    const resize = () => {
      W = container.clientWidth
      H = container.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initFlow()
      initLabels()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // ── Mouse ──
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current.x = t.clientX - rect.left
      mouseRef.current.y = t.clientY - rect.top
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })

    // ── Draw mesh gradient background ──
    const drawMeshGradient = (t: number, dark: boolean) => {
      // Base
      ctx.fillStyle = dark ? '#050a15' : '#f8faff'
      ctx.fillRect(0, 0, W, H)

      // Animated color blobs
      const blobs = dark
        ? [
            { x: 0.2, y: 0.3, r: 0.45, color: [10, 60, 120], speed: 0.15 },
            { x: 0.8, y: 0.7, r: 0.4, color: [10, 80, 50], speed: 0.12 },
            { x: 0.5, y: 0.5, r: 0.5, color: [30, 20, 80], speed: 0.1 },
            { x: 0.15, y: 0.8, r: 0.35, color: [0, 100, 80], speed: 0.18 },
          ]
        : [
            { x: 0.25, y: 0.35, r: 0.5, color: [200, 220, 255], speed: 0.12 },
            { x: 0.75, y: 0.65, r: 0.45, color: [200, 255, 220], speed: 0.1 },
            { x: 0.5, y: 0.2, r: 0.4, color: [230, 210, 255], speed: 0.15 },
          ]

      blobs.forEach(b => {
        const bx = W * (b.x + Math.sin(t * b.speed) * 0.08)
        const by = H * (b.y + Math.cos(t * b.speed * 0.7) * 0.08)
        const br = Math.min(W, H) * b.r

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        const [r, g, bb] = b.color
        const alpha = dark ? 0.4 : 0.6
        grad.addColorStop(0, `rgba(${r},${g},${bb},${alpha})`)
        grad.addColorStop(0.6, `rgba(${r},${g},${bb},${alpha * 0.3})`)
        grad.addColorStop(1, 'transparent')
        
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })
    }

    // ── Draw 3D wave terrain ──
    const drawWaveTerrain = (t: number, dark: boolean) => {
      const rows = 30
      const cols = 40
      const cellW = W / cols
      const cellH = H * 0.4 / rows
      const startY = H * 0.75
      const perspective = 0.6
      const waveHeight = 25

      ctx.save()

      for (let row = 0; row < rows; row++) {
        const rowProgress = row / rows
        const yBase = startY + row * cellH * (1 - rowProgress * perspective * 0.3)
        const alpha = (dark ? 0.08 : 0.06) * (1 - rowProgress * 0.7)

        ctx.beginPath()
        ctx.moveTo(0, yBase)

        for (let col = 0; col <= cols; col++) {
          const x = col * cellW
          const colProgress = col / cols
          
          // Multiple wave layers
          const wave1 = Math.sin(col * 0.3 + t * 0.8 + row * 0.2) * waveHeight * (1 - rowProgress * 0.5)
          const wave2 = Math.sin(col * 0.15 + t * 0.5 - row * 0.1) * waveHeight * 0.5
          const wave3 = noise.noise2D(col * 0.05 + t * 0.2, row * 0.1) * waveHeight * 0.8
          
          const y = yBase + wave1 + wave2 + wave3
          ctx.lineTo(x, y)
        }

        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, yBase - waveHeight, 0, yBase + H - startY)
        if (dark) {
          grad.addColorStop(0, `rgba(40,180,120,${alpha * 1.5})`)
          grad.addColorStop(0.3, `rgba(20,100,180,${alpha})`)
          grad.addColorStop(1, `rgba(10,40,80,${alpha * 0.3})`)
        } else {
          grad.addColorStop(0, `rgba(21,101,216,${alpha * 1.2})`)
          grad.addColorStop(0.3, `rgba(31,174,59,${alpha * 0.8})`)
          grad.addColorStop(1, `rgba(150,200,255,${alpha * 0.2})`)
        }
        ctx.fillStyle = grad
        ctx.fill()

        // Line stroke
        if (row % 3 === 0) {
          ctx.beginPath()
          ctx.moveTo(0, yBase)
          for (let col = 0; col <= cols; col++) {
            const x = col * cellW
            const wave1 = Math.sin(col * 0.3 + t * 0.8 + row * 0.2) * waveHeight * (1 - rowProgress * 0.5)
            const wave2 = Math.sin(col * 0.15 + t * 0.5 - row * 0.1) * waveHeight * 0.5
            const wave3 = noise.noise2D(col * 0.05 + t * 0.2, row * 0.1) * waveHeight * 0.8
            ctx.lineTo(x, yBase + wave1 + wave2 + wave3)
          }
          ctx.strokeStyle = dark 
            ? `rgba(40,180,120,${alpha * 2})` 
            : `rgba(21,101,216,${alpha * 1.5})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      ctx.restore()
    }

    // ── Draw flow field ──
    const drawFlowField = (t: number, dark: boolean) => {
      const points = flowPointsRef.current
      const mx = mouseRef.current.smoothX
      const my = mouseRef.current.smoothY

      points.forEach(p => {
        p.px = p.x
        p.py = p.y

        // Flow angle from noise
        const scale = 0.003
        const angle = noise.noise2D(p.x * scale + t * 0.1, p.y * scale) * Math.PI * 4

        // Mouse influence
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let mouseInfluence = 0
        if (dist < 200) {
          mouseInfluence = (1 - dist / 200) * 2
          const mouseAngle = Math.atan2(dy, dx) + Math.PI / 2
          p.x += Math.cos(mouseAngle) * mouseInfluence
          p.y += Math.sin(mouseAngle) * mouseInfluence
        }

        // Normal flow
        p.x += Math.cos(angle) * p.speed
        p.y += Math.sin(angle) * p.speed

        // Life
        p.life--
        if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
          Object.assign(p, createFlowPoint())
          p.px = p.x
          p.py = p.y
        }

        // Draw
        const lifeRatio = p.life / p.maxLife
        const fadeIn = Math.min(1, (p.maxLife - p.life) / 30)
        const fadeOut = Math.min(1, p.life / 30)
        const alpha = lifeRatio * fadeIn * fadeOut * (dark ? 0.15 : 0.1)

        if (alpha > 0.01) {
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(p.x, p.y)
          
          const hue = p.hue + Math.sin(t * 0.5) * 20
          ctx.strokeStyle = `hsla(${hue},70%,${dark ? 60 : 45}%,${alpha})`
          ctx.lineWidth = p.width
          ctx.stroke()
        }
      })
    }

    // ── Draw aurora curves ──
    const drawAurora = (t: number, dark: boolean) => {
      const curves = [
        { yBase: 0.25, amplitude: 80, frequency: 0.003, speed: 0.3, hue: 160, alpha: dark ? 0.06 : 0.04, width: 80 },
        { yBase: 0.35, amplitude: 60, frequency: 0.004, speed: 0.25, hue: 220, alpha: dark ? 0.05 : 0.035, width: 60 },
        { yBase: 0.15, amplitude: 100, frequency: 0.002, speed: 0.2, hue: 280, alpha: dark ? 0.04 : 0.03, width: 100 },
      ]

      curves.forEach(curve => {
        ctx.beginPath()
        
        for (let x = 0; x <= W; x += 3) {
          const wave1 = Math.sin(x * curve.frequency + t * curve.speed) * curve.amplitude
          const wave2 = Math.sin(x * curve.frequency * 2.5 + t * curve.speed * 1.3) * curve.amplitude * 0.3
          const noiseVal = noise.noise2D(x * 0.005 + t * 0.1, curve.yBase * 10) * curve.amplitude * 0.5
          const y = H * curve.yBase + wave1 + wave2 + noiseVal
          
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `hsla(${curve.hue + Math.sin(t * 0.3) * 30},60%,${dark ? 50 : 40}%,${curve.alpha})`
        ctx.lineWidth = curve.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()

        // Thinner bright core
        ctx.strokeStyle = `hsla(${curve.hue + Math.sin(t * 0.3) * 30},70%,${dark ? 60 : 45}%,${curve.alpha * 1.5})`
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // ── Draw floating tech labels ──
    const drawLabels = (t: number, dark: boolean) => {
      const labels = labelsRef.current
      const mx = mouseRef.current.smoothX
      const my = mouseRef.current.smoothY

      labels.forEach((label, i) => {
        // Slow drift
        label.x += (label.targetX - label.x) * 0.005
        label.y += (label.targetY - label.y) * 0.005

        // Pick new target when close
        if (Math.abs(label.x - label.targetX) < 5) {
          label.targetX = W * 0.1 + Math.random() * W * 0.8
          label.targetY = H * 0.1 + Math.random() * H * 0.6
        }

        // Mouse repel
        const dx = label.x - mx
        const dy = label.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (1 - dist / 150) * 2
          label.x += (dx / dist) * force
          label.y += (dy / dist) * force
        }

        // Subtle float
        const floatY = Math.sin(t * 0.5 + label.phase) * 8
        const floatX = Math.cos(t * 0.3 + label.phase * 1.3) * 5
        const drawX = label.x + floatX
        const drawY = label.y + floatY

        // Pulsing alpha
        const alpha = label.alpha * (0.7 + Math.sin(t * 0.8 + label.phase) * 0.3)

        ctx.save()
        ctx.translate(drawX, drawY)
        ctx.rotate(label.rotation + Math.sin(t * 0.2 + label.phase) * 0.02)
        ctx.scale(label.scale, label.scale)
        
        ctx.font = `500 13px 'Inter', system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Text
        ctx.fillStyle = dark 
          ? `rgba(120,180,160,${alpha})`
          : `rgba(40,80,120,${alpha})`
        ctx.fillText(label.text, 0, 0)

        ctx.restore()
      })
    }

    // ── Draw subtle grid dots ──
    const drawDotGrid = (t: number, dark: boolean) => {
      const spacing = 40
      const mx = mouseRef.current.smoothX
      const my = mouseRef.current.smoothY
      
      for (let x = spacing; x < W; x += spacing) {
        for (let y = spacing; y < H * 0.7; y += spacing) {
          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          // Expand near mouse
          const expand = dist < 150 ? (1 - dist / 150) * 3 : 0
          const alpha = (dark ? 0.04 : 0.06) + expand * 0.08
          const size = 0.5 + expand

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = dark 
            ? `rgba(100,160,140,${alpha})`
            : `rgba(60,100,150,${alpha})`
          ctx.fill()
        }
      }
    }

    // ── Draw central glow ──
    const drawCenterGlow = (t: number, dark: boolean) => {
      const cx = W / 2 + Math.sin(t * 0.2) * 30
      const cy = H * 0.4 + Math.cos(t * 0.15) * 20
      const radius = Math.min(W, H) * 0.35

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      if (dark) {
        glow.addColorStop(0, 'rgba(30,120,100,0.08)')
        glow.addColorStop(0.5, 'rgba(20,80,120,0.04)')
        glow.addColorStop(1, 'transparent')
      } else {
        glow.addColorStop(0, 'rgba(100,150,255,0.06)')
        glow.addColorStop(0.5, 'rgba(80,180,120,0.03)')
        glow.addColorStop(1, 'transparent')
      }
      
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)
    }

    // ── Main loop ──
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      
      timeRef.current += 0.016
      const t = timeRef.current
      const dark = resolvedTheme !== 'light'

      // Smooth mouse
      mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * 0.05
      mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * 0.05

      // Clear
      ctx.clearRect(0, 0, W, H)

      // Layers
      drawMeshGradient(t, dark)
      drawCenterGlow(t, dark)
      drawDotGrid(t, dark)
      drawAurora(t, dark)
      drawFlowField(t, dark)
      drawWaveTerrain(t, dark)
      drawLabels(t, dark)
    }

    // ── Visibility ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafRef.current) loop()
        } else {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = 0
        }
      },
      { threshold: 0 }
    )
    observer.observe(container)

    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      observer.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [resolvedTheme])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}