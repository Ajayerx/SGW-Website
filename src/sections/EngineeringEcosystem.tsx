import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TabTech {
  name: string
}

interface TechTab {
  name: string
  color: string
  technologies: TabTech[]
}

const tabs: TechTab[] = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-indigo-600',
    technologies: [
      { name: 'React / Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS v4' },
      { name: 'Vue.js' },
      { name: 'Framer Motion' },
      { name: 'React Three Fiber' },
    ],
  },
  {
    name: 'Backend',
    color: 'from-green-500 to-emerald-600',
    technologies: [
      { name: 'Node.js / Express' },
      { name: 'Python / FastAPI' },
      { name: 'Go' },
      { name: 'PostgreSQL' },
      { name: 'GraphQL / REST' },
      { name: 'Redis' },
    ],
  },
  {
    name: 'Cloud',
    color: 'from-orange-500 to-red-600',
    technologies: [
      { name: 'AWS' },
      { name: 'Google Cloud' },
      { name: 'Azure' },
      { name: 'Kubernetes' },
      { name: 'Terraform / Pulumi' },
      { name: 'Cloudflare / Vercel' },
    ],
  },
  {
    name: 'AI',
    color: 'from-violet-500 to-purple-600',
    technologies: [
      { name: 'OpenAI / GPT-4' },
      { name: 'Anthropic Claude' },
      { name: 'LangChain / LangGraph' },
      { name: 'Pinecone / Weaviate' },
      { name: 'Custom Agent Frameworks' },
      { name: 'RAG Pipelines' },
    ],
  },
  {
    name: 'Automation',
    color: 'from-cyan-500 to-blue-600',
    technologies: [
      { name: 'n8n / Make.com' },
      { name: 'Zapier' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD Pipelines' },
      { name: 'Infrastructure as Code' },
      { name: 'Monitoring & Alerting' },
    ],
  },
  {
    name: 'Database',
    color: 'from-pink-500 to-rose-600',
    technologies: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Snowflake / BigQuery' },
      { name: 'Kafka / Redpanda' },
      { name: 'dbt / Airflow' },
    ],
  },
]

export function EngineeringEcosystem() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      id="technology"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
          >
            Technology Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
          >
            Modern stack for{' '}
            <span className="gradient-text">modern products</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            We work with battle-tested technologies across the full stack, from frontend to infrastructure to AI.
          </motion.p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                index === activeTab
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                  : 'bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {tabs[activeTab].technologies.map((tech) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="group p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all text-center"
              >
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
