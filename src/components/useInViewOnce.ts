import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useInViewOnce<T extends Element = HTMLDivElement>(
  options?: Parameters<typeof useInView>[1],
) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, amount: 0.3, ...options })
  return [ref, inView] as const
}
