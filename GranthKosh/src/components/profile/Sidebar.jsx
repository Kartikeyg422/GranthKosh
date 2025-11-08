import { User, FileText, Home, CreditCard, Settings, LogOut } from "lucide-react"

export default function Sidebar({ setActiveSection, activeSection }) {
  const navItems = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "orders", label: "Order History", icon: <FileText className="w-5 h-5" /> },
    { id: "addresses", label: "Addresses", icon: <Home className="w-5 h-5" /> },
    { id: "payments", label: "Payment Methods", icon: <CreditCard className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-6 min-h-[calc(100vh-70px)]">
      {/* User Info */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: "#9b8b6f" }}></div>
          <div>
            <h3 className="font-semibold text-gray-900">Eleanor Vance</h3>
            <p className="text-sm text-gray-500">eleanor@example.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeSection === item.id
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-auto">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  )
}
