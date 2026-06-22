import { Code2, Database, Cloud, Brain, Smartphone, Shield, BarChart3, Users, Bell, FileText, Activity, Settings, Layout as LayoutIcon, Server, GitBranch, Lock, Zap } from 'lucide-react'

export interface ProjectFeature {
  title: string
  description: string
  benefits: string[]
  icon: any
  gradient: string
}

export interface ProjectMetric {
  label: string
  value: number
  suffix: string
  prefix?: string
  description: string
}

export interface ProjectTimeline {
  phase: string
  duration: string
  tasks: string[]
}

export interface ProjectTestimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

export interface ProjectTechStack {
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: string
  industry: string
  year: number
  clientType: string
  clientName: string
  heroImage: string
  logo?: string
  heroStats: { label: string; value: string }[]
  overview: {
    client: string
    industry: string
    duration: string
    teamSize: string
    platform: string
    engagement: string
    status: string
    description: string
  }
  problem: {
    title: string
    items: { title: string; description: string; icon: any }[]
  }
  solution: {
    title: string
    description: string
    highlights: string[]
  }
  features: ProjectFeature[]
  gallery: {
    images: string[]
    videos: { title: string; url: string; thumbnail?: string }[]
    documents: { title: string; type: string; url: string }[]
  }
  techStack: ProjectTechStack[]
  architecture: {
    description: string
    highlights: string[]
    diagram?: string
  }
  timeline: ProjectTimeline[]
  results: ProjectMetric[]
  testimonial: ProjectTestimonial
  relatedProjects: string[]
}

export const projects: Project[] = [
  {
    id: 'hospital-erp',
    name: 'Hospital ERP Platform',
    tagline: 'Built to digitize hospital operations, patient records, billing, pharmacy management, and reporting.',
    category: 'Enterprise Software',
    industry: 'Healthcare',
    year: 2025,
    clientType: 'Enterprise',
    clientName: 'MediCare Health Systems',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Users', value: '100K+' },
      { label: 'Hospitals', value: '50+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Faster Ops', value: '40%' },
    ],
    overview: {
      client: 'MediCare Health Systems',
      industry: 'Healthcare',
      duration: '6 Months',
      teamSize: '8 Engineers',
      platform: 'Web + Mobile',
      engagement: 'Dedicated Team',
      status: 'Live Production',
      description:
        'A comprehensive ERP platform designed to digitize and streamline hospital operations across patient management, clinical workflows, billing, pharmacy, and administrative reporting.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Paper-based operations',
          description: 'The hospital group relied on paper records and spreadsheets, leading to lost data, delays in patient care, and compliance risks.',
          icon: FileText,
        },
        {
          title: 'Fragmented systems',
          description: 'Multiple disconnected tools for billing, pharmacy, and patient records created data silos and operational inefficiencies.',
          icon: Server,
        },
        {
          title: 'Slow decision-making',
          description: 'Without real-time data, administrators struggled to make informed decisions about resource allocation and patient care.',
          icon: Activity,
        },
        {
          title: 'Scalability limitations',
          description: 'The existing infrastructure could not scale to support the growing network of 50+ hospitals across the region.',
          icon: Shield,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We designed and built a unified ERP platform that connects every department — from patient registration and clinical workflows to billing, pharmacy, and executive reporting. The system replaced paper-based operations with a real-time digital infrastructure accessible via web and mobile.',
      highlights: [
        'Unified patient record system across all 50+ hospitals',
        'Real-time billing and insurance claim processing',
        'Automated pharmacy management with stock alerts',
        'Executive dashboard with live KPIs and drill-down analytics',
        'Role-based access control with HIPAA-compliant security',
        'Offline-capable mobile app for field staff',
      ],
    },
    features: [
      {
        title: 'Patient Management',
        description: 'End-to-end patient lifecycle from registration, triage, admission, treatment tracking, to discharge with follow-up scheduling.',
        benefits: ['Reduced wait times by 35%', 'Zero lost records', 'Automated follow-ups'],
        icon: Users,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Clinical Dashboard',
        description: 'Real-time view of patient vitals, bed occupancy, surgery schedules, and critical alerts across all hospitals.',
        benefits: ['40% faster clinical decisions', 'Real-time bed management', 'Critical alert system'],
        icon: BarChart3,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Billing & Insurance',
        description: 'Automated billing engine with insurance claim processing, payment tracking, and financial reporting.',
        benefits: ['60% faster claim processing', 'Zero billing errors', 'Real-time revenue tracking'],
        icon: Settings,
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Pharmacy Management',
        description: 'Inventory tracking, automated reordering, expiry alerts, and narcotics control across hospital pharmacies.',
        benefits: ['30% reduction in waste', 'Automated low-stock alerts', 'Controlled substance tracking'],
        icon: Shield,
        gradient: 'from-orange-500 to-red-500',
      },
      {
        title: 'Reporting & Analytics',
        description: 'Executive dashboard with drill-down analytics, customizable reports, and automated compliance filings.',
        benefits: ['Real-time KPI tracking', 'Automated compliance reports', 'Custom dashboard builder'],
        icon: BarChart3,
        gradient: 'from-indigo-500 to-purple-500',
      },
      {
        title: 'Access Control & Security',
        description: 'Role-based access, audit logs, HIPAA-compliant encryption, and multi-factor authentication.',
        benefits: ['HIPAA compliant', 'Full audit trail', 'Role-based permissions'],
        icon: Lock,
        gradient: 'from-red-500 to-rose-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Product Walkthrough', url: '#', thumbnail: undefined },
        { title: 'Admin Dashboard Demo', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Case Study PDF', type: 'PDF', url: '#' },
        { title: 'Architecture Overview', type: 'PDF', url: '#' },
        { title: 'Technical Specifications', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Framer Motion'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'GraphQL', 'RabbitMQ'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudFront', 'RDS'] },
      { category: 'Mobile', items: ['React Native', 'Expo', 'Offline-first sync'] },
      { category: 'Security', items: ['HIPAA compliance', 'SOC 2', 'MFA', 'End-to-end encryption'] },
      { category: 'Analytics', items: ['Apache Kafka', 'ClickHouse', 'Metabase', 'Grafana'] },
    ],
    architecture: {
      description:
        'A microservices-based architecture with a GraphQL API gateway, event-driven data pipeline, and offline-capable mobile clients. Each domain (patient, billing, pharmacy, inventory) operates as an independent service with its own database, communicating via async events.',
      highlights: [
        'Microservices with 12 independent domain services',
        'GraphQL federation gateway for unified API',
        'Event-driven architecture with RabbitMQ + Kafka',
        'CQRS pattern for read/write separation',
        'Multi-region AWS deployment with auto-scaling',
        'Real-time sync via WebSockets and server-sent events',
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Planning',
        duration: '4 Weeks',
        tasks: ['Stakeholder interviews across 8 hospitals', 'Process mapping and gap analysis', 'Technical architecture design', 'MVP scope definition'],
      },
      {
        phase: 'Design',
        duration: '6 Weeks',
        tasks: ['UX research and user journey mapping', 'Wireframes and interactive prototypes', 'Design system creation', 'User testing with hospital staff'],
      },
      {
        phase: 'Development',
        duration: '14 Weeks',
        tasks: ['Sprint 1-2: Core patient management', 'Sprint 3-4: Billing engine', 'Sprint 5-6: Pharmacy module', 'Sprint 7-8: Analytics and reporting'],
      },
      {
        phase: 'Testing',
        duration: '4 Weeks',
        tasks: ['Integration testing across all modules', 'Performance testing with 10K concurrent users', 'Security audit and penetration testing', 'UAT with pilot hospitals'],
      },
      {
        phase: 'Deployment',
        duration: '4 Weeks',
        tasks: ['Phased rollout to 10 pilot hospitals', 'Data migration from legacy systems', 'Staff training and documentation', 'Full deployment to 50+ hospitals'],
      },
    ],
    results: [
      { label: 'Faster Processing', value: 40, suffix: '%', description: 'Reduction in patient processing time from registration to discharge', prefix: '' },
      { label: 'Manual Work Reduced', value: 60, suffix: '%', description: 'Reduction in manual data entry and paperwork', prefix: '' },
      { label: 'User Growth', value: 3, suffix: 'x', description: 'Increase in platform adoption within first 6 months', prefix: '' },
      { label: 'System Uptime', value: 99.9, suffix: '%', description: 'Platform availability since launch', prefix: '' },
    ],
    testimonial: {
      quote: 'Softgoway transformed our operations completely. What used to take hours of paperwork now happens in minutes. The platform has become the backbone of our healthcare delivery.',
      name: 'Dr. Priya Sharma',
      role: 'Chief Medical Information Officer',
      company: 'MediCare Health Systems',
    },
    relatedProjects: ['telehealth-platform', 'fintech-dashboard', 'logistics-hub'],
  },
  {
    id: 'telehealth-platform',
    name: 'Global Telehealth Platform',
    tagline: 'HIPAA-ready telehealth workflows with virtual consultations, prescriptions, and integrated scheduling.',
    category: 'Healthcare SaaS',
    industry: 'Healthcare',
    year: 2025,
    clientType: 'Startup',
    clientName: 'HealthConnect Global',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Active Patients', value: '250K+' },
      { label: 'Consultations', value: '1M+' },
      { label: 'Providers', value: '5K+' },
      { label: 'Countries', value: '12' },
    ],
    overview: {
      client: 'HealthConnect Global',
      industry: 'Healthcare',
      duration: '8 Months',
      teamSize: '12 Engineers',
      platform: 'Web + Mobile',
      engagement: 'Product Development',
      status: 'Live Production',
      description:
        'A global telehealth platform connecting patients with healthcare providers across 12 countries, featuring video consultations, e-prescriptions, and integrated scheduling.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Limited access to care',
          description: 'Patients in rural areas had no reliable access to specialists, requiring hours of travel for basic consultations.',
          icon: Users,
        },
        {
          title: 'Regulatory complexity',
          description: 'Operating across 12 countries meant navigating different healthcare regulations, data privacy laws, and licensing requirements.',
          icon: Shield,
        },
        {
          title: 'Scaling provider network',
          description: 'The existing platform could not efficiently onboard and manage thousands of healthcare providers across time zones.',
          icon: Server,
        },
        {
          title: 'Payment fragmentation',
          description: 'Each country had different payment systems, insurance providers, and billing workflows, creating operational chaos.',
          icon: Settings,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We built a multi-tenant telehealth platform with country-specific compliance modules, real-time video infrastructure, and a unified provider marketplace. The platform handles everything from patient onboarding and appointment scheduling to video consultations, e-prescriptions, and insurance billing.',
      highlights: [
        'Multi-country compliance engine with configurable rules',
        'WebRTC-based video consultations with sub-200ms latency',
        'AI-powered provider matching and scheduling optimization',
        'Unified billing engine supporting 15+ payment gateways',
        'Offline-capable mobile app for low-bandwidth regions',
        'Real-time analytics dashboard for population health insights',
      ],
    },
    features: [
      {
        title: 'Video Consultations',
        description: 'High-quality video visits with screen sharing, file transfer, and real-time transcription. Supports group consultations and multi-provider sessions.',
        benefits: ['Sub-200ms latency', 'HIPAA-compliant recording', 'Real-time transcription'],
        icon: Smartphone,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Provider Marketplace',
        description: 'Patients can browse, filter, and book appointments with specialists across 40+ medical disciplines with verified credentials.',
        benefits: ['5K+ active providers', 'Verified credentials', '24/7 availability'],
        icon: Users,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'E-Prescriptions',
        description: 'Digital prescription engine with drug interaction checks, dosage calculators, and integration with partner pharmacies for home delivery.',
        benefits: ['Drug interaction alerts', 'Pharmacy integration', 'Controlled substance compliance'],
        icon: FileText,
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Multi-Currency Billing',
        description: 'Unified billing engine supporting insurance claims, direct pay, and subscription models across 15+ payment gateways and 20+ currencies.',
        benefits: ['15+ payment gateways', 'Auto insurance claims', 'Multi-currency support'],
        icon: Settings,
        gradient: 'from-orange-500 to-red-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Patient App Demo', url: '#', thumbnail: undefined },
        { title: 'Doctor Dashboard Walkthrough', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Case Study PDF', type: 'PDF', url: '#' },
        { title: 'Security Whitepaper', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Frontend', items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebRTC', 'TanStack Query'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'GraphQL', 'RabbitMQ'] },
      { category: 'Video Infrastructure', items: ['LiveKit', 'WebRTC', 'SFU', 'FFmpeg'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudFront', 'RDS'] },
      { category: 'Security & Compliance', items: ['HIPAA', 'GDPR', 'SOC 2', 'End-to-end encryption', 'MFA'] },
    ],
    architecture: {
      description:
        'A multi-region, HIPAA-compliant architecture with dedicated video infrastructure, country-specific data isolation, and a unified API gateway. The platform uses WebRTC with selective forwarding units for scalable video consultations.',
      highlights: [
        'Multi-region AWS deployment with data sovereignty',
        'WebRTC SFU architecture for scalable video',
        'Country-specific compliance modules',
        'Event-driven architecture for real-time updates',
        'CDN-backed media delivery',
        'Automated provider credential verification',
      ],
    },
    timeline: [
      {
        phase: 'Discovery',
        duration: '6 Weeks',
        tasks: ['Regulatory analysis across 12 countries', 'Provider and patient research', 'Technical architecture design', 'Compliance requirements mapping'],
      },
      {
        phase: 'Development',
        duration: '20 Weeks',
        tasks: ['Core video consultation infrastructure', 'Provider marketplace and onboarding', 'Billing engine with multi-currency support', 'Mobile app development'],
      },
      {
        phase: 'Testing & Compliance',
        duration: '6 Weeks',
        tasks: ['HIPAA and GDPR compliance audit', 'Penetration testing and security review', 'Performance testing across regions', 'Beta launch with 100 providers'],
      },
      {
        phase: 'Launch',
        duration: '4 Weeks',
        tasks: ['Phased country rollout', 'Provider onboarding program', 'Marketing and patient acquisition', '24/7 support setup'],
      },
    ],
    results: [
      { label: 'Patient Adoption', value: 250, suffix: 'K+', description: 'Active patients within first year', prefix: '' },
      { label: 'Provider Network', value: 5, suffix: 'K+', description: 'Licensed healthcare providers onboarded', prefix: '' },
      { label: 'Consultations', value: 1, suffix: 'M+', description: 'Completed video consultations', prefix: '' },
      { label: 'Patient Satisfaction', value: 4.8, suffix: '/5', description: 'Average patient rating', prefix: '' },
    ],
    testimonial: {
      quote: 'Softgoway built a platform that handles the complexity of multi-country healthcare regulations while keeping the patient experience simple and intuitive. Our provider network grew 10x in the first quarter.',
      name: 'Alex Chen',
      role: 'CEO',
      company: 'HealthConnect Global',
    },
    relatedProjects: ['hospital-erp', 'fintech-dashboard', 'logistics-hub'],
  },
  {
    id: 'fintech-dashboard',
    name: 'FinTech Control Center',
    tagline: 'A real-time analytics console for finance teams to monitor risk, liquidity, and key KPIs.',
    category: 'FinTech SaaS',
    industry: 'Finance',
    year: 2025,
    clientType: 'Enterprise',
    clientName: 'Apex Financial Solutions',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Transactions', value: '10M+' },
      { label: 'Assets Monitored', value: '$2B+' },
      { label: 'Users', value: '5K+' },
      { label: 'Uptime', value: '99.99%' },
    ],
    overview: {
      client: 'Apex Financial Solutions',
      industry: 'Finance',
      duration: '5 Months',
      teamSize: '6 Engineers',
      platform: 'Web',
      engagement: 'Dedicated Team',
      status: 'Live Production',
      description:
        'A real-time financial control center providing risk monitoring, liquidity tracking, compliance reporting, and executive analytics for a leading financial services firm.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Delayed insights',
          description: 'Reports were generated overnight, leaving decision-makers with stale data that was 12-24 hours old.',
          icon: BarChart3,
        },
        {
          title: 'Spreadsheet dependency',
          description: 'Critical risk calculations were performed in Excel spreadsheets, prone to human error and version control issues.',
          icon: FileText,
        },
        {
          title: 'Regulatory pressure',
          description: 'Increasing regulatory requirements demanded real-time reporting and audit trails that manual processes could not provide.',
          icon: Shield,
        },
        {
          title: 'Data fragmentation',
          description: 'Data was scattered across trading systems, accounting software, and manual reports with no unified view.',
          icon: Database,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We built a real-time analytics platform that ingests data from 20+ sources, processes it through a streaming pipeline, and surfaces actionable insights through customizable dashboards. The system replaced overnight batch reports with sub-second data freshness.',
      highlights: [
        'Real-time data pipeline processing 10M+ daily transactions',
        'Customizable dashboard builder for different user roles',
        'Automated regulatory reporting with SOC 2 compliance',
        'AI-powered anomaly detection for risk monitoring',
        'Role-based access with detailed audit trails',
        'Multi-currency and multi-asset class support',
      ],
    },
    features: [
      {
        title: 'Real-Time Risk Dashboard',
        description: 'Live monitoring of market risk, credit risk, and operational risk with configurable alert thresholds.',
        benefits: ['Real-time risk alerts', 'Historical risk analysis', 'Custom risk models'],
        icon: Shield,
        gradient: 'from-red-500 to-rose-500',
      },
      {
        title: 'Liquidity Management',
        description: 'Track cash positions, forecast liquidity needs, and optimize working capital across multiple accounts and currencies.',
        benefits: ['Real-time cash visibility', 'Automated forecasting', 'Optimized capital allocation'],
        icon: Activity,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Compliance Reporting',
        description: 'Automated generation of regulatory reports with configurable templates and submission tracking.',
        benefits: ['Automated filings', 'SOC 2 compliant', 'Audit-ready reports'],
        icon: FileText,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Executive Analytics',
        description: 'High-level dashboards with drill-down capability for executives to monitor key business metrics.',
        benefits: ['Board-ready reports', 'Drill-down analytics', 'Custom KPIs'],
        icon: BarChart3,
        gradient: 'from-green-500 to-emerald-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Dashboard Tour', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Technical Overview', type: 'PDF', url: '#' },
        { title: 'Architecture Diagram', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'TanStack Query', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'PostgreSQL', 'Apache Kafka', 'Redis'] },
      { category: 'Streaming & Analytics', items: ['Apache Flink', 'ClickHouse', 'Grafana', 'Prometheus'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'RDS', 'ElastiCache'] },
      { category: 'Security', items: ['SOC 2', 'GDPR', 'MFA', 'Audit logging', 'Encryption at rest'] },
    ],
    architecture: {
      description:
        'A stream-processing architecture with Apache Kafka as the backbone, Apache Flink for real-time computations, and ClickHouse for high-performance analytics queries. The frontend connects via WebSockets for live data updates.',
      highlights: [
        'Stream processing with sub-second latency',
        'Apache Kafka for event streaming',
        'ClickHouse for real-time analytics',
        'WebSocket-based live dashboard updates',
        'Microservices with domain-driven design',
        'Multi-region active-active deployment',
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Architecture',
        duration: '4 Weeks',
        tasks: ['Data source integration analysis', 'Stream processing architecture design', 'Dashboard requirements gathering', 'Regulatory compliance mapping'],
      },
      {
        phase: 'Data Pipeline',
        duration: '8 Weeks',
        tasks: ['Kafka cluster setup and configuration', 'Data ingestion from 20+ sources', 'Real-time processing pipeline', 'Data quality monitoring'],
      },
      {
        phase: 'Dashboard Development',
        duration: '8 Weeks',
        tasks: ['Risk dashboard with real-time updates', 'Liquidity management module', 'Compliance reporting engine', 'Executive analytics dashboards'],
      },
      {
        phase: 'Deployment & Migration',
        duration: '4 Weeks',
        tasks: ['Phased rollout to 5K+ users', 'Data migration and validation', 'User training and documentation', '24/7 monitoring setup'],
      },
    ],
    results: [
      { label: 'Data Freshness', value: 99, suffix: '%', description: 'Sub-second data latency across all dashboards', prefix: '' },
      { label: 'Report Generation', value: 95, suffix: '%', description: 'Reduction in manual report creation time', prefix: '' },
      { label: 'Risk Detection', value: 3, suffix: 'x', description: 'Faster anomaly detection and response', prefix: '' },
      { label: 'Operational Cost', value: 30, suffix: '%', description: 'Reduction in compliance and reporting costs', prefix: '' },
    ],
    testimonial: {
      quote: 'The platform transformed how we manage risk and compliance. What used to take our team three days now happens in real-time. It has become our single source of truth for financial data.',
      name: 'Sarah Mitchell',
      role: 'VP of Risk Management',
      company: 'Apex Financial Solutions',
    },
    relatedProjects: ['telehealth-platform', 'hospital-erp', 'logistics-hub'],
  },
  {
    id: 'logistics-hub',
    name: 'Logistics Command Hub',
    tagline: 'An operations layer for fleet tracking, route optimisation, and exception handling across regions.',
    category: 'Enterprise Software',
    industry: 'Logistics',
    year: 2025,
    clientType: 'Enterprise',
    clientName: 'SwiftLogistics Corp',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Fleet Size', value: '5K+' },
      { label: 'Deliveries', value: '2M+' },
      { label: 'Route Efficiency', value: '35%' },
      { label: 'Coverage', value: '50+' },
    ],
    overview: {
      client: 'SwiftLogistics Corp',
      industry: 'Logistics',
      duration: '7 Months',
      teamSize: '10 Engineers',
      platform: 'Web + Mobile',
      engagement: 'Dedicated Team',
      status: 'Live Production',
      description:
        'A logistics command hub providing real-time fleet tracking, AI-powered route optimization, automated exception handling, and cross-regional operations management.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Inefficient routing',
          description: 'Drivers used personal judgment for routes, resulting in 35% longer travel times and higher fuel costs.',
          icon: Activity,
        },
        {
          title: 'Limited visibility',
          description: 'Dispatchers had no real-time view of fleet locations, leading to poor coordination and delayed responses.',
          icon: BarChart3,
        },
        {
          title: 'Manual exception handling',
          description: 'Delays, breakdowns, and route deviations required phone calls and manual coordination, causing cascading delays.',
          icon: Settings,
        },
        {
          title: 'Data silos',
          description: 'Operations, billing, and customer service teams operated on separate systems with no shared data.',
          icon: Database,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We built a unified logistics command center with real-time GPS tracking, AI-powered route optimization, automated exception management, and cross-team data integration. The platform connects dispatchers, drivers, and customers in real time.',
      highlights: [
        'Real-time fleet tracking with 5-second GPS updates',
        'AI route optimization with live traffic data',
        'Automated exception detection and resolution workflows',
        'Customer-facing tracking portal with ETAs',
        'Integration with 15+ carrier APIs',
        'Cross-regional operations dashboard',
      ],
    },
    features: [
      {
        title: 'Live Fleet Tracking',
        description: 'Real-time GPS tracking with geofencing, route history playback, and predictive ETA calculations.',
        benefits: ['5-second GPS updates', 'Geofence alerts', 'Route history playback'],
        icon: Smartphone,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Route Optimization',
        description: 'AI-powered route planning considering traffic, weather, delivery windows, and vehicle capacity constraints.',
        benefits: ['35% shorter routes', 'Real-time traffic adaptation', 'Multi-stop optimization'],
        icon: Zap,
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Exception Management',
        description: 'Automated detection and resolution workflows for delays, breakdowns, route deviations, and missed deliveries.',
        benefits: ['Automated alerts', 'Resolution workflows', 'Cascading impact analysis'],
        icon: Bell,
        gradient: 'from-orange-500 to-red-500',
      },
      {
        title: 'Customer Portal',
        description: 'White-labeled tracking portal with live ETA updates, delivery confirmation, and two-way communication.',
        benefits: ['Real-time customer updates', 'Delivery self-service', 'NPS improvement'],
        icon: Users,
        gradient: 'from-purple-500 to-pink-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566576912328-985e480c1e3c?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Dispatch Center Overview', url: '#', thumbnail: undefined },
        { title: 'Driver App Demo', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Implementation Report', type: 'PDF', url: '#' },
        { title: 'System Architecture', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Mapbox GL', 'WebSocket', 'Tailwind CSS'] },
      { category: 'Backend', items: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'GraphQL'] },
      { category: 'Mapping & Location', items: ['Mapbox', 'Google Maps API', 'GeoJSON', 'OSRM'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'ECS', 'Terraform', 'RDS', 'ElastiCache'] },
      { category: 'Mobile', items: ['React Native', 'Expo', 'Background GPS', 'Offline maps'] },
    ],
    architecture: {
      description:
        'A real-time event-driven architecture with Go-based high-performance services for GPS ingestion, Node.js for business logic, and React on the frontend with Mapbox GL for geospatial visualization.',
      highlights: [
        'Go-based GPS ingestion handling 50K+ updates/sec',
        'Real-time event processing with RabbitMQ',
        'Mapbox GL for geospatial visualization',
        'Geofencing with geospatial indexing (PostGIS)',
        'Offline-capable mobile app with background location',
        'Auto-scaling fleet processing pipeline',
      ],
    },
    timeline: [
      {
        phase: 'Discovery',
        duration: '4 Weeks',
        tasks: ['Fleet operations analysis', 'Route optimization algorithm research', 'GPS integration testing', 'Architecture design'],
      },
      {
        phase: 'Core Development',
        duration: '16 Weeks',
        tasks: ['GPS ingestion pipeline in Go', 'Route optimization engine', 'Dispatch dashboard', 'Mobile driver app'],
      },
      {
        phase: 'Integration',
        duration: '6 Weeks',
        tasks: ['Carrier API integrations', 'Customer portal development', 'Billing system integration', 'Data migration'],
      },
      {
        phase: 'Deployment',
        duration: '4 Weeks',
        tasks: ['Pilot with 500 vehicles', 'Driver training program', 'Full fleet rollout', 'Performance monitoring'],
      },
    ],
    results: [
      { label: 'Route Efficiency', value: 35, suffix: '%', description: 'Reduction in total miles driven across fleet', prefix: '' },
      { label: 'On-Time Delivery', value: 98, suffix: '%', description: 'Improvement in on-time delivery rate', prefix: '' },
      { label: 'Fuel Cost Reduction', value: 25, suffix: '%', description: 'Reduction in fuel costs through optimized routing', prefix: '' },
      { label: 'Exception Response', value: 80, suffix: '%', description: 'Faster exception resolution with automated workflows', prefix: '' },
    ],
    testimonial: {
      quote: 'Softgoway built a logistics platform that gave us complete visibility into our fleet operations. The route optimization alone paid for the project in the first three months.',
      name: 'Raj Patel',
      role: 'VP of Operations',
      company: 'SwiftLogistics Corp',
    },
    relatedProjects: ['hospital-erp', 'fintech-dashboard', 'telehealth-platform'],
  },
  {
    id: 'vidyanxt-school-erp',
    name: 'vidyaNxt School ERP',
    tagline: 'Empowering education. One platform. Streamline admissions, attendance, academics, finance, and HR from a single secure hub.',
    category: 'Enterprise Software',
    industry: 'Education',
    year: 2025,
    clientType: 'Enterprise',
    clientName: 'vidyaNxt',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Institutions', value: '2,400+' },
      { label: 'Students', value: '1.8M' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'SLA', value: '99.9%' },
    ],
    overview: {
      client: 'vidyaNxt',
      industry: 'Education',
      duration: '8 Months',
      teamSize: '10 Engineers',
      platform: 'Web + Mobile',
      engagement: 'Product Development',
      status: 'Live Production',
      description:
        'A comprehensive School ERP platform designed to digitize and streamline educational operations across admissions, attendance, academics, finance, and HR — all from a single secure hub with multi-role access.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Fragmented school operations',
          description: 'Schools relied on disjointed tools and paper-based processes for admissions, attendance, grading, and finance, causing data silos and inefficiencies.',
          icon: FileText,
        },
        {
          title: 'Lack of real-time visibility',
          description: 'Administrators and teachers had no real-time access to student progress, attendance trends, or financial health, delaying critical decisions.',
          icon: BarChart3,
        },
        {
          title: 'Role-based access gaps',
          description: 'Different stakeholders — admin, teachers, parents — needed tailored views and permissions, but existing systems offered no granular access control.',
          icon: Users,
        },
        {
          title: 'Scalability for growing institutions',
          description: 'The platform needed to serve 2,400+ institutions and 1.8M students with high availability and 99.9% uptime SLA.',
          icon: Shield,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We designed and built a unified School ERP platform that connects every aspect of educational administration — from student admissions and attendance tracking to academic management, finance, and HR. The platform provides role-based access for administrators, teachers, and parents with real-time dashboards and analytics.',
      highlights: [
        'Unified platform for admissions, attendance, academics, finance, and HR',
        'Multi-role access with granular permissions — Admin, Teacher, Parent',
        'Role-based security with full audit trails',
        'Real-time dashboards and analytics for data-driven decisions',
        'Cloud-hosted with 99.9% uptime SLA',
        'Scalable architecture serving 2,400+ institutions and 1.8M students',
      ],
    },
    features: [
      {
        title: 'Student Admissions',
        description: 'End-to-end admission management from inquiry and application to enrollment, document verification, and fee collection.',
        benefits: ['Streamlined admission workflow', 'Automated document verification', 'Digital fee collection'],
        icon: Users,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Attendance & Academics',
        description: 'Real-time attendance tracking, gradebook management, exam scheduling, and progress reports accessible to teachers and parents.',
        benefits: ['Real-time attendance tracking', 'Automated report cards', 'Parent-teacher communication'],
        icon: BarChart3,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Finance & Fee Management',
        description: 'Comprehensive fee management with invoicing, payment tracking, due-date reminders, and financial reporting.',
        benefits: ['Automated invoicing', 'Payment gateway integration', 'Real-time financial reports'],
        icon: Settings,
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        title: 'HR & Staff Management',
        description: 'Staff lifecycle management including payroll, attendance, leave management, performance tracking, and recruitment.',
        benefits: ['Centralized staff records', 'Automated payroll', 'Leave & attendance tracking'],
        icon: Shield,
        gradient: 'from-orange-500 to-red-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Platform Overview', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Product Brochure', type: 'PDF', url: '#' },
        { title: 'Technical Architecture', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'GraphQL'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'RDS', 'CloudFront', 'S3'] },
      { category: 'Mobile', items: ['React Native', 'Expo'] },
      { category: 'Security', items: ['Role-based access control', 'Audit trails', 'Encryption at rest', 'MFA'] },
    ],
    architecture: {
      description:
        'A modular, cloud-native architecture with a GraphQL API gateway, separate microservices for each domain (admissions, academics, finance, HR), and a shared authentication layer with role-based access control. The platform uses PostgreSQL for transactional data and Redis for caching.',
      highlights: [
        'Microservices with domain-driven design',
        'GraphQL API gateway for unified data access',
        'Role-based access control with granular permissions',
        'Event-driven architecture for real-time notifications',
        'AWS multi-region deployment for high availability',
        'Automated backup and disaster recovery',
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Planning',
        duration: '4 Weeks',
        tasks: ['Stakeholder interviews with school administrators', 'Process mapping for admissions, academics, finance', 'Technical architecture design', 'MVP scope definition'],
      },
      {
        phase: 'Design',
        duration: '6 Weeks',
        tasks: ['UX research with teachers and parents', 'Wireframes and interactive prototypes', 'Design system creation', 'User testing with pilot schools'],
      },
      {
        phase: 'Development',
        duration: '16 Weeks',
        tasks: ['Admissions and student management module', 'Attendance and academic management', 'Finance and fee management engine', 'HR and staff management module'],
      },
      {
        phase: 'Testing & QA',
        duration: '4 Weeks',
        tasks: ['Integration testing across all modules', 'Performance testing with 100K concurrent users', 'Security audit and penetration testing', 'UAT with pilot schools'],
      },
      {
        phase: 'Deployment',
        duration: '4 Weeks',
        tasks: ['Phased rollout to pilot institutions', 'Data migration from legacy systems', 'Staff training and documentation', 'Full production launch'],
      },
    ],
    results: [
      { label: 'Institutions Served', value: 2400, suffix: '+', description: 'Educational institutions using the platform', prefix: '' },
      { label: 'Students Managed', value: 1.8, suffix: 'M', description: 'Active student records across all institutions', prefix: '' },
      { label: 'Manual Work Reduced', value: 60, suffix: '%', description: 'Reduction in manual administrative tasks', prefix: '' },
      { label: 'System Uptime', value: 99.9, suffix: '%', description: 'Platform availability since launch', prefix: '' },
    ],
    testimonial: {
      quote: 'vidyaNxt has transformed how we manage our school operations. From admissions to report cards, everything is now digital, streamlined, and accessible in real-time. Our teachers and parents love it.',
      name: 'Principal',
      role: 'School Administrator',
      company: 'vidyaNxt Partner Institution',
    },
    relatedProjects: ['hospital-erp', 'fintech-dashboard', 'logistics-hub'],
  },
  {
    id: 'foodbridge',
    name: 'FoodBridge — Restaurant & Food Delivery Platform',
    tagline: 'A full-stack food ecosystem with customer app, delivery agent app, and vendor/admin dashboard — connecting restaurants, riders, and customers in real time.',
    category: 'Consumer Platform',
    industry: 'Food & Hospitality',
    year: 2025,
    clientType: 'Startup',
    clientName: 'FoodBridge',
    heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop',
    heroStats: [
      { label: 'Restaurants', value: '500+' },
      { label: 'Orders/Month', value: '50K+' },
      { label: 'Delivery Agents', value: '1K+' },
      { label: 'Avg. Delivery', value: '28min' },
    ],
    overview: {
      client: 'FoodBridge',
      industry: 'Food & Hospitality',
      duration: '9 Months',
      teamSize: '14 Engineers',
      platform: 'Web + iOS + Android',
      engagement: 'Product Development',
      status: 'Live Production',
      description:
        'A modern multi-platform food delivery ecosystem comprising three distinct applications — a customer mobile app for restaurant discovery and ordering, a delivery agent app for real-time navigation and order management, and a comprehensive vendor/admin dashboard for restaurant operations, analytics, and platform governance.',
    },
    problem: {
      title: 'The Challenge',
      items: [
        {
          title: 'Fragmented user experience',
          description: 'Restaurants, delivery agents, and customers operated on disconnected systems with no real-time coordination, leading to delayed orders and poor communication.',
          icon: Smartphone,
        },
        {
          title: 'Complex order lifecycle',
          description: 'Managing the order lifecycle from placement through preparation, pickup, delivery, and confirmation required a robust real-time system that could handle thousands of concurrent orders.',
          icon: Activity,
        },
        {
          title: 'Scalability under load',
          description: 'The platform needed to handle peak-hour traffic with 50K+ monthly orders while maintaining real-time tracking, push notifications, and payment processing without degradation.',
          icon: Server,
        },
        {
          title: 'Multi-platform consistency',
          description: 'Maintaining a consistent experience across customer mobile apps (iOS/Android), delivery agent app, and the web dashboard required a unified API layer and shared business logic.',
          icon: LayoutIcon,
        },
      ],
    },
    solution: {
      title: 'Our Solution',
      description:
        'We architected and built a three-application food delivery ecosystem powered by a shared GraphQL API gateway. The customer app enables restaurant discovery, menu customization, and seamless checkouts via Razorpay. The delivery agent app provides GPS-optimized navigation, real-time order boards, and push-based status updates. The vendor dashboard offers live order management, menu curation, coupon campaigns, and granular analytics — all governed by role-based admin controls.',
      highlights: [
        'Customer mobile app with restaurant discovery, menu customization, and Razorpay payment integration',
        'Delivery agent app with GPS navigation, live order boards, and real-time status updates',
        'Vendor/admin dashboard with live order tracking, analytics, coupon management, and role-based access',
        'Real-time order lifecycle with WebSocket-powered push notifications across all three apps',
        'Unified GraphQL API gateway with shared business logic and data federation',
        'Scalable event-driven architecture handling 50K+ monthly orders with sub-second tracking updates',
      ],
    },
    features: [
      {
        title: 'Restaurant Discovery',
        description: 'Browse restaurants by cuisine, location, rating, and availability with smart search, filters, and personalized recommendations.',
        benefits: ['Smart search & filters', 'Personalized recommendations', 'Real-time availability'],
        icon: Smartphone,
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Menu Customization',
        description: 'Full menu browsing with item customization, special instructions, portion sizes, add-ons, and dietary preference filters.',
        benefits: ['Customizable orders', 'Dietary filters', 'Real-time menu sync'],
        icon: Settings,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Razorpay Payments',
        description: 'Secure payment processing via Razorpay supporting cards, UPI, net banking, and wallet — with automatic split payments to restaurants and delivery fees.',
        benefits: ['Multiple payment modes', 'Auto split payments', 'Secure processing'],
        icon: Shield,
        gradient: 'from-green-500 to-emerald-500',
      },
      {
        title: 'Real-Time Order Tracking',
        description: 'Live order status from placement to preparation to delivery with GPS tracking, ETA updates, and push notifications at every stage.',
        benefits: ['Live GPS tracking', 'Push notifications', 'Accurate ETAs'],
        icon: Activity,
        gradient: 'from-orange-500 to-red-500',
      },
      {
        title: 'Delivery Agent App',
        description: 'Dedicated app for delivery agents with auto-assignment, optimized multi-stop routes, order pickup confirmation, and customer communication.',
        benefits: ['Auto order assignment', 'GPS route optimization', 'In-app communication'],
        icon: Users,
        gradient: 'from-indigo-500 to-purple-500',
      },
      {
        title: 'Analytics Dashboard',
        description: 'Comprehensive vendor dashboard with real-time sales data, order trends, popular items, delivery performance, and customer satisfaction metrics.',
        benefits: ['Real-time sales data', 'Performance insights', 'Data-driven decisions'],
        icon: BarChart3,
        gradient: 'from-red-500 to-rose-500',
      },
      {
        title: 'Coupon Management',
        description: 'Full coupon and promotional engine with percentage/flat discounts, minimum order values, usage limits, expiry dates, and targeted campaigns.',
        benefits: ['Flexible discount rules', 'Targeted campaigns', 'Usage analytics'],
        icon: Settings,
        gradient: 'from-amber-500 to-yellow-500',
      },
      {
        title: 'Role-Based Admin Controls',
        description: 'Granular role-based access controlling menu management, order operations, user management, payouts, and platform-wide settings.',
        benefits: ['Role-based permissions', 'Audit logging', 'Centralized control'],
        icon: Shield,
        gradient: 'from-cyan-500 to-blue-500',
      },
    ],
    gallery: {
      images: [
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      ],
      videos: [
        { title: 'Customer App Walkthrough', url: '#', thumbnail: undefined },
        { title: 'Delivery Agent App Demo', url: '#', thumbnail: undefined },
        { title: 'Vendor Dashboard Overview', url: '#', thumbnail: undefined },
      ],
      documents: [
        { title: 'Technical Architecture', type: 'PDF', url: '#' },
        { title: 'API Documentation', type: 'PDF', url: '#' },
        { title: 'Deployment Guide', type: 'PDF', url: '#' },
      ],
    },
    techStack: [
      { category: 'Customer App', items: ['React Native', 'TypeScript', 'Expo', 'GraphQL', 'Mapbox GL', 'Razorpay SDK'] },
      { category: 'Delivery App', items: ['React Native', 'TypeScript', 'Expo', 'WebSocket', 'Google Maps API', 'Background GPS'] },
      { category: 'Vendor Dashboard', items: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Recharts'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'GraphQL', 'PostgreSQL', 'Redis', 'RabbitMQ'] },
      { category: 'Real-Time', items: ['WebSocket', 'Socket.IO', 'Firebase Cloud Messaging', 'LiveKit'] },
      { category: 'Payments', items: ['Razorpay', 'Stripe', 'Payment Split Engine'] },
      { category: 'Cloud & Infrastructure', items: ['AWS', 'Docker', 'ECS', 'RDS', 'ElastiCache', 'CloudFront'] },
      { category: 'DevOps & Monitoring', items: ['GitHub Actions', 'Terraform', 'Datadog', 'Sentry', 'Prometheus'] },
    ],
    architecture: {
      description:
        'A three-application architecture powered by a shared GraphQL API gateway and event-driven backend. The customer and delivery mobile apps are built with React Native + Expo for cross-platform consistency. The vendor dashboard uses React + Vite for optimal performance. All three consume a unified NestJS GraphQL API with RabbitMQ-powered event bus for real-time order lifecycle updates, WebSocket connections for live tracking, and PostgreSQL with Redis caching for transactional data.',
      highlights: [
        'Three distinct frontends — Customer App (RN), Delivery App (RN), Vendor Dashboard (React + Vite)',
        'Unified GraphQL API gateway with Apollo Federation',
        'Event-driven architecture with RabbitMQ for order lifecycle',
        'WebSocket-based real-time tracking with sub-second updates',
        'Razorpay integration with automated payment split engine',
        'Firebase Cloud Messaging for cross-platform push notifications',
        'Multi-region AWS deployment with auto-scaling',
        'Background GPS tracking optimized for battery efficiency',
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Architecture',
        duration: '4 Weeks',
        tasks: ['Stakeholder interviews with restaurants and delivery agents', 'Competitive analysis of food delivery platforms', 'System architecture design for three-app ecosystem', 'API contract definition'],
      },
      {
        phase: 'Design & Prototyping',
        duration: '6 Weeks',
        tasks: ['UX research and user journey mapping', 'Wireframes for customer, delivery, and vendor flows', 'High-fidelity prototypes with interactive mockups', 'Design system and component library creation'],
      },
      {
        phase: 'Core Development',
        duration: '18 Weeks',
        tasks: ['GraphQL API gateway and shared services', 'Customer mobile app with ordering flow', 'Delivery agent app with GPS and navigation', 'Vendor dashboard with live order management'],
      },
      {
        phase: 'Payments & Real-Time',
        duration: '6 Weeks',
        tasks: ['Razorpay integration and split payment engine', 'WebSocket infrastructure and real-time tracking', 'Push notification system across all three apps', 'Background GPS and location services'],
      },
      {
        phase: 'Testing & QA',
        duration: '4 Weeks',
        tasks: ['Integration testing across all three apps', 'Load testing with 10K concurrent orders', 'Payment flow security audit', 'Beta launch with 50 pilot restaurants'],
      },
      {
        phase: 'Launch & Scale',
        duration: '4 Weeks',
        tasks: ['Phased rollout across 3 cities', 'Restaurant onboarding program', 'Delivery agent recruitment and training', 'Post-launch monitoring and optimization'],
      },
    ],
    results: [
      { label: 'Restaurants Onboarded', value: 500, suffix: '+', description: 'Active restaurants across multiple cities', prefix: '' },
      { label: 'Monthly Orders', value: 50, suffix: 'K+', description: 'Orders processed per month', prefix: '' },
      { label: 'Avg Delivery Time', value: 28, suffix: 'min', description: 'Average order delivery time', prefix: '' },
      { label: 'Customer Retention', value: 72, suffix: '%', description: 'Monthly repeat customer rate', prefix: '' },
    ],
    testimonial: {
      quote: 'FoodBridge completely transformed our restaurant operations. The integrated ecosystem — from customer app to delivery management — gave us real-time visibility and control we never had before. Our order volume grew 3x in the first quarter.',
      name: 'Vikram Mehta',
      role: 'CEO',
      company: 'FoodBridge',
    },
    relatedProjects: ['logistics-hub', 'fintech-dashboard', 'telehealth-platform'],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getRelatedProjects(ids: string[]): Project[] {
  return projects.filter((p) => ids.includes(p.id))
}
