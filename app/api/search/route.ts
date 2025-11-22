import { type NextRequest, NextResponse } from "next/server"
import { courses, books } from "@/data/seed"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
  const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "1000")
  const difficulty = searchParams.get("difficulty")
  const minRating = Number.parseFloat(searchParams.get("minRating") || "0")

  try {
    // Combine all products
    const allProducts = [
      ...courses.map((course) => ({ ...course, type: "course" as const })),
      ...books.map((book) => ({ ...book, type: "book" as const })),
    ]

    // Filter products
    const results = allProducts.filter((product) => {
      // Text search
      const matchesQuery =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.type === "course" && product.instructor.toLowerCase().includes(query)) ||
        (product.type === "book" && product.author.toLowerCase().includes(query))

      // Category filter
      const matchesCategory = !category || product.category === category

      // Type filter
      const matchesType = !type || product.type === type

      // Price filter
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice

      // Difficulty filter (courses only)
      const matchesDifficulty =
        !difficulty || product.type === "book" || (product.type === "course" && product.difficulty === difficulty)

      // Rating filter
      const matchesRating = product.rating >= minRating

      return matchesQuery && matchesCategory && matchesType && matchesPrice && matchesDifficulty && matchesRating
    })

    return NextResponse.json({
      results,
      total: results.length,
      query: query || null,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
