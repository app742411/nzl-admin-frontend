import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// AUTH ROUTES
import SignIn from "./pages/AuthPages/SignIn";
import ForgetPassword from "./pages/AuthPages/ForgetPassword";
import OTPVerification from "./pages/AuthPages/OTPVerification";
import UpdatePassword from "./pages/AuthPages/UpdatePassword";
import ChangePassword from "./pages/AuthPages/ChangePassword";

// OTHER ROUTES
import NotFound from "./pages/OtherPage/NotFound";
import NoAccess from "./pages/NoAccess";

// LAYOUTS
import AppLayout from "./layout/AppLayout";
import PublicLayout from "./layout/PublicLayout";

// DASHBOARD
import Home from "./pages/Dashboard/Home";
import MainHome from "./pages/MainHome/MainHome";
import UserProfiles from "./pages/UserProfiles";

// PRODUCTS
import AddProduct from "./pages/Products/AddProduct";
import AddProductForm from "./components/ProductComponents/AddProductForm";
import ProductList from "./pages/Products/ProductList";
import CategoryManage from "./pages/Products/CategoryMange";
import BulkUploads from "./pages/Products/BulkUploads";

// AUCTION
import CreateAuction from "./pages/AuctionMangement/CreateAuction";
import AuctionList from "./pages/AuctionMangement/AuctionList";
import AuctionDetails from "./pages/AuctionMangement/AuctionDetails";

// VENDORS
import VendorList from "./pages/Vendors/VendorList";
import AddVendor from "./pages/Vendors/AddVendor";
import VendorInfoPage from "./pages/Vendors/VendorInfoPage";

// USERS
import UserList from "./pages/Users/UserList";
import OrderList from "./pages/Order_management/OrderList";
import OrdersDetails from "./pages/Order_management/OrdersDetails";
import ViewDetails from "./pages/Users/UserDetails";
import ActivityUser from "./pages/Users/ActivityUser";

// COUPON
import Coupon from "./pages/CouponManagement/Coupon";

// NOTIFICATIONS
import Notifications from "./pages/Notifications/Notifications";
import AddNotifications from "./pages/Notifications/AddNotifications";

// ROLES
import RolesManagement from "./pages/RolesManagement/RolesManagement";
import AddUserRoles from "./pages/RolesManagement/AddUserRoles";

// SETTINGS
import Settings from "./pages/settings/Settings";

// SUPPORT
import SupportList from "./pages/supportManagement/SupportList";
import SupportChatBox from "./pages/supportManagement/SupportChartbox";

// TRANSACTION
import TransactionList from "./pages/TransactionManagement/TransactionList";
import TransactionDetail from "./pages/TransactionManagement/TransactionDetail";

// REPORTS
import ReportsPage from "./pages/Reports/ReportsPage";

// INVOICE
import InvoiceList from "./pages/InvoiceManagement/InvoiceList";
import InvoiceDetails from "./pages/InvoiceManagement/InvoiceDetails";

// APP MANAGEMENT
import AppManage from "./pages/AppManagement/AppManage";

// PROTECTED ROUTES
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import GlobalLoader from "./components/common/GlobalLoader";
import TermsConditions from "./pages/OtherPage/TermsConditions";

export default function App() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {/* <GlobalLoader show={isLoading} /> */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ================= PROTECTED ROUTES ================= */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* DASHBOARD */}
              <Route path="/dashboard" element={<Home />} />

              {/* PROFILE */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/change-password" element={<ChangePassword />} />

              {/* PRODUCTS */}
              <Route
                path="/add-product"
                element={<ProtectedRoute requiredPermission="edit_products" />}
              >
                <Route index element={<AddProduct />} /> </Route>

              <Route
                path="/edit-product/:id"
                element={<ProtectedRoute requiredPermission="edit_products" />}
              >
                <Route index element={<AddProductForm />} />
              </Route>

              <Route path="/products" element={<ProductList />} />

              <Route
                path="/category-management"
                element={<ProtectedRoute requiredPermission="manage_categories" />}
              >
                <Route index element={<CategoryManage />} />
              </Route>

              <Route path="/bulk-uploads" element={<BulkUploads />} />

              {/* VENDORS */}
              <Route
                path="/vendors"
                element={<ProtectedRoute requiredPermission="manage_vendors" />}
              >
                <Route index element={<VendorList />} />
              </Route>
              <Route path="/vendors/:id" element={<VendorInfoPage />} />


              <Route
                path="/add-vendor"
                element={<ProtectedRoute requiredPermission="manage_vendors" />}
              >
                <Route index element={<AddVendor />} />
              </Route>

              {/* USERS */}
              <Route
                path="/users"
                element={<ProtectedRoute requiredPermission="view_users" />}
              >
                <Route index element={<UserList />} />
              </Route>

              <Route
                path="/users/:id"
                element={<ProtectedRoute requiredPermission="view_users" />}
              >
                <Route index element={<ViewDetails />} />
              </Route>

              <Route
                path="/activity-users"
                element={<ProtectedRoute requiredPermission="view_users" />}
              >
                <Route index element={<ActivityUser />} />
              </Route>

              {/* AUCTIONS */}
              <Route
                path="/create-auction"
                element={<ProtectedRoute requiredPermission="manage_auctions" />}
              >
                <Route index element={<CreateAuction />} />
              </Route>

              <Route path="/auctions" element={<AuctionList />} />
              <Route
                path="/auction-details/:id"
                element={<AuctionDetails />}
              />

              {/* TRANSACTIONS */}
              <Route
                element={
                  <ProtectedRoute requiredPermission="view_transactions" />
                }
              >
                <Route path="/transactions" element={<TransactionList />} />
                <Route
                  path="/transactions/:id"
                  element={<TransactionDetail />}
                />
              </Route>

              {/* INVOICES */}
              <Route
                element={
                  <ProtectedRoute requiredPermission="view_invoices" />
                }
              >
                <Route path="/invoices" element={<InvoiceList />} /></Route>

              <Route path="/invoices-details/:paymentId" element={<InvoiceDetails />} />

              {/* SETTINGS */}
              <Route path="/settings" element={<Settings />} />

              {/* SUPPORT */}
              <Route
                element={
                  <ProtectedRoute requiredPermission="support_actions" />
                }
              >
                <Route path="/support" element={<SupportList />} />
                <Route path="/support/:id" element={<SupportChatBox />} />
              </Route>

              {/* ORDERS */}
              <Route
                path="/orders"
                element={<ProtectedRoute requiredPermission="view_finance" />}
              >
                <Route index element={<OrderList />} />
              </Route>
              <Route
                path="/order-details/:id"
                element={<OrdersDetails />}
              />

              {/* COUPONS */}
              <Route
                path="/coupon"
                element={<ProtectedRoute requiredPermission="manage_coupons" />}
              >
                <Route index element={<Coupon />} />
              </Route>

              {/* APP MANAGEMENT */}
              <Route
                path="/app-management"
                element={<ProtectedRoute requiredPermission="manage_app" />}
              >
                <Route index element={<AppManage />} />
              </Route>

              {/* REPORTS */}
              <Route path="/reports" element={<ReportsPage />} />

              {/* NOTIFICATIONS */}
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute requiredPermission="send_notifications" />
                }
              >
                <Route index element={<Notifications />} />
              </Route>

              <Route
                path="/add-campaign"
                element={
                  <ProtectedRoute requiredPermission="send_notifications" />
                }
              >
                <Route index element={<AddNotifications />} />
              </Route>

              {/* ROLES */}
              <Route
                path="/roles-permissions"
                element={<ProtectedRoute requiredPermission="manage_roles" />}
              >
                <Route index element={<RolesManagement />} />
              </Route>

              <Route
                path="/add-user-for-role"
                element={<ProtectedRoute requiredPermission="manage_roles" />}
              >
                <Route index element={<AddUserRoles />} />
              </Route>

              <Route path="/no-access" element={<NoAccess />} />
            </Route>
          </Route>

          {/* ================= AUTH & PUBLIC ================= */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-OTP" element={<OTPVerification />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route element={<PublicLayout />}>
            <Route index element={<MainHome />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
