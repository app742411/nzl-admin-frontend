import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import BulkUploadsComp from "../../components/ProductComponents/BulkUploadsComp";
import PageMeta from "../../components/common/PageMeta";

const BulkUploads = () => {
  return (
    <>
      <PageMeta title="NZL Bulk Uploads Products" />
      <PageBreadcrumb pageTitle="Bulk Uploads" />
      <BulkUploadsComp />
    </>
  );
};

export default BulkUploads;
