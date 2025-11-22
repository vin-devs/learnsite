"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { ProductGrid } from "@/components/shared/product-grid"
import { FiltersPanel, type FilterState } from "@/components/shared/filters-panel"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { books } from "@/data/seed"

const PRODUCTS_PER_PAGE = 9

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    type: "book", // Pre-filter to books only
    categories: [],
    level: [],
    priceRange: [0, 200],
    rating: 0,
    sortBy: "popular",
  })

  const filteredProducts = useMemo(() => {
    let products = [...books]

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      products = products.filter((product) => product.categories.some((cat) => filters.categories.includes(cat)))
    }

    // Price range filter
    products = products.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Rating filter
    if (filters.rating > 0) {
      products = products.filter((product) => product.rating >= filters.rating)
    }

    // Sort
    switch (filters.sortBy) {
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default: // popular
        products.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return products
  }, [searchQuery, filters])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  )

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters({ ...newFilters, type: "book" }) // Keep type as book
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Digital Books</h1>
          <p className="text-muted-foreground mb-6">
            Expand your knowledge with our curated collection of digital books
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FiltersPanel filters={filters} onFiltersChange={handleFiltersChange} className="w-64 shrink-0" />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} books
              </p>

              {/* Mobile Filters Button */}
              <FiltersPanel filters={filters} onFiltersChange={handleFiltersChange} />
            </div>

            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
