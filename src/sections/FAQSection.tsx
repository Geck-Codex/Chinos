import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'


const FAQS = [
  {
    q: '¿Sus guantes están en stock o son hechos a medida?',
    a: 'Ofrecemos soluciones tanto en stock como a medida, lo que le permite elegir entre nuestra amplia gama o adaptarlas a sus necesidades específicas.',
  },
  {
    q: '¿Cuál es la cantidad mínima de pedido (MOQ)?',
    a: 'El MOQ varía según el tipo de guante y el nivel de personalización. Contáctanos para obtener información específica para tu pedido.',
  },
  {
    q: '¿Cuál es el plazo de entrega de los pedidos?',
    a: 'Los plazos de entrega dependen del volumen y la personalización requerida. Consulta con nuestro equipo para conocer los tiempos exactos para tu caso.',
  },
  {
    q: '¿Qué tipo de soporte postventa ofrecen?',
    a: 'Ofrecemos soporte completo postventa: seguimiento de pedidos, atención a reclamaciones y asesoría técnica para garantizar tu satisfacción.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      className="px-8 md:px-16 py-24 md:py-36"
      style={{ backgroundColor: '#FAFBFC' }}
    >
      <FadeIn y={20}>
        <p
          className="uppercase tracking-[0.2em] font-black mb-3"
          style={{ color: '#CD0032', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
        >
          Tenemos las respuestas
        </p>
      </FadeIn>
      <RevealText
        lines={['Preguntas', 'frecuentes']}
        className="font-black uppercase leading-none tracking-tight mb-20 md:mb-28"
        style={{ color: '#080403', fontSize: 'clamp(3.5rem, 12vw, 15rem)' }}
        delay={0.05}
      />

      <div className="max-w-4xl">
        {FAQS.map((faq, i) => (
          <FadeIn key={i} delay={i * 0.07} y={20}>
            <div
              style={{
                borderBottom: '1px solid rgba(8,4,3,0.1)',
                borderTop: i === 0 ? '1px solid rgba(8,4,3,0.1)' : 'none',
              }}
            >
              <button
                className="w-full flex justify-between items-center py-6 md:py-8 text-left gap-6 cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-black uppercase leading-snug"
                  style={{ color: '#080403', fontSize: 'clamp(0.9rem, 1.7vw, 1.3rem)' }}
                >
                  {faq.q}
                </span>
                {open === i
                  ? <Minus size={18} style={{ color: '#CD0032', flexShrink: 0 }} />
                  : <Plus size={18} style={{ color: '#CD0032', flexShrink: 0 }} />
                }
              </button>
              {open === i && (
                <p
                  className="pb-7 font-light leading-relaxed"
                  style={{ color: '#080403', opacity: 0.6, fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
