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
                        {invoice.currency} {invoice.order_amount}
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
                            value={`${invoice.currency} ${invoice.order_amount}`}
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
