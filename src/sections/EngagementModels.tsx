import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Users, Briefcase, Target, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { GlowButton } from '@/components/GlowButton'
import { getLenis } from '@/hooks/useLenis'

const models = [
  {
    icon: Target,
    title: 'Project-Based',
    subtitle: 'Fixed scope, fixed price',
    description:
      'Best when you have a well-defined scope and want a predictable budget. We deliver a complete product or module on a fixed timeline.',
    features: ['Defined deliverables & milestones', 'Fixed-price contract', 'Dedicated PM', 'Warranty period included'],
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
    popular: false,
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    subtitle: 'Monthly retainer, full ownership',
    description:
      'Best for ongoing product development. We assemble and manage a cross-functional team that works as your extended engineering department.',
    features: ['2-week sprints', 'Weekly demos', 'Full-stack team', 'Scales up/down monthly'],
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
    popular: true,
  },
  {
    icon: Briefcase,
    title: 'Staff Augmentation',
    subtitle: 'Hourly, embed with your team',
    description:
      'Best when you need specific expertise on your existing team. Senior engineers integrate into your workflow, culture, and tools.',
    features: ['Senior-only engineers', 'Your tools & processes', 'Minimal onboarding', 'Flexible commitment'],
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
    popular: false,
  },
  {
    icon: Code2,
    title: 'Outcome-Based',
    subtitle: 'Shared risk, shared reward',
    description:
      'Best for ambitious products where we co-invest. We align on business KPIs and share upside when targets are exceeded.',
    features: ['KPI-linked pricing', 'Strategic partnership', 'Equity or rev-share options', 'Long-term alignment'],
    gradient: 'from-purple-500 to-pink-500',
    popular: false,
  },
]

export function EngagementModels() {
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
    <section ref={sectionRef} id="engagement" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engagement Models"
          title="How we "
          gradientWord="partner"
          description="Four engagement models designed to match different stages, scopes, and risk profiles. Pick the one that fits — or mix and match."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative group"
            >
              {model.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-[11px] font-bold tracking-wider uppercase shadow-lg">
                  Most popular
                </div>
              )}
              <div className={`relative h-full p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${model.popular ? 'border-primary/30 bg-gradient-to-b from-primary/[0.04] to-transparent shadow-lg shadow-primary/5' : 'border-border/50 bg-card/50 hover:border-primary/30'}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <model.icon className="w-6 h-6 text-white" />
                </div>

                <div className="mb-1 text-xs font-bold tracking-wider text-primary uppercase">
                  {model.subtitle}
                </div>
                <h3 className="text-xl font-bold font-[var(--font-heading)] text-foreground mb-3 group-hover:text-primary transition-colors">
                  {model.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {model.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${model.gradient}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors group/btn"
                >
                  Let's talk
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <GlowButton variant="primary" size="lg" onClick={scrollToContact}>
            Not sure which model fits? Let's figure it out
            <ArrowRight className="w-5 h-5" />
          </GlowButton>
        </motion.div>
      </div>
    </section>
  )
}
