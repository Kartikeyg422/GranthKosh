import React, { useState } from "react"

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Pune, Maharashtra, 411001",
      phone: "+91 98765 43210",
      isDefault: true,
    },
  ])

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-gray-600">
          My Account / <span className="font-medium text-gray-900">Addresses</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Saved Addresses</h2>

        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{addr.name}</h3>
                  <p className="text-gray-600">{addr.address}</p>
                  <p className="text-sm text-gray-500 mt-1">Phone: {addr.phone}</p>
                </div>
                {addr.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <div className="flex gap-4 mt-4">
                <button className="text-blue-600 font-medium hover:underline">Edit</button>
                <button className="text-red-600 font-medium hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Add New Address
        </button>
      </div>
    </div>
  )
}
