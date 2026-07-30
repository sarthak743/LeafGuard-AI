import { motion } from 'framer-motion'

// Signature motif: a leaf-vein line threads between sections instead of a
// generic numbered/hairline divider, tying the whole page back to the leaf.
export default function VeinDivider({ flip = false }) {
  return (
    <div className={`vein-divider ${flip ? 'scale-y-[-1]' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 64" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M0 32 C 150 8, 300 56, 450 32 S 750 8, 900 32 S 1100 56, 1200 32"
          stroke="#A5D6A7"
          strokeWidth="2"
          className="vein-path"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M150 20 C 180 30, 200 34, 230 30"
          stroke="#66BB6A"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d="M700 44 C 730 36, 760 32, 790 38"
          stroke="#66BB6A"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </svg>
    </div>
  )
}
