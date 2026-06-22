import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { GlowButton } from '@/components/GlowButton'
import { ArrowRight, Hospital, GraduationCap, UtensilsCrossed, Users, Briefcase, BarChart3 } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'

interface ProductDemo {
  id: string
  icon: any
  name: string
  description: string
  stats: { label: string; value: string }[]
  screens: { title: string; lines: string[] }[]
  gradient: string
}

const products: ProductDemo[] = [
  {
    id: 'hospital',
    icon: Hospital,
    name: 'Hospital ERP',
    description: 'Patient management, doctor scheduling, billing, pharmacy, lab integration — a complete hospital operating system.',
    stats: [
      { label: 'Modules', value: '14' },
      { label: 'Patients managed', value: '50K+' },
      { label: 'Avg response', value: '< 200ms' },
    ],
    gradient: 'from-blue-600 to-indigo-600',
    screens: [
      {
        title: 'Patient Dashboard',
        lines: [
          'Active patients: 342',
          'New admissions today: 18',
          'Pending discharges: 7',
          'Avg wait time: 12 min',
          'Bed occupancy: 78%',
        ],
      },
      {
        title: 'Doctor Schedule',
        lines: [
          'On duty: 24 physicians',
          'Appointments today: 156',
          'Teleconsultations: 42',
          'Avg consult time: 18 min',
        ],
      },
    ],
  },
  {
    id: 'school',
    icon: GraduationCap,
    name: 'School ERP',
    description: 'Student records, attendance, grade management, timetable, parent portal, and fee tracking.',
    stats: [
      { label: 'Students', value: '10K+' },
      { label: 'Staff', value: '500+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    gradient: 'from-green-600 to-emerald-600',
    screens: [
      {
        title: 'Student Portal',
        lines: [
          'Total enrollment: 10,247',
          'Present today: 9,834 (96%)',
          'Pending assignments: 1,247',
          'Upcoming exams: 3',
          'New admissions this month: 89',
        ],
      },
    ],
  },
  {
    id: 'restaurant',
    icon: UtensilsCrossed,
    name: 'Restaurant ERP',
    description: 'POS, inventory tracking, staff scheduling, supplier management, menu analytics, and online ordering.',
    stats: [
      { label: 'Orders/day', value: '1,200+' },
      { label: 'Locations', value: '15' },
      { label: 'Revenue tracked', value: '$12M+' },
    ],
    gradient: 'from-orange-600 to-red-600',
    screens: [
      {
        title: 'Restaurant Dashboard',
        lines: [
          'Active orders: 23',
          'Avg prep time: 14 min',
          'Tables occupied: 18/32',
          'Inventory alerts: 3',
          'Today revenue: $24,580',
        ],
      },
    ],
  },
  {
    id: 'crm',
    icon: Users,
    name: 'CRM Platform',
    description: 'Pipeline management, contact scoring, activity tracking, email sequences, and team performance analytics.',
    stats: [
      { label: 'Contacts', value: '100K+' },
      { label: 'Deals tracked', value: '$50M+' },
      { label: 'Team size', value: '200+' },
    ],
    gradient: 'from-purple-600 to-pink-600',
    screens: [
      {
        title: 'Sales Pipeline',
        lines: [
          'Qualified leads: 847',
          'Active deals: 124',
          'Pipeline value: $4.2M',
          'Conversion rate: 23%',
          'Avg deal size: $34K',
        ],
      },
    ],
  },
  {
    id: 'hrms',
    icon: Briefcase,
    name: 'HRMS Platform',
    description: 'Employee management, leave tracking, payroll, performance reviews, recruitment pipeline, and compliance.',
    stats: [
      { label: 'Employees', value: '5,000+' },
      { label: 'Departments', value: '24' },
      { label: 'Payroll accuracy', value: '99.97%' },
    ],
    gradient: 'from-cyan-600 to-blue-600',
    screens: [
      {
        title: 'HR Dashboard',
        lines: [
          'Total headcount: 5,247',
          'Open positions: 34',
          'On leave today: 312 (6%)',
          'Pending reviews: 84',
          'New hires this month: 47',
        ],
      },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'SaaS Analytics',
    description: 'Real-time user analytics, MRR tracking, cohort analysis, churn prediction, and growth metrics.',
    stats: [
      { label: 'Events/month', value: '500M+' },
      { label: 'Customers', value: '2,000+' },
      { label: 'Data freshness', value: '< 10s' },
    ],
    gradient: 'from-violet-600 to-purple-600',
    screens: [
      {
        title: 'Growth Dashboard',
        lines: [
          'Monthly revenue: $1.2M',
          'Active users: 84,500',
          'User growth: +12% MoM',
          'Churn rate: 2.1%',
          'LTV/CAC ratio: 5.3×',
        ],
      },
    ],
  },
]

export function ProductsWeBuild() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Products We Build"
          title="Experience the "
          gradientWord="software"
          description="Interactive previews of platforms we deliver — click any product to see what we can build for you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {products.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => {
                setActiveProduct(activeProduct === product.id ? null : product.id)
                setActiveScreen(0)
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`group relative p-5 rounded-xl border text-left transition-all duration-300 ${
                activeProduct === product.id
                  ? 'border-primary/40 bg-card/80 shadow-lg shadow-primary/5'
                  : 'border-border/40 bg-card/30 hover:border-border/70'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-3`}>
                <product.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-base font-semibold text-foreground mb-1">{product.name}</div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Active product preview */}
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden"
          >
            {(() => {
              const p = products.find((pr) => pr.id === activeProduct)!
              return (
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                        <p.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{p.name}</div>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    </div>
                    <GlowButton variant="primary" size="sm" onClick={scrollToContact}>
                      Build yours
                      <ArrowRight className="w-4 h-4" />
                    </GlowButton>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Mini dashboard preview */}
                    <div className="rounded-xl border border-border/30 bg-card/60 p-4">
                      <div className="flex items-center gap-1.5 mb-4">
                        {['red', 'yellow', 'green'].map((color) => (
                          <div key={color} className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} />
                        ))}
                        <div className="text-xs text-muted-foreground ml-2">
                          {p.screens[activeScreen]?.title || 'Dashboard'}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {p.screens[activeScreen]?.lines.map((line, i) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            <span className="text-foreground">{line}</span>
                          </motion.div>
                        ))}
                      </div>
                      {p.screens.length > 1 && (
                        <div className="flex gap-2 mt-4">
                          {p.screens.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveScreen(i)}
                              className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                                i === activeScreen
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {p.screens[i].title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stats panel */}
                    <div className="rounded-xl border border-border/30 bg-card/60 p-4">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                        Performance Metrics
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {p.stats.map((stat) => (
                          <div key={stat.label} className="p-3 rounded-lg bg-card/40 border border-border/20">
                            <div className={`text-lg font-bold font-[var(--font-heading)] bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent`}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </div>
    </section>
  )
}
