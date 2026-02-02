import React, { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;

export default function ReverseAuctionDetails({ auction }) {
  if (!auction) return null;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeImage, setActiveImage] = useState(0);

  /* CURRENT TIME */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* AUTO IMAGE SCROLL */
  useEffect(() => {
    if (!auction) return;
    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === auction.product_images.length - 1 ? 0 : prev + 1,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [auction]);

  if (!auction) return null;
  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 mb-6">
      {/* LEFT BOX – IMAGES */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 w-full lg:w-5/12">
        <img
          src={auction.product_images?.[activeImage] || "placeholder.png"}
          className="w-full h-[420px] object-cover rounded-xl"
        />

        <div className="flex gap-3 mt-4 overflow-x-auto">
          {auction.product_images?.map((img, index) => (
            <img
              key={index}
              src={img}
              className="h-20 w-20 rounded-lg object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* RIGHT BOX – DETAILS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 w-full lg:w-7/12">
        {/* STATUS + TIME */}
        <div className="flex justify-between items-center mb-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              auction.status,
            )}`}
          >
            {auction.status.toUpperCase()}
          </span>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium font-mono">
            End in: {getRemainingTime(auction.end_date, auction.end_time)}
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">{auction.auction_name}</h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Info label="Auction ID" value={auction.id} />
          <Info label="Product Name" value={auction.product_name} />
          <Info label="Category" value={auction.category_name} />
          <Info label="Vendor" value={auction.vendor_name} />
          <Info
            label="Start Time"
            value={`${auction.start_date} ${auction.start_time}`}
          />
          <Info
            label="End Time"
            value={`${auction.end_date} ${auction.end_time}`}
          />
          <Info
            label="Auction Type"
            value={formatAuctionType(auction.auction_type)}
          />

          <Info label="Min Quantity" value={auction.min_quantity} />
        </div>
        {/* PRICE SECTION */}
        {auction.auction_type === "reverse" && (
          <div className="grid grid-cols-3 gap-4">
            <PriceBox
              label="Start Price"
              value={auction.start_price}
              color="green"
            />
            <PriceBox
              label="Current Price"
              value={auction.current_price}
              color="blue"
            />
            <PriceBox
              label="Floor Price"
              value={auction.floor_price}
              color="red"
            />
          </div>
        )}

        {auction.auction_type === "buyTogether" && (
          <div className="grid grid-cols-1 gap-4">
            <PriceBox
              label="Buy Together Price"
              value={auction.buy_together_price ?? "0.00"}
              color="blue"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- SMALL UI HELPERS ---------- */

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const PriceBox = ({ label, value, color }) => {
  const colors = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };
  const formattedValue =
    value !== null && value !== undefined && value !== ""
      ? Number(value).toLocaleString()
      : "0.00";
  return (
    <div className={`p-4 rounded-lg text-center ${colors[color]}`}>
      <p className="text-sm">{label}</p>
      <p className="text-lg font-bold">SAR {formattedValue}</p>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "live":
      return "bg-green-100 text-green-700";
    case "paused":
      return "bg-orange-100 text-orange-700";
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    case "ended":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

// HELPER FUNCTION

const getRemainingTime = (endDate, endTime) => {
  if (!endDate || !endTime) return "00:00:00";

  // API FORMAT: DD-MM-YYYY
  const [day, month, year] = endDate.split("-").map(Number);

  // API FORMAT: HH:mm
  const [hours, minutes] = endTime.split(":").map(Number);

  // Construct date safely (month is 0-based)
  const end = new Date(year, month - 1, day, hours, minutes, 0).getTime();
  const now = Date.now();

  const diff = end - now;

  if (diff <= 0) return "00:00:00";

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(
    2,
    "0",
  )}:${String(s).padStart(2, "0")}`;
};
const formatAuctionType = (type) => {
  if (!type) return "-";
  return type.charAt(0).toUpperCase() + type.slice(1);
};
