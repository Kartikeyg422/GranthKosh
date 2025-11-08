
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { cartAPI } from "../../services/api"

export default function ProductDetails({ product }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedFormat, setSelectedFormat] = useState(
    product?.formats?.[0]?.toLowerCase() || "hardcover"
  )
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    
    if (!user) {
      // User is not logged in, redirect to login page with current location
      navigate('/login', { state: { from: location } })
      return
    }

    // User is logged in, proceed with adding to cart
    cartAPI.addItem(product, 1)
    setAddedToCart(true)
    window.dispatchEvent(new Event('cartUpdated'))
    
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  const price = product.discountPrice || product.price || 0
  const originalPrice = product.discountPrice ? product.price : null

  return (
    <div className="space-y-8">
      {/* Title and Author */}
      <div>
        <h1 className="text-4xl md:text-5xl font-black mb-2">{product.title}</h1>
        <p className="text-gray-600">
          by{" "}
          <span className="text-blue-600 font-medium">
            {product.author || "Unknown Author"}
          </span>
        </p>
      </div>

      {/* Rating */}
      {(product.rating > 0 || product.reviewCount > 0) && (
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={i < Math.floor(product.rating || 0) ? "fill-blue-600 text-blue-600" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900">{product.rating?.toFixed(1) || "0.0"}</span>
            {product.reviewCount > 0 && (
              <> ({product.reviewCount.toLocaleString()} Review{product.reviewCount !== 1 ? 's' : ''})</>
            )}
          </span>
        </div>
      )}

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-blue-600">₹{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        {product.stock !== undefined && (
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>
        )}
      </div>

      {/* Format Selection */}
      {product.formats && product.formats.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Format</p>
          <div className="flex gap-3 flex-wrap">
            {product.formats.map((format) => {
              const formatLower = format.toLowerCase()
              return (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(formatLower)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedFormat === formatLower
                      ? "bg-blue-100 border-blue-600 text-blue-600"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          {addedToCart ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
        <button
          className="flex-1 border border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 bg-transparent"
        >
          <Heart size={20} />
          Add to Wishlist
        </button>
      </div>
    </div>
  )
}
