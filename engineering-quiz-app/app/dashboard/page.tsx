"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Play, TrendingUp, Clock, Award, LogOut, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuizResult {
  id: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any | null>(null)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/register")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchQuizResults(parsedUser.id)
  }, [router])

  const fetchQuizResults = async (userId: string) => {
    try {
      const response = await fetch(`/api/quiz/results?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setQuizResults(data.results)
      }
    } catch (error) {
      console.error("Failed to fetch quiz results:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const startQuiz = () => {
    router.push("/quiz")
  }

  const getDepartmentSubjects = (department: string) => {
    const subjects = {
      mechanical: ["Thermal Engineering", "Materials Science", "Strength of Materials"],
      electrical: ["Electrical Machines", "Network Theory", "Power Systems"],
      electronics: ["Electronic Devices", "Circuit Theory", "Digital Electronics"],
      civil: ["Building Materials", "Surveying", "Fluid Mechanics"],
    }
    return subjects[department as keyof typeof subjects] || []
  }

  const getAverageScore = () => {
    if (quizResults.length === 0) return 0
    const total = quizResults.reduce((sum, result) => sum + result.percentage, 0)
    return Math.round(total / quizResults.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
          <p className="mt-4 text-xl text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <GraduationCap className="h-10 w-10 text-blue-600" />
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-900">EngQuiz</span>
                <p className="text-sm text-gray-600">Engineering Knowledge Assessment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {user.type === "quick" ? user.institution : user.email} • {user.department}
                </p>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to test your knowledge in {user.department} engineering? Each quiz contains 50 randomly selected
            questions from our comprehensive question bank.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-2 border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Quizzes Taken</CardTitle>
              <Clock className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{quizResults.length}</div>
              <p className="text-xs text-gray-600 mt-1">Total assessments completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-2 border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{getAverageScore()}%</div>
              <p className="text-xs text-gray-600 mt-1">Overall performance</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-2 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Department</CardTitle>
              <Award className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 capitalize">{user.department}</div>
              <p className="text-xs text-gray-600 mt-1">Engineering specialization</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-2 border-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Questions Bank</CardTitle>
              <GraduationCap className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">200+</div>
              <p className="text-xs text-gray-600 mt-1">Available questions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 flex items-center">
                <Play className="h-6 w-6 mr-2" />
                Start New Assessment
              </CardTitle>
              <CardDescription className="text-lg">
                Take a comprehensive quiz with 50 randomly selected questions from your department's question bank
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Your Department Subjects:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {getDepartmentSubjects(user.department).map((subject, index) => (
                    <div key={subject} className="flex items-center p-2 bg-white rounded-md">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-purple-500"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-700">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                </div>
              </div>

              <Button onClick={startQuiz} className="w-full text-lg py-6" size="lg">
                <Play className="h-5 w-5 mr-2" />
                Begin Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card className="bg-white/70 backdrop-blur-sm border-2 border-green-100">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Recent Performance
              </CardTitle>
              <CardDescription className="text-lg">Your latest quiz results and performance trends</CardDescription>
            </CardHeader>
            <CardContent>
              {quizResults.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No assessments yet</p>
                  <p className="text-gray-400">Take your first quiz to see results here!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizResults.slice(0, 5).map((result, index) => (
                    <div key={result.id} className="flex justify-between items-center p-4 bg-white rounded-lg border">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                            result.percentage >= 80
                              ? "bg-green-500"
                              : result.percentage >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {result.score}/{result.totalQuestions} correct
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(result.completedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge variant={result.percentage >= 70 ? "default" : "secondary"} className="text-lg px-3 py-1">
                        {result.percentage}%
                      </Badge>
                    </div>
                  ))}

                  {quizResults.length > 5 && (
                    <div className="text-center pt-4">
                      <p className="text-gray-500">And {quizResults.length - 5} more assessments...</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {user.type === "quick" ? (
                  <Building2 className="h-12 w-12 mr-4" />
                ) : (
                  <Building2 className="h-12 w-12 mr-4" />
                )}
                <div>
                  <h3 className="text-2xl font-bold">{user.name}</h3>
                  <p className="text-blue-100">
                    {user.type === "quick"
                      ? `${user.institution} • ${user.department} Engineering`
                      : `${user.email} • ${user.department} Engineering`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{quizResults.length}</p>
                <p className="text-blue-100">Assessments Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
