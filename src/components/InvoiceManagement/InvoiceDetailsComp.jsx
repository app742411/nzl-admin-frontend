// import Button from "../ui/button/Button";

// /* ============================
//    STATIC INVOICE DATA
//    ============================ */
// const INVOICE_DETAIL = {
//     orderId: "#15478",
//     from: {
//         name: "Roger Culhane",
//         email: "contact@example.com",
//         address: "2972 Westheimer Rd. Santa Ana.",
//     },
//     to: {
//         name: "Cristofer Levin",
//         email: "contact@example.com",
//         address: "New York, USA 2707 Davis Anenue",
//     },
//     product: {
//         name: "Mist Black Triblend",
//         image: "/images/product/product-01.jpg",
//         color: "White",
//         size: "Medium",
//         qty: 1,
//         price: "SAR120.00",
//     },
//     shipping: "FedEx - Take up to 3 working days.",
//     payment: {
//         method: "Apply Pay  Mastercard",
//         card: "**** **** **** 5874",
//     },
//     summary: {
//         captured: "SAR120.00",
//         base: "SAR10.00",
//         vat: "SAR10.00",
//         shipping: "SAR10.00",
//         gateway: "12%",
//         total: "SAR130.00",
//     },
// };

// export default function InvoiceDetailsComp() {
//     return (
//         <div className="space-y-6">


//             {/* ===================== CONTENT ===================== */}
//             <div className="rounded-xl border bg-white p-8 space-y-8">
//                 {/* FROM / TO / ORDER */}
//                 <div className="grid grid-cols-3 gap-8">
//                     {/* FROM */}
//                     <div>
//                         <p className="text-sm text-gray-500 mb-2">From</p>
//                         <p className="font-semibold text-gray-900">
//                             {INVOICE_DETAIL.from.name}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-2">
//                             Email: {INVOICE_DETAIL.from.email}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             Address: {INVOICE_DETAIL.from.address}
//                         </p>
//                     </div>

//                     {/* TO */}
//                     <div>
//                         <p className="text-sm text-gray-500 mb-2">To</p>
//                         <p className="font-semibold text-gray-900">
//                             {INVOICE_DETAIL.to.name}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-2">
//                             Email: {INVOICE_DETAIL.to.email}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             Address: {INVOICE_DETAIL.to.address}
//                         </p>
//                     </div>

//                     {/* ORDER */}
//                     <div className="text-right">
//                         <p className="text-xl font-semibold text-gray-900">
//                             Order {INVOICE_DETAIL.orderId}
//                         </p>
//                     </div>
//                 </div>

//                 {/* PRODUCT */}
//                 <div className="rounded-lg border p-4 flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <img
//                             src={INVOICE_DETAIL.product.image}
//                             className="h-20 w-20 rounded-lg object-cover"
//                             alt="product"
//                         />

//                         <div>
//                             <p className="font-semibold text-gray-900">
//                                 {INVOICE_DETAIL.product.name}
//                             </p>
//                             <p className="text-sm text-gray-500 mt-1">
//                                 Color: {INVOICE_DETAIL.product.color} &nbsp;&nbsp;
//                                 Size: {INVOICE_DETAIL.product.size}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-16">
//                         <p className="text-sm">
//                             Qty:{" "}
//                             <span className="font-medium">
//                                 {INVOICE_DETAIL.product.qty}
//                             </span>
//                         </p>
//                         <p className="font-semibold">
//                             {INVOICE_DETAIL.product.price}
//                         </p>
//                     </div>
//                 </div>

//                 {/* SHIPPING / PAYMENT / SUMMARY */}
//                 <div className="grid grid-cols-3 gap-8">
//                     {/* SHIPPING */}
//                     <div>
//                         <p className="font-semibold mb-3">Shipping Method</p>
//                         <p className="text-sm text-gray-500">
//                             {INVOICE_DETAIL.shipping}
//                         </p>
//                     </div>

//                     {/* PAYMENT */}
//                     <div>
//                         <p className="font-semibold mb-3">Payment Method</p>
//                         <p className="text-sm text-gray-500">
//                             {INVOICE_DETAIL.payment.method}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             {INVOICE_DETAIL.payment.card}
//                         </p>
//                     </div>

//                     {/* SUMMARY */}
//                     <div className="space-y-3 text-sm">
//                         <SummaryRow label="Captured Price (incl. VAT 15%)" value={INVOICE_DETAIL.summary.captured} />
//                         <SummaryRow label="Base (ex-VAT)" value={INVOICE_DETAIL.summary.base} />
//                         <SummaryRow label="VAT" value={INVOICE_DETAIL.summary.vat} />
//                         <SummaryRow label="Shipping" value={INVOICE_DETAIL.summary.shipping} />
//                         <SummaryRow label="Gateway fee %" value={INVOICE_DETAIL.summary.gateway} />

//                         <div className="border-t pt-3 flex justify-between font-semibold">
//                             <span>Total (incl. VAT)</span>
//                             <span>{INVOICE_DETAIL.summary.total}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="flex justify-end gap-4 pt-6">
//                     <Button variant="outline">Download Invoice</Button>
//                     <Button>Send Invoice</Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ============================
//    SUMMARY ROW
//    ============================ */
// function SummaryRow({ label, value }) {
//     return (
//         <div className="flex justify-between">
//             <span className="text-gray-500">{label}</span>
//             <span className="font-medium">{value}</span>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../ui/button/Button";
import { getInvoiceDetails, downloadInvoice } from "../../api/authApi";


export default function InvoiceDetailsComp() {
    const { paymentId } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDownloadInvoice = async () => {
        try {
            const res = await downloadInvoice(paymentId);

            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `Invoice-${invoice.invoice_number}.pdf`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Invoice download failed", error);
        }
    };


    useEffect(() => {
        async function fetchInvoice() {
            try {
                const res = await getInvoiceDetails(paymentId);
                setInvoice(res.data);
            } catch (err) {
                console.error("Invoice fetch failed", err);
            } finally {
                setLoading(false);
            }
        }

        fetchInvoice();
    }, [paymentId]);

    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
                Loading invoice details...
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="rounded-xl border bg-white p-8 text-center text-red-500">
                Invoice not found
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-white p-8 space-y-8">

                {/* FROM / TO / ORDER */}
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">From</p>
                        <p className="font-semibold text-gray-900">
                            {invoice.vendor_business_name}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            {invoice.vendor_email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-2">To</p>
                        <p className="font-semibold text-gray-900">
                            {invoice.buyer_first_name} {invoice.buyer_last_name}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            {invoice.buyer_email}
                        </p>
                        <p className="text-sm text-gray-500">
                            {invoice.address.streetAddress}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900">
                            Invoice #{invoice.invoice_number}
                        </p>
                        <p className="text-sm text-gray-500">
                            Order #{invoice.order_number}
                        </p>
                    </div>
                </div>

                {/* PRODUCT */}
                <div className="rounded-lg border p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={`/uploads/${invoice.product_image}`}
                            className="h-20 w-20 rounded-lg object-cover"
                            alt="product"
                        />
                        <div>
                            <p className="font-semibold text-gray-900">
                                {invoice.product_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Qty: {invoice.quantity}
                            </p>
                        </div>
                    </div>

                    <p className="font-semibold">
                        {invoice.currency} {invoice.amount}
                    </p>
                </div>

                {/* SHIPPING / PAYMENT / SUMMARY */}
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <p className="font-semibold mb-3">Shipping Address</p>
                        <p className="text-sm text-gray-500">
                            {invoice.address.city}, {invoice.address.state}
                        </p>
                        <p className="text-sm text-gray-500">
                            {invoice.address.zipCode}
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold mb-3">Payment</p>
                        <p className="text-sm text-gray-500">
                            Transaction ID: {invoice.transaction_id}
                        </p>
                        <p className="text-sm text-gray-500">
                            Status:{" "}
                            <span className="capitalize text-green-600 font-medium">
                                {invoice.payment_status}
                            </span>
                        </p>
                    </div>

                    <div className="space-y-3 text-sm">
                        <SummaryRow
                            label="Order Amount"
                            value={`${invoice.currency} ${invoice.order_total_amount}`}
                        />
                        <SummaryRow
                            label="Tax"
                            value={`${invoice.currency} ${invoice.order_tax_amount}`}
                        />
                        <SummaryRow
                            label="Delivery"
                            value={`${invoice.currency} ${invoice.delivery_charge}`}
                        />
                        <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total Paid</span>
                            <span>
                                {invoice.currency} {invoice.amount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4 pt-6">
                    <Button variant="outline" onClick={handleDownloadInvoice}>
                        Download Invoice
                    </Button>

                    <Button>Send Invoice</Button>
                </div>
            </div>
        </div>
    );
}

/* ============================
   SUMMARY ROW
   ============================ */
function SummaryRow({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
