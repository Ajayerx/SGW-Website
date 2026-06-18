import { Code2, Globe, Smartphone, Cloud, Database, Brain, Shield, Cog, Users, GitBranch, Zap, TrendingUp } from 'lucide-react';

export interface Service {
  id: string;
  icon: any;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  category: 'development' | 'infrastructure' | 'data' | 'emerging' | 'advisory';
  gradient: string;
}

export const services: Service[] = [
  {
    id: 'product-engineering',
    icon: Code2,
    title: 'Product & Platform Engineering',
    shortDescription: 'Design, build, and evolve complex web platforms and internal tools.',
    description:
      'We design, build, and evolve complex web platforms and internal tools that your team can rely on every day. From greenfield development to modernizing legacy systems, we deliver scalable, maintainable solutions.',
    features: [
      'Greenfield product development',
      'Modular monoliths & microservices',
      'API design & integration',
      'Performance tuning & refactoring',
      'Technical debt remediation',
      'Architecture reviews',
    ],
    technologies: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    benefits: [
      'Faster time-to-market',
      'Reduced technical debt',
      'Improved system reliability',
      'Better developer experience',
    ],
    category: 'development',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'web-applications',
    icon: Globe,
    title: 'Modern Web Applications',
    shortDescription: 'Fast, accessible, and maintainable web apps with React and Next.js.',
    description:
      'Fast, accessible, and maintainable web apps built with modern stacks like React and Next.js. We optimize for performance, SEO, and user experience from day one.',
    features: [
      'React / Next.js frontends',
      'SSR & edge rendering',
      'Design systems & storybooks',
      'Headless CMS integration',
      'E-commerce platforms',
      'Progressive enhancement',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Stripe', 'Sanity'],
    benefits: [
      'Exceptional performance scores',
      'Improved SEO and discoverability',
      'Better conversion rates',
      'Scalable design systems',
    ],
    category: 'development',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    shortDescription: 'Cross-platform mobile apps that feel native and stay in sync.',
    description:
      'Cross-platform mobile apps that feel native and stay in sync with your backend and product roadmap. We build for iOS and Android with shared codebases.',
    features: [
      'React Native applications',
      'Offline-first experiences',
      'Real-time sync & push notifications',
      'App store rollout & support',
      'Native module integration',
      'Performance optimization',
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript', 'TestFlight'],
    benefits: [
      'Unified codebase across platforms',
      'Reduced development costs',
      'Faster feature shipping',
      'Better user engagement',
    ],
    category: 'development',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud & DevOps Enablement',
    shortDescription: 'Cloud architectures and pipelines that make shipping safer and faster.',
    description:
      'Cloud architectures and pipelines that make shipping safer, faster, and easier to observe. We handle infrastructure as code, deployment automation, and observability.',
    features: [
      'AWS / Azure architectures',
      'Containerization & orchestration',
      'CI/CD pipelines',
      'Infrastructure as Code',
      'Multi-region deployments',
      'Disaster recovery planning',
    ],
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Docker', 'Prometheus'],
    benefits: [
      'Reduced deployment risk',
      'Faster release cycles',
      'Improved system reliability',
      'Lower operational costs',
    ],
    category: 'infrastructure',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    id: 'data-analytics',
    icon: Database,
    title: 'Data & Analytics Engineering',
    shortDescription: 'Foundations for trustworthy reporting, dashboards, and insights.',
    description:
      'We build foundations for trustworthy reporting, dashboards, and event-driven features. From data modeling to real-time analytics, we ensure data integrity.',
    features: [
      'Data modeling & warehousing',
      'ETL/ELT pipelines',
      'Real-time event streams',
      'Analytics dashboards',
      'Data governance',
      'Predictive analytics',
    ],
    technologies: ['Snowflake', 'dbt', 'Kafka', 'BigQuery', 'Tableau', 'Python'],
    benefits: [
      'Better decision-making with trusted data',
      'Real-time business insights',
      'Improved data governance',
      'Faster analytics delivery',
    ],
    category: 'data',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'ai-experiences',
    icon: Brain,
    title: 'AI-powered Experiences',
    shortDescription: 'Practical AI features that sit on top of your product.',
    description:
      'Practical AI features that sit on top of your product, not experimental proofs-of-concept. We integrate LLMs, search, and recommendation engines seamlessly.',
    features: [
      'AI assistants & copilots',
      'Vector search & RAG',
      'Recommendation engines',
      'NLP for support & ops',
      'AI-augmented workflows',
      'Fine-tuning & prompt engineering',
    ],
    technologies: ['OpenAI', 'Anthropic', 'Pinecone', 'Langchain', 'Python', 'FastAPI'],
    benefits: [
      'Competitive AI-powered features',
      'Enhanced user productivity',
      'Better customer support',
      'Data-driven recommendations',
    ],
    category: 'emerging',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    id: 'security-reliability',
    icon: Shield,
    title: 'Security & Reliability',
    shortDescription: 'Guardrails and hardening that keep your platform stable.',
    description:
      'Guardrails and hardening work that keep your platform stable as usage grows. We focus on security audits, access control, and incident response.',
    features: [
      'Security reviews & penetration testing',
      'Auth, SSO & RBAC implementation',
      'Monitoring & alerting',
      'Incident response playbooks',
      'Compliance (SOC 2, HIPAA, GDPR)',
      'Vulnerability scanning',
    ],
    technologies: ['OAuth', 'JWT', 'Datadog', 'PagerDuty', 'HashiCorp Vault', 'Snyk'],
    benefits: [
      'Reduced security risk',
      'Faster incident response',
      'Compliance readiness',
      'Customer trust and confidence',
    ],
    category: 'advisory',
    gradient: 'from-red-600 to-pink-600',
  },
  {
    id: 'architecture-advisory',
    icon: Cog,
    title: 'Architecture & Advisory',
    shortDescription: 'Guidance to choose the right stack and patterns for your roadmap.',
    description:
      'Hands-on guidance to help you choose the right stack, patterns, and sequencing for your roadmap. We provide strategic technical advice and mentorship.',
    features: [
      'Architecture reviews',
      'Tech strategy & roadmapping',
      'Scaling & cost optimization',
      'Team enablement & pairing',
      'Technology selection',
      'System design workshops',
    ],
    technologies: ['Various - depends on context'],
    benefits: [
      'Smarter technology choices',
      'Optimized spending',
      'Faster time-to-market',
      'Team skill growth',
    ],
    category: 'advisory',
    gradient: 'from-slate-600 to-gray-600',
  },
  {
    id: 'api-design',
    icon: GitBranch,
    title: 'API Design & Integration',
    shortDescription: 'Well-designed APIs that integrate seamlessly with your ecosystem.',
    description:
      'Well-designed APIs that integrate seamlessly with your ecosystem. We focus on REST, GraphQL, and webhook architectures that scale.',
    features: [
      'REST & GraphQL API design',
      'Webhook implementation',
      'API versioning strategies',
      'Documentation & SDKs',
      'Rate limiting & throttling',
      'Integration testing',
    ],
    technologies: ['Node.js', 'GraphQL', 'OpenAPI', 'Postman', 'Kong', 'Apollo'],
    benefits: [
      'Better developer experience',
      'Easier third-party integrations',
      'Improved API adoption',
      'Reduced support burden',
    ],
    category: 'development',
    gradient: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'performance-optimization',
    icon: Zap,
    title: 'Performance Optimization',
    shortDescription: 'Speed up your applications at every layer.',
    description:
      'We identify and eliminate performance bottlenecks across your stack. From frontend rendering to database queries, we deliver measurable improvements.',
    features: [
      'Frontend rendering optimization',
      'Database query optimization',
      'Caching strategies',
      'CDN & edge computing',
      'Bundle size reduction',
      'Load time analysis',
    ],
    technologies: ['Lighthouse', 'WebPageTest', 'Redis', 'Cloudflare', 'Webpack', 'New Relic'],
    benefits: [
      'Better user experience',
      'Improved SEO rankings',
      'Higher conversion rates',
      'Reduced infrastructure costs',
    ],
    category: 'infrastructure',
    gradient: 'from-yellow-600 to-orange-600',
  },
  {
    id: 'data-migration',
    icon: TrendingUp,
    title: 'Data Migration & Transformation',
    shortDescription: 'Seamless data migrations with zero downtime.',
    description:
      'Seamless data migrations and transformations with minimal downtime. We handle complex migrations from legacy systems to modern platforms.',
    features: [
      'Zero-downtime migrations',
      'Data validation & reconciliation',
      'Rollback strategies',
      'Parallel run verification',
      'ETL script development',
      'Data cleanup & enrichment',
    ],
    technologies: ['dbt', 'Airflow', 'Python', 'Talend', 'AWS DMS', 'Fivetran'],
    benefits: [
      'Reduced business disruption',
      'Data integrity assurance',
      'Faster modernization',
      'Improved data quality',
    ],
    category: 'data',
    gradient: 'from-teal-600 to-cyan-600',
  },
  {
    id: 'team-enablement',
    icon: Users,
    title: 'Team Enablement & Training',
    shortDescription: 'Upskill your team with hands-on mentoring and workshops.',
    description:
      'We upskill your team through hands-on mentoring, workshops, and pair programming. Knowledge transfer is built into every engagement.',
    features: [
      'Technical workshops',
      'Pair programming sessions',
      'Code review & feedback',
      'Documentation creation',
      'Best practices training',
      'Mentorship programs',
    ],
    technologies: ['TypeScript', 'React', 'AWS', 'Docker', 'Testing frameworks', 'Git'],
    benefits: [
      'Improved team skills',
      'Better code quality',
      'Reduced dependency on contractors',
      'Long-term capability building',
    ],
    category: 'advisory',
    gradient: 'from-green-600 to-teal-600',
  },
];

export const categories = [
  { value: 'development', label: 'Development' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'data', label: 'Data' },
  { value: 'emerging', label: 'Emerging Tech' },
  { value: 'advisory', label: 'Advisory' },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter((service) => service.category === category);
};
