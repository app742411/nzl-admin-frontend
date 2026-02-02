export default function BannerList({ banners, onRemove }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Active Banners
        </h3>
        <span className="text-sm text-gray-500">
          {banners.length} Active
        </span>
      </div>

      {banners.length === 0 && (
        <p className="text-sm text-gray-500">No banners active</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {banners.map((b, index) => (
          <div
            key={b.id}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
          >
            {/* CONTENT */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800">
                #{index + 1} {b.auction_title}
              </p>

              <p className="text-sm text-gray-600">
                {b.product_name}
              </p>

              {/* STATUS BADGE */}
              <span
                className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(
                  b.status
                )}`}
              >
                {b.status.toUpperCase()}
              </span>
            </div>

            {/* ACTION */}
            <button
              onClick={() => onRemove(b.id)}
              className="mt-4 self-end rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

const getStatusStyle = (status) => {
  switch (status) {
    case "live":
      return "bg-green-100 text-green-700";
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    case "paused":
      return "bg-orange-100 text-orange-700";
    case "ended":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
