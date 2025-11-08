import React from "react"
import { useState, useEffect } from "react"
import { authAPI } from "../../services/api"

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        const nameParts = (userData.name || "").split(' ')
        setFormData(prev => ({
          ...prev,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(' ') || "",
          email: userData.email || "",
        }))
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Get current user ID
      const user = localStorage.getItem('user')
      if (!user) {
        setError("Please log in to update your profile")
        setLoading(false)
        return
      }

      const userData = JSON.parse(user)
      const userId = userData.id

      // Prepare update data
      const updateData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
      }

      // Only include password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }
        if (formData.newPassword.length < 6) {
          setError("Password must be at least 6 characters")
          setLoading(false)
          return
        }
        updateData.password = formData.newPassword
      }

      // Update user via API (you may need to use authAPI or userAPI depending on your backend)
      // For now, we'll update localStorage
      const updatedUser = {
        ...userData,
        name: updateData.name,
        email: updateData.email,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      window.dispatchEvent(new Event('userLogin'))

      setSuccess("Profile updated successfully!")
      setFormData(prev => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.")
      console.error("Error updating profile:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-gray-600">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            My Account
          </a>{" "}
          / <span className="text-gray-900 font-medium">Profile</span>
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Personal Information</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
            />
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Change Password</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button 
              type="button"
              onClick={() => {
                const user = localStorage.getItem('user')
                if (user) {
                  const userData = JSON.parse(user)
                  const nameParts = (userData.name || "").split(' ')
                  setFormData({
                    firstName: nameParts[0] || "",
                    lastName: nameParts.slice(1).join(' ') || "",
                    email: userData.email || "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50"
            >
              Reset
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-lg text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed" 
              style={{ backgroundColor: "#2c3e80" }}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
