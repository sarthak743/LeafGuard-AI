import { motion } from 'framer-motion'
import Card from '../ui/Card.jsx'

const RANK_LABEL = ['Most likely', '2nd likely', '3rd likely']

export default function TopPredictions({ predictions }) {
  if (!predictions?.length) return null
  const top3 = predictions.slice(0, 3)

  return (
    <Card>
      <h3 className="text-lg font-semibold text-ink mb-6">Top predictions</h3>
      <div className="flex flex-col gap-6">
        {top3.map((p, i) => (
          <div key={p.class_name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink/70">
                <span className="text-primary font-mono font-semibold mr-2">{RANK_LABEL[i]}</span>
                {p.display_name}
              </span>
              <span className="text-sm font-mono font-semibold text-ink">{p.confidence}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-canopy overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${i === 0 ? 'bg-primary' : 'bg-secondary/70'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
