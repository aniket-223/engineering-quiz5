import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for quiz results (same as in submit route)
const quizResults: Array<{
  id: string
  userId: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
  answers: { [key: number]: number }
  questions: any[]
}> = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Get results for the user
    const userResults = quizResults
      .filter((result) => result.userId === userId)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())

    return NextResponse.json({
      results: userResults.map((result) => ({
        id: result.id,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        completedAt: result.completedAt,
      })),
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
