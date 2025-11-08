import { Bell, Moon, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <input
        type="text"
        placeholder="Search for books, orders, or users..."
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Moon className="w-5 h-5" />
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Book
        </button>
      </div>
    </header>
  );
}
