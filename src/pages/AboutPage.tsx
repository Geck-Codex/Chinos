import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'

const STATS = [
  { value: '22', suffix: '+', label: 'Años de experiencia' },
  { value: '30.000', suffix: 'm²', label: 'Área de instalaciones' },
  { value: '100', suffix: '+', label: 'Empleados cualificados' },
  { value: '500', suffix: '+', label: 'Máquinas importadas' },
]

const QUALITY_POINTS = [
  'Actualizamos constantemente nuestra gama de productos para adaptarnos a las tendencias del mercado.',
  'Nuestros sistemas de producción y cadena de suministro están diseñados para satisfacer todas las necesidades de entrega.',
  'Garantizamos productos estables y de alta calidad manteniendo los costes bajos.',
]

const CERTS = [
  '12_f4014cc1-2164-4903-9e2a-5f0be0c64830',
  '9_33666ad3-9a6b-43fb-b8f0-8dd088fbea1b',
  '11_f8035719-f645-46ed-a2e3-0ea0efa1a9be',
  '10_89167641-dcdc-4069-b3ac-175e8e89ba03',
]

// ─── Separator marquee ────────────────────────────────────────────────────────

function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 6 }, () => text)
  return (
    <div
      className="py-5 overflow-hidden flex items-center gap-12"
      style={{ borderTop: '1px solid rgba(250,251,252,0.08)', borderBottom: '1px solid rgba(250,251,252,0.08)', backgroundColor: '#080403' }}
    >
      {items.map((t, i) => (
        <span
          key={i}
          className="font-bold uppercase tracking-[0.3em] flex-shrink-0 flex items-center gap-12"
          style={{ color: i % 2 === 0 ? '#CD0032' : 'rgba(250,251,252,0.2)', fontSize: 'clamp(0.65rem, 1vw, 0.78rem)' }}
        >
          {t}
          <span style={{ color: '#CD0032', opacity: 0.4 }}>·</span>
        </span>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div style={{ backgroundColor: '#080403' }}>

      {/* ── 1. HERO ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24 pt-[100px]"
        style={{ backgroundColor: '#080403' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />
        <FadeIn y={0} duration={1}>
          <p
            className="uppercase tracking-[0.3em] font-bold mb-5"
            style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Sobre nosotros
          </p>
        </FadeIn>
        <RevealText
          lines={['Guantes para', 'aferrarte a tu futuro']}
          as="h1"
          className="font-black uppercase leading-none tracking-tight"
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 7vw, 9rem)' }}
          delay={0.1}
        />
      </section>

      <Marquee text="El poder reside en cada guante" />

      {/* ── 2. STORY ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <FadeIn y={30}>
            <p
              className="uppercase tracking-[0.22em] font-bold mb-4"
              style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
            >
              El viaje de HandLove
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight mb-8"
              style={{ color: '#080403', fontSize: 'clamp(2rem, 4vw, 5rem)' }}
            >
              Desde 2002
            </h2>
            <p
              className="font-light leading-relaxed"
              style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '520px' }}
            >
              HandLove es una marca de confianza en protección laboral desde 2002, ofreciendo más de 100 tipos
              de guantes para cada trabajo. Desde guantes de cuero y goma hasta guantes de fibra, están diseñados
              para diversas aplicaciones: resistencia química, resistencia al corte y resistencia al calor.
            </p>
          </FadeIn>
          <FadeIn y={30} delay={0.15}>
            <p
              className="font-light leading-relaxed"
              style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', paddingTop: 'clamp(0px, 3vw, 80px)' }}
            >
              Con sede en el condado de Rudong, provincia de Jiangsu, nos dedicamos a crear productos de
              protección laboral de alta calidad con una inversión de <strong style={{ opacity: 1, fontWeight: 700 }}>10 millones de dólares en
              investigación y desarrollo</strong>. Con años de experiencia y una sólida reputación, hemos construido
              con pasión la marca "HandLove". Trabajando con grandes fabricantes, garantizamos que cada guante
              resista las tareas más exigentes. Nuestro objetivo es brindar la mejor protección para sus manos,
              sin importar la necesidad.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ backgroundColor: '#080403' }}
      >
        <FadeIn y={20}>
          <p
            className="uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Números que definen la protección
          </p>
        </FadeIn>
        <RevealText
          lines={['La escala de', 'la excelencia']}
          className="font-black uppercase leading-none tracking-tight mb-12 md:mb-16"
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          delay={0.05}
        />

        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ border: '1px solid rgba(250,251,252,0.1)' }}
        >
          {STATS.map((s, i) => (
            <WipeReveal key={s.label} delay={i * 0.12} amount={0.1} wipeColor="#CD0032">
              <div
                className="p-8 md:p-12 flex flex-col gap-2"
                style={{
                  borderRight: i < 3 ? '1px solid rgba(250,251,252,0.1)' : 'none',
                  borderBottom: '1px solid rgba(250,251,252,0.1)',
                  backgroundColor: '#080403',
                }}
              >
                <span
                  className="font-black leading-none tabular-nums"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
                >
                  {s.value}
                  <span style={{ color: '#CD0032' }}>{s.suffix}</span>
                </span>
                <p
                  className="uppercase tracking-wider font-bold"
                  style={{ color: 'rgba(250,251,252,0.4)', fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)' }}
                >
                  {s.label}
                </p>
              </div>
            </WipeReveal>
          ))}
        </div>
      </section>

      <Marquee text="La calidad ante todo, siempre" />

      {/* ── 4. VISION ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn y={30}>
            <p
              className="uppercase tracking-[0.22em] font-bold mb-4"
              style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
            >
              Nuestra visión
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight mb-7"
              style={{ color: '#080403', fontSize: 'clamp(2rem, 4vw, 5rem)' }}
            >
              Calidad ante todo
            </h2>
            <p
              className="font-light leading-relaxed"
              style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '480px' }}
            >
              En HandLove nuestra visión es: <em>"Calidad ante todo, el cliente es lo primero"</em>. Nos dedicamos a
              ofrecerte los mejores guantes, de la más alta calidad, que te mantengan seguro y cómodo — y nos
              aseguramos de que tú, nuestro cliente, siempre seas nuestra prioridad en todo lo que hacemos.
            </p>
          </FadeIn>

          {/* Global stat */}
          <FadeIn y={30} delay={0.15}>
            <div
              className="flex flex-col items-start p-10 md:p-14"
              style={{ backgroundColor: '#080403', border: '1px solid rgba(8,4,3,0.06)' }}
            >
              <p
                className="uppercase tracking-[0.22em] font-bold mb-4"
                style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
              >
                Alcance global
              </p>
              <span
                className="font-black leading-none tabular-nums mb-3"
                style={{ color: '#FAFBFC', fontSize: 'clamp(5rem, 12vw, 10rem)' }}
              >
                15
              </span>
              <p
                className="uppercase tracking-wider font-bold mb-6"
                style={{ color: 'rgba(250,251,252,0.4)', fontSize: 'clamp(0.65rem, 0.9vw, 0.78rem)' }}
              >
                Mercados internacionales
              </p>
              <p
                className="font-light leading-relaxed"
                style={{ color: 'rgba(250,251,252,0.55)', fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)', maxWidth: '320px' }}
              >
                Exportamos íntegramente a mercados internacionales, incluyendo Japón, Estados Unidos y la Unión Europea.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. QUALITY ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ backgroundColor: '#080403' }}
      >
        <FadeIn y={20}>
          <p
            className="uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Calificación de confianza
          </p>
        </FadeIn>
        <RevealText
          lines={['Normas de', 'fabricación']}
          className="font-black uppercase leading-none tracking-tight mb-10 md:mb-14"
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          delay={0.05}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <FadeIn y={30}>
            <p
              className="font-light leading-relaxed"
              style={{ color: 'rgba(250,251,252,0.6)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '520px' }}
            >
              Exportamos aproximadamente <strong style={{ color: '#FAFBFC', fontWeight: 700 }}>30 millones de docenas</strong> de guantes al año,
              gracias a tecnología de vanguardia y mejoras constantes. Desde la selección de los mejores
              materiales hasta la última puntada, realizamos estrictos controles de calidad para garantizar
              que cada par sea impecable.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(250,251,252,0.1)' }}>
            {QUALITY_POINTS.map((point, i) => (
              <FadeIn key={i} delay={i * 0.12} y={20}>
                <div
                  className="flex gap-5 py-6"
                  style={{ borderBottom: '1px solid rgba(250,251,252,0.1)' }}
                >
                  <span
                    className="font-black tabular-nums flex-shrink-0 mt-0.5"
                    style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.82rem)' }}
                  >
                    0{i + 1}
                  </span>
                  <p
                    className="font-light leading-relaxed"
                    style={{ color: 'rgba(250,251,252,0.55)', fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)' }}
                  >
                    {point}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Marquee text="Excelencia certificada" />

      {/* ── 6. CERTIFICATIONS ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <FadeIn y={20}>
          <p
            className="uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Certificaciones
          </p>
        </FadeIn>
        <RevealText
          lines={['Excelencia certificada']}
          className="font-black uppercase leading-none tracking-tight mb-10 md:mb-14"
          style={{ color: '#080403', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          delay={0.05}
        />
        <FadeIn y={20} delay={0.1}>
          <p
            className="font-light leading-relaxed mb-12"
            style={{ color: '#080403', opacity: 0.55, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}
          >
            Priorizamos la excelencia — y nuestras certificaciones lo demuestran. Cada producto se somete
            a pruebas rigurosas para garantizar el máximo rendimiento y seguridad.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CERTS.map((cert, i) => (
            <WipeReveal key={cert} delay={i * 0.12} amount={0.1} wipeColor="#CD0032">
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: '#F0F0F0',
                  border: '1px solid rgba(8,4,3,0.08)',
                }}
              >
                <img
                  src={`/images/certifications/${cert}.webp`}
                  alt={`Certificación ${i + 1}`}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </WipeReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="px-8 md:px-16 py-20 md:py-28 flex flex-col items-center text-center"
        style={{ backgroundColor: '#080403', borderTop: '1px solid rgba(250,251,252,0.08)' }}
      >
        <FadeIn y={30}>
          <RevealText
            lines={['¿Listo para', 'proteger tus manos?']}
            as="h2"
            className="font-black uppercase leading-none tracking-tight mb-8"
            style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          />
          <a
            href="/#contacto"
            className="inline-block uppercase tracking-widest font-bold px-10 py-4 mt-4"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', borderRadius: '6px' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
          >
            Solicitar presupuesto
          </a>
        </FadeIn>
      </section>

    </div>
  )
}
