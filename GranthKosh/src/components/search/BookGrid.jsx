import { Link } from "react-router-dom"

export default function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {books.map((book) => (
        <Link
          key={book.id}
          to={`/product?id=₹{book.id}`}
          className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative overflow-hidden bg-gray-200 aspect-[3/4]">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-xs text-gray-600 mb-3">{book.author || "Unknown"}</p>

            {(book.rating > 0 || book.reviews > 0) && (
              <div className="flex items-center gap-1 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs">
                      {i < Math.floor(book.rating || 0) ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
                {book.reviews > 0 && (
                  <span className="text-xs text-gray-600">({book.reviews.toLocaleString()})</span>
                )}
              </div>
            )}

            <p className="text-lg font-bold text-gray-900">₹{(book.price || 0).toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
