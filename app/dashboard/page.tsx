"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Play, Download, Clock, Calendar, Trophy, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { allProducts } from "@/data/seed"
import type { Course, Book } from "@/lib/types"

interface PurchasedCourse extends Course {
  progress: number
  lastAccessed: string
  completedLessons: number
}

interface PurchasedBook extends Book {
  downloadedAt?: string
  readingProgress?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([])
  const [purchasedBooks, setPurchasedBooks] = useState<PurchasedBook[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (user && user.purchases.length > 0) {
      // Get purchased products and add mock progress data
      const purchased = allProducts.filter((product) => user.purchases.includes(product.id))

      const courses = purchased
        .filter((p) => p.kind === "course")
        .map((course) => ({
          ...(course as Course),
          progress: Math.floor(Math.random() * 100), // Mock progress
          lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random last 7 days
          completedLessons: Math.floor(Math.random() * (course as Course).lessonsCount),
        })) as PurchasedCourse[]

      const books = purchased
        .filter((p) => p.kind === "book")
        .map((book) => ({
          ...(book as Book),
          downloadedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random last 30 days
          readingProgress: Math.floor(Math.random() * 100),
        })) as PurchasedBook[]

      setPurchasedCourses(courses)
      setPurchasedBooks(books)
    }
  }, [user, isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect to login
  }

  const totalCourses = purchasedCourses.length
  const totalBooks = purchasedBooks.length
  const completedCourses = purchasedCourses.filter((c) => c.progress >= 100).length
  const averageProgress = totalCourses > 0 ? purchasedCourses.reduce((acc, c) => acc + c.progress, 0) / totalCourses : 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-muted-foreground">Continue your learning journey</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalCourses}</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedCourses}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalBooks}</p>
                    <p className="text-sm text-muted-foreground">Books</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{Math.round(averageProgress)}%</p>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        {totalCourses === 0 && totalBooks === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by exploring our courses and books
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/books">Browse Books</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="courses">My Courses ({totalCourses})</TabsTrigger>
              <TabsTrigger value="books">My Books ({totalBooks})</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {purchasedCourses.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                    <p className="text-muted-foreground mb-4">Discover amazing courses to boost your skills</p>
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedCourses.map((course) => (
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
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary">Course</Badge>
                          </div>
                          {course.progress >= 100 && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-green-600">Completed</Badge>
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">by {course.author}</p>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {course.completedLessons}/{course.lessonsCount} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(course.lastAccessed).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            {course.progress > 0 ? "Continue" : "Start Course"}
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/product/${course.slug}`}>
                              <BookOpen className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="space-y-6">
              {purchasedBooks.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No books yet</h3>
                    <p className="text-muted-foreground mb-4">Build your digital library with our collection</p>
                    <Button asChild>
                      <Link href="/books">Browse Books</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedBooks.map((book) => (
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
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary">Book</Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">by {book.author}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {book.pages} pages
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {book.rating}
                            </span>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <p>Format: {book.format}</p>
                            {book.downloadedAt && (
                              <p className="flex items-center gap-1 mt-1">
                                <Download className="h-3 w-3" />
                                Downloaded {new Date(book.downloadedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>

                          {book.readingProgress && book.readingProgress > 0 && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Reading Progress</span>
                                <span>{book.readingProgress}%</span>
                              </div>
                              <Progress value={book.readingProgress} className="h-2" />
                            </div>
                          )}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/product/${book.slug}`}>
                              <BookOpen className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Recent Activity */}
        {(totalCourses > 0 || totalBooks > 0) && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchasedCourses.slice(0, 3).map((course) => (
                  <div key={`activity-${course.id}`} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Play className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Last accessed {new Date(course.lastAccessed).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{course.progress}% complete</p>
                      <Progress value={course.progress} className="w-20 h-1 mt-1" />
                    </div>
                  </div>
                ))}

                {purchasedBooks.slice(0, 2).map((book) => (
                  <div key={`activity-${book.id}`} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {book.downloadedAt
                          ? `Downloaded ${new Date(book.downloadedAt).toLocaleDateString()}`
                          : "Available for download"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
