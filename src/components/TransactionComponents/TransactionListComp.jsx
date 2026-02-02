import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../../api/authApi";
import Pagination from "../ui/pagination/Pagination";
import { TableShimmer } from "../common/CommonShimmer";

export default function TransactionListComp() {
  const navigate = useNavigate();

  // State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // Filter States
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Pass filters as query params to the API
        const response = await getAllTransactions({
          page,
          limit,
          search,
          status,
          type
        });

        if (response?.data?.payments) {
          setData(response.data.payments);
          setTotalCount(response.data.totalCount || 0);
        } else {
          // Fallback if structure is different or empty
          setData([]);
          setTotalCount(0);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search could be added here, but for now direct call on change/render
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // Simple debounce for search typing

    return () => clearTimeout(timer);
  }, [page, search, status, type]);

  // Handle helpers
  const handleReset = () => {
    setSearch("");
    setStatus("");
    setType("");
    setPage(1);
  }

  return (
    <div className="space-y-6">
      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-2xl p-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by Transaction ID, User or Vendor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-80 border rounded-lg px-3 py-2 text-sm focus:outline-none"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1); // Reset to page 1 on filter change
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="auction">Auction</option>
            <option value="buyTogether">Buy Together</option>
          </select>

          <button
            onClick={handleReset}
            className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-2xl overflow-x-auto min-h-[300px]">
        {loading ? (
          <TableShimmer rows={10} columns={8} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">Auction / Product</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                data.map((txn) => (
                  <tr key={txn.payment_id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-xs">
                      {txn.transaction_id || txn.payment_id?.slice(0, 8)}
                      {txn.gateway && <div className="text-[10px] text-gray-400 capitalize">{txn.gateway}</div>}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {new Date(txn.created_at).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium">{txn.buyer_first_name} {txn.buyer_last_name}</p>
                      <p className="text-xs text-gray-500">{txn.buyer_email}</p>
                    </td>

                    <td className="px-4 py-3">
                      {txn.vendor_business_name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <p className="truncate max-w-[150px]" title={txn.product_name}>{txn.product_name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{txn.auction_title}</p>
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {txn.currency} {Number(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${txn.payment_status === "paid" || txn.payment_status === "success"
                          ? "bg-green-100 text-green-700"
                          : txn.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {txn.payment_status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/transactions/${txn.payment_id}`)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalItems={totalCount}
        onPageChange={setPage}
      />
    </div>
  );
}
