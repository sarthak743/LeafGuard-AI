const STYLES = {
  Healthy: 'bg-emerald-50 text-emerald-800 ring-emerald-600/30',
  Low: 'bg-lime-50 text-lime-800 ring-lime-600/30',
  Medium: 'bg-amber-50 text-amber-900 ring-amber-600/30',
  High: 'bg-red-50 text-red-800 ring-red-600/30',
  'Very High': 'bg-red-100 text-red-900 ring-red-700/40',
}

const DOT = {
  Healthy: 'bg-emerald-500',
  Low: 'bg-lime-500',
  Medium: 'bg-amber-500',
  High: 'bg-red-500',
  'Very High': 'bg-red-600',
}

function normalizeLevel(lvl) {
  if (!lvl) return 'Medium'
  const s = String(lvl).trim().toLowerCase()
  if (s === 'healthy') return 'Healthy'
  if (s === 'low') return 'Low'
  if (s === 'medium') return 'Medium'
  if (s === 'high') return 'High'
  if (s === 'very high' || s === 'very_high' || s === 'veryhigh') return 'Very High'
  return lvl
}

export default function SeverityBadge({ level = 'Medium', size = 'md' }) {
  const safeLevel = normalizeLevel(level)
  const style = STYLES[safeLevel] || STYLES.Medium
  const dot = DOT[safeLevel] || DOT.Medium

  const pad =
    size === 'lg'
      ? 'px-4 py-2 text-sm'
      : 'px-3.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 rounded-full ring-1 ring-inset font-semibold leading-none shrink-0 ${style} ${pad}`}
    >
      <span className={`h-2 w-2 rounded-full shrink-0 ${dot}`} />
      <span className="leading-none">{safeLevel}</span>
    </span>
  )
}
