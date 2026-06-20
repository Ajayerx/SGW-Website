import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SVGProps } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Section3D } from '@/components/Section3D'

gsap.registerPlugin(ScrollTrigger)

// ─── Premium SVG Icons ────────────────────
function SvgMagnifyingGlass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="23.5" y1="23.5" x2="32" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SvgLightbulb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M20 6C14 6 11 10.5 11 15C11 19 14 21 15 23V28H25V23C26 21 29 19 29 15C29 10.5 26 6 20 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="32" x2="25" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function SvgCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M12 12L4 20L12 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 12L36 20L28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="23" y1="8" x2="17" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SvgShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M8 6V22C8 28 20 34 20 34C20 34 32 28 32 22V6L20 2L8 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20L18.5 24L25 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SvgRocketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M20 4C16 10 12 18 12 28H28C28 18 24 10 20 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="2.2" />
      <line x1="14" y1="28" x2="10" y2="36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="20" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="26" y1="28" x2="30" y2="36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 32L12 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 32L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SvgHeadset(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M6 22V20C6 12.3 12.3 6 20 6C27.7 6 34 12.3 34 20V22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="22" width="8" height="10" rx="3" stroke="currentColor" strokeWidth="2.2" />
      <rect x="28" y="22" width="8" height="10" rx="3" stroke="currentColor" strokeWidth="2.2" />
      <line x1="20" y1="28" x2="20" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Steps Data ────────────────────────────
const steps = [
  {
    icon: SvgMagnifyingGlass,
    number: '01',
    title: 'Discovery & context',
    description:
      'We align on goals, constraints, and existing systems so we understand the real problem—not just the initial feature request.',
    gradient: 'from-brand-blue to-brand-blue-bright',
  },
  {
    icon: SvgLightbulb,
    number: '02',
    title: 'Solution shaping',
    description:
      'Together we define scope, architecture options, and success metrics, then map them into a realistic, phase‑based plan.',
    gradient: 'from-brand-yellow to-orange-600',
  },
  {
    icon: SvgCode,
    number: '03',
    title: 'Build & iterate',
    description:
      'We ship in small, reviewable slices with frequent check‑ins, keeping you close to decisions and progress as code lands.',
    gradient: 'from-brand-green-bright to-brand-blue',
  },
  {
    icon: SvgShield,
    number: '04',
    title: 'Hardening & QA',
    description:
      'We invest in testing, performance passes, and monitoring so the release behaves well in production—not just in demos.',
    gradient: 'from-brand-green to-brand-green-bright',
  },
  {
    icon: SvgRocketIcon,
    number: '05',
    title: 'Launch & rollout',
    description:
      'We support cutover, smoke tests, and staged rollouts, with a plan for handling issues and capturing early feedback.',
    gradient: 'from-brand-red to-orange-600',
  },
  {
    icon: SvgHeadset,
    number: '06',
    title: 'Support & evolution',
    description:
      'Post‑launch, we help you iterate, optimise, and plan next phases so the product keeps matching the roadmap and usage.',
    gradient: 'from-brand-blue-bright to-brand-green',
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-16%', '18%'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          '.timeline-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        )
      }

      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      )

      gsap.to('.process-bg-blob', {
        y: -40,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <Section3D variant="process" />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[900px] h-[900px] bg-gradient-radial from-primary/5 to-transparent
                     rounded-full process-bg-blob"
        />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] process-bg-blob" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] process-bg-blob" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10
                         rounded-full mb-6 border border-primary/20"
            >
              Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)]
                         mb-6 text-balance"
            >
              A clear path from idea to{' '}
              <span className="gradient-text">launch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              We follow a simple, repeatable framework that keeps projects moving:
              enough structure to stay predictable, with room to adapt as we learn.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="timeline-line h-full w-full origin-top bg-gradient-to-b from-primary via-accent to-primary" />
          </div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`process-step relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Content card */}
                <div
                  className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                    }`}
                >
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm
                               border border-border hover:border-primary/30
                               transition-all duration-500"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Glow */}
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-3xl
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                  bg-gradient-to-br ${step.gradient} blur-xl`}
                      style={{ opacity: 0.16 }}
                    />

                    {/* Step badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                  bg-gradient-to-r ${step.gradient}
                                  text-white text-xs font-semibold mb-5 tracking-wide`}
                    >
                      Step {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient}
                                 flex items-center justify-center mb-6 shadow-lg ${index % 2 === 0 ? 'lg:ml-auto' : ''
                        }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon width={32} height={32} className="text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold font-[var(--font-heading)] mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline node (desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 items-center justify-center">
                  <motion.div
                    className={`relative w-6 h-6 rounded-full bg-gradient-to-br ${step.gradient} shadow-lg`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-1 rounded-full bg-background" />
                    <div
                      className={`absolute inset-2 rounded-full bg-gradient-to-br ${step.gradient}`}
                    />
                  </motion.div>
                </div>

                {/* Spacer column */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
