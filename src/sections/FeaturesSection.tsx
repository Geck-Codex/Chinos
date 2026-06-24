import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const FEATURES = [
  {
    id: 'versatile',
    num: '01',
    name: 'Colecciones versátiles',
    desc: 'Más de 100 tipos de guantes — cuero, caucho y fibra — para cubrir cualquier necesidad industrial.',
  },
  {
    id: 'production',
    num: '02',
    name: 'Producción masiva',
    desc: '500 máquinas de última generación. 30 millones de docenas exportados cada año a múltiples países.',
  },
  {
    id: 'applications',
    num: '03',
    name: 'Diferentes aplicaciones',
    desc: 'Resistencia a químicos, cortes y calor. Diseñados para el trabajo real, no para el catálogo.',
  },
]

type Feature = typeof FEATURES[0]

// ─── Bento images ─────────────────────────────────────────────────────────────

const OVERLAY = 'rgba(8,4,3,0.52)'

function BentoImages({ feature }: { feature: Feature }) {
  return (
    <div className="flex gap-2 md:gap-3" style={{ height: 'clamp(180px, 28vw, 320px)' }}>
      {/* Image 1 — widest, full height */}
      <div className="flex-[2] relative overflow-hidden" style={{ backgroundColor: '#111' }}>
        <img
          src={`/images/features/${feature.id}-1.webp`}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: OVERLAY }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(205,0,50,0.18) 0%, transparent 55%)' }}
        />
        <span
          className="absolute bottom-3 left-4 font-black uppercase tracking-widest"
          style={{ color: 'rgba(250,251,252,0.35)', fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}
        >
          {feature.name}
        </span>
      </div>

      {/* Image 2 — medium, full height */}
      <div className="flex-[1.2] relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
        <img
          src={`/images/features/${feature.id}-2.webp`}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: OVERLAY }} />
      </div>

      {/* Image 3 — más angosta y más corta (bento offset) */}
      <div
        className="flex-[1] relative overflow-hidden self-end"
        style={{ backgroundColor: '#0a0a0a', height: '72%' }}
      >
        <img
          src={`/images/features/${feature.id}-3.webp`}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: OVERLAY }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(8,4,3,0.5) 0%, transparent 60%)' }}
        />
      </div>
    </div>
  )
}

// ─── Feature row ─────────────────────────────────────────────────────────────

function FeatureRow({
  feature,
  isActive,
  isDark,
  onEnter,
}: {
  feature: Feature
  isActive: boolean
  isDark: boolean
  onEnter: () => void
}) {
  const textColor = isDark ? '#FAFBFC' : '#080403'
  const borderColor = isDark ? 'rgba(250,251,252,0.1)' : 'rgba(8,4,3,0.1)'

  return (
    <div onMouseEnter={onEnter} style={{ borderTop: `1px solid ${borderColor}`, cursor: 'default' }}>
      {/* Title row */}
      <div className="flex items-center gap-6 md:gap-10 py-6 md:py-7 cursor-default select-none">
        <motion.span
          animate={{ color: isActive ? '#CD0032' : borderColor }}
          transition={{ duration: 0.3 }}
          className="font-black tabular-nums flex-shrink-0"
          style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', minWidth: '2rem' }}
        >
          {feature.num}
        </motion.span>

        <motion.h3
          animate={{ color: textColor }}
          transition={{ duration: 0.3 }}
          className="font-black uppercase flex-1 leading-none tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 5rem)' }}
        >
          {feature.name}
        </motion.h3>

        <motion.div
          animate={{ rotate: isActive ? 90 : 0, color: isActive ? '#CD0032' : textColor }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex-shrink-0"
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="pb-10"
            >
              <p
                className="font-light leading-relaxed mb-7 max-w-xl"
                style={{
                  color: 'rgba(250,251,252,0.5)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                }}
              >
                {feature.desc}
              </p>
              <BentoImages feature={feature} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  const [active, setActive] = useState<string | null>(null)
  const isDark = active !== null

  return (
    <motion.section
      id="caracteristicas"
      className="px-8 md:px-16 py-16 md:py-24"
      animate={{ backgroundColor: isDark ? '#080403' : '#FAFBFC' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Header compact */}
      <div className="mb-5 md:mb-7">
        <motion.p
          animate={{ color: isDark ? 'rgba(205,0,50,0.7)' : '#CD0032' }}
          transition={{ duration: 0.4 }}
          className="uppercase tracking-[0.28em] font-bold"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
        >
          Características principales
        </motion.p>
      </div>

      {/* Feature list */}
      <div onMouseLeave={() => setActive(null)}>
        {FEATURES.map((f) => (
          <FeatureRow
            key={f.num}
            feature={f}
            isActive={active === f.num}
            isDark={isDark}
            onEnter={() => setActive(f.num)}
          />
        ))}
        {/* Bottom border */}
        <motion.div
          animate={{ borderColor: isDark ? 'rgba(250,251,252,0.1)' : 'rgba(8,4,3,0.1)' }}
          style={{ borderTop: '1px solid' }}
        />
      </div>
    </motion.section>
  )
}
