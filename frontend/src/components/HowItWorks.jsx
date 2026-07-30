import { motion } from 'framer-motion'
import { Upload, ScanEye, ClipboardCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'

const STEPS = [
  {
    icon: Upload,
    title: 'Upload leaf image',
    desc: 'Drag in a clear photo of the affected leaf, or snap one on the spot.',
  },
  {
    icon: ScanEye,
    title: 'AI analysis',
    desc: 'Our model scans the tissue for lesions, discoloration and spore patterns.',
  },
  {
    icon: ClipboardCheck,
    title: 'Get diagnosis',
    desc: 'Receive the disease, severity, treatment plan and prevention steps.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Process"
          title="Three steps from leaf to answer"
          description="A single, guided flow — no dashboards, no clutter."
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
              className="relative flex flex-col items-center text-center px-4"
            >
              <div className="relative grid place-items-center h-[72px] w-[72px] rounded-full bg-white shadow-soft ring-4 ring-canopy mb-6">
                <s.icon size={26} className="text-primary" strokeWidth={2} />
                <span className="absolute -top-2 -right-2 grid place-items-center h-6 w-6 rounded-full bg-primary text-white text-xs font-mono font-semibold">
                  {i + 1}
                </span>
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
