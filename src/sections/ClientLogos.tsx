import { motion } from 'framer-motion'

const clientNames = [
  'FinFlow', 'Synthwave Health', 'OmniCorp', 'Teal',
  'DataCoral', 'NexGen Finance', 'PayBridge', 'CloudHive',
  'StreamLine', 'VaultEdge', 'PulseLabs', 'AeroStack',
]

export function ClientLogos() {
  const row1 = clientNames.slice(0, 6)
  const row2 = clientNames.slice(6)

  return (
    <section className="relative py-16 overflow-hidden border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground/60">
          Trusted by engineering teams at
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex flex-shrink-0 gap-16 px-8"
          >
            {[...row1, ...row1].map((name, i) => (
              <div key={`r1-${i}`} className="flex-shrink-0">
                <span className="text-sm font-bold tracking-tight text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex flex-shrink-0 gap-16 px-8"
          >
            {[...row2, ...row2].map((name, i) => (
              <div key={`r2-${i}`} className="flex-shrink-0">
                <span className="text-sm font-bold tracking-tight text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
