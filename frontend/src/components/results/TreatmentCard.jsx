import { Cross } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function TreatmentCard({ treatment }) {
  if (!treatment?.length) return null
  return (
    <Card>
      <h3 className="text-lg font-semibold text-ink mb-5">Treatment recommendations</h3>
      <ul className="flex flex-col gap-4">
        {treatment.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-canopy text-primary shrink-0 mt-0.5">
              <Cross size={13} />
            </span>
            <span className="text-sm text-ink/70 leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
