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
            <Sparkles size={14} /> Trained on 30+ plant diseases
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
    <svg viewBox="0 0 400 440" className="h-full w-full" style={{ filter: 'drop-shadow(0 24px 48px rgba(27,94,32,0.30))' }}>
      <defs>
        <radialGradient id="lf" cx="0.42" cy="0.38" r="0.62" fx="0.3" fy="0.28">
          <stop offset="0%" stopColor="#8BC34A" />
          <stop offset="25%" stopColor="#689F38" />
          <stop offset="55%" stopColor="#33691E" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>
        <radialGradient id="lfHi" cx="0.35" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C5E1A5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#33691E" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path d="M200 350 Q 202 380, 200 430" stroke="#5D4037" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* Leaf body */}
      <path
        d="M200 30 C 105 55, 40 150, 60 240 C 75 310, 130 350, 175 362 C 190 366, 200 367, 200 367 C 200 367, 210 366, 225 362 C 270 350, 325 310, 340 240 C 360 150, 295 55, 200 30 Z"
        fill="url(#lf)"
      />

      {/* Highlight sheen */}
      <path
        d="M200 30 C 105 55, 40 150, 60 240 C 75 310, 130 350, 175 362 C 190 366, 200 367, 200 367 C 200 367, 210 366, 225 362 C 270 350, 325 310, 340 240 C 360 150, 295 55, 200 30 Z"
        fill="url(#lfHi)"
      />

      {/* Midrib */}
      <path d="M200 48 Q 199 200, 200 362" stroke="url(#vn)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Right veins */}
      <path d="M200 85 Q 245 92, 280 115" stroke="#A5D6A7" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M200 125 Q 255 138, 300 170" stroke="#A5D6A7" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.50" />
      <path d="M200 170 Q 260 188, 315 225" stroke="#A5D6A7" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M200 215 Q 255 235, 310 275" stroke="#A5D6A7" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.40" />
      <path d="M200 260 Q 245 278, 290 315" stroke="#A5D6A7" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M200 305 Q 230 318, 260 345" stroke="#A5D6A7" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.30" />

      {/* Left veins */}
      <path d="M200 85 Q 155 92, 120 115" stroke="#A5D6A7" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M200 125 Q 145 138, 100 170" stroke="#A5D6A7" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.50" />
      <path d="M200 170 Q 140 188, 85 225" stroke="#A5D6A7" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M200 215 Q 145 235, 90 275" stroke="#A5D6A7" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.40" />
      <path d="M200 260 Q 155 278, 110 315" stroke="#A5D6A7" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M200 305 Q 170 318, 140 345" stroke="#A5D6A7" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.30" />

      {/* Tertiary detail veins (right) */}
      <path d="M240 100 Q 255 108, 262 122" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M250 150 Q 270 160, 278 178" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.25" />
      <path d="M255 200 Q 275 212, 285 232" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.22" />

      {/* Tertiary detail veins (left) */}
      <path d="M160 100 Q 145 108, 138 122" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M150 150 Q 130 160, 122 178" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.25" />
      <path d="M145 200 Q 125 212, 115 232" stroke="#C5E1A5" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.22" />

      {/* Edge highlight (left side) */}
      <path d="M200 30 C 105 55, 40 150, 60 240 C 75 310, 130 350, 175 362" stroke="#A5D6A7" strokeWidth="1.2" fill="none" opacity="0.18" strokeLinecap="round" />
    </svg>
  )
}
