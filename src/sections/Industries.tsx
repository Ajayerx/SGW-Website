import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Stethoscope,
  Banknote,
  ShoppingCart,
  GraduationCap,
  Truck,
  Building2,
  Factory,
  Cloud,
} from 'lucide-react'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

const industries = [
  {
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'HIPAA-compliant platforms, telehealth systems, and patient management solutions.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Banknote,
    title: 'FinTech',
    description: 'Real-time analytics, payment gateways, risk management, and compliance-ready infrastructure.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Multi-vendor marketplaces, headless commerce, and AI-powered recommendation engines.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Learning management systems, virtual classrooms, and student analytics platforms.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Truck,
    title: 'Logistics',
    description: 'Fleet tracking, route optimization, warehouse management, and real-time operations dashboards.',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Property management platforms, virtual tours, and marketplace solutions for brokers and tenants.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'IoT-enabled production monitoring, supply chain visibility, and predictive maintenance systems.',
    gradient: 'from-slate-500 to-gray-600',
  },
  {
    icon: Cloud,
    title: 'SaaS & Enterprise',
    description: 'Multi-tenant platforms, internal tools, and enterprise-grade software built to scale.',
    gradient: 'from-violet-500 to-purple-600',
  },
]

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
            >
              Industries
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              Backed by deep{' '}
              <span className="gradient-text">industry expertise</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              We bring domain knowledge across sectors, so your product ships with best practices baked in—no learning curve.
            </motion.p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          staggerDelay={0.06}
        >
          {industries.map((industry) => {
            const IconComponent = industry.icon
            return (
              <StaggerItem key={industry.title}>
                <motion.div
                  className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-[var(--font-heading)] mb-2 text-foreground">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
