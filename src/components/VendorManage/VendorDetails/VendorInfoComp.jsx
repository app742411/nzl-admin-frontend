import React from "react";

export default function VendorInfoComp({ vendor }) {
    if (!vendor) return null;

    const {
        first_name,
        last_name,
        email,
        phone_code,
        phone_number,
        role,
        status,
        business_name,
        business_type,
        description,
        monthly_sales,
        tax_id,
        years_in_business,
        street_address,
        city,
        state,
        created_at,
        logo,
    } = vendor;

    return (
        <div className="rounded-xl border bg-white p-6">
            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-4 border-b pb-4">
                <img
                    src={
                        logo
                            ? `${logo}`
                            : "https://ui-avatars.com/api/?name=" +
                            first_name +
                            "+" +
                            last_name
                    }
                    alt="Vendor Logo"
                    className="h-16 w-16 rounded-lg border object-cover"
                />

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {first_name} {last_name}
                    </h2>
                    <p className="text-sm text-gray-500">{email}</p>
                    <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {status}
                    </span>
                </div>
            </div>

            {/* ================= BASIC INFO ================= */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem label="Role" value={role} />
                <InfoItem
                    label="Phone Number"
                    value={`${phone_code || ""} ${phone_number || "—"}`}
                />
                <InfoItem label="Business Name" value={business_name} />
                <InfoItem label="Business Type" value={business_type} />
                <InfoItem label="Monthly Sales" value={monthly_sales} />
                <InfoItem label="Years in Business" value={years_in_business} />
                <InfoItem label="Tax ID" value={tax_id} />
                <InfoItem
                    label="Joined On"
                    value={new Date(created_at).toLocaleDateString()}
                />
            </div>

            {/* ================= ADDRESS ================= */}
            <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Address
                </h3>
                <p className="text-sm text-gray-600">
                    {street_address}, {city}, {state}
                </p>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    Description
                </h3>
                <p className="text-sm text-gray-600">
                    {description || "—"}
                </p>
            </div>
        </div>
    );
}

/* ================= REUSABLE INFO ITEM ================= */
function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-800">
                {value || "—"}
            </p>
        </div>
    );
}
