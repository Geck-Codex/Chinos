import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'

const PILLARS = [
  {
    stat: '100%',
    label: 'Fibras recicladas',
    desc: 'Cada lote de guantes está fabricado con fibras 100% recicladas, reduciendo residuos y fomentando la economía circular.',
  },
  {
    stat: '-30%',
    label: 'Huella de carbono',
    desc: 'Reducción de emisiones de CO₂ en un 30%, alineados con los objetivos de sostenibilidad globales.',
  },
  {
    stat: '↓',
    label: 'Combustibles fósiles',
    desc: 'Menor consumo de petróleo. Dependencia reducida de combustibles fósiles para un futuro más sostenible.',
  },
  {
    stat: '↑',
    label: 'Eficiencia de recursos',
    desc: 'Recursos optimizados en cada ciclo de producción sin comprometer la resistencia ni la calidad.',
  },
]

export function SustainabilitySection() {
  return (
    <section
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#080403' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.28em] font-bold mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
        >
          Sostenibilidad
        </p>
      </FadeIn>
      <RevealText
        lines={['Pilares de', 'excelencia']}
        className="font-black uppercase leading-none tracking-tight mb-8 md:mb-12"
        style={{ color: '#FAFBFC', fontSize: 'clamp(3rem, 7vw, 8rem)' }}
        delay={0.05}
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        style={{ border: '1px solid rgba(250,251,252,0.1)' }}
      >
        {PILLARS.map((p, i) => (
          <WipeReveal key={p.label} delay={i * 0.15} amount={0.1} wipeColor="#CD0032">
            <div
              className="p-8 md:p-10 flex flex-col gap-4"
              style={{
                borderRight: '1px solid rgba(250,251,252,0.1)',
                borderBottom: '1px solid rgba(250,251,252,0.1)',
                backgroundColor: '#080403',
              }}
            >
              <span
                className="font-black leading-none"
                style={{ color: '#CD0032', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
              >
                {p.stat}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-black uppercase"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)' }}
                >
                  {p.label}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: '#FAFBFC', opacity: 0.45, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          </WipeReveal>
        ))}
      </div>
    </section>
  )
}
