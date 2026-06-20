import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import ServicesPage from '@/pages/ServicesPage'
import ServiceDetailPage from '@/pages/ServiceDetailPage'
import HirePage from '@/pages/HirePage'

// Cursor glow effect component
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

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

// Section divider component
function SectionDivider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'service-detail' | 'careers'>('home')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  
  useLenis()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'services') {
        setCurrentPage('services')
        setSelectedServiceId(null)
      } else if (hash.startsWith('service/')) {
        const serviceId = hash.replace('service/', '')
        setSelectedServiceId(serviceId)
        setCurrentPage('service-detail')
      } else if (hash === 'careers') {
        setCurrentPage('careers')
        setSelectedServiceId(null)
      } else {
        setCurrentPage('home')
        setSelectedServiceId(null)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleSelectService = (id: string) => {
    window.location.hash = `service/${id}`
    setSelectedServiceId(id)
    setCurrentPage('service-detail')
  }

  const handleBackToServices = () => {
    window.location.hash = 'services'
    setCurrentPage('services')
    setSelectedServiceId(null)
  }

  const handleBackToHome = () => {
    window.location.hash = ''
    setCurrentPage('home')
    setSelectedServiceId(null)
  }

  const handleNavigateToCareers = () => {
    window.location.hash = 'careers'
    setCurrentPage('careers')
    setSelectedServiceId(null)
  }

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen minDuration={1500} />
      
      {/* Main app container - uses theme-aware background */}
      <div className="min-h-screen bg-background text-foreground relative">
        {/* Mesh gradient background - theme aware */}
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Cursor glow effect */}
        <CursorGlow />
        
        <ScrollProgress />
        <Navbar onNavigateToServices={() => handleBackToServices()} onNavigateToCareers={handleNavigateToCareers} onNavigateHome={handleBackToHome} />
        
        <main className="relative">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
                <SectionDivider />
                <About />
                <SectionDivider />
                <Services />
                <SectionDivider />
                <Process />
                <SectionDivider />
                <Technologies />
                <SectionDivider />
                <Portfolio />
                <SectionDivider />
                <Testimonials />
                <SectionDivider />
                <WorkSection />
                <SectionDivider />
                <Contact />
              </motion.div>
            )}
            {currentPage === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ServicesPage onSelectService={handleSelectService} />
              </motion.div>
            )}
            {currentPage === 'service-detail' && selectedServiceId && (
              <motion.div
                key="service-detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ServiceDetailPage serviceId={selectedServiceId} onBack={handleBackToServices} />
              </motion.div>
            )}
            {currentPage === 'careers' && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <HirePage />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {currentPage === 'home' && <Footer />}
      </div>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
