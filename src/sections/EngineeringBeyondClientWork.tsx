import { motion } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { Github, Code2, BookOpen, Bot, Wrench, Library } from 'lucide-react'

const projects = [
  {
    icon: Code2,
    title: 'Open Source Contributions',
    description: 'We contribute to React, Next.js, Three.js, Tailwind CSS, and Framer Motion. Our team includes core contributors and active community members.',
    stats: [
      { label: 'GitHub Stars', value: '2,000+' },
      { label: 'Repositories', value: '15+' },
      { label: 'Contributors', value: '8' },
    ],
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
  },
  {
    icon: Library,
    title: 'Internal Component Library',
    description: '300+ reusable React components with Storybook documentation, visual regression testing, and automated publishing.',
    stats: [
      { label: 'Components', value: '300+' },
      { label: 'Stories', value: '600+' },
      { label: 'Projects using it', value: '12' },
    ],
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
  },
  {
    icon: Bot,
    title: 'Automation Tools',
    description: 'PR quality gate bot, automated deployment auditor, sprint velocity tracker, and code review checklist generator.',
    stats: [
      { label: 'PRs automated', value: '5,000+' },
      { label: 'Time saved/year', value: '400h+' },
      { label: 'Tools built', value: '7' },
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Wrench,
    title: 'Project Scaffolding CLI',
    description: 'Internal CLI tool that generates production-ready project structures with CI/CD, Docker, monitoring, and documentation pre-configured.',
    stats: [
      { label: 'Templates', value: '8' },
      { label: 'Projects scaffolded', value: '50+' },
      { label: 'Setup time', value: '< 2 min' },
    ],
    gradient: 'from-[var(--brand-yellow)] to-orange-500',
  },
  {
    icon: BookOpen,
    title: 'Engineering Accelerators',
    description: 'Architecture decision record generator, PR template generator, API client generators, and migration toolkit.',
    stats: [
      { label: 'ADRs generated', value: '200+' },
      { label: 'APIs generated', value: '30+' },
      { label: 'Migrations run', value: '25+' },
    ],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Github,
    title: 'GitHub Actions Library',
    description: 'Reusable CI/CD workflows for monorepo testing, multi-environment deployment, dependency caching, and security scanning.',
    stats: [
      { label: 'Workflows', value: '12' },
      { label: 'Total runs', value: '10K+' },
      { label: 'Avg runtime', value: '8.4 min' },
    ],
    gradient: 'from-violet-500 to-purple-600',
  },
]

export function EngineeringBeyondClientWork() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="engineering-beyond"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Beyond Client Work"
          title="Engineering that outlives "
          gradientWord="projects"
          description="Tools, libraries, and contributions we build for ourselves — and share with the community."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative p-6 rounded-xl border border-border/40 bg-card/40 hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}>
                <project.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold font-[var(--font-heading)] text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 rounded-lg bg-card/30 border border-border/20">
                    <div className="text-sm font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
