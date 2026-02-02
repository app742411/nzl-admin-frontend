import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OrderListComp from "../../components/OrderManagement/OrderListComp";

export default function OrderList() {
  return (
    <>
      <PageMeta title="Orders" description="NZL Admin Dashboard" />
      <PageBreadcrumb pageTitle="menu.all_orders" />
      <div className=" gap-4 md:gap-6">
        <OrderListComp />
      </div>
    </>
  );
}
