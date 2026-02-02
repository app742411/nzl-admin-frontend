
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import InvoiceListComp from "../../components/InvoiceManagement/InovoiceListComp";
import InvoiceStats from "../../components/InvoiceManagement/InvoiceStats";
export default function InvoiceList() {
    return (
        <>
            <PageMeta title="Invoices" description="NZL Admin Dashboard" />
            <PageBreadcrumb pageTitle="Invoices" />
            <div className=" gap-4 md:gap-6">
                <InvoiceStats />
                <InvoiceListComp />
            </div>
        </>
    );
}