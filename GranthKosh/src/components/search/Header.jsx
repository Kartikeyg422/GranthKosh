

import { Search, ShoppingCart, Heart } from "lucide-react"
import {Link} from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo and Search */}
          <div className="flex items-center gap-6 flex-1">
            <Link href="/" className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="font-bold text-lg text-gray-900">BookGrove</span>
            </Link>

            <div className="relative flex-1 max-w-md hidden md:flex">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="classic science fiction"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Browse
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Bestsellers
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center hover:bg-orange-300">
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
