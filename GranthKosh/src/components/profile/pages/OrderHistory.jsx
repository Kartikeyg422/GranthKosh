import React, { useState, useEffect } from "react"
import { orderAPI } from "../../../services/api"

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderAPI.getMyOrders()
      const ordersList = Array.isArray(response) ? response : (response.orders || [])
      setOrders(ordersList)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <p className="text-gray-600">
          My Account / <span className="font-medium text-gray-900">Order History</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Order History</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 mb-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Your order history will appear here</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id || order.id} className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order #{order.orderNumber || order._id || order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.createdAt 
                      ? new Date(order.createdAt).toLocaleDateString()
                      : order.date || "N/A"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.status === "completed" || order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending" || order.status === "Shipped"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Pending"}
                </span>
              </div>
              <ul className="mt-4 text-gray-700 list-disc list-inside">
                {order.items?.map((item, index) => (
                  <li key={index}>
                    {typeof item === 'string' ? item : item.title || item.name || "Unknown Item"}
                    {typeof item === 'object' && item.quantity && ` (Qty: ${item.quantity})`}
                  </li>
                )) || (
                  <li>No items found</li>
                )}
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Total: <span className="font-semibold">
                  ${typeof order.total === 'number' 
                    ? order.total.toFixed(2) 
                    : order.total || "0.00"}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
