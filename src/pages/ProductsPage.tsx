import { useState, Suspense, lazy, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'

const GloveScene = lazy(() =>
  import('../components/GloveScene').then((m) => ({ default: m.GloveScene }))
)

const EASE = [0.22, 1, 0.36, 1] as const

const MODELS: Record<string, { url: string; tint?: string }> = {
  'ultra-grip': { url: '/images/models/guante1.glb', tint: '#CD0032' },
  'poly-sand': { url: '/images/models/polysand.glb' },
  'nanoflex': { url: '/images/models/nanoflex.glb' },
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  {
    id: 'ultra-grip', num: '01', line: 'Dexterity',
    name: 'Dexterity Ultra Grip', category: 'Alta Destreza / Agarre',
    image: '/images/products/dexterityultra.webp',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo liso. Agarre confiable y comodidad durante jornadas prolongadas para industria automotriz, logística y manufactura ligera.',
    primaryColor: '#CD0032', palmColor: '#8B001E', cuffColor: '#111111',
    accentColor: '#CD0032', accentGlow: 'rgba(205,0,50,0.22)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo liso' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'poly-sand', num: '02', line: 'Dexterity',
    name: 'Dexterity Poly Sand', category: 'Agarre Superior',
    image: '/images/products/polysand.webp',
    description: 'Guante de poliéster calibre 15 con palma recubierta de nitrilo arenoso. Excelente agarre y alta destreza para ensamblaje, mantenimiento y manejo de herramientas manuales.',
    primaryColor: '#8B001E', palmColor: '#1a1a1a', cuffColor: '#CD0032',
    accentColor: '#8B001E', accentGlow: 'rgba(139,0,30,0.25)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'nanoflex', num: '03', line: 'Dexterity',
    name: 'Dexterity Nanoflex', category: 'Precisión Táctil',
    image: '/images/products/nanoflex.webp',
    description: 'Guante premium de nylon calibre 18 con palma recubierta de nitrilo microespumado. Máxima sensibilidad táctil y agarre confiable para electrónica, ensamblaje e inspección de calidad.',
    primaryColor: '#6B7A8D', palmColor: '#3D4A5C', cuffColor: '#252E3A',
    accentColor: '#5A6B7D', accentGlow: 'rgba(107,122,141,0.22)',
    specs: [
      { label: 'Material', value: 'Nylon' }, { label: 'Calibre', value: '18G' },
      { label: 'Recubrimiento', value: 'Nitrilo microespumado' }, { label: 'EN388', value: '4121' },
    ],
  },
  {
    id: 'edge-plus-a7', num: '04', line: 'Edge',
    name: 'Edge Plus A7', category: 'Anticorte Premium',
    image: '/images/products/edgeplusa7.webp',
    description: 'Anticorte de alto nivel con nitrilo arenoso en palma y compatibilidad táctil. Ideal para vidrio, aeroespacial y automotriz de alto riesgo.',
    primaryColor: '#1A3A6A', palmColor: '#0E2040', cuffColor: '#080C14',
    accentColor: '#1A3A6A', accentGlow: 'rgba(26,58,106,0.3)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'ANSI CUT', value: 'A7' },
    ],
  },
  {
    id: 'edge-plus-a3', num: '05', line: 'Edge',
    name: 'Edge Plus A3', category: 'Anticorte',
    image: '/images/products/egeplusa3.webp',
    description: 'Anticorte con nitrilo arenoso en palma y compatibilidad con pantallas táctiles para entornos metalmecánicos y automotrices.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Nitrilo arenoso' }, { label: 'ANSI CUT', value: 'A3' },
    ],
  },
  {
    id: 'edge-lite-a4', num: '06', line: 'Edge',
    name: 'Edge Lite A4', category: 'Anticorte Ligero',
    image: '/images/products/edgelitea4.webp',
    description: 'Anticorte ligero con recubrimiento de poliuretano. Buena comodidad y movilidad para manipulación de piezas con bordes filosos.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'ANSI CUT', value: 'A4' },
    ],
  },
  {
    id: 'edge-lite-a3', num: '07', line: 'Edge',
    name: 'Edge Lite A3', category: 'Anticorte',
    image: '/images/products/edgelitea3.webp',
    description: 'Anticorte en calibre 13 para alta destreza, con recubrimiento de poliuretano y protección de nitrilo entre pulgar e índice.',
    primaryColor: '#2C4A7C', palmColor: '#1A3054', cuffColor: '#0A0E18',
    accentColor: '#2C4A7C', accentGlow: 'rgba(44,74,124,0.28)',
    specs: [
      { label: 'Material', value: 'HPPE' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'ANSI CUT', value: 'A3' },
    ],
  },
  {
    id: 'lite-pu-gris', num: '08', line: 'Lite',
    name: 'Lite PU Gris', category: 'Alta Destreza',
    image: '/images/products/litepugirs.webp',
    description: 'Guante de poliéster calibre 15 con recubrimiento de poliuretano en tono gris. Ideal para ensamblaje, logística y manufactura ligera.',
    primaryColor: '#4A5568', palmColor: '#2D3748', cuffColor: '#1A202C',
    accentColor: '#4A5568', accentGlow: 'rgba(74,85,104,0.25)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-pu-blanco', num: '09', line: 'Lite',
    name: 'Lite PU Blanco', category: 'Alta Destreza',
    image: '/images/products/litepublanco.webp',
    description: 'Guante de poliéster calibre 15 con recubrimiento de poliuretano en blanco. Óptimo para ensamblaje electrónico y ambientes de sala limpia.',
    primaryColor: '#718096', palmColor: '#4A5568', cuffColor: '#2D3748',
    accentColor: '#718096', accentGlow: 'rgba(113,128,150,0.22)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-pu-black', num: '10', line: 'Lite',
    name: 'Lite PU Black', category: 'Alta Destreza',
    image: '',
    description: 'Versión negra del Lite PU. Diseñado para ambientes donde la suciedad es visible, como metalmecánica y automotriz.',
    primaryColor: '#2D3748', palmColor: '#1A202C', cuffColor: '#0D1117',
    accentColor: '#2D3748', accentGlow: 'rgba(45,55,72,0.3)',
    specs: [
      { label: 'Material', value: 'Poliéster' }, { label: 'Calibre', value: '15G' },
      { label: 'Recubrimiento', value: 'Poliuretano' }, { label: 'EN388', value: '3131' },
    ],
  },
  {
    id: 'lite-cotton-60', num: '11', line: 'Lite',
    name: 'Lite Cotton 60gr', category: 'Uso General',
    image: '/images/products/litecotton60gr.webp',
    description: 'Guante de algodón de 60 gramos sin recubrimiento. Comodidad y transpirabilidad para tareas generales de mantenimiento y logística.',
    primaryColor: '#7A6545', palmColor: '#5C4D36', cuffColor: '#3D3324',
    accentColor: '#7A6545', accentGlow: 'rgba(122,101,69,0.25)',
    specs: [
      { label: 'Material', value: 'Algodón' }, { label: 'Peso', value: '60g' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
  {
    id: 'lite-cotton-70', num: '12', line: 'Lite',
    name: 'Lite Cotton 70gr', category: 'Uso General',
    image: '/images/products/litecotton70gr.webp',
    description: 'Guante de algodón 70g con mayor resistencia al desgaste. Adecuado para jardinería, construcción ligera y logística.',
    primaryColor: '#6B5A3E', palmColor: '#4D4230', cuffColor: '#3D3324',
    accentColor: '#6B5A3E', accentGlow: 'rgba(107,90,62,0.25)',
    specs: [
      { label: 'Material', value: 'Algodón' }, { label: 'Peso', value: '70g' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
  {
    id: 'lite-nylon-100', num: '13', line: 'Lite',
    name: 'Lite Nylon 100', category: 'Precisión Táctil',
    image: '/images/products/litenylon100.webp',
    description: 'Guante de nylon calibre 13 sin recubrimiento. Alta destreza y sensibilidad táctil para inspección de calidad y ensamblaje fino.',
    primaryColor: '#3D6B4F', palmColor: '#2D5040', cuffColor: '#1D3328',
    accentColor: '#3D6B4F', accentGlow: 'rgba(61,107,79,0.25)',
    specs: [
      { label: 'Material', value: 'Nylon' }, { label: 'Calibre', value: '13G' },
      { label: 'Recubrimiento', value: 'Sin recubrimiento' }, { label: 'Certificación', value: 'ISO 9001' },
    ],
  },
]

const LINES = [
  { key: 'Dexterity', label: 'Línea Dexterity', sub: 'Alta destreza y agarre para manufactura de precisión' },
  { key: 'Edge', label: 'Línea Edge', sub: 'Anticorte certificado ANSI / CE para industrias de alto riesgo' },
  { key: 'Lite', label: 'Línea Lite', sub: 'Destreza, uso general y protección básica para jornadas largas' },
]

type Product = typeof ALL_PRODUCTS[0]

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

        <motion.div
          className="relative w-full lg:w-[58%] h-[42vh] lg:h-full flex-shrink-0"
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <span className="absolute bottom-2 left-4 font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(250,251,252,0.035)', fontSize: 'clamp(9rem, 20vw, 20rem)' }}>
            {product.num}
          </span>
          <Suspense fallback={null}>
            <GloveScene variant="modal" primaryColor={product.primaryColor} palmColor={product.palmColor} cuffColor={product.cuffColor} modelUrl={MODELS[product.id]?.url} modelTint={MODELS[product.id]?.tint} />
          </Suspense>
        </motion.div>

        <motion.div
          className="relative flex-1 flex flex-col justify-center px-9 lg:px-14 py-10 lg:py-16 overflow-y-auto"
          style={{ borderLeft: '1px solid rgba(250,251,252,0.07)' }}
          initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <motion.p className="uppercase tracking-[0.24em] font-bold mb-2" style={{ color: '#CD0032', fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)' }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.5, ease: EASE }}>
            {product.category}
          </motion.p>
          <div className="overflow-hidden mb-5">
            <motion.h2 className="font-black uppercase leading-none tracking-tight" style={{ color: '#FAFBFC', fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.3, duration: 0.75, ease: EASE }}>
              {product.name}
            </motion.h2>
          </div>
          <motion.div style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.1)', originX: 0, marginBottom: '22px' }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.42, duration: 0.55, ease: EASE }} />
          <motion.p className="font-light leading-relaxed mb-10" style={{ color: '#FAFBFC', opacity: 0.52, fontSize: 'clamp(0.85rem, 1.3vw, 1.02rem)', maxWidth: '420px' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 0.52, y: 0 }} transition={{ delay: 0.46, duration: 0.55, ease: EASE }}>
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
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.68rem, 1.05vw, 0.8rem)', textDecoration: 'none', borderRadius: '6px' }}
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

// ─── Netflix Card ──────────────────────────────────────────────────────────────

function NetflixCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onClick={onOpen}
      onMouseEnter={() => { setHovered(true); preloadModel(MODELS[product.id]?.url) }}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.03 : 1 }}
      transition={{ duration: 0.26, ease: EASE }}
      style={{
        aspectRatio: '16 / 9',
        backgroundColor: '#0D0806',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        border: `1px solid ${hovered ? product.accentColor + '55' : 'rgba(250,251,252,0.06)'}`,
        transition: 'border-color 0.26s',
      }}
    >
      {/* Backdrop — spotlight de luz + glow de acento detrás del guante para que resalte */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 54% at 50% 40%, rgba(255,255,255,0.14), transparent 68%)',
        opacity: hovered ? 1 : 0.85, transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 50% 56% at 50% 45%, ${product.accentColor}, transparent 62%)`,
        opacity: hovered ? 0.5 : 0.32, transition: 'opacity 0.3s',
      }} />

      {/* Número ghost — detrás del guante */}
      <span style={{
        position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)',
        fontWeight: 900, lineHeight: 1, userSelect: 'none',
        color: 'rgba(250,251,252,0.06)', fontSize: 'clamp(4rem, 10vw, 8rem)',
        opacity: hovered ? 0 : 1, transition: 'opacity 0.25s',
      }}>
        {product.num}
      </span>

      {/* Producto recortado — centrado tipo tile */}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute', top: '5%', left: 0, right: 0, marginInline: 'auto',
            height: '72%', width: '64%',
            objectFit: 'contain', objectPosition: 'center',
            opacity: 1,
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.6))',
            transition: 'transform 0.5s',
          }}
        />
      )}

      {/* Info en hover — overlay dentro del card */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(8,4,3,0.97) 50%, rgba(8,4,3,0.4) 80%, transparent)'
          : 'linear-gradient(to top, rgba(8,4,3,0.88) 35%, transparent)',
        transition: 'background 0.35s',
      }} />

      {/* Specs — aparecen en hover */}
      <div style={{
        position: 'absolute', bottom: '52px', left: '14px', right: '14px',
        display: 'flex', gap: '8px', flexWrap: 'wrap',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.28s 0.06s, transform 0.28s 0.06s',
      }}>
        {product.specs.slice(0, 2).map(s => (
          <span key={s.label} style={{
            fontSize: '0.56rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '3px 8px',
            backgroundColor: 'rgba(250,251,252,0.08)',
            border: '1px solid rgba(250,251,252,0.12)',
            color: 'rgba(250,251,252,0.7)',
          }}>
            {s.label}: <span style={{ color: '#FAFBFC' }}>{s.value}</span>
          </span>
        ))}
      </div>

      {/* Nombre + categoría — siempre visible */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
        <p style={{ color: '#CD0032', fontSize: '0.52rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '3px' }}>
          {product.category}
        </p>
        <h3 style={{ color: '#FAFBFC', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
          {product.name}
        </h3>
      </div>

      {/* Ícono de abrir — en hover */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.22s',
        color: 'rgba(250,251,252,0.6)',
      }}>
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  )
}

// ─── Line Row ─────────────────────────────────────────────────────────────────

function LineRow({
  lineKey, label, sub, products, onOpen,
}: {
  lineKey: string; label: string; sub: string;
  products: Product[]; onOpen: (p: Product) => void;
}) {
  return (
    <FadeIn y={24}>
      <div className="mb-14 md:mb-20">
        <div className="flex items-end gap-5 mb-6">
          <div>
            <p className="uppercase tracking-tight font-bold mb-1" style={{ color: '#CD0032', fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}>
              {lineKey}
            </p>
            <h2 className="font-black uppercase leading-none tracking-tight" style={{ color: '#FAFBFC', fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              {label}
            </h2>
          </div>
          <p className="hidden md:block font-light pb-1" style={{ color: 'rgba(250,251,252,0.35)', fontSize: '0.82rem', maxWidth: '340px' }}>
            {sub}
          </p>
        </div>
        <div
          className={`grid gap-2 grid-cols-2 ${products.length === 3 ? 'md:grid-cols-3' : products.length === 4 ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-3 md:grid-cols-3'}`}
          style={{ overflow: 'visible' }}
        >
          {products.map((p) => (
            <NetflixCard key={p.id} product={p} onOpen={() => onOpen(p)} />
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProductsPage() {
  const [selected, setSelected] = useState<Product | null>(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const id = searchParams.get('producto')
    if (!id) return
    const product = ALL_PRODUCTS.find(p => p.id === id)
    if (product) setSelected(product)
  }, [searchParams])

  return (
    <>
      <div style={{ backgroundColor: '#080403', minHeight: '100vh' }}>

        {/* Hero */}
        <section
          className="relative flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-20"
          style={{ backgroundColor: '#FAFBFC', minHeight: '100vh' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: '#CD0032' }} />

          <p className="uppercase tracking-[0.28em] font-bold mb-6" style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>
            Catálogo completo
          </p>

          <h1
            className="font-black uppercase tracking-tight mb-6"
            style={{ color: '#0c0c0c', fontSize: 'clamp(2.8rem, 7vw, 9rem)', lineHeight: 0.88 }}
          >
            13 modelos.<br />Una sola misión.
          </h1>

          <p className="font-light" style={{ color: 'rgba(12,12,12,0.5)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '480px' }}>
            Desde alta destreza para manufactura de precisión hasta anticorte certificado para industrias de alto riesgo.
          </p>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.07)', margin: '0 32px' }} />

        {/* Netflix Grid */}
        <section className="px-8 md:px-16 py-16 md:py-24" style={{ overflow: 'visible' }}>
          {LINES.map(line => (
            <LineRow
              key={line.key}
              lineKey={line.key}
              label={line.label}
              sub={line.sub}
              products={ALL_PRODUCTS.filter(p => p.line === line.key)}
              onOpen={setSelected}
            />
          ))}
        </section>

        {/* CTA */}
        <section
          className="px-8 md:px-16 py-16 md:py-24 flex flex-col items-center text-center"
          style={{ borderTop: '1px solid rgba(250,251,252,0.07)' }}
        >
          <FadeIn y={30}>
            <RevealText
              lines={['¿Necesitas un guante', 'específico?']}
              as="h2"
              className="font-black uppercase leading-none tracking-tight mb-8"
              style={{ color: '#FAFBFC', fontSize: 'clamp(2.2rem, 5vw, 6rem)' }}
            />
            <p className="font-light mb-10" style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '440px' }}>
              Cotiza por volumen o solicita muestras de cualquier modelo del catálogo. Respondemos en menos de 24 horas.
            </p>
            <a
              href="/#contacto"
              className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-10 py-4"
              style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', textDecoration: 'none', borderRadius: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
            >
              Solicitar cotización <ArrowUpRight size={14} />
            </a>
          </FadeIn>
        </section>

      </div>

      {createPortal(
        <AnimatePresence>
          {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
