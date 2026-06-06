import { useRef, useEffect } from 'react'

const WORDS = [
  'PROTECCIÓN', 'RESISTENCIA', 'CALIDAD', 'DURABILIDAD',
  'CONFORT', 'SEGURIDAD', 'PRECISIÓN', 'MÉXICO',
]

const TRACK = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - top + window.innerHeight) * 0.2
      trackRef.current.style.transform = `translateX(${-offset}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-14 overflow-hidden"
      style={{
        backgroundColor: '#FAFBFC',
        borderTop: '1px solid rgba(8,4,3,0.08)',
        borderBottom: '1px solid rgba(8,4,3,0.08)',
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-8 items-center"
        style={{ willChange: 'transform' }}
      >
        {TRACK.map((word, i) => (
          <span
            key={i}
            className="font-black uppercase tracking-widest flex-shrink-0 flex items-center gap-8"
            style={{
              color: i % 8 === 0 ? '#CD0032' : '#080403',
              opacity: i % 8 === 0 ? 1 : 0.2,
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            {word}
            <span style={{ color: '#CD0032', opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
