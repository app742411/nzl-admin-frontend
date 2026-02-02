import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "../ui/pagination/Pagination";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../store/loaderSlice";
import { Table, TableBody, TableCell, TableHeader, TableRow, } from "../ui/table";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { productList, deleteProduct } from "../../api/authApi";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import deleteAnimation from "../../lottie/Delete.json";
import noProductAnimation from "../../lottie/NoProduct.json";
import Lottie from "lottie-react";
import { TableShimmer } from "../common/CommonShimmer";

const baseURL = import.meta.env.VITE_API_URL;





export default function ProductListComp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // filters
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [dynamicStatuses, setDynamicStatuses] = useState([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // ---------------------------------------------------------
  // LOAD PRODUCTS
  // ---------------------------------------------------------
  const loadProducts = async (page = 1) => {
    try {
      setLoading(true);
      // dispatch(showLoader());

      const res = await productList(
        page,
        10,
        search,
        filterCategory,
        filterStatus,
        sortBy,
      );

      const list = Array.isArray(res.data?.data) ? res.data.data : [];

      setProducts(list);
      setTotalItems(res.data.total || 0);
      // setCurrentPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);

      const categories = [...new Set(list.map((p) => p.category_name))].filter(
        Boolean,
      );
      const statuses = [...new Set(list.map((p) => p.sellStatus))].filter(
        Boolean,
      );

      setDynamicCategories(categories);
      setDynamicStatuses(statuses);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
      // dispatch(hideLoader());
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(currentPage);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentPage, search, filterStatus, filterCategory, sortBy]);

  // ---------------------------------------------------------
  // DELETE PRODUCT
  // ---------------------------------------------------------
  useEffect(() => {
    if (!deleting || !deleteId) return;

    const performDelete = async () => {
      try {
        await deleteProduct(deleteId);
        toast.success("Product deleted!");
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      } catch (err) {
        toast.error("Failed to delete product");
      } finally {
        setDeleting(false);
        setShowDeletePopup(false);
        setDeleteId(null);
      }
    };

    performDelete();
  }, [deleting, deleteId]);

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <>
      {/* DELETE POPUP */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 w-96 rounded-lg shadow-xl p-6 relative">
            <button
              onClick={() => setShowDeletePopup(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✖
            </button>

            <div className="flex justify-center mb-4">
              <Lottie
                animationData={deleteAnimation}
                loop={false}
                className="w-24"
              />
            </div>

            <h2 className="text-xl font-semibold text-center mb-3">
              Are you sure?
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Do you really want to delete this product?
            </p>

            <div className="flex justify-center gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="error"
                onClick={() => setDeleting(true)}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder={t("product_page.search_placeholder")}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 rounded text-sm w-100" />
        <div className="flex gap-4">
          {/* Category */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 rounded text-sm"
          >
            <option value="">{t("product_page.filter_category")}</option>
            {dynamicCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-2 rounded text-sm"
          >
            <option value="">{t("product_page.sort")}</option>
            <option value="name">{t("product_page.sort_name")}</option>
            <option value="recent">{t("product_page.sort_recent")}</option>
          </select>
        </div>
      </div>

      {/* TABLE / EMPTY STATE */}
      <div className="overflow-hidden rounded-xl border bg-white mt-5">
        <div className="max-w-full overflow-x-auto">


          {loading ? (
            <TableShimmer rows={6} />
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Lottie animationData={noProductAnimation} loop style={{ width: 260 }} />
              <h2 className="mt-6 text-lg font-semibold">No product found</h2>
              <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                You haven’t added any products yet. Start by adding your product.
              </p>
              <Button className="mt-6" onClick={() => navigate("/add-product")}>
                Add Product
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-gray-100 py-3">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.product")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.category")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.vendor")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.created_at")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.quantity")}
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-center text-theme-xs text-gray-500 font-semibold"
                    >
                      {t("product_page.table.action")}
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => {
                    const maxQty = p.maxQuantity || 100;
                    const percent = Math.min((p.quantity / maxQty) * 100, 100);

                    return (
                      <TableRow
                        key={p.id}
                        className="border-b border-dashed border-b-blue-100 hover:bg-gray-50 transition"
                      >
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`${p.product_image}`}
                              className="w-12 h-12 rounded-lg object-cover border p-2 bg-gray-50"
                            />
                            <div>
                              <h3 className="font-bold text-[16px] text-black max-w-[250px] truncate">
                                {p.product_name}
                              </h3>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-700">
                          {p.category_name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-700">
                          {p.business_name}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-700">
                          {p.created_at}
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="w-32">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-2 rounded-full ${percent === 0
                                  ? "bg-red-500"
                                  : percent < 10
                                    ? "bg-red-400"
                                    : percent < 30
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                            <p className="text-xs mt-1 text-gray-600">
                              {p.quantity}{" "}
                              {p.quantity === 0
                                ? t("product_page.quantity_out")
                                : t("product_page.quantity_in")}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="xs"
                              variant=""
                              onClick={() => navigate(`/edit-product/${p.id}`)}
                            >
                              <PencilIcon className="w-4 h-4 text-green-500" />
                              {t("actions.edit")}
                            </Button>

                            <Button
                              size="xs"
                              variant=""
                              onClick={() => {
                                setDeleteId(p.id);
                                setShowDeletePopup(true);
                              }}
                            >
                              <TrashBinIcon className="w-4 h-4 text-red-500" />
                              {t("actions.delete")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={10}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
