import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/AnimatedSection'
import { TiltCard } from '@/components/TiltCard'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@softgoway.com',
    gradient: 'from-blue-500 to-cyan-500',
    helper: 'Share a brief and we’ll respond with next steps.',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    gradient: 'from-green-500 to-emerald-500',
    helper: 'Available for scheduled calls and quick check‑ins.',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Tech Park, Innovation District',
    gradient: 'from-purple-500 to-pink-500',
    helper: 'Remote‑first, collaborating with teams worldwide.',
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.contact-bg-blob', {
        y: -40,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ scale: backgroundScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[1200px] h-[1200px] bg-gradient-radial from-primary/5 to-transparent
                     rounded-full contact-bg-blob"
        />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] contact-bg-blob" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] contact-bg-blob" />
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
              Get in touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              Let’s talk about your next{' '}
              <span className="gradient-text">release</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              Share a bit about your product, timeline, and challenges. We’ll
              follow up with a short call proposal and a clear next step—no
              spam, no generic pitches.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-6">
                  Contact information
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you’re exploring a new build or need help stabilising
                  an existing product, we’re happy to start with a quick,
                  practical conversation.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <TiltCard
                      glowColor={
                        item.gradient.includes('blue')
                          ? 'rgba(59, 130, 246, 0.3)'
                          : item.gradient.includes('green')
                            ? 'rgba(34, 197, 94, 0.3)'
                            : 'rgba(168, 85, 247, 0.3)'
                      }
                    >
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all">
                        <motion.div
                          className={cn(
                            'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg',
                            item.gradient
                          )}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {item.label}
                          </div>
                          <div className="font-semibold">{item.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.helper}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative h-56 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-sm border border-border"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-8 h-8 text-white" />
                    </motion.div>
                    <span className="text-muted-foreground font-medium">
                      View office location
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={0.3}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center"
              >
                <TiltCard glowColor="rgba(34, 197, 94, 0.3)">
                  <div className="text-center p-12 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-4">
                      Message sent
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Thanks for reaching out. We aim to respond within one
                      business day with a few time slots for a quick call.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ) : (
              <TiltCard glowColor="rgba(139, 92, 246, 0.2)" tiltAmount={5}>
                  <form
                    onSubmit={handleSubmit}
                    className="p-8 lg:p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border space-y-6"
                  >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                          Full name
                      </label>
                      <motion.div
                        animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                          Work email
                      </label>
                      <motion.div
                        animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="you@company.com"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <motion.div
                        animate={{ scale: focusedField === 'company' ? 1.02 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Your company"
                        />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium">
                          What are you looking for?
                      </label>
                      <motion.div
                        animate={{ scale: focusedField === 'service' ? 1.02 : 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <select
                          id="service"
                          name="service"
                          value={formState.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('service')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                            <option value="">Select an option</option>
                            <option value="software">New product / platform build</option>
                            <option value="cloud">Cloud & DevOps enablement</option>
                            <option value="mobile">Mobile application</option>
                            <option value="ai">AI‑powered features</option>
                            <option value="stabilise">Stabilise or scale an existing app</option>
                            <option value="consulting">
                              Architecture or technical advisory
                            </option>
                        </select>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                        Project details
                    </label>
                    <motion.div
                      animate={{ scale: focusedField === 'message' ? 1.01 : 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder="Share context, goals, timelines, and any links that will help us prepare."
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent text-white transition-all shadow-lg shadow-primary/20',
                      isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-xl hover:shadow-primary/30'
                    )}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                          Sending…
                      </>
                    ) : (
                      <>
                            Send message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                    <p className="text-xs text-muted-foreground text-center">
                      We’ll only use your details to follow up on this enquiry.
                    </p>
                </form>
              </TiltCard>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}