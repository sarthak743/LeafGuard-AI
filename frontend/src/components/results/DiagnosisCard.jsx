import { motion } from 'framer-motion'
import { Leaf, AlertTriangle } from 'lucide-react'
import SeverityBadge from '../ui/SeverityBadge.jsx'

const SEVERITY_THEME = {
  Healthy: {
    bg: 'from-emerald-500 to-emerald-700',
    circle: 'bg-emerald-400/20',
    circleSmall: 'bg-emerald-300/10',
  },
  Low: {
    bg: 'from-yellow-500 to-amber-600',
    circle: 'bg-yellow-300/20',
    circleSmall: 'bg-yellow-200/10',
  },
  Medium: {
    bg: 'from-orange-500 to-orange-700',
    circle: 'bg-orange-300/20',
    circleSmall: 'bg-orange-200/10',
  },
  High: {
    bg: 'from-red-500 to-red-700',
    circle: 'bg-red-400/20',
    circleSmall: 'bg-red-300/10',
  },
  'Very High': {
    bg: 'from-red-600 to-red-900',
    circle: 'bg-red-400/20',
    circleSmall: 'bg-red-300/10',
  },
}

const DEFAULT_THEME = SEVERITY_THEME.Medium

function normalizeLevel(lvl) {
  if (!lvl) return 'Medium'
  const s = String(lvl).trim().toLowerCase()
  if (s === 'healthy') return 'Healthy'
  if (s === 'low') return 'Low'
  if (s === 'medium') return 'Medium'
  if (s === 'high') return 'High'
  if (s === 'very high' || s === 'very_high' || s === 'veryhigh') return 'Very High'
  return lvl
}

export default function DiagnosisCard({
  plant,
  disease,
  confidence,
  severity,
  isLowConfidence = false,
  message = '',
}) {
  if (isLowConfidence) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-slate-800 via-zinc-800 to-zinc-900 text-white p-8 md:p-10 shadow-lift transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:scale-[1.015] border border-white/10"
      >
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/5" />
        <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-white/[0.03]" />

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wide mb-3">
              <AlertTriangle size={15} className="text-amber-400" /> Low Confidence Classification
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold leading-snug text-white">
              Unable to identify the disease
            </h3>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              {message || 'The uploaded image could not be classified with sufficient confidence.'}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
            <span className="text-xs uppercase font-mono text-zinc-400 tracking-wide">Confidence</span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-semibold font-mono text-white"
            >
              {confidence ? `${confidence}%` : 'Uncertain'}
            </motion.span>
          </div>
        </div>
      </motion.div>
    )
  }

  const safeSeverity = normalizeLevel(severity)
  const theme = SEVERITY_THEME[safeSeverity] || DEFAULT_THEME

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-xl2 bg-gradient-to-br ${theme.bg} text-white p-8 md:p-10 shadow-lift transform-gpu transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:scale-[1.015]`}
    >
      <div className={`absolute -right-10 -top-10 h-52 w-52 rounded-full ${theme.circle}`} />
      <div className={`absolute -right-4 bottom-0 h-32 w-32 rounded-full ${theme.circleSmall}`} />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white/70 text-sm font-mono uppercase tracking-wide mb-3">
            <Leaf size={15} /> {plant}
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold">{disease}</h3>
          <div className="mt-4 flex items-center">
            <SeverityBadge level={safeSeverity} size="lg" />
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-xs uppercase font-mono text-white/60 tracking-wide">Confidence</span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-semibold font-mono"
          >
            {confidence}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
