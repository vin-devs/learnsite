import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Product, Course, Book } from "@/lib/types"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isCourse = product.kind === "course"
  const course = product as Course
  const book = product as Book

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{product.badge}</Badge>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs">
              {isCourse ? "Course" : "Book"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-3">by {product.author}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span className="text-xs">({product.reviewCount})</span>
          </div>

          {isCourse ? (
            <>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}h</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.studentsCount.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{book.pages} pages</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-foreground">${product.price}</span>
          {product.oldPrice && <span className="text-lg text-muted-foreground line-through">${product.oldPrice}</span>}
        </div>

        {isCourse && (
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        )}
        {!isCourse && <p className="text-sm text-muted-foreground">{book.format}</p>}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  )
}
