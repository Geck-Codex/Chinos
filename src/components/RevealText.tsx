import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { useInViewOnce } from './useInViewOnce'

interface RevealTextProps {
  lines: string[]
  className?: string
  style?: CSSProperties
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
  playOnMount?: boolean
}

export function RevealText({ lines, className, style, delay = 0, as: Tag = 'h2', playOnMount = false }: RevealTextProps) {
  const [ref, inView] = useInViewOnce<HTMLHeadingElement>({ amount: 0.3 })
  const show = playOnMount || inView
  return (
    <Tag ref={ref} className={className} style={{ ...style, lineHeight: 0.88 }}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '108%' }}
            animate={show ? { y: '0%' } : { y: '108%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
