import { useState, Suspense, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { GloveModel } from '../components/GloveModel'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'

const EASE = [0.22, 1, 0.36, 1] as const

const PRODUCTS = [
  {
    id: 'ultra-grip',
    num: '01',
    name: 'Dexterity Ultra Grip',
    category: 'Alta Destreza / Agarre',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo liso. Agarre confiable y comodidad durante jornadas prolongadas para industria automotriz, logística y manufactura ligera.',
    primaryColor: '#CD0032',
    palmColor: '#8B001E',
    cuffColor: '#111111',
    accentGlow: 'rgba(205,0,50,0.22)',
    specs: [
      { label: 'Material', value: 'Poliéster' },
      { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo liso' },
      { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'poly-sand',
    num: '02',
    name: 'Dexterity Poly Sand',
    category: 'Agarre Superior',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo arenoso. Excelente agarre y alta destreza para ensamblaje, mantenimiento y manejo de herramientas manuales.',
    primaryColor: '#8B001E',
    palmColor: '#1a1a1a',
    cuffColor: '#CD0032',
    accentGlow: 'rgba(139,0,30,0.25)',
    specs: [
      { label: 'Material', value: 'Poliéster' },
      { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' },
      { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'nanoflex',
    num: '03',
    name: 'Dexterity Nanoflex',
    category: 'Precisión Táctil',
    description: 'Guante premium de nylon calibre 18 con palma recubierta de nitrilo microespumado. Máxima sensibilidad táctil y agarre confiable para electrónica, ensamblaje e inspección de calidad.',
    primaryColor: '#6B7A8D',
    palmColor: '#3D4A5C',
    cuffColor: '#252E3A',
    accentGlow: 'rgba(107,122,141,0.22)',
    specs: [
      { label: 'Material', value: 'Nylon' },
      { label: 'Calibre', value: '18G' },
      { label: 'Recubrimiento', value: 'Nitrilo microespumado' },
      { label: 'EN388', value: '4121' },
    ],
  },
]

const CATALOG = [
  { id: 'edge-lite-a4', name: 'Edge Lite A4', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Rec. Poliuretano', 'ANSI CUT A4'], accentColor: '#2C4A7C' },
  { id: 'edge-lite-a3', name: 'Edge Lite A3', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Rec. Poliuretano', 'ANSI CUT A3'], accentColor: '#2C4A7C' },
  { id: 'edge-plus-a7', name: 'Edge Plus A7', category: 'Anticorte Premium', tags: ['HPPE · Cal.13', 'Nitrilo arenoso', 'ANSI CUT A7'], accentColor: '#1A3A6A' },
  { id: 'edge-plus-a3', name: 'Edge Plus A3', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Nitrilo arenoso', 'ANSI CUT A3'], accentColor: '#1A3A6A' },
  { id: 'lite-pu-gris', name: 'Lite PU Gris', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#4A5568' },
  { id: 'lite-pu-blanco', name: 'Lite PU Blanco', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#718096' },
  { id: 'lite-pu-black', name: 'Lite PU Black', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#2D3748' },
  { id: 'lite-cotton-60', name: 'Lite Cotton 60gr', category: 'Uso General', tags: ['Algodón · 60g', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#7A6545' },
  { id: 'lite-cotton-70', name: 'Lite Cotton 70gr', category: 'Uso General', tags: ['Algodón · 70g', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#7A6545' },
  { id: 'lite-nylon-100', name: 'Lite Nylon 100', category: 'Precisión Táctil', tags: ['Nylon · Cal.13', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#3D6B4F' },
]

type Product = typeof PRODUCTS[0]

// ─── Modal ───────────────────────────────────────────────────────────────────

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
      <motion.div
        className="fixed inset-0 z-[998]"
        style={{ backgroundColor: 'rgba(8,4,3,0.85)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col lg:flex-row overflow-hidden"
        style={{ backgroundColor: '#080403' }}
        initial={{ clipPath: 'inset(4% 3% round 12px)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% round 0px)', opacity: 1 }}
        exit={{ clipPath: 'inset(4% 3% round 12px)', opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 55% 70% at 28% 50%, ${product.accentGlow}, transparent 62%)`, opacity: 0.35 }} />

        {/* 3D canvas */}
        <motion.div
          className="relative w-full lg:w-[58%] h-[42vh] lg:h-full flex-shrink-0"
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <span className="absolute bottom-2 left-4 font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(250,251,252,0.035)', fontSize: 'clamp(9rem, 20vw, 20rem)' }}>
            {product.num}
          </span>
          <Canvas camera={{ position: [0, 0.2, 3.2], fov: 44 }} dpr={[1, 1.5]} frameloop="always" gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.28} />
            <directionalLight position={[3.5, 5, 3]} intensity={2.8} color="#FAFBFC" />
            <directionalLight position={[-2.5, -2, 1.5]} intensity={0.9} color={product.primaryColor} />
            <directionalLight position={[0, 3, -5]} intensity={0.5} color="#FAFBFC" />
            <pointLight position={[0, 5, 1]} intensity={22} color="#FAFBFC" />
            <Suspense fallback={null}>
              <GloveModel primaryColor={product.primaryColor} palmColor={product.palmColor} cuffColor={product.cuffColor} rotationSpeed={0.55} />
              <ContactShadows position={[0, -2.2, 0]} opacity={0.3} scale={5} blur={3} color={product.primaryColor} />
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Info panel */}
        <motion.div
          className="relative flex-1 flex flex-col justify-center px-9 lg:px-14 py-10 lg:py-16 overflow-y-auto"
          style={{ borderLeft: '1px solid rgba(250,251,252,0.07)' }}
          initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <motion.p className="uppercase tracking-[0.24em] font-bold mb-2" style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.5, ease: EASE }}>
            {product.category}
          </motion.p>
          <div className="overflow-hidden mb-5">
            <motion.h2 className="font-black uppercase leading-none tracking-tight" style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.3, duration: 0.75, ease: EASE }}>
              {product.name}
            </motion.h2>
          </div>
          <motion.div style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.1)', originX: 0, marginBottom: '22px' }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.42, duration: 0.55, ease: EASE }} />
          <motion.p className="font-light leading-relaxed mb-10" style={{ color: '#FAFBFC', opacity: 0.52, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '420px' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 0.52, y: 0 }} transition={{ delay: 0.46, duration: 0.55, ease: EASE }}>
            {product.description}
          </motion.p>
          <motion.p className="uppercase tracking-[0.24em] font-bold mb-5" style={{ color: 'rgba(250,251,252,0.28)', fontSize: '0.6rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52, duration: 0.4 }}>
            Especificaciones técnicas
          </motion.p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-12">
            {product.specs.map((spec, i) => (
              <motion.div key={spec.label} style={{ borderTop: '1px solid rgba(250,251,252,0.1)', paddingTop: '10px' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.56 + i * 0.08, duration: 0.45, ease: EASE }}>
                <p className="uppercase tracking-wider font-bold mb-1" style={{ color: 'rgba(250,251,252,0.38)', fontSize: '0.58rem' }}>{spec.label}</p>
                <p className="font-black uppercase" style={{ color: '#FAFBFC', fontSize: 'clamp(1rem, 1.9vw, 1.35rem)' }}>{spec.value}</p>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="#contacto" onClick={onClose}
            className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-9 py-4 self-start"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', textDecoration: 'none', borderRadius: '6px' }}
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.5, ease: EASE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
          >
            Solicitar muestra <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

        <motion.button
          className="absolute top-5 right-5 z-10 flex items-center justify-center"
          style={{ width: '44px', height: '44px', border: '1px solid rgba(250,251,252,0.15)', backgroundColor: 'rgba(8,4,3,0.6)', color: '#FAFBFC', cursor: 'pointer' }}
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
          transition={{ delay: 0.28, duration: 0.38, ease: EASE }}
          onClick={onClose}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#CD0032'; e.currentTarget.style.borderColor = '#CD0032' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(8,4,3,0.6)'; e.currentTarget.style.borderColor = 'rgba(250,251,252,0.15)' }}
        >
          <X size={17} />
        </motion.button>
      </motion.div>
    </>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  return (
    <FadeIn delay={index * 0.14} y={60}>
      <motion.div
        className="relative overflow-hidden"
        style={{ height: 'clamp(260px, 55vw, 540px)', backgroundColor: '#0D0806', border: '1px solid rgba(250,251,252,0.07)', cursor: 'pointer' }}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 65% 55% at 50% 38%, ${product.accentGlow}, transparent 68%)`, opacity: 0.28 }} />

        <div className="absolute top-5 left-6 right-6 flex justify-between items-start pointer-events-none">
          <span className="font-black leading-none" style={{ color: 'rgba(250,251,252,0.12)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            {product.num}
          </span>
          <span className="flex items-center gap-1 uppercase tracking-[0.18em] font-bold" style={{ color: 'rgba(250,251,252,0.2)', fontSize: '0.58rem' }}>
            Explorar <ArrowUpRight size={10} />
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-black leading-none select-none" style={{ color: product.primaryColor, opacity: 0.08, fontSize: 'clamp(12rem, 26vw, 22rem)' }}>
            {product.num}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-7 pb-7 pt-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,8,6,0.97) 55%, transparent)' }}>
          <p className="uppercase tracking-[0.2em] font-bold mb-1.5" style={{ color: '#CD0032', fontSize: '0.66rem' }}>{product.category}</p>
          <h3 className="font-black uppercase leading-none" style={{ color: '#FAFBFC', fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)' }}>{product.name}</h3>
        </div>
      </motion.div>
    </FadeIn>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 4500

function ProductCarousel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = CATALOG[activeIdx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActiveIdx(i => (i + 1) % CATALOG.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Featured panel */}
      <div style={{ position: 'relative', marginBottom: '6px', overflow: 'hidden', height: 'clamp(260px, 32vw, 420px)', backgroundColor: '#0D0806' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.3,
              background: `
                radial-gradient(ellipse 70% 110% at 12% 70%, ${active.accentColor}, transparent 58%),
                radial-gradient(ellipse 45% 65% at 82% 18%, ${active.accentColor}, transparent 52%)
              `,
            }} />
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.025,
              backgroundImage: 'linear-gradient(rgba(250,251,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,251,252,1) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }} />
            <span className="hidden md:block" style={{
              position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)',
              fontWeight: 900, lineHeight: 1, userSelect: 'none',
              color: 'rgba(250,251,252,0.035)',
              fontSize: 'clamp(10rem, 22vw, 24rem)',
            }}>
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(20px, 3.5vw, 44px)',
              background: 'linear-gradient(to top, rgba(8,4,3,0.97) 38%, rgba(8,4,3,0.55) 65%, transparent)',
            }}>
              <p style={{ color: '#CD0032', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: '10px' }}>
                {active.category}
              </p>
              <h3 style={{ color: '#FAFBFC', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: '-0.02em', marginBottom: '16px', fontSize: 'clamp(2rem, 5vw, 4.8rem)' }}>
                {active.name}
              </h3>
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                {active.tags.map(tag => (
                  <span key={tag} style={{ color: 'rgba(250,251,252,0.52)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 10px', border: '1px solid rgba(250,251,252,0.14)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence mode="wait">
          {!paused && (
            <motion.div
              key={`bar-${activeIdx}`}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#CD0032', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProductsSection() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <>
      <section id="productos" className="px-8 md:px-16 py-24 md:py-36" style={{ backgroundColor: '#080403' }}>
        <FadeIn y={20}>
          <p className="uppercase tracking-[0.28em] font-bold mb-3" style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>
            Productos estrella
          </p>
        </FadeIn>
        <RevealText
          lines={['Equipamiento de élite']}
          className="font-black uppercase leading-none tracking-tight mb-8 md:mb-12"
          style={{ color: '#FAFBFC', fontSize: 'clamp(3rem, 7vw, 8rem)' }}
          delay={0.05}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onClick={() => setSelected(product)} />
          ))}
        </div>

        <FadeIn y={24} delay={0.2}>
          <div className="mb-7">
            <p className="uppercase tracking-[0.28em] font-bold mb-1" style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>
              Un vistazo
            </p>
            <p className="font-light leading-relaxed" style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: '520px' }}>
              Una muestra de la línea completa. Solicita el catálogo para ver todos los modelos disponibles.
            </p>
          </div>

          <ProductCarousel />

          <div className="flex justify-center mt-10">
            <Link
              to="/productos"
              className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-10 py-4"
              style={{ border: '1px solid rgba(250,251,252,0.18)', color: '#FAFBFC', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#CD0032'; e.currentTarget.style.borderColor = '#CD0032' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(250,251,252,0.18)' }}
            >
              Ver todos los productos <ArrowUpRight size={14} />
            </Link>
          </div>
        </FadeIn>
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
