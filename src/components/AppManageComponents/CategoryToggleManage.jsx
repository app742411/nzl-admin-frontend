"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import ComponentCard from "../common/ComponentCard";
import { changeCategoryStatus } from "../../api/authApi";

const CategoryToggleManage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const newStatus = !isHidden;

    //  Optimistic UI update
    setIsHidden(newStatus);

    try {
      setLoading(true);
      await changeCategoryStatus(newStatus);

      toast.success(
        `Category ${newStatus ? "hidden" : "visible"} successfully`
      );
    } catch (error) {
      //  Rollback if API fails
      setIsHidden(!newStatus);
      toast.error("Failed to update category status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard>
      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
          📣
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Category Manage for App
          </h3>
          <p className="text-xs text-gray-500">Show or hide category in app</p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-gray-200 dark:bg-gray-800" />

      {/* TOGGLE ROW */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {isHidden ? "Hide Category" : "Show Category"}
          </p>
          <p className="text-xs text-gray-500">
            {isHidden
              ? "Category is hidden in app"
              : "Category is visible in app"}
          </p>
        </div>

        {/* TOGGLE */}
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isHidden ? "bg-blue-600" : "bg-gray-300"
            }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isHidden ? "translate-x-4" : "translate-x-1"
              }`}
          />
        </button>
      </div>
    </ComponentCard>
  );
};

export default CategoryToggleManage;
