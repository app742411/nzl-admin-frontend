import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUsersBySegment } from "../../api/authApi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Pagination from "../ui/pagination/Pagination";
import { TableShimmer } from "../common/CommonShimmer";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import Lottie from "lottie-react";
import noUserAnimation from "../../lottie/NoUser.json";

const SEGMENTS = [
    { label: "All Users", value: "ALL_USERS" },
    { label: "Weekly Active Users (WAU)", value: "WAU" },
    { label: "Monthly Loyalists", value: "MONTHLY_LOYALISTS" },
    { label: "Dormant Users", value: "DORMANT" },
    { label: "New Users", value: "NEW_USERS" },
    { label: "First Drop Watchers", value: "FIRST_DROP_WATCHERS" },
    { label: "First Time Buyers", value: "FIRST_TIME_BUYERS" },
    { label: "Reactivated Users", value: "REACTIVATED" },
    { label: "Abandoned Checkout", value: "ABANDONED_CHECKOUT" },
    { label: "High Spenders", value: "HIGH_SPENDERS" },
    { label: "One Timers", value: "ONE_TIMERS" },
    { label: "High Refund Users", value: "HIGH_REFUND_USERS" },
    { label: "Referral", value: "REFFERAL" },
];

export const getRoleBadgeColor = (role) => {
    if (!role) return "light";

    const normalized = role
        .toString()
        .toLowerCase()
        .replace(/\s|_|-/g, "");

    const roleColorMap = {
        user: "light",
        vendor: "success",
        auctionmanager: "info",
        financemanager: "warning",
        support: "primary",
        admin: "dark",
        superadmin: "error",
    };

    return roleColorMap[normalized] || "light";
};

const ActivityUsersComp = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [segment, setSegment] = useState("ALL_USERS"); // Default segment
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const params = {
                search: search,
                page: page,
                limit: 10,
            };

            //  Only send segment if NOT ALL_USERS
            if (segment !== "ALL_USERS") {
                params.segment = segment;
            }

            const res = await getUsersBySegment(params);
            if (res.success) {
                setUsers(res.data);
                setTotalPages(res.totalPages);
                setTotalUsers(res.total);
            }
        } catch (error) {
            console.error("Failed to fetch activity users", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [segment, search, page]);

    // Reset page when filter or search changes
    useEffect(() => {
        setPage(1);
    }, [segment, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSegmentChange = (e) => {
        setSegment(e.target.value);
    };

    const getBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "success";
            case "pending":
                return "warning";
            case "suspended":
                return "error";
            default:
                return "gray";
        }
    };

    return (
        <>
            {/* FILTERS */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 mb-5">
                <input
                    type="text"
                    placeholder={t("user_page.search_placeholder")}
                    className="border rounded-lg p-2 w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
                    value={search}
                    onChange={handleSearchChange}
                />

                <div className="flex gap-4">
                    <select
                        className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
                        value={segment}
                        onChange={handleSegmentChange}
                    >
                        {SEGMENTS.map((seg) => (
                            <option key={seg.value} value={seg.value}>
                                {seg.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* TABLE / EMPTY STATE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 mt-5">
                <div className="max-w-full overflow-x-auto">
                    {loading ? (
                        <TableShimmer rows={10} columns={6} />
                    ) : users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Lottie
                                animationData={noUserAnimation}
                                loop
                                style={{ width: 260 }}
                            />
                            <h2 className="mt-6 text-lg font-semibold">No users found</h2>
                            <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                                No users found for this segment.
                            </p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader className="border-b border-gray-100 dark:border-white/5">
                                    <TableRow>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            {t("user_page.table.user_name")}
                                        </TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            Phone
                                        </TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            {t("user_page.table.Role")}
                                        </TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            {t("user_page.table.registered_date")}
                                        </TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            {t("user_page.table.status")}
                                        </TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-bold text-gray-500 text-start">
                                            Country
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {users.map((u) => {
                                        const fullName = `${u.first_name || ""} ${u.last_name || ""}`.trim();
                                        return (
                                            <TableRow key={u.id} className="hover:bg-gray-50">
                                                {/* USER NAME */}
                                                <TableCell className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={u.logo || ""}
                                                            loading="lazy"
                                                            alt={fullName}
                                                            className="w-10 h-10 rounded-full border bg-gray-100 object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://ui-avatars.com/api/?name=" + (u.first_name || "U") + "&background=random";
                                                            }}
                                                        />
                                                        <div>
                                                            <h5 className="font-medium text-gray-800 dark:text-white">
                                                                {fullName || "N/A"}
                                                            </h5>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {u.email || "No Email"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* PHONE */}
                                                <TableCell className="px-5 py-4 text-gray-600">
                                                    {u.phone_number || "N/A"}
                                                </TableCell>

                                                {/* ROLE */}
                                                <TableCell className="px-5 py-4 text-gray-600">
                                                    <Badge size="sm" color={getRoleBadgeColor(u.role)}>
                                                        {u.role}
                                                    </Badge>
                                                </TableCell>

                                                {/* DATE */}
                                                <TableCell className="px-5 py-4 text-gray-600">
                                                    {new Date(u.created_at).toLocaleDateString()}
                                                </TableCell>

                                                {/* STATUS */}
                                                <TableCell className="px-5 py-4">
                                                    <Badge size="sm" color={getBadgeColor(u.status)}>
                                                        {u.status}
                                                    </Badge>
                                                </TableCell>

                                                {/* COUNTRY */}
                                                <TableCell className="px-5 py-4 text-gray-600">
                                                    {u.country || "N/A"}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                            <Pagination
                                currentPage={page}
                                totalItems={totalUsers}
                                totalPages={totalPages}
                                pageSize={10}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ActivityUsersComp;
