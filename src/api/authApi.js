import apiClient from "./apiClient";

// LOGIN USER
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/api/admin/login", {
      email,
      password,
    });
    const apiResponse = response.data;
    const userData = apiResponse.data;
    if (!userData?.token) {
      throw new Error(apiResponse.message || "Invalid credentials");
    }
    return {
      user: {
        id: userData.id,
        role: userData.role,
        email,
      },
      token: userData.token,
    };
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
      err.message ||
      "Login failed",
    );
  }
};
// SEND FORGOT PASSWORD OTP
export const sendForgotPasswordOTP = async (email) => {
  const res = await apiClient.post("api/admin/forgot-password", {
    email,
  });
  return res.data;
};
// VERIFY OTP
export const verifyOTP = async (id, otp) => {
  const res = await apiClient.post(`api/admin/forgot-verify-otp/${id}`, {
    otp,
  });
  return res.data;
};
// RESET PASSWORD
export const resetPassword = async (token, newPassword, confirmPassword) => {
  const res = await apiClient.post(`api/admin/reset-password/${token}`, {
    newPassword,
    confirmPassword,
  });
  return res.data;
};
// CHANGE PASSWORD AFTER LOGIN USER
export const changePassword = (payload) =>
  apiClient.post("/api/admin/change-password", payload);

// LOGOUT USER
export const logoutUser = async () => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) throw new Error("Token not found");
    const response = await apiClient.post(
      "api/admin/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    const message = err?.response?.data?.message || "Logout failed";
    throw new Error(message);
  }
};
// ADD CATEGORY API
export const addCategory = async (formData) => {
  try {
    const res = await apiClient.post("api/admin/add-category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// GET CATEGORIES
export const getCategories = async (
  page = 1,
  limit = 5,
  search = "",
  sort = "",
) => {
  return await apiClient.get("/api/admin/list-category", {
    params: { page, limit, search, sort },
  });
};
//  EDIT / UPDATE CATEGORY
export const updateCategory = async (id, formData) => {
  const res = await apiClient.put(`api/admin/edit-category/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
//  DELETE CATEGORY
export const deleteCategory = async (id) => {
  const res = await apiClient.delete(`api/admin/delete-category/${id}`);
  return res.data;
};
// GET CATEGORY FOR PRODUCT DROUPDOWN
export const getProductCategories = async () => {
  const res = await apiClient.get("/api/admin/list-category-in-product");
  return res.data;
};
// GET VENDORS FOR PRODUCT DROUPDOWN
export const getVendor = async () => {
  const res = await apiClient.get("/api/admin/list-vendors-for-product");
  return res.data;
};
// ADD PRODUCT
export const addProduct = async (formData) => {
  const res = await apiClient.post("api/admin/add-product", formData);
  return res.data;
};
// PROFILE DETAILS
export const profileDetails = async () => {
  const res = await apiClient.get("/api/admin/profile-detail");
  return res.data;
};
// UPDATE PROFILE
export const updateProfile = async (formData) => {
  const res = await apiClient.put("/api/admin/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
// USER LIST
export const userList = async (page = 1, limit = 5, search = "") => {
  const res = await apiClient.get("/api/admin/list-user", {
    params: { page, limit, search },
  });
  return res.data;
};
// PRODUCT LIST
export const productList = async (
  page = 1,
  limit = 10,
  search = "",
  category = "",
  sort = "",
) => {
  return await apiClient.get("/api/admin/list-product", {
    params: { page, limit, search, category, sort },
  });
};
// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await apiClient.delete(`/api/admin/delete-product/${id}`);
  return res.data;
};
// UPDATE PRODUCT
export const updateProduct = async (id, formData) => {
  const res = await apiClient.put(`/api/admin/edit-product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
// GET SINGLE PRODUCT
export const getSingleProduct = async (id) => {
  const res = await apiClient.get(`/api/admin/get-product/${id}`);
  return res.data;
};
// DELETE IMAGES
export const deleteImages = async (id, imageName) => {
  const res = await apiClient.delete(`/api/admin/delete-image/${id}`, {
    data: { imageName }, // send in body
  });
  return res.data;
};
// PRODUCT LIST IN AUCTION
export const productListAuction = async (auctionType) => {
  const res = await apiClient.get(
    `/api/admin/list-product-in-auction?auctionType=${auctionType}`,
  );
  return res.data;
};
// ADD AUCTION
export const addAuction = async (data) => {
  const res = await apiClient.post("api/admin/add-auction", data);
  return res.data;
};
// ADD COUPON
export const addCoupon = async (data) => {
  const res = await apiClient.post("api/admin/add-coupon", data);
  return res.data;
};
// GET REVERSE AUCTIONS
export const getReverseAuctions = async (
  page = 1,
  limit = 5,
  search = "",
  status = "",
) => {
  const res = await apiClient.get(`/api/admin/list-auction/reverse`, {
    params: { page, limit, search, status },
  });
  return res.data;
};
// GET BUY TOGETHER AUCTIONS
export const getBuyTogetherAuctions = async (
  page = 1,
  limit = 5,
  search = "",
  status = "",
) => {
  const res = await apiClient.get(`/api/admin/list-auction/buyTogether`, {
    params: { page, limit, search, status },
  });
  return res.data;
};
// AUCTION RESCHEDULE API
export const rescheduleAuction = async (id, data) => {
  const res = await apiClient.put(
    `/api/admin/update-auction/${id}/reschedule`,
    data,
  );
  return res.data;
};
// PAUSE AUCTION
export const pauseAuction = async (id) => {
  const res = await apiClient.put(`/api/admin/update-auction/${id}/paused`);
  return res.data;
};
// RESUME AUCTION
export const resumeAuction = async (id) => {
  const res = await apiClient.put(`/api/admin/update-auction/${id}/resume`);
  return res.data;
};
// STOP AUCTION
export const stopAuction = async (id) => {
  const res = await apiClient.put(`/api/admin/update-auction/${id}/stop`);
  return res.data;
};
// EXTEND AUCTION
export const extendAuction = async (id, data) => {
  const res = await apiClient.put(
    `/api/admin/update-auction/${id}/extend`,
    data,
  );
  return res.data;
};
// AUCTION DELETE
export const deleteAuction = async (id) => {
  const res = await apiClient.delete(`/api/admin/delete-auction/${id}`);
  return res.data;
};
// UPLOAD BULK
export const bulkUpload = async (formData) => {
  const res = await apiClient.post("api/admin/update-bulk-csv", formData);
  return res.data;
};
// ADD VENDOR
export const addVendor = async (formData) => {
  try {
    const res = await apiClient.post("api/admin/create-vendor", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// AUCTION DETAILS
export const getAuctionById = async (id) => {
  const res = await apiClient.get(`/api/admin/get-auction-detail/${id}`);
  return res.data;
};
// VENDOR LIST
export const vendorList = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/api/admin/list-vendors?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// DELETE VENDOR
export const deleteVendor = async (vendorId) => {
  const res = await apiClient.delete(`/api/admin/delete-vendor/${vendorId}`);
  return res.data;
};
// CHANGE VENDOR STATUS
export const changeVendorStatus = async (vendorId, status) => {
  const res = await apiClient.put("/api/admin/change-status", {
    vendorId,
    status,
  });
  return res.data;
};
// COUPON LIST
export const couponList = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/api/admin/list-coupon/all?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// COUPON LIST
export const couponListActive = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/api/admin/list-coupon/active?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// COUPON LIST EXPIRED
export const couponListExpired = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/api/admin/list-coupon/expired?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
// DELETE COUPON
export const deleteCoupon = async (id) => {
  const res = await apiClient.delete(`/api/admin/delete-coupon/${id}`);
  return res.data;
};
// CREATE USER
export const createUser = async (userData) => {
  const res = await apiClient.post("/api/admin/create-user", userData);
  return res.data;
};
// GET USER ROLES
export const getRoles = async () => {
  const res = await apiClient.get(`/api/admin/get-roles`);
  return res.data;
};
// GET USER LIST FOR ROLE ASSIGNMENT
export const getUserListForRole = async () => {
  const res = await apiClient.get("/api/admin/get-all-users");
  return res.data;
};
// UPDATE USER ROLE
export const updateUserRole = async (userId, payload) => {
  const res = await apiClient.put(`/api/admin/update-role/${userId}`, payload);
  return res.data;
};
// GET ALL USER WITH ROLES
export const getAllUsersWithRoles = async (page = 1, limit = 5) => {
  try {
    const res = await apiClient.get(
      `/api/admin/get-users-by-role?page=${page}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
//DELETE ROLES
export const deleteRole = async (id) => {
  console.log(" DELETE CLICKED → ID RECEIVED:", id);
  const res = await apiClient.delete(`/api/admin/delete-role/${id}`);
  return res.data;
};
// GET USERLIST FOR ROLE ASSIGNMENT
export const getActivity = async (page = 1, limit = 4) => {
  const res = await apiClient.get(
    `/api/admin/get-activities?page=${page}&limit=${limit}`,
  );
  return res.data;
};
// GET USER DETAILS BY ID
export const getUserDetailsById = (id) => {
  return apiClient.get(
    `/api/admin/get-user-detail/${id}`
  );
};
// EDIT USER ROLE
export const editUserRole = async (userId) => {
  const res = await apiClient.get(`/api/admin/get-user-detail/${userId}`);
  return res.data;
};
// SEARCH EVERYTHING
export const searchEverything = async (query) => {
  const res = await apiClient.get(`/api/search?query=${query}`);
  return res.data; // returns { users, products, categories, auctions, orders }
};
// SUPPORT SECTION LIST
export const getSupportList = async () => {
  const res = await apiClient.get("/api/admin/list-support-ticket");
  return res.data;
};
// UPDATE SUPPORT STATUS
export const updateSupportStatus = async (id, status) => {
  const res = await apiClient.put(`/api/admin/update-support-ticket/${id}`, {
    status,
  });
  return res.data;
};
// GET SINGLE SUPPORT TICKET
export const getSupportTicketById = async (id) => {
  const res = await apiClient.get(
    `/api/admin/get-support-ticket/${id}`
  );
  return res.data;
};
// REPLY TO SUPPORT
export const replySupportTicket = async (id, payload) => {
  const res = await apiClient.post(
    `/api/admin/create-support-ticket-reply/${id}`,
    payload
  );
  return res.data;
};
// GET REPORTS SUMMARY
export const getReportsSummary = () =>
  apiClient.get("/api/admin/reports/summary");
// GET SALES SUMMARY
export const getSalesSummary = (filter) =>
  apiClient.get("/api/admin/reports/sales", { params: filter });

export const getRevenueBreakdown = () =>
  apiClient.get("/api/admin/reports/revenue");

// APP MANAGEMENT BANNER
// GET BANNER AUCTIONS LIST
export const getBannerAuctionList = async ({ search = "", actionId = "" }) => {
  const res = await apiClient.get("/api/admin/get-auction-list", {
    params: {
      search,
      actionId,
    },
  });
  return res.data;
};

// SELECT BANNER (ADD)
export const selectBannerAuctions = async (auctionIds) => {
  const res = await apiClient.post("/api/admin/select-banner-auction", {
    auctionIds,
  });
  return res.data;
};
// GET ALL BANNER AUCTIONS
export const getAllBannerAuctions = async () => {
  const res = await apiClient.get("/api/admin/all-banner-auctions");
  return res.data;
};
// REMOVE BANNER
export const removeBannerAuction = async (bannerId) => {
  const res = await apiClient.patch(
    `/api/admin/remove-banner-auction/${bannerId}`,
  );
  return res.data;
};
// ADD SPLASH SCREEN
export const addSplashScreen = async (formData) => {
  const res = await apiClient.post(
    "/api/admin/add-splash-screen",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
// GET SPLASH SCREENS
export const getSplashScreens = async () => {
  const res = await apiClient.get("/api/admin/get-splash-screens");
  return res.data;
};
// CHANGE SPLASH STATUS
export const changeSplashStatus = async (id, status) => {
  const res = await apiClient.patch(
    `/api/admin/change-splash-status/${id}`,
    { status }
  );
  return res.data;
};
// UPDATE SPLASH SCREEN
export const updateSplash = async (id, formData) => {
  const res = await apiClient.put(
    `/api/admin/update-splash/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
// DELETE SPLASH SCREEN
export const deleteSplash = async (id) => {
  const res = await apiClient.delete(
    `/api/admin/delete-splash-screen/${id}`
  );
  return res.data;
};
// ADD POPUP IMAGE
export const addPopupImage = async (formData) => {
  const res = await apiClient.post(
    "/api/admin/add-popup",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
// GET POPUP LIST
export const getPopups = async () => {
  const res = await apiClient.get("/api/admin/all-popups");
  return res.data;
};
// UPDATE POPUP
export const updatePopupImage = async (id, formData) => {
  const res = await apiClient.put(
    `/api/admin/update-popup/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};
// CHANGE POPUP STATUS
export const changePopupStatus = async (id, status) => {
  const res = await apiClient.patch(
    `/api/admin/change-popup-status/${id}`,
    { status }
  );
  return res.data;
};
// DELETE POPUP
export const deletePopup = async (id) => {
  const res = await apiClient.delete(`/api/admin/remove-popup/${id}`);
  return res.data;
};
// CHANGE CATEGORY STATUS (SHOW / HIDE)
export const changeCategoryStatus = async (status) => {
  const res = await apiClient.patch(
    `/api/admin/change-category-status`,
    { status }
  );
  return res.data;
};

// GET ALL ORDERS


export const getAllOrdersApi = async (params = {}) => {
  try {
    const res = await apiClient.get("/api/admin/getAllOrders", {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("getAllOrdersApi error:", error);
    throw error; // important so UI can react
  }
};

// GET ORDER DETAILS BY ID
export const getOrderById = async (id) => {
  try {
    const res = await apiClient.get(`/api/admin/getOrder/${id}`);
    return res.data;
  } catch (error) {
    console.error("getOrderById error:", error);
    throw error;
  }
};

// GET ALL TRANSACTIONS
export const getAllTransactions = async (params = {}) => {
  try {
    const res = await apiClient.get("/api/admin/getAllTransactions", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("getAllTransactions error:", error);
    throw error;
  }
};

// GET TRANSACTION BY ID
export const getTransactionById = async (id) => {
  try {
    const res = await apiClient.get(`/api/admin/getTransaction/${id}`);
    return res.data;
  } catch (error) {
    console.error("getTransactionById error:", error);
    throw error;
  }
};

// GET ALL INVOICES LIST  
export const getAllInvoicesApi = async (params) => {
  try {
    const res = await apiClient.get("/api/admin/getAllInvoices", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("getAllInvoicesApi error:", error);
    throw error;
  }
};






export const getInvoiceDetails = async (paymentId) => {
  const response = await apiClient.get(
    `/api/admin/getInvoice/${paymentId}`
  );
  return response.data;
};
export const downloadInvoice = async (paymentId) => {
  const response = await apiClient.get(
    `/api/admin/invoice/download/${paymentId}`,
    {
      responseType: "blob", // IMPORTANT for file download
    }
  );
  return response;
};

// GET USERS BY SEGMENT (ACTIVITY)
export const getUsersBySegment = async (params) => {
  try {
    const res = await apiClient.get("/api/admin/getUsersBySegment", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("getUsersBySegment error:", error);
    throw error;
  }
};

