import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingState({ isComplete = false }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (isComplete) {
      setProgress(100)
      return
    }

    const startTime = Date.now()

    const calculateProgress = (elapsedSeconds) => {
      const s = elapsedSeconds
      if (s <= 2) {
        // 0s -> 2s: 0% -> 35%
        return (s / 2) * 35
      } else if (s <= 5) {
        // 2s -> 5s: 35% -> 70%
        return 35 + ((s - 2) / 3) * 35
      } else if (s <= 8) {
        // 5s -> 8s: 70% -> 90%
        return 70 + ((s - 5) / 3) * 20
      } else if (s <= 10) {
        // 8s -> 10s: 90% -> 98%
        return 90 + ((s - 8) / 2) * 8
      } else {
        // > 10s: stay around 98% until API response completes
        return 98
      }
    }

    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000
      const targetProgress = calculateProgress(elapsedSeconds)
      setProgress((prev) => Math.max(prev, Math.min(98, targetProgress)))
    }, 50)

    return () => clearInterval(interval)
  }, [isComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl2 bg-white shadow-lift px-10 py-12 flex flex-col items-center text-center w-[90vw] max-w-md"
      >
        {/* Modern 12-spoke radial spinner matching reference image & LeafGuard palette */}
        <div className="relative h-16 w-16 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="h-full w-full relative"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[3.5px] h-[13px] rounded-full origin-[50%_32px]"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  backgroundColor: i > 8 ? '#81C784' : '#2E7D32',
                  opacity: 0.15 + (i / 12) * 0.85,
                }}
              />
            ))}
          </motion.div>
        </div>

        <h3 className="text-xl font-semibold text-ink">Analyzing your plant…</h3>
        <p className="text-sm text-ink/50 mt-2 max-w-xs leading-relaxed">
          Our AI is analyzing your leaf and preparing your diagnosis.
        </p>

        {/* Dynamic AI-styled Progress Bar */}
        <div className="mt-8 w-full h-1.5 rounded-full bg-canopy overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{
              duration: isComplete ? 0.25 : 0.1,
              ease: isComplete ? 'easeOut' : 'linear',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
