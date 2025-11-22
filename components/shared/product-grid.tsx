"use client"

import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function ProductGrid({ products, currentPage = 1, totalPages = 1, onPageChange }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button variant="outline" onClick={() => onPageChange?.(currentPage - 1)} disabled={currentPage <= 1}>
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
