import { motion } from 'framer-motion'
import { Upload, ScanEye, ClipboardCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

const STEPS = [
  {
    icon: Upload,
    title: 'Upload leaf image',
    desc: 'Drag in a clear photo of the affected leaf, or snap one on the spot.',
    accent: 'from-primary/10 to-accent/20',
  },
  {
    icon: ScanEye,
    title: 'AI analysis',
    desc: 'Our model scans the tissue for lesions, discoloration and spore patterns.',
    accent: 'from-secondary/15 to-primary/10',
  },
  {
    icon: ClipboardCheck,
    title: 'Get diagnosis',
    desc: 'Receive the disease, severity, treatment plan and prevention steps.',
    accent: 'from-accent/20 to-canopy',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Process"
          title="Three steps from leaf to answer"
          description="A single, guided flow, no dashboards, no clutter."
        />

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-9 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center text-center px-4"
            >
              <div className="relative mb-6">
                {/* Glow ring on hover */}
                <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative grid place-items-center h-[72px] w-[72px] rounded-full bg-white shadow-soft ring-4 ring-canopy"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  >
                    <s.icon size={26} className="text-primary" strokeWidth={2} />
                  </motion.div>
                  <span className="absolute -top-2 -right-2 grid place-items-center h-6 w-6 rounded-full bg-primary text-white text-xs font-mono font-semibold shadow-soft">
                    {i + 1}
                  </span>
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink/60 max-w-[220px] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
