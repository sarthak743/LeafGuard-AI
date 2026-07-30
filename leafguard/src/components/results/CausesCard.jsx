import { Bug } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function CausesCard({ causes }) {
  if (!causes?.length) return null
  return (
    <Card>
      <h3 className="text-lg font-semibold text-ink mb-5">Causes</h3>
      <ul className="flex flex-col gap-4">
        {causes.map((c, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-clay/10 text-clay shrink-0 mt-0.5">
              <Bug size={13} />
            </span>
            <span className="text-sm text-ink/70 leading-relaxed">{c}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
