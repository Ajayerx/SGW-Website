import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { GlowButton } from '@/components/GlowButton'
import {
  ArrowRight,
  Shield,
  Code2,
  Layers,
  TestTube2,
  FileText,
  Zap,
} from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'

interface Tag {
  label: string
  color: string
}

interface QualityMetric {
  label: string
  value: string
  detail: string
  score: number
  color: string
  icon: React.ReactNode
  tags: Tag[]
}

const metrics: QualityMetric[] = [
  {
    label: 'Code Quality',
    value: 'A+',
    detail:
      'We target SonarQube Maintainability Rating A. Every PR must maintain or improve the score. Zero technical debt accepted on new code.',
    score: 97,
    color: '#10B981',
    icon: <Code2 className="w-3.5 h-3.5" />,
    tags: [
      { label: 'SOC 2 Compliant', color: '#10B981' },
      { label: 'Zero debt policy', color: '#3B82F6' },
    ],
  },
  {
    label: 'Architecture',
    value: 'Event-Driven',
    detail:
      'We default to event-driven patterns, CQRS, and clean architecture. Every decision is documented as an Architecture Decision Record (ADR).',
    score: 94,
    color: '#3B82F6',
    icon: <Layers className="w-3.5 h-3.5" />,
    tags: [
      { label: 'ADR-validated', color: '#3B82F6' },
      { label: 'Event-driven', color: '#8B5CF6' },
    ],
  },
  {
    label: 'Test Coverage',
    value: '94%',
    detail:
      'Unit, integration, and E2E tests enforced via CI. We use Vitest, Playwright, and Cypress. Coverage gates block PRs below 85%.',
    score: 94,
    color: '#22C55E',
    icon: <TestTube2 className="w-3.5 h-3.5" />,
    tags: [
      { label: 'Vitest + Playwright', color: '#22C55E' },
      { label: '85% gate', color: '#06B6D4' },
    ],
  },
  {
    label: 'Security',
    value: 'SOC 2',
    detail:
      'SOC 2 aligned controls, automated vulnerability scanning via Snyk, OWASP Top 10 compliance, and quarterly penetration testing.',
    score: 96,
    color: '#F59E0B',
    icon: <Shield className="w-3.5 h-3.5" />,
    tags: [
      { label: 'SOC 2 aligned', color: '#F59E0B' },
      { label: 'VAPT cleared', color: '#EF4444' },
    ],
  },
  {
    label: 'Scalability',
    value: 'Sub-100ms',
    detail:
      'p95 latency under 100ms. Load tested to 10K requests/second. Horizontal auto-scaling, CDN caching, and database read replicas.',
    score: 93,
    color: '#7C3AED',
    icon: <Zap className="w-3.5 h-3.5" />,
    tags: [
      { label: '10K rps tested', color: '#7C3AED' },
      { label: 'p95 < 100ms', color: '#6366F1' },
    ],
  },
  {
    label: 'Documentation',
    value: 'ADR-Valid',
    detail:
      'Architecture Decision Records for every significant choice. Runbooks, API docs, and system diagrams kept in version control alongside code.',
    score: 91,
    color: '#EC4899',
    icon: <FileText className="w-3.5 h-3.5" />,
    tags: [
      { label: 'ADR compliant', color: '#EC4899' },
      { label: 'Version-controlled', color: '#F43F5E' },
    ],
  },
]

function QualityRing({ metric }: { metric: QualityMetric }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (metric.score / 100) * circumference

  return (
    <div ref={ref} className="relative flex-shrink-0 w-28 h-28">
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
        style={{ backgroundColor: metric.color }}
      />
      <svg className="relative w-full h-full -rotate-90" viewBox="0 0 112 112">
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="3"
          opacity="0.35"
        />
        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke={metric.color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{
            duration: 1.8,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span
            className="text-[13px] font-bold font-[var(--font-heading)] tabular-nums leading-tight block"
            style={{ color: metric.color }}
          >
            {metric.value}
          </span>
          <span className="text-[10px] text-muted-foreground/50 font-medium tabular-nums mt-0.5 block">
            {metric.score}%
          </span>
        </div>
      </div>
    </div>
  )
}

export function WhyCTOs() {
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
      id="why-ctos"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07]"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
        <div
          className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.05]"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Built for Technical Leaders"
          title="Why CTOs Work With "
          gradientWord="Softgoway"
          description="Six engineering standards that give technical decision-makers confidence before the first line of code is written."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-border/60 transition-colors duration-300"
            >
              <div
                className="h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${metric.color}50, transparent)`,
                }}
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% -20%, ${metric.color}0A, transparent 60%)`,
                }}
              />

              <div className="relative p-6">
                <div className="flex items-start gap-5">
                  <QualityRing metric={metric} />
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${metric.color}12`,
                          color: metric.color,
                        }}
                      >
                        {metric.icon}
                      </div>
                      <h3 className="text-[13px] font-bold font-[var(--font-heading)] text-foreground tracking-tight">
                        {metric.label}
                      </h3>
                    </div>
                    <p className="text-[13px] text-muted-foreground/75 leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/25">
                  {metric.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{
                        color: tag.color,
                        backgroundColor: `${tag.color}0D`,
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tag.color }}
                      />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.05] via-transparent to-accent/[0.05]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold font-[var(--font-heading)] mb-1">
                  Want to see our code quality firsthand?
                </h3>
                <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                  We share anonymous code samples, architecture diagrams, and
                  decision records during technical consultations.
                </p>
              </div>
            </div>
            <GlowButton
              variant="primary"
              size="lg"
              onClick={scrollToContact}
              className="flex-shrink-0"
            >
              Book a technical call
              <ArrowRight className="w-4 h-4" />
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}