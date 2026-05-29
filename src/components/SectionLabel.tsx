import { motion } from 'framer-motion'

interface SectionLabelProps {
  children: string
  delay?: number
  light?: boolean
}

const vp = { once: true as const, amount: 0.3 }

export function SectionLabel({ children, delay = 0, light = false }: SectionLabelProps) {
  const color = '#CD0032'
  const textColor = light ? 'rgba(250,251,252,0.5)' : 'rgba(8,4,3,0.45)'

  return (
    <div className="flex items-center gap-0 mb-6" style={{ overflow: 'hidden' }}>
      {/* Growing red line */}
      <motion.div
        style={{ height: '1px', backgroundColor: color, flexShrink: 0 }}
        initial={{ width: 0 }}
        whileInView={{ width: '2rem' }}
        viewport={vp}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Red dot */}
      <motion.div
        style={{
          width: '5px', height: '5px', borderRadius: '50%',
          backgroundColor: color, flexShrink: 0, marginLeft: '6px', marginRight: '10px',
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={vp}
        transition={{ duration: 0.3, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Text slides in */}
      <motion.span
        className="uppercase tracking-[0.28em] font-semibold"
        style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', color: textColor, letterSpacing: '0.28em' }}
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={vp}
        transition={{ duration: 0.5, delay: delay + 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  )
}
