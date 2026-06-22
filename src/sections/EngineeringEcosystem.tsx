import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader'
import { ArrowUpRight } from 'lucide-react'

interface LayerTech {
  name: string
  description: string
  expertise: string
}

interface EcosystemLayer {
  name: string
  icon: string
  description: string
  color: string
  technologies: LayerTech[]
}

const layers: EcosystemLayer[] = [
  {
    name: 'Intelligence Layer',
    icon: '🧠',
    description: 'AI models, agents, and retrieval systems that power intelligent products',
    color: 'from-violet-500 to-purple-600',
    technologies: [
      { name: 'OpenAI / GPT-4', description: 'LLM integration, function calling, fine-tuning', expertise: '4+ years' },
      { name: 'Anthropic Claude', description: 'Safety-aligned reasoning, tool use, batch API', expertise: '3+ years' },
      { name: 'Google Gemini', description: 'Multimodal reasoning, vision, large context', expertise: '2+ years' },
      { name: 'LangChain / LangGraph', description: 'Agent orchestration, RAG pipelines, tool chains', expertise: '3+ years' },
      { name: 'Pinecone / Weaviate', description: 'Vector search, hybrid search, semantic caching', expertise: '3+ years' },
      { name: 'Custom Agent Frameworks', description: 'Multi-agent systems, human-in-the-loop, observability', expertise: '2+ years' },
    ],
  },
  {
    name: 'Infrastructure Layer',
    icon: '⚙️',
    description: 'Cloud platforms, containers, and deployment automation that keep systems running',
    color: 'from-orange-500 to-red-600',
    technologies: [
      { name: 'AWS', description: 'ECS, Lambda, RDS, CloudFront, SQS, DynamoDB', expertise: '8+ years' },
      { name: 'Google Cloud', description: 'GKE, Cloud Run, BigQuery, Pub/Sub', expertise: '5+ years' },
      { name: 'Azure', description: 'AKS, Functions, Cosmos DB, DevOps', expertise: '4+ years' },
      { name: 'Kubernetes', description: 'EKS/GKE/AKS, Helm, Istio, cert-manager', expertise: '6+ years' },
      { name: 'Terraform / Pulumi', description: 'Infrastructure as Code, multi-environment', expertise: '6+ years' },
      { name: 'Cloudflare / Vercel', description: 'Edge functions, CDN, DDoS protection, ISR', expertise: '5+ years' },
    ],
  },
  {
    name: 'Data Layer',
    icon: '⛁',
    description: 'Databases, streams, and warehouses engineered for scale and reliability',
    color: 'from-cyan-500 to-blue-600',
    technologies: [
      { name: 'PostgreSQL', description: 'RDS, Aurora, Supabase, connection pooling', expertise: '8+ years' },
      { name: 'MongoDB', description: 'Atlas, change streams, aggregation pipelines', expertise: '6+ years' },
      { name: 'Redis', description: 'Caching, rate limiting, pub/sub, session store', expertise: '6+ years' },
      { name: 'Snowflake / BigQuery', description: 'Cloud warehouses, query optimization, RBAC', expertise: '4+ years' },
      { name: 'Kafka / Redpanda', description: 'Event streaming, CDC, schema registry', expertise: '4+ years' },
      { name: 'dbt / Airflow', description: 'Data transformation, pipeline orchestration, lineage', expertise: '4+ years' },
    ],
  },
  {
    name: 'API Layer',
    icon: '🔗',
    description: 'Integration surfaces that connect frontends, backends, and third parties',
    color: 'from-teal-500 to-emerald-600',
    technologies: [
      { name: 'REST / GraphQL', description: 'OpenAPI 3.1, Apollo, Relay, versioning', expertise: '8+ years' },
      { name: 'gRPC / WebSocket', description: 'Bidirectional streaming, protobuf, real-time', expertise: '4+ years' },
      { name: 'FastAPI / NestJS', description: 'Async Python, decorators, dependency injection', expertise: '5+ years' },
      { name: 'Express / tRPC', description: 'Node.js REST, type-safe APIs, middleware', expertise: '8+ years' },
      { name: 'API Gateway (Kong)', description: 'Rate limiting, auth, routing, observability', expertise: '4+ years' },
      { name: 'Webhook Systems', description: 'Event delivery, retry, idempotency, signing', expertise: '5+ years' },
    ],
  },
  {
    name: 'Frontend Layer',
    icon: '🖥️',
    description: 'UI frameworks, rendering strategies, and design systems that users experience',
    color: 'from-blue-500 to-indigo-600',
    technologies: [
      { name: 'React / Next.js', description: 'SSR, RSC, streaming, server actions, app router', expertise: '8+ years' },
      { name: 'React Three Fiber', description: '3D visualization, WebGL, interactive graphics', expertise: '4+ years' },
      { name: 'Tailwind CSS v4', description: 'Utility-first, design tokens, CSS-first config', expertise: '5+ years' },
      { name: 'TypeScript', description: 'Strict mode, generics, branded types, zod', expertise: '8+ years' },
      { name: 'Framer Motion', description: 'Layout animations, gestures, spring physics', expertise: '5+ years' },
      { name: 'React Native / Expo', description: 'Cross-platform mobile, OTA updates, native modules', expertise: '5+ years' },
    ],
  },
]

export function EngineeringEcosystem() {
  const [activeLayer, setActiveLayer] = useState(0)
  const layer = layers[activeLayer]

  return (
    <section
      id="ecosystem"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engineering Ecosystem"
          title="How we build the "
          gradientWord="full stack"
          description="Five interconnected layers — from AI to frontend — that we design, build, and operate across every engagement."
        />

        {/* Layer tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {layers.map((l, i) => (
            <motion.button
              key={l.name}
              onClick={() => setActiveLayer(i)}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                i === activeLayer
                  ? `bg-gradient-to-r ${l.color} text-white shadow-lg`
                  : 'bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="mr-1.5">{l.icon}</span>
              {l.name.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        {/* Active layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Layer header */}
            <div className="text-center mb-10">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${layer.color} text-white text-sm font-medium mb-4`}>
                <span>{layer.icon}</span>
                <span>{layer.name}</span>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {layer.description}
              </p>
            </div>

            {/* Tech grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {layer.technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative p-5 rounded-xl border border-border/40 bg-card/40 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold font-[var(--font-heading)] text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <span className="text-xs text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
                      {tech.expertise}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <motion.button
            onClick={() => setActiveLayer((prev) => (prev > 0 ? prev - 1 : layers.length - 1))}
            className="p-3 rounded-xl bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight className="w-5 h-5 rotate-[-135deg]" />
          </motion.button>
          <div className="flex items-center gap-2">
            {layers.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveLayer(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeLayer ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => setActiveLayer((prev) => (prev < layers.length - 1 ? prev + 1 : 0))}
            className="p-3 rounded-xl bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-border transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight className="w-5 h-5 rotate-[45deg]" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
