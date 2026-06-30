import { motion } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { GlowButton } from '@/components/GlowButton'
import { ArrowRight, Cpu, Network, Workflow, Server, Palette, GitBranch } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'

const futureTechs = [
  {
    icon: Cpu,
    title: 'Agentic Systems',
    description: 'Multi-agent orchestrators that autonomously execute complex business workflows — from customer onboarding to supply chain management.',
    status: 'Research' as const,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Network,
    title: 'MCP Protocol',
    description: 'Building standard interfaces for AI-tool communication. Model Context Protocol enables seamless integration between LLMs and enterprise systems.',
    status: 'Prototyping' as const,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Workflow,
    title: 'AI Workflows',
    description: 'Visual workflow builder for non-technical operators. Drag, connect, and deploy AI-powered automations without writing code.',
    status: 'Prototyping' as const,
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Server,
    title: 'Edge Computing',
    description: 'Sub-10ms inference at the edge for real-time AI. Run models directly on Cloudflare Workers, AWS Lambda@Edge, and mobile devices.',
    status: 'Research' as const,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Palette,
    title: 'Generative Interfaces',
    description: 'AI-generated UIs adapted to user context in real-time. Interfaces that restructure themselves based on user behavior and preferences.',
    status: 'Exploration' as const,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: GitBranch,
    title: 'Autonomous Pipelines',
    description: 'Self-healing data pipelines with automated recovery, intelligent retry logic, and predictive failure detection.',
    status: 'Prototyping' as const,
    gradient: 'from-cyan-500 to-blue-600',
  },
]

const statusColors: Record<string, string> = {
  Research: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  Prototyping: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Exploration: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

export function WhatWeBuildNext() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="building-next"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="On The Horizon"
          title="What we are building "
          gradientWord="next"
          description="Research and prototyping initiatives that will define the next generation of products we ship."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {futureTechs.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.gradient} flex items-center justify-center`}>
                    <tech.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[tech.status]}`}>
                    {tech.status}
                  </span>
                </div>
                <h3 className="text-base font-bold font-[var(--font-heading)] text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tech.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlowButton variant="secondary" size="lg" onClick={scrollToContact}>
            Get early access
            <ArrowRight className="w-5 h-5" />
          </GlowButton>
        </motion.div>
      </div>
    </section>
  )
}
