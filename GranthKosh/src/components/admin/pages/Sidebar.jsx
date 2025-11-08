import { LayoutDashboard, BookOpen, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Books", icon: BookOpen, path: "/admin/add-book" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleMenuClick = (item) => {
    setActive(item.name);
    if (item.path) {
      navigate(item.path);
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: Show confirmation
    // alert("You have been logged out.");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">📘</div>
          <h1 className="text-xl font-bold text-gray-800">BookStore</h1>
        </div>

        <nav className="mt-8 space-y-1">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-3 px-6 py-3 w-full text-gray-700 font-medium rounded-lg transition ${
                active === item.name ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-6 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Admin User</p>
          <p className="text-xs text-gray-500">admin@bookstore.com</p>
        </div>

        {/* ✅ Log out button */}
        <button 
          onClick={handleLogout} 
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Log Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
