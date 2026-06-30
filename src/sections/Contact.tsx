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
      className="group relative h-full min-h-[280px] rounded-2xl overflow-hidden border border-border/40 cursor-pointer"
      onClick={() => window.open(directionsUrl, '_blank', 'noopener')}
    >
      {/* Google Maps iframe */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter:
            'brightness(0.5) contrast(1.15) saturate(0.15) sepia(0.2) hue-rotate(200deg)',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full transition-all duration-700"
        title="Softgoway Indore Office"
      />

      {/* Dark theme overlay to unify with background */}
      <div className="absolute inset-0 bg-[hsl(var(--background))]/40 pointer-events-none" />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/95 via-transparent to-[hsl(var(--background))]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))]/50 to-transparent pointer-events-none" />

      {/* Tech grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Subtle scan-line effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* Hover brightness boost */}
      <div
        className={cn(
          'absolute inset-0 bg-[hsl(var(--background))]/20 pointer-events-none transition-opacity duration-500',
          isHovered ? 'opacity-0' : 'opacity-100'
        )}
      />

      {/* Corner accent brackets */}
      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1.5px] bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-primary/40" />
      </div>
      <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[1.5px] bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[1.5px] bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-[1.5px] bg-gradient-to-t from-primary/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-gradient-to-l from-accent/50 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-gradient-to-t from-accent/50 to-transparent" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-accent/40" />
      </div>

      {/* Pulsing pin marker */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div
          className="relative flex flex-col items-center"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-primary/30"
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-primary/15"
            animate={{ scale: [1, 3.2], opacity: [0.25, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.8,
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-accent/10"
            animate={{ scale: [1, 4], opacity: [0.15, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1.6,
            }}
          />

          <div className="absolute -inset-2 rounded-full bg-primary/20 blur-md" />
          <div className="relative w-4 h-4 rounded-full bg-primary shadow-[0_0_16px_rgba(var(--primary),0.6)] border-2 border-white/90 z-10" />
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent mt-0.5" />
        </motion.div>
      </div>

      {/* Coordinate HUD - top left */}
      <div className="absolute top-3.5 left-3.5 pointer-events-none space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-mono font-semibold">
            Live
          </span>
        </div>
        <div className="text-[9px] font-mono text-white/20 leading-relaxed">
          <div>22.7196° N</div>
          <div>75.8577° E</div>
        </div>
      </div>

      {/* "Open in Maps" hint on hover - top right */}
      <motion.div
        className="absolute top-3.5 right-3.5 pointer-events-none"
        initial={{ opacity: 0, y: -4 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -4,
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-white/80 text-[11px] font-medium">
          <ExternalLink className="w-3 h-3" />
          Open in Google Maps
        </div>
      </motion.div>

      {/* Bottom info panel */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="h-20 bg-gradient-to-t from-[hsl(var(--background))]/95 to-transparent" />
        <div className="px-4 pb-4">
          <div className="p-4 rounded-xl bg-card/60 backdrop-blur-xl border border-border/30 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/15 border border-primary/20">
                    <MapPin className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 font-semibold">
                    Softgoway HQ
                  </span>
                </div>
                <p className="text-[13px] text-foreground/90 font-medium leading-snug">
                  Annex 1002-A, Omax City-1
                </p>
                <p className="text-[11px] text-muted-foreground/50 mt-0.5 leading-snug">
                  Bypass A.B. Road, Near Shiv Mandir
                </p>
                <p className="text-[11px] text-muted-foreground/50">
                  Indore, Madhya Pradesh 452016
                </p>
              </div>

              <motion.div
                className="pointer-events-auto flex-shrink-0 mt-5"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[12px] font-semibold hover:bg-primary/15 transition-colors">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/20">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] text-muted-foreground/40 font-medium">
                  Office Open
                </span>
              </div>
              <div className="w-[1px] h-3 bg-border/30" />
              <span className="text-[10px] text-muted-foreground/30 font-mono">
                IST UTC+5:30
              </span>
              <div className="w-[1px] h-3 bg-border/30" />
              <span className="text-[10px] text-muted-foreground/30 font-mono">
                Mon–Sat, 10AM–7PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? 'inset 0 0 0 1px rgba(var(--primary), 0.3), 0 0 30px rgba(var(--primary), 0.08)'
            : 'inset 0 0 0 0px transparent, 0 0 0px transparent',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated gradient bottom line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] pointer-events-none rounded-full"
        animate={{
          width: isHovered ? '60%' : '0%',
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent)',
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

        {/* 
          KEY FIX: Use items-stretch (default) on the grid so the left column 
          stretches to match the right column's height. The left column uses a 
          nested CSS grid with grid-rows: auto 1fr so contact cards take their 
          natural height and the map fills the rest.
        */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
          {/* Left Column — Contact Info + Map (stretches to match form) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 min-h-0"
          >
            <div className="grid grid-rows-[auto_1fr] gap-8 h-full">
              {/* Contact info — takes natural height */}
              <div className="space-y-6">
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

              {/* Map — fills all remaining vertical space */}
              <div className="min-h-[280px]">
                <MapSection />
              </div>
            </div>
          </motion.div>

          {/* Right Column — Form only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <TiltCard glowColor="rgba(139, 92, 246, 0.12)" tiltAmount={4}>
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