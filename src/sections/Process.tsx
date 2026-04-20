import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Search,
  Lightbulb,
  Code2,
  Rocket,
  Settings,
  HeadphonesIcon,
} from 'lucide-react'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import { Section3D } from '@/components/Section3D'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery & context',
    description:
      'We align on goals, constraints, and existing systems so we understand the real problem—not just the initial feature request.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Solution shaping',
    description:
      'Together we define scope, architecture options, and success metrics, then map them into a realistic, phase‑based plan.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Build & iterate',
    description:
      'We ship in small, reviewable slices with frequent check‑ins, keeping you close to decisions and progress as code lands.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Settings,
    number: '04',
    title: 'Hardening & QA',
    description:
      'We invest in testing, performance passes, and monitoring so the release behaves well in production—not just in demos.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Launch & rollout',
    description:
      'We support cutover, smoke tests, and staged rollouts, with a plan for handling issues and capturing early feedback.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: HeadphonesIcon,
    number: '06',
    title: 'Support & evolution',
    description:
      'Post‑launch, we help you iterate, optimise, and plan next phases so the product keeps matching the roadmap and usage.',
    gradient: 'from-indigo-500 to-purple-500',
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
                      <step.icon className="w-8 h-8 text-white" />
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