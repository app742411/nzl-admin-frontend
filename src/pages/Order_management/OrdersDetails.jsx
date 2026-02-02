import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OrdersDetailsComp from "../../components/OrderManagement/OrdersDetailsComp";

export default function OrdersDetails() {
    return (
        <>
            <PageMeta title="Order Details" description="NZL Admin Dashboard" />
            <PageBreadcrumb pageTitle="Order Details" />
            <div className="min-h-screen">
                <OrdersDetailsComp />
            </div>
        </>
    );
}
