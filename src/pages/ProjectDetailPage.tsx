import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Cpu, Clock, Users, BarChart3, Quote, Building2, Globe, CalendarDays, Link as LinkIcon, Shield } from 'lucide-react';
import { getProjectById, getRelatedProjects, projects } from '../data/projects';
import { GlowButton } from '../components/GlowButton';
import { cn } from '@/lib/utils';

const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'features', label: 'Features' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'results', label: 'Results' },
  { id: 'testimonial', label: 'Testimonial' },
];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const goToContact = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-muted-foreground mb-6">Project not found</p>
          <GlowButton onClick={() => navigate('/')}>Go Home</GlowButton>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project.relatedProjects);

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

  const overviewFields = [
    { label: 'Client', value: project.overview.client, icon: Building2 },
    { label: 'Industry', value: project.overview.industry, icon: Globe },
    { label: 'Duration', value: project.overview.duration, icon: Clock },
    { label: 'Team Size', value: project.overview.teamSize, icon: Users },
    { label: 'Platform', value: project.overview.platform, icon: Cpu },
    { label: 'Engagement', value: project.overview.engagement, icon: LinkIcon },
    { label: 'Status', value: project.overview.status, icon: Shield },
    { label: 'Year', value: String(project.year), icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative pt-36 pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent opacity-[0.07]" />
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
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-14 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-6">
              <div>
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                  {project.category}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mt-2">
                  {project.name}
                </h1>
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {project.tagline}
            </p>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {project.heroStats.map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="flex gap-16">
          {/* Sidebar Nav - Desktop */}
          <nav className="hidden lg:block flex-shrink-0 w-48 sticky top-32 self-start pt-6">
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
            {/* Overview */}
            <motion.section variants={itemVariants} id="overview">
              <div className="mb-10 pt-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Project Overview
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  About <span className="gradient-text">the Project</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.overview.description}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {overviewFields.map((field, idx) => {
                  const FieldIcon = field.icon;
                  return (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <FieldIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                        <p className="text-sm font-semibold text-foreground">{field.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Problem */}
            <motion.section variants={itemVariants} id="problem">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Zap className="w-3.5 h-3.5" />
                  {project.problem.title}
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  The <span className="gradient-text">Challenge</span>
                </h2>
                <p className="text-muted-foreground">
                  Understanding the core issues that needed solving.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.problem.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                        <ItemIcon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section variants={itemVariants} id="solution">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {project.solution.title}
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Our <span className="gradient-text">Approach</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {project.solution.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.solution.highlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border border-primary/10"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <p className="text-foreground text-sm">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Features */}
            <motion.section variants={itemVariants} id="features">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Cpu className="w-3.5 h-3.5" />
                  Key Features
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  What We <span className="gradient-text">Built</span>
                </h2>
                <p className="text-muted-foreground">
                  Core capabilities delivered as part of the solution.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature, idx) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={cn('p-3 rounded-xl bg-gradient-to-br shadow-lg flex-shrink-0', feature.gradient)}>
                          <FeatureIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/40">
                        {feature.benefits.map((benefit) => (
                          <span key={benefit} className="inline-flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section variants={itemVariants} id="tech-stack">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Cpu className="w-3.5 h-3.5" />
                  Technology Stack
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Technologies <span className="gradient-text">Used</span>
                </h2>
                <p className="text-muted-foreground">
                  Modern tools and frameworks powering this solution.
                </p>
              </div>
              <div className="space-y-6">
                {project.techStack.map((stack) => (
                  <div key={stack.category}>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {stack.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((tech, idx) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.03 }}
                          className="px-4 py-2 rounded-xl bg-card/50 border border-border/50 text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Architecture */}
            <motion.section variants={itemVariants} id="architecture">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Architecture
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  System <span className="gradient-text">Architecture</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {project.architecture.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.architecture.highlights.map((highlight, idx) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <p className="text-sm text-foreground">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Timeline */}
            <motion.section variants={itemVariants} id="timeline">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <Clock className="w-3.5 h-3.5" />
                  Project Timeline
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  How We <span className="gradient-text">Delivered</span>
                </h2>
                <p className="text-muted-foreground">
                  The journey from discovery to deployment.
                </p>
              </div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
                <div className="space-y-8">
                  {project.timeline.map((phase, idx) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="relative pl-16"
                    >
                      {/* Dot */}
                      <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background shadow-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-bold text-foreground">{phase.phase}</h4>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                            {phase.duration}
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {phase.tasks.map((task) => (
                            <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Results */}
            <motion.section variants={itemVariants} id="results">
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4 border border-primary/20">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Results
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  Measurable <span className="gradient-text">Impact</span>
                </h2>
                <p className="text-muted-foreground">
                  Key metrics and outcomes from the project.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.results.map((result, idx) => (
                  <motion.div
                    key={result.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border border-primary/10 text-center hover:from-primary/[0.06] hover:to-accent/[0.06] transition-all duration-500"
                  >
                    <p className="text-4xl font-bold gradient-text mb-1">
                      {result.prefix}{result.value}{result.suffix}
                    </p>
                    <p className="text-sm font-semibold text-foreground mb-1">{result.label}</p>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Testimonial */}
            <motion.section variants={itemVariants} id="testimonial">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/10 p-10 lg:p-14">
                <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
                <div className="relative z-10">
                  <Quote className="w-10 h-10 text-primary/40 mb-4" />
                  <blockquote className="text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    {project.testimonial.avatar && (
                      <img
                        src={project.testimonial.avatar}
                        alt={project.testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{project.testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.testimonial.role}, {project.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section variants={itemVariants}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/10 p-12 lg:p-16">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
                <div className="relative z-10 text-center">
                  <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Build Something Great Together
                  </h3>
                  <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Have a similar project in mind? Let's discuss how we can help you achieve your goals.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <GlowButton variant="primary" size="lg" onClick={goToContact}>
                      Start a Conversation
                    </GlowButton>
                    <GlowButton variant="secondary" size="lg" onClick={goToContact}>
                      Schedule a Call
                    </GlowButton>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="border-t border-border/60">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Related <span className="gradient-text">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProjects.map((rel, idx) => (
                <motion.button
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => navigate(`/projects/${rel.id}`)}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
