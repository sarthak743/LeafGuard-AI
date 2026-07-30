import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
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

export default function DiagnosisCard({ plant, disease, confidence, severity }) {
  const theme = SEVERITY_THEME[severity] || DEFAULT_THEME

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
          <div className="mt-4">
            <SeverityBadge level={severity} size="lg" />
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
