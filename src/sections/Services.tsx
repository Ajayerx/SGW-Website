import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Code2, Brain, ShoppingCart, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { services } from '@/data/services'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from '@/components/AnimatedSection'

const serviceCategories = [
  {
    id: 'product-engineering',
    label: 'Product Engineering',
    icon: Code2,
    gradient: 'from-blue-500 to-indigo-600',
    filter: (s: typeof services[number]) => s.category === 'development',
  },
  {
    id: 'ai-automation',
    label: 'AI & Automation',
    icon: Brain,
    gradient: 'from-violet-500 to-purple-600',
    filter: (s: typeof services[number]) => s.category === 'emerging',
  },
  {
    id: 'enterprise',
    label: 'Enterprise Solutions',
    icon: Building2,
    gradient: 'from-emerald-500 to-teal-600',
    filter: (s: typeof services[number]) => s.category === 'infrastructure' || s.category === 'advisory' || s.category === 'data',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id)

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`)
  }

  const activeCategoryData = serviceCategories.find(c => c.id === activeCategory)!
  const filteredServices = services.filter(activeCategoryData.filter).slice(0, 6)

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-30, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div ref={headerRef}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
            >
              Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
            >
              A senior engineering team,{' '}
              <span className="gradient-text">on your side</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            >
              We cover the full stack—from product-ready frontends to cloud, data, and
              AI—so you do not have to juggle multiple vendors for one product.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                    : 'bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30'
                )}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            )
          })}
        </div>

        {/* Service Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.08}
        >
          {filteredServices.map((service) => {
            const IconComponent = service.icon
            return (
              <StaggerItem key={service.id} className="h-full">
                <motion.button
                  onClick={() => handleServiceClick(service.id)}
                  className={cn(
                    'group relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden text-left',
                    'bg-gradient-to-br shadow-lg shadow-black/20',
                    service.gradient
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-base font-bold font-[var(--font-heading)] text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-white/60 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
                </motion.button>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
