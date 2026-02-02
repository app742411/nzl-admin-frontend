import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import DatePicker from "../form/DatePicker";
import { Download } from "lucide-react";
import Pagination from "../ui/pagination/Pagination";
import { getAllOrdersApi } from "../../api/authApi";
import { TableShimmer } from "../common/CommonShimmer";





function ActionMenu({ onAccept, onView, onReject }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-800 p-2"
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800 z-50">
          <button
            onClick={() => {
              setOpen(false);
              onAccept();
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Accept Order
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onView();
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            View Details
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onReject();
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-800"
          >
            Reject Order
          </button>
        </div>
      )}
    </div>
  );
}

// ===== STATIC FILTER OPTIONS (UI ONLY) =====

const ORDER_STATUSES = [
  "All",
  "Draft",
  "Deleted",
  "Awaiting Payment",
  "Pending Review",
  "Processing",
  "Completed",
  "Out for Delivery",
  "Delivered",
  "Shipped",
  "Cancelled",
  "Returned",
  "Warranty Return",
  "Return in Progress",
  "Quotation Request",
];

const SHIPPING_COMPANIES = [
  "All",
  "DHL",
  "FedEx",
  "Aramex",
  "Blue Dart",
];

const SHIPPING_LABELS = ["Issued", "Not Issued"];

const ORDER_TYPES = ["All", "Reverse auction", "Buy together"];

const PAYMENT_METHODS = [
  "All",
  "Cash on Delivery",
  "Credit Card",
  "PayPal",
  "Mada",
  "Customer Wallet",
  "Tamara",
  "Tabby",
  "MIS Pay",
  "Emkan Pay Later",
  "Paid",
  "Knet",
  "Al Rajhi Reward",
  "stc pay",
];

const COUNTRIES = ["India", "Saudi Arabia"];

const CITIES_BY_COUNTRY = {
  India: ["Indore", "Bhopal", "Mumbai"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam"],
};

const WAREHOUSES = ["All", "Warehouse 1", "Warehouse 2"];

const SORT_OPTIONS = [
  "Order Number - Descending",
  "Order Number - Ascending",
  "Order Total - Descending",
  "Order Total - Ascending",
  "Last Updated - Ascending",
  "Last Updated - Descending",
  "Order Date - Ascending",
  "Order Date - Descending",
];

const ORDER_SOURCES = [
  "All",
  "Mobile Browser",
  "Desktop Browser",
  "Affiliate Marketing",
  "Native App",
  "POS App",
  "Unknown",
];


export default function OrderListComp() {
  const navigate = useNavigate();
  // ===== UI ONLY FILTER STATES =====
  const [orderStatusUI, setOrderStatusUI] = useState("All");
  const [shippingCompanyUI, setShippingCompanyUI] = useState("All");
  const [shippingLabelUI, setShippingLabelUI] = useState("");
  const [orderTypeUI, setOrderTypeUI] = useState("All");
  const [paymentMethodUI, setPaymentMethodUI] = useState("All");
  const [countryUI, setCountryUI] = useState("");
  const [cityUI, setCityUI] = useState("");
  const [warehouseUI, setWarehouseUI] = useState("All");
  const [orderSourceUI, setOrderSourceUI] = useState("All");
  const [sortByUI, setSortByUI] = useState("");
  const [tagsUI, setTagsUI] = useState([]);
  const [productSearchUI, setProductSearchUI] = useState("");



  // Filters
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;
  const statusMap = {
    "Awaiting Payment": "pending",
    "Ready to Ship": "shipped",
    Delivered: "paid",
    Rejected: "rejected",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrdersApi({
          page,
          limit,
          search,
          status: activeTab !== "All" ? statusMap[activeTab] : undefined,
          paymentStatus: filterPayment || undefined,
          orderType: orderTypeFilter || undefined,
          date: filterDate || undefined,
        });

        setOrders(res.data.orders || []);
        setTotalCount(res.data.totalCount || 0);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [
    page,
    search,
    activeTab,
    filterPayment,
    orderTypeFilter,
    filterDate,
  ]);

  const normalizedOrders = useMemo(() => {
    return orders.map((o) => {
      const createdDate = new Date(o.created_at);

      return {
        // Order
        orderId: o.order_id,
        orderShortId: `#${o.order_id.split("-").pop()}`,


        // Buyer
        userName: `${o.buyer_first_name ?? ""} ${o.buyer_last_name ?? ""}`.trim(),
        email: o.buyer_email || "-",
        phone: "-", // not provided

        // Product
        productName: o.product_name || "-",
        category: "Auction",

        // Quantity & price
        quantity: o.quantity,
        total: `${o.currency} ${Number(o.total_amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,


        // Vendor / Merchant
        merchant: o.vendor_business_name || "—",

        // Product image
        image: o.product_image
          ? `${o.product_image}`
          : "/images/product/product-01.jpg",

        // Status (UI-friendly)
        status:
          o.status === "paid"
            ? "Delivered"
            : o.status === "pending"
              ? "Pending"
              : o.status,

        paymentStatus:
          o.status === "paid" ? "Confirmed" : "Pending",

        orderType: "reverse",

        // Date & time
        date: createdDate.toLocaleDateString(),
        time: createdDate.toLocaleTimeString(),

        // Location (optional, useful later)
        city: o.address?.city || "",
        state: o.address?.state || "",
        country: o.address?.country || "",
      };
    });
  }, [orders]);




  // ------------------- TABS (Only these 4) -------------------
  const tabs = useMemo(() => [
    {
      key: "All",
      label: "All",
      count: normalizedOrders.length,
      color: "blue",
    },
    {
      key: "Awaiting Payment",
      label: "Awaiting Payment",
      count: normalizedOrders.filter(o => o.paymentStatus === "Pending").length,
      color: "yellow",
    },
    {
      key: "Ready to Ship",
      label: "Ready to Ship",
      count: normalizedOrders.filter(o => o.status === "Shipped").length,
      color: "green",
    },
    {
      key: "Delivered",
      label: "Delivered",
      count: normalizedOrders.filter(o => o.status === "Delivered").length,
      color: "blue",
    },
    {
      key: "Rejected",
      label: "Rejected",
      count: normalizedOrders.filter(o => o.status === "Rejected").length,
      color: "red",
    },
  ], [normalizedOrders]);


  // ------------------- FILTER LOGIC -------------------
  const filteredOrders = useMemo(() => {
    return normalizedOrders
      .filter((o) => {
        if (activeTab === "All") return true;
        if (activeTab === "Awaiting Payment")
          return o.paymentStatus === "Pending";
        if (activeTab === "Ready to Ship") return o.status === "Shipped";
        if (activeTab === "Delivered") return o.status === "Delivered";
        return true;
      })
      .filter((o) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
          o.orderId.toLowerCase().includes(s) ||
          o.userName.toLowerCase().includes(s) ||
          o.email.toLowerCase().includes(s) ||
          o.phone.includes(s)
        );
      })
      .filter((o) => {
        if (!filterDate) return true;
        return o.date === filterDate;
      })
      .filter((o) => {
        if (!filterPayment) return true;
        return o.paymentStatus === filterPayment;
      })
      .filter((o) => {
        if (!orderTypeFilter) return true;
        return o.orderType === orderTypeFilter;
      });
  }, [
    normalizedOrders,
    activeTab,
    search,
    filterDate,
    filterPayment,
    orderTypeFilter,
  ]);


  // ------------------- CSV EXPORT -------------------
  const exportCSV = () => {
    const rows = [
      [
        "Order ID",
        "User",
        "Email",
        "Phone",
        "Date",
        "time",
        "Qty",
        "Status",
        "Payment",
        "Product Name",
        "category",
      ],
      ...filteredOrders.map((o) => [
        o.orderId,
        o.userName,
        o.email,
        o.phone,
        o.date,
        o.time,
        o.quantity,
        o.status,
        o.paymentStatus,
        o.productName,
        o.category,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* ------------------- TABS ------------------- */}
      <div className="flex items-center gap-4 mb-5">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          // Generate Tailwind classes based on tab.color
          const colorMap = {
            blue: {
              text: "text-blue-600 dark:text-blue-400",
              badge: "bg-blue-100 text-blue-600",
              underline: "bg-blue-600",
            },
            green: {
              text: "text-green-600 dark:text-green-400",
              badge: "bg-green-100 text-green-600",
              underline: "bg-green-600",
            },
            yellow: {
              text: "text-yellow-600 dark:text-yellow-400",
              badge: "bg-yellow-100 text-yellow-600",
              underline: "bg-yellow-600",
            },
            red: {
              text: "text-red-600 dark:text-red-400",
              badge: "bg-red-100 text-red-600",
              underline: "bg-red-600",
            },
          };

          const c = colorMap[tab.color] ?? colorMap.blue; // fallback

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-3 text-sm font-medium whitespace-nowrap
        ${active ? c.text : "text-gray-500 dark:text-gray-400"}`}
            >
              {tab.label}

              {/* Count badge */}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs
          ${active
                    ? c.badge
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
              >
                {tab.count}
              </span>

              {/* Active underline */}
              {active && (
                <div
                  className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full ${c.underline}`}
                />
              )}
            </button>
          );
        })}
      </div>


      {/* ===== ADVANCED FILTERS (STATIC UI ONLY) ===== */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Order Status
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={orderStatusUI}
          onChange={(e) => setOrderStatusUI(e.target.value)}
        >
          {ORDER_STATUSES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select> */}

        {/* Shipping Company */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={shippingCompanyUI}
          onChange={(e) => setShippingCompanyUI(e.target.value)}
        >
          {SHIPPING_COMPANIES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Shipping Label */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={shippingLabelUI}
          onChange={(e) => setShippingLabelUI(e.target.value)}
        >
          <option value="">Shipping Label</option>
          {SHIPPING_LABELS.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Order Type
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={orderTypeUI}
          onChange={(e) => setOrderTypeUI(e.target.value)}
        >
          {ORDER_TYPES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select> */}

        {/* Payment Method */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={paymentMethodUI}
          onChange={(e) => setPaymentMethodUI(e.target.value)}
        >
          {PAYMENT_METHODS.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Country */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={countryUI}
          onChange={(e) => {
            setCountryUI(e.target.value);
            setCityUI("");
          }}
        >
          <option value="">Country</option>
          {COUNTRIES.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* City (depends on country) */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={cityUI}
          onChange={(e) => setCityUI(e.target.value)}
          disabled={!countryUI}
        >
          <option value="">City</option>
          {(CITIES_BY_COUNTRY[countryUI] || []).map(city => (
            <option key={city}>{city}</option>
          ))}
        </select>

        {/* Warehouse */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={warehouseUI}
          onChange={(e) => setWarehouseUI(e.target.value)}
        >
          {WAREHOUSES.map(w => (
            <option key={w}>{w}</option>
          ))}
        </select>

        {/* Order Source */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={orderSourceUI}
          onChange={(e) => setOrderSourceUI(e.target.value)}
        >
          {ORDER_SOURCES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Sorting */}
        <select className="border rounded-lg px-3 py-2 text-sm"
          value={sortByUI}
          onChange={(e) => setSortByUI(e.target.value)}
        >
          <option value="">Sort By</option>
          {SORT_OPTIONS.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Product Search
        <input
          placeholder="Search product"
          className="border rounded-lg px-3 py-2 text-sm"
          value={productSearchUI}
          onChange={(e) => setProductSearchUI(e.target.value)}
        /> */}

      </div>

      {/* ------------------- FILTERS ------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2.5 text-sm  w-[500px]"
          />

          {/* Date Picker */}
          <DatePicker
            label="Select Date"
            value={filterDate}
            onChange={setFilterDate}
          />

          {/* Payment Filter */}
          <select
            className="border rounded-lg px-2 py-2.5 text-sm "
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
          >
            <option value="">Payment</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
          </select>

          {/* Order Type Filter */}
          <select
            className="border rounded-lg px-2 py-2.5 text-sm"
            value={orderTypeFilter}
            onChange={(e) => setOrderTypeFilter(e.target.value)}
          >
            <option value="">Order Type</option>
            <option value="normal">Normal</option>
            <option value="reverse">Reverse Auction</option>
            <option value="buyTogether">Buy Together</option>
          </select>
        </div>

        {/* CSV Export */}
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* ------------------- TABLE ------------------- */}
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <TableShimmer rows={10} />
        ) : (
          <Table>
            <TableHeader className="bg-gray-100 py-3">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Order ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Product
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  User / Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Date & Time
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Quantity
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Order Total
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Vendor
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200 dark:divide-gray-800 divide-dashed">
              {filteredOrders.map((o) => (
                <TableRow key={o.orderShortId}>
                  {/* Order ID */}
                  <TableCell className="px-5 py-3 text-start">
                    {o.orderShortId}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-start">
                    <div className="flex items-center gap-2">
                      <img
                        src={o.image}
                        className="h-[44px] w-[44px] rounded-full object-cover"
                        alt={o.userName}
                      />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {o.productName}
                        </p>
                        <p className="text-gray-500 text-xs">{o.category}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* User */}
                  <TableCell className="px-5 py-3 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {o.userName}
                        </p>
                        <p className="text-gray-500 text-xs">{o.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="px-5 py-3 text-start">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {o.date}
                      </p>
                      <p className="text-gray-500 text-xs">{o.time}</p>
                    </div>
                  </TableCell>

                  {/* Quantity */}
                  <TableCell className="px-5 py-3 text-start">
                    {o.quantity}
                  </TableCell>

                  {/* Total */}
                  <TableCell className="px-5 py-3 text-start">
                    {o.total}
                  </TableCell>

                  {/* Merchant */}
                  <TableCell className="px-5 py-3 text-start">
                    {o.merchant}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-5 py-3 text-start">
                    <Badge
                      size="sm"
                      color={
                        o.status === "Delivered"
                          ? "success"
                          : o.status === "Pending"
                            ? "warning"
                            : "error"
                      }
                    >
                      {o.status}
                    </Badge>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-5 py-3 text-start">
                    <ActionMenu
                      onAccept={() => console.log("Accept:", o.orderId)}
                      onView={() => navigate(`/order-details/${o.orderId}`)}
                      onReject={() => console.log("Reject:", o.orderId)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        pageSize={limit}
        onPageChange={(p) => setPage(p)}
      />

    </div>
  );
}
