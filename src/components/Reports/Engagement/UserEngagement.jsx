// src/components/Reports/Engagement/UserEngagement.jsx

export default function UserEngagement() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="font-semibold mb-4">User Engagement</h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Active Users (Last 30 days)</span>
          <span className="font-medium">12,847</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Avg Bids per User</span>
          <span className="font-medium">3.7</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Repeat Buyers</span>
          <span className="font-medium">64%</span>
        </div>
      </div>
    </div>
  );
}
