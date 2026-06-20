import { motion } from 'framer-motion'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'

const EASE = [0.22, 1, 0.36, 1] as const

const CONTACTS = [
  { num: '01', phone: '+52 614 486 4571', wa: 'https://wa.me/5216144864571' },
  { num: '02', phone: '+52 614 247 3625', wa: 'https://wa.me/5216142473625' },
]

const TRUST = [
  { value: '< 24h', label: 'Tiempo de respuesta' },
  { value: 'Lun – Vie', label: 'Horario de atención' },
  { value: '100%', label: 'Respuesta garantizada' },
]

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
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
              className="uppercase tracking-[0.28em] font-bold mb-4"
              style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
            >
              Hablemos
            </p>
          </FadeIn>

          <RevealText
            lines={['Cotiza hoy,', 'protege mañana']}
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
              Solicita tu presupuesto por volumen o una muestra sin costo.
              Respondemos en menos de 24 horas.
            </p>
          </FadeIn>

          {/* Trust indicators */}
          <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(250,251,252,0.08)' }}>
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: '1px solid rgba(250,251,252,0.08)' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
            <motion.a
              key={c.num}
              href={c.wa}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                    Asesor {c.num}
                  </p>
                  <p
                    className="font-black tabular-nums"
                    style={{ color: '#FAFBFC', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', letterSpacing: '0.02em' }}
                  >
                    {c.phone}
                  </p>
                </div>

                <motion.div
                  variants={{ hover: { scale: 1.12, color: '#CD0032' } }}
                  transition={{ duration: 0.22 }}
                  style={{ color: 'rgba(250,251,252,0.35)', flexShrink: 0 }}
                >
                  <WhatsAppIcon />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}

          {/* Nota al pie */}
          <FadeIn y={10} delay={0.45}>
            <p
              className="uppercase tracking-wider font-bold mt-2"
              style={{ color: 'rgba(250,251,252,0.2)', fontSize: '0.6rem' }}
            >
              · Contáctanos por WhatsApp para una respuesta inmediata ·
            </p>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
