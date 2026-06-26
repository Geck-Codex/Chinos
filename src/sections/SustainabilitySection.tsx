import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { RevealText } from '../components/RevealText'
import { CountUp } from '../components/CountUp'
import { useInViewOnce } from '../components/useInViewOnce'
import { useScrollToContact } from '../components/useScrollToContact'

type Pillar = {
  index: string
  label: string
  desc: string
  span: 1 | 2
} & (
  | { kind: 'count'; to: number; prefix?: string; suffix?: string }
  | { kind: 'icon'; Icon: LucideIcon }
)

const PILLARS: Pillar[] = [
  {
    index: '01',
    kind: 'count',
    to: 100,
    suffix: '%',
    label: 'Uso de fibra',
    desc: 'Cada lote de 100 guantes está fabricado con fibras 100% recicladas, lo que reduce los residuos y fomenta una economía circular.',
    span: 2,
  },
  {
    index: '02',
    kind: 'count',
    to: 30,
    prefix: '−',
    suffix: '%',
    label: 'Huella de carbono',
    desc: 'Hemos reducido las emisiones de CO₂ en un 30%, disminuyendo nuestra huella de carbono y alineándonos con los objetivos de sostenibilidad globales.',
    span: 1,
  },
  {
    index: '03',
    kind: 'icon',
    Icon: TrendingDown,
    label: 'Combustibles fósiles',
    desc: 'Al reducir el consumo de petróleo, hemos disminuido la dependencia de los combustibles fósiles, garantizando un futuro más sostenible para todos.',
    span: 1,
  },
  {
    index: '04',
    kind: 'icon',
    Icon: TrendingUp,
    label: 'Eficiencia de recursos',
    desc: 'Hemos reducido el consumo de materiales, optimizando los recursos sin comprometer la resistencia y la calidad de nuestros guantes.',
    span: 2,
  },
]

const PIECE_ENTER = [
  { x: -250, y: -90, rotate: -9 },
  { x: 250, y: -110, rotate: 9 },
  { x: -250, y: 110, rotate: 8 },
  { x: 250, y: 90, rotate: -8 },
]

function PillarCard({
  pillar,
  progress,
  enter,
}: {
  pillar: Pillar
  progress: MotionValue<number>
  enter: { x: number; y: number; rotate: number }
}) {
  const x = useTransform(progress, [0.2, 0.7], [enter.x, 0])
  const y = useTransform(progress, [0.2, 0.7], [enter.y, 0])
  const rotate = useTransform(progress, [0.2, 0.7], [enter.rotate, 0])
  const opacity = useTransform(progress, [0.15, 0.38], [0, 1])

  return (
    <motion.div
      className={pillar.span === 2 ? 'md:col-span-2' : 'md:col-span-1'}
      style={{ x, y, rotate, opacity, backgroundColor: '#080403' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 'clamp(20px, 3vw, 40px)',
          padding: 'clamp(32px, 3.4vw, 56px) clamp(26px, 3vw, 52px)',
          cursor: 'default',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(205,0,50,0.05)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent' }}
      >
        {/* Cabecera: índice + flecha */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              color: 'rgba(250,251,252,0.18)',
              fontSize: '0.56rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
            }}
          >
            {pillar.index}
          </span>
          <ArrowUpRight size={16} style={{ color: 'rgba(205,0,50,0.35)' }} />
        </div>

        {/* Stat — count-up o ícono */}
        <div
          style={{
            color: '#CD0032',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 6vw, 7.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginTop: 'auto',
          }}
        >
          {pillar.kind === 'count' ? (
            <CountUp to={pillar.to} prefix={pillar.prefix} suffix={pillar.suffix} />
          ) : (
            <pillar.Icon size="0.9em" strokeWidth={2.4} style={{ display: 'block' }} />
          )}
        </div>

        {/* Texto */}
        <div>
          <h3
            className="uppercase font-black"
            style={{
              color: '#FAFBFC',
              letterSpacing: '0.05em',
              marginBottom: '10px',
              fontSize: 'clamp(1rem, 1.7vw, 1.45rem)',
            }}
          >
            {pillar.label}
          </h3>
          <p
            style={{
              color: 'rgba(250,251,252,0.4)',
              fontSize: 'clamp(0.82rem, 1.05vw, 0.98rem)',
              lineHeight: 1.7,
              maxWidth: '460px',
            }}
          >
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function SustainabilitySection() {
  const goToContact = useScrollToContact()
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'center center'],
  })
  const backdrop = useTransform(scrollYProgress, [0.4, 0.68], ['#FFFFFF', '#080403'])

  const [labelRef, labelIn] = useInViewOnce<HTMLParagraphElement>({ amount: 0.6 })
  const [titleRef, titleIn] = useInViewOnce<HTMLDivElement>({ amount: 0.4 })
  const [lineRef, lineIn] = useInViewOnce<HTMLDivElement>({ amount: 0.8 })
  const [ctaRef, ctaIn] = useInViewOnce<HTMLDivElement>({ amount: 0.4 })

  return (
    <section
      id="sostenibilidad"
      style={{ backgroundColor: '#080403', overflow: 'hidden' }}
    >
      {/* ── Bloque titular ── */}
      <div style={{ padding: 'clamp(64px, 9vw, 120px) clamp(22px, 5vw, 80px) 0', position: 'relative' }}>

        <motion.p
          ref={labelRef}
          className="uppercase tracking-[0.28em] font-bold"
          style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', marginBottom: '32px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={labelIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Sostenibilidad
        </motion.p>

        <motion.div
          ref={titleRef}
          style={{ position: 'relative', zIndex: 1, marginBottom: '0' }}
          initial={{ opacity: 0 }}
          animate={titleIn ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <RevealText
            lines={['La sostenibilidad', 'en el punto', 'de mira']}
            className="font-black uppercase leading-none tracking-tight"
            style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 7.5vw, 9rem)' }}
            delay={0.05}
          />
        </motion.div>

        {/* Línea divisora */}
        <motion.div
          ref={lineRef}
          style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.08)', marginTop: '56px', originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={lineIn ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── Pilares — bento grid asimétrico que se arma como rompecabezas al hacer scroll ── */}
      <div style={{ position: 'relative' }}>
        <motion.div
          aria-hidden
          style={{ position: 'absolute', inset: 0, backgroundColor: backdrop }}
        />
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            position: 'relative',
            gap: '1px',
            backgroundColor: 'rgba(250,251,252,0.07)',
            borderTop: '1px solid rgba(250,251,252,0.07)',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.label}
              pillar={pillar}
              progress={scrollYProgress}
              enter={PIECE_ENTER[i]}
            />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 20 }}
        animate={ctaIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            padding: 'clamp(44px, 7vw, 80px) clamp(22px, 5vw, 80px)',
            borderTop: '1px solid rgba(250,251,252,0.07)',
          }}
        >
          <p
            style={{
              color: 'rgba(250,251,252,0.3)',
              fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)',
              maxWidth: '400px',
              lineHeight: 1.65,
            }}
          >
            Comprometidos con un futuro más limpio,<br />sin comprometer la protección.
          </p>
          <a
            href="#contacto"
            onClick={goToContact}
            className="inline-flex items-center gap-3 uppercase font-bold"
            style={{
              letterSpacing: '0.2em',
              fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
              color: '#FAFBFC',
              textDecoration: 'none',
              border: '1px solid rgba(250,251,252,0.18)',
              padding: '14px 28px',
              transition: 'background-color 0.22s, border-color 0.22s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#CD0032'
              e.currentTarget.style.borderColor = '#CD0032'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(250,251,252,0.18)'
            }}
          >
            Más información <ArrowUpRight size={13} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
