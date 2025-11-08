

import { Heart, ShoppingCart, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">📖</span>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900">The Book Nook</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
              Fiction
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
              Non-Fiction
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 text-sm">
              Bestsellers
            </a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-full"
              />
            </div>

            <button className="text-gray-600 hover:text-blue-600">
              <Heart size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <ShoppingCart size={20} />
            </button>
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
              JD
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
