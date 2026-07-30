import { BookOpen } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function DescriptionCard({ description }) {
  if (!description) return null
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <span className="grid place-items-center h-9 w-9 rounded-full bg-canopy text-primary">
          <BookOpen size={16} />
        </span>
        <h3 className="text-lg font-semibold text-ink">About this disease</h3>
      </div>
      <p className="text-sm md:text-base text-ink/70 leading-relaxed">{description}</p>
    </Card>
  )
}
