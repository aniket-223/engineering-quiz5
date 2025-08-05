import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for quiz results (same as in other routes)
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

export async function GET(request: NextRequest, { params }: { params: { resultId: string } }) {
  try {
    const { resultId } = params

    const result = quizResults.find((r) => r.id === resultId)

    if (!result) {
      return NextResponse.json({ message: "Result not found" }, { status: 404 })
    }

    return NextResponse.json({
      result,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
