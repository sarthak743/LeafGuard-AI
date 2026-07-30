import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="blob h-72 w-72 bg-accent -top-10 -left-16" />
      <div className="blob h-96 w-96 bg-secondary/60 top-20 right-0" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-canopy px-4 py-1.5 text-sm font-medium text-primary mb-6 font-mono"
          >
            <Sparkles size={14} /> Trained on 40+ crop diseases
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] text-ink"
          >
            AI powered plant
            <br />
            <span className="text-primary">disease detection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-ink/60 max-w-md leading-relaxed"
          >
            Photograph a leaf and get an instant diagnosis, treatment plan and
            weather-based risk advisory — grounded in real agronomy, not
            guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#upload"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold shadow-soft hover:shadow-lift hover:bg-primary-dark transition-all duration-300"
            >
              Analyze Leaf
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-2 py-3.5 text-ink/70 font-medium hover:text-primary transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative h-80 w-80 md:h-[26rem] md:w-[26rem]">
            <motion.div
              animate={{ rotate: [0, 4, 0, -4, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <LeafIllustration />
            </motion.div>
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 -right-2 md:right-2 flex items-center gap-2 rounded-2xl bg-white shadow-lift px-4 py-3"
            >
              <ScanLine size={16} className="text-primary" />
              <span className="text-xs font-mono font-semibold text-ink/70">Scanning tissue…</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-6 -left-4 md:left-0 rounded-2xl bg-white shadow-lift px-4 py-3"
            >
              <p className="text-xs text-ink/50 font-mono">Confidence</p>
              <p className="text-lg font-semibold text-primary font-mono">98.4%</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LeafIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-[0_20px_40px_rgba(46,125,50,0.25)]">
      <defs>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#66BB6A" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
      <path
        d="M200 40 C 320 60, 360 180, 300 280 C 250 360, 140 360, 90 290 C 40 220, 60 100, 200 40 Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M200 60 C 200 140, 200 260, 210 340"
        stroke="#E8F5E9"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {[70, 110, 150, 190, 230, 270].map((y, i) => (
        <path
          key={y}
          d={`M200 ${y} C 240 ${y + 10}, 260 ${y + 20}, 275 ${y + 35}`}
          stroke="#E8F5E9"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
      {[90, 130, 170, 210, 250].map((y, i) => (
        <path
          key={`l-${y}`}
          d={`M200 ${y} C 160 ${y + 10}, 140 ${y + 18}, 125 ${y + 32}`}
          stroke="#E8F5E9"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
    </svg>
  )
}
