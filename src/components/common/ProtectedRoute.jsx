import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectSocket } from "../../socket";
import { canAccess } from "../../utils/canAccess";

export default function ProtectedRoute({ requiredPermission }) {
  const [authChecked, setAuthChecked] = useState(false);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const { user, permissions } = useSelector((state) => state.auth || {});

  //   Wait for mount before auth check
  useEffect(() => {
    setAuthChecked(true);
  }, []);

  //   Connect socket ONLY once auth is confirmed
  useEffect(() => {
    if (authChecked && token && userId) {
      connectSocket(token, userId);
    }
  }, [authChecked, token, userId]);

  //  Prevent early redirect
  if (!authChecked) return null;

  //  Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  //   Super admin
  if (user?.role === "superAdmin") {
    return <Outlet />;
  }

  //  Permission denied
  if (requiredPermission && !canAccess(user, permissions, requiredPermission)) {
    return <Navigate to="/no-access" replace />;
  }

  return <Outlet />;
}
