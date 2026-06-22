import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from '@/hooks/useTheme'
import { useLenis } from '@/hooks/useLenis'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Hero } from '@/sections/Hero'
import { ClientLogos } from '@/sections/ClientLogos'
import { Industries } from '@/sections/Industries'
import { Services } from '@/sections/Services'
import { AILab } from '@/sections/AILab'
import { ProductsWeBuild } from '@/sections/ProductsWeBuild'
import { Portfolio } from '@/sections/Portfolio'
import { WhyCTOs } from '@/sections/WhyCTOs'
import { EngineeringExcellence } from '@/sections/EngineeringExcellence'
import { Process } from '@/sections/Process'
import { EngineeringEcosystem } from '@/sections/EngineeringEcosystem'
import { Team } from '@/sections/Team'
import { Testimonials } from '@/sections/Testimonials'
import { About } from '@/sections/About'
import { EngagementModels } from '@/sections/EngagementModels'
import { FAQ } from '@/sections/FAQ'
import { WhatWeBuildNext } from '@/sections/WhatWeBuildNext'
import { Careers } from '@/sections/Careers'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import ServiceDetailPage from '@/pages/ServiceDetailPage'
import HirePage from '@/pages/HirePage'
import { getLenis } from '@/hooks/useLenis'

function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }
    const handleMouseLeave = () => setIsVisible(false)
    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null
  const glowOpacity = resolvedTheme === 'dark' ? 0.08 : 0.04

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, ${glowOpacity}), transparent 40%)`,
      }}
    />
  )
}

function SectionDivider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo as string
      setTimeout(() => {
        const lenis = getLenis()
        if (lenis) {
          const section = document.querySelector(`#${id}`)
          if (section) {
            const navbarHeight = document.querySelector('nav')?.offsetHeight ?? 80
            if (id === 'hero') {
              lenis.scrollTo(`#${id}`, { offset: -navbarHeight, duration: 1.2 })
            } else {
              const heading = section.querySelector('[class*="inline-flex"], [class*="inline-block"], h2')
              if (heading) {
                const sectionRect = section.getBoundingClientRect()
                const headingRect = heading.getBoundingClientRect()
                const headingOffset = headingRect.top - sectionRect.top
                lenis.scrollTo(`#${id}`, {
                  offset: headingOffset - navbarHeight - 4,
                  duration: 1.2,
                })
              } else {
                lenis.scrollTo(`#${id}`, { offset: -navbarHeight, duration: 1.2 })
              }
            }
          }
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.state])

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <Hero />

      {/* Trust & Metrics */}
      <ClientLogos />

      <SectionDivider />

      {/* Industries */}
      <Industries />

      <SectionDivider />

      {/* Services */}
      <Services />

      <SectionDivider />

      {/* AI & Automation Lab */}
      <AILab />

      <SectionDivider />

      {/* Products We Build */}
      <ProductsWeBuild />

      <SectionDivider />

      {/* Featured Work */}
      <Portfolio />

      <SectionDivider />

      {/* Why Companies Choose Softgoway */}
      <WhyCTOs />

      <SectionDivider />

      {/* Engineering Foundations */}
      <EngineeringExcellence />

      <SectionDivider />

      {/* Process */}
      <Process />

      <SectionDivider />

      {/* Technology Stack */}
      <EngineeringEcosystem />

      <SectionDivider />

      {/* Team */}
      <Team />

      <SectionDivider />

      {/* Testimonials */}
      <Testimonials />

      <SectionDivider />

      {/* About Softgoway */}
      <About />

      <SectionDivider />

      {/* Engagement Models */}
      <EngagementModels />

      <SectionDivider />

      {/* FAQ */}
      <FAQ />

      <SectionDivider />

      {/* Future Innovation */}
      <WhatWeBuildNext />

      <SectionDivider />

      {/* Careers */}
      <Careers />

      <SectionDivider />

      {/* Contact CTA */}
      <Contact />
    </motion.div>
  )
}

function AppLayout() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { resolvedTheme } = useTheme()
  const location = useLocation()

  useLenis()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <LoadingScreen minDuration={1500} />
      <div className="min-h-screen bg-background text-foreground relative">
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <div className="noise-overlay" aria-hidden="true" />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<Navigate to="/" state={{ scrollTo: 'services' }} replace />} />
              <Route
                path="/services/:id"
                element={
                  <motion.div
                    key="service-detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ServiceDetailPage />
                  </motion.div>
                }
              />
              <Route
                path="/careers"
                element={
                  <motion.div
                    key="careers"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <HirePage />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
