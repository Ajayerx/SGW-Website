import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { getServiceById } from '../data/services';
import { GlowButton } from '../components/GlowButton';

export default function ServiceDetailPage({
  serviceId,
  onBack,
}: {
  serviceId: string;
  onBack: () => void;
}) {
  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-text-secondary mb-6">Service not found</p>
          <GlowButton onClick={onBack}>Go Back</GlowButton>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

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
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/8 via-secondary/5 to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Header with Back Button */}
      <div className="relative pt-8 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-12 text-lg font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-8 mb-12"
          >
            {/* Icon */}
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-15`}>
              <IconComponent className="w-16 h-16 text-primary" />
            </div>

            {/* Title and Meta */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-5xl md:text-6xl font-bold text-text-primary">
                  {service.title}
                </h1>
              </div>
              <p className="text-2xl text-text-secondary mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <GlowButton variant="primary">Get Started</GlowButton>
                <GlowButton variant="secondary">Schedule Consultation</GlowButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Features */}
            <motion.div variants={itemVariants}>
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-text-primary mb-8">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-text-secondary">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={itemVariants}>
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-text-primary mb-8">Business Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-text-secondary text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={itemVariants}>
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h2 className="text-3xl font-bold text-text-primary mb-8">Technologies We Use</h2>
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 border border-border">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-text-primary mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve your goals with {service.title.toLowerCase()}.
                  </p>
                  <div className="flex justify-center gap-4">
                    <GlowButton variant="primary" className="px-8 py-3">
                      Schedule a Call
                    </GlowButton>
                    <GlowButton variant="secondary" className="px-8 py-3">
                      Learn More
                    </GlowButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
