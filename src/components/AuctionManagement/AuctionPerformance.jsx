import React from "react";

const AuctionPerformance = () => {
  return (
    <>
      <h1 className="mb-6 text-xl font-semibold text-white dark:text-white/90 pb-4">
        Today's Performance
        <div className="chart my-6">
          <div className="flex justify-between items-center border-b border-dashed border-white/40 pb-4 mb-4">
            <span className="text-[16px] font-normal text-white">
              Active Auctions
            </span>
            <p className="text-[18px] font-bold text-white">12 Products</p>
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-white/40 pb-4 mb-4">
            <span className="text-[16px] font-normal text-white">
              Total Revenue
            </span>
            <p className="text-[18px] font-bold text-white">SAR45,678</p>
          </div>
          <div className="flex justify-between items-center border-b-0 border-dashed border-white/40 pb-4 mb-4">
            <span className="text-[16px] font-normal text-white">
              Success Rate
            </span>
            <p className="text-[18px] font-bold text-white">87%</p>
          </div>
        </div>
      </h1>
    </>
  );
};

export default AuctionPerformance;
