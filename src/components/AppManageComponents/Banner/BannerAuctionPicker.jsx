import { useState, useEffect, useRef } from "react";

export default function BannerAuctionPicker({
  auctions,
  onAdd,
  onSearch,
  loading,
  disabled,
  selectedAuctionIds = [],
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // SEARCH WITH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Add Auction Banner
        </h3>
        <p className="text-sm text-gray-500">
          Search and select LIVE or UPCOMING auctions
        </p>
      </div>

      {/* SEARCH INPUT */}
      <div className="relative">
        <input
          type="text"
          disabled={disabled}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search auctions..."
          className={`w-full rounded-lg border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "focus:ring-blue-500"
            }`}
        />
      </div>

      {/* DROPDOWN */}
      {open && !disabled && (
        <ul className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {loading && (
            <li className="px-4 py-3 text-sm text-gray-500">
              Loading auctions...
            </li>
          )}

          {!loading && auctions.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">
              No auctions found
            </li>
          )}

          {auctions.map((a) => {
            const alreadyAdded = selectedAuctionIds.includes(a.id);

            return (
              <li
                key={a.id}
                onClick={() => {
                  if (!alreadyAdded) {
                    onAdd(a.id);
                    setOpen(false);
                    setQuery("");
                  }
                }}
                className={`flex items-center justify-between px-4 py-3 text-sm transition ${alreadyAdded
                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                  : "cursor-pointer hover:bg-gray-50"
                  }`}
              >
                <span className="font-medium">{a.auction_title}</span>

                <span
                  className={`ml-3 rounded-full px-2 py-0.5 text-xs font-medium ${a.status === "live"
                    ? "bg-green-100 text-green-700"
                    : a.status === "upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {a.status.toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* FOOTER NOTE */}
      <p className="mt-3 text-xs text-gray-500">
        Min <span className="font-medium">1</span> • Max{" "}
        <span className="font-medium">5</span> • ENDED auctions are auto removed
      </p>
    </div>
  );
}
