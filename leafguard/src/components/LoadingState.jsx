import { motion } from 'framer-motion'

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-6 md:px-10 pb-24 md:pb-32 -mt-6"
    >
      <div className="rounded-xl2 bg-white shadow-card border border-black/5 px-8 py-14 flex flex-col items-center text-center">
        <div className="relative h-24 w-24 mb-8">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E8F5E9" strokeWidth="6" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={264}
              animate={{ strokeDashoffset: [264, 40, 264] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 grid place-items-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-primary">
              <path
                d="M12 2C7 3 4 8 5 13c1 5 5 8 7 9 2-1 6-4 7-9 1-5-2-10-7-11Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M12 2C7 3 4 8 5 13c1 5 5 8 7 9 2-1 6-4 7-9 1-5-2-10-7-11Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M12 6v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        <h3 className="text-xl font-semibold text-ink">Analyzing your plant…</h3>
        <p className="text-sm text-ink/50 mt-2">This usually takes a few seconds.</p>

        <div className="mt-8 w-full max-w-xs h-1.5 rounded-full bg-canopy overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
