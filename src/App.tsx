import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider, useTheme } from '@/hooks/useTheme'
import { useLenis } from '@/hooks/useLenis'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Services } from '@/sections/Services'
import { Process } from '@/sections/Process'
import { Technologies } from '@/sections/Technologies'
import { Portfolio } from '@/sections/Portfolio'
import { Testimonials } from '@/sections/Testimonials'
import { WorkSection } from '@/sections/Worksection'
import { EngineeringExcellence } from '@/sections/EngineeringExcellence'
import { AILab } from '@/sections/AILab'
import { ClientLogos } from '@/sections/ClientLogos'
import { EngagementModels } from '@/sections/EngagementModels'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import ServicesPage from '@/pages/ServicesPage'
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
      requestAnimationFrame(() => {
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 })
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      })
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
      <Hero />
      <ClientLogos />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Technologies />
      <SectionDivider />
      <EngineeringExcellence />
      <SectionDivider />
      <AILab />
      <SectionDivider />
      <Portfolio />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <WorkSection />
      <SectionDivider />
      <EngagementModels />
      <SectionDivider />
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
              <Route
                path="/services"
                element={
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ServicesPage />
                  </motion.div>
                }
              />
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
