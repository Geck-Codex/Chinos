import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'

const INDUSTRIES = [
  'Construcción',
  'Fabricación',
  'Química',
  'Automotriz',
  'Minería',
  'Fuerza',
  'Logística',
  'Otras industrias',
]

export function IndustriesSection() {
  return (
    <section
      id="mayoreo"
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.28em] font-bold mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
        >
          Uso industrial
        </p>
      </FadeIn>
      <RevealText
        lines={['Industrias', 'líderes']}
        className="font-black uppercase leading-none tracking-tight mb-8 md:mb-12"
        style={{ color: '#080403', fontSize: 'clamp(3rem, 7vw, 8rem)' }}
        delay={0.05}
      />

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        style={{ border: '1px solid rgba(8,4,3,0.1)' }}
      >
        {INDUSTRIES.map((industry, i) => (
          <WipeReveal key={industry} delay={i * 0.08} amount={0.1} wipeColor="#CD0032">
            <div
              className="p-6 md:p-10 flex items-end"
              style={{
                borderRight: '1px solid rgba(8,4,3,0.1)',
                borderBottom: '1px solid rgba(8,4,3,0.1)',
                minHeight: '140px',
                backgroundColor: '#FAFBFC',
              }}
            >
              <span
                className="font-black uppercase leading-tight"
                style={{ color: '#080403', fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)' }}
              >
                {industry}
              </span>
            </div>
          </WipeReveal>
        ))}
      </div>
    </section>
  )
}
