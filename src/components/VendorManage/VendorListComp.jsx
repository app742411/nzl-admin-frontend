import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import {
  vendorList,
  deleteVendor,
  changeVendorStatus,
} from "../../api/authApi";
import Lottie from "lottie-react";
import noVendorAnimation from "../../lottie/NoUser.json";
import { TableShimmer } from "../common/CommonShimmer";

const baseURL = import.meta.env.VITE_API_URL;

export default function VendorListComp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState([]);
  const [totalVendors, setTotalVendors] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  // ---------------------------------------------------------
  // DELETE VENDOR
  // ---------------------------------------------------------
  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    try {
      await deleteVendor(vendorId);
      setVendorData((prev) => prev.filter((v) => v.id !== vendorId));
      setTotalVendors((prev) => prev - 1);
      setMenuOpen(null);
    } catch (error) {
      alert("Failed to delete vendor");
    }
  };

  // ---------------------------------------------------------
  // FETCH VENDORS
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const res = await vendorList(currentPage, pageSize);
        setVendorData(res.data || []);
        setTotalVendors(res.total || 0);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
      setLoading(false);
    };

    fetchVendors();
  }, [currentPage]);

  // ---------------------------------------------------------
  // FILTER + SORT
  // ---------------------------------------------------------
  const filteredVendors = useMemo(() => {
    let result = Array.isArray(vendorData) ? [...vendorData] : [];

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (v) =>
          (v.first_name || "").toLowerCase().includes(q) ||
          (v.business_name || "").toLowerCase().includes(q) ||
          (v.email || "").toLowerCase().includes(q),
      );
    }

    if (filterStatus) {
      result = result.filter(
        (v) => v.status?.toLowerCase() === filterStatus.toLowerCase(),
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0),
      );
    }

    return result;
  }, [vendorData, search, filterStatus, sortBy]);

  const getBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      default:
        return "light";
    }
  };

  const handleStatusChange = async (vendorId, status) => {
    try {
      await changeVendorStatus(vendorId, status);
      setVendorData((prev) =>
        prev.map((v) => (v.id === vendorId ? { ...v, status } : v)),
      );
      setMenuOpen(null);
    } catch (error) {
      alert("Failed to update vendor status");
    }
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".status-menu")) setMenuOpen(null);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-end mb-5">
        <Link
          to="/add-vendor"
          className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-lg font-medium text-white"
        >
          + {t("vendor_page.add_new_vendor")}
        </Link>
      </div>

      {/* FILTERS */}
      {/* <div className="flex flex-col md:flex-row gap-4 p-5 bg-white rounded-lg border mb-5">
        <input
          type="text"
          placeholder={t("vendor_page.search_placeholder")}
          className="border rounded-lg p-2 w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <select
            className="border rounded-lg p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">{t("vendor_page.filter_status")}</option>
            <option value="active">{t("vendor_page.status_active")}</option>
            <option value="inactive">{t("vendor_page.status_suspended")}</option>
          </select>

          <select
            className="border rounded-lg p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">{t("vendor_page.sort_by")}</option>
            <option value="newest">{t("vendor_page.sort_newest")}</option>
            <option value="oldest">{t("vendor_page.sort_oldest")}</option>
          </select>
        </div>
      </div> */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 bg-white dark:bg-gray-900 rounded-lg border mb-5">
        <input
          type="text"
          placeholder={t("vendor_page.search_placeholder")}
          className="border rounded-lg p-2 w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <select
            className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">{t("vendor_page.filter_status")}</option>
            <option value="Active">{t("vendor_page.status_active")}</option>
            <option value="Inactive">
              {t("vendor_page.status_suspended")}
            </option>
          </select>

          <select
            className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">{t("vendor_page.sort_by")}</option>
            <option value="newest">{t("vendor_page.sort_newest")}</option>
            <option value="oldest">{t("vendor_page.sort_oldest")}</option>
            <option value="a_to_z">{t("vendor_page.sort_a_to_z")}</option>
            <option value="z_to_a">{t("vendor_page.sort_z_to_a")}</option>
          </select>
        </div>
      </div>

      {/* TABLE / EMPTY STATE */}
      <div className="ooverflow-hidden rounded-xl border bg-white dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <TableShimmer rows={5} />
          ) : filteredVendors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Lottie
                animationData={noVendorAnimation}
                loop
                style={{ width: 260 }}
              />

              <h2 className="mt-6 text-lg font-semibold">No vendors found</h2>

              <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                You haven’t added any vendors yet. Start by adding your first
                vendor.
              </p>

              <Button className="mt-6" onClick={() => navigate("/add-vendor")}>
                Add Vendor
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-gray-100 py-3">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.vendor_name")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.vendor_businessName")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.vendor_contact")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.contact_info")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.registered_date")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.status")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500"
                    >
                      {t("vendor_page.table.actions")}
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow
                      key={vendor.id}
                      className="border-b border-dashed border-b-blue-100"
                    >
                      {/* Vendor */}
                      <TableCell className="px-4 py-3">
                        <Link
                          to={`/vendors/${vendor.id}`}
                          className="group flex items-center gap-3"
                        >
                          <img
                            className="h-10 w-10 rounded-full border object-cover"
                            src={vendor.logo}
                            alt={`${vendor.first_name} ${vendor.last_name}`}
                          />

                          <div>
                            <div className="font-medium text-brand-500 group-hover:underline">
                              {vendor.first_name} {vendor.last_name}
                            </div>

                            <div className="text-sm text-gray-500">
                              {vendor.email}
                            </div>
                          </div>
                        </Link>
                      </TableCell>



                      {/* Contact */}
                      <TableCell className="px-4 py-3">
                        {vendor.business_name}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {vendor.phoneCode} {vendor.phone_number}
                      </TableCell>
                      {/* Contact */}
                      <TableCell className="px-4 py-3">
                        {vendor?.street_address}, {vendor?.city},{" "}
                        {vendor?.state}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="px-4 py-3">
                        {new Date(vendor.created_at).toLocaleDateString()}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-4 py-3 capitalize">
                        <Badge
                          size="sm"
                          color={getBadgeColor(vendor.status)}
                          className=""
                        >
                          {vendor.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="relative px-4 py-3 ">
                        <MoreDotIcon
                          className="h-5 w-5 cursor-pointer status-menu"
                          onClick={() =>
                            setMenuOpen(
                              menuOpen === vendor.id ? null : vendor.id,
                            )
                          }
                        />

                        {menuOpen === vendor.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded shadow status-menu over">
                            <ul>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer "
                                onClick={() =>
                                  handleStatusChange(
                                    vendor.id,
                                    vendor.status === "active"
                                      ? "inactive"
                                      : "active",
                                  )
                                }
                              >
                                {vendor.status === "active"
                                  ? "Set Inactive"
                                  : "Set Active"}
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                //onClick={() => handleStatusChange(vendor.id, "Delete")}
                                onClick={() => handleDeleteVendor(vendor.id)}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                totalItems={totalVendors}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
