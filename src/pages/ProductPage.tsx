import { Suspense, lazy } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
import { FadeIn } from '../components/FadeIn'
import { useScrollToContact } from '../components/useScrollToContact'
import {
  ALL_PRODUCTS,
  CARE_INSTRUCTIONS,
  MODELS,
  contentFor,
  productBySlug,
  themeForLine,
} from '../data/products'
import { Seo } from '../seo/Seo'
import { SITE_URL } from '../seo/config'
import { NotFoundPage } from './NotFoundPage'

const GloveScene = lazy(() =>
  import('../components/GloveScene').then((m) => ({ default: m.GloveScene })),
)

const EASE = [0.22, 1, 0.36, 1] as const

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? productBySlug(slug) : undefined
  const goToContact = useScrollToContact()

  if (!product) return <NotFoundPage />

  const theme = themeForLine(product.line)
  const content = contentFor(product.id)
  const related = ALL_PRODUCTS.filter((p) => p.line === product.line && p.id !== product.id)
  const url = `${SITE_URL}/productos/${product.id}`
  const spec = (label: string) => product.specs.find((s) => s.label === label)?.value

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${SITE_URL}/productos` },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: content?.overview ?? product.description,
      category: product.category,
      image: `${SITE_URL}${product.image}`,
      url,
      brand: { '@type': 'Brand', name: 'Handlove Mexico' },
      manufacturer: { '@id': `${SITE_URL}/#organization` },
      material: content?.material ?? spec('Material'),
      color: content?.color,
      size: content?.sizes,
      audience: content?.industries.map((name) => ({ '@type': 'Audience', audienceType: name })),
      additionalProperty: [...product.specs, ...(content?.certifications ?? [])].map((s) => ({
        '@type': 'PropertyValue',
        name: s.label,
        value: s.value,
      })),
    },
  ]

  return (
    <div style={{ backgroundColor: '#080403', minHeight: '100vh' }}>
      <Seo
        title={`${product.name} — ${product.category}`}
        description={`${product.name}: ${content?.tagline ?? product.description}`.slice(0, 155)}
        path={`/productos/${product.id}`}
        type="product"
        jsonLd={jsonLd}
      />

      <section className="relative pt-[76px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 60% at 30% 45%, ${product.accentGlow}, transparent 62%)`,
            opacity: 0.4,
          }}
        />

        <div className="relative z-10 px-8 md:px-16 pt-10">
          <nav aria-label="Ruta de navegación">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 uppercase tracking-[0.2em] font-bold"
              style={{
                color: 'rgba(250,251,252,0.45)',
                fontSize: '0.68rem',
                textDecoration: 'none',
              }}
            >
              <ChevronLeft size={14} /> Catálogo
            </Link>
          </nav>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 px-8 md:px-16 py-10 lg:py-16">
          <div className="relative w-full lg:w-[52%] h-[46vh] lg:h-[68vh] flex-shrink-0">
            <span
              aria-hidden
              className="absolute bottom-0 left-0 font-black leading-none select-none pointer-events-none"
              style={{ color: 'rgba(250,251,252,0.035)', fontSize: 'clamp(9rem, 20vw, 20rem)' }}
            >
              {product.num}
            </span>
            <Suspense fallback={null}>
              <GloveScene
                variant="modal"
                primaryColor={product.primaryColor}
                palmColor={product.palmColor}
                cuffColor={product.cuffColor}
                modelUrl={MODELS[product.id]?.url}
                modelTint={MODELS[product.id]?.tint}
              />
            </Suspense>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <FadeIn y={0} duration={0.7} playOnMount>
              <p
                className="uppercase tracking-[0.28em] font-bold mb-3"
                style={{ color: '#CD0032', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}
              >
                {product.line} · {product.category}
              </p>
            </FadeIn>

            <FadeIn y={22} delay={0.1} duration={0.8} playOnMount>
              <h1
                className="font-black uppercase leading-[0.95] tracking-tight mb-6"
                style={{
                  color: '#FAFBFC',
                  fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                  wordBreak: 'break-word',
                }}
              >
                {product.name}
              </h1>
            </FadeIn>

            <FadeIn y={16} delay={0.24} duration={0.7} playOnMount>
              <p
                className="font-light leading-relaxed mb-10"
                style={{
                  color: '#FAFBFC',
                  opacity: 0.55,
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                }}
              >
                {content?.tagline ?? product.description}
              </p>
            </FadeIn>

            <FadeIn y={16} delay={0.34} duration={0.7} playOnMount>
              <h2
                className="uppercase tracking-[0.24em] font-bold mb-5"
                style={{ color: 'rgba(250,251,252,0.3)', fontSize: '0.62rem' }}
              >
                Especificaciones técnicas
              </h2>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 mb-11">
                {product.specs.map((s) => (
                  <div key={s.label} style={{ borderTop: '1px solid rgba(250,251,252,0.1)', paddingTop: '10px' }}>
                    <dt
                      className="uppercase tracking-wider font-bold mb-1"
                      style={{ color: 'rgba(250,251,252,0.38)', fontSize: '0.58rem' }}
                    >
                      {s.label}
                    </dt>
                    <dd
                      className="font-black uppercase"
                      style={{ color: '#FAFBFC', fontSize: 'clamp(1rem, 1.9vw, 1.35rem)' }}
                    >
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>

            <FadeIn y={18} delay={0.46} duration={0.7} playOnMount>
              <a
                href="/#contacto"
                onClick={goToContact}
                className="inline-flex items-center gap-3 uppercase tracking-widest font-bold px-9 py-4 self-start"
                style={{
                  backgroundColor: '#CD0032',
                  color: '#FAFBFC',
                  fontSize: 'clamp(0.7rem, 1.05vw, 0.82rem)',
                  textDecoration: 'none',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
              >
                Solicitar cotización <ArrowUpRight size={15} />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {content && (
        <section
          className="px-8 md:px-16 py-20 md:py-28"
          style={{ borderTop: '1px solid rgba(250,251,252,0.08)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14 max-w-6xl">
            <div>
              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Descripción general
                </h2>
                <p
                  className="font-light leading-relaxed mb-12"
                  style={{
                    color: 'rgba(250,251,252,0.6)',
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  }}
                >
                  {content.overview}
                </p>
              </FadeIn>

              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Usos recomendados
                </h2>
                <ul className="mb-12">
                  {content.uses.map((use) => (
                    <li
                      key={use}
                      className="font-light leading-relaxed py-3 flex gap-4"
                      style={{
                        color: 'rgba(250,251,252,0.6)',
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                        borderTop: '1px solid rgba(250,251,252,0.09)',
                      }}
                    >
                      <span style={{ color: '#CD0032', flexShrink: 0 }}>—</span>
                      {use}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Industrias
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {content.industries.map((ind) => (
                    <span
                      key={ind}
                      className="uppercase tracking-[0.12em] font-bold"
                      style={{
                        border: '1px solid rgba(250,251,252,0.2)',
                        borderRadius: '999px',
                        padding: '9px 20px',
                        color: 'rgba(250,251,252,0.75)',
                        fontSize: '0.68rem',
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Certificaciones y niveles
                </h2>
                <dl className="mb-12">
                  {content.certifications.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-baseline justify-between gap-6 py-3"
                      style={{ borderTop: '1px solid rgba(250,251,252,0.09)' }}
                    >
                      <dt
                        className="uppercase tracking-wider font-bold"
                        style={{ color: 'rgba(250,251,252,0.45)', fontSize: '0.66rem' }}
                      >
                        {c.label}
                      </dt>
                      <dd
                        className="font-black uppercase"
                        style={{ color: '#FAFBFC', fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
                      >
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>

              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Material y presentación
                </h2>
                <dl className="mb-12">
                  {[
                    ['Material', content.material],
                    ['Color', content.color],
                    ['Puño', content.cuff],
                    ['Tallas', content.sizes],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="py-3"
                      style={{ borderTop: '1px solid rgba(250,251,252,0.09)' }}
                    >
                      <dt
                        className="uppercase tracking-wider font-bold mb-1"
                        style={{ color: 'rgba(250,251,252,0.45)', fontSize: '0.62rem' }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="font-light"
                        style={{ color: 'rgba(250,251,252,0.75)', fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)' }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>

              <FadeIn y={20}>
                <h2
                  className="uppercase tracking-[0.28em] font-bold mb-5"
                  style={{ color: 'rgba(250,251,252,0.35)', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
                >
                  Limitaciones y cuidado
                </h2>
                <ul>
                  {[...content.limitations, ...CARE_INSTRUCTIONS].map((item) => (
                    <li
                      key={item}
                      className="font-light leading-relaxed py-2.5"
                      style={{
                        color: 'rgba(250,251,252,0.4)',
                        fontSize: 'clamp(0.85rem, 1.15vw, 0.94rem)',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="px-8 md:px-16 py-20 md:py-28" style={{ borderTop: '1px solid rgba(250,251,252,0.08)' }}>
          <FadeIn y={20}>
            <p
              className="uppercase tracking-[0.28em] font-bold mb-2"
              style={{ color: '#CD0032', fontSize: 'clamp(0.72rem, 1vw, 0.85rem)' }}
            >
              Misma línea
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight mb-9"
              style={{ color: '#FAFBFC', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
            >
              Más de {product.line}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {related.map((p) => (
              <motion.div key={p.id} whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: EASE }}>
                <Link
                  to={`/productos/${p.id}`}
                  className="block relative overflow-hidden h-full"
                  style={{
                    backgroundColor: theme.bg,
                    borderRadius: '10px',
                    textDecoration: 'none',
                    minHeight: '260px',
                  }}
                >
                  <img
                    src={p.image}
                    alt={`Guante de seguridad ${p.name} — Handlove Mexico`}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: 'absolute',
                      left: '8%',
                      right: '8%',
                      top: '6%',
                      width: '84%',
                      height: '62%',
                      objectFit: 'contain',
                      filter: theme.shadow,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="uppercase tracking-[0.2em] font-bold mb-1"
                      style={{ color: theme.label, fontSize: '0.6rem' }}
                    >
                      {p.category}
                    </p>
                    <h3
                      className="font-black uppercase leading-tight"
                      style={{ color: theme.fg, fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)' }}
                    >
                      {p.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
