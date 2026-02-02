import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../api/authApi";
import {
    Printer,
    Edit,
    ChevronLeft,
    MapPin,
    User,
    CreditCard,
    Truck,
    Clock,
    Package,
    Calendar,
    Phone,
    Mail
} from "lucide-react";
import Badge from "../ui/badge/Badge";
import { FormShimmer } from "../common/CommonShimmer";

export default function OrdersDetailsComp() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await getOrderById(id);

                // Handle response structure logic based on user's sample
                if (response?.data) {
                    setOrder(response.data);
                } else {
                    setOrder(response); // Fallback if data is direct
                }
            } catch (err) {
                console.error("Error fetching order:", err);
                setError("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="p-6">
                <FormShimmer />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="text-center py-10 text-red-500">
                {error || "Order not found"}
            </div>
        );
    }

    // --- Data Mapping & Formatting ---

    // Order Info
    const orderId = order.order_id ? `#${order.order_id.split("-").pop()}` : order.order_id || "N/A";
    const status = order.status || "Pending";
    const createdAt = order.created_at ? new Date(order.created_at).toLocaleString() : "N/A";

    // Product Info
    const productName = order.product_name || "Unknown Product";
    const productPrice = Number(order.product_cost || 0);
    const quantity = Number(order.quantity || 1);
    const totalAmount = Number(order.total_amount || 0);
    const deliveryCharge = Number(order.delivery_charge || 0);
    const taxAmount = Number(order.tax_amount || 0);
    const currency = order.currency || "SAR";
    const productImage = (order.images && order.images.length > 0) ? order.images[0] : null;
    const auctionType = order.auction_type || "N/A";

    // Formatted Money
    const formatMoney = (amount) => {
        return `${currency} ${Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    // Status Badge Helper
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "paid":
            case "delivered":
            case "completed":
                return "success";
            case "pending":
            case "processing":
            case "shipped":
                return "warning";
            case "cancelled":
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <div className="space-y-6">
            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link
                        to="/orders"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Order {orderId}
                            </h1>
                            {/* <Badge color={getStatusColor(status)}>{status}</Badge> */}
                            <Badge
                                size="sm"
                                color={
                                    status === "paid" || status === "completed"
                                        ? "success"
                                        : status === "pending"
                                            ? "warning"
                                            : "error"
                                }
                            >
                                {status}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Order Placed: {createdAt}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                        onClick={() => window.print()}
                    >
                        <Printer size={16} />
                        Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                        <Edit size={16} />
                        Edit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- LEFT COLUMN (Details & History) --- */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Details Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Details</h2>

                        <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                                {productImage ? (
                                    <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Package size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                                    {productName}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    SKU: {order.product_id ? order.product_id.slice(0, 8).toUpperCase() : "N/A"}
                                </p>
                                {/* <p className="text-sm text-gray-500">
                  Brand: <span className="text-gray-900 dark:text-gray-300">{order.brand || "—"}</span>
                </p> */}
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formatMoney(productPrice)}
                                </p>
                                <p className="text-sm text-gray-500">Qty: {quantity}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Base Amount</span>
                                <span>{formatMoney(Number(order.amount) || Number(order.start_price) || 0)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>VAT / Tax</span>
                                <span>{formatMoney(taxAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="text-red-500">{deliveryCharge > 0 ? `+ ${formatMoney(deliveryCharge)}` : "Free"}</span>
                            </div>
                            <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{formatMoney(totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">History</h2>

                        <div className="relative pl-6 border-l-2 border-gray-100 dark:border-gray-800 space-y-8">
                            {/* Current Status */}
                            <div className="relative">
                                <span className={`absolute -left-[29px] w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${status.toLowerCase() === "delivered" ? "bg-green-500" : "bg-blue-500"
                                    }`}></span>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                    {status.replace("_", " ")}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {createdAt}
                                </p>
                            </div>

                            {/* Creation (Always at bottom) */}
                            <div className="relative">
                                <span className="absolute -left-[29px] w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600"></span>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Order Created</p>
                                <p className="text-xs text-gray-500 mt-1">{createdAt}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT COLUMN (Customer, Fulfillment, Shipping) --- */}
                <div className="space-y-6">

                    {/* Customer Info */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm relative">
                        <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit size={16} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Customer Info</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-lg font-semibold">
                                {order.buyer_first_name ? order.buyer_first_name[0] : "U"}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {order.buyer_first_name} {order.buyer_last_name}
                                </p>
                                <p className="text-sm text-gray-500">{order.auction_type}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-gray-400 mt-1" />
                                <span className="text-sm text-gray-600 dark:text-gray-300 break-all">
                                    {order.buyer_email || "No email"}
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="text-gray-500">Payment:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {order.payment_method || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fulfilment (Placeholder for now as logic can be complex) */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm relative">
                        <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit size={16} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Fulfilment</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Ship by</span>
                                <span className="text-gray-900 dark:text-white font-medium">Standard Shipping</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Tracking No.</span>
                                <span className="text-gray-900 dark:text-white font-medium">—</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm relative">
                        <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit size={16} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Shipping</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Address</p>
                                {order.address ? (
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {order.address.streetAddress}<br />
                                        {order.address.city}, {order.address.state}<br />
                                        {order.address.zipCode}<br />
                                        {order.address.country}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500">No address provided</p>
                                )}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Phone Number</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {order.buyer_mobile || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
