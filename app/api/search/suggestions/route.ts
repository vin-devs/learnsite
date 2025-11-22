import { type NextRequest, NextResponse } from "next/server"
import { courses, books } from "@/data/seed"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    // Combine all products
    const allProducts = [
      ...courses.map((course) => ({ ...course, type: "course" as const })),
      ...books.map((book) => ({ ...book, type: "book" as const })),
    ]

    // Generate suggestions
    const suggestions = new Set<string>()

    allProducts.forEach((product) => {
      // Add matching titles
      if (product.title.toLowerCase().includes(query)) {
        suggestions.add(product.title)
      }

      // Add matching categories
      if (product.category.toLowerCase().includes(query)) {
        suggestions.add(product.category)
      }

      // Add matching instructors/authors
      if (product.type === "course" && product.instructor.toLowerCase().includes(query)) {
        suggestions.add(product.instructor)
      }
      if (product.type === "book" && product.author.toLowerCase().includes(query)) {
        suggestions.add(product.author)
      }
    })

    // Convert to array and limit to 8 suggestions
    const suggestionArray = Array.from(suggestions).slice(0, 8)

    return NextResponse.json({ suggestions: suggestionArray })
  } catch (error) {
    console.error("Suggestions error:", error)
    return NextResponse.json({ error: "Failed to get suggestions" }, { status: 500 })
  }
}
