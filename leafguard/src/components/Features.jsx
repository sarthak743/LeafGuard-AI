import { motion } from 'framer-motion'
import { Brain, CloudRain, Zap, Stethoscope } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Disease Detection',
    desc: 'A vision model trained across dozens of crops recognizes disease patterns invisible to the naked eye.',
  },
  {
    icon: Zap,
    title: 'Instant Diagnosis',
    desc: 'Upload a photo and get plant, disease and confidence results back in seconds, not days.',
  },
  {
    icon: CloudRain,
    title: 'Weather Advisory',
    desc: 'Local conditions are checked against the disease’s ideal spread environment to score real-time risk.',
  },
  {
    icon: Stethoscope,
    title: 'Treatment Recommendations',
    desc: 'Every diagnosis comes with practical treatment, prevention and orchard-care guidance.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-canopy/50">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Why LeafGuard"
          title="Everything a grower needs, in one scan"
          description="From detection to treatment, LeafGuard replaces guesswork with a clear, evidence-based plan."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-xl2 bg-white p-7 shadow-card hover:shadow-lift transition-shadow duration-300 border border-black/5"
            >
              <div className="grid place-items-center h-12 w-12 rounded-2xl bg-canopy text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <f.icon size={22} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
