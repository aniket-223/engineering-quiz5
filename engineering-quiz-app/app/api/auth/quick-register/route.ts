import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for quick users
const quickUsers: Array<{
  id: string
  name: string
  institution: string
  department: string
  type: "quick"
  createdAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { name, institution, department } = await request.json()

    // Validate input
    if (!name || !institution || !department) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Create new quick user
    const newUser = {
      id: Date.now().toString(),
      name,
      institution,
      department,
      type: "quick" as const,
      createdAt: new Date().toISOString(),
    }

    quickUsers.push(newUser)

    return NextResponse.json(
      {
        message: "Quick registration successful",
        user: newUser,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
