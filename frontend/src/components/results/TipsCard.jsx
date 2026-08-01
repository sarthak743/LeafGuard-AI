import { motion } from 'framer-motion'
import { Lightbulb, Camera, Sun, Focus, Layers, Eye, SunDim } from 'lucide-react'
import Card from '../ui/Card.jsx'

const TIPS = [
  { icon: Sun, text: 'Use good natural lighting' },
  { icon: Focus, text: 'Avoid blurry images' },
  { icon: Layers, text: 'Use a plain background' },
  { icon: Eye, text: 'Ensure the diseased portion is clearly visible' },
]

export default function TipsCard() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-5">
        <span className="grid place-items-center h-9 w-9 rounded-full bg-canopy text-primary">
          <Lightbulb size={16} />
        </span>
        <h3 className="text-lg font-semibold text-ink">Tips for better results</h3>
      </div>
      <ul className="flex flex-col gap-4">
        {TIPS.map((tip, i) => {
          const Icon = tip.icon
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3"
            >
              <span className="grid place-items-center h-6 w-6 rounded-full bg-canopy text-primary shrink-0 mt-0.5">
                <Icon size={13} />
              </span>
              <span className="text-sm text-ink/70 leading-relaxed">{tip.text}</span>
            </motion.li>
          )
        })}
      </ul>
    </Card>
  )
}
