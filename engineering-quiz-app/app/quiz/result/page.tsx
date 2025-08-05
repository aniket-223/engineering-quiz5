"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, TrendingUp, MessageSquare, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuizResult {
  id: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
  answers: { [key: number]: number }
  questions: Array<{
    id: string
    question: string
    options: string[]
    correctAnswer: number
    subject: string
  }>
}

export default function ResultPage() {
  const [result, setResult] = useState<QuizResult | null>(null)
  const [remarks, setRemarks] = useState("")
  const [loading, setLoading] = useState(true)
  const [submittingRemarks, setSubmittingRemarks] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const resultId = searchParams.get("resultId")
    if (!resultId) {
      router.push("/dashboard")
      return
    }

    fetchResult(resultId)
  }, [searchParams, router])

  const fetchResult = async (resultId: string) => {
    try {
      const response = await fetch(`/api/quiz/result/${resultId}`)
      if (response.ok) {
        const data = await response.json()
        setResult(data.result)
      } else {
        toast({
          title: "Error",
          description: "Failed to load quiz result",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRemarks = async () => {
    if (!result || !remarks.trim()) return

    setSubmittingRemarks(true)
    try {
      const response = await fetch("/api/quiz/remarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultId: result.id,
          remarks: remarks.trim(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Remarks submitted successfully!",
        })
        setRemarks("")
      } else {
        toast({
          title: "Error",
          description: "Failed to submit remarks",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setSubmittingRemarks(false)
    }
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return "default"
    if (percentage >= 60) return "secondary"
    return "destructive"
  }

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! Outstanding performance!"
    if (percentage >= 80) return "Great job! Very good performance!"
    if (percentage >= 70) return "Good work! Above average performance!"
    if (percentage >= 60) return "Fair performance. Keep practicing!"
    return "Needs improvement. Consider reviewing the topics."
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
          <p className="mt-2 text-gray-600">Loading quiz results...</p>
        </div>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">EngQuiz</span>
            </div>
            <Button onClick={() => router.push("/dashboard")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Quiz Completed!</h1>
          <p className="text-gray-600 mt-2">Here are your results</p>
        </div>

        {/* Score Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">
              <span className={getScoreColor(result.percentage)}>{result.percentage}%</span>
            </CardTitle>
            <CardDescription className="text-lg">
              {result.score} out of {result.totalQuestions} questions correct
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant={getScoreBadgeVariant(result.percentage)} className="text-lg px-4 py-2">
              {getPerformanceMessage(result.percentage)}
            </Badge>
            <div className="mt-4 text-sm text-gray-600">
              Completed on {new Date(result.completedAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const subjectStats: { [key: string]: { correct: number; total: number } } = {}

                result.questions.forEach((question, index) => {
                  if (!subjectStats[question.subject]) {
                    subjectStats[question.subject] = { correct: 0, total: 0 }
                  }
                  subjectStats[question.subject].total++
                  if (result.answers[index] === question.correctAnswer) {
                    subjectStats[question.subject].correct++
                  }
                })

                return (
                  <div className="space-y-4">
                    {Object.entries(subjectStats).map(([subject, stats]) => {
                      const percentage = Math.round((stats.correct / stats.total) * 100)
                      return (
                        <div key={subject}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{subject}</span>
                            <span className="text-sm text-gray-600">
                              {stats.correct}/{stats.total} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </CardContent>
          </Card>

          {/* Remarks Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Your Remarks
              </CardTitle>
              <CardDescription>Share your thoughts about the quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="remarks">Comments or Feedback</Label>
                  <Textarea
                    id="remarks"
                    placeholder="How was the quiz? Any suggestions or feedback?"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  onClick={handleSubmitRemarks}
                  disabled={!remarks.trim() || submittingRemarks}
                  className="w-full"
                >
                  {submittingRemarks ? "Submitting..." : "Submit Remarks"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={() => router.push("/quiz")} variant="outline">
            Take Another Quiz
          </Button>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </main>
    </div>
  )
}
