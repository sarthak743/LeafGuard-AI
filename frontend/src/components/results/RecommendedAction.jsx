import { Target } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function RecommendedAction({ action }) {
  if (!action) return null
  return (
    <Card>
      <div className="flex items-start gap-4">
        <span className="grid place-items-center h-11 w-11 rounded-full bg-clay/10 text-clay shrink-0">
          <Target size={20} />
        </span>
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-wide text-clay mb-1.5">
            Recommended action
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">{action}</p>
        </div>
      </div>
    </Card>
  )
}
