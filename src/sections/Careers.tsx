import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import {
  Briefcase,
  ArrowRight,
} from 'lucide-react'

const roles = [
  {
    title: 'Senior Full-Stack Engineer',
    type: 'Remote · Full-time',
    description: 'Build production systems across the stack. React, Node.js, TypeScript, and cloud experience required.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Senior Backend Engineer',
    type: 'Remote · Full-time',
    description: 'Design and build scalable APIs, event-driven systems, and data pipelines. Go, Python, or Node.js.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'DevOps / Infrastructure Engineer',
    type: 'Remote · Full-time',
    description: 'Own CI/CD, Kubernetes, Terraform, and cloud infrastructure. Ensure reliability and developer velocity.',
    gradient: 'from-purple-500 to-pink-600',
  },
]

export function Careers() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
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
              Careers
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              Join the{' '}
              <span className="gradient-text">team</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              We are always looking for senior engineers who care about craft. Remote-first, competitive comp, real ownership.
            </motion.p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.1}
        >
          {roles.map((role) => (
            <StaggerItem key={role.title}>
              <motion.div
                className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 h-full"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold font-[var(--font-heading)] text-foreground mb-1">
                  {role.title}
                </h3>
                <p className="text-xs font-medium text-primary mb-3">{role.type}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {role.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Do not see a role that fits? We still want to hear from you.
          </p>
          <motion.button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border/60 text-foreground rounded-xl font-medium text-sm hover:bg-secondary transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Us Your Work
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
