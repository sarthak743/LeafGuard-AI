import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment} mb-14`}
    >
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wide text-primary uppercase font-mono">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight">{title}</h2>
      {description && <p className="text-ink/60 text-base md:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
