import React from "react";
import * as Icons from "lucide-react";

const iconColors = {
  green: "text-green-600",
  blue: "text-blue-600",
  amber: "text-amber-600",
  red: "text-red-600",
  gray: "text-gray-600",
};

export default function ActivityItem({
  icon,
  title,
  desc,
  user,
  changes_before,
  changes_after,
  time,
  color = "gray",
  isLast,
}) {
  const Icon = Icons[icon];

  return (
    <div className={`pb-4 ${!isLast ? "border-b border-dashed" : ""}`}>
      <div className="flex gap-4 items-start">
        {/* COLORED ICON ONLY */}
        <div className="flex-shrink-0 mt-1">
          <Icon size={22} className={iconColors[color]} />
        </div>

        <div>
          {/* <h4 className="font-semibold text-gray-800">{title}</h4>
          <h3 className="font-semibold text-gray-800 capitalize">
            <span className="text-red-500 font-medium">{changes_before}</span>
            <span className="mx-2 text-gray-500">→</span>
            <span className="text-green-600 font-medium">{changes_after}</span>
          </h3> */}
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: TITLE */}
            <h4 className="font-semibold text-gray-800 truncate">{title}</h4>

            {/* RIGHT: ROLE CHANGE */}
            <div className="flex items-center text-sm font-medium capitalize shrink-0">
              <span className="text-red-600">{changes_before}</span>
              <span className="mx-2 text-gray-400">→</span>
              <span className="text-green-600">{changes_after}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">{desc}</p>

          <div className="text-xs mt-1 text-gray-500">
            <span className="font-medium">{user}</span> • {time}
          </div>
        </div>
      </div>
    </div>
  );
}
