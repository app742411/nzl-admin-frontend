"use client";

import React, { useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CategoryManageForm from "../../components/ProductComponents/CategoryManageForm";
import CategoryList from "../../components/ProductComponents/CategoryList";

export default function CategoryManage() {
  const listRef = useRef();

  const refreshCategories = () => {
    listRef.current?.refreshList();
  };

  return (
    <>
      <PageMeta title="NZL Category Management" />
      <PageBreadcrumb pageTitle="menu.category_management" />

      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* LEFT: Add Category */}
        <div className="w-full lg:w-1/2 rounded-2xl border border-gray-200 bg-white p-5">
          <CategoryManageForm onCategoryAdded={refreshCategories} />
        </div>

        {/* RIGHT: Category List */}
        <div className="w-full lg:w-1/2">
          <CategoryList ref={listRef} />
        </div>
      </div>
    </>
  );
}
