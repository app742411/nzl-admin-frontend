import React from "react";
import { Clock, Pause, Play, RefreshCw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuctionStatus from "./useAuctionStatus";
import { pauseAuction, resumeAuction } from "../../../api/authApi";
import CasinoNumber from "../../common/CasinoNumber";

export default function ReverseAuctionCard({
  auction,
  baseURL,
  socketStatus,
  socketPrice,
  onReschedule,
  onDelete,
  onExtend,
}) {
  const navigate = useNavigate();

  const { status, countdown, price } = useAuctionStatus(
    auction,
    socketStatus,
    socketPrice,
  );

  const badgeColor =
    status === "live"
      ? "bg-green-100 text-green-700"
      : status === "upcoming"
        ? "bg-blue-100 text-blue-700"
        : status === "paused"
          ? "bg-yellow-100 text-yellow-700"
          : status === "ended"
            ? "bg-red-200 text-red-700"
            : "bg-gray-200 text-gray-600";

  /*   CARD CLICK → VIEW DETAILS */
  const handleCardClick = () => {
    navigate(`/auction-details/${auction.id}`);
  };

  /*   PREVENT CARD CLICK */
  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={handleCardClick} //   CARD CLICK
      className="p-6 border rounded-xl shadow-sm bg-white flex flex-col cursor-pointer hover:shadow-md transition"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        {/* LEFT */}
        <div className="flex gap-4">
          <img
            src={auction.product_image}
            className="w-14 h-14 rounded border object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold">{auction.product_name}</h2>

            {status === "upcoming" && (
              <p className="text-blue-600 text-xs flex gap-1 items-center">
                <Clock size={14} /> Starts in: {countdown}
              </p>
            )}

            {status === "live" && (
              <p className="text-red-600 text-xs flex gap-1 items-center">
                <Clock size={14} /> Ends in: {countdown}
              </p>
            )}

            {status === "paused" && (
              <p className="text-yellow-600 text-xs">Paused</p>
            )}

            {status === "ended" && (
              <p className="text-gray-500 text-xs">Auction Ended</p>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          {status === "upcoming" && (
            <>
              <button
                onClick={(e) => {
                  stop(e);
                  onReschedule(auction);
                }}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <RefreshCw size={14} /> Reschedule
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}

          {status === "live" && (
            <>
              <button
                onClick={(e) => {
                  stop(e);
                  pauseAuction(auction.id);
                }}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Pause size={14} /> Pause
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onExtend(auction);
                }}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Play size={14} /> Extend
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}

          {status === "paused" && (
            <>
              <button
                onClick={(e) => {
                  stop(e);
                  resumeAuction(auction.id);
                }}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Play size={14} /> Resume
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Trash2 size={14} /> Delete
              </button>
            </>
          )}

          {status === "ended" && (
            <>
              <button
                onClick={(e) => {
                  stop(e);
                  onReschedule(auction);
                }}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <RefreshCw size={14} /> Reschedule
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-4xl text-sm flex items-center gap-1"
              >
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-center">
        <div>
          <span className="text-xs block mb-1">Start Price</span>
          <span className="text-[18px] font-bold text-green-600">
            SAR {auction.start_price}
          </span>
        </div>

        <div>
          <span className="text-xs block mb-1">Floor Price</span>
          <span className="text-[18px] font-bold text-red-500">
            SAR {auction.floor_price}
          </span>
        </div>

        <div>
          <span className="text-xs block mb-1">Price Change</span>
          <span className="text-[18px] font-bold text-brand-500">
            SAR <CasinoNumber value={price} />
          </span>
        </div>

        <div>
          <span className="text-xs block mb-1">Status</span>
          <span
            className={`px-3 py-1 text-xs rounded-full capitalize ${badgeColor}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
