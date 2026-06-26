import { motion } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { useInViewOnce } from '../components/useInViewOnce'

const EASE = [0.22, 1, 0.36, 1] as const

const CONTACTS = [
  { num: '01', phone: '+52 614 688 8300' },
]

const TRUST = [
  { value: '< 24h', label: 'Tiempo de respuesta' },
  { value: 'Lun a Vie · 9am – 5pm', label: 'Horario de atención' },
  { value: '100%', label: 'Respuesta garantizada' },
]

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function TrustRow({ t, i }: { t: (typeof TRUST)[number]; i: number }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>()
  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-between py-4"
      style={{ borderBottom: '1px solid rgba(250,251,252,0.08)' }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
    >
      <p
        className="uppercase tracking-wider font-bold"
        style={{ color: 'rgba(250,251,252,0.35)', fontSize: '0.62rem' }}
      >
        {t.label}
      </p>
      <p
        className="font-black uppercase"
        style={{ color: '#FAFBFC', fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}
      >
        {t.value}
      </p>
    </motion.div>
  )
}

function ContactCard({ c, i }: { c: (typeof CONTACTS)[number]; i: number }) {
  const [ref, inView] = useInViewOnce<HTMLAnchorElement>()
  return (
    <motion.a
      ref={ref}
      href={`tel:${c.phone.replace(/\s+/g, '')}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: EASE }}
      whileHover="hover"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <motion.div
        variants={{
          hover: { borderColor: '#CD0032', backgroundColor: 'rgba(205,0,50,0.05)' },
        }}
        transition={{ duration: 0.22 }}
        style={{
          border: '1px solid rgba(250,251,252,0.12)',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          cursor: 'pointer',
          transition: 'border-color 0.22s, background-color 0.22s',
        }}
      >
        <div>
          <p
            className="uppercase tracking-[0.2em] font-bold mb-2"
            style={{ color: 'rgba(250,251,252,0.3)', fontSize: '0.58rem' }}
          >
            Línea telefónica
          </p>
          <p
            className="font-black tabular-nums"
            style={{ color: '#FAFBFC', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', letterSpacing: '0.02em' }}
          >
            {c.phone}
          </p>
          <p
            className="uppercase tracking-[0.18em] font-bold mt-2"
            style={{ color: '#CD0032', fontSize: '0.56rem' }}
          >
            Solo llamadas · No WhatsApp
          </p>
        </div>

        <motion.div
          variants={{ hover: { scale: 1.12, color: '#CD0032' } }}
          transition={{ duration: 0.22 }}
          style={{ color: 'rgba(250,251,252,0.35)', flexShrink: 0 }}
        >
          <PhoneIcon />
        </motion.div>
      </motion.div>
    </motion.a>
  )
}

export function CTASection() {
  return (
    <section
      id="contacto"
      style={{
        backgroundColor: '#080403',
        borderTop: '1px solid rgba(250,251,252,0.08)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '600px' }}>

        {/* ── Lado izquierdo: copy ── */}
        <div
          className="flex flex-col justify-center px-10 md:px-16 py-20 lg:py-28"
          style={{ borderRight: '1px solid rgba(250,251,252,0.07)' }}
        >
          <FadeIn y={0} duration={0.9}>
            <p
              className="uppercase tracking-[0.28em] font-bold mb-2"
              style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
            >
              Hablemos
            </p>
          </FadeIn>

          <RevealText
            lines={['Cotiza hoy,', 'protege siempre']}
            as="h2"
            className="font-black uppercase leading-[0.92] tracking-tight mb-8"
            style={{ color: '#FAFBFC', fontSize: 'clamp(2.6rem, 5.5vw, 6.5rem)' }}
            delay={0.05}
          />

          <FadeIn y={20} delay={0.2}>
            <p
              className="font-light leading-relaxed mb-12"
              style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '400px' }}
            >
              Solicita tu cotización por volumen o una muestra de cualquiera
              de nuestros modelos. Respondemos en menos de 24 horas.
            </p>
          </FadeIn>

          {/* Trust indicators */}
          <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(250,251,252,0.08)' }}>
            {TRUST.map((t, i) => (
              <TrustRow key={t.label} t={t} i={i} />
            ))}
          </div>
        </div>

        {/* ── Lado derecho: tarjetas de contacto ── */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 lg:py-28 gap-5">
          <FadeIn y={20} delay={0.1}>
            <p
              className="uppercase tracking-[0.22em] font-bold mb-6"
              style={{ color: 'rgba(250,251,252,0.3)', fontSize: '0.62rem' }}
            >
              Canales de atención
            </p>
          </FadeIn>

          {CONTACTS.map((c, i) => (
            <ContactCard key={c.num} c={c} i={i} />
          ))}

          {/* Nota al pie */}
          <FadeIn y={10} delay={0.45}>
            <p
              className="uppercase tracking-wider font-bold mt-2"
              style={{ color: 'rgba(250,251,252,0.2)', fontSize: '0.6rem' }}
            >
              · Línea exclusiva para llamadas · Lun a Vie de 9am a 5pm ·
            </p>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
