"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { LogOut, Plus, Edit, Trash2, User, Building, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface AdminDashboardProps {
  user: any
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [placements, setPlacements] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlacement, setEditingPlacement] = useState(null)
  const [formData, setFormData] = useState({
    studentName: "",
    department: "",
    companyName: "",
    package: "",
    datePlaced: "",
  })

  useEffect(() => {
    // Load placements from localStorage
    const savedPlacements = JSON.parse(localStorage.getItem("placements") || "[]")
    setPlacements(savedPlacements)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let updatedPlacements
    if (editingPlacement) {
      // Update existing placement
      updatedPlacements = placements.map((p: any) =>
        p.id === editingPlacement.id ? { ...formData, id: editingPlacement.id } : p,
      )
    } else {
      // Add new placement
      const newPlacement = { ...formData, id: Date.now() }
      updatedPlacements = [...placements, newPlacement]
    }

    setPlacements(updatedPlacements)
    localStorage.setItem("placements", JSON.stringify(updatedPlacements))

    // Reset form
    setFormData({
      studentName: "",
      department: "",
      companyName: "",
      package: "",
      datePlaced: "",
    })
    setEditingPlacement(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (placement: any) => {
    setEditingPlacement(placement)
    setFormData({
      studentName: placement.studentName,
      department: placement.department,
      companyName: placement.companyName,
      package: placement.package,
      datePlaced: placement.datePlaced,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    const updatedPlacements = placements.filter((p: any) => p.id !== id)
    setPlacements(updatedPlacements)
    localStorage.setItem("placements", JSON.stringify(updatedPlacements))
  }

  const resetForm = () => {
    setFormData({
      studentName: "",
      department: "",
      companyName: "",
      package: "",
      datePlaced: "",
    })
    setEditingPlacement(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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

        {/* Add Placement Button */}
        <div className="mb-6">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Placement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingPlacement ? "Edit Placement" : "Add New Placement"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="package">Package (LPA)</Label>
                  <Input
                    id="package"
                    type="number"
                    step="0.1"
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="datePlaced">Date Placed</Label>
                  <Input
                    id="datePlaced"
                    type="date"
                    value={formData.datePlaced}
                    onChange={(e) => setFormData({ ...formData, datePlaced: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingPlacement ? "Update Placement" : "Add Placement"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Placements List */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Records</CardTitle>
          </CardHeader>
          <CardContent>
            {placements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No placement records found. Add your first placement!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {placements.map((placement: any) => (
                  <div key={placement.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{placement.studentName}</h3>
                        <p className="text-gray-600">{placement.department}</p>
                        <div className="flex items-center text-green-600 font-semibold mt-1">
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
                      <div className="flex space-x-2 mt-4 sm:mt-0">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(placement)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(placement.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
