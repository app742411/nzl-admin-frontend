import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AuctionStatic from "../../components/AuctionManagement/AuctionStatics";
import AuctionForm from "../../components/AuctionManagement/AuctionForm";
import { Pencil, MinusCircle, PlusCircle } from "lucide-react";
import AuctionLog from "../../components/AuctionManagement/auctions/AuctionLog";

const CreateAuction = () => {
  return (
    <>
      <PageMeta title="Auction & Deal Management" />
      <PageBreadcrumb pageTitle="Create Auction & Deal" />
      

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 col-span-12 space-y-6 xl:col-span-8">
          <AuctionForm />
        </div>
        <AuctionLog/>
      </div>
    </>
  );
};

export default CreateAuction;
