import React from "react";
import { Clock, Pause, Play, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuctionStatus from "./useAuctionStatus";
import { pauseAuction, resumeAuction } from "../../../api/authApi";

export default function BuyTogetherCard({
  auction,
  baseURL,
  socketStatus,
  socketPrice,
  onReschedule,
  onDelete,
  onExtend,
}) {
  const navigate = useNavigate();

  const { status, countdown } = useAuctionStatus(
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
            ? "bg-red-100 text-red-700"
            : "bg-gray-200 text-gray-600";

  /*   CARD CLICK → VIEW DETAILS */
  const handleCardClick = () => {
    navigate(`/auction-details/${auction.id}`);
  };

  /*   STOP CARD CLICK FROM BUTTONS */
  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={handleCardClick}
      className="p-6 border rounded-xl shadow bg-white cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between border-b pb-4 mb-4 items-start">
        {/* LEFT */}
        <div className="flex gap-4">
          <img
            src={auction.product_image}
            className="w-14 h-14 rounded border object-cover"
          />

          <div>
            <h2 className="font-semibold">{auction.product_name}</h2>

            {status === "upcoming" && (
              <p className="text-xs text-blue-600 flex gap-1 items-center">
                <Clock size={14} /> Starts in: {countdown}
              </p>
            )}

            {status === "live" && (
              <p className="text-xs text-red-600 flex gap-1 items-center">
                <Clock size={14} /> Ends in: {countdown}
              </p>
            )}

            {status === "paused" && (
              <p className="text-xs text-yellow-600">Paused</p>
            )}

            {status === "ended" && (
              <p className="text-xs text-gray-500">Ended</p>
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
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-purple-100 text-purple-700"
              >
                <RefreshCw size={14} /> Reschedule
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-red-100 text-red-700"
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
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-yellow-100 text-yellow-700"
              >
                <Pause size={14} /> Pause
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onExtend(auction);
                }}
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-green-100 text-green-700"
              >
                <Play size={14} /> Extend
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="bg-red-100 text-red-700 flex px-3 py-1 gap-1 rounded-4xl text-sm items-center"
              >
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}

          {status === "paused" && (
            <button
              onClick={(e) => {
                stop(e);
                resumeAuction(auction.id);
              }}
              className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-green-100 text-green-700"
            >
              <Play size={14} /> Resume
            </button>
          )}

          {status === "ended" && (
            <>
              <button
                onClick={(e) => {
                  stop(e);
                  onReschedule(auction);
                }}
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-purple-100 text-purple-700"
              >
                <RefreshCw size={14} /> Reschedule
              </button>

              <button
                onClick={(e) => {
                  stop(e);
                  onDelete(auction);
                }}
                className="flex px-3 py-1 gap-1 rounded-4xl text-sm items-center bg-red-100 text-red-700"
              >
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs mb-1 text-center">Start Price</p>
          <p className="text-[18px] font-bold text-center">
            SAR {auction.buy_together_price}
          </p>
        </div>

        <div>
          <p className="text-xs mb-1 text-center">Quantity Available</p>
          <p className="text-[18px] font-bold text-center">
            {auction.min_quantity}
          </p>
        </div>

        <div>
          <p className="text-xs mb-1 text-center">People Joined</p>
          <p className="text-[18px] font-bold text-center">7</p>
        </div>

        <div>
          <p className="text-xs mb-1 text-center">Status</p>
          <span
            className={`px-3 py-1 text-xs rounded-full text-center capitalize ${badgeColor}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
