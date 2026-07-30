import { motion } from 'framer-motion'

export default function Card({ children, className = '', delay = 0, as = 'div', highlight = false }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl2 border ${highlight ? 'border-primary/30 bg-canopy' : 'border-black/5 bg-white'} shadow-card p-6 md:p-8 ${className}`}
    >
      {children}
    </Comp>
  )
}
