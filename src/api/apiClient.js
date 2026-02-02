import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Allow backend to handle FormData automatically
apiClient.defaults.headers.post["Content-Type"] = undefined;

//  ALWAYS skip Ngrok browser warning page
apiClient.interceptors.request.use((config) => {
  config.headers["ngrok-skip-browser-warning"] = "true"; //  ADD THIS
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🚪 Auto Logout on 401
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const isLoginPage = window.location.pathname.includes("/signin");
//     if (
//       error.response?.status === 401 &&
//       !window.location.pathname.startsWith("/signin")
//     ) {
//       localStorage.clear();
//       sessionStorage.clear();
//       window.location.replace("/signin");
//     }

//     return Promise.reject(error);
//   }
// );
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    const isChangePassword = url.includes("/api/admin/change-password");

    //  DO NOT logout on invalid old password
    if (status === 401 && isChangePassword) {
      return Promise.reject(error);
    }

    // 🔐 Logout for all other 401s
    if (status === 401 && !window.location.pathname.startsWith("/signin")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/signin");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
