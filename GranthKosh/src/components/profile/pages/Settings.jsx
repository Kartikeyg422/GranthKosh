import React, { useState } from "react"

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-gray-600">
          My Account / <span className="font-medium text-gray-900">Settings</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Account Settings</h2>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Email Notifications</p>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Enable Dark Mode</p>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5 accent-blue-600"
            />
          </div>
        </div>

        <button className="mt-8 px-8 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  )
}
