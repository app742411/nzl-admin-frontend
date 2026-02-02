import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";

// --- Reusable Toggle Component ---
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`${
      enabled ? "bg-blue-600" : "bg-gray-200"
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none`}
  >
    <span
      className={`${
        enabled ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200`}
    />
  </button>
);

export default function Settings() {
  const navigate = useNavigate();
  // Example state to make toggles interactive
  const [settings, setSettings] = useState({
    "Email: New Order Placed": true,
    "Email: Auction Started": false,
    "In-App: System Alerts": true,
    "Maintenance Mode": false,
  });

  const handleToggle = (label) => {
    setSettings((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <PageMeta title="Admin Settings" />
      <PageBreadcrumb pageTitle="Admin Settings" />

      <div className="space-y-8">
        {/*  General Settings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Application Name", value: "NZL Admin Panel" },
              { label: "Admin Email", value: "admin@nzl.sa" },
              { label: "Support Email", value: "support@nzl.sa" },
              { label: "Contact Phone Number", value: "+966 55 123 4567" },
              { label: "Default Language", value: "Arabic (AR)" },
              { label: "Default Currency", value: "Saudi Riyal (SAR)" },
              { label: "Date Format", value: "DD-MM-YYYY" },
              { label: "Time Zone", value: "Asia/Riyadh (GMT +3)" },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {item.label}
                </label>
                <input
                  type="text"
                  defaultValue={item.value}
                  readOnly
                  className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50 text-gray-600 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/*  Notifications */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Notifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Email: New Order Placed",
              "Email: Auction Started",
              "Email: Auction Ended",
              "Email: Payment Received",
              "In-App: System Alerts",
              "In-App: Auction Updates",
              "SMS Notifications",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-700">{label}</span>
                <Toggle
                  enabled={settings[label]}
                  onChange={() => handleToggle(label)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3️⃣ Security */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Security</h2>
          <button
            onClick={() => navigate("/change-password")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Change Admin Password
          </button>
        </div>

        {/* 4️⃣ System */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">System</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </p>
                <p className="text-xs text-gray-500">
                  Disable the frontend for regular users
                </p>
              </div>
              <Toggle
                enabled={settings["Maintenance Mode"]}
                onChange={() => handleToggle("Maintenance Mode")}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                System Version
              </label>
              <input
                type="text"
                value="v1.0.0"
                readOnly
                className="w-full mt-1 rounded-lg border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
