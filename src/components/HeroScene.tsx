import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HERO_MODEL_URL } from './GloveGLTF'

const GloveScene = lazy(() =>
  import('./GloveScene').then((m) => ({ default: m.GloveScene }))
)

const EASE = [0.22, 1, 0.36, 1] as const

type Side = 'left' | 'right'

export interface HeroSpec {
  value: string
  label: string
  side: Side
  pos: { top: string; left?: string; right?: string }
}

function SpecAnnotation({ value, label, side, pos, index, labelColor }: HeroSpec & { index: number; labelColor: string }) {
  const isRight = side === 'right'
  return (
    <motion.div
      className="hidden md:block absolute z-20 pointer-events-none"
      style={pos}
      initial={{ opacity: 0, x: isRight ? 28 : -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 + index * 0.18, duration: 0.6, ease: EASE }}
    >
      <div
        className="spec-float flex items-center gap-2.5"
        style={{ flexDirection: isRight ? 'row' : 'row-reverse' }}
      >
        <div className="flex items-center" style={{ flexDirection: isRight ? 'row' : 'row-reverse' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#CD0032', boxShadow: '0 0 9px #CD0032' }} />
          <span style={{ width: 'clamp(22px, 3vw, 46px)', height: 1, backgroundColor: 'rgba(205,0,50,0.5)' }} />
        </div>
        <div style={{ textAlign: isRight ? 'left' : 'right' }}>
          <div style={{ color: '#CD0032', fontWeight: 800, fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', letterSpacing: '0.03em', lineHeight: 1.1 }}>
            {value}
          </div>
          <div style={{ color: labelColor, fontSize: 'clamp(0.6rem, 0.9vw, 0.72rem)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600, marginTop: 2 }}>
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroScene({ word, specs, modelUrl, theme = 'dark' }: {
  word: string
  specs: HeroSpec[]
  modelUrl?: string
  theme?: 'dark' | 'light'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show3D, setShow3D] = useState(false)
  const [inView, setInView] = useState(true)

  const light = theme === 'light'
  const strokeColor = light ? 'rgba(8,4,3,0.07)' : 'rgba(250,251,252,0.06)'
  const spotColor = light ? 'rgba(205,0,50,0.18)' : 'rgba(205,0,50,0.45)'
  const labelColor = light ? 'rgba(8,4,3,0.5)' : 'rgba(250,251,252,0.5)'
  const stripValueColor = light ? '#080403' : '#FAFBFC'
  const stripGradient = light
    ? 'linear-gradient(to top, rgba(250,251,252,0.94) 30%, transparent)'
    : 'linear-gradient(to top, rgba(8,4,3,0.92) 30%, transparent)'

  // Diferir la carga del 3D hasta después del primer paint (para no competir con
  // el LCP del texto), pero con timeout para que arranque pronto.
  useEffect(() => {
    const start = () => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'fetch'
      link.href = modelUrl ?? HERO_MODEL_URL
      document.head.appendChild(link)
      setShow3D(true)
    }
    const ric = window.requestIdleCallback ?? ((cb: () => void, _o?: unknown) => setTimeout(cb, 200))
    const id = ric(start, { timeout: 1200 })
    return () => (window.cancelIdleCallback ?? clearTimeout)(id as number)
  }, [modelUrl])

  // Pausar el render del canvas cuando la escena sale de pantalla (0 GPU en reposo).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full" style={{ height: 'clamp(400px, 56vw, 700px)', minWidth: 0 }}>
      {/* Tipografía gigante de fondo (recortada) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
        <span
          className="select-none"
          style={{
            fontSize: 'clamp(7rem, 21vw, 21rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: `1px ${strokeColor}`,
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {word}
        </span>
      </div>

      {/* Spotlight rojo */}
      <div
        aria-hidden
        className="hero-spot pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 46% 52% at 50% 52%, ${spotColor}, transparent 70%)` }}
      />

      {/* Guante 3D */}
      <div className="absolute inset-0">
        {show3D && (
          <Suspense fallback={null}>
            <GloveScene variant="hero" active={inView} modelUrl={modelUrl} />
          </Suspense>
        )}
      </div>

      {/* Anotaciones técnicas — desktop */}
      {show3D && specs.map((spec, i) => <SpecAnnotation key={spec.value} {...spec} index={i} labelColor={labelColor} />)}

      {/* Strip de specs — mobile */}
      <div
        className="md:hidden absolute left-0 right-0 bottom-0 z-20 pointer-events-none px-4 pb-3 pt-10"
        style={{ background: stripGradient }}
      >
        <div className="flex justify-between gap-2.5">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.value}
              className="flex-1"
              style={{ borderTop: '1.5px solid #CD0032', paddingTop: 7 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: EASE }}
            >
              <div style={{ color: stripValueColor, fontWeight: 800, fontSize: 'clamp(0.78rem, 3.6vw, 0.95rem)', lineHeight: 1.05 }}>
                {spec.value}
              </div>
              <div style={{ color: labelColor, fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginTop: 3 }}>
                {spec.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
