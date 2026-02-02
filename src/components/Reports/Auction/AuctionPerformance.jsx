export default function AuctionPerformance() {
  const data = [
    ["Average Drop Time", "2.4 hours"],
    ["Average Winning Price", "SAR127.50"],
    ["Success Rate", "87.3%"],
    ["Total Bids Today", "1,247"],
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="font-semibold mb-4">Auction Performance</h3>
      {data.map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between py-2 border-b last:border-0"
        >
          <span className="text-gray-500 text-sm">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      ))}
    </div>
  );
}
