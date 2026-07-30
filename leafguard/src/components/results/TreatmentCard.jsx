import { Syringe } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function TreatmentCard({ treatment }) {
  if (!treatment?.length) return null
  return (
    <Card highlight>
      <div className="flex items-center gap-2 mb-5">
        <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-white">
          <Syringe size={16} />
        </span>
        <h3 className="text-lg font-semibold text-ink">Treatment recommendations</h3>
      </div>
      <ul className="flex flex-col gap-4">
        {treatment.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-sm text-ink/70 leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
