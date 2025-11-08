
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ChevronUp, ChevronDown, Lock } from "lucide-react"
import { cartAPI, orderAPI } from "../../services/api"

export default function Checkout() {
  const navigate = useNavigate()
  const [shippingOpen, setShippingOpen] = useState(true)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  useEffect(() => {
    const cart = cartAPI.getCart()
    setCartItems(cart)
    
    // Load user data if logged in
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        setFormData(prev => ({
          ...prev,
          email: userData.email || "",
          firstName: userData.name?.split(' ')[0] || "",
          lastName: userData.name?.split(' ').slice(1).join(' ') || "",
        }))
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
  const shipping = 5.0
  const taxes = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + taxes

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty")
      return
    }

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
      setError("Please fill in all required shipping information")
      return
    }

    setLoading(true)
    setError("")

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        subtotal,
        shipping,
        taxes,
        total,
      }

      await orderAPI.create(orderData)
      
      // Clear cart
      cartAPI.clearCart()
      
      // Redirect to confirmation or home
      alert("Order placed successfully!")
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.")
      console.error("Error placing order:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/cart" className="text-blue-600 hover:underline">
            Cart
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-500">Confirmation</span>
        </nav>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Checkout</h2>
        <p className="text-muted-foreground">Complete your purchase by providing the following information.</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          Your cart is empty. <a href="/" className="underline">Continue shopping</a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          {/* Shipping Information Section */}
          <div className="border border-border rounded-lg mb-4 overflow-hidden">
            <button
              onClick={() => setShippingOpen(!shippingOpen)}
              className="w-full flex items-center justify-between p-6 bg-background hover:bg-muted transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Shipping Information</h3>
              </div>
              {shippingOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {shippingOpen && (
              <div className="p-6 border-t border-border bg-background">
                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Bookworm Lane"
                    className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NY"
                      className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full px-4 py-2 border border-input rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Payment Details Section */}
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setPaymentOpen(!paymentOpen)}
              className="w-full flex items-center justify-between p-6 bg-background hover:bg-muted transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                  2
                </div>
                <h3 className="text-lg font-semibold">Payment Details</h3>
              </div>
              {paymentOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {paymentOpen && (
              <div className="p-6 border-t border-border bg-background">
                <p className="text-muted-foreground">Payment details form would go here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-6 bg-background sticky top-8">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            {/* Books */}
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-6 pb-6 border-b border-border">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="w-16 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm leading-tight mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">by {item.author || "Unknown"}</p>
                        <p className="text-sm font-semibold">₹{(item.price || 0).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹{taxes.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6 pb-6 border-b border-border">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                </div>

                {/* Place Order Button */}
                <button 
                  onClick={handlePlaceOrder}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition mb-4"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </>
            )}

            {/* Security Message */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secure SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
