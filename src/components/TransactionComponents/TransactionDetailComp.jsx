import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionById } from "../../api/authApi";

export default function TransactionDetailComp({ transactionId }) {
  const navigate = useNavigate();
  const [txn, setTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const response = await getTransactionById(transactionId);
        if (response?.data) {
          setTxn(response.data);
        } else {
          // Fallback if data is direct
          setTxn(response);
        }
      } catch (err) {
        console.error("Error fetching transaction details:", err);
        setError("Failed to load transaction details.");
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !txn) {
    return (
      <div className="text-center py-10 text-red-500">
        {error || "Transaction not found"}
      </div>
    );
  }

  // --- Data Mapping ---
  // The API response structure flat fields + raw_payload object
  const raw = txn.raw_payload || {};
  const orderAddress = txn.order_address || {};

  return (
    <div className="space-y-8">
      {/* ================= A. TRANSACTION SUMMARY ================= */}
      <Card title="Transaction Summary">
        <Grid>
          <Info label="Transaction ID" value={txn.transaction_id || txn.payment_id} />
          <Info
            label="Status"
            badge
            value={txn.payment_status}
            badgeColor={
              txn.payment_status === "paid" || txn.payment_status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          />
          <Info label="Date" value={txn.payment_created_at ? new Date(txn.payment_created_at).toLocaleString() : "-"} />
          <Info label="Gateway" value={txn.payment_gateway || txn.gateway || "-"} />
          <Info label="Amount" value={`${txn.payment_currency} ${Number(txn.payment_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <Info label="Type" value={txn.auction_type || raw.type || "-"} />
        </Grid>
      </Card>

      {/* ================= B. BUYER DETAILS ================= */}
      <Card title="Buyer Details">
        <Grid>
          <Info label="User Name" value={`${txn.buyer_first_name} ${txn.buyer_last_name}`} />
          <Info label="Email" value={txn.buyer_email} />
          <Info label="Buyer ID" value={txn.buyer_id} />
          {/* Address from order_address object */}
          <Info
            label="Billing Address"
            full
            value={orderAddress.city ? `${orderAddress.streetAddress}, ${orderAddress.city}, ${orderAddress.state}, ${orderAddress.zipCode}` : "-"}
          />
        </Grid>
      </Card>

      {/* ================= C. AUCTION & PRODUCT ================= */}
      <Card title="Auction & Product Details">
        <Grid>
          <Info label="Auction ID" value={txn.auction_id} />
          <Info label="Auction Title" value={txn.auction_title} />
          <Info label="Auction Type" value={txn.auction_type} />
          <Info label="Product Name" value={txn.product_name} />
          <Info label="Start Price" value={txn.start_price ? `${txn.order_currency || "SAR"} ${txn.start_price}` : "-"} />
          <Info label="Order Quantity" value={txn.order_quantity} />
          <Info label="Auction End Time" value={txn.end_datetime ? new Date(txn.end_datetime).toLocaleString() : "-"} />
        </Grid>
      </Card>

      {/* ================= D. VENDOR INFO ================= */}
      <Card title="Vendor Info">
        <Grid>
          <Info label="Vendor Name" value={`${txn.vendor_business_name}`} />
          <Info label="Vendor ID" value={txn.vendor_id} />
          <Info label="Vendor Email" value={txn.vendor_email} />
        </Grid>
      </Card>

      {/* ================= E. PAYMENT BREAKDOWN ================= */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-green-800">
          Payment Breakdown
        </h2>

        <div className="space-y-2 text-sm">
          {raw.card && <Row label="Card" value={raw.card} />}
          {raw.arn && <Row label="ARN" value={raw.arn} />}
          {raw.rrn && <Row label="RRN" value={raw.rrn} />}
          <Row label="Order Total" value={`${txn.order_currency} ${Number(txn.order_total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <Row label="Processing Fee / Tax" value={`${txn.order_currency} ${Number(txn.order_tax_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <Row label="Delivery Charge" value={`${txn.order_currency} ${Number(txn.order_delivery_charge).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          <hr className="border-green-200 my-2" />
          <Row
            label="Total Paid"
            value={`${txn.payment_currency} ${Number(txn.payment_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            bold
          />
        </div>
      </div>

      {/* ================= F. TRANSACTION LOGS ================= */}
      <Card title="Transaction History">
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between border-b pb-2">
            <span>Transaction Created</span>
            <span className="text-gray-500">{new Date(txn.payment_created_at).toLocaleString()}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>Order Placed</span>
            <span className="text-gray-500">{new Date(txn.order_created_at).toLocaleString()}</span>
          </li>
        </ul>
      </Card>

      {/* ================= ACTIONS ================= */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}

/* ================= SMALL UI HELPERS ================= */

const Card = ({ title, children }) => (
  <div className="bg-white border rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Info = ({ label, value, badge, badgeColor, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <p className="text-xs text-gray-500">{label}</p>
    {badge ? (
      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${badgeColor || "bg-gray-100"}`}>
        {value}
      </span>
    ) : (
      <p className="font-semibold break-words">{value}</p>
    )}
  </div>
);

const Row = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className={bold ? "font-bold text-green-800" : ""}>{value}</span>
  </div>
);
