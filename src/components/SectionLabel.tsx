import { motion } from 'framer-motion'
import { useInViewOnce } from './useInViewOnce'

interface SectionLabelProps {
  children: string
  delay?: number
  light?: boolean
}

export function SectionLabel({ children, delay = 0, light = false }: SectionLabelProps) {
  const color = '#CD0032'
  const textColor = light ? 'rgba(250,251,252,0.5)' : 'rgba(8,4,3,0.45)'
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ amount: 0.3 })

  return (
    <div ref={ref} className="flex items-center gap-0 mb-6" style={{ overflow: 'hidden' }}>
      {/* Growing red line */}
      <motion.div
        style={{ height: '1px', backgroundColor: color, flexShrink: 0 }}
        initial={{ width: 0 }}
        animate={inView ? { width: '2rem' } : { width: 0 }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Red dot */}
      <motion.div
        style={{
          width: '5px', height: '5px', borderRadius: '50%',
          backgroundColor: color, flexShrink: 0, marginLeft: '6px', marginRight: '10px',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Text slides in */}
      <motion.span
        className="uppercase tracking-[0.28em] font-semibold"
        style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', color: textColor, letterSpacing: '0.28em' }}
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.5, delay: delay + 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  )
}
