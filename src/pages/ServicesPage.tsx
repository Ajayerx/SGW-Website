import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { services, categories, Service } from '../data/services';
import { TiltCard } from '../components/TiltCard';
import { GlowButton } from '../components/GlowButton';

export default function ServicesPage({ onSelectService }: { onSelectService: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !selectedCategory || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/8 via-secondary/5 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Our Services
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to accelerate your business. From product development to strategic advisory, we partner with you every step of the way.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search services, technologies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-5 h-5 text-text-secondary" />
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-surface-elevated text-text-secondary hover:bg-surface'
                }`}
              >
                All Services
              </button>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category.value
                      ? 'bg-primary text-white'
                      : 'bg-surface-elevated text-text-secondary hover:bg-surface'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <motion.div key={service.id} variants={itemVariants}>
                    <TiltCard>
                      <div className="p-6 h-full flex flex-col">
                        {/* Icon and Category */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-br ${service.gradient} bg-opacity-10`}
                          >
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                            {service.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-text-secondary mb-4 flex-grow">
                          {service.shortDescription}
                        </p>

                        {/* Features Preview */}
                        <div className="mb-4 pb-4 border-t border-border">
                          <div className="flex flex-wrap gap-1 mt-3">
                            {service.features.slice(0, 3).map((feature) => (
                              <span
                                key={feature}
                                className="text-xs px-2 py-1 bg-primary/8 text-primary rounded"
                              >
                                {feature}
                              </span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="text-xs px-2 py-1 text-text-muted">
                                +{service.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <GlowButton
                          onClick={() => onSelectService(service.id)}
                          className="w-full"
                        >
                          Learn More
                        </GlowButton>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-text-secondary">
                No services found matching your search. Try different keywords or reset filters.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
