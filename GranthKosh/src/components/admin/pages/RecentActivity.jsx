import { ShoppingCart, UserPlus, AlertTriangle } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      icon: ShoppingCart,
      text: "New order #1234 was placed by John Doe.",
      time: "2 minutes ago",
      color: "text-blue-600",
    },
    {
      icon: UserPlus,
      text: "Jane Smith signed up as a new user.",
      time: "15 minutes ago",
      color: "text-green-600",
    },
    {
      icon: AlertTriangle,
      text: 'Stock for "The Midnight Library" is low.',
      time: "1 hour ago",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(({ icon: Icon, text, time, color }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`p-2 bg-gray-100 rounded-lg ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-gray-700">{text}</p>
              <p className="text-xs text-gray-500 mt-1">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
