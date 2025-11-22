import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params

    // Simulate database lookup delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock order data (in real app, fetch from database)
    const mockOrder = {
      orderId,
      email: "user@example.com",
      total: 149.98,
      items: [
        {
          id: "course-1",
          title: "Complete React Development Bootcamp",
          kind: "course" as const,
          price: 89.99,
        },
        {
          id: "book-1",
          title: "Modern JavaScript Handbook",
          kind: "book" as const,
          price: 29.99,
        },
      ],
      createdAt: new Date().toISOString(),
      status: "completed",
    }

    return NextResponse.json(mockOrder)
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ message: "Order not found" }, { status: 404 })
  }
}
