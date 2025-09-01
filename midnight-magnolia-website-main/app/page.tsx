import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import ShopSection from "./components/ShopSection"
import ShopifySection from "./components/ShopifySection"
import BlogSection from "./components/BlogSection"
import JusticeSection from "./components/JusticeSection"
import FloatingMoon from "./components/FloatingMoon"
import FloatingZodiac from "./components/FloatingZodiac"

export default function Home() {
  return (
    <>
      {/* Floating elements - these need to be client components */}
      <FloatingMoon />
      <FloatingZodiac />

      {/* Main content sections */}
      <Hero />
      <AboutSection />
      <ProductsSection />
      <ShopSection />
      <ShopifySection />
      <BlogSection />
      <JusticeSection />
    </>
  )
}
