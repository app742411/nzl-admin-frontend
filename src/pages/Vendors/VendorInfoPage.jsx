import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import VendorInfoComp from "../../components/VendorManage/VendorDetails/VendorInfoComp";
import { FormShimmer } from "../../components/common/CommonShimmer";
import { getUserDetailsById } from "../../api/authApi";
import toast from "react-hot-toast";

export default function VendorInfoPage() {
    const { id } = useParams();

    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ================= FETCH VENDOR DETAILS ================= */
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await getUserDetailsById(id);

                //   IMPORTANT FIX
                setVendor(res.data.data);
            } catch (err) {
                toast.error(
                    err?.response?.data?.message || "Failed to load vendor details"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchVendor();
    }, [id]);


    if (loading) {
        return (
            <div className="p-6">
                <FormShimmer />
            </div>
        );
    }

    if (!vendor) {
        return (
            <div className="p-6 text-center text-gray-500">
                Vendor not found
            </div>
        );
    }

    return (
        <>
            <PageMeta title="Vendor Details | NZL Admin" />
            <PageBreadcrumb
                pageTitle="Vendor Details"
                links={[
                    { name: "Vendors", path: "/vendors" },
                    { name: vendor.business_name || "Vendor Info" },
                ]}
            />

            <VendorInfoComp vendor={vendor} />
        </>
    );
}
