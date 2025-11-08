import { Facebook, Twitter, Disc3 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-900">GranthKosh</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your cozy corner of the internet for discovering and buying your next favorite book.
            </p>
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Disc3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Bestsellers
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Join our newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">Get the latest on new releases, sales, and more.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">© 2025 GranthKosh, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
