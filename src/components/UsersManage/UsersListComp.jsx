import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Pagination from "../ui/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { MoreDotIcon } from "../../icons";
import { userList } from "../../api/authApi";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import noUserAnimation from "../../lottie/NoUser.json";
import { TableShimmer } from "../common/CommonShimmer";

const baseURL = import.meta.env.VITE_API_URL;


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

export default function UserListComp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusOptions, setStatusOptions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const debounceRef = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);     // reset page only once
      fetchUsers(1, value); // fetch with search
    }, 400);
  };


  // ---------------------------------------------------------
  // FETCH USERS
  // ---------------------------------------------------------
  const fetchUsers = useCallback(
    async (page = 1, searchValue = "") => {
      try {
        setLoading(true);

        const res = await userList(page, pageSize, searchValue);
        const list = res?.data || [];

        setUsers(list);
        setCurrentPage(res.page || page);
        setTotalPages(res.totalPages || 1);
        setTotalItems(res.total || list.length);

        const uniqueStatuses = [
          ...new Set(
            list
              .map((u) => u.status)
              .filter(Boolean)
          ),
        ];

        setStatusOptions(uniqueStatuses);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );
  useEffect(() => {
    fetchUsers(1, "");
  }, []);


  // ---------------------------------------------------------
  // FILTER + SORT (CLIENT SIDE)
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // AUTO CLOSE MENU
  // ---------------------------------------------------------
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".status-menu")) setMenuOpen(null);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">{t("user_page.filter_status")}</option>
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">{t("user_page.sort")}</option>
            <option value="newest">{t("user_page.sort_newest")}</option>
            <option value="oldest">{t("user_page.sort_oldest")}</option>
            <option value="a_to_z">{t("user_page.sort_a_to_z")}</option>
            <option value="z_to_a">{t("user_page.sort_z_to_a")}</option>
          </select>
        </div>
      </div>
      {/* TABLE / EMPTY STATE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 mt-5">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <TableShimmer rows={5} />
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Lottie
                animationData={noUserAnimation}
                loop
                style={{ width: 260 }}
              />

              <h2 className="mt-6 text-lg font-semibold">No users found</h2>

              <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                You haven’t added any users yet. Start by creating a new
                user.
              </p>

              <Button
                className="mt-6"
                onClick={() => navigate("/add-user-for-role")}
              >
                Add User
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/5">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.user_name")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.address")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.Role")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.registered_date")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.status")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-bold text-gray-500 text-start"
                    >
                      {t("user_page.table.actions")}
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {/* {sortedUsers.map((u) => { */}
                  {users.map((u) => {

                    const fullName = `${u.first_name || ""} ${u.last_name || ""
                      }`.trim();

                    return (
                      <TableRow className="hover:bg-gray-50">
                        {/* USER NAME */}
                        <TableCell className="px-5 py-4">
                          <div
                            className="flex items-center gap-3 cursor-pointer hover:underline"
                            onClick={() => navigate(`/users/${u.id}`)}
                          >
                            <img
                              src={u.image}
                              loading="lazy"
                              alt={fullName}
                              className="w-10 h-10 rounded-full border bg-gray-100"
                            />

                            <span className="text-gray-800 dark:text-white font-medium">
                              {fullName}
                            </span>
                          </div>
                        </TableCell>


                        {/* ADDRESS */}
                        <TableCell className="px-5 py-4 text-gray-600">
                          {u.address || "-"}
                        </TableCell>

                        <TableCell className="px-5 py-4 text-gray-600">
                          <Badge
                            size="sm"
                            color={getRoleBadgeColor(u.role)}
                          >
                            {u.role}
                          </Badge>
                        </TableCell>

                        {/* DATE */}
                        <TableCell className="px-5 py-4 text-gray-600">
                          {u.created_at}
                        </TableCell>

                        {/* STATUS */}
                        <TableCell className="px-5 py-4">
                          <Badge size="sm" color={getBadgeColor(u.status)}>
                            {u.status}
                          </Badge>
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell className="px-5 py-4 relative">
                          <MoreDotIcon
                            className="h-5 w-5 cursor-pointer status-menu"
                            onClick={() =>
                              setMenuOpen(menuOpen === u.id ? null : u.id)
                            }
                          />

                          {menuOpen === u.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-20 status-menu">
                              {statusOptions.map((s, i) => (
                                <div
                                  key={`${s}-${i}`}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(u.id, s);
                                  }}
                                >
                                  {s}
                                </div>
                              ))}

                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                totalPages={totalPages}
                pageSize={pageSize}
                // onPageChange={(page) => fetchUsers(page)}
                onPageChange={(page) => fetchUsers(page, search)}

              />
            </>
          )}
        </div>
      </div>
    </>


  );
}
