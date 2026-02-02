import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VendorForm from "../../components/VendorManage/VendorForm";

export default function AddVendor() {
  return (
    <>
      <PageMeta title="NZL Add Vendor" />
      <PageBreadcrumb pageTitle="menu.add_vendor" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <VendorForm />
        </div>
      </div>
    </>
  );
}
