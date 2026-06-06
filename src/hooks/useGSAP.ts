import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({ invalidateOnRefresh: true })

export { gsap, ScrollTrigger }

export function useGSAPContext(
  fn: (ctx: gsap.Context) => void | (() => void),
  deps: unknown[] = []
) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context((self) => {
      fn(self)
    }, rootRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return rootRef
}
