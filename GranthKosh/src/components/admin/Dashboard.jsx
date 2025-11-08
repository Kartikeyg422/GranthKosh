import { useState, useEffect } from "react";
import Sidebar from "./pages/Sidebar";
import DashboardHeader from "./pages/DashboardHeader";
import StatCard from "./pages/StatCard";
import SalesChart from "./pages/SalesChart";
import RecentActivity from "./pages/RecentActivity";
import productAPI from "../../services/api";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [stats, setStats] = useState([
    { title: "Total Sales", value: "$0.00", change: "0%", isUp: true },
    { title: "New Orders", value: "0", change: "0%", isUp: true },
    { title: "New Users", value: "0", change: "0%", isUp: true },
    { title: "Books in Stock", value: "0", change: "0%", isUp: false },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getStats();
        
        // Format stats from backend data
        const totalBooks = data.totalBooks || 0;
        const totalStock = data.totalStock || 0;
        const totalValue = data.totalValue || 0;
        const products = data.products || [];
        
        // Calculate additional stats
        const lowStockBooks = products.filter(p => (p.stock || 0) < 10).length;
        const outOfStockBooks = products.filter(p => (p.stock || 0) === 0).length;
        
        // Calculate average price
        const avgPrice = products.length > 0 
          ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length 
          : 0;
        
        // Calculate percentage changes (mock for now, can be enhanced with historical data)
        // In a real app, you'd compare with previous period data
        const statsData = [
          { 
            title: "Total Books", 
            value: totalBooks.toLocaleString(), 
            change: "+" + Math.floor(Math.random() * 10) + "%", 
            isUp: true 
          },
          { 
            title: "Total Stock", 
            value: totalStock.toLocaleString(), 
            change: "+" + Math.floor(Math.random() * 5) + "%", 
            isUp: true 
          },
          { 
            title: "Inventory Value", 
            value: `₹${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            change: "+" + Math.floor(Math.random() * 8) + "%", 
            isUp: true 
          },
          { 
            title: "Low Stock Items", 
            value: lowStockBooks.toString(), 
            change: outOfStockBooks > 0 ? `${outOfStockBooks} out of stock` : "All good", 
            isUp: lowStockBooks === 0 
          },
        ];
        
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        
        // Check if it's a route not found error
        const errorMessage = error.message || "";
        if (errorMessage.includes("Cannot GET") || errorMessage.includes("404") || errorMessage.includes("endpoint may not exist")) {
          // Show a helpful message that the backend route might not be set up
          setStats([
            { title: "Total Books", value: "0", change: "Backend route not found", isUp: false },
            { title: "Total Stock", value: "0", change: "Check /api/products", isUp: false },
            { title: "Inventory Value", value: "$0.00", change: "Route missing", isUp: false },
            { title: "Low Stock Items", value: "0", change: "Setup required", isUp: false },
          ]);
        } else {
          // Set error state stats
          setStats([
            { title: "Total Books", value: "Error", change: "Connection issue", isUp: false },
            { title: "Total Stock", value: "Error", change: "Check backend", isUp: false },
            { title: "Inventory Value", value: "Error", change: "API error", isUp: false },
            { title: "Low Stock Items", value: "Error", change: "See console", isUp: false },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1">
        <DashboardHeader />

        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h2>
            <p className="text-gray-500">Here’s a snapshot of your bookstore’s performance today.</p>
          </div>

          {/* Stats */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <StatCard key={i} {...s} />
              ))}
            </div>
          )}

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
