import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

const team = [
  {
    name: 'Amit Sharma',
    role: 'Founder & CEO',
    description: '15+ years building products. Previously led engineering at multiple SaaS companies.',
    gradient: 'from-violet-500 to-purple-600',
    socials: [
      { icon: Linkedin, href: '#' },
      { icon: Twitter, href: '#' },
    ],
  },
  {
    name: 'Priya Patel',
    role: 'VP Engineering',
    description: 'Architected systems serving 10M+ users. Deep expertise in distributed systems and cloud-native architectures.',
    gradient: 'from-blue-500 to-indigo-600',
    socials: [
      { icon: Linkedin, href: '#' },
    ],
  },
  {
    name: 'Rohan Mehta',
    role: 'Head of AI',
    description: 'Published ML researcher. Builds production AI systems, not just proofs of concept.',
    gradient: 'from-emerald-500 to-teal-600',
    socials: [
      { icon: Linkedin, href: '#' },
      { icon: Globe, href: '#' },
    ],
  },
  {
    name: 'Sneha Kapoor',
    role: 'Lead Product Engineer',
    description: 'Full-stack builder who ships. Leads cross-functional teams from concept to production.',
    gradient: 'from-orange-500 to-red-600',
    socials: [
      { icon: Linkedin, href: '#' },
    ],
  },
  {
    name: 'Arjun Singh',
    role: 'Head of Design',
    description: 'Designs interfaces that balance beauty with usability. Previously at top design agencies.',
    gradient: 'from-pink-500 to-rose-600',
    socials: [
      { icon: Linkedin, href: '#' },
      { icon: Twitter, href: '#' },
    ],
  },
  {
    name: 'Neha Gupta',
    role: 'Engineering Manager',
    description: 'Leads distributed engineering teams with a focus on code quality, mentoring, and delivery.',
    gradient: 'from-cyan-500 to-blue-600',
    socials: [
      { icon: Linkedin, href: '#' },
    ],
  },
]

export function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
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
              Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              Senior talent,{' '}
              <span className="gradient-text">no juniors</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              Every engineer on your project has 6+ years of experience. We hire for craft, not capacity.
            </motion.p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <motion.div
                className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 h-full"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <span className="text-xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-[var(--font-heading)] text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {member.description}
                </p>
                <div className="flex items-center gap-2">
                  {member.socials.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      className="p-2 rounded-lg bg-background/50 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
