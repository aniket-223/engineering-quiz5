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
}> = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, department } = await request.json()

    // Validate input
    if (!name || !email || !password || !department) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      department,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
