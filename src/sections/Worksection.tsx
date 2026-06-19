import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Search,
  Palette,
  Code2,
  Rocket,
  Shield,
  Zap,
  Building2,
  Eye,
  Users,
  Lock,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import { Section3D } from '@/components/Section3D'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  id: string
  icon: string
  title: string
  desc: string
  gradient: string
}

interface Reason {
  icon: React.ReactNode
  title: string
  desc: string
  stat: string
  statLabel: string
  gradient: string
}

const steps: Step[] = [
  {
    id: '01',
    icon: '🔍',
    title: 'Discovery & Strategy',
    desc: 'We audit your goals, tech stack, and constraints. Out comes a clear scope with timelines and no guesswork.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: '02',
    icon: '🎨',
    title: 'Design & Architecture',
    desc: 'UX wireframes, system architecture, and API contracts — agreed before a single line of production code.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: '03',
    icon: '⚙️',
    title: 'Build & Iterate',
    desc: 'Agile sprints with weekly demos. You see real progress, not just status updates.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: '04',
    icon: '🚀',
    title: 'Deploy & Go Live',
    desc: 'CI/CD pipelines, zero-downtime releases, and full monitoring before we hand you the keys.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: '05',
    icon: '🛡️',
    title: 'Support & Scale',
    desc: 'Post-launch SLAs, performance tuning, and a team that grows alongside your product.',
    gradient: 'from-pink-500 to-rose-600',
  },
]

const reasons: Reason[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Ship fast, break nothing',
    desc: 'Our battle-tested delivery process means you go live on schedule — without the 3 AM incident calls.',
    stat: '98%',
    statLabel: 'on-time delivery',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Product-grade engineering',
    desc: 'We write code that survives 10× growth. Scalable architecture from day one, not bolted on later.',
    stat: '10×',
    statLabel: 'scale-ready',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Full-stack ownership',
    desc: 'From database schema to pixel-perfect UI — one team, one invoice, no finger-pointing between vendors.',
    stat: '1',
    statLabel: 'point of contact',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Radical transparency',
    desc: 'Live dashboards, weekly recordings, and async stand-ups. You always know exactly where things stand.',
    stat: '24/7',
    statLabel: 'visibility',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Senior-only engineers',
    desc: 'No juniors billed as seniors. Every engineer on your project has 5+ years of production experience.',
    stat: '5+',
    statLabel: 'years avg.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'IP belongs to you',
    desc: 'Full source code transfer, no lock-in. Your intellectual property, your infrastructure, your future.',
    stat: '100%',
    statLabel: 'IP ownership',
    gradient: 'from-orange-500 to-red-600',
  },
]

function useIntersection(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function CountUp({ target, duration = 1800 }: { target: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const vis = useIntersection(ref)
  useEffect(() => {
    if (!vis) return
    const num = parseInt(String(target).replace(/\D/g, ''))
    if (isNaN(num)) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(p * num))
      if (p < 1) requestAnimationFrame(step)
      else setVal(num)
    }
    requestAnimationFrame(step)
  }, [vis, target, duration])
  const suffix = target.replace(/[\d]/g, '')
  return <span ref={ref}>{val}{suffix}</span>
}

export function WorkSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.worksection-bg-blob', {
        y: -30,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* 3D Background */}
      {/* <Section3D variant="process" /> */}

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] worksection-bg-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] worksection-bg-blob" />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── HOW WE BUILD ─── */}
        <div className="mb-28">
          <AnimatedSection className="text-center mb-16">
            <div ref={headerRef}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
              >
                OUR PROCESS
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
              >
                How We Build{' '}
                <span className="gradient-text">Your Product</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
              >
                A five-phase process refined across 150+ projects. Every step is designed to
                reduce surprises and maximize momentum.
              </motion.p>
            </div>
          </AnimatedSection>

          {/* Flow diagram */}
          <div ref={flowRef}>
            {/* Steps row */}
            <div className="hidden lg:grid grid-cols-5 gap-4 relative mb-8">
              {/* Connecting line */}
              <div className="absolute top-[22px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-violet-500/40 via-cyan-500/40 via-emerald-500/40 via-amber-500/40 to-pink-500/40" />

              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  {/* Node */}
                  <div
                    className={cn(
                      'w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg mb-4 transition-all duration-300',
                      activeStep === i
                        ? 'shadow-lg'
                        : 'border-border/30 bg-card/50'
                    )}
                    style={{
                      borderColor: activeStep === i ? undefined : undefined,
                      ...(activeStep === i
                        ? { borderColor: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)' }
                        : {}),
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      'w-full p-4 rounded-xl border text-left transition-all duration-300',
                      activeStep === i
                        ? 'bg-card/80 border-primary/30 shadow-lg shadow-primary/10 -translate-y-1'
                        : 'bg-card/30 border-border/30 hover:bg-card/50 hover:border-border/60'
                    )}
                  >
                    <div
                      className="text-[10px] font-bold tracking-widest mb-1.5 transition-colors"
                      style={{ color: activeStep === i ? 'var(--color-primary)' : undefined }}
                    >
                      {step.id}
                    </div>
                    <h3
                      className={cn(
                        'text-sm font-semibold leading-tight mb-1 transition-colors',
                        activeStep === i ? 'text-foreground' : 'text-foreground/80'
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile: vertical list */}
            <div className="lg:hidden space-y-3 mb-6">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all duration-300',
                    activeStep === i
                      ? 'bg-card/80 border-primary/30 shadow-lg'
                      : 'bg-card/30 border-border/30'
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[10px] font-bold tracking-widest"
                      style={{ color: activeStep === i ? 'var(--color-primary)' : undefined }}
                    >
                      {step.id}
                    </span>
                    <span className="text-lg">{step.icon}</span>
                    <span className={cn(
                      'text-sm font-semibold flex-1',
                      activeStep === i ? 'text-foreground' : 'text-foreground/80'
                    )}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    {step.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Active step detail panel */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 lg:p-8 rounded-2xl border bg-card/60 backdrop-blur-sm"
              style={{
                borderColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div
                  className={cn(
                    'w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 text-3xl shadow-lg',
                    steps[activeStep].gradient
                  )}
                >
                  {steps[activeStep].icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest text-primary mb-1">
                    PHASE {steps[activeStep].id}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {steps[activeStep].desc}
                  </p>
                </div>
                {/* Dots */}
                <div className="flex gap-2 lg:self-center">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300 border-none cursor-pointer',
                        i === activeStep ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── DIVIDER ─── */}
        <div className="relative h-px mb-28">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ─── WHY CHOOSE US ─── */}
        <div>
          <AnimatedSection className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
            >
              WHY SOFTGOWAY
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              The team engineers{' '}
              <span className="gradient-text">trust</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              50+ companies chose us when they needed software that actually ships — and stays up.
            </motion.p>
          </AnimatedSection>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.08}
          >
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <div className="group relative p-6 lg:p-7 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 h-full">
                  {/* Glow blob */}
                  <div
                    className={cn(
                      'absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br',
                      r.gradient
                    )}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg',
                          r.gradient
                        )}
                      >
                        <div className="text-white">
                          {r.icon}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={cn(
                            'text-3xl font-extrabold leading-none bg-gradient-to-br bg-clip-text text-transparent',
                            r.gradient
                          )}
                        >
                          <CountUp target={r.stat} />
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1">
                          {r.statLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 p-8 lg:p-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to build something exceptional?
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Free discovery call. No commitment, no sales pitch — just honest engineering advice.
              </p>
            </div>
            <motion.a
              href="#contact"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm',
                'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30',
                'hover:opacity-90 transition-opacity whitespace-nowrap'
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a free call
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
