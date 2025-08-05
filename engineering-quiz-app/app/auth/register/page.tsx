"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Loader2, Eye, EyeOff, User, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const departments = [
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "electronics", label: "Electronics Engineering" },
  { value: "civil", label: "Civil Engineering" },
]

export default function RegisterPage() {
  const [quickFormData, setQuickFormData] = useState({
    name: "",
    institution: "",
    department: "",
  })

  const [fullFormData, setFullFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleQuickStart = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/quick-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quickFormData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user))
        toast({
          title: "Success",
          description: "Welcome! You can start taking quizzes now.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFullRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (fullFormData.password !== fullFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullFormData.name,
          email: fullFormData.email,
          password: fullFormData.password,
          department: fullFormData.department,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Account created successfully!",
        })
        router.push("/auth/login")
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Join EngQuiz</h1>
          <p className="text-gray-600 mt-2">Choose your preferred way to get started</p>
        </div>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="full" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Full Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>
                  Start immediately with just your basic information. No email or password required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuickStart} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quick-name">Student Name</Label>
                    <Input
                      id="quick-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={quickFormData.name}
                      onChange={(e) => setQuickFormData({ ...quickFormData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution Name</Label>
                    <Input
                      id="institution"
                      type="text"
                      placeholder="Enter your college/university name"
                      value={quickFormData.institution}
                      onChange={(e) => setQuickFormData({ ...quickFormData, institution: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quick-department">Engineering Department</Label>
                    <Select
                      value={quickFormData.department}
                      onValueChange={(value) => setQuickFormData({ ...quickFormData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Start Quiz Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="full">
            <Card>
              <CardHeader>
                <CardTitle>Create Full Account</CardTitle>
                <CardDescription>
                  Create a full account to save your progress and track performance over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFullRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullFormData.name}
                      onChange={(e) => setFullFormData({ ...fullFormData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={fullFormData.email}
                      onChange={(e) => setFullFormData({ ...fullFormData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full-department">Engineering Department</Label>
                    <Select
                      value={fullFormData.department}
                      onValueChange={(value) => setFullFormData({ ...fullFormData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={fullFormData.password}
                        onChange={(e) => setFullFormData({ ...fullFormData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={fullFormData.confirmPassword}
                        onChange={(e) => setFullFormData({ ...fullFormData, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
