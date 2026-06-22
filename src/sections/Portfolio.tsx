import { motion, useInView, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Github, BookOpen, Smartphone, Monitor, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/AnimatedSection'
import { getLenis } from '@/hooks/useLenis'

const platforms = ['All', 'Web', 'iOS', 'Android'] as const

type Platform = (typeof platforms)[number]

interface ProjectItem {
  id?: string
  title: string
  description: string
  tags: string[]
  image: string
  gradient: string
  liveUrl: string
  repoUrl: string
  platforms: Platform[]
}

const projects: ProjectItem[] = [
  {
    id: 'foodbridge',
    title: 'FoodBridge — Food Delivery Platform',
    description:
      'A full food ecosystem with customer app, delivery agent app, and vendor dashboard — connecting restaurants, riders, and customers in real time.',
    tags: ['React Native', 'React + Vite', 'Node.js', 'PostgreSQL', 'Razorpay', 'WebSocket'],
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop',
    gradient: 'from-orange-500 to-red-500',
    liveUrl: 'https://foodbridge.alphavisionlabs.com/',
    repoUrl: '#',
    platforms: ['Web', 'iOS', 'Android'],
  },
  {
    id: 'vidyanxt-school-erp',
    title: 'vidyaNxt School ERP',
    description:
      'Empowering education. One platform. Streamline admissions, attendance, academics, finance, and HR from a single secure hub.',
    tags: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&auto=format&fit=crop',
    gradient: 'from-blue-600 to-cyan-400',
    liveUrl: 'https://schoolerp.alphavisionlabs.com/',
    repoUrl: '#',
    platforms: ['Web'],
  },
  {
    id: 'fintech-dashboard',
    title: 'FinTech Control Center',
    description:
      'A real-time analytics console for finance teams to monitor risk, liquidity, and key KPIs across multiple systems.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    gradient: 'from-blue-500 to-cyan-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web', 'iOS'],
  },
  {
    id: 'telehealth-platform',
    title: 'Global Telehealth Platform',
    description:
      'HIPAA-ready telehealth workflows with virtual consultations, prescriptions, and integrated scheduling.',
    tags: ['Next.js', 'GraphQL', 'MongoDB', 'WebRTC'],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    gradient: 'from-emerald-500 to-green-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web', 'iOS', 'Android'],
  },
  {
    title: 'Multi‑vendor Commerce Suite',
    description:
      'A marketplace engine with configurable catalogues, real-time inventory, and personalised recommendations.',
    tags: ['Vue.js', 'Python', 'Redis', 'Kubernetes'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    gradient: 'from-orange-500 to-amber-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web'],
  },
  {
    title: 'AI Content Studio',
    description:
      'A content operations hub where marketing teams brief, generate, and review AI‑assisted assets in one place.',
    tags: ['React', 'Python', 'TensorFlow', 'GCP'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    gradient: 'from-violet-500 to-purple-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web'],
  },
  {
    id: 'logistics-hub',
    title: 'Logistics Command Hub',
    description:
      'An operations layer for fleet tracking, route optimisation, and exception handling across regions.',
    tags: ['Angular', 'Go', 'PostgreSQL', 'Azure'],
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
    gradient: 'from-amber-500 to-yellow-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web', 'iOS', 'Android'],
  },
  {
    title: 'Adaptive Learning Platform',
    description:
      'An LMS with adaptive paths, progress analytics, and content authoring tools for education providers.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop',
    gradient: 'from-indigo-500 to-blue-400',
    liveUrl: '#',
    repoUrl: '#',
    platforms: ['Web'],
  },
]

function ProjectCard({
  project,
  progress,
  index,
}: {
  project: (typeof projects)[number]
  progress: number
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const cardStart = index / projects.length
  const cardEnd = (index + 1) / projects.length
  const cardProgress = Math.max(
    0,
    Math.min(1, (progress - cardStart) / (cardEnd - cardStart))
  )

  // ✅ FIXED: much gentler falloff — cards stay bright even when not "active"
  const scale = 0.94 + cardProgress * 0.06
  const opacity = 0.75 + cardProgress * 0.25

  const handleOpen = (url?: string) => {
    if (!url || url === '#') return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleViewCaseStudy = () => {
    if (project.id) {
      navigate(`/projects/${project.id}`)
    }
  }

  const isDisabled = (url?: string) => !url || url === '#'

  return (
    <motion.article
      className="flex-none w-[380px] lg:w-[450px] h-[520px] lg:h-[580px]"
      style={{ scale, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={project.title}
    >
      <motion.div
        className="group relative h-full rounded-3xl overflow-hidden bg-white dark:bg-[#111113] shadow-xl shadow-black/10 dark:shadow-black/40 border border-zinc-200 dark:border-zinc-700/60"
        whileHover={{ y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Top accent bar */}
        <div className={cn('h-1 w-full bg-gradient-to-r', project.gradient)} />

        {/* Image */}
        <div className="relative h-52 lg:h-60 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />
          {/* Only a gentle bottom fade — no dark wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111113] via-transparent to-transparent" />

          {/* ✅ FIXED: buttons float on their own solid bg — NO dark overlay on image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10 flex items-center gap-3 pointer-events-auto">
              {project.id && (
                <motion.button
                  type="button"
                  onClick={handleViewCaseStudy}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl shadow-black/20 border border-zinc-200 dark:border-zinc-600"
                >
                  <BookOpen className="w-5 h-5" strokeWidth={2.2} />
                </motion.button>
              )}
              <motion.button
                type="button"
                disabled={isDisabled(project.liveUrl)}
                onClick={() => handleOpen(project.liveUrl)}
                whileHover={{ scale: isDisabled(project.liveUrl) ? 1 : 1.15 }}
                whileTap={{ scale: isDisabled(project.liveUrl) ? 1 : 0.9 }}
                className={cn(
                  'p-3.5 rounded-full shadow-xl shadow-black/20 border',
                  isDisabled(project.liveUrl)
                    ? 'bg-white/40 dark:bg-zinc-800/40 text-zinc-400 cursor-not-allowed border-zinc-200/50 dark:border-zinc-700/50'
                    : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
                )}
              >
                <ExternalLink className="w-5 h-5" strokeWidth={2.2} />
              </motion.button>
              <motion.button
                type="button"
                disabled={isDisabled(project.repoUrl)}
                onClick={() => handleOpen(project.repoUrl)}
                whileHover={{ scale: isDisabled(project.repoUrl) ? 1 : 1.15 }}
                whileTap={{ scale: isDisabled(project.repoUrl) ? 1 : 0.9 }}
                className={cn(
                  'p-3.5 rounded-full shadow-xl shadow-black/20 border',
                  isDisabled(project.repoUrl)
                    ? 'bg-white/40 dark:bg-zinc-800/40 text-zinc-400 cursor-not-allowed border-zinc-200/50 dark:border-zinc-700/50'
                    : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
                )}
              >
                <Github className="w-5 h-5" strokeWidth={2.2} />
              </motion.button>
            </div>
          </motion.div>

          {/* Badge */}
          <div
            className={cn(
              'absolute top-3 left-3 px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r shadow-lg shadow-black/20',
              project.gradient
            )}
          >
            Case study
          </div>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-7">
          <h3 className="text-lg lg:text-xl font-bold font-[var(--font-heading)] mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-5 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ FIXED: glow stays behind card, doesn't wash the card itself */}
        <motion.div
          className={cn(
            'pointer-events-none absolute -inset-[2px] rounded-3xl blur-xl -z-10',
            'bg-gradient-to-r',
            project.gradient
          )}
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  )
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState<Platform>('All')
  const [maxScroll, setMaxScroll] = useState(0)
  const maxScrollMV = useMotionValue(0)

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.platforms.includes(activeFilter)),
    [activeFilter]
  )

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backgroundX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  useLayoutEffect(() => {
    const update = () => {
      const container = scrollContainerRef.current
      if (!container) return
      const cards = container.children
      const lastCard = cards[cards.length - 1] as HTMLElement | undefined
      if (lastCard) {
        const rect = lastCard.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const viewportCenter = window.innerWidth / 2
        const scrollDistance = cardCenter - viewportCenter
        const val = Math.max(0, scrollDistance)
        maxScrollMV.set(val)
        setMaxScroll(val)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [maxScrollMV])

  const { scrollYProgress: horizProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(
    [horizProgress, maxScrollMV],
    ([t, ms]: number[]) => t * -ms
  )

  const [scrollProgress, setScrollProgress] = useState(0)

  useLayoutEffect(() => {
    const unsub = horizProgress.on('change', (v) => {
      setScrollProgress(Math.min(1, Math.max(0, v)))
    })
    return () => unsub()
  }, [horizProgress])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative"
      style={{ height: maxScroll > 0 ? `calc(100vh + ${maxScroll}px)` : '200vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: backgroundX }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]
                     bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10
                     rounded-full blur-[200px]"
        />
      </div>

      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-4 shrink-0">
          <AnimatedSection className="text-center">
            <div ref={headerRef}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20"
              >
                Our work
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-3 text-balance"
              >
                Featured{' '}
                <span className="gradient-text-animated">projects</span>
              </motion.h2>
              {/* <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
              >
                A selection of platforms, internal tools, and products we&apos;ve
                helped design, build, and scale for teams across finance,
                healthcare, education, and more.
              </motion.p> */}
            </div>
          </AnimatedSection>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {platforms.map((p) => {
              const Icon = p === 'Web' ? Globe : p === 'iOS' ? Smartphone : p === 'Android' ? Smartphone : undefined
              return (
                <motion.button
                  key={p}
                  onClick={() => setActiveFilter(p)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                    activeFilter === p
                      ? 'bg-foreground text-background shadow-lg shadow-foreground/20'
                      : 'bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {p}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Progress indicator (desktop) */}
          <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
            {filteredProjects.map((_, index) => {
              const start = index / filteredProjects.length
              const end = (index + 1) / filteredProjects.length
              const active =
                scrollProgress >= start - 0.02 && scrollProgress < end + 0.02
              return (
                <motion.div
                  key={index}
                  className={cn(
                    'w-2 rounded-full transition-all duration-300',
                    active
                      ? 'w-2 h-8 bg-gradient-to-b from-primary to-accent'
                      : 'h-2 bg-border'
                  )}
                />
              )
            })}
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress < 0.1 ? 1 : 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 text-muted-foreground text-sm flex items-center gap-2 z-20"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>

          {/* Horizontal track */}
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-8 pl-[10vw] pr-[20vw] will-change-transform"
            style={{ x, perspective: '1000px' }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                progress={scrollProgress}
              />
            ))}

            {/* End CTA card */}
            <motion.div className="flex-none w-[380px] lg:w-[450px] h-[520px] lg:h-[580px] flex items-center justify-center">
              <div className="text-center rounded-3xl p-10 lg:p-12 border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-[#111113] shadow-xl shadow-black/10 dark:shadow-black/40">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-3xl font-bold text-white">+</span>
                </motion.div>
                <h3 className="text-2xl font-bold font-[var(--font-heading)] mb-4 text-zinc-900 dark:text-zinc-100">
                  Have a project in mind?
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-sm lg:text-base leading-relaxed">
                  Share a brief, and we&apos;ll walk you through how we&apos;d approach
                  it—no obligation, just a practical next step.
                </p>
                <motion.button
                  type="button"
                  onClick={() => {
                    const lenis = getLenis()
                    if (lenis) {
                      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
                    } else {
                      document
                        .getElementById('contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="relative px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-black/15 overflow-hidden group/btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-primary" />
                  <span
                    className={cn(
                      'absolute inset-0 bg-gradient-to-r from-transparent via-accent/80 to-transparent',
                      'translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700'
                    )}
                  />
                  <span className="relative z-10">Start a conversation</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}