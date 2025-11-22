"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ProductGrid } from "@/components/shared/product-grid"
import { courses, books } from "@/data/seed"
import type { Course, Book } from "@/lib/types"

type SearchFilters = {
  categories: string[]
  types: string[]
  priceRange: [number, number]
  difficulty: string[]
  rating: number
}

const defaultFilters: SearchFilters = {
  categories: [],
  types: [],
  priceRange: [0, 200],
  difficulty: [],
  rating: 0,
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters)
  const [sortBy, setSortBy] = useState("relevance")

  // Combine courses and books for search
  const allProducts = useMemo(
    () => [
      ...courses.map((course) => ({ ...course, type: "course" as const })),
      ...books.map((book) => ({ ...book, type: "book" as const })),
    ],
    [],
  )

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allProducts.forEach((product) => cats.add(product.category))
    return Array.from(cats)
  }, [allProducts])

  const difficulties = useMemo(() => {
    const diffs = new Set<string>()
    courses.forEach((course) => course.difficulty && diffs.add(course.difficulty))
    return Array.from(diffs)
  }, [])

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let results = allProducts

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.type === "course" && (product as Course).instructor.toLowerCase().includes(query)) ||
          (product.type === "book" && (product as Book).author.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      results = results.filter((product) => filters.categories.includes(product.category))
    }

    // Type filter
    if (filters.types.length > 0) {
      results = results.filter((product) => filters.types.includes(product.type))
    }

    // Price range filter
    results = results.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Difficulty filter (courses only)
    if (filters.difficulty.length > 0) {
      results = results.filter(
        (product) =>
          product.type === "book" ||
          (product.type === "course" && filters.difficulty.includes((product as Course).difficulty)),
      )
    }

    // Rating filter
    if (filters.rating > 0) {
      results = results.filter((product) => product.rating >= filters.rating)
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    return results
  }, [allProducts, searchQuery, filters, sortBy])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
  }

  const activeFilterCount =
    filters.categories.length +
    filters.types.length +
    filters.difficulty.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange("categories", [...filters.categories, category])
                  } else {
                    handleFilterChange(
                      "categories",
                      filters.categories.filter((c) => c !== category),
                    )
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Content Type */}
      <div>
        <h3 className="font-semibold mb-3">Content Type</h3>
        <div className="space-y-2">
          {["course", "book"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange("types", [...filters.types, type])
                  } else {
                    handleFilterChange(
                      "types",
                      filters.types.filter((t) => t !== type),
                    )
                  }
                }}
              />
              <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                {type}s
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
            max={200}
            min={0}
            step={5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Difficulty (Courses only) */}
      <div>
        <h3 className="font-semibold mb-3">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <div key={difficulty} className="flex items-center space-x-2">
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={filters.difficulty.includes(difficulty)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange("difficulty", [...filters.difficulty, difficulty])
                  } else {
                    handleFilterChange(
                      "difficulty",
                      filters.difficulty.filter((d) => d !== difficulty),
                    )
                  }
                }}
              />
              <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                {difficulty}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <Select
          value={filters.rating.toString()}
          onValueChange={(value) => handleFilterChange("rating", Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            {searchQuery && (
              <p className="text-muted-foreground">
                Showing results for "{searchQuery}" ({filteredProducts.length} found)
              </p>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses and books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                  {activeFilterCount > 0 && (
                    <Button variant="outline" onClick={clearFilters} className="w-full mt-4 bg-transparent">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filter Toggle */}
            <Button variant="outline" className="hidden md:flex bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <FilterContent />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  clearFilters()
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
