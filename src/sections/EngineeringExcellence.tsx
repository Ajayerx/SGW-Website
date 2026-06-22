import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, BarChart3, Shield, Zap, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

const capabilities = [
  {
    icon: Cpu,
    title: 'Architecture',
    description:
      'We design systems that scale from day one — microservices, event-driven, serverless, and monorepo patterns tailored to your domain.',
    items: [
      'Microservices & event-driven architecture',
      'Serverless & edge computing',
      'Monorepo with Turborepo/Nx',
      'API-first design (REST, GraphQL, gRPC)',
    ],
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: BarChart3,
    title: 'Scalability',
    description:
      'From 100 to 10 million users — we build horizontally-scalable systems with CDN optimization, database sharding, and intelligent caching.',
    items: [
      'Horizontal auto-scaling (K8s, ECS)',
      'CDN optimization & edge caching',
      'Database sharding & replication',
      'Read replicas & connection pooling',
    ],
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Security is not a feature — it is a foundation. We align with SOC 2 principles, implement OAuth/RBAC, and run regular VAPT cycles.',
    items: [
      'SOC 2 alignment & compliance-ready',
      'OAuth 2.0 / OIDC / RBAC',
      'Vulnerability assessment & pentesting',
      'Secrets management & audit logging',
    ],
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Sub-second page loads, minimal bundle sizes, edge rendering, and database tuning — because every millisecond impacts your bottom line.',
    items: [
      'Sub-100ms page loads (CLS < 0.1)',
      'Code splitting & tree shaking',
      'Edge rendering (Cloudflare, Vercel)',
      'Database query optimization & indexing',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
]

export function EngineeringExcellence() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="engineering"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engineering Excellence"
          title="Built to "
          gradientWord="last"
          description="Every product we ship is grounded in architecture, security, and performance decisions that survive growth, team changes, and market shifts."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative h-full p-6 lg:p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-5 shadow-lg`}
              >
                <cap.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold font-[var(--font-heading)] text-foreground mb-2 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {cap.description}
              </p>

              <ul className="space-y-3 mb-8">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${cap.gradient}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors group/btn"
              >
                Learn more
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
