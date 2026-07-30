import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingState() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl2 bg-white shadow-lift px-10 py-12 flex flex-col items-center text-center w-[90vw] max-w-md"
      >
        {/* Animated leaf spinner */}
        <div className="relative h-24 w-24 mb-8">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E8F5E9" strokeWidth="5" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={264}
              animate={{ strokeDashoffset: [264, 40, 264] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
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
        <p className="text-sm text-ink/50 mt-2 max-w-xs leading-relaxed">
          Our AI is analyzing your leaf and preparing your diagnosis.
        </p>

        {/* Progress bar: smoothly reaches 100% over ~6.5 seconds */}
        <div className="mt-8 w-full h-1.5 rounded-full bg-canopy overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
