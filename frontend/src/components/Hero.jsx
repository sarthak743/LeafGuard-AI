import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Leaf, Check, CloudSun, AlertTriangle, Camera } from 'lucide-react'
import leafPhoto from './hero_image.jpg'

export default function Hero() {
  const [hovered, setHovered] = useState(false)

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

        {/* Hero illustration — one composition, three overlapping real-photo cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative h-[26rem] w-[22rem] md:h-[30rem] md:w-[27rem]">
            {/* Back — Uploaded Image Card */}
            <motion.div
              animate={{
                rotate: hovered ? -7 : -9,
                x: hovered ? -6 : 0,
                y: hovered ? -14 : -8,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 w-52 md:w-56 rounded-2xl overflow-hidden shadow-card bg-white border border-black/5 transform-gpu z-0"
            >
              <div className="aspect-square">
                <img
                  src={leafPhoto}
                  alt="Uploaded leaf photo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-3.5 py-2.5 flex items-center gap-2">
                <Camera size={11} className="text-ink/30" />
                <span className="text-[11px] text-ink/40 font-mono">img_leaf_001.jpg</span>
              </div>
            </motion.div>

            {/* Front bottom — Treatment Summary Card */}
            <motion.div
              animate={{
                rotate: hovered ? -3 : -4,
                x: hovered ? 2 : -2,
                y: hovered ? 4 : 10,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.03 }}
              className="absolute bottom-2 left-6 md:left-2 w-52 md:w-56 rounded-2xl bg-white shadow-soft border border-black/5 px-4 py-4 z-10 transform-gpu"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="grid place-items-center h-6 w-6 rounded-full bg-canopy shrink-0">
                  <Check size={12} className="text-primary" strokeWidth={3} />
                </span>
                <span className="text-xs font-semibold text-ink">Treatment</span>
              </div>
              <p className="text-[12px] text-ink/60 leading-snug pl-8 -mt-2 mb-3">Copper-based fungicide</p>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CloudSun size={12} className="text-primary/70" />
                  <span className="text-[10px] font-mono text-ink/50">Weather Risk</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 px-2 py-0.5 text-[10px] font-semibold">
                  Medium
                </span>
              </div>
            </motion.div>

            {/* Front — AI Diagnosis Card (the focal point) */}
            <motion.div
              animate={{
                rotate: hovered ? 2 : 3,
                x: hovered ? 10 : 6,
                y: hovered ? -2 : 4,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-10 right-0 w-64 md:w-72 rounded-2xl overflow-hidden shadow-lift bg-white border border-black/5 z-20 transform-gpu"
            >
              <div className="aspect-square relative">
                <img
                  src={leafPhoto}
                  alt="Diagnosed leaf — bacterial spot detected"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Leaf size={12} className="text-primary" />
                  <span className="text-xs font-mono uppercase tracking-wide text-ink/50">Peach</span>
                </div>
                <p className="text-sm font-semibold text-ink leading-tight">Bacterial Spot</p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 px-2 py-0.5 text-[10px] font-semibold">
                    <AlertTriangle size={9} /> Medium Severity
                  </span>
                  <span className="text-sm font-semibold font-mono text-primary">98.4%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
