import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { ProductsSection } from './sections/ProductsSection'
import { IndustriesSection } from './sections/IndustriesSection'
import { SustainabilitySection } from './sections/SustainabilitySection'
import { FAQSection } from './sections/FAQSection'
import { CTASection } from './sections/CTASection'
import { AboutPage } from './pages/AboutPage'
import { ProductsPage } from './pages/ProductsPage'

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#FAFBFC' }}>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <IndustriesSection />
      <SustainabilitySection />
      <FAQSection />
      <CTASection />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/productos" element={<ProductsPage />} />
      </Routes>
    </>
  )
}
