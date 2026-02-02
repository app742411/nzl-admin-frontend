import React from "react";
import { Clock } from "lucide-react";
import CasinoNumber from "../../common/CasinoNumber";
import useAuctionStatus from "./useAuctionStatus";

export default function ReverseAuctionCardView({
  auction,
  baseURL,
  socketStatus,
  socketPrice,
}) {
  const { status, countdown, price } = useAuctionStatus(
    auction,
    socketStatus,
    socketPrice,
  );

  const statusColor =
    status === "live"
      ? "bg-green-500"
      : status === "upcoming"
        ? "bg-blue-500"
        : status === "paused"
          ? "bg-yellow-500"
          : status === "ended"
            ? "bg-red-500"
            : "bg-gray-600";

  const livePrice = socketPrice ?? price ?? auction.start_price;

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border cursor-pointer bg-white">
      {/* IMAGE SECTION */}
      <div className="relative w-full h-48">
        <img
          src={auction.product_image}
          className="w-full h-full object-contain"
        />

        {/* STATUS BADGE */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full text-white font-semibold capitalize ${statusColor}`}
        >
          {status}
        </span>

        {/* COUNTDOWN */}
        <div className="absolute bottom-3 left-3 bg-black/65 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
          <Clock size={14} /> {countdown}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4">
        {/* PRODUCT NAME */}
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {auction.product_name}
        </h3>

        {/* PRICE DETAILS */}
        <div className="mt-3 space-y-2">
          {/* Start Price */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Start Price:</span>
            <span className="font-bold text-green-600">
              SAR {auction.start_price}
            </span>
          </div>

          {/* Floor Price */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Floor Price:</span>
            <span className="font-bold text-red-500">
              SAR {auction.floor_price}
            </span>
          </div>

          {/* Live Changing Price */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Price Change:</span>
            <span className="font-bold text-blue-600">SAR {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
