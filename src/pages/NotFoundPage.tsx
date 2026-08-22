import { Link } from 'react-router-dom'
import { FadeIn } from '../components/FadeIn'
import { Seo } from '../seo/Seo'

export function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center pt-[76px] relative"
      style={{ backgroundColor: '#080403' }}
    >
      <Seo
        title="Página no encontrada"
        description="La página que buscas no existe. Consulta el catálogo de guantes de seguridad Handlove Mexico."
        path="/404"
        noindex
      />

      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

      <div className="relative z-10 w-full px-8 md:px-16 py-16 max-w-3xl">
        <FadeIn y={0} duration={0.7} playOnMount>
          <p
            className="uppercase tracking-[0.3em] font-semibold mb-5"
            style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
          >
            Error 404
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.1} duration={0.8} playOnMount>
          <h1
            className="font-black uppercase leading-[0.9] tracking-tight mb-7"
            style={{ color: '#FAFBFC', fontSize: 'clamp(2.6rem, 6.5vw, 6rem)' }}
          >
            Esta página<br />
            <span style={{ color: '#CD0032' }}>se nos</span><br />
            escapó.
          </h1>
        </FadeIn>

        <FadeIn y={16} delay={0.25} duration={0.7} playOnMount>
          <p
            className="font-light leading-relaxed mb-10"
            style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '440px' }}
          >
            La dirección que abriste no existe o cambió de lugar. Desde aquí puedes volver
            al catálogo de guantes de seguridad o contactarnos para cotizar.
          </p>
        </FadeIn>

        <FadeIn y={16} delay={0.38} duration={0.7} playOnMount>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/productos/"
              className="uppercase tracking-widest font-bold px-8 py-4"
              style={{
                backgroundColor: '#CD0032',
                color: '#FAFBFC',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Ver catálogo
            </Link>
            <Link
              to="/"
              className="uppercase tracking-widest font-bold px-8 py-4 border"
              style={{
                borderColor: 'rgba(250,251,252,0.22)',
                color: '#FAFBFC',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Ir al inicio
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
