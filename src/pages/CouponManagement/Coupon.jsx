import React, { useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddCouponForm from "../../components/CouponComp/AddCouponForm";

import CouponList from "../../components/CouponComp/CouponList";

const Coupon = () => {
  const listRef = useRef();

  const refreshCoupon = () => {
    listRef.current?.refreshList();
  };
  return (
    <>
      <PageMeta title="Coupon Management" />
      <PageBreadcrumb pageTitle="Coupon Management" />
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* LEFT: Add Coupon Form */}
        <div className="w-full lg:w-1/2 rounded-2xl border border-gray-200 bg-white p-5">
          <AddCouponForm onCouponAdded={refreshCoupon} />
        </div>

        {/* RIGHT: Coupon List */}
        <div className="w-full lg:w-1/2">
          <CouponList ref={listRef} />
        </div>
      </div>
    </>
  );
};

export default Coupon;
