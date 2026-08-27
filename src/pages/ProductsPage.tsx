import { useState, useRef, Suspense, lazy, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { RevealText } from '../components/RevealText'
import { HeroScene, type HeroSpec } from '../components/HeroScene'
import { useScrollToContact } from '../components/useScrollToContact'
import {
  ALL_PRODUCTS,
  LINES,
  MODELS,
  preloadModel,
  themeForLine,
  type Product,
} from '../data/products'
import { Seo } from '../seo/Seo'
import { SITE_URL } from '../seo/config'

const GloveScene = lazy(() =>
  import('../components/GloveScene').then((m) => ({ default: m.GloveScene }))
)

const EASE = [0.22, 1, 0.36, 1] as const

const HERO_SPECS: HeroSpec[] = [
  { value: 'ANSI A7', label: 'Nivel de corte', side: 'right', pos: { top: '17%', right: '2%' } },
  { value: 'EN388 · 4X42F', label: 'Certificación', side: 'right', pos: { top: '45%', right: '0%' } },
  { value: 'HPPE cal.13', label: 'Material base', side: 'left', pos: { top: '71%', left: '0%' } },
]


// ─── Modal ───────────────────────────────────────────────────────────────────

function Modal({ product, onClose, onPrev, onNext }: {
  product: Product
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const goToContact = useScrollToContact()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

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
          <motion.h2
            className="font-black uppercase leading-[0.95] tracking-tight mb-5"
            style={{ color: '#FAFBFC', fontSize: 'clamp(2rem, 4.2vw, 4.5rem)', wordBreak: 'break-word' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
          >
            {product.name}
          </motion.h2>
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
            href="/#contacto"
            onClick={(e) => { onClose(); goToContact(e) }}
            className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-9 py-4 self-start"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', fontSize: 'clamp(0.68rem, 1.05vw, 0.8rem)', textDecoration: 'none', borderRadius: '6px' }}
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.5, ease: EASE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
          >
            Solicitar muestra <ArrowUpRight size={15} />
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-5 self-start"
          >
            <Link
              to={`/productos/${product.id}/`}
              onClick={onClose}
              className="inline-flex items-center gap-2 uppercase tracking-[0.18em] font-bold"
              style={{ color: 'rgba(250,251,252,0.5)', fontSize: '0.66rem', textDecoration: 'none' }}
            >
              Ver ficha completa <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Close */}
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

        {/* Prev */}
        {onPrev && (
          <motion.button
            className="absolute z-10 flex items-center justify-center"
            style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', border: '1px solid rgba(250,251,252,0.15)', backgroundColor: 'rgba(8,4,3,0.6)', color: '#FAFBFC', cursor: 'pointer', borderRadius: '4px' }}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 0.28, duration: 0.38, ease: EASE }}
            onClick={onPrev}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#CD0032'; e.currentTarget.style.borderColor = '#CD0032' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(8,4,3,0.6)'; e.currentTarget.style.borderColor = 'rgba(250,251,252,0.15)' }}
          >
            <ChevronLeft size={20} />
          </motion.button>
        )}

        {/* Next */}
        {onNext && (
          <motion.button
            className="absolute z-10 flex items-center justify-center"
            style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', border: '1px solid rgba(250,251,252,0.15)', backgroundColor: 'rgba(8,4,3,0.6)', color: '#FAFBFC', cursor: 'pointer', borderRadius: '4px' }}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.28, duration: 0.38, ease: EASE }}
            onClick={onNext}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#CD0032'; e.currentTarget.style.borderColor = '#CD0032' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(8,4,3,0.6)'; e.currentTarget.style.borderColor = 'rgba(250,251,252,0.15)' }}
          >
            <ChevronRight size={20} />
          </motion.button>
        )}
      </motion.div>
    </>
  )
}

// ─── Netflix Card ──────────────────────────────────────────────────────────────

function NetflixCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const theme = themeForLine(product.line)

  return (
    <motion.div
      className={product.line === 'Dexterity' ? 'cursor-logo-white' : 'cursor-logo'}
      onClick={onOpen}
      onMouseEnter={() => { setHovered(true); preloadModel(MODELS[product.id]?.url) }}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.03 : 1 }}
      transition={{ duration: 0.26, ease: EASE }}
      style={{
        aspectRatio: '4 / 5',
        background: theme.bg,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '6px',
        border: `1px solid ${hovered ? theme.accent : 'rgba(255,255,255,0.1)'}`,
        transition: 'border-color 0.26s',
      }}
    >
      {/* Spotlight detrás del guante para que resalte */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 62% 56% at 50% 40%, ${theme.spotlight}, transparent 66%)`,
        opacity: hovered ? 1 : 0.85, transition: 'opacity 0.3s',
      }} />

      {/* Número ghost — detrás del guante */}
      <span style={{
        position: 'absolute', right: '-2%', top: '46%', transform: 'translateY(-50%)',
        fontWeight: 900, lineHeight: 1, userSelect: 'none',
        color: theme.ghost, fontSize: 'clamp(5rem, 12vw, 10rem)',
        opacity: hovered ? 0 : 1, transition: 'opacity 0.25s',
      }}>
        {product.num}
      </span>

      {/* Producto recortado — centrado tipo tile */}
      {product.image && (
        <img
          src={product.image}
          alt={`Guante de seguridad ${product.name} — Handlove Mexico`}
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute', top: '6%', left: 0, right: 0, marginInline: 'auto',
            height: '70%', width: '82%',
            objectFit: 'contain', objectPosition: 'center',
            opacity: 1,
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            filter: theme.shadow,
            transition: 'transform 0.5s',
          }}
        />
      )}

      {/* Specs — aparecen en hover */}
      <div style={{
        position: 'absolute', bottom: '64px', left: '16px', right: '16px',
        display: 'flex', gap: '8px', flexWrap: 'wrap',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.28s 0.06s, transform 0.28s 0.06s',
      }}>
        {product.specs.slice(0, 2).map(s => (
          <span key={s.label} style={{
            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '4px 9px',
            backgroundColor: theme.chipBg,
            border: `1px solid ${theme.chipBorder}`,
            color: theme.chipText,
          }}>
            {s.label}: <span style={{ color: theme.fg }}>{s.value}</span>
          </span>
        ))}
      </div>

      {/* Nombre + categoría — siempre visible */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px', background: `linear-gradient(to top, ${theme.bg} 70%, transparent)` }}>
        <p style={{ color: theme.label, fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>
          {product.category}
        </p>
        <h3 style={{ color: theme.fg, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, fontSize: 'clamp(0.88rem, 1.6vw, 1.25rem)', wordBreak: 'break-word' }}>
          {product.name}
        </h3>
        {/* Enlace real a la ficha: da a Google una URL rastreable por producto
            sin quitarle al clic de la tarjeta su modal. */}
        <Link
          to={`/productos/${product.id}/`}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '7px',
            color: theme.label, fontSize: '0.58rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none',
          }}
        >
          Ficha completa <ArrowUpRight size={11} />
        </Link>
      </div>

      {/* Ícono de abrir — en hover */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.22s',
        color: theme.icon,
      }}>
        <ArrowUpRight size={16} />
      </div>
    </motion.div>
  )
}

// ─── Mobile Carousel ────────────────────────────────────────────────────────────

function useIsMobile(query = '(max-width: 767px)') {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])
  return isMobile
}

function MobileCarousel({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const target = ((index % products.length) + products.length) % products.length
    track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth)
      setActive(index)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [products.length])

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return
      const track = trackRef.current
      if (!track) return
      const current = Math.round(track.scrollLeft / track.clientWidth)
      goTo(current + 1)
    }, 4500)
    return () => clearInterval(id)
  }, [products.length])

  return (
    <div>
      <div
        ref={trackRef}
        onPointerDown={() => { paused.current = true }}
        onPointerUp={() => { paused.current = false }}
        onPointerCancel={() => { paused.current = false }}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          gap: 0,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{ flex: '0 0 100%', scrollSnapAlign: 'center', padding: '0 2px' }}
          >
            <NetflixCard product={p} onOpen={() => onOpen(p)} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {products.map((p, i) => (
          <button
            key={p.id}
            aria-label={`Ir a ${p.name}`}
            onClick={() => goTo(i)}
            style={{
              height: '6px',
              width: i === active ? '22px' : '6px',
              borderRadius: '999px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: i === active ? '#CD0032' : 'rgba(250,251,252,0.25)',
              transition: 'width 0.3s, background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Line Row ─────────────────────────────────────────────────────────────────

function LineRow({
  label, sub, products, onOpen,
}: {
  label: string; sub: string;
  products: Product[]; onOpen: (p: Product) => void;
}) {
  const isMobile = useIsMobile()

  return (
    <FadeIn y={24}>
      <div className="mb-14 md:mb-20">
        <div className="flex items-end gap-5 mb-6">
          <div>
            <h2 className="font-black uppercase leading-none tracking-tight" style={{ color: '#FAFBFC', fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              {label}
            </h2>
          </div>
          <p className="hidden md:block font-light pb-1" style={{ color: 'rgba(250,251,252,0.35)', fontSize: '0.82rem', maxWidth: '340px' }}>
            {sub}
          </p>
        </div>
        {isMobile ? (
          <MobileCarousel products={products} onOpen={onOpen} />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
            style={{ overflow: 'visible' }}
          >
            {products.map((p) => (
              <NetflixCard key={p.id} product={p} onOpen={() => onOpen(p)} />
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const productsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Catálogo de guantes de seguridad Handlove Mexico',
  itemListElement: ALL_PRODUCTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `${SITE_URL}/productos/${p.id}/`,
  })),
}

export function ProductsPage() {
  const [selected, setSelected] = useState<Product | null>(null)
  const [searchParams] = useSearchParams()
  const goToContact = useScrollToContact()

  useEffect(() => {
    const id = searchParams.get('producto')
    if (!id) return
    const product = ALL_PRODUCTS.find(p => p.id === id)
    if (product) setSelected(product)
  }, [searchParams])

  const selectedIdx = selected ? ALL_PRODUCTS.findIndex(p => p.id === selected.id) : -1
  const handlePrev = selectedIdx > 0 ? () => setSelected(ALL_PRODUCTS[selectedIdx - 1]) : undefined
  const handleNext = selectedIdx < ALL_PRODUCTS.length - 1 ? () => setSelected(ALL_PRODUCTS[selectedIdx + 1]) : undefined

  return (
    <>
      <Seo
        title="Catálogo de guantes de seguridad"
        description="13 modelos de guantes de seguridad: anticorte Edge (ANSI A3–A7, EN388), alta destreza Dexterity y uso general Lite. Cotiza al por mayor en México."
        path="/productos"
        jsonLd={productsJsonLd}
      />
      <div style={{ backgroundColor: '#080403', minHeight: '100vh' }}>

        {/* Hero */}
        <section
          className="relative min-h-screen flex items-center pt-[76px]"
          style={{ backgroundColor: '#FAFBFC' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

          <div className="relative z-10 flex flex-col lg:flex-row w-full items-center px-8 md:px-16 py-16 gap-8">

            {/* ── Left: copy ── */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <p
                className="hero-fade uppercase tracking-[0.3em] font-semibold mb-5"
                style={{ color: '#CD0032', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', animationDelay: '0.1s' }}
              >
                Catálogo completo
              </p>

              <h1 className="sr-only">
                Catálogo de guantes de seguridad industriales — 13 modelos Handlove Mexico
              </h1>

              <div className="overflow-hidden mb-6">
                <p
                  className="hero-lcp font-black uppercase leading-[0.9] tracking-tight"
                  style={{ color: '#0c0c0c', fontSize: 'clamp(3.2rem, 7.5vw, 8rem)' }}
                >
                  13 modelos.<br />
                  <span style={{ color: '#CD0032' }}>Una sola</span><br />
                  misión.
                </p>
              </div>

              <p
                className="hero-fade font-light leading-relaxed max-w-[460px]"
                style={{ color: 'rgba(12,12,12,0.55)', fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', animationDelay: '0.32s' }}
              >
                Desde alta destreza para manufactura de precisión hasta anticorte
                certificado para industrias de alto riesgo.
              </p>
            </div>

            {/* ── Right: escena 3D ── */}
            <div
              className="hero-fade flex-1 w-full"
              style={{ minWidth: 0, animationDelay: '0.3s', animationDuration: '1.2s' }}
            >
              <HeroScene word="CATÁLOGO" specs={HERO_SPECS} modelUrl="/images/models/edgeplusa7.glb" theme="light" />
            </div>

          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(250,251,252,0.07)', margin: '0 32px' }} />

        {/* Netflix Grid */}
        <section className="px-8 md:px-16 py-16 md:py-24" style={{ overflow: 'visible' }}>
          {LINES.map(line => (
            <LineRow
              key={line.key}
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
            <p className="font-light mb-10 mx-auto" style={{ color: 'rgba(250,251,252,0.45)', fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', maxWidth: '440px' }}>
              Cotiza por volumen o solicita una muestra de cualquier modelo del catálogo. Respondemos en menos de 24 horas.
            </p>
            <a
              href="/#contacto"
              onClick={goToContact}
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
          {selected && <Modal product={selected} onClose={() => setSelected(null)} onPrev={handlePrev} onNext={handleNext} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
