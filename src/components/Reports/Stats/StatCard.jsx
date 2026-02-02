export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  negative,
}) {
  return (
    <div className="bg-white rounded-xl p-4 flex justify-between items-center border border-gray-200">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
        <p
          className={`text-sm ${negative ? "text-red-500" : "text-green-500"}`}
        >
          {change} from last month
        </p>
      </div>
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon size={18} />
      </div>
    </div>
  );
}
