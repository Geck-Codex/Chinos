import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'


export function CTASection() {
  return (
    <section
      id="contacto"
      className="px-8 md:px-16 py-24 md:py-36 flex flex-col items-center text-center"
      style={{
        backgroundColor: '#080403',
        borderTop: '1px solid rgba(250,251,252,0.08)',
      }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.2em] font-black mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
        >
          Solicita hoy mismo
        </p>
      </FadeIn>
      <RevealText
        lines={['Presupuesto', 'o muestra']}
        className="font-black uppercase leading-none tracking-tight mb-8"
        style={{ color: '#FAFBFC', fontSize: 'clamp(3.5rem, 12vw, 15rem)' }}
        delay={0.05}
      />
      <FadeIn y={30} delay={0.2}>
        <p
          className="font-light leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: '#FAFBFC', opacity: 0.5, fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)' }}
        >
          Recibe un presupuesto personalizado o solicita una muestra para comprobar por qué nuestros guantes son los mejores del mercado.
        </p>
        <a
          href="https://wa.me/521XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block uppercase tracking-widest font-bold px-10 py-4"
          style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
        >
          Solicitar presupuesto
        </a>
      </FadeIn>
    </section>
  )
}
