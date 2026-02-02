export default function RevenueBreakdown() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="font-semibold mb-4">Revenue Breakdown</h3>

      <Progress
        label="Total profit"
        value="SAR37,406 (60%)"
        percent={60}
        color="bg-green-500"
      />
      <Progress
        label="Total income"
        value="SAR1,519 (23%)"
        percent={23}
        color="bg-blue-500"
      />
      <Progress
        label="Total expenses"
        value="SAR17,214 (12%)"
        percent={12}
        color="bg-yellow-500"
      />
    </div>
  );
}

function Progress({ label, value, percent, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 ">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full ">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
