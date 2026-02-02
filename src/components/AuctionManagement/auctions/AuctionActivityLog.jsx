import React from "react";
const AuctionActivityLog = ({ logs = [] }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 w-full mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Activity Log</h2>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No activity found for this auction.
        </p>
      ) : (
        <div className="space-y-6">
          {logs.map((log, index) => (
            <ActivityItem key={index} {...log} />
          ))}
        </div>
      )}

      {logs.length > 0 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 text-sm hover:underline">
            Load More Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default AuctionActivityLog;

/* ---------------- SINGLE ACTIVITY ITEM ---------------- */

const ActivityItem = ({ action, from, to, performedBy, time }) => {
  return (
    <div className="flex gap-4 items-start">
      {/* ICON */}
      <div className="mt-1">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-sm">
          ↻
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <p className="text-sm text-gray-800 font-medium">
          {action}
          {from && to && (
            <>
              {" "}
              <span className="text-red-600 font-semibold">{from}</span> →{" "}
              <span className="text-green-600 font-semibold">{to}</span>
            </>
          )}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {performedBy} performed “{action}”
        </p>

        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};
