const categories = ["Science Fiction", "Fantasy", "Dystopian", "Space Opera"]

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onReset,
}) {
  const toggleCategory = (category) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    )
  }

  const stars = [1, 2, 3, 4, 5]

  return (
    <aside className="w-64 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Refine Your Search</h2>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
        <div className="flex items-center gap-1">
          {stars.map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(star)}
              className="text-xl hover:scale-110 transition-transform"
            >
              {star <= minRating ? "⭐" : "☆"}
            </button>
          ))}
          <span className="text-sm text-gray-600 ml-2">{minRating} & up</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Apply Filters</button>
        <button variant="outline" className="w-full border-gray-300 hover:bg-gray-100 bg-transparent">
          Reset
        </button>
      </div>
    </aside>
  )
}
