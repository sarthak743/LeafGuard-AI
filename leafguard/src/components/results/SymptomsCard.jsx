import { AlertCircle } from 'lucide-react'
import Card from '../ui/Card.jsx'

export default function SymptomsCard({ symptoms }) {
  if (!symptoms?.length) return null
  return (
    <Card>
      <h3 className="text-lg font-semibold text-ink mb-5">Symptoms detected</h3>
      <ul className="flex flex-col gap-4">
        {symptoms.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-amber-50 text-amber-600 shrink-0 mt-0.5">
              <AlertCircle size={13} />
            </span>
            <span className="text-sm text-ink/70 leading-relaxed">{s}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
