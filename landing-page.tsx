"use client"

import { GraduationCap, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LandingPageProps {
  onNavigate: (page: string) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">TechVarsity College</h1>
              <p className="text-sm text-gray-600">Placement Tracking System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Placement Tracker</h2>
            <p className="text-xl text-gray-600 mb-8">Track and manage student placements efficiently</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Student Login Card */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate("student-login")}
            >
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Student Login</h3>
                <p className="text-gray-600 mb-6">View placement records and track your career progress</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Login as Student</Button>
              </CardContent>
            </Card>

            {/* Admin Login Card */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate("admin-login")}
            >
              <CardContent className="p-8 text-center">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Admin Login</h3>
                <p className="text-gray-600 mb-6">Manage student data and placement records</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Login as Admin</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 TechVarsity College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
