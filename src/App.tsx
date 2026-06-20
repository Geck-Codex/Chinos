import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { HeroSection } from './sections/HeroSection'

const FeaturesSection = lazy(() => import('./sections/FeaturesSection').then((m) => ({ default: m.FeaturesSection })))
const ProductsSection = lazy(() => import('./sections/ProductsSection').then((m) => ({ default: m.ProductsSection })))
const SustainabilitySection = lazy(() => import('./sections/SustainabilitySection').then((m) => ({ default: m.SustainabilitySection })))
const FAQSection = lazy(() => import('./sections/FAQSection').then((m) => ({ default: m.FAQSection })))
const CTASection = lazy(() => import('./sections/CTASection').then((m) => ({ default: m.CTASection })))

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })))

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#FAFBFC' }}>
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
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
