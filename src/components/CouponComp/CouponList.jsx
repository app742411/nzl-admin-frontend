"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import ComponentCard from "../common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableShimmer } from "../common/CommonShimmer";

import Button from "../ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../../icons";

import {
  couponList,
  couponListActive,
  couponListExpired,
  deleteCoupon,
} from "../../api/authApi";

import toast from "react-hot-toast";
import EditCouponModal from "./EditCouponModal";
import DeleteCouponModal from "./DeleteCouponModal";
import Badge from "../ui/badge/Badge";
import Pagination from "../ui/pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const CouponList = forwardRef((props, ref) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const getStatusBadgeColor = (status) => {
    const map = {
      active: "success",
      inactive: "info",
      expired: "error",
    };

    return map[status] || "light";
  };

  const fetchCoupons = async (page = 1) => {
    try {
      setLoading(true);

      const res = await couponList(page, ITEMS_PER_PAGE);

      setCoupons(res.data || []);
      setTotalItems(res.total || 0);
    } catch (error) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshList: () => fetchCoupons(currentPage, tab),
  }));
  useEffect(() => {
    fetchCoupons(currentPage);
  }, [currentPage]);
  const filteredCoupons = useMemo(() => {
    let filtered = [...coupons];

    // TAB FILTER
    if (tab !== "all") {
      filtered = filtered.filter((c) => c.status?.toLowerCase() === tab);
    }

    // SEARCH
    if (search) {
      filtered = filtered.filter((coupon) =>
        coupon.coupon_name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // SORT
    if (sortBy === "value") {
      filtered.sort((a, b) => b.discount_value - a.discount_value);
    } else if (sortBy === "type") {
      filtered.sort((a, b) => a.discount_type.localeCompare(b.discount_type));
    } else if (sortBy === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    return filtered;
  }, [coupons, tab, search, sortBy]);

  return (
    <>
      <ComponentCard>
        <div className="flex gap-4 border-b pb-3 mb-6">
          {["all", "active", "inactive"].map((t) => (
            <button
              key={t}
              className={`px-3 font-medium ${tab === t
                  ? "py-1 px-4 rounded-full bg-brand-500 text-white"
                  : "text-gray-500"
                }`}
              onClick={() => {
                setTab(t);
                setCurrentPage(1);
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* SEARCH + SORT */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by coupon code..."
            className="border rounded-lg p-2 w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="value">Discount Value</option>
            <option value="type">Discount Type</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="max-w-full overflow-x-auto">
            {loading ? (
              <TableShimmer rows={5} columns={6} />
            ) : (
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] text-center">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      Code
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      Value
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      Start Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      End Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-3 py-3 text-center text-theme-xs text-gray-500"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-dashed text-[15px]">
                  {filteredCoupons.length > 0 ? (
                    filteredCoupons.map((coupon, index) => (
                      <TableRow key={coupon.id}>
                        <TableCell className=" px-3 py-3 sm:px-6 text-center">
                          {coupon.coupon_name}
                        </TableCell>

                        <TableCell className="text-center px-5 py-3 sm:px-6">
                          {coupon.discount_type === "percentage" ? (
                            <span className="text-green-600 font-semibold">
                              {coupon.discount_value}%
                            </span>
                          ) : (
                            <span className="text-blue-600 font-semibold">
                              SAR {coupon.discount_value}
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="text-center px-5 py-3 sm:px-6">
                          {coupon.start_date}
                        </TableCell>
                        <TableCell className="text-center px-5 py-3 sm:px-6">
                          {coupon.end_date}
                        </TableCell>
                        <TableCell className="text-center px-5 py-3 sm:px-6 capitalize">
                          <Badge
                            variant="light"
                            color={getStatusBadgeColor(coupon.status)}
                            size="sm"
                          >
                            {coupon.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-center px-5 py-3 sm:px-6">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="xs"
                              variant=""
                              onClick={() => {
                                setSelectedCoupon(coupon);
                                setEditOpen(true);
                              }}
                            >
                              <PencilIcon className="w-4 h-4 text-green-500" />
                            </Button>

                            <Button
                              size="xs"
                              variant=""
                              onClick={() => {
                                setCouponToDelete(coupon);
                                setDeleteOpen(true);
                              }}
                            >
                              <TrashBinIcon className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        No coupons found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* PAGINATION */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={ITEMS_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </ComponentCard>

      {/* EDIT MODAL */}
      <EditCouponModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        coupon={selectedCoupon}
        onSave={() => fetchCoupons(currentPage, tab)}
      />

      {/* DELETE MODAL */}
      <DeleteCouponModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteCoupon(couponToDelete.id);
            toast.success("Coupon deleted");
            setDeleteOpen(false);
            fetchCoupons(currentPage, tab);
          } catch {
            toast.error("Failed to delete coupon");
          }
        }}
      />
    </>
  );
});

export default CouponList;
