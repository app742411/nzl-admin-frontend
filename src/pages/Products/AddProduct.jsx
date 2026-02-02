import PageMeta from "../../components/common/PageMeta";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddProductForm from "../../components/ProductComponents/AddProductForm";

export default function AddProduct() {
  return (
    <>
      <PageMeta title="NZL Add Product Form" />
      <PageBreadcrumb pageTitle="addProduct" />
      <div className="max-w-full lg:max-w-[100%] mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="space-y-6">
            <AddProductForm />
          </div>
        </div>
      </div>
    </>
  );
}
