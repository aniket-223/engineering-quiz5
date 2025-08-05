"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  subject: string
}

interface User {
  id: string
  name: string
  department: string
}

export default function QuizPage() {
  const [user, setUser] = useState<User | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(3000) // 50 minutes in seconds
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchQuestions(parsedUser.department)
  }, [router])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      handleSubmitQuiz()
    }
  }, [timeLeft])

  const fetchQuestions = async (department: string) => {
    try {
      const response = await fetch(`/api/quiz/questions?department=${department}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
      } else {
        toast({
          title: "Error",
          description: "Failed to load questions",
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
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    if (!user) return

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          answers,
          questions,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/quiz/result?resultId=${data.resultId}`)
      } else {
        toast({
          title: "Error",
          description: "Failed to submit quiz",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
          <p className="mt-2 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600">No questions available for your department.</p>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">EngQuiz</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={handleSubmitQuiz} variant="outline">
                Submit Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{currentQuestion.subject}</span>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestionIndex]?.toString()}
              onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, Number.parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} variant="outline">
            Previous
          </Button>

          <div className="text-sm text-gray-600">
            {Object.keys(answers).length} of {questions.length} answered
          </div>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Question Navigation Grid */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Question Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant={
                    currentQuestionIndex === index ? "default" : answers[index] !== undefined ? "secondary" : "outline"
                  }
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className="aspect-square"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
