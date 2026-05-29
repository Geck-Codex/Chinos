import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'

const FEATURES = [
  {
    num: '01',
    name: 'Colecciones versátiles',
    desc: 'Más de 100 tipos de guantes — cuero, caucho y fibra — para cubrir cualquier necesidad industrial.',
  },
  {
    num: '02',
    name: 'Producción masiva',
    desc: '500 máquinas de última generación. 30 millones de docenas exportados cada año a múltiples países.',
  },
  {
    num: '03',
    name: 'Diferentes aplicaciones',
    desc: 'Resistencia a químicos, cortes y calor. Diseñados para el trabajo real, no para el catálogo.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="productos"
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.2em] font-black mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
        >
          Características principales
        </p>
      </FadeIn>
      <RevealText
        lines={['Diseñadas para', 'tu seguridad']}
        className="font-black uppercase leading-none tracking-tight mb-16 md:mb-24"
        style={{ color: '#080403', fontSize: 'clamp(3.5rem, 12vw, 15rem)' }}
        delay={0.05}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ border: '1px solid rgba(8,4,3,0.1)' }}
      >
        {FEATURES.map((f, i) => (
          <WipeReveal
            key={f.num}
            delay={i * 0.22}
            amount={0.1}
            wipeColor="#CD0032"
            style={{ borderRight: i < 2 ? '1px solid rgba(8,4,3,0.1)' : undefined }}
          >
            <div
              className="p-8 md:p-12 flex flex-col justify-between"
              style={{ minHeight: '340px', backgroundColor: '#FAFBFC' }}
            >
              <span
                className="font-black leading-none"
                style={{ color: 'rgba(8,4,3,0.06)', fontSize: 'clamp(5rem, 10vw, 9rem)' }}
              >
                {f.num}
              </span>
              <div className="flex flex-col gap-3">
                <h3
                  className="font-black uppercase leading-tight"
                  style={{ color: '#080403', fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)' }}
                >
                  {f.name}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: '#080403', opacity: 0.5, fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          </WipeReveal>
        ))}
      </div>
    </section>
  )
}
