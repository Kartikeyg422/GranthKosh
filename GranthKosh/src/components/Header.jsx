import { Heart, Search, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI } from "../services/api";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch user data from localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  // Load user on mount and listen for storage changes
  useEffect(() => {
    loadUser();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === null) {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom event when user logs in/out in same tab
    window.addEventListener("userLogin", loadUser);
    window.addEventListener("userLogout", loadUser);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", loadUser);
      window.removeEventListener("userLogout", loadUser);
    };
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setShowDropdown(false);
    // Dispatch custom event for other components
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.name || user.email || "User";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2H3V4zm0 6h14v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">GranthKosh</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Books
            </Link>
            <Link
              to="/search?q=&genre"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Genres
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              About Us
            </Link>
          </nav>

          {/* Icons & Profile/Login */}
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/favorites"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* If logged in → show profile dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.name || user.email?.split("@")[0] || "User"}
                  </span>
                  {user.role === "admin" && (
                    <span className="hidden md:block px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // If not logged in → show login button
              <Link
                to="/login"
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
