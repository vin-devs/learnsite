import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "./add-to-cart-button"

// Mock data - TODO: Replace with real data
const featuredCourses = [
  {
    id: "course-1",
    slug: "complete-react-development-bootcamp",
    kind: "course" as const,
    title: "Complete React Development Bootcamp",
    author: "Sarah Johnson",
    rating: 4.8,
    reviewCount: 2847,
    price: 89.99,
    oldPrice: 129.99,
    thumbnail: "/react-development-course.png",
    badge: "Bestseller",
    level: "Beginner",
    duration: 40,
    students: 15420,
    categories: ["programming", "web-development", "react"],
    description: "Master React from the ground up with this comprehensive bootcamp.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
  },
  {
    id: "course-2",
    slug: "advanced-python-data-science",
    kind: "course" as const,
    title: "Advanced Python for Data Science",
    author: "Dr. Michael Chen",
    rating: 4.9,
    reviewCount: 1923,
    price: 119.99,
    thumbnail: "/python-data-science-course.png",
    badge: "New",
    level: "Advanced",
    duration: 60,
    students: 8930,
    categories: ["programming", "data-science", "python"],
    description: "Deep dive into data science with Python.",
    createdAt: "2024-02-20",
    updatedAt: "2024-03-15",
  },
]

const featuredBooks = [
  {
    id: "book-1",
    slug: "modern-javascript-handbook",
    kind: "book" as const,
    title: "Modern JavaScript Handbook",
    author: "Alex Rodriguez",
    rating: 4.7,
    reviewCount: 1834,
    price: 29.99,
    oldPrice: 39.99,
    thumbnail: "/javascript-programming-book.png",
    badge: "Popular",
    pages: 450,
    format: "PDF + EPUB",
    categories: ["programming", "javascript", "web-development"],
    description: "A comprehensive guide to modern JavaScript features and best practices.",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-15",
  },
  {
    id: "book-2",
    slug: "ui-ux-design-principles",
    kind: "book" as const,
    title: "UI/UX Design Principles",
    author: "Emma Wilson",
    rating: 4.6,
    reviewCount: 967,
    price: 34.99,
    thumbnail: "/ui-ux-design-book.jpg",
    pages: 320,
    format: "PDF",
    categories: ["design", "ui-ux", "principles"],
    description: "Master the fundamental principles of user interface and user experience design.",
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
]

export function FeaturedSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Featured Courses */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Top Courses</h2>
            <Button variant="outline" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {course.badge && <Badge className="absolute top-3 left-3">{course.badge}</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">by {course.author}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">${course.price}</span>
                    {course.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">${course.oldPrice}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <AddToCartButton product={course} className="w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Books */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Popular Books</h2>
            <Button variant="outline" asChild>
              <Link href="/books">View All Books</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={book.thumbnail || "/placeholder.svg"}
                      alt={book.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {book.badge && <Badge className="absolute top-3 left-3">{book.badge}</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">by {book.author}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{book.pages} pages</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-foreground">${book.price}</span>
                    {book.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">${book.oldPrice}</span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{book.format}</p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <AddToCartButton product={book} className="w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
