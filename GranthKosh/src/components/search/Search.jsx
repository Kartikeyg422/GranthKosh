import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "./Header"
import FilterSidebar from "./FilterSidebar"
import BookGrid from "./BookGrid"
import Footer from "../Footer"
import productAPI from "../../services/api"

export default function Search() {
  const [searchParams] = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    fetchProducts()
  }, [selectedCategories, priceRange, minRating, searchParams])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const searchQuery = searchParams.get('q') || searchParams.get('search') || ''
      const categoryParam = searchParams.get('category') || searchParams.get('genre') || ''
      
      // Build filters
      const filters = {}
      if (searchQuery) filters.search = searchQuery
      if (categoryParam) filters.category = categoryParam
      if (selectedCategories.length > 0) filters.category = selectedCategories[0]
      if (priceRange[0] > 0) filters.minPrice = priceRange[0]
      if (priceRange[1] < 100) filters.maxPrice = priceRange[1]

      const response = await productAPI.getAll(filters)
      let productsList = Array.isArray(response) ? response : (response.products || [])
      
      // Filter by rating
      if (minRating > 0) {
        productsList = productsList.filter(p => (p.rating || 0) >= minRating)
      }

      // Sort products
      productsList = sortProducts(productsList, sortBy)
      
      setBooks(productsList)
    } catch (error) {
      console.error("Error fetching products:", error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const sortProducts = (products, sortType) => {
    const sorted = [...products]
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
      case "price-high":
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return sorted
    }
  }

  const handleReset = () => {
    setSelectedCategories([])
    setPriceRange([0, 100])
    setMinRating(0)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    const sorted = sortProducts(books, e.target.value)
    setBooks(sorted)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-white px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Home</span>
              <span>/</span>
              <span>Books</span>
              <span>/</span>
              <span>Science Fiction</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              onReset={handleReset}
            />

            {/* Main Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {loading ? "Loading..." : `Showing ${books.length} result${books.length !== 1 ? 's' : ''}`}
                  {searchParams.get('q') && ` for "${searchParams.get('q')}"`}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                      <div className="bg-gray-200 aspect-[3/4]"></div>
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No books found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
              ) : (
                <BookGrid books={books.map(book => ({
                  id: book._id || book.id,
                  title: book.title,
                  author: book.author,
                  price: book.discountPrice || book.price,
                  rating: book.rating || 0,
                  reviews: book.reviewCount || 0,
                  image: book.imageUrl || book.image,
                }))} />
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="p-2 hover:bg-gray-200 rounded-lg">←</button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded-lg font-medium ${
                      page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-gray-500">...</span>
                <button className="px-3 py-2 hover:bg-gray-200 rounded-lg text-gray-900 font-medium">12</button>
                <button className="p-2 hover:bg-gray-200 rounded-lg">→</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
