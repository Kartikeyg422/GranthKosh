import React, { useState } from "react"

export default function PaymentMethods() {
  const [cards] = useState([
    { id: 1, brand: "Visa", last4: "1234", expiry: "10/27", isDefault: true },
    { id: 2, brand: "MasterCard", last4: "9876", expiry: "03/26" },
  ])

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-gray-600">
          My Account / <span className="font-medium text-gray-900">Payment Methods</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Payment Methods</h2>

        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div>
              <p className="font-semibold text-gray-900">{card.brand} •••• {card.last4}</p>
              <p className="text-sm text-gray-500">Expires {card.expiry}</p>
            </div>
            <div className="flex gap-3">
              {card.isDefault ? (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Default</span>
              ) : (
                <button className="text-blue-600 font-medium hover:underline">Set as Default</button>
              )}
              <button className="text-red-600 font-medium hover:underline">Remove</button>
            </div>
          </div>
        ))}

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Add Payment Method
        </button>
      </div>
    </div>
  )
}
