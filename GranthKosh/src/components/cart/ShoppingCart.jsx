import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CartItem from "./CartItem"
import OrderSummary from "./OrderSummary"
import { cartAPI } from "../../services/api"

export default function ShoppingCart() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
    
    // Listen for cart updates
    const handleStorageChange = () => {
      loadCart()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
    }
  }, [])

  const loadCart = () => {
    const cartItems = cartAPI.getCart()
    setItems(cartItems)
    setLoading(false)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) return
    const updatedCart = cartAPI.updateQuantity(productId, newQuantity)
    setItems(updatedCart)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleRemove = (productId) => {
    const updatedCart = cartAPI.removeItem(productId)
    setItems(updatedCart)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)

  return (
    <main className="px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <span>Cart</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items section */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Your Shopping Cart</h1>

          {loading ? (
            <div className="space-y-4 mb-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 p-6 border border-gray-200 rounded-lg animate-pulse">
                  <div className="w-24 h-32 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 mb-8">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <CartItem 
                  key={item.productId} 
                  item={{
                    id: item.productId,
                    title: item.title,
                    author: item.author,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity,
                  }} 
                  onQuantityChange={handleQuantityChange} 
                  onRemove={handleRemove} 
                />
              ))}
            </div>
          )}

          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <OrderSummary subtotal={subtotal} />
      </div>
    </main>
  )
}
