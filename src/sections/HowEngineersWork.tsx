import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { FileText, GitPullRequest, Shield, RotateCcw, MessageSquareText, Users } from 'lucide-react'

const practices = [
  {
    icon: FileText,
    title: 'Architecture Decision Records',
    description: 'Every significant decision is documented, versioned, and debatable. ADRs capture context, options, and rationale — so future teams know why we built it this way.',
    stat: '50+ ADRs across active projects',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: GitPullRequest,
    title: 'Pull Request Culture',
    description: '100% peer review. Every PR requires at least one approval, passing CI, and updated documentation. Average merge time: 4.2 hours.',
    stat: '93% approval rate within 24h',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Shield,
    title: 'Quality Gates',
    description: 'Automated linting, type checking, testing, and security scanning block merging if thresholds are not met. No shortcuts to production.',
    stat: 'Zero skipped quality gates',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: RotateCcw,
    title: 'Engineering Sprints',
    description: 'Two-week cycles with planning, daily standups, and retrospectives. Every sprint delivers deployable, production-ready software.',
    stat: '98% sprint completion rate',
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: MessageSquareText,
    title: 'Technical RFCs',
    description: 'Propose, debate, and document before building. RFCs ensure alignment across the team and catch design issues before code is written.',
    stat: 'Every feature starts with an RFC',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Internal Tech Talks',
    description: 'Weekly knowledge-sharing sessions. Engineers present on architecture decisions, new technologies, lessons learned, and open source contributions.',
    stat: '200+ tech talks delivered',
    gradient: 'from-violet-500 to-purple-600',
  },
]

const daySchedule = [
  { day: 'Monday', time: '10:00 AM', event: 'Architecture Review', description: 'Cross-team ADR reviews and system design discussions' },
  { day: 'Tuesday', time: '10:00 AM', event: 'Sprint Planning', description: 'Two-week cycle planning with effort estimation' },
  { day: 'Wednesday', time: 'All day', event: 'Pair Programming', description: 'Collaborative coding sessions across projects' },
  { day: 'Thursday', time: '2:00 PM', event: 'Technical RFC', description: 'Design proposal review and feedback' },
  { day: 'Friday', time: '3:00 PM', event: 'Demo Day', description: 'Sprint review with client stakeholders' },
]

export function HowEngineersWork() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="how-engineers-work"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engineering Culture"
          title="How our engineers "
          gradientWord="ship"
          description="A typical week at Softgoway — structured around quality, collaboration, and continuous delivery."
        />

        {/* Weekly schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16"
        >
          {daySchedule.map((day) => (
            <div
              key={day.day}
              className="p-4 rounded-xl border border-border/30 bg-card/40 text-center"
            >
              <div className="text-sm font-bold text-foreground mb-1">{day.day}</div>
              <div className="text-[10px] font-mono text-primary font-semibold mb-2">{day.time}</div>
              <div className="text-xs font-medium text-foreground mb-0.5">{day.event}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                {day.description}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Practice cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative p-6 rounded-xl border border-border/40 bg-card/40 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${practice.gradient} flex items-center justify-center mb-4`}>
                <practice.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold font-[var(--font-heading)] text-foreground mb-2 group-hover:text-primary transition-colors">
                {practice.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {practice.description}
              </p>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {practice.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
