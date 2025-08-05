import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Building2 } from "lucide-react"

export default function HomePage() {
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
            <div className="flex space-x-4">
              <Link href="/auth/register">
                <Button variant="outline" size="lg">
                  Quick Start
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg">Full Access Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl mb-6">
            Master Your
            <span className="text-blue-600 block">Engineering Skills</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Comprehensive online assessment platform for engineering students. Test your knowledge with 200+ carefully
            curated questions from each department's core subjects.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Assessment Now
              </Button>
            </Link>
            <Link href="#departments">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                View Departments
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white/50 rounded-3xl mb-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4</h3>
              <p className="text-gray-600">Engineering Departments</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">800+</h3>
              <p className="text-gray-600">Total Questions</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50</h3>
              <p className="text-gray-600">Questions Per Quiz</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600">Core Subjects Each</p>
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <div id="departments" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Departments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each department features 200+ questions across 3 core subjects, randomly shuffled for unique assessment
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-600">Mechanical Engineering</CardTitle>
                <CardDescription className="text-lg">200+ Questions Available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="font-medium">Thermal Engineering</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="font-medium">Materials Science</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="font-medium">Strength of Materials</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Electronics Engineering</CardTitle>
                <CardDescription className="text-lg">200+ Questions Available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span className="font-medium">Electronic Devices</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span className="font-medium">Circuit Theory</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span className="font-medium">Digital Electronics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-600">Electrical Engineering</CardTitle>
                <CardDescription className="text-lg">200+ Questions Available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="font-medium">Electrical Machines</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="font-medium">Network Theory</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    <span className="font-medium">Power Systems</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-orange-600">Civil Engineering</CardTitle>
                <CardDescription className="text-lg">200+ Questions Available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    <span className="font-medium">Building Materials</span>
                  </div>
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    <span className="font-medium">Surveying</span>
                  </div>
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    <span className="font-medium">Fluid Mechanics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white mb-16">
          <h2 className="text-4xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of engineering students improving their skills</p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Your Assessment Journey
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">EngQuiz</span>
            </div>
            <p className="text-gray-400 mb-4">Engineering Knowledge Assessment Platform</p>
            <p className="text-sm text-gray-500">© 2024 EngQuiz. Empowering engineering education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
