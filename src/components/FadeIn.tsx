import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  amount?: number
  className?: string
  style?: CSSProperties
}

export function FadeIn({ children, delay = 0, duration = 0.8, x = 0, y = 55, amount = 0, className, style }: FadeInProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px', amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
