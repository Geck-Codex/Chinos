import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'

const DIFFS = [
  {
    title: 'Diseños personalizables',
    desc: 'Materiales, colores, tallas y embalaje a medida. Servicios OEM/ODM para que el producto lleve tu identidad.',
  },
  {
    title: 'Compromisos de sostenibilidad',
    desc: 'Producción con energía solar. Emisiones de CO₂ reducidas en un 30%. Un negocio que cuida el futuro.',
  },
  {
    title: 'Guantes de calidad',
    desc: 'Control estricto en cada etapa: selección de materiales, proceso de producción y revisión final.',
  },
]

export function DifferentiatorsSection() {
  return (
    <section
      id="nosotros"
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#080403' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.2em] font-black mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
        >
          Lo que nos diferencia
        </p>
      </FadeIn>
      <RevealText
        lines={['Calidad, variedad', 'y sostenibilidad']}
        className="font-black uppercase leading-none tracking-tight mb-16 md:mb-24"
        style={{ color: '#FAFBFC', fontSize: 'clamp(3.5rem, 12vw, 15rem)' }}
        delay={0.05}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ border: '1px solid rgba(250,251,252,0.1)' }}
      >
        {DIFFS.map((d, i) => (
          <WipeReveal key={d.title} delay={i * 0.22} amount={0.1} wipeColor="#CD0032">
            <div
              className="p-8 md:p-12 flex flex-col gap-4 h-full"
              style={{
                borderRight: i < 2 ? '1px solid rgba(250,251,252,0.1)' : 'none',
                borderBottom: '1px solid rgba(250,251,252,0.1)',
                backgroundColor: '#080403',
              }}
            >
              <span
                className="font-black uppercase"
                style={{ color: '#CD0032', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                0{i + 1}
              </span>
              <h3
                className="font-black uppercase leading-tight"
                style={{ color: '#FAFBFC', fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
              >
                {d.title}
              </h3>
              <p
                className="font-light leading-relaxed"
                style={{ color: '#FAFBFC', opacity: 0.5, fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
              >
                {d.desc}
              </p>
            </div>
          </WipeReveal>
        ))}
      </div>
    </section>
  )
}
