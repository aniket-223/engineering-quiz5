import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In-memory storage (replace with actual database)
const users: Array<{
  id: string
  name: string
  email: string
  password: string
  department: string
  createdAt: string
}> = [
  // Demo users for testing
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password123
    department: "mechanical",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password123
    department: "electrical",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
