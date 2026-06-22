import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUp,
  Heart,
  ArrowRight,
  Mail,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLenis } from '@/hooks/useLenis'
import { useTheme } from '@/hooks/useTheme'
import { GlowButton } from '@/components/GlowButton'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { name: 'Product & Platform Eng.', href: '#services' },
      { name: 'Modern Web Apps', href: '#services' },
      { name: 'Mobile App Development', href: '#services' },
      { name: 'Cloud & DevOps', href: '#services' },
      { name: 'Architecture & Advisory', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'How We Work', href: '#process' },
      { name: 'Our Work', href: '#work' },
      { name: 'Tech Stack', href: '#technology' },
      { name: 'Contact Us', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Case Studies', href: '#work' },
      { name: 'Industries', href: '#industries' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#' },
      { name: 'Status', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter', gradient: 'from-sky-500 to-blue-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800' },
  { icon: Github, href: '#', label: 'GitHub', gradient: 'from-slate-700 to-slate-900' },
  { icon: Instagram, href: '#', label: 'Instagram', gradient: 'from-pink-500 to-purple-600' },
]

function AnimatedGlowLine() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })
  const { resolvedTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const goToContact = () => {
    if (location.pathname === '/') {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
      else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: 'contact' } })
    }
  }

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToSection = (href: string) => {
    if (!href.startsWith('#')) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.2 })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-background border-t border-border/40 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/[0.03] via-accent/[0.03] to-primary/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative">
        {/* ─── Top CTA Strip ─── */}
        <div className="relative">
          <AnimatedGlowLine />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/[0.07] via-accent/[0.04] to-primary/[0.07] border border-primary/10 p-8 lg:p-12"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    Ready to build something{' '}
                    <span className="gradient-text">great?</span>
                  </h3>
                  <p className="text-muted-foreground max-w-lg">
                    Let's talk about your project. No commitment, just honest engineering advice.
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <GlowButton variant="primary" size="lg" onClick={goToContact}>
                    Start a Project
                  </GlowButton>
                  <GlowButton variant="secondary" size="lg" onClick={goToContact}>
                    Contact Us
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          </div>
          <AnimatedGlowLine />
        </div>

        {/* ─── Main Footer Content ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
            {/* Brand Column — spans 4 cols */}
            <motion.div
              className="lg:col-span-4 lg:pr-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={resolvedTheme === 'dark' ? '/logo_dark.png' : '/logo_light.png'}
                  alt="Softgoway"
                  className="h-12 w-auto"
                />
              </motion.button>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xs mb-6">
                A product-focused engineering studio helping teams design, build, and
                scale the software that runs their business.
              </p>

              {/* Social links */}
              <div className="flex gap-3 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                    className={cn(
                      'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center',
                      'shadow-lg shadow-black/10 dark:shadow-black/30',
                      'transition-all duration-300 hover:shadow-xl hover:shadow-black/20',
                      social.gradient
                    )}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-4 h-4 text-white" />
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Stay updated
                </p>
                <div className="flex gap-2 max-w-xs">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-background/50 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <motion.button
                    className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Divider line on lg — vertical */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40" />
            </div>

            {/* Link Columns — 3 cols, left-aligned together */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6 lg:pl-6">
              {footerLinks.map((section, sectionIndex) => (
                <motion.nav
                  key={section.title}
                  aria-label={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
                  className="min-w-0"
                >
                  <h4 className="text-[11px] font-bold text-foreground tracking-[0.12em] uppercase mb-5">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.3 + linkIndex * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => scrollToSection(link.href)}
                          className="text-[13.5px] leading-snug text-muted-foreground/75 hover:text-foreground transition-colors duration-200 relative group text-left w-full"
                        >
                          {link.name}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              ))}
            </div>
          </div>

          {/* ─── Bottom Bar ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
              {`© ${new Date().getFullYear()} Softgoway Technologies Pvt. Ltd. Built with`}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              </motion.span>
              in India
            </p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </button>
              <button
                type="button"
                className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 relative group"
              >
                Terms of Service
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </button>
              <div className="w-px h-4 bg-border/40" />
              <motion.button
                type="button"
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}