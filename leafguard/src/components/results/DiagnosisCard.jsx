import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import SeverityBadge from '../ui/SeverityBadge.jsx'

export default function DiagnosisCard({ plant, disease, confidence, severity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-10 shadow-lift"
    >
      <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />
      <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-white/5" />

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
