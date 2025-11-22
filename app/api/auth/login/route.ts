import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const mockUsers = [
  {
    id: "1",
    email: "admin@learnhub.com",
    password: "password123", // In real app, this would be hashed
    name: "Admin User",
    avatar: "/placeholder.svg?height=40&width=40",
    purchases: ["course-1", "book-1"],
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    purchases: [],
    createdAt: "2024-02-01T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find user by email
    const user = mockUsers.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
