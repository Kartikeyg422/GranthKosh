export default function ProductShowcase({ product }) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8">
      <div className="relative w-full h-full flex items-center justify-center">
        {product?.imageUrl || product?.image ? (
          <img
            src={product.imageUrl || product.image}
            alt={product?.title || "Book cover"}
            className="w-full h-full object-contain rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-lg shadow-2xl w-full max-w-xs aspect-square flex flex-col items-center justify-center text-white p-8 text-center">
            <div className="mb-4 text-2xl font-light tracking-widest">
              {product?.title?.toUpperCase().substring(0, 20) || "BOOK"}
            </div>
            <div className="text-sm font-light">
              {product?.author?.toUpperCase() || "AUTHOR"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
