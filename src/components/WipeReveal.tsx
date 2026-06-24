import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'
import { useInViewOnce } from './useInViewOnce'

interface WipeRevealProps {
  children: ReactNode
  delay?: number
  wipeColor?: string
  className?: string
  style?: CSSProperties
  amount?: number
}

export function WipeReveal({
  children,
  delay = 0,
  wipeColor = '#CD0032',
  className,
  style,
  amount = 0.3,
}: WipeRevealProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ amount })

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.55, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundColor: wipeColor, zIndex: 2 }}
        initial={{ x: '-101%' }}
        animate={inView ? { x: ['-101%', '0%', '101%'] } : { x: '-101%' }}
        transition={{
          duration: 0.72,
          delay,
          ease: [0.86, 0, 0.07, 1],
          times: [0, 0.43, 1],
        }}
      />
    </div>
  )
}
