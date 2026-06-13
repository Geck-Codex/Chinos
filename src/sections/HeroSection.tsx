import { Suspense, lazy, useRef, useState, useEffect } from 'react'

const MODEL_URL = '/images/models/guante2.glb'

const GloveScene = lazy(() =>
  import('../components/GloveScene').then((m) => ({ default: m.GloveScene }))
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [canvasActive, setCanvasActive] = useState(true)
  const [show3D, setShow3D] = useState(false)

  // Diferir la carga del 3D hasta después del primer paint (para no competir con
  // el LCP del texto), pero con timeout para que arranque pronto. El modelo se
  // precarga en paralelo con el chunk de three.js en vez de en serie.
  useEffect(() => {
    const start = () => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'fetch'
      link.href = MODEL_URL
      document.head.appendChild(link)
      setShow3D(true)
    }
    const ric = window.requestIdleCallback ?? ((cb: () => void, _o?: unknown) => setTimeout(cb, 200))
    const id = ric(start, { timeout: 1200 })
    return () => (window.cancelIdleCallback ?? clearTimeout)(id as number)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-[76px]"
      style={{ backgroundColor: '#080403' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

      <div className="relative z-10 flex flex-col lg:flex-row w-full items-center px-8 md:px-16 py-16 gap-8">

        {/* ── Left: copy ── */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <p
            className="hero-fade uppercase tracking-[0.3em] font-semibold mb-5"
            style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', animationDelay: '0.1s' }}
          >
            Handlove Mexico
          </p>

          <div className="overflow-hidden mb-6">
            <h1
              className="hero-lcp font-black uppercase leading-[0.9] tracking-tight"
              style={{ color: '#FAFBFC', fontSize: 'clamp(3.5rem, 8vw, 8.5rem)' }}
            >
              Seguridad<br />
              <span style={{ color: '#CD0032' }}>en cada</span><br />
              guante.
            </h1>
          </div>

          <p
            className="hero-fade font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#FAFBFC', opacity: 0.72, fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', animationDelay: '0.28s' }}
          >
            Guantes de seguridad al por mayor para cada tarea.
          </p>

          <p
            className="hero-fade font-light leading-relaxed max-w-[420px]"
            style={{ color: '#FAFBFC', opacity: 0.45, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', animationDelay: '0.36s' }}
          >
            ¡Guantes seguros, de calidad y protectores! Personaliza tus guantes,
            compra al por mayor a precios competitivos y te los entregaremos puntualmente.
          </p>

          <div className="hero-fade flex gap-4 mt-9 flex-wrap" style={{ animationDelay: '0.46s' }}>
            <a
              href="#productos"
              className="uppercase tracking-widest font-bold px-8 py-4"
              style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
            >
              Ver productos
            </a>
            <a
              href="#mayoreo"
              className="uppercase tracking-widest font-bold px-8 py-4 border"
              style={{ borderColor: 'rgba(250,251,252,0.22)', color: '#FAFBFC', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAFBFC'
                e.currentTarget.style.color = '#080403'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#FAFBFC'
              }}
            >
              Mayoreo
            </a>
          </div>
        </div>

        {/* ── Right: 3D glove ── */}
        <div
          className="hero-fade flex-1 w-full"
          style={{ height: 'clamp(400px, 56vw, 700px)', minWidth: 0, animationDelay: '0.3s', animationDuration: '1.2s' }}
        >
          {show3D && (
            <Suspense fallback={null}>
              <GloveScene variant="hero" active={canvasActive} />
            </Suspense>
          )}
        </div>

      </div>
    </section>
  )
}
