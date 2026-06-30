import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Target, Eye, Award, Users, Lightbulb, Shield, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { TiltCard } from '@/components/TiltCard'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'
import { GradientText } from '@/components/TextReveal'
import { getLenis } from '@/hooks/useLenis'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const values = [
  {
    icon: Lightbulb,
    title: 'Engineering‑led innovation',
    description:
      'We prototype fast, validate early, and ship solutions that balance ambitious ideas with real‑world constraints.',
    gradient: 'from-[var(--brand-yellow)] to-orange-600',
    glow: 'rgba(255,215,0,0.2)',
  },
  {
    icon: Users,
    title: 'Long‑term partnerships',
    description:
      'We embed with your team, align on outcomes, and stay accountable from first commit to post‑launch iterations.',
    gradient: 'from-[var(--brand-blue-primary)] to-[var(--brand-blue-light)]',
    glow: 'rgba(0,102,255,0.2)',
  },
  {
    icon: Shield,
    title: 'Reliability at scale',
    description:
      'We design for uptime, observability, and predictable releases, not just demos that look good in slides.',
    gradient: 'from-[var(--brand-green-primary)] to-[var(--brand-green-light)]',
    glow: 'rgba(34,197,94,0.2)',
  },
  {
    icon: Award,
    title: 'Craft and ownership',
    description:
      'We treat every product as our own, obsessing over details, performance, and maintainability long after launch.',
    gradient: 'from-[var(--brand-green-light)] to-[var(--brand-blue-primary)]',
    glow: 'rgba(132,226,53,0.2)',
  },
]

const posts = [
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
    category: 'Team Offsite',
    date: 'Mar 2026',
    location: 'Goa, India',
    title: 'Annual Engineering Summit 2026',
    description:
      'Three days of deep-dive sessions, brainstorming, and team-building by the beach.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop',
    category: 'Community',
    date: 'Feb 2026',
    location: 'Bangalore',
    title: 'Open Source Hackathon',
    description:
      'Our engineers contributed to open-source projects and mentored first-time contributors.',
  },
  {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    category: 'Event',
    date: 'Jan 2026',
    location: 'Mumbai',
    title: 'Tech Leaders Conclave',
    description:
      'Panel discussions on AI, scaling SaaS, and the future of remote engineering teams.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
    category: 'Culture',
    date: 'Dec 2025',
    location: 'Pune',
    title: 'Year-End Celebration',
    description:
      'Celebrating a year of shipping great products with the whole team and families.',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    category: 'Learning',
    date: 'Nov 2025',
    location: 'Remote',
    title: 'Internal Tech Talks — Season 3',
    description:
      'Weekly knowledge-sharing sessions covering system design, AI agents, and observability.',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
    category: 'Wellness',
    date: 'Oct 2025',
    location: 'Lonavala',
    title: 'Wellness & Creativity Retreat',
    description:
      'A weekend focused on mindfulness, creative workshops, and stepping away from screens.',
  },
]

// ─────────────────────────────────────────────
// VALUE CARD
// ─────────────────────────────────────────────

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 lg:p-8 rounded-2xl bg-card/50 backdrop-blur-sm
                 border border-border hover:border-primary/20
                 transition-colors duration-500 h-full overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Per-card glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${value.glow}, transparent 70%)`,
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0 rounded-bl-3xl rounded-tr-2xl"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${value.glow})`,
          }}
        />
      </div>

      {/* Icon */}
      <motion.div
        className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient}
                    flex items-center justify-center mb-6 shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div
          className="absolute inset-0 rounded-xl blur-md opacity-50"
          style={{
            background: `linear-gradient(135deg, ${value.glow.replace(
              '0.15',
              '0.6'
            )}, transparent)`,
          }}
        />
        <value.icon className="relative w-7 h-7 text-primary" />
      </motion.div>

      {/* Index decoration */}
      <span
        className="absolute top-4 right-5 text-6xl font-bold font-[var(--font-heading)]
                   text-foreground/[0.03] select-none group-hover:text-foreground/[0.05]
                   transition-colors duration-500 leading-none"
      >
        0{index + 1}
      </span>

      <h4
        className="relative text-lg font-bold font-[var(--font-heading)] mb-3
                   group-hover:text-primary transition-colors duration-300"
      >
        {value.title}
      </h4>
      <p className="relative text-sm text-muted-foreground leading-relaxed">
        {value.description}
      </p>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${value.glow.replace(
            '0.15',
            '0.8'
          )}, transparent)`,
        }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [10, -10])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 lg:py-40 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-1/4 -left-32 w-[600px] h-[600px]
                     bg-primary/5 rounded-full blur-[140px]"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px]
                     bg-accent/5 rounded-full blur-[120px]"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[800px] h-[400px] rounded-full blur-[160px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.04), transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 35, 55, 75].map((top) => (
          <motion.div
            key={top}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${top}%`,
              background:
                'linear-gradient(90deg, transparent 0%, var(--color-border) 20%, var(--color-border) 80%, transparent 100%)',
              opacity: 0.4,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium
                       text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            About Softgoway
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)]
                       mb-6 text-balance leading-tight"
          >
            The team behind your next{' '}
            <GradientText>product release</GradientText>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto
                       text-pretty leading-relaxed"
          >
            We are a product‑focused engineering studio that helps SaaS teams and
            businesses move from idea to stable, scalable software—without trading
            speed for quality.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-6 mb-24">
          {/* Mission */}
          <AnimatedSection direction="left" delay={0.2}>
            <TiltCard glowColor="rgba(139, 92, 246, 0.3)" className="h-full rounded-3xl">
              <div
                className="relative p-8 lg:p-10 rounded-3xl bg-card/80 backdrop-blur-sm
                           border border-border h-full transition-colors duration-500
                           hover:border-primary/30"
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br
                             from-primary/3 to-transparent
                             hover:from-primary/8 transition-all duration-500
                             pointer-events-none"
                />
                <div
                  className="absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl
                             bg-primary/6 hover:bg-primary/12 transition-all duration-700
                             pointer-events-none"
                />

                <div className="absolute top-6 right-8 text-xs font-mono text-primary/40 tracking-widest uppercase select-none">
                  01 / Mission
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent
                               flex items-center justify-center mb-8 shadow-xl shadow-primary/25
                               relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br
                                 from-primary to-accent blur-md opacity-50"
                    />
                    <Target className="relative w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-5">
                    Our mission
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                    To partner with ambitious teams and deliver software that feels
                    fast, reliable, and thoughtfully crafted—turning complex business
                    problems into clear, usable products.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Outcome‑driven', 'Product mindset', 'Execution'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full
                                   bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection direction="right" delay={0.3}>
            <TiltCard glowColor="rgba(168, 85, 247, 0.3)" className="h-full rounded-3xl">
              <div
                className="relative p-8 lg:p-10 rounded-3xl bg-card/80 backdrop-blur-sm
                           border border-border h-full transition-colors duration-500
                           hover:border-accent/30"
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br
                             from-accent/3 to-transparent
                             hover:from-accent/8 transition-all duration-500
                             pointer-events-none"
                />
                <div
                  className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full blur-3xl
                             bg-accent/6 hover:bg-accent/12 transition-all duration-700
                             pointer-events-none"
                />

                <div className="absolute top-6 right-8 text-xs font-mono text-accent/40 tracking-widest uppercase select-none">
                  02 / Vision
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary
                               flex items-center justify-center mb-8 shadow-xl shadow-accent/25
                               relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br
                                 from-accent to-primary blur-md opacity-50"
                    />
                    <Eye className="relative w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-5">
                    Our vision
                  </h3>
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                    To be the go‑to engineering partner for teams that care as much about
                    code quality and scalability as they do about shipping quickly.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Trusted partner', 'Global mindset', 'Long‑term value'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full
                                   bg-accent/10 text-accent border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>
        </div>

        {/* Values section */}
        <AnimatedSection delay={0.2} className="text-center mb-14">
          <p className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-4">
            How we work
          </p>
          <h3 className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)]">
            The principles behind{' '}
            <GradientText>every engagement</GradientText>
          </h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Four pillars that shape our decisions—from architecture and tooling to
            communication and delivery.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

        {/* Recent Posts */}
        <AnimatedSection delay={0.2} className="mt-24 mb-24">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-4">
              Our culture
            </p>
            <h3 className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)]">
              Recent <GradientText>posts</GradientText>
            </h3>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              A glimpse into our team culture, offsites, events, and everyday moments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, idx) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3} className="mt-24">
          <div className="relative p-8 lg:p-12 rounded-3xl overflow-hidden border border-border/60">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-card/80 to-accent/5 backdrop-blur-sm" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'radial-gradient(var(--color-primary) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h4 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-2">
                  Let’s talk about your roadmap.
                </h4>
                <p className="text-muted-foreground">
                  Whether you need a new build or help stabilising an existing product,
                  we can plug in where your team needs us most.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    const lenis = getLenis()
                    if (lenis) {
                      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
                    } else {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent
                             text-primary-foreground font-semibold text-sm
                             shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start a project
                </motion.a>
                <motion.a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault()
                    const lenis = getLenis()
                    if (lenis) {
                      lenis.scrollTo('#portfolio', { offset: -80, duration: 1.2 })
                    } else {
                      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="px-8 py-3 rounded-xl border border-border/80 bg-card/50
                             text-foreground font-semibold text-sm backdrop-blur-sm
                             hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See our work
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
