import { motion } from 'framer-motion'
import { MapPin, Thermometer, Droplets, CloudRain, CloudSun, Gauge } from 'lucide-react'
import Card from '../ui/Card.jsx'

const RISK_STYLES = {
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  High: 'bg-red-50 text-red-700 ring-red-600/20',
}

export default function WeatherAdvisory({ weather, advisory }) {
  console.log('[WeatherAdvisory Component] Props received:', {
    weather,
    advisory,
  })

  if (!weather && !advisory) return null

  return (
    <Card className="md:col-span-2">
      <div className="flex items-center gap-2 mb-6">
        <span className="grid place-items-center h-9 w-9 rounded-full bg-canopy text-primary">
          <CloudSun size={16} />
        </span>
        <h3 className="text-lg font-semibold text-ink">Weather advisory</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {weather && (
          <div className="rounded-2xl bg-bg p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-ink/60 mb-4">
              <MapPin size={15} className="text-primary" /> {weather.location}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Stat icon={Thermometer} label="Temp" value={`${weather.temperature}\u00B0C`} />
              <Stat icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
              <Stat
                icon={weather.rain ? CloudRain : CloudSun}
                label="Rain"
                value={weather.rain ? 'Yes' : 'None'}
              />
            </div>
          </div>
        )}

        {advisory && (
          <div className="rounded-2xl bg-bg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 text-sm font-medium text-ink/60">
                <Gauge size={15} className="text-primary" /> Disease spread risk
              </span>
              <span
                className={`inline-flex items-center rounded-full ring-1 ring-inset px-3 py-1 text-xs font-semibold ${
                  RISK_STYLES[advisory.risk] || RISK_STYLES.Medium
                }`}
              >
                {advisory.risk}
              </span>
            </div>
            <div className="h-2 rounded-full bg-canopy overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${advisory.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="text-sm text-ink/70 leading-relaxed mt-auto">{advisory.message}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Icon size={16} className="text-primary/70" />
      <span className="text-base font-semibold font-mono text-ink">{value}</span>
      <span className="text-xs text-ink/40">{label}</span>
    </div>
  )
}
