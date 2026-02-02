export default function TopVendors() {
  const vendors = [
    { name: "TechGear Pro", amount: "SAR45,720", growth: "+23.5%" },
    { name: "Luxury Watches", amount: "SAR38,940", growth: "+18.2%" },
    { name: "Art Gallery", amount: "SAR31,650", growth: "+12.8%" },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Top Vendors</h3>
        <span className="text-blue-600 text-sm cursor-pointer">View All</span>
      </div>

      {vendors.map((v) => (
        <div
          key={v.name}
          className="flex justify-between py-3 border-b last:border-0"
        >
          <span>{v.name}</span>
          <div className="text-right">
            <p className="font-medium">{v.amount}</p>
            <p className="text-green-500 text-sm">{v.growth}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
