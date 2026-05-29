import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface RevealTextProps {
  lines: string[]
  className?: string
  style?: CSSProperties
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
}

export function RevealText({ lines, className, style, delay = 0, as: Tag = 'h2' }: RevealTextProps) {
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '108%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.3 }}
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
