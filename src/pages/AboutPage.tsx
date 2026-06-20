import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { WipeReveal } from '../components/WipeReveal'
import { CountUp } from '../components/CountUp'
import { HeroScene, type HeroSpec } from '../components/HeroScene'

const EASE = [0.22, 1, 0.36, 1] as const

const HERO_SPECS: HeroSpec[] = [
  { value: '22+', label: 'Años', side: 'right', pos: { top: '17%', right: '2%' } },
  { value: '15', label: 'Mercados', side: 'right', pos: { top: '45%', right: '0%' } },
  { value: '30.000 m²', label: 'Instalaciones', side: 'left', pos: { top: '71%', left: '0%' } },
]

const STATS = [
  { value: 22, suffix: '+', label: 'Años de experiencia', decimals: false },
  { value: 30000, suffix: 'm²', label: 'Área de instalaciones', decimals: false },
  { value: 100, suffix: '+', label: 'Empleados cualificados', decimals: false },
  { value: 500, suffix: '+', label: 'Máquinas importadas', decimals: false },
]

const PILLARS = [
  {
    num: '01',
    title: 'Innovación constante',
    body: 'Actualizamos nuestra gama de productos para adaptarnos a las tendencias del mercado y a las exigencias de cada industria.',
    img: '/images/features/versatile-1.webp',
  },
  {
    num: '02',
    title: 'Cadena de suministro',
    body: 'Nuestros sistemas de producción están diseñados para satisfacer todas las necesidades de entrega, sin importar el volumen.',
    img: '/images/features/versatile-2.webp',
  },
  {
    num: '03',
    title: 'Calidad garantizada',
    body: 'Garantizamos productos estables y de alta calidad manteniendo los costes bajos mediante tecnología de fabricación de vanguardia.',
    img: '/images/features/versatile-3.webp',
  },
]

const CERTS = [
  {
    id: 'ansi',
    acronym: 'ANSI',
    name: 'American National Standards Institute',
    detail: 'Niveles A1–A7',
    desc: 'Estándar americano de resistencia al corte para guantes de protección industrial.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 4L8 16v16c0 13.255 10.745 24 24 24s24-10.745 24-24V16L32 4z" fill="rgba(205,0,50,0.12)" stroke="#CD0032" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 33l7 7 14-14" stroke="#CD0032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="23" textAnchor="middle" fill="#CD0032" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">CUT</text>
      </svg>
    ),
  },
  {
    id: 'en388',
    acronym: 'EN 388',
    name: 'European Standard',
    detail: '4X42F · CE Marking',
    desc: 'Norma europea que regula la protección mecánica: abrasión, corte, desgarro e impacto.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="26" fill="rgba(205,0,50,0.10)" stroke="#CD0032" strokeWidth="1.5" />
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const r1 = 18, r2 = 22
          return <line key={i} x1={32 + r1 * Math.cos(angle)} y1={32 + r1 * Math.sin(angle)} x2={32 + r2 * Math.cos(angle)} y2={32 + r2 * Math.sin(angle)} stroke="#CD0032" strokeWidth={i % 3 === 0 ? 2 : 1} strokeOpacity={i % 3 === 0 ? 1 : 0.4} />
        })}
        <text x="32" y="29" textAnchor="middle" fill="#CD0032" fontSize="8" fontWeight="800" fontFamily="sans-serif">EN</text>
        <text x="32" y="40" textAnchor="middle" fill="#CD0032" fontSize="8" fontWeight="800" fontFamily="sans-serif">388</text>
      </svg>
    ),
  },
  {
    id: 'iso9001',
    acronym: 'ISO 9001',
    name: 'Quality Management',
    detail: 'Certificado · Auditoría anual',
    desc: 'Sistema de gestión de calidad que garantiza procesos de fabricación consistentes y auditados.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <polygon points="32,6 37.5,21 53,21 41,31 45.5,47 32,37 18.5,47 23,31 11,21 26.5,21" fill="rgba(205,0,50,0.12)" stroke="#CD0032" strokeWidth="1.5" strokeLinejoin="round" />
        <text x="32" y="35" textAnchor="middle" fill="#CD0032" fontSize="7" fontWeight="800" fontFamily="sans-serif">ISO</text>
      </svg>
    ),
  },
  {
    id: 'oeko',
    acronym: 'OEKO-TEX',
    name: 'Standard 100',
    detail: 'Textiles seguros para el usuario',
    desc: 'Certifica que cada componente del guante ha sido analizado y no contiene sustancias nocivas.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 8C20 8 12 18 12 28c0 8 5 15 12 19 1 4 3 9 8 9s7-5 8-9c7-4 12-11 12-19C52 18 44 8 32 8z" fill="rgba(205,0,50,0.10)" stroke="#CD0032" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M32 20 Q28 30 32 42" stroke="#CD0032" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 28 Q22 22 20 32" stroke="#CD0032" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 28 Q42 22 44 32" stroke="#CD0032" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

// ─── Animated marquee ─────────────────────────────────────────────────────────

function RunningMarquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const items = Array.from({ length: 10 }, (_, i) => ({ id: i, t: text }))
  return (
    <div
      className="py-5 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(250,251,252,0.08)',
        borderBottom: '1px solid rgba(250,251,252,0.08)',
        backgroundColor: '#080403',
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {items.map(({ id, t }) => (
          <span
            key={id}
            className="font-bold uppercase tracking-[0.3em] flex-shrink-0 flex items-center gap-12"
            style={{ color: id % 2 === 0 ? '#CD0032' : 'rgba(250,251,252,0.2)', fontSize: 'clamp(0.65rem, 1vw, 0.78rem)' }}
          >
            {t}
            <span style={{ color: '#CD0032', opacity: 0.4 }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Parallax image ───────────────────────────────────────────────────────────

function ParallaxImage({ src, alt, strength = 80 }: { src: string; alt: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          width: '100%',
          height: `calc(100% + ${strength * 2}px)`,
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          marginTop: -strength,
        }}
      />
    </div>
  )
}

// ─── Full-bleed cinematic section ─────────────────────────────────────────────

function CinematicBanner({ src, headline }: { src: string; headline: string[] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 0.7, 0.7, 0.4])

  return (
    <section ref={ref} style={{ position: 'relative', height: 'clamp(380px, 60vh, 720px)', overflow: 'hidden' }}>
      <motion.div style={{ scale, width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </motion.div>
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundColor: '#080403', opacity }}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column',
          padding: '0 32px',
          textAlign: 'center',
        }}
      >
        <RevealText
          lines={headline}
          className="font-black uppercase leading-none tracking-tight"
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.6rem, 7vw, 9rem)' }}
          delay={0.05}
        />
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit:    { opacity: 0, y: -18, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const SECTION_VARIANTS = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export function AboutPage() {
  return (
    <motion.div
      variants={PAGE_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ backgroundColor: '#080403' }}
    >

      {/* ── 1. HERO ── */}
      <motion.section
        variants={SECTION_VARIANTS}
        className="relative min-h-screen flex items-center pt-[76px]"
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

        <div className="relative z-10 flex flex-col lg:flex-row w-full items-center px-8 md:px-16 py-16 gap-8">
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <FadeIn y={0} duration={1}>
              <p
                className="uppercase tracking-[0.3em] font-bold mb-5"
                style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
              >
                Sobre nosotros
              </p>
            </FadeIn>
            <RevealText
              lines={['Guantes para', 'aferrarte a', 'tu futuro']}
              as="h1"
              className="font-black uppercase leading-[0.9] tracking-tight"
              style={{ color: '#0c0c0c', fontSize: 'clamp(3rem, 7vw, 8rem)' }}
              delay={0.1}
            />
          </div>
          <div
            className="hero-fade flex-1 w-full"
            style={{ minWidth: 0, animationDelay: '0.3s', animationDuration: '1.2s' }}
          >
            <HeroScene word="HANDLOVE" specs={HERO_SPECS} modelUrl="/images/models/dexterityultra.glb" theme="light" />
          </div>
        </div>
      </motion.section>

      <RunningMarquee text="El poder reside en cada guante" />

      {/* ── 2. STORY — split con imagen ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '90vh' }}>

          {/* Imagen con parallax */}
          <motion.div
            style={{ position: 'relative', minHeight: '420px' }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <ParallaxImage src="/images/features/production-1.webp" alt="Fábrica HandLove" strength={60} />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 60%, #FAFBFC)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Texto */}
          <div
            className="flex flex-col justify-center px-10 md:px-16 py-16 lg:py-24"
            style={{ backgroundColor: '#FAFBFC' }}
          >
            <FadeIn y={30}>
              <p
                className="uppercase tracking-[0.22em] font-bold mb-4"
                style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
              >
                El viaje de HandLove
              </p>
              <h2
                className="font-black uppercase leading-none tracking-tight mb-8"
                style={{ color: '#080403', fontSize: 'clamp(2.8rem, 5vw, 6.5rem)' }}
              >
                Desde<br />2002
              </h2>
            </FadeIn>
            <FadeIn y={20} delay={0.1}>
              <p
                className="font-light leading-relaxed mb-6"
                style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '480px' }}
              >
                HandLove es una marca de confianza en protección laboral desde 2002, ofreciendo más de
                100 tipos de guantes para cada trabajo. Desde guantes de cuero y goma hasta guantes de
                fibra, diseñados para resistencia química, al corte y al calor.
              </p>
            </FadeIn>
            <FadeIn y={20} delay={0.2}>
              <p
                className="font-light leading-relaxed"
                style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '480px' }}
              >
                Con sede en el condado de Rudong, provincia de Jiangsu, con una inversión de{' '}
                <strong style={{ opacity: 1, fontWeight: 700, color: '#080403' }}>
                  10 millones de dólares en investigación y desarrollo
                </strong>
                . Trabajando con grandes fabricantes, garantizamos que cada guante resista las tareas más
                exigentes.
              </p>
            </FadeIn>

            {/* Mini stats inline */}
            <div className="flex gap-10 mt-10">
              {[{ v: 22, s: '+', l: 'Años' }, { v: 100, s: '+', l: 'Modelos' }].map((item) => (
                <FadeIn key={item.l} y={16} delay={0.3}>
                  <div>
                    <p className="font-black leading-none tabular-nums" style={{ color: '#080403', fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}>
                      <CountUp to={item.v} suffix={item.s} duration={1.8} />
                    </p>
                    <p className="uppercase tracking-wider font-bold mt-1" style={{ color: 'rgba(8,4,3,0.4)', fontSize: '0.65rem' }}>
                      {item.l}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 3. STATS ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#080403' }}
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

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ border: '1px solid rgba(250,251,252,0.1)' }}>
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
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  duration={2}
                  className="font-black leading-none tabular-nums"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
                />
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
      </motion.section>

      {/* ── 4. CINEMATIC BANNER ── */}
      <CinematicBanner
        src="/images/features/production-2.webp"
        headline={['Fabricados', 'para resistir']}
      />

      <RunningMarquee text="La calidad ante todo, siempre" reverse />

      {/* ── 5. PILARES — 3 columnas con imagen ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#080403' }}
      >
        <FadeIn y={20}>
          <p
            className="uppercase tracking-[0.22em] font-bold mb-3"
            style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Nuestros pilares
          </p>
        </FadeIn>
        <RevealText
          lines={['Por qué eligen', 'HandLove']}
          className="font-black uppercase leading-none tracking-tight mb-14 md:mb-20"
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          delay={0.05}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: i * 0.14, ease: EASE }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(250,251,252,0.1)',
              }}
            >
              {/* Imagen */}
              <motion.div
                style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}
                whileHover="hover"
              >
                <motion.img
                  src={p.img}
                  alt={p.title}
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.55, ease: EASE }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(8,4,3,0.85))',
                  }}
                />
                <span
                  style={{
                    position: 'absolute', bottom: '14px', left: '18px',
                    fontWeight: 900, color: '#CD0032', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </span>
              </motion.div>

              {/* Texto */}
              <div className="p-7">
                <h3
                  className="font-black uppercase leading-tight tracking-tight mb-3"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: 'rgba(250,251,252,0.5)', fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)' }}
                >
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 6. VISIÓN — split oscuro con imagen derecha ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        style={{ backgroundColor: '#FAFBFC' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '80vh' }}>

          {/* Texto */}
          <div
            className="flex flex-col justify-center px-10 md:px-16 py-16 lg:py-24"
            style={{ backgroundColor: '#FAFBFC' }}
          >
            <FadeIn y={30}>
              <p
                className="uppercase tracking-[0.22em] font-bold mb-4"
                style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
              >
                Nuestra visión
              </p>
              <h2
                className="font-black uppercase leading-none tracking-tight mb-7"
                style={{ color: '#080403', fontSize: 'clamp(2.4rem, 4.5vw, 5.5rem)' }}
              >
                Calidad<br />ante todo
              </h2>
            </FadeIn>
            <FadeIn y={20} delay={0.12}>
              <p
                className="font-light leading-relaxed mb-8"
                style={{ color: '#080403', opacity: 0.65, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '480px' }}
              >
                En HandLove nuestra visión es:{' '}
                <em>"Calidad ante todo, el cliente es lo primero"</em>. Nos dedicamos a ofrecerte los
                mejores guantes, de la más alta calidad, que te mantengan seguro y cómodo.
              </p>
            </FadeIn>

            {/* Alcance global destacado */}
            <FadeIn y={20} delay={0.22}>
              <div
                className="inline-flex flex-col p-8"
                style={{
                  backgroundColor: '#080403',
                  borderLeft: '3px solid #CD0032',
                  maxWidth: '380px',
                }}
              >
                <p className="uppercase tracking-wider font-bold mb-1" style={{ color: 'rgba(250,251,252,0.4)', fontSize: '0.62rem' }}>
                  Alcance global
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <CountUp
                    to={15}
                    duration={1.8}
                    className="font-black leading-none tabular-nums"
                    style={{ color: '#FAFBFC', fontSize: 'clamp(4rem, 9vw, 7rem)' }}
                  />
                  <span className="font-black" style={{ color: '#CD0032', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>+</span>
                </div>
                <p className="uppercase tracking-wider font-bold mb-3" style={{ color: 'rgba(250,251,252,0.4)', fontSize: '0.62rem' }}>
                  Mercados internacionales
                </p>
                <p className="font-light" style={{ color: 'rgba(250,251,252,0.5)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Exportamos a Japón, Estados Unidos y la Unión Europea, entre otros mercados.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Imagen con parallax */}
          <motion.div
            style={{ position: 'relative', minHeight: '420px' }}
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <ParallaxImage src="/images/features/production-3.webp" alt="Calidad HandLove" strength={60} />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to left, transparent 60%, #FAFBFC)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ── 7. FABRICACIÓN — imagen full + texto ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#080403' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn y={30}>
            <p
              className="uppercase tracking-[0.22em] font-bold mb-3"
              style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
            >
              Normas de fabricación
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight mb-7"
              style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            >
              30 millones<br />de docenas
            </h2>
            <p
              className="font-light leading-relaxed mb-10"
              style={{ color: 'rgba(250,251,252,0.55)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '460px' }}
            >
              Exportamos anualmente gracias a tecnología de vanguardia y mejoras constantes. Desde la
              selección de los mejores materiales hasta la última puntada, realizamos estrictos controles
              de calidad para garantizar que cada par sea impecable.
            </p>

            {/* Lista numerada */}
            <div style={{ borderTop: '1px solid rgba(250,251,252,0.1)' }}>
              {[
                'Actualizamos nuestra gama constantemente.',
                'Producción y entrega a cualquier escala.',
                'Alta calidad con costes competitivos.',
              ].map((point, i) => (
                <motion.div
                  key={i}
                  className="flex gap-5 py-5"
                  style={{ borderBottom: '1px solid rgba(250,251,252,0.1)' }}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                >
                  <span className="font-black flex-shrink-0 mt-0.5" style={{ color: '#CD0032', fontSize: '0.78rem' }}>
                    0{i + 1}
                  </span>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(250,251,252,0.55)', fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)' }}>
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Mosaico de imágenes */}
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: 'auto auto' }}>
            <motion.div
              style={{ gridColumn: '1 / -1', aspectRatio: '16/9', overflow: 'hidden' }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <img
                src="/images/features/applications-1.webp"
                alt="Aplicaciones HandLove"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
            {['/images/features/applications-2.webp', '/images/features/applications-3.webp'].map((src, i) => (
              <motion.div
                key={src}
                style={{ aspectRatio: '4/3', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <RunningMarquee text="Excelencia certificada" />

      {/* ── 8. CERTIFICACIONES ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
        variants={SECTION_VARIANTS}
        className="px-8 md:px-16 py-20 md:py-28" style={{ backgroundColor: '#080403' }}
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
          style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
          delay={0.05}
        />
        <FadeIn y={20} delay={0.1}>
          <p
            className="font-light leading-relaxed mb-14"
            style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}
          >
            Cada guante HandLove está fabricado y auditado bajo los estándares internacionales más
            exigentes — desde la fibra hasta el recubrimiento final.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              whileHover="hover"
              style={{ position: 'relative' }}
            >
              <motion.div
                variants={{ hover: { borderColor: '#CD0032', backgroundColor: 'rgba(205,0,50,0.05)' } }}
                transition={{ duration: 0.22 }}
                style={{
                  border: '1px solid rgba(250,251,252,0.1)',
                  padding: '36px 28px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {/* Ícono SVG */}
                <div style={{ width: '52px', height: '52px', marginBottom: '20px' }}>
                  {cert.icon}
                </div>

                {/* Acrónimo grande */}
                <p
                  className="font-black uppercase leading-none tracking-tight mb-1"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
                >
                  {cert.acronym}
                </p>

                {/* Detail chip */}
                <p
                  className="uppercase tracking-wider font-bold mb-4"
                  style={{ color: '#CD0032', fontSize: '0.6rem' }}
                >
                  {cert.detail}
                </p>

                {/* Nombre largo */}
                <p
                  className="font-medium mb-3"
                  style={{ color: 'rgba(250,251,252,0.55)', fontSize: '0.72rem', lineHeight: 1.5 }}
                >
                  {cert.name}
                </p>

                {/* Separador */}
                <motion.div
                  style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.08)', margin: '8px 0 14px' }}
                  variants={{ hover: { backgroundColor: 'rgba(205,0,50,0.3)' } }}
                />

                {/* Descripción */}
                <p
                  className="font-light leading-relaxed"
                  style={{ color: 'rgba(250,251,252,0.38)', fontSize: '0.78rem' }}
                >
                  {cert.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 9. CTA ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
        variants={SECTION_VARIANTS}
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
          <motion.a
            href="/#contacto"
            className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-10 py-4 mt-4"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', borderRadius: '6px', textDecoration: 'none' }}
            whileHover={{ backgroundColor: '#a80029', scale: 1.03 }}
            transition={{ duration: 0.22 }}
          >
            Solicitar presupuesto
          </motion.a>
        </FadeIn>
      </motion.section>

    </motion.div>
  )
}
