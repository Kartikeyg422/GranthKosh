import { useState, useEffect } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import Header from "./Header"
import ProductShowcase from "./ProductShowcase"
import ProductDetails from "./ProductDetails"
import CustomerReviews from "./CustomerReviews"
import productAPI, { cartAPI } from "../../services/api"

export default function BookProductPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const productId = searchParams.get('id')
    if (productId) {
      fetchProduct(productId)
    } else {
      setError("Product ID not found")
      setLoading(false)
    }
  }, [searchParams])

  const fetchProduct = async (id) => {
    try {
      setLoading(true)
      const data = await productAPI.getById(id)
      setProduct(data)
    } catch (err) {
      setError(err.message || "Product not found")
      console.error("Error fetching product:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 h-96 bg-gray-200 rounded"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "Product not found"}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">
            <Link to={'/'} className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link to={`/search?category=${product.category || ''}`} className="hover:text-blue-600">
              {product.category || "Books"}
            </Link>
            {" / "}
            <span className="text-gray-900 font-medium">{product.title}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <ProductShowcase product={product} />
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mb-12 pb-8 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>
        )}

        {/* Synopsis Section */}
        <div className="mb-16">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button className="text-blue-600 font-medium pb-2 border-b-2 border-blue-600">Synopsis</button>
            <button className="text-gray-600 hover:text-gray-900 pb-2">Product Details</button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Synopsis</h2>
            <div className="space-y-4 text-gray-600 max-w-3xl">
              <p>
                Somewhere out beyond the edge of the universe there is a library that contains an infinite number of
                books, each one the story of another reality. One tells the story of your life as it is, along with
                another book for the other life you could have lived if you had made a different choice at any point in
                your life. While we all wonder how our lives might have been, what if you had the chance to go to the
                library and see for yourself? Would any of these other lives truly be better?
              </p>
              <p>
                In The Midnight Library, Matt Haig's enchanting new novel, Nora Seed finds herself faced with this
                decision. Faced with the possibility of changing her life for a new one, following a different career,
                undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as
                she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it
                worth living in the first place.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <CustomerReviews />
      </main>
    </div>
  )
}
