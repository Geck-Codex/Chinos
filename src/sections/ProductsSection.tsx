import { useState, Suspense, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { GloveModel } from '../components/GloveModel'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'

const EASE = [0.22, 1, 0.36, 1] as const

const PRODUCTS = [
  {
    id: 'multiflex',
    num: '01',
    name: 'Multiflex Pro',
    category: 'Protección General',
    description: 'Guante multipropósito con recubrimiento de nitrilo espuma para máximo agarre y durabilidad en entornos industriales exigentes.',
    primaryColor: '#CD0032',
    palmColor: '#8B001E',
    cuffColor: '#4A0010',
    accentGlow: 'rgba(205,0,50,0.22)',
    specs: [
      { label: 'Norma', value: 'EN 388:2016' },
      { label: 'Material', value: 'Nitrilo Espuma' },
      { label: 'Resistencia', value: 'Nivel 4' },
      { label: 'Calibre', value: '13G' },
    ],
  },
  {
    id: 'titan',
    num: '02',
    name: 'Titan Cut 5',
    category: 'Anticorte',
    description: 'Protección anticorte Nivel F con fibra HPPE certificada. Diseñado para la industria metalmecánica y manufactura de alto riesgo.',
    primaryColor: '#2C4A7C',
    palmColor: '#1A2E52',
    cuffColor: '#0D1A33',
    accentGlow: 'rgba(44,74,124,0.25)',
    specs: [
      { label: 'Norma', value: 'EN ISO 21420' },
      { label: 'Material', value: 'HPPE + Fibra' },
      { label: 'Anticorte', value: 'Nivel F' },
      { label: 'Calibre', value: '15G' },
    ],
  },
  {
    id: 'chemshield',
    num: '03',
    name: 'ChemShield',
    category: 'Protección Química',
    description: 'Barrera química certificada contra solventes, aceites y agentes corrosivos. Indispensable en la industria química y farmacéutica.',
    primaryColor: '#2A6B40',
    palmColor: '#174228',
    cuffColor: '#0A2214',
    accentGlow: 'rgba(42,107,64,0.25)',
    specs: [
      { label: 'Norma', value: 'EN 374-2:2020' },
      { label: 'Material', value: 'Caucho Natural' },
      { label: 'Grosor', value: '0.35mm' },
      { label: 'Largo', value: '310mm' },
    ],
  },
]

type Product = typeof PRODUCTS[0]

// ─── Modal ──────────────────────────────────────────────────────────────────

function Modal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[998]"
        style={{ backgroundColor: 'rgba(8,4,3,0.92)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col lg:flex-row overflow-hidden"
        style={{ backgroundColor: '#080403' }}
        initial={{ clipPath: 'inset(4% 3% round 12px)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% round 0px)', opacity: 1 }}
        exit={{ clipPath: 'inset(4% 3% round 12px)', opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Color atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 70% at 28% 50%, ${product.accentGlow}, transparent 62%)`,
          }}
        />

        {/* ── LEFT: 3D canvas ── */}
        <motion.div
          className="relative w-full lg:w-[58%] h-[42vh] lg:h-full flex-shrink-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          {/* Huge ghost number */}
          <span
            className="absolute bottom-2 left-4 font-black leading-none select-none pointer-events-none"
            style={{ color: 'rgba(250,251,252,0.035)', fontSize: 'clamp(9rem, 20vw, 20rem)' }}
          >
            {product.num}
          </span>

          <Canvas
            camera={{ position: [0, 0.2, 3.2], fov: 44 }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.28} />
            <directionalLight position={[3.5, 5, 3]} intensity={2.8} color="#FAFBFC" />
            <directionalLight position={[-2.5, -2, 1.5]} intensity={0.9} color={product.primaryColor} />
            <directionalLight position={[0, 3, -5]} intensity={0.5} color="#FAFBFC" />
            <pointLight position={[0, 5, 1]} intensity={22} color="#FAFBFC" />
            <Suspense fallback={null}>
              <GloveModel
                primaryColor={product.primaryColor}
                palmColor={product.palmColor}
                cuffColor={product.cuffColor}
                rotationSpeed={0.55}
              />
              <ContactShadows position={[0, -2.2, 0]} opacity={0.3} scale={5} blur={3} color={product.primaryColor} />
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* ── RIGHT: info panel ── */}
        <motion.div
          className="relative flex-1 flex flex-col justify-center px-9 lg:px-14 py-10 lg:py-16 overflow-y-auto"
          style={{ borderLeft: '1px solid rgba(250,251,252,0.07)' }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          {/* Category */}
          <motion.p
            className="uppercase tracking-[0.24em] font-bold mb-2"
            style={{ color: '#CD0032', fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5, ease: EASE }}
          >
            {product.category}
          </motion.p>

          {/* Product name — line reveal */}
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-black uppercase leading-none tracking-tight"
              style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.3, duration: 0.75, ease: EASE }}
            >
              {product.name}
            </motion.h2>
          </div>

          {/* Animated divider */}
          <motion.div
            style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.1)', originX: 0, marginBottom: '22px' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
          />

          {/* Description */}
          <motion.p
            className="font-light leading-relaxed mb-10"
            style={{ color: '#FAFBFC', opacity: 0.52, fontSize: 'clamp(0.85rem, 1.3vw, 1.02rem)', maxWidth: '420px' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.52, y: 0 }}
            transition={{ delay: 0.46, duration: 0.55, ease: EASE }}
          >
            {product.description}
          </motion.p>

          {/* Specs label */}
          <motion.p
            className="uppercase tracking-[0.24em] font-bold mb-5"
            style={{ color: 'rgba(250,251,252,0.28)', fontSize: '0.6rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52, duration: 0.4 }}
          >
            Especificaciones técnicas
          </motion.p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-12">
            {product.specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                style={{ borderTop: '1px solid rgba(250,251,252,0.1)', paddingTop: '10px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.56 + i * 0.08, duration: 0.45, ease: EASE }}
              >
                <p
                  className="uppercase tracking-wider font-bold mb-1"
                  style={{ color: 'rgba(250,251,252,0.38)', fontSize: '0.58rem' }}
                >
                  {spec.label}
                </p>
                <p
                  className="font-black uppercase"
                  style={{ color: '#FAFBFC', fontSize: 'clamp(1rem, 1.9vw, 1.35rem)' }}
                >
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#contacto"
            onClick={onClose}
            className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-9 py-4 self-start"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.68rem, 1.05vw, 0.8rem)', textDecoration: 'none' }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.5, ease: EASE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
          >
            Solicitar muestra
            <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        {/* Close button */}
        <motion.button
          className="absolute top-5 right-5 z-10 flex items-center justify-center"
          style={{
            width: '44px',
            height: '44px',
            border: '1px solid rgba(250,251,252,0.15)',
            backgroundColor: 'rgba(8,4,3,0.6)',
            color: '#FAFBFC',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
          transition={{ delay: 0.28, duration: 0.38, ease: EASE }}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#CD0032'
            e.currentTarget.style.borderColor = '#CD0032'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(8,4,3,0.6)'
            e.currentTarget.style.borderColor = 'rgba(250,251,252,0.15)'
          }}
        >
          <X size={17} />
        </motion.button>
      </motion.div>
    </>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  return (
    <FadeIn delay={index * 0.14} y={60}>
      <motion.div
        className="relative overflow-hidden"
        style={{
          height: '540px',
          backgroundColor: '#0D0806',
          border: '1px solid rgba(250,251,252,0.07)',
          cursor: 'pointer',
        }}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12 }}
      >
        {/* Subtle product-colored glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 50% at 50% 38%, ${product.accentGlow}, transparent 68%)`,
            opacity: 0.6,
          }}
        />

        {/* Number + explorar hint */}
        <div className="absolute top-5 left-6 right-6 flex justify-between items-start pointer-events-none">
          <span
            className="font-black leading-none"
            style={{ color: 'rgba(250,251,252,0.12)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            {product.num}
          </span>
          <span
            className="flex items-center gap-1 uppercase tracking-[0.18em] font-bold"
            style={{ color: 'rgba(250,251,252,0.2)', fontSize: '0.58rem' }}
          >
            Explorar <ArrowUpRight size={10} />
          </span>
        </div>

        {/* 3D Canvas — pointer-events none so click passes to card */}
        <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
          <Canvas
            camera={{ position: [0, 0.2, 3.4], fov: 44 }}
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.28} />
            <directionalLight position={[3.5, 5, 3]} intensity={2.8} color="#FAFBFC" />
            <directionalLight position={[-2.5, -2, 1.5]} intensity={0.7} color={product.primaryColor} />
            <directionalLight position={[0, 3, -5]} intensity={0.5} color="#FAFBFC" />
            <pointLight position={[0, 5, 1]} intensity={18} color="#FAFBFC" />
            <Suspense fallback={null}>
              <GloveModel
                primaryColor={product.primaryColor}
                palmColor={product.palmColor}
                cuffColor={product.cuffColor}
                rotationSpeed={0.38}
              />
              <ContactShadows position={[0, -2.2, 0]} opacity={0.25} scale={5} blur={3} color={product.primaryColor} />
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>
        </div>

        {/* Bottom info */}
        <div
          className="absolute bottom-0 left-0 right-0 px-7 pb-7 pt-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(13,8,6,0.97) 55%, transparent)' }}
        >
          <p
            className="uppercase tracking-[0.2em] font-bold mb-1.5"
            style={{ color: '#CD0032', fontSize: '0.66rem' }}
          >
            {product.category}
          </p>
          <h3
            className="font-black uppercase leading-none"
            style={{ color: '#FAFBFC', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}
          >
            {product.name}
          </h3>
        </div>
      </motion.div>
    </FadeIn>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function ProductsSection() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <>
      <section
        id="productos"
        className="px-8 md:px-16 py-24 md:py-36"
        style={{ backgroundColor: '#080403' }}
      >
        <FadeIn y={20}>
          <p
            className="uppercase tracking-[0.2em] font-black mb-3"
            style={{ color: '#CD0032', fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
          >
            Catálogo
          </p>
        </FadeIn>
        <RevealText
          lines={['Equipamiento', 'de élite']}
          className="font-black uppercase leading-none tracking-tight mb-16 md:mb-24"
          style={{ color: '#FAFBFC', fontSize: 'clamp(3.5rem, 12vw, 15rem)' }}
          delay={0.05}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onClick={() => setSelected(product)}
            />
          ))}
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
