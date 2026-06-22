import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Bot, Network, Workflow, MessageSquareCode, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { GlowButton } from '@/components/GlowButton'
import { getLenis } from '@/hooks/useLenis'

const offerings = [
  {
    icon: Bot,
    title: 'AI Agents & Copilots',
    description:
      'Custom AI agents that automate workflows, answer queries, and assist your team — powered by your own data and business logic.',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Network,
    title: 'RAG Pipeline Engineering',
    description:
      'Retrieval-augmented generation pipelines that connect LLMs to your knowledge base, databases, and APIs for accurate, grounded answers.',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Automate repetitive processes with Make.com, n8n, and Zapier — from lead enrichment to invoice processing to deployment pipelines.',
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: MessageSquareCode,
    title: 'GPT Integration Patterns',
    description:
      'Structured prompting, function calling, fine-tuning, and evaluation frameworks — production patterns that make LLMs reliable.',
    gradient: 'from-purple-500 to-pink-500',
  },
]

export function AILab() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="ai-lab"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="AI & Automation Lab"
          title="Ship with "
          gradientWord="AI"
          description="From GPT-powered features to fully autonomous workflows — we integrate AI into products that users actually trust and enjoy."
        />

        {/* Top row: 4 offering cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative p-6 lg:p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offering.gradient} flex items-center justify-center mb-5 shadow-lg`}
              >
                <offering.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold font-[var(--font-heading)] text-foreground mb-3 group-hover:text-primary transition-colors">
                {offering.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {offering.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden mb-6"
        >
          <div className="p-6 lg:p-8">
            <h3 className="text-lg font-bold font-[var(--font-heading)] mb-6">
              AI Pipeline Architecture
            </h3>
            <div className="grid grid-cols-5 gap-2 lg:gap-4">
              {[
                { label: 'User Query', metric: '→', color: 'bg-primary', pulse: true },
                { label: 'RAG Pipeline', metric: '< 400ms', color: 'bg-[var(--brand-blue-light)]', pulse: false },
                { label: 'Vector Search', metric: '99.2%', color: 'bg-[var(--brand-green-light)]', pulse: false },
                { label: 'LLM Generation', metric: '4.5s avg', color: 'bg-purple-500', pulse: false },
                { label: 'Response', metric: '97% sat.', color: 'bg-emerald-500', pulse: false },
              ].map((step, i) => (
                <div key={step.label} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: 'spring' }}
                    className={`relative w-full aspect-square max-w-[80px] rounded-2xl ${step.color} flex items-center justify-center mb-2 shadow-lg`}
                  >
                    {step.pulse && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/30"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="text-white text-lg font-bold font-[var(--font-heading)]">
                      {i + 1}
                    </span>
                  </motion.div>
                  <div className="text-[10px] text-muted-foreground text-center font-medium leading-tight">
                    {step.label}
                  </div>
                  {step.metric !== '→' && (
                    <div className="text-[10px] font-mono text-primary font-semibold mt-0.5">
                      {step.metric}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="relative h-1 mt-6 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-emerald-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom row: architecture visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 max-w-xl">
                <h3 className="text-2xl font-bold font-[var(--font-heading)] mb-4">
                  How we build AI features
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We follow a five-step process: define the task, source the data,
                  choose the model, build the pipeline, and measure the outcomes.
                  No black boxes — every AI feature ships with observability and
                  fallback logic.
                </p>
                <GlowButton variant="primary" size="md" onClick={scrollToContact}>
                  Explore AI for your product
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </div>

              <div className="flex-shrink-0 grid grid-cols-2 gap-3">
                {[
                  { label: 'LLM calls / month', value: '10M+' },
                  { label: 'Avg response time', value: '< 800ms' },
                  { label: 'Accuracy rate', value: '97%' },
                  { label: 'Production deployments', value: '50+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-card/50 border border-border/30 text-center"
                  >
                    <div className="text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
