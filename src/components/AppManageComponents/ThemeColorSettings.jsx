"use client";

import React, { useState } from "react";

const ThemeColorSettings = () => {
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");

  const handlePrimaryChange = (e) => {
    setPrimaryColor(e.target.value);
    //  API call / theme update later
  };

  const handleSecondaryChange = (e) => {
    setSecondaryColor(e.target.value);
    //  API call / theme update later
  };

  return (
    <div className="p-4 md:p-6 gap-3 mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-blue-600">🎨</span>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Theme Settings
        </h3>
      </div>

      {/* PRIMARY COLOR */}
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
          Primary Color
        </label>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={primaryColor}
            onChange={handlePrimaryChange}
            className="h-10 w-10 cursor-pointer rounded-md"
          />

          <input
            type="text"
            value={primaryColor}
            onChange={handlePrimaryChange}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>

      {/* SECONDARY COLOR */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
          Secondary Color
        </label>

        <div className="flex items-center gap-3">
          <input
            type="color"
            value={secondaryColor}
            onChange={handleSecondaryChange}
            className="h-10 w-10 cursor-pointer rounded-md"
          />

          <input
            type="text"
            value={secondaryColor}
            onChange={handleSecondaryChange}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeColorSettings;
