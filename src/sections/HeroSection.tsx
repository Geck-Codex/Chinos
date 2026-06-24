import { HeroScene, type HeroSpec } from '../components/HeroScene'

const HERO_SPECS: HeroSpec[] = [
  { value: 'ANSI A7', label: 'Nivel de corte', side: 'right', pos: { top: '17%', right: '2%' } },
  { value: 'EN388 · 4X42F', label: 'Certificación', side: 'right', pos: { top: '45%', right: '0%' } },
  { value: 'HPPE cal.13', label: 'Material base', side: 'left', pos: { top: '71%', left: '0%' } },
]

export function HeroSection() {
  return (
    <section
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
              style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
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
              href="#contacto"
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
              Cotizar
            </a>
          </div>
        </div>

        {/* ── Right: escena 3D ── */}
        <div
          className="hero-fade flex-1 w-full"
          style={{ minWidth: 0, animationDelay: '0.3s', animationDuration: '1.2s' }}
        >
          <HeroScene word="HANDLOVE" specs={HERO_SPECS} />
        </div>

      </div>
    </section>
  )
}
