import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { services, categories } from '../data/services';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = !searchTerm ||
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              Comprehensive Solutions
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-[1.05]">
              Enterprise-Grade<br />
              <span className="gradient-text">Digital Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              From product engineering to AI-powered experiences, we deliver
              <span className="text-primary font-semibold"> enterprise-grade solutions</span> that accelerate your business transformation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {[{ value: null, label: 'All Services' }, ...categories.map((c) => ({ value: c.value, label: c.label }))].map((cat) => (
                <button
                  key={cat.value ?? 'all'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                    selectedCategory === cat.value
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Rows */}
      <div className="max-w-7xl mx-auto px-4 py-16 pb-32">
        <AnimatePresence mode="wait">
          {filteredServices.length > 0 ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-border/30"
            >
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon;
                const isHovered = hoveredId === service.id;
                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => navigate(`/services/${service.id}`)}
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="w-full group flex items-start gap-6 py-7 text-left transition-all duration-300"
                  >
                    {/* Left Accent Bar */}
                    <div
                      className={cn(
                        'w-[3px] rounded-full mt-2 flex-shrink-0 transition-all duration-500 bg-gradient-to-b',
                        service.gradient,
                        isHovered ? 'h-20 opacity-100' : 'h-14 opacity-40'
                      )}
                    />

                    {/* Icon */}
                    <div
                      className={cn(
                        'p-3.5 rounded-xl flex-shrink-0 transition-all duration-500 bg-gradient-to-br shadow-lg',
                        service.gradient,
                        isHovered ? 'scale-110 shadow-xl shadow-black/30' : 'shadow-black/10'
                      )}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                          {categories.find((c) => c.value === service.category)?.label}
                        </span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">
                          {service.technologies.slice(0, 2).join(', ')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2 max-w-3xl">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mt-2',
                        isHovered
                          ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                          : 'bg-secondary text-muted-foreground border border-border/50'
                      )}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-secondary border border-border/50 flex items-center justify-center">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xl text-muted-foreground font-medium mb-1">No services found</p>
              <p className="text-sm text-muted-foreground">Try different keywords or reset filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
