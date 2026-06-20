import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Sparkles, Cpu } from 'lucide-react';
import { getServiceById, services, categories } from '../data/services';
import { GlowButton } from '../components/GlowButton';
import { cn } from '@/lib/utils';

const sectionLinks = [
  { id: 'features', label: 'Features' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'technologies', label: 'Technologies' },
  { id: 'cta', label: 'Get Started' },
];

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = id ? getServiceById(id) : undefined;

  const goToContact = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-muted-foreground mb-6">Service not found</p>
          <GlowButton onClick={() => navigate('/services')}>Go Back</GlowButton>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative pt-36 pb-28 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={cn('absolute inset-0 bg-gradient-to-b opacity-[0.07]', service.gradient)} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-14 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Services</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className={cn('p-5 rounded-2xl bg-gradient-to-br shadow-xl shadow-black/20', service.gradient)}>
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                  {categories.find((c) => c.value === service.category)?.label}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-2">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <GlowButton variant="primary" size="lg" onClick={goToContact}>
                Get Started
              </GlowButton>
              <GlowButton variant="secondary" size="lg" onClick={goToContact}>
                Schedule Consultation
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="flex gap-16">
          {/* Sidebar Nav - Desktop */}
          <nav className="hidden lg:block flex-shrink-0 w-48 sticky top-32 self-start">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
              On this page
            </p>
            <ul className="space-y-1">
              {sectionLinks.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 border-l-2 border-transparent hover:border-primary pl-3 -ml-1"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0 space-y-32"
          >
            {/* Features */}
            <motion.section variants={itemVariants} id="features">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  What We Deliver
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Key <span className="gradient-text">Features</span>
                </h2>
                <p className="text-muted-foreground">
                  Everything you need to accelerate your business with {service.title.toLowerCase()}.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-1">
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Benefits */}
            <motion.section variants={itemVariants} id="benefits">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Zap className="w-3.5 h-3.5" />
                  Business Impact
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Business <span className="gradient-text">Benefits</span>
                </h2>
                <p className="text-muted-foreground">
                  Real impact that drives your business forward.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border border-primary/10 hover:from-primary/[0.06] hover:to-accent/[0.06] transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-foreground font-medium">{benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Technologies */}
            <motion.section variants={itemVariants} id="technologies">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Cpu className="w-3.5 h-3.5" />
                  Tech Stack
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Technologies <span className="gradient-text">We Use</span>
                </h2>
                <p className="text-muted-foreground">
                  Modern tools and frameworks we leverage for {service.title.toLowerCase()}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, idx) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="px-5 py-2.5 rounded-xl bg-card/50 border border-border/50 text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section variants={itemVariants} id="cta">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/10 p-12 lg:p-16">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
                <div className="relative z-10 text-center">
                  <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Let's discuss how we can help you achieve your goals with{' '}
                    {service.title.toLowerCase()}. Our team is ready to partner with you.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <GlowButton variant="primary" size="lg" onClick={goToContact}>
                      Schedule a Call
                    </GlowButton>
                    <GlowButton variant="secondary" size="lg" onClick={goToContact}>
                      Learn More
                    </GlowButton>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="border-t border-border/60">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Related <span className="gradient-text">Services</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedServices.map((rel, idx) => {
                const RelIcon = rel.icon;
                return (
                  <motion.button
                    key={rel.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    onClick={() => navigate(`/services/${rel.id}`)}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 text-left"
                  >
                    <div className={cn('p-3 rounded-xl bg-gradient-to-br flex-shrink-0', rel.gradient)}>
                      <RelIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
