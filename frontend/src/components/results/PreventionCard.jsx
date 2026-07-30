import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function PreventionCard({ prevention }) {
  if (!prevention?.length) return null
  return (
    <Card>
      <h3 className="text-lg font-semibold text-ink mb-5">Prevention</h3>
      <ul className="flex flex-col gap-4">
        {prevention.map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3"
          >
            <span className="grid place-items-center h-6 w-6 rounded-full bg-canopy text-primary shrink-0 mt-0.5">
              <ShieldCheck size={13} />
            </span>
            <span className="text-sm text-ink/70 leading-relaxed">{p}</span>
          </motion.li>
        ))}
      </ul>
    </Card>
  )
}
