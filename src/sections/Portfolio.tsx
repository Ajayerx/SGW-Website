import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/AnimatedSection'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'FinTech Dashboard',
    description: 'Real-time financial analytics platform with advanced data visualization and AI-powered insights.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Healthcare Platform',
    description: 'HIPAA-compliant telehealth solution connecting patients with healthcare providers globally.',
    tags: ['Next.js', 'GraphQL', 'MongoDB', 'WebRTC'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'E-commerce Suite',
    description: 'Scalable multi-vendor marketplace with real-time inventory and intelligent recommendations.',
    tags: ['Vue.js', 'Python', 'Redis', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'AI Content Studio',
    description: 'Machine learning-powered content creation platform for marketing teams and agencies.',
    tags: ['React', 'Python', 'TensorFlow', 'GCP'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Logistics Hub',
    description: 'End-to-end supply chain management system with real-time tracking and route optimization.',
    tags: ['Angular', 'Go', 'PostgreSQL', 'Azure'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'EdTech Platform',
    description: 'Interactive learning management system with adaptive curriculum and progress analytics.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop',
    gradient: 'from-indigo-500 to-purple-500',
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      className="flex-none w-[350px] lg:w-[420px] snap-center"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="group relative h-full rounded-3xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className={cn('absolute inset-0 bg-gradient-to-t', project.gradient, 'opacity-50')} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Overlay buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm"
            >
              <Github className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className={cn(
              'absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r backdrop-blur-sm',
              project.gradient
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Featured Project
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold font-[var(--font-heading)] mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base mb-6 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-muted-foreground border border-border/50"
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Glow effect */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl',
            'bg-gradient-to-r',
            project.gradient
          )}
          style={{ filter: 'blur(40px)', transform: 'translateY(20px)', opacity: isHovered ? 0.2 : 0 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition()
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll trigger for parallax effect
      gsap.to('.portfolio-bg', {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: backgroundX }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-full blur-[150px] portfolio-bg"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
            >
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            >
              Explore our portfolio of successful projects that have helped businesses
              transform their operations and achieve remarkable growth.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mb-6">
          <motion.button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              'p-3 rounded-full border transition-all duration-300',
              canScrollLeft
                ? 'border-border hover:border-primary hover:bg-primary/10 text-foreground'
                : 'border-border/50 text-muted-foreground/50 cursor-not-allowed'
            )}
            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'p-3 rounded-full border transition-all duration-300',
              canScrollRight
                ? 'border-border hover:border-primary hover:bg-primary/10 text-foreground'
                : 'border-border/50 text-muted-foreground/50 cursor-not-allowed'
            )}
            whileHover={canScrollRight ? { scale: 1.05 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Scroll indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-border"
              whileHover={{ scale: 1.5, backgroundColor: 'var(--color-primary)' }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
