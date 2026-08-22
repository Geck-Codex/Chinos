import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { ScrollUpButton } from './components/ScrollUpButton'
import { HeroSection } from './sections/HeroSection'
import { Seo } from './seo/Seo'

const FeaturesSection = lazy(() => import('./sections/FeaturesSection').then((m) => ({ default: m.FeaturesSection })))
const ProductsSection = lazy(() => import('./sections/ProductsSection').then((m) => ({ default: m.ProductsSection })))
const SustainabilitySection = lazy(() => import('./sections/SustainabilitySection').then((m) => ({ default: m.SustainabilitySection })))
const FAQSection = lazy(() => import('./sections/FAQSection').then((m) => ({ default: m.FAQSection })))
const CTASection = lazy(() => import('./sections/CTASection').then((m) => ({ default: m.CTASection })))

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })))
const ProductPage = lazy(() => import('./pages/ProductPage').then((m) => ({ default: m.ProductPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const LANDING_FAQS = [
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

const landingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: LANDING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#FAFBFC' }}>
      <Seo path="/" jsonLd={landingJsonLd} />
      <HeroSection />
      <Suspense fallback={null}>
        <FeaturesSection />
        <ProductsSection />
        <SustainabilitySection />
        <FAQSection />
        <CTASection />
      </Suspense>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/productos/:slug" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <ScrollUpButton />
    </>
  )
}
