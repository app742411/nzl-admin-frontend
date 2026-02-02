// import React, {
//   useState,
//   useMemo,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { useTranslation } from "react-i18next";
// import ComponentCard from "../common/ComponentCard";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Button from "../ui/button/Button";
// import { PencilIcon, TrashBinIcon } from "../../icons";

// import {
//   getCategories,
//   deleteCategory,
//   updateCategory,
// } from "../../api/authApi";

// import toast from "react-hot-toast";
// import EditCategoryModal from "../../pages/Products/EditCategoryModal";
// import DeleteCategoryModal from "../../pages/Products/DeleteCategoryModal";

// const ITEMS_PER_PAGE = 10;

// const CategoryList = forwardRef((props, ref) => {
//   const { t } = useTranslation();

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const baseURL = import.meta.env.VITE_API_URL;

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);

//       const res = await getCategories(
//         currentPage,
//         ITEMS_PER_PAGE,
//         search,
//         sortBy,
//       );

//       setCategories(res.data.data || []);
//       setTotalPages(res.data.totalPages || 1);
//     } catch (error) {
//       toast.error("Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     refreshList: () => fetchCategories(currentPage),
//   }));

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchCategories();
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [search, sortBy, currentPage]);

//   return (
//     <>
//       <div>
//         <ComponentCard>
//           <h3 className="font-bold text-xl py-3">{t("category_list.title")}</h3>

//           {/* Search + Sort */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white">
//             <input
//               type="text"
//               placeholder={t("category_list.search_placeholder")}
//               className="border rounded-lg p-2 w-full md:w-1/2 dark:bg-gray-800 dark:text-white"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />

//             <select
//               className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="">{t("category_list.sort_by")}</option>
//               <option value="name">{t("category_list.sort_name")}</option>
//               <option value="products">
//                 {t("category_list.sort_products")}
//               </option>
//               <option value="recent">{t("category_list.sort_recent")}</option>
//             </select>
//           </div>

//           {/* Table */}
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//             <div className="max-w-full overflow-x-auto">
//               {loading ? (
//                 <div className="text-center p-6 text-gray-500">
//                   {t("category_list.loading")}
//                 </div>
//               ) : (
//                 <Table>
//                   <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] text-center">
//                     <TableRow>
//                       <TableCell
//                         isHeader
//                         className="px-5 py-3 text-center text-theme-xs text-gray-500"
//                       >
//                         {t("category_list.table.id")}
//                       </TableCell>
//                       <TableCell
//                         isHeader
//                         className="px-5 py-3 text-center text-theme-xs text-gray-500"
//                       >
//                         {t("category_list.table.image")}
//                       </TableCell>
//                       <TableCell
//                         isHeader
//                         className="px-5 py-3 text-center text-theme-xs text-gray-500"
//                       >
//                         {t("category_list.table.name")}
//                       </TableCell>
//                       <TableCell
//                         isHeader
//                         className="px-5 py-3 text-center text-theme-xs text-gray-500"
//                       >
//                         {t("category_list.table.total_products")}
//                       </TableCell>
//                       <TableCell
//                         isHeader
//                         className="px-5 py-3 text-center text-theme-xs text-gray-500"
//                       >
//                         {t("category_list.table.action")}
//                       </TableCell>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody className="divide-y divide-dashed divide-gray-200 dark:divide-white/5">
//                     {categories.length > 0 ? (
//                       categories.map((category) => (
//                         <TableRow key={category.id}>
//                           <TableCell className="px-5 py-2 sm:px-6 text-center">
//                             #{category.category_id}
//                           </TableCell>

//                           <TableCell className="px-5 py-2 sm:px-6 text-center">
//                             <div className="w-12 h-12 overflow-hidden rounded-sm border p-2">
//                               <img
//                                 src={category.image}
//                                 alt={category.category_name}
//                                 className="object-cover w-full h-full"
//                               />
//                             </div>
//                           </TableCell>

//                           <TableCell className="px-5 py-2 sm:px-6 text-center">
//                             {category.category_name}
//                           </TableCell>

//                           <TableCell className="px-5 py-2 sm:px-6 text-center">
//                             {category.total_products || 0}
//                           </TableCell>

//                           <TableCell className="px-5 py-2 sm:px-6 text-center">
//                             <div className="flex gap-4 justify-center">
//                               <Button
//                                 size="xs"
//                                 variant=""
//                                 onClick={() => {
//                                   setSelectedCategory(category);
//                                   setEditOpen(true);
//                                 }}
//                               >
//                                 <PencilIcon className="w-4 h-4 text-green-500" />
//                                 {t("actions.edit")}
//                               </Button>

//                               <Button
//                                 size="xs"
//                                 variant=""
//                                 onClick={() => {
//                                   setCategoryToDelete(category);
//                                   setDeleteOpen(true);
//                                 }}
//                               >
//                                 <TrashBinIcon className="w-4 h-4 text-red-500" />
//                                 {t("actions.delete")}
//                               </Button>
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={5} className="text-center py-6">
//                           {t("category_list.no_results")}
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </div>

//           {/* Pagination */}
//           {!loading && (
//             <div className="flex items-center justify-between mt-5">
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <div className="flex gap-3">
//                 <Button
//                   size="sm"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((p) => p - 1)}
//                 >
//                   {t("category_list.pagination_previous")}
//                 </Button>

//                 <Button
//                   size="sm"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage((p) => p + 1)}
//                 >
//                   {t("category_list.pagination_next")}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </ComponentCard>
//       </div>

//       {/* EDIT POPUP */}
//       <EditCategoryModal
//         open={editOpen}
//         onClose={() => setEditOpen(false)}
//         category={selectedCategory}
//         onSave={async (formData) => {
//           try {
//             await updateCategory(selectedCategory.id, formData);
//             toast.success("Category updated");
//             setEditOpen(false);
//             fetchCategories(currentPage);
//           } catch {
//             toast.error("Failed to update category");
//           }
//         }}
//       />

//       {/* DELETE POPUP */}
//       <DeleteCategoryModal
//         open={deleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         onConfirm={async () => {
//           try {
//             await deleteCategory(categoryToDelete.id);
//             toast.success("Category deleted");
//             setDeleteOpen(false);
//             fetchCategories(currentPage);
//           } catch {
//             toast.error("Failed to delete category");
//           }
//         }}
//       />
//     </>
//   );
// });

// export default CategoryList;
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useTranslation } from "react-i18next";
import ComponentCard from "../common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../../icons";

import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../api/authApi";

import toast from "react-hot-toast";
import EditCategoryModal from "../../pages/Products/EditCategoryModal";
import DeleteCategoryModal from "../../pages/Products/DeleteCategoryModal";
import Pagination from "../ui/pagination/Pagination";
import { TableShimmer } from "../common/CommonShimmer";

const ITEMS_PER_PAGE = 10;

const CategoryList = forwardRef((props, ref) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await getCategories(
        currentPage,
        ITEMS_PER_PAGE,
        search,
        sortBy
      );

      setCategories(res.data.data || []);
      setTotalItems(res.data.total || 0);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshList: () => fetchCategories(),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, sortBy, currentPage]);

  return (
    <>
      <div>
        <ComponentCard>
          <h3 className="font-bold text-xl py-3">
            {t("category_list.title")}
          </h3>

          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white">
            <input
              type="text"
              placeholder={t("category_list.search_placeholder")}
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
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">{t("category_list.sort_by")}</option>
              <option value="name">{t("category_list.sort_name")}</option>
              <option value="products">
                {t("category_list.sort_products")}
              </option>
              <option value="recent">
                {t("category_list.sort_recent")}
              </option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              {loading ? (
                <div className="p-5">
                  <TableShimmer rows={5} />
                </div>
              ) : (
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] text-center">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 text-center text-theme-xs text-gray-500">
                        {t("category_list.table.id")}
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 text-center text-theme-xs text-gray-500">
                        {t("category_list.table.image")}
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 text-center text-theme-xs text-gray-500">
                        {t("category_list.table.name")}
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 text-center text-theme-xs text-gray-500">
                        {t("category_list.table.total_products")}
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 text-center text-theme-xs text-gray-500">
                        {t("category_list.table.action")}
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-dashed divide-gray-200 dark:divide-white/5">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="px-5 py-2 sm:px-6 text-center">
                            #{category.category_id}
                          </TableCell>

                          <TableCell className="px-5 py-2 sm:px-6 text-center">
                            <div className="w-12 h-12 overflow-hidden rounded-sm border p-2">
                              <img
                                src={category.image}
                                alt={category.category_name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </TableCell>

                          <TableCell className="px-5 py-2 sm:px-6 text-center">
                            {category.category_name}
                          </TableCell>

                          <TableCell className="px-5 py-2 sm:px-6 text-center">
                            {category.total_products || 0}
                          </TableCell>

                          <TableCell className="px-5 py-2 sm:px-6 text-center">
                            <div className="flex gap-4 justify-center">
                              <Button
                                size="xs"
                                variant=""
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setEditOpen(true);
                                }}
                              >
                                <PencilIcon className="w-4 h-4 text-green-500" />
                                {t("actions.edit")}
                              </Button>

                              <Button
                                size="xs"
                                variant=""
                                onClick={() => {
                                  setCategoryToDelete(category);
                                  setDeleteOpen(true);
                                }}
                              >
                                <TrashBinIcon className="w-4 h-4 text-red-500" />
                                {t("actions.delete")}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          {t("category_list.no_results")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>

          {/* COMMON PAGINATION */}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </ComponentCard>
      </div>

      <EditCategoryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        category={selectedCategory}
        onSave={async (formData) => {
          try {
            await updateCategory(selectedCategory.id, formData);
            toast.success("Category updated");
            setEditOpen(false);
            fetchCategories();
          } catch {
            toast.error("Failed to update category");
          }
        }}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteCategory(categoryToDelete.id);
            toast.success("Category deleted");
            setDeleteOpen(false);
            fetchCategories();
          } catch {
            toast.error("Failed to delete category");
          }
        }}
      />
    </>
  );
});

export default CategoryList;
