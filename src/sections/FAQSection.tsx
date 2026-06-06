import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'

const EASE = [0.22, 1, 0.36, 1] as const

const FAQS = [
  {
    num: '01',
    q: '¿Sus guantes están en stock o son hechos a medida?',
    a: 'Ofrecemos soluciones tanto en stock como a medida, lo que le permite elegir entre nuestra amplia gama o adaptarlas a sus necesidades específicas.',
  },
  {
    num: '02',
    q: '¿Cuál es la cantidad mínima de pedido (MOQ)?',
    a: 'El MOQ varía según el tipo de guante y el nivel de personalización. Contáctanos para obtener información específica para tu pedido.',
  },
  {
    num: '03',
    q: '¿Cuál es el plazo de entrega de los pedidos?',
    a: 'Los plazos de entrega dependen del volumen y la personalización requerida. Consulta con nuestro equipo para conocer los tiempos exactos para tu caso.',
  },
  {
    num: '04',
    q: '¿Qué tipo de soporte postventa ofrecen?',
    a: 'Ofrecemos soporte completo postventa: seguimiento de pedidos, atención a reclamaciones y asesoría técnica para garantizar tu satisfacción.',
  },
]

export function FAQSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.28em] font-bold mb-10 md:mb-14"
          style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
        >
          Tenemos las respuestas
        </p>
      </FadeIn>

      {/* ── Desktop: dos columnas ── */}
      <div
        className="hidden lg:flex"
        style={{ border: '1px solid rgba(8,4,3,0.1)' }}
        onMouseLeave={() => setActive(null)}
      >
        {/* Preguntas */}
        <div className="flex-[0_0_55%]">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.num}
              onMouseEnter={() => setActive(i)}
              animate={{ backgroundColor: active === i ? 'rgba(8,4,3,0.04)' : 'transparent' }}
              transition={{ duration: 0.25 }}
              style={{ borderBottom: '1px solid rgba(8,4,3,0.1)', cursor: 'default' }}
            >
              <div className="flex items-center gap-6 px-8 py-7 select-none">
                <motion.span
                  animate={{ color: active === i ? '#CD0032' : 'rgba(8,4,3,0.25)' }}
                  transition={{ duration: 0.25 }}
                  className="font-black tabular-nums flex-shrink-0"
                  style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', minWidth: '2rem' }}
                >
                  {faq.num}
                </motion.span>
                <motion.span
                  animate={{ color: active === i ? '#080403' : 'rgba(8,4,3,0.7)' }}
                  transition={{ duration: 0.25 }}
                  className="font-black uppercase flex-1 leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
                >
                  {faq.q}
                </motion.span>
                <motion.div
                  animate={{ rotate: active === i ? 90 : 0, color: active === i ? '#CD0032' : 'rgba(8,4,3,0.3)' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex-shrink-0"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Panel respuesta — sin fondo, desliza desde derecha */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            borderLeft: '1px solid rgba(8,4,3,0.1)',
            minHeight: 'clamp(220px, 28vw, 340px)',
          }}
        >
          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.div
                key={active}
                initial={{ x: 48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="absolute inset-0 flex flex-col justify-center px-10 md:px-14 py-10"
              >
                <span
                  className="font-black tabular-nums mb-6"
                  style={{ color: '#CD0032', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
                >
                  {FAQS[active].num}
                </span>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: 'rgba(8,4,3,0.6)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '420px' }}
                >
                  {FAQS[active].a}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p
                  className="uppercase tracking-[0.28em] font-bold"
                  style={{ color: 'rgba(8,4,3,0.15)', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
                >
                  Pasa el cursor sobre una pregunta
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: accordion igual que FeaturesSection ── */}
      <div className="lg:hidden" onMouseLeave={() => setActive(null)}>
        {FAQS.map((faq, i) => (
          <div
            key={faq.num}
            onClick={() => setActive(active === i ? null : i)}
            style={{ borderTop: '1px solid rgba(8,4,3,0.1)', cursor: 'default' }}
          >
            <div className="flex items-center gap-5 py-6 select-none">
              <motion.span
                animate={{ color: active === i ? '#CD0032' : 'rgba(8,4,3,0.25)' }}
                transition={{ duration: 0.3 }}
                className="font-black tabular-nums flex-shrink-0"
                style={{ fontSize: '0.8rem', minWidth: '2rem' }}
              >
                {faq.num}
              </motion.span>
              <span
                className="font-black uppercase flex-1 leading-tight"
                style={{ color: '#080403', fontSize: 'clamp(1rem, 5vw, 1.4rem)' }}
              >
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: active === i ? 90 : 0, color: active === i ? '#CD0032' : '#080403' }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex-shrink-0"
              >
                <ArrowRight size={18} />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {active === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: EASE }}
                    className="pb-7 font-light leading-relaxed"
                    style={{ color: 'rgba(8,4,3,0.6)', fontSize: 'clamp(1rem, 4vw, 1.1rem)' }}
                  >
                    {faq.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(8,4,3,0.1)' }} />
      </div>
    </section>
  )
}
