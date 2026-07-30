import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'

export default function RecommendedAction({ action }) {
  if (!action) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl2 bg-clay/10 border border-clay/30 p-6 md:p-8 flex items-start gap-4"
    >
      <span className="grid place-items-center h-11 w-11 rounded-full bg-clay text-white shrink-0">
        <Sprout size={20} />
      </span>
      <div>
        <p className="text-xs font-mono font-semibold uppercase tracking-wide text-clay mb-1.5">
          Recommended action
        </p>
        <p className="text-base font-medium text-ink leading-relaxed">{action}</p>
      </div>
    </motion.div>
  )
}
