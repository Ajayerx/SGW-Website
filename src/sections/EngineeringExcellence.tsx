import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, BarChart3, Shield, Zap } from 'lucide-react'

const capabilities = [
  {
    icon: Cpu,
    title: 'Architecture',
    description: 'Systems designed to scale from day one — microservices, event-driven, serverless.',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: BarChart3,
    title: 'Scalability',
    description: 'Horizontally-scalable systems with CDN optimization, caching, and database sharding.',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'SOC 2 aligned, OAuth/RBAC, regular VAPT cycles, and secrets management baked in.',
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Sub-second page loads, edge rendering, code splitting, and database tuning.',
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
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
          >
            Engineering Foundations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
          >
            Built on solid{' '}
            <span className="gradient-text">engineering</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Every product we ship is grounded in architecture, security, and performance decisions that survive growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-5 shadow-lg`}
              >
                <cap.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold font-[var(--font-heading)] text-foreground mb-2 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
