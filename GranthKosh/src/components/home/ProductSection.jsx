import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productAPI from "../../services/api";

export default function ProductSection({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll();
        
        // Handle different response structures
        const productsList = Array.isArray(response) ? response : (response.products || []);
        
        // For "New Arrivals", show latest products (limit to 5)
        // For "Bestsellers", show products sorted by rating (limit to 5)
        let filteredProducts = [];
        
        if (title === "New Arrivals") {
          // Sort by createdAt (newest first) and take first 5
          filteredProducts = [...productsList]
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 5);
        } else if (title === "Bestsellers") {
          // Sort by rating and reviewCount, take top 5
          filteredProducts = [...productsList]
            .sort((a, b) => {
              const aScore = (a.rating || 0) * (a.reviewCount || 0);
              const bScore = (b.rating || 0) * (b.reviewCount || 0);
              return bScore - aScore;
            })
            .slice(0, 5);
        } else {
          // Default: show first 5 products
          filteredProducts = productsList.slice(0, 5);
        }
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [title]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 md:h-80 mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 rounded w-2/3 mb-1"></div>
              <div className="bg-gray-200 h-3 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <Link
            key={product._id || product.id}
            to={`/product?id=${product._id || product.id}`}
            className="group cursor-pointer"
          >
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-64 md:h-80">
              <img
                src={product.imageUrl || product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-xs md:text-sm mb-1">{product.author}</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-700 font-medium text-sm">
                ₹{product.discountPrice ? product.discountPrice.toFixed(2) : product.price?.toFixed(2) || "0.00"}
              </p>
              {product.discountPrice && product.price && (
                <p className="text-gray-400 text-xs line-through">₹{product.price.toFixed(2)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
