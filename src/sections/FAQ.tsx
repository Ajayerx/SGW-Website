import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Do you work with startups?',
    answer:
      'Yes. We work with startups from seed stage through Series C and beyond. Our engagement models scale with your stage — from MVP builds to dedicated engineering teams.',
  },
  {
    question: 'What is a typical project timeline?',
    answer:
      'Most projects start with a 2-week discovery phase to align on scope, architecture, and timeline. After that, we ship in 2-week sprints. A typical MVP takes 8-12 weeks, while larger platforms are phased into 3-month increments.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Absolutely. We sign NDAs before any discovery conversation. Your ideas, code, and business logic remain confidential throughout our engagement and beyond.',
  },
  {
    question: 'Who owns the source code?',
    answer:
      'You do. 100% of the source code, designs, and intellectual property belong to you from day one. No licensing fees, no locked-in dependencies.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. Every engagement includes a warranty period and optional ongoing support. We offer maintenance retainers, SLA-based support, and on-call coverage for production systems.',
  },
  {
    question: 'How do you communicate during projects?',
    answer:
      'Weekly status updates, shared Slack channel, sprint demos, and a live project dashboard. You have complete visibility into progress, blockers, and decisions at all times.',
  },
  {
    question: 'Do you work with non-technical founders?',
    answer:
      'Many of our clients are non-technical founders. We guide you through technical decisions in plain language, provide options with clear trade-offs, and handle the entire engineering execution so you can focus on your business.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer:
      'We are full-stack generalists with deep expertise in React, Next.js, Node.js, Python, AWS, Kubernetes, PostgreSQL, and AI/ML. Our technology stack section above covers the full range of tools we use daily.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
          >
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Everything you need to know about working with us.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className={cn(
                'rounded-2xl border border-border/40 transition-all duration-300',
                openIndex === index
                  ? 'bg-card/60 border-primary/20'
                  : 'bg-card/30 hover:bg-card/50 hover:border-border/60'
              )}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
              >
                <span className="text-base lg:text-lg font-semibold font-[var(--font-heading)] text-foreground">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    openIndex === index
                      ? 'bg-primary/10 text-primary'
                      : 'bg-background/50 text-muted-foreground'
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                      <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
