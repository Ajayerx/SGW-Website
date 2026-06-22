import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import {
  ArrowRight,
  Layers,
  Users,
  Zap,
  Shield,
  Brain,
  MessageSquare,
} from 'lucide-react'

const reasons = [
  {
    icon: Layers,
    title: 'End-to-End Ownership',
    description:
      'From discovery to deployment, one team owns the entire process. No handoffs, no dropped balls, no blame games.',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: Users,
    title: 'Senior Engineering Team',
    description:
      'Experienced engineers who have built and scaled production systems. Every person on your project has 6+ years of real-world experience.',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Zap,
    title: 'Startup Speed',
    description:
      'Rapid execution without sacrificing quality or maintainability. We ship fast, but we ship clean.',
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Reliability',
    description:
      'Secure, scalable systems designed for long-term growth. Built to handle millions of users and mission-critical workloads.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'AI-Ready Solutions',
    description:
      'Every product is designed to integrate AI capabilities and future automation opportunities. Not bolted on — built in.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: MessageSquare,
    title: 'Transparent Communication',
    description:
      'Weekly updates, clear timelines, and complete project visibility. You always know where your project stands.',
    gradient: 'from-violet-500 to-purple-600',
  },
]

export function WhyCTOs() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Choose Us"
          title="Why companies choose "
          gradientWord="Softgoway"
          description="We do not just write code. We take ownership, communicate clearly, and deliver outcomes that move your business forward."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative p-6 lg:p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-5 shadow-lg`}
              >
                <reason.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold font-[var(--font-heading)] text-foreground mb-3 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
