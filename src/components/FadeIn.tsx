import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'
import { useInViewOnce } from './useInViewOnce'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  amount?: number
  className?: string
  style?: CSSProperties
  playOnMount?: boolean
}

export function FadeIn({ children, delay = 0, duration = 0.8, x = 0, y = 55, amount = 0, className, style, playOnMount = false }: FadeInProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ amount, margin: '-30px' })
  const show = playOnMount || inView
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      animate={show ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
