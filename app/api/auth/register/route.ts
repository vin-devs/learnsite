import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists (mock check)
    if (email === "admin@learnhub.com") {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Create new user (mock)
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      purchases: [],
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would:
    // 1. Hash the password
    // 2. Save user to database
    // 3. Send verification email

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "Account created successfully",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
