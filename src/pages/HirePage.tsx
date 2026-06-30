import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Clock, Sparkles, ArrowUpRight, ChevronRight, Check, Send, X, Laptop, Monitor, GraduationCap, Heart, Clock4, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { positions, departments, type Position } from '../data/hire';
import { cn } from '@/lib/utils';

const locationIcons: Record<string, any> = {
  remote: Globe,
  onsite: Building2,
  hybrid: MapPin,
};

const typeColors: Record<string, string> = {
  'full-time': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'part-time': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  contract: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  internship: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const locationLabels: Record<string, string> = {
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
};

const applySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.string().min(2, 'Please enter your desired role'),
  experience: z.string().min(1, 'Please select your experience level'),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Please write at least 10 characters'),
});

type ApplyFormData = z.infer<typeof applySchema>;

function Building2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function PositionCard({ position, index, onApply }: { position: Position; index: number; onApply: (position: Position) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const TypeIcon = locationIcons[position.location] || MapPin;
  const LocationIcon = locationIcons[position.location === 'remote' ? 'remote' : position.location === 'hybrid' ? 'hybrid' : 'onsite'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative rounded-2xl border p-6 transition-all duration-300',
        position.featured
          ? 'border-primary/30 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04]'
          : 'border-border/60 bg-card/50 hover:border-border',
        isHovered && 'shadow-lg shadow-black/5 dark:shadow-black/20'
      )}
    >
      {position.featured && (
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-primary via-accent to-transparent" />
      )}

      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-3 rounded-xl flex-shrink-0 transition-all duration-300 bg-gradient-to-br shadow-lg',
            position.gradient,
            isHovered && 'scale-110 shadow-xl'
          )}
        >
          <position.icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">{position.department}</span>
            {position.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 uppercase">
                <Sparkles className="w-2.5 h-2.5" /> Hot
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {position.title}
          </h3>

          <div className="flex flex-wrap gap-3 mt-2.5">
            <span className={cn(
              'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
              typeColors[position.type]
            )}>
              <Briefcase className="w-3 h-3" />
              {position.type === 'full-time' ? 'Full-time' : position.type === 'part-time' ? 'Part-time' : position.type === 'contract' ? 'Contract' : 'Internship'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10">
              <MapPin className="w-3 h-3" />
              {locationLabels[position.location]}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground border border-border/50">
              <Clock className="w-3 h-3" />
              {position.experience}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{position.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {position.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[11px] font-medium bg-secondary/50 text-muted-foreground rounded-md border border-border/40">
                {tech}
              </span>
            ))}
            {position.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                +{position.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        <motion.button
          onClick={() => onApply(position)}
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mt-1',
            isHovered
              ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
              : 'bg-secondary text-muted-foreground border border-border/50'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpRight className="w-4.5 h-4.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ApplyModal({ position, onClose }: { position: Position | null; onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: '',
      email: '',
      role: position?.title || '',
      experience: '',
      portfolio: '',
      message: '',
    },
  });

  const onSubmit = async (data: ApplyFormData) => {
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, positionTitle: position?.title }),
      })
      if (!res.ok) throw new Error('Failed')
      setIsSubmitted(true);
    } catch {
      alert('Something went wrong. Please email us directly at careers@softgoway.com.')
    }
  };

  return (
    <AnimatePresence>
      {position && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl md:max-h-[80vh] z-50 overflow-y-auto rounded-2xl border border-border/60 bg-card shadow-2xl"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2.5 rounded-xl bg-gradient-to-br shadow-lg', position.gradient)}>
                    <position.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Applying for</p>
                    <h3 className="font-bold text-foreground">{position.title}</h3>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    We&apos;ve received your application for{' '}
                    <span className="text-primary font-semibold">{position.title}</span>. Our team will review it and reach out to you within 3-5 business days.
                  </p>
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg shadow-primary/25"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                      <input
                        {...register('name')}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email *</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Desired Role *</label>
                      <input
                        {...register('role')}
                        placeholder="Senior React Engineer"
                        className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                      {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Experience Level *</label>
                      <select
                        {...register('experience')}
                        className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        <option value="">Select...</option>
                        <option value="0-1">Entry (0-1 years)</option>
                        <option value="1-3">Junior (1-3 years)</option>
                        <option value="3-5">Mid-Level (3-5 years)</option>
                        <option value="5-8">Senior (5-8 years)</option>
                        <option value="8+">Lead (8+ years)</option>
                      </select>
                      {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Portfolio / LinkedIn URL</label>
                    <input
                      {...register('portfolio')}
                      placeholder="https://linkedin.com/in/johndoe"
                      className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    {errors.portfolio && <p className="text-xs text-red-500 mt-1">{errors.portfolio.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Why do you want this role? *</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your experience, skills, and why you'd be a great fit..."
                      className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-60"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Application
                      </span>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DeveloperApplySection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      role: '',
      experience: '',
      portfolio: '',
      message: '',
    },
  });

  const onSubmit = async (data: ApplyFormData) => {
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setIsSubmitted(true);
      reset();
    } catch {
      alert('Something went wrong. Please email us directly at careers@softgoway.com.')
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-t from-primary/5 via-accent/[0.03] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-5 border border-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            Open Application
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Don&apos;t see the right role?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re always looking for talented developers. Submit your details and we&apos;ll reach out when a position that matches your skills opens up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-xl"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">You&apos;re on our radar!</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                We&apos;ll keep your application on file and reach out when a matching opportunity comes up.
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg shadow-primary/25"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Submit Another
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your Role / Specialization *</label>
                  <input
                    {...register('role')}
                    placeholder="e.g. React Developer, DevOps Engineer"
                    className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Experience Level *</label>
                  <select
                    {...register('experience')}
                    className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value="">Select...</option>
                    <option value="0-1">Entry (0-1 years)</option>
                    <option value="1-3">Junior (1-3 years)</option>
                    <option value="3-5">Mid-Level (3-5 years)</option>
                    <option value="5-8">Senior (5-8 years)</option>
                    <option value="8+">Lead (8+ years)</option>
                  </select>
                  {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Portfolio / LinkedIn / GitHub</label>
                <input
                  {...register('portfolio')}
                  placeholder="https://github.com/johndoe"
                  className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                {errors.portfolio && <p className="text-xs text-red-500 mt-1">{errors.portfolio.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Tell us about yourself *</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="What technologies do you work with? What kind of projects interest you?"
                  className="w-full px-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-60"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Application
                  </span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function HirePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const filteredPositions = useMemo(() => {
    return positions.filter((position) => {
      const matchesSearch = !searchTerm ||
        position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        position.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment]);

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
              Join Our Team
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-[1.05]">
              Work With The<br />
              <span className="gradient-text">Best Developers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              We&apos;re looking for passionate developers to join our team. 
              <span className="text-primary font-semibold"> Browse open positions</span> or submit your profile and we&apos;ll reach out when a role matches your skills.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { label: 'Open Positions', value: positions.length },
              { label: 'Remote Roles', value: positions.filter((p) => p.location === 'remote').length },
              { label: 'Full-Time', value: positions.filter((p) => p.type === 'full-time').length },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            { icon: Laptop, label: 'Remote-first' },
            { icon: Monitor, label: 'Equipment budget' },
            { icon: GraduationCap, label: 'Learning stipend' },
            { icon: Heart, label: 'Health & wellness' },
            { icon: Clock4, label: 'Flexible hours' },
            { icon: Users, label: 'Team retreats' },
          ].map((benefit) => (
            <div
              key={benefit.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm text-center"
            >
              <benefit.icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">{benefit.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions, tech, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card/50 border border-border rounded-xl text-sm text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {departments.map((dept) => (
                <button
                  key={dept.value}
                  onClick={() => setSelectedDepartment(dept.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                    selectedDepartment === dept.value
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Positions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Open Positions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredPositions.length} position{filteredPositions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>Last updated today</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredPositions.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {filteredPositions.map((position, index) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  index={index}
                  onApply={(pos) => setSelectedPosition(pos)}
                />
              ))}
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
              <p className="text-xl text-muted-foreground font-medium mb-1">No positions found</p>
              <p className="text-sm text-muted-foreground">Try a different search term or department filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Developer Application Section */}
      <DeveloperApplySection />

      {/* Apply Modal */}
      <ApplyModal position={selectedPosition} onClose={() => setSelectedPosition(null)} />
    </div>
  );
}
