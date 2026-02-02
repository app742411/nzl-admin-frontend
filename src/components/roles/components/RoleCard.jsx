import React from "react";
import * as Icons from "lucide-react";

const colorMap = {
  red: {
    icon: "text-red-600",
    bg: "bg-red-100",
    badge: "bg-red-100 text-red-700",
  },
  blue: {
    icon: "text-blue-600",
    bg: "bg-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    icon: "text-green-600",
    bg: "bg-green-100",
    badge: "bg-green-100 text-green-700",
  },
  purple: {
    icon: "text-purple-600",
    bg: "bg-purple-100",
    badge: "bg-purple-100 text-purple-700",
  },
  amber: {
    icon: "text-amber-600",
    bg: "bg-amber-100",
    badge: "bg-amber-100 text-amber-700",
  },
  indigo: {
    icon: "text-indigo-600",
    bg: "bg-indigo-100",
    badge: "bg-indigo-100 text-indigo-700",
  },
  gray: {
    icon: "text-gray-600",
    bg: "bg-gray-100",
    badge: "bg-gray-100 text-gray-700",
  },
};

const RoleCard = ({
  icon,
  label,
  badge,
  desc,
  permissions,
  color = "blue",
}) => {
  const Icon = Icons[icon];

  const c = colorMap[color] || colorMap.blue; // SAFE FALLBACK

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.bg}`}
          >
            <Icon size={22} className={c.icon} />
          </div>
          <h4 className="font-semibold text-gray-800">{label}</h4>
        </div>

        <span className={`text-xs px-2 py-1 rounded ${c.badge}`}>{badge}</span>
      </div>

      <p className="text-sm text-gray-500">{desc}</p>

      <div className="space-y-1">
        {permissions.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-gray-700"
          >
            <Icons.Check size={14} className={c.icon} />
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleCard;
