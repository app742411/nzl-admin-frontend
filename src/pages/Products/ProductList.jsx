import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ProductListComp from "../../components/ProductComponents/ProductListComp";

export default function ProductList() {
  return (
    <>
      <PageMeta title="Product" description="NZL Admin Dashboard" />
      <PageBreadcrumb pageTitle="menu.all_products" />
      <div className=" gap-4 md:gap-6">
        <ProductListComp />
      </div>
    </>
  );
}
