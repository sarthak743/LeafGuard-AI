const STYLES = {
  Healthy: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Low: 'bg-lime-50 text-lime-700 ring-lime-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  High: 'bg-red-50 text-red-700 ring-red-600/20',
}

const DOT = {
  Healthy: 'bg-emerald-500',
  Low: 'bg-lime-500',
  Medium: 'bg-amber-500',
  High: 'bg-red-500',
}

export default function SeverityBadge({ level, size = 'md' }) {
  const style = STYLES[level] || STYLES.Medium
  const dot = DOT[level] || DOT.Medium
  const pad = size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'
  return (
    <span className={`inline-flex items-center gap-2 rounded-full ring-1 ring-inset font-semibold ${style} ${pad}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {level}
    </span>
  )
}
