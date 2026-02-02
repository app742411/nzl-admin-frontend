import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import InvoiceDetailsComp from "../../components/InvoiceManagement/InvoiceDetailsComp";

export default function InvoiceDetails() {
    return (
        <>
            <PageMeta title="Invoice Details" description="NZL Admin Dashboard" />
            <PageBreadcrumb pageTitle="Invoice Details" />
            <div className=" gap-4 md:gap-6">
                <InvoiceDetailsComp />
            </div>
        </>
    );
}

