import { DeleteIcon, Edit } from "lucide-react";
import React from "react";

const permissionColors = {
  Finance: "bg-green-100 text-green-700",
  View: "bg-blue-100 text-blue-700",
  Edit: "bg-yellow-100 text-yellow-700",
  Reports: "bg-purple-100 text-purple-700",
  Orders: "bg-orange-100 text-orange-700",
  Vendors: "bg-teal-100 text-teal-700",
  Delete: "bg-red-100 text-red-700",
  Other: "bg-gray-100 text-gray-700",
};

const prettyPermission = (p) =>
  p.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const getPermissionCategory = (p) => {
  if (p.startsWith("view_")) return "View";
  if (p.startsWith("edit_")) return "Edit";
  if (p.startsWith("delete_")) return "Delete";
  if (p.startsWith("manage_")) return "Vendors";
  if (p.includes("finance")) return "Finance";
  if (p.includes("report")) return "Reports";
  if (p.includes("order")) return "Orders";
  return "Other";
};

const getColor = (p) =>
  permissionColors[getPermissionCategory(p)] || permissionColors.Other;

const RoleRow = ({
  name,
  email,
  role,
  permissions = [],
  created,
  onEdit,
  user,
  onDelete,
}) => {
  const firstThree = permissions.slice(0, 3);
  const remaining = permissions.slice(3);

  return (
    <tr className="border-b text-sm h-14 border-dashed">
      <td className="font-medium">{name}</td>
      <td className="text-gray-600">{email}</td>
      <td className="capitalize">{role}</td>

      <td className="flex gap-2 flex-wrap">
        {firstThree.map((p, i) => (
          <span
            key={i}
            className={`px-2 py-1 text-xs rounded-md ${getColor(p)}`}
          >
            {prettyPermission(p)}
          </span>
        ))}

        {remaining.length > 0 && (
          <div className="relative group">
            <span className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-700 cursor-pointer">
              +{remaining.length} more
            </span>

            <div className="absolute top-7 left-0 hidden group-hover:flex flex-wrap gap-2 bg-white p-4 border rounded-md shadow-lg w-auto min-w-120 z-20">
              {remaining.map((p, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 text-xs rounded-md ${getColor(p)}`}
                >
                  {prettyPermission(p)}
                </span>
              ))}
            </div>
          </div>
        )}
      </td>

      <td className="text-gray-600">{created}</td>

      <td className="flex p-3 pl-0 gap-3">
        <button
          className="text-blue-600 hover:underline flex items-center gap-1"
          onClick={() => onEdit(user)} // ← FIX: pass user object!
        >
          <Edit size={14} /> Edit
        </button>

        <button
          className="text-red-500 hover:underline flex items-center gap-1"
          onClick={() => onDelete(user.id)}
        >
          <DeleteIcon size={14} /> Delete
        </button>
      </td>
    </tr>
  );
};

export default RoleRow;
