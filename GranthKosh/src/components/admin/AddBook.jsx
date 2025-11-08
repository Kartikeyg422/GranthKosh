import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import DashboardHeader from "./pages/DashboardHeader";
import productAPI from "../../services/api";

export default function AddBook() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Books");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
    publisher: "",
    publicationDate: "",
    language: "",
    pages: "",
    format: "hardcover",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  // Map frontend category to backend category format
  const mapCategory = (category) => {
    const categoryMap = {
      "fiction": "Fiction",
      "non-fiction": "Non-Fiction",
      "science": "Sci-Fi",
      "history": "History",
      "biography": "Biography",
      "mystery": "Mystery",
      "romance": "Fiction", // Map to Fiction if not in enum
      "fantasy": "Fantasy",
      "self-help": "Self-Help",
      "business": "Non-Fiction",
    };
    return categoryMap[category.toLowerCase()] || "Fiction";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Map form data to backend schema
      const productData = {
        title: formData.title,
        author: formData.author,
        description: formData.description || "",
        category: mapCategory(formData.category),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        image: formData.image || "",
        formats: [formData.format], // Backend expects array
        rating: 0,
        reviewCount: 0,
      };

      // Add optional discountPrice if needed
      if (formData.discountPrice) {
        productData.discountPrice = parseFloat(formData.discountPrice);
      }

      await productAPI.create(productData);
      
      // Reset form and navigate
      setFormData({
        title: "",
        author: "",
        isbn: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
        publisher: "",
        publicationDate: "",
        language: "",
        pages: "",
        format: "hardcover",
      });
      
      alert("Book added successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Failed to add book. Please try again.");
      console.error("Error adding book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
            <p className="text-gray-500">Fill in the details to add a new book to the store.</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Book Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter book title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Author <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      ISBN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter ISBN number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="fiction">Fiction</option>
                      <option value="non-fiction">Non-Fiction</option>
                      <option value="science">Science</option>
                      <option value="history">History</option>
                      <option value="biography">Biography</option>
                      <option value="mystery">Mystery</option>
                      <option value="romance">Romance</option>
                      <option value="fantasy">Fantasy</option>
                      <option value="self-help">Self-Help</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing & Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Format <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="format"
                      value={formData.format}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="hardcover">Hardcover</option>
                      <option value="paperback">Paperback</option>
                      <option value="ebook">E-Book</option>
                      <option value="audiobook">Audiobook</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter publisher name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      name="publicationDate"
                      value={formData.publicationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select language</option>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="hindi">Hindi</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Number of Pages
                    </label>
                    <input
                      type="number"
                      name="pages"
                      value={formData.pages}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter number of pages"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter book description..."
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Book Cover Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/book-cover.jpg"
                />
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Book cover preview"
                      className="w-32 h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: "",
                      author: "",
                      isbn: "",
                      price: "",
                      description: "",
                      category: "",
                      stock: "",
                      image: "",
                      publisher: "",
                      publicationDate: "",
                      language: "",
                      pages: "",
                      format: "hardcover",
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
                >
                  {loading ? "Adding..." : "Add Book"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

