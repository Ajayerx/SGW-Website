import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures Inc.',
    content:
      'Softgoway helped us consolidate fragmented tools into a single platform our teams actually enjoy using. Within one quarter, our ops team was closing 40% more work with the same headcount.',
    avatar: 'SJ',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateLabs',
    content:
      'We needed a partner who could move quickly without sacrificing code quality. Softgoway shipped a scalable architecture that comfortably serves millions of requests per day and is still easy to extend.',
    avatar: 'MC',
    rating: 5,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director of IT, GlobalCorp',
    content:
      'Our legacy stack was holding us back. Softgoway led a phased cloud migration that reduced our infrastructure spend and cut deployment times from hours to minutes.',
    avatar: 'ER',
    rating: 5,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'David Park',
    role: 'Founder, NextGen Solutions',
    content:
      'From early prototypes to launch, the team felt like an extension of our own. The AI‑powered features we shipped together have become a key differentiator in our sales conversations.',
    avatar: 'DP',
    rating: 5,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Lisa Thompson',
    role: 'VP Engineering, DataDriven Co.',
    content:
      'Softgoway’s data engineering work gave us a trustworthy analytics layer. Product, sales, and leadership are finally looking at the same numbers when making decisions.',
    avatar: 'LT',
    rating: 5,
    gradient: 'from-indigo-500 to-purple-500',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [autoplay])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.testimonials-bg-blob', {
        y: -30,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleManualChange = (nextIndex: number) => {
    if (nextIndex === current) return
    setAutoplay(false)
    setDirection(nextIndex > current ? 1 : -1)
    setCurrent((nextIndex + testimonials.length) % testimonials.length)
  }

  const next = () => handleManualChange(current + 1)
  const prev = () => handleManualChange(current - 1)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] testimonials-bg-blob"
        />
        <motion.div
          style={{ y: backgroundY }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] testimonials-bg-blob"
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
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              What our clients <span className="gradient-text">say</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              A few words from founders and engineering leaders we’ve partnered
              with on complex, high‑stakes projects.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] sm:h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <article className="relative h-full glass rounded-3xl p-8 lg:p-12 border border-border/50">
                  {/* Quote icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className={`absolute -top-5 left-8 lg:left-12 w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[current].gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Quote className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 pt-4">
                    {Array.from({ length: testimonials[current].rating }).map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.08 * i }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      )
                    )}
                  </div>

                  <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                    &ldquo;{testimonials[current].content}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[current].gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {testimonials[current].avatar}
                    </motion.div>
                    <div>
                      <div className="font-semibold font-[var(--font-heading)] text-lg">
                        {testimonials[current].name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </div>
                </article>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              type="button"
              onClick={prev}
              className="p-4 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleManualChange(index)}
                  className={`relative h-3 rounded-full transition-all duration-300 ${index === current
                    ? 'w-10 bg-gradient-to-r from-primary to-accent'
                    : 'w-3 bg-border hover:bg-muted-foreground'
                    }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={next}
              className="p-4 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}