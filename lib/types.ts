export interface Product {
  id: string
  slug: string
  kind: "course" | "book"
  title: string
  author: string
  rating: number
  reviewCount: number
  price: number
  oldPrice?: number
  badge?: string
  thumbnail: string
  categories: string[]
  description: string
  createdAt: string
  updatedAt: string
}

export interface Course extends Product {
  kind: "course"
  level: "Beginner" | "Intermediate" | "Advanced"
  lessonsCount: number
  duration: number // in hours
  language: string
  syllabus: {
    title: string
    items: string[]
  }[]
  previewVideoUrl?: string
  whatYouWillLearn: string[]
  requirements: string[]
  studentsCount: number
}

export interface Book extends Product {
  kind: "book"
  pages: number
  format: "PDF" | "EPUB" | "PDF + EPUB"
  sampleImages: string[]
  tableOfContents: string[]
  publishedDate: string
}

export interface CartItem {
  productId: string
  kind: "course" | "book"
  title: string
  price: number
  quantity: number
  thumbnail: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  purchases: string[] // product IDs
}
