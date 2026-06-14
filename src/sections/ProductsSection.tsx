import { useState, Suspense, lazy, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'

const GloveScene = lazy(() =>
  import('../components/GloveScene').then((m) => ({ default: m.GloveScene }))
)

const EASE = [0.22, 1, 0.36, 1] as const

const FAMILY_THEME = {
  dexterity: {
    bg: 'radial-gradient(ellipse 95% 85% at 50% 30%, #E11E4B 0%, #CD0032 42%, #5e0014 100%)',
    fg: '#FFFFFF',
    label: '#FFD7DF',
    sub: 'rgba(255,255,255,0.7)',
    border: 'rgba(255,255,255,0.28)',
    bottom: 'linear-gradient(to top, rgba(58,0,12,0.88) 14%, rgba(94,0,20,0.32) 52%, transparent)',
    spotlight: 'rgba(255,255,255,0.18)',
    ghost: 'rgba(255,255,255,0.10)',
    shadow: 'drop-shadow(0 24px 42px rgba(0,0,0,0.55))',
    accent: '#FFFFFF',
    btnBg: '#FFFFFF',
    btnFg: '#CD0032',
    btnHover: '#FFE0E6',
  },
}

const preloaded = new Set<string>()
function preloadModel(url?: string) {
  if (!url || preloaded.has(url)) return
  preloaded.add(url)
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'fetch'
  link.href = url
  document.head.appendChild(link)
}

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
    model: '/images/models/dexterityultra.glb',
    modelTint: '',
    image: '/images/products/dexterityultra.png',
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
    model: '/images/models/polysand.glb',
    modelTint: '',
    image: '/images/products/polysand.png',
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
    model: '/images/models/nanoflex.glb',
    modelTint: '',
    image: '/images/products/nanoflex.png',
    specs: [
      { label: 'Material', value: 'Nylon' },
      { label: 'Calibre', value: '18G' },
      { label: 'Recubrimiento', value: 'Nitrilo microespumado' },
      { label: 'EN388', value: '4121' },
    ],
  },
]

const CATALOG = [
  { id: 'edge-lite-a4', name: 'Edge Lite A4', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Rec. Poliuretano', 'ANSI CUT A4'], accentColor: '#2C4A7C', image: '/images/products/edgelitea4.png' },
  { id: 'edge-lite-a3', name: 'Edge Lite A3', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Rec. Poliuretano', 'ANSI CUT A3'], accentColor: '#2C4A7C', image: '/images/products/edgelitea3.png' },
  { id: 'edge-plus-a7', name: 'Edge Plus A7', category: 'Anticorte Premium', tags: ['HPPE · Cal.13', 'Nitrilo arenoso', 'ANSI CUT A7'], accentColor: '#1A3A6A', image: '/images/products/edgeplusa7.png' },
  { id: 'edge-plus-a3', name: 'Edge Plus A3', category: 'Anticorte', tags: ['HPPE · Cal.13', 'Nitrilo arenoso', 'ANSI CUT A3'], accentColor: '#1A3A6A', image: '/images/products/egeplusa3.png' },
  { id: 'lite-pu-gris', name: 'Lite PU Gris', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#4A5568', image: '/images/products/litepugris.png' },
  { id: 'lite-pu-blanco', name: 'Lite PU Blanco', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#718096', image: '/images/products/litepublanco.png' },
  { id: 'lite-pu-black', name: 'Lite PU Black', category: 'Alta Destreza', tags: ['Poliéster · Cal.15', 'Rec. Poliuretano', 'EN388: 3131'], accentColor: '#2D3748', image: '' },
  { id: 'lite-cotton-60', name: 'Lite Cotton 60gr', category: 'Uso General', tags: ['Algodón · 60g', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#7A6545', image: '/images/products/litecotton60gr.png' },
  { id: 'lite-cotton-70', name: 'Lite Cotton 70gr', category: 'Uso General', tags: ['Algodón · 70g', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#7A6545', image: '/images/products/litecotton70gr.png' },
  { id: 'lite-nylon-100', name: 'Lite Nylon 100', category: 'Precisión Táctil', tags: ['Nylon · Cal.13', 'Sin recubrimiento', 'ISO 9001'], accentColor: '#3D6B4F', image: '/images/products/litenylon100.png' },
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
          <Suspense fallback={null}>
            <GloveScene variant="modal" primaryColor={product.primaryColor} palmColor={product.palmColor} cuffColor={product.cuffColor} modelUrl={product.model || undefined} modelTint={product.modelTint || undefined} />
          </Suspense>
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
        className="group relative overflow-hidden"
        style={{ height: 'clamp(260px, 55vw, 540px)', backgroundColor: '#0D0806', border: '1px solid rgba(250,251,252,0.07)', cursor: 'pointer' }}
        onClick={onClick}
        onMouseEnter={() => preloadModel(product.model)}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 65% 55% at 50% 42%, ${product.accentGlow}, transparent 68%)`, opacity: 0.5 }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-black leading-none select-none" style={{ color: product.primaryColor, opacity: 0.1, fontSize: 'clamp(12rem, 26vw, 22rem)' }}>
            {product.num}
          </span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-shot group-hover:scale-[1.06]"
          style={{ position: 'absolute', left: '8%', right: '8%', top: '6%', width: '84%', height: '74%', objectFit: 'contain', objectPosition: 'center', filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.55))', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
        />

        <div className="absolute top-5 left-6 right-6 flex justify-between items-start pointer-events-none">
          <span className="font-black leading-none" style={{ color: 'rgba(250,251,252,0.18)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            {product.num}
          </span>
          <span className="flex items-center gap-1 uppercase tracking-[0.18em] font-bold" style={{ color: 'rgba(250,251,252,0.2)', fontSize: '0.58rem' }}>
            Explorar <ArrowUpRight size={10} />
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-7 pb-7 pt-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(13,8,6,0.97) 40%, rgba(13,8,6,0.5) 70%, transparent)' }}>
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
  const pausedRef = useRef(false)
  const barControls = useAnimation()
  const slideStartRef = useRef(Date.now())
  const pausedAtRef = useRef<number | null>(null)
  const pausedElapsedRef = useRef(0)
  const navigate = useNavigate()
  const active = CATALOG[activeIdx]
  const t = FAMILY_THEME.dexterity

  function startBar() {
    slideStartRef.current = Date.now()
    pausedElapsedRef.current = 0
    pausedAtRef.current = null
    barControls.set({ scaleX: 0 })
    barControls.start({ scaleX: 1, transition: { duration: AUTOPLAY_MS / 1000, ease: 'linear' } })
  }

  useEffect(() => { startBar() }, [activeIdx])

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActiveIdx(i => (i + 1) % CATALOG.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [])

  function handleMouseEnter() {
    pausedRef.current = true
    pausedAtRef.current = Date.now()
    barControls.stop()
  }

  function handleMouseLeave() {
    pausedRef.current = false
    if (pausedAtRef.current !== null) {
      pausedElapsedRef.current += Date.now() - pausedAtRef.current
      pausedAtRef.current = null
    }
    const realElapsed = Date.now() - slideStartRef.current - pausedElapsedRef.current
    const remaining = Math.max(50, AUTOPLAY_MS - realElapsed)
    barControls.start({ scaleX: 1, transition: { duration: remaining / 1000, ease: 'linear' } })
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      {/* ── Banner full-bleed — fondo por línea, guante protagonista ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(520px, 64vw, 740px)', marginBottom: '4px', borderRadius: '4px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{ position: 'absolute', inset: 0, background: t.bg }}
          >
            {/* Spotlight detrás del producto */}
            <div className="carousel-spot" style={{ ['--spot']: t.spotlight } as CSSProperties} />
            {/* Degradado inferior — sólo para legibilidad del texto */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: t.bottom }} />
            {/* Número ghost — detrás del producto */}
            <span className="hidden md:block" style={{ position: 'absolute', right: '2%', bottom: '-4%', fontWeight: 900, lineHeight: 1, userSelect: 'none', color: t.ghost, fontSize: 'clamp(10rem, 22vw, 26rem)' }}>
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            {/* Producto recortado — alineado a la derecha tipo hero, al frente */}
            {active.image && (
              <img
                className="carousel-shot"
                src={active.image}
                alt={active.name}
                style={{ filter: t.shadow }}
              />
            )}

            {/* Contenido */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(22px, 3.8vw, 52px)' }}>
              <p style={{ color: t.label, fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.26em', marginBottom: '10px' }}>
                {active.category}
              </p>
              <h3 style={{ color: t.fg, fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px', fontSize: 'clamp(2rem, 5.5vw, 5.2rem)', maxWidth: '600px' }}>
                {active.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {active.tags.map(tag => (
                  <span key={tag} style={{ color: t.sub, fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 9px', border: `1px solid ${t.border}` }}>
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => navigate(`/productos?producto=${active.id}`)}
                  className="inline-flex items-center gap-1.5 uppercase tracking-widest font-bold"
                  style={{ fontSize: '0.58rem', padding: '5px 14px', backgroundColor: t.btnBg, color: t.btnFg, border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = t.btnHover)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = t.btnBg)}
                >
                  Ver ficha <ArrowUpRight size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Barra de progreso */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={barControls}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: t.accent, transformOrigin: 'left', zIndex: 2 }}
        />
      </div>

      {/* ── Thumbnail rail — portrait con número, color de línea y scale activo ── */}
      <div
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ display: 'flex', gap: '3px', scrollbarWidth: 'none' }}
      >
        {CATALOG.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIdx(i)}
            style={{
              flexShrink: 0,
              width: 'clamp(62px, 6vw, 86px)',
              aspectRatio: '3/4',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0D0806',
              border: `1px solid ${i === activeIdx ? '#CD0032' : 'rgba(250,251,252,0.07)'}`,
              cursor: 'pointer',
              padding: 0,
              transition: 'border-color 0.2s, transform 0.22s',
              transform: i === activeIdx ? 'scale(1.06)' : 'scale(1)',
              zIndex: i === activeIdx ? 1 : 0,
            }}
          >
            {/* Franja de color de la línea — identidad del producto */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              backgroundColor: i === activeIdx ? '#CD0032' : item.accentColor,
              opacity: i === activeIdx ? 1 : 0.5,
              zIndex: 3,
              transition: 'opacity 0.2s, background-color 0.2s',
            }} />
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '5px', opacity: i === activeIdx ? 1 : 0.55, transition: 'opacity 0.25s' }}
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,4,3,0.95) 35%, transparent)' }} />
            {/* Número de posición */}
            <span style={{
              position: 'absolute', top: '7px', left: '6px',
              color: i === activeIdx ? 'rgba(250,251,252,0.85)' : 'rgba(250,251,252,0.3)',
              fontSize: '0.48rem', fontWeight: 900, letterSpacing: '0.08em',
              zIndex: 2, transition: 'color 0.2s',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {/* Indicador activo inferior */}
            {i === activeIdx && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: '#CD0032', zIndex: 3 }} />
            )}
            {/* Nombre del producto */}
            <p style={{
              position: 'absolute', bottom: '5px', left: '5px', right: '5px',
              color: i === activeIdx ? '#FAFBFC' : 'rgba(250,251,252,0.38)',
              fontSize: '0.44rem', fontWeight: 700, textTransform: 'uppercase',
              lineHeight: 1.2, letterSpacing: '0.04em',
              zIndex: 2, transition: 'color 0.2s',
            }}>
              {item.name}
            </p>
          </button>
        ))}
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
