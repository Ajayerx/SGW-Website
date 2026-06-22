import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { GitBranch, Activity, Users, BarChart3, ArrowUpRight, CheckCircle, Clock, GitPullRequest, Shield } from 'lucide-react'

interface PipelineStep {
  name: string
  duration: string
  status: 'success' | 'running' | 'pending'
}

const pipelineSteps: PipelineStep[] = [
  { name: 'Commit', duration: '0.8s', status: 'success' },
  { name: 'Lint', duration: '2.1s', status: 'success' },
  { name: 'Type Check', duration: '4.3s', status: 'success' },
  { name: 'Unit Tests', duration: '12.7s', status: 'success' },
  { name: 'Integration', duration: '18.2s', status: 'success' },
  { name: 'Build', duration: '6.5s', status: 'success' },
  { name: 'Deploy', duration: '8.1s', status: 'success' },
]

const panels = [
  {
    id: 'pipeline',
    icon: GitBranch,
    title: 'CI/CD Pipeline',
    subtitle: '13.2s average — commit to production',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
    content: (
      <div className="space-y-1.5">
        {pipelineSteps.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card/50 text-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 + 0.3, type: 'spring' }}
            >
              {step.status === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              )}
            </motion.div>
            <span className="flex-1 text-foreground font-medium">{step.name}</span>
            <span className="text-muted-foreground font-mono text-xs">{step.duration}</span>
            <motion.div
              className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              />
            </motion.div>
          </motion.div>
        ))}
        <div className="flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Average pipeline duration: <span className="text-foreground font-semibold">13.2s</span></span>
          <span className="ml-auto">1,247 deployments this month</span>
        </div>
      </div>
    ),
  },
  {
    id: 'reviews',
    icon: GitPullRequest,
    title: 'Code Review Culture',
    subtitle: '93% approval rate within 24 hours',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              AJ
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">feat: add payment webhook handler</div>
              <div className="text-xs text-muted-foreground">#342 — opened 2h ago</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-emerald-500">
              <CheckCircle className="w-3 h-3" /> 3/3
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
              SK
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">refactor: extract billing service</div>
              <div className="text-xs text-muted-foreground">#341 — approved 4h ago</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-500">
            <CheckCircle className="w-3 h-3" /> Merged
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
              MR
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">fix: resolve race condition in queue</div>
              <div className="text-xs text-muted-foreground">#340 — opened 6h ago</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <Activity className="w-3 h-3" /> 2 comments
          </div>
        </div>
        <div className="flex items-center gap-3 px-1 pt-1 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>Average merge time: <span className="text-foreground font-semibold">4.2 hours</span></span>
        </div>
      </div>
    ),
  },
  {
    id: 'architecture',
    icon: Shield,
    title: 'Architecture Reviews',
    subtitle: 'Every decision documented and debated',
    gradient: 'from-purple-500 to-pink-500',
    content: (
      <div className="space-y-3">
        {[
          { name: 'Event-Driven Architecture Decision', status: 'Approved', votes: 5 },
          { name: 'Database Sharding Strategy RFC', status: 'In Review', votes: 3 },
          { name: 'API Gateway v2 Proposal', status: 'Approved', votes: 7 },
          { name: 'Observability Stack Migration', status: 'Draft', votes: 0 },
        ].map((adr, i) => (
          <motion.div
            key={adr.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-card/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <div className="text-sm font-medium text-foreground">{adr.name}</div>
                <div className="text-xs text-muted-foreground">{adr.votes} approvals</div>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              adr.status === 'Approved'
                ? 'bg-emerald-500/10 text-emerald-500'
                : adr.status === 'In Review'
                ? 'bg-amber-500/10 text-amber-500'
                : 'bg-muted text-muted-foreground'
            }`}>
              {adr.status}
            </span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 'observability',
    icon: BarChart3,
    title: 'Monitoring & Observability',
    subtitle: '99.97% uptime across all services',
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Uptime', value: '99.97%', color: 'text-emerald-500' },
            { label: 'Avg Latency', value: '47ms', color: 'text-blue-500' },
            { label: 'Error Rate', value: '0.03%', color: 'text-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-lg bg-card/50 text-center">
              <div className={`text-lg font-bold font-[var(--font-heading)] ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-foreground">Alert Response Time</div>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </div>
          <div className="h-6 flex items-end gap-1">
            {[85, 92, 78, 95, 88, 96, 91].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h * 0.5}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/30"
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    ),
  },
]

export function EngineeringShowcase() {
  const [activePanel, setActivePanel] = useState('pipeline')
  const sectionRef = useRef<HTMLElement>(null)
  const activeP = panels.find((p) => p.id === activePanel)!

  return (
    <section
      ref={sectionRef}
      id="engineering-showcase"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Inside Our Engineering Process"
          title="How we "
          gradientWord="ship"
          description="Real metrics from our engineering operations — pipeline speed, review culture, architecture rigor, and production observability."
        />

        <div className="grid lg:grid-cols-4 gap-4 mb-6">
          {panels.map((panel) => (
            <motion.button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`relative p-4 rounded-xl text-left transition-all duration-300 border ${
                activePanel === panel.id
                  ? 'border-primary/40 bg-card/80 shadow-lg shadow-primary/5'
                  : 'border-border/30 bg-card/30 hover:border-border/60'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${panel.gradient} flex items-center justify-center mb-3`}>
                <panel.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-foreground mb-0.5">{panel.title}</div>
              <div className="text-[11px] text-muted-foreground">{panel.subtitle}</div>
              {activePanel === panel.id && (
                <motion.div
                  layoutId="active-indicator"
                  className={`absolute -bottom-px left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${panel.gradient}`}
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activePanel.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeP.gradient} flex items-center justify-center`}>
              <activeP.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{activeP.title}</div>
              <div className="text-sm text-muted-foreground">{activeP.subtitle}</div>
            </div>
          </div>
          {activeP.content}
        </motion.div>
      </div>
    </section>
  )
}
