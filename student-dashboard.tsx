"use client"

import { useState, useEffect } from "react"
import { LogOut, Search, Filter, Building, DollarSign, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentDashboardProps {
  user: any
  onLogout: () => void
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [placements, setPlacements] = useState([])
  const [filteredPlacements, setFilteredPlacements] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  useEffect(() => {
    // Load placements from localStorage
    const savedPlacements = JSON.parse(localStorage.getItem("placements") || "[]")
    setPlacements(savedPlacements)
    setFilteredPlacements(savedPlacements)
  }, [])

  useEffect(() => {
    // Filter placements based on search and department
    let filtered = placements.filter(
      (placement: any) =>
        placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (departmentFilter !== "all") {
      filtered = filtered.filter((placement: any) => placement.department === departmentFilter)
    }

    setFilteredPlacements(filtered)
  }, [searchTerm, departmentFilter, placements])

  const departments = [...new Set(placements.map((p: any) => p.department))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Placements</p>
                  <p className="text-2xl font-bold text-gray-900">{placements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(placements.map((p: any) => p.companyName)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Package</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {placements.length > 0
                      ? `₹${(placements.reduce((sum: number, p: any) => sum + Number.parseFloat(p.package), 0) / placements.length).toFixed(1)}L`
                      : "₹0L"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by student name or company..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placements List */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Records</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPlacements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No placement records found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPlacements.map((placement: any) => (
                  <div key={placement.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{placement.studentName}</h3>
                        <p className="text-gray-600">{placement.department}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <div className="flex items-center text-green-600 font-semibold">
                          <Building className="h-4 w-4 mr-1" />
                          {placement.companyName}
                        </div>
                        <div className="flex items-center text-blue-600 mt-1">
                          <DollarSign className="h-4 w-4 mr-1" />₹{placement.package} LPA
                        </div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {placement.datePlaced}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
