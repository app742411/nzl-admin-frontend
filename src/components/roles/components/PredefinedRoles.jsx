import React, { useEffect, useState } from "react";
import RoleCard from "./RoleCard";
import { getRoles } from "../../../api/authApi";

export default function PredefinedRoles({ refreshTrigger }) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await getRoles();
      setRoles(res?.data || []);
    } catch (error) {
      console.error(" ERROR FETCHING ROLES:", error);
    } finally {
      setLoading(false);
    }
  };

  //  RUN ONCE + WHEN refreshTrigger CHANGES
  useEffect(() => {
    fetchRoles();
  }, [refreshTrigger]);

  // ROLE CONFIG
  const roleUIMap = {
    support: {
      label: "Support",
      icon: "Headphones",
      color: "purple",
      desc: "Customer Support Team",
      permissions: [
        "View user tickets",
        "Reply to customer queries",
        "Limited dashboard access",
      ],
    },

    vendor: {
      label: "Vendor Manager",
      icon: "Store",
      color: "green",
      desc: "Manages Vendors & Products",
      permissions: [
        "Manage vendors",
        "Approve vendor products",
        "Suspend vendor accounts",
      ],
    },

    "auction-manager": {
      label: "Auction Manager",
      icon: "Gavel",
      color: "blue",
      desc: "Controls Auctions & Bidding",
      permissions: [
        "Create & manage auctions",
        "View auction reports",
        "Manage bid rules",
      ],
    },

    "finance-manager": {
      label: "Finance Manager",
      icon: "Banknote",
      color: "amber",
      desc: "Handles Payments & Finance",
      permissions: [
        "View financial reports",
        "Manage invoices & payouts",
        "Refund approvals",
      ],
    },

    admin: {
      label: "Admin",
      icon: "Settings",
      color: "indigo",
      desc: "System Administration",
      permissions: [
        "User management",
        "Assign roles",
        "View all dashboards",
        "CRUD access to most modules",
      ],
    },

    user: {
      label: "User",
      icon: "User",
      color: "gray",
      desc: "Regular System User",
      permissions: ["Browse platform", "Place bids", "View profile"],
    },

    superAdmin: {
      label: "Super Admin",
      icon: "ShieldCheck",
      color: "red",
      desc: "Full System Access",
      permissions: [
        "All permissions",
        "Critical system configuration",
        "Role & permission control",
        "Manage entire platform",
      ],
    },
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Pre-defined Roles</h3>
      <p className="text-sm text-gray-500 mb-4">
        System default roles with preset permissions
      </p>

      {loading && <p className="text-sm text-gray-500">Loading roles...</p>}

      <div className="grid grid-cols-4 gap-4">
        {!loading &&
          roles.map((item) => {
            const normalizedRole = item.role.trim();
            const ui = roleUIMap[normalizedRole];

            if (!ui) {
              console.warn("⚠️ No UI config found for:", item.role);
              return null;
            }

            return (
              <RoleCard
                key={item.role}
                icon={ui.icon}
                color={ui.color}
                label={ui.label}
                badge={`${item.total} users`}
                desc={ui.desc}
                permissions={ui.permissions}
              />
            );
          })}
      </div>
    </section>
  );
}
