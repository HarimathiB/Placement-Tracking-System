"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import StudentLogin from "@/components/student-login"
import AdminLogin from "@/components/admin-login"
import StudentDashboard from "@/components/student-dashboard"
import AdminDashboard from "@/components/admin-dashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [user, setUser] = useState(null)

  const handleLogin = (userData, userType) => {
    setUser({ ...userData, type: userType })
    if (userType === "student") {
      setCurrentPage("student-dashboard")
    } else {
      setCurrentPage("admin-dashboard")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("landing")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} />
      case "student-login":
        return <StudentLogin onLogin={handleLogin} onBack={() => setCurrentPage("landing")} />
      case "admin-login":
        return <AdminLogin onLogin={handleLogin} onBack={() => setCurrentPage("landing")} />
      case "student-dashboard":
        return <StudentDashboard user={user} onLogout={handleLogout} />
      case "admin-dashboard":
        return <AdminDashboard user={user} onLogout={handleLogout} />
      default:
        return <LandingPage onNavigate={setCurrentPage} />
    }
  }

  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">{renderPage()}</div>
}
