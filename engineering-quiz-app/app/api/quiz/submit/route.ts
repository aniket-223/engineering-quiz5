import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for quiz results
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

export async function POST(request: NextRequest) {
  try {
    const { userId, answers, questions } = await request.json()

    if (!userId || !answers || !questions) {
      return NextResponse.json({ message: "Missing required data" }, { status: 400 })
    }

    // Calculate score
    let score = 0
    questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correctAnswer) {
        score++
      }
    })

    const percentage = Math.round((score / questions.length) * 100)

    // Create result record
    const result = {
      id: Date.now().toString(),
      userId,
      score,
      totalQuestions: questions.length,
      percentage,
      completedAt: new Date().toISOString(),
      answers,
      questions,
    }

    quizResults.push(result)

    return NextResponse.json({
      message: "Quiz submitted successfully",
      resultId: result.id,
      score,
      percentage,
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
