import { useEffect, useState } from 'react'
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
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import ServicesPage from '@/pages/ServicesPage'
import ServiceDetailPage from '@/pages/ServiceDetailPage'

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
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'service-detail'>('home')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  
  useLenis()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle hash routing
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === 'services') {
      setCurrentPage('services')
      setSelectedServiceId(null)
    } else if (hash.startsWith('service/')) {
      const serviceId = hash.replace('service/', '')
      setSelectedServiceId(serviceId)
      setCurrentPage('service-detail')
    } else {
      setCurrentPage('home')
      setSelectedServiceId(null)
    }
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
        <Navbar onNavigateToServices={() => handleBackToServices()} />
        
        <main className="relative">
          {currentPage === 'home' && (
            <>
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
              <Contact />
            </>
          )}
          {currentPage === 'services' && (
            <ServicesPage onSelectService={handleSelectService} />
          )}
          {currentPage === 'service-detail' && selectedServiceId && (
            <ServiceDetailPage serviceId={selectedServiceId} onBack={handleBackToServices} />
          )}
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
