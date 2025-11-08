export default function StatCard({ title, value, change, isUp }) {
  // Check if change is a percentage or a custom message
  const isPercentage = change && (change.includes("%") || change.includes("+") || change.includes("-"));
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${isUp ? "text-green-600" : "text-red-500"}`}>
          {isPercentage ? (
            <>
              {isUp ? "↑" : "↓"} {change} vs last month
            </>
          ) : (
            <span className={isUp ? "text-green-600" : "text-orange-500"}>{change}</span>
          )}
        </p>
      )}
    </div>
  );
}
