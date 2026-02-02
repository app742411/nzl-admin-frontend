import { Link } from "react-router";

export default function DashboardStatCard({
  variant = "stat",
  bgColor = "bg-blue-600",
  icon = null,
  value = "0",
  label = "Label",
  to = null, //  NEW
}) {
  const CardWrapper = to ? Link : "div";

  // ------------------------------------
  //  STAT CARD (the old big design)
  // ------------------------------------
  if (variant === "stat") {
    return (
      <CardWrapper
        to={to}
        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex gap-4 items-center"
      >
        <span className="text-white text-[40px]">{icon}</span>

        <div>
          <h4 className="font-bold text-gray-800 text-[20px] dark:text-white/90">
            {value}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </div>
      </CardWrapper>
    );
  }

  // ------------------------------------
  //  MINI CARD (new compact design)
  // ------------------------------------
  if (variant === "mini") {
    return (
      <CardWrapper
        to={to}
        className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 dark:border-gray-700 dark:bg-gray-900"
      >
        {/* icon box */}
        <div
          className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        {/* text */}
        <div>
          <p className="text-[16px] font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </CardWrapper>
    );
  }

  if (variant === "stats") {
    return (
      <CardWrapper
        to={to}
        className="rounded-xl border border-gray-200 bg-white p-6 flex items-center gap-4 dark:border-gray-700 dark:bg-gray-900 justify-between"
      >
        {/* icon box */}

        {/* text */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {label}
          </p>
          <p className="text-[24px] font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}
        >
          <span className="text-3xl font-bold">{icon}</span>
        </div>
      </CardWrapper>
    );
  }
  return null;
}
