import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { ProductsSection } from './sections/ProductsSection'
import { DifferentiatorsSection } from './sections/DifferentiatorsSection'
import { IndustriesSection } from './sections/IndustriesSection'
import { SustainabilitySection } from './sections/SustainabilitySection'
import { FAQSection } from './sections/FAQSection'
import { CTASection } from './sections/CTASection'

export default function App() {
  return (
    <div style={{ backgroundColor: '#FAFBFC' }}>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <FeaturesSection />
      <ProductsSection />
      <DifferentiatorsSection />
      <IndustriesSection />
      <SustainabilitySection />
      <FAQSection />
      <CTASection />
    </div>
  )
}
