import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import VendorListComp from "../../components/VendorManage/VendorListComp";

export default function VendorList() {
  return (
    <>
      <PageMeta title="Vendor" description="NZL Admin Dashboard" />
      <PageBreadcrumb pageTitle="menu.all_vendors" />
      <div className=" gap-4 md:gap-6">
        <VendorListComp />
      </div>
    </>
  );
}
