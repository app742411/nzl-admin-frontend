import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInvoicesApi } from "../../api/authApi";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { TableShimmer } from "../common/CommonShimmer";
import Button from "../ui/button/Button";
import Pagination from "../ui/pagination/Pagination";

import { Download, Search } from "lucide-react";


const exportCSVWithAllColumns = (rows, fileName) => {
    if (!rows.length) return;

    const headers = Array.from(
        new Set(rows.flatMap((row) => Object.keys(row)))
    );

    const csv = [
        headers.join(","),

        ...rows.map((row) =>
            headers
                .map((key) => {
                    const value = row[key];

                    if (value === null || value === undefined) return '""';

                    if (typeof value === "object") {
                        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                    }

                    return `"${String(value).replace(/"/g, '""')}"`;
                })
                .join(",")
        ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};


/* ===================== CONSTANTS ===================== */
const TABS = [
    { key: "all", label: "All" },
    { key: "paid", label: "Paid" },
    { key: "pending", label: "Pending" },
    { key: "overdue", label: "Overdue" },
];

const PAGE_SIZE = 10;

/* ===================== HELPERS ===================== */

const formatCurrency = (currency, value) =>
    `${currency} ${Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

/* ===================== COMPONENT ===================== */

export default function InvoiceListComp() {

    const navigate = useNavigate();

    /* ---------- STATE ---------- */
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    /* ---------- API FETCH ---------- */
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);
                const res = await getAllInvoicesApi({
                    page,
                    limit: PAGE_SIZE,
                    status: activeTab !== "all" ? activeTab : undefined,
                    search: search || undefined,
                });

                setInvoices(res?.data?.rows ?? []);
                setTotalCount(res?.data?.totalCount ?? 0);
            } catch (error) {
                console.error("Failed to fetch invoices", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [page, activeTab, search]);

    /* ---------- NORMALIZE DATA ---------- */
    const normalizedInvoices = useMemo(() => {
        return invoices.map((i) => {
            const createdAt = new Date(i.payment_created_at);

            return {
                id: i.invoice_number,
                paymentId: i.payment_id,

                firstName: i.first_name,
                lastName: i.last_name,
                email: i.user_email,

                avatar: "/images/product/product-01.jpg",

                invoiceNo: i.invoice_number,
                orderNo: i.order_number,
                orderId: i.order_id,

                amount: formatCurrency(i.currency, i.amount),
                vat: formatCurrency(i.currency, i.amount),

                date: createdAt.toLocaleDateString(),
                time: createdAt.toLocaleTimeString(),
            };
        });
    }, [invoices]);


    const handleExportCSV = async () => {
        try {
            const res = await getAllInvoicesApi({
                page: 1,
                limit: 100000, // fetch all filtered rows
                status: activeTab !== "all" ? activeTab : undefined,
                search: search || undefined,
            });

            const rows = res?.data?.rows ?? [];

            exportCSVWithAllColumns(rows, "filtered_invoices_full_columns.csv");
        } catch (error) {
            console.error("CSV export failed", error);
        }
    };

    /* ===================== UI ===================== */

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 space-y-4">
            {/* ===================== TABS ===================== */}
            <div className="flex items-center gap-8 border-b pb-3">
                {TABS.map((tab) => {
                    const active = tab.key === activeTab;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setActiveTab(tab.key);
                                setPage(1);
                            }}
                            className="relative text-sm font-medium"
                        >
                            <span className={active ? "text-gray-900" : "text-gray-500"}>
                                {tab.label}
                            </span>

                            {active && (
                                <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-gray-900" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ===================== FILTER BAR ===================== */}
            <div className="flex items-center gap-4">
                <select className="h-11 w-56 rounded-lg border px-4 text-sm">
                    <option>Payment Channel</option>
                </select>

                <input type="date" className="h-11 w-44 rounded-lg border px-4 text-sm" />
                <input type="date" className="h-11 w-44 rounded-lg border px-4 text-sm" />

                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        placeholder="Search customer or invoice number..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="h-11 w-full rounded-lg border pl-10 pr-4 text-sm"
                    />
                </div>

                <Button
                    className="h-11 gap-2"
                    onClick={handleExportCSV}
                >
                    <Download size={16} />
                    Export CSV
                </Button>


                <button className="h-11 w-11 rounded-lg border text-xl">⋮</button>
            </div>

            {/* ===================== TABLE ===================== */}
            {loading ? (
                <TableShimmer rows={10} columns={7} />
            ) : (
                <Table className="table-fixed w-full">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {/* <TableCell isHeader className="px-5 py-3">
                            <input type="checkbox" />
                        </TableCell> */}
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Customer Details
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Invoice #
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Order #
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Amount
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Total incl. VAT
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Issue Date
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 text-left align-middle">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-dashed">
                        {normalizedInvoices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                                    No invoices found
                                </TableCell>
                            </TableRow>
                        ) : normalizedInvoices.map((inv) => (
                            <TableRow
                                key={inv.id}
                                onClick={() => navigate(`/invoices/${inv.id}`)}
                                className="cursor-pointer hover:bg-gray-50"
                            >
                                {/* <TableCell
                                className="px-5 py-3"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <input type="checkbox" />
                            </TableCell> */}

                                <TableCell className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        {/* <img
                                        src={inv.avatar}
                                        alt={`${inv.firstName} ${inv.lastName}`}
                                        className="h-10 w-10 rounded-full"
                                    /> */}
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {inv.firstName} {inv.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {inv.email}
                                            </p>
                                        </div>
                                    </div>

                                </TableCell>

                                <TableCell className="px-5 py-3">{inv.invoiceNo}</TableCell>
                                <TableCell className="px-5 py-3">{inv.orderNo}</TableCell>
                                <TableCell className="px-5 py-3">{inv.amount}</TableCell>
                                <TableCell className="px-5 py-3">{inv.vat}</TableCell>

                                <TableCell className="px-5 py-3">
                                    <p>{inv.date}</p>
                                    <p className="text-xs text-gray-400">{inv.time}</p>
                                </TableCell>

                                <TableCell
                                    className="px-5 py-3"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="text-green-600 text-sm font-medium"
                                            //     onClick={() => navigate(`/invoices/${inv.id}`)}
                                            onClick={() => navigate(`/invoices-details/${inv.paymentId}`)}
                                        >

                                            View Invoice
                                        </button>
                                        <button className="text-xl text-gray-500">⋮</button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* ===================== PAGINATION ===================== */}
            <Pagination
                currentPage={page}
                totalItems={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
            />
        </div>
    );
}
