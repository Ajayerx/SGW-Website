import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { getLenis } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'
import { MagneticWrap } from '@/components/GlowButton'

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar({ onNavigateToServices, onNavigateToCareers, onNavigateHome }: { onNavigateToServices?: () => void; onNavigateToCareers?: () => void; onNavigateHome?: () => void } = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { resolvedTheme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const navHeight = document.querySelector('nav')?.offsetHeight ?? 80
      const sections = navLinks.map(link => link.href.slice(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= navHeight + 20) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, {
        offset: -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleServicesClick = () => {
    if (window.location.hash === '#services') {
      scrollToSection('#services')
    } else {
      window.location.hash = 'services'
      onNavigateToServices?.()
    }
    setIsMobileMenuOpen(false)
  }

  const handleCareersClick = () => {
    window.location.hash = 'careers'
    onNavigateToCareers?.()
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform',
          isScrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                const hash = window.location.hash.slice(1)
                if (hash && hash !== 'hero') {
                  onNavigateHome?.()
                } else {
                  scrollToSection('#hero')
                }
              }}
              className="flex items-center gap-2 relative z-10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={resolvedTheme === 'dark' ? '/logo_dark.png' : '/logo_light.png'}
                alt="Softgoway"
                className="h-9 lg:h-10 w-auto"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                const isServices = link.name === 'Services'
                return (
                  <motion.button
                    key={link.name}
                    onClick={() => {
                      if (isServices) {
                        handleServicesClick()
                      } else {
                        scrollToSection(link.href)
                      }
                    }}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground/80 hover:text-foreground'
                    )}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {link.name}
                    {/* Active indicator - bottom underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Hover background */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-lg transition-opacity duration-200 -z-10',
                        isActive
                          ? 'bg-primary/5'
                          : 'bg-transparent hover:bg-secondary/50'
                      )}
                    />
                  </motion.button>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <MagneticWrap strength={0.3}>
                <motion.button
                  onClick={toggleTheme}
                  className="relative p-2.5 rounded-xl border border-border/40 hover:border-primary/30 transition-all group overflow-hidden bg-background/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={false}
                    animate={{ rotate: resolvedTheme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="relative"
                  >
                    {resolvedTheme === 'dark' ? (
                      <Sun className="w-4.5 h-4.5 text-yellow-400" />
                    ) : (
                      <Moon className="w-4.5 h-4.5 text-primary" />
                    )}
                  </motion.div>
                </motion.button>
              </MagneticWrap>

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Get Started
              </motion.a>

              <motion.button
                onClick={handleCareersClick}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/50 border border-border/60 text-foreground rounded-xl font-medium text-sm hover:bg-secondary transition-all duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Hire
              </motion.button>

              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm hover:bg-secondary transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-md z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border/60 z-50 lg:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/40">
                <span className="text-lg font-bold font-[var(--font-heading)] gradient-text">
                  Menu
                </span>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1)
                  const isServices = link.name === 'Services'
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => {
                        if (isServices) {
                          handleServicesClick()
                        } else {
                          scrollToSection(link.href)
                        }
                      }}
                      className={cn(
                        'w-full text-left px-4 py-3.5 rounded-xl font-medium transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                        )}
                        <span className={cn(!isActive && 'ml-4')}>{link.name}</span>
                        {isActive && (
                          <div className="ml-auto flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/40 bg-card/80 backdrop-blur-sm space-y-2">
                <motion.button
                  onClick={handleCareersClick}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                  className="block w-full px-4 py-3.5 border border-border/60 text-foreground rounded-xl font-medium text-center hover:bg-secondary transition-all"
                >
                  Hire
                </motion.button>
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="block w-full px-4 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium text-center shadow-lg shadow-primary/25"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
