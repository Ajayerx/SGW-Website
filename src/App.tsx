import { useEffect } from 'react'
import { ThemeProvider } from '@/hooks/useTheme'
import { useLenis } from '@/hooks/useLenis'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Services } from '@/sections/Services'
import { Process } from '@/sections/Process'
import { Technologies } from '@/sections/Technologies'
import { Portfolio } from '@/sections/Portfolio'
import { Testimonials } from '@/sections/Testimonials'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'

function AppContent() {
  useLenis()

  useEffect(() => {
    // Set initial theme class
    const theme = localStorage.getItem('theme') || 'system'
    const root = document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const resolvedTheme = theme === 'system' ? systemTheme : theme
    root.classList.add(resolvedTheme)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Technologies />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
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
