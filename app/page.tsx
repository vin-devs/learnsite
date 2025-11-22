import { Navbar } from "@/components/shared/navbar"
import { Hero } from "@/components/shared/hero"
import { FeaturedSection } from "@/components/shared/featured-section"
import { CategoryGrid } from "@/components/shared/category-grid"
import { Footer } from "@/components/shared/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedSection />
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  )
}
