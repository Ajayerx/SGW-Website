import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle,
  Loader2,
  Sparkles,
  User,
  Building2,
  MessageSquare,
  Briefcase,
  ArrowUpRight,
  Clock,
  Navigation,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { TiltCard } from '@/components/TiltCard'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@softgoway.com',
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    helper: "Share a brief and we'll respond with next steps.",
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 975 479 4441',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    helper: 'Available for scheduled calls and quick check-ins.',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Annex 1002-A, Omax City-1',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    helper: 'Bypass A.B. Road, Near Shiv Mandir, Indore, MP 452016',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 975 479 4441',
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    helper: "Chat with our team — we're just a message away!",
  },
]

const serviceOptions = [
  { value: 'software', label: 'New product / platform build' },
  { value: 'cloud', label: 'Cloud & DevOps enablement' },
  { value: 'mobile', label: 'Mobile application' },
  { value: 'ai', label: 'AI-powered features' },
  { value: 'stabilise', label: 'Stabilise or scale an existing app' },
  { value: 'consulting', label: 'Architecture or technical advisory' },
]

function FormField({
  id,
  label,
  icon: Icon,
  children,
  focused,
}: {
  id: string
  label: string
  icon: React.ElementType
  children: React.ReactNode
  focused: boolean
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-muted-foreground/80 flex items-center gap-1.5"
      >
        <Icon className="w-3 h-3 opacity-50" />
        {label}
      </label>
      <motion.div
        animate={{
          scale: focused ? 1.015 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function ContactCard({
  item,
  index,
}: {
  item: (typeof contactInfo)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      <TiltCard glowColor={item.glowColor}>
        <div className="group flex items-center gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 hover:border-border transition-all duration-300 cursor-default">
          <motion.div
            className={cn(
              'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10',
              item.gradient
            )}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <item.icon className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-1">
              {item.label}
            </div>
            <div className="font-semibold text-sm truncate">{item.value}</div>
            <div className="text-[12px] text-muted-foreground/60 mt-0.5 leading-snug">
              {item.helper}
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 flex-shrink-0 group-hover:text-muted-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </TiltCard>
    </motion.div>
  )
}

function MapSection() {
  const [isHovered, setIsHovered] = useState(false)
  const mapUrl =
    'https://www.google.com/maps?q=Annex+1002-A+Omax+City-1+Indore+MP+452016&output=embed'
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Annex+1002-A+Omax+City-1+Indore+MP+452016'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-56 rounded-2xl overflow-hidden border border-border/40 cursor-pointer"
      onClick={() => window.open(directionsUrl, '_blank', 'noopener')}
    >
      {/* Google Maps iframe */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'brightness(0.65) contrast(1.1) saturate(0.3) sepia(0.15)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full transition-all duration-500"
        title="Softgoway Indore Office"
      />

      {/* Dark gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {/* Subtle grid overlay for tech feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Hover brightness boost */}
      <div
        className={cn(
          'absolute inset-0 bg-black/10 pointer-events-none transition-opacity duration-500',
          isHovered ? 'opacity-0' : 'opacity-100'
        )}
      />

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/60 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/60 to-transparent" />
      </div>

      {/* Pulsing pin marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] pointer-events-none">
        <motion.div
          className="relative flex flex-col items-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Ping rings */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-primary/40"
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-primary/25"
            animate={{
              scale: [1, 2.8],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.6,
            }}
          />

          {/* Pin dot */}
          <div className="relative w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 border-2 border-white/90" />

          {/* Pin tail */}
          <div className="w-[1.5px] h-4 bg-gradient-to-b from-primary/60 to-transparent mt-0.5" />
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 pointer-events-none">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3 h-3 text-primary/80 flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-widest text-white/50 font-semibold">
                Office
              </span>
            </div>
            <p className="text-[13px] text-white/90 font-medium leading-snug truncate">
              Annex 1002-A, Omax City-1, Indore
            </p>
            <p className="text-[11px] text-white/40 mt-0.5">
              Bypass A.B. Road, Near Shiv Mandir, MP 452016
            </p>
          </div>

          {/* Directions button */}
          <motion.div
            className="pointer-events-auto flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-white text-[12px] font-medium hover:bg-white/15 transition-colors">
              <Navigation className="w-3.5 h-3.5" />
              Directions
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top-right "Open in Maps" hint on hover */}
      <motion.div
        className="absolute top-3 right-3 pointer-events-none"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-white/70 text-[11px] font-medium">
          <ExternalLink className="w-3 h-3" />
          Open in Google Maps
        </div>
      </motion.div>

      {/* Bottom border glow on hover */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] pointer-events-none"
        animate={{
          width: isHovered ? '80%' : '0%',
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
        }}
      />
    </motion.div>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error('Failed to send')
      setIsSubmitted(true)
    } catch {
      alert(
        'Something went wrong. Please email us directly at hello@softgoway.com.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClasses = cn(
    'w-full px-4 py-3.5 pl-11 rounded-xl bg-secondary/40 border border-border/60',
    'focus:border-primary/60 focus:ring-2 focus:ring-primary/15 focus:bg-secondary/60',
    'outline-none transition-all duration-200 text-sm placeholder:text-muted-foreground/40'
  )

  if (isSubmitted) {
    return (
      <section
        ref={sectionRef}
        id="contact"
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ scale: backgroundScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-green-500/5 to-transparent rounded-full"
          />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard glowColor="rgba(34, 197, 94, 0.2)">
              <div className="text-center p-12 lg:p-16 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/60">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold font-[var(--font-heading)] mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Message sent
                </motion.h3>
                <motion.p
                  className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Thanks for reaching out. We aim to respond within one business
                  day with a few time slots for a quick call.
                </motion.p>
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Clock className="w-4 h-4" />
                  Expected reply within 4 hours
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    )
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
          animate={{ y: [-40, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[1200px] h-[1200px] bg-gradient-radial from-primary/4 to-transparent
                     rounded-full"
        />
        <motion.div
          animate={{ y: [-40, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [-40, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px]"
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engineering Consultation"
          title="Let's talk about your next "
          gradientWord="release"
          description="Share a bit about your product, timeline, and challenges. We'll follow up with a short call proposal and a clear next step."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column — Contact Info */}
          <AnimatedSection
            direction="left"
            delay={0.2}
            className="lg:col-span-2"
          >
            <div className="space-y-8 lg:sticky lg:top-32">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] mb-4 tracking-tight">
                  Contact information
                </h3>
                <p className="text-muted-foreground/80 text-[15px] leading-relaxed">
                  Whether you're exploring a new build or need help stabilising
                  an existing product, we're happy to start with a quick,
                  practical conversation.
                </p>
              </div>

              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <ContactCard
                    key={item.label}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <TiltCard
              glowColor="rgba(139, 92, 246, 0.12)"
              tiltAmount={4}
            >
              <form
                onSubmit={handleSubmit}
                className="p-7 lg:p-9 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 space-y-7"
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    id="name"
                    label="Full name"
                    icon={User}
                    focused={focusedField === 'name'}
                  >
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={inputClasses}
                        placeholder="John Doe"
                      />
                    </div>
                  </FormField>

                  <FormField
                    id="email"
                    label="Work email"
                    icon={Mail}
                    focused={focusedField === 'email'}
                  >
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={inputClasses}
                        placeholder="you@company.com"
                      />
                    </div>
                  </FormField>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    id="company"
                    label="Company"
                    icon={Building2}
                    focused={focusedField === 'company'}
                  >
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses}
                        placeholder="Your company"
                      />
                    </div>
                  </FormField>

                  <FormField
                    id="service"
                    label="What are you looking for?"
                    icon={Briefcase}
                    focused={focusedField === 'service'}
                  >
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          inputClasses,
                          'appearance-none cursor-pointer pr-10'
                        )}
                      >
                        <option value="">Select an option</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </FormField>
                </div>

                {/* Row 3 — Message */}
                <FormField
                  id="message"
                  label="Project details"
                  icon={MessageSquare}
                  focused={focusedField === 'message'}
                >
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground/30 pointer-events-none" />
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={cn(inputClasses, 'resize-none pt-3.5')}
                      placeholder="Share context, goals, timelines, and any links that will help us prepare."
                    />
                    <div className="absolute bottom-3 right-3.5 text-[11px] text-muted-foreground/30 tabular-nums">
                      {formState.message.length > 0 && (
                        <span>{formState.message.length} chars</span>
                      )}
                    </div>
                  </div>
                </FormField>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'relative w-full py-4 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2.5',
                    'bg-gradient-to-r from-primary to-accent text-white',
                    'shadow-lg shadow-primary/15 transition-all duration-300 overflow-hidden',
                    isSubmitting
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-xl hover:shadow-primary/25 hover:brightness-110'
                  )}
                  whileHover={!isSubmitting ? { scale: 1.015, y: -1 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                >
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </motion.button>

                <div className="flex items-center justify-center">
                  <p className="text-[11px] text-muted-foreground/40">
                    We'll only use your details to follow up on this enquiry.
                  </p>
                </div>
              </form>
            </TiltCard>

            {/* Map */}
            <div className="mt-8">
              <MapSection />
            </div>
          </motion.div>
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card/40 border border-border/30 text-[13px] text-muted-foreground/70">
            <Sparkles className="w-3.5 h-3.5 text-primary/70" />
            <span>
              Most teams hear back within{' '}
              <span className="text-foreground font-semibold">4 hours</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>No commitment required</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}