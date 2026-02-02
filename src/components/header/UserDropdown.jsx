import { useState, useEffect } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { disconnectSocket } from "../../socket";

import { profileDetails, logoutUser } from "../../api/authApi";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileDetails();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to fetch user info");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.clear();
      sessionStorage.clear();

      try {
        disconnectSocket();
      } catch (e) {
        console.error("Socket disconnect failed", e);
      }

      navigate("/", { replace: true });

      toast.success("Signed out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err.message || "Logout failed");
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center text-gray-700 dark:text-gray-400 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span className="overflow-hidden rounded-full h-11 w-11">
          <img
            src={
              user?.profile_img
                ? `${import.meta.env.VITE_API_URL}/uploads/admin/${user.profile_img}`
                : "/images/user/owner.jpg"
            }
            alt={user?.first_name || "Admin"}
            className="object-cover w-full h-full"
          />
        </span>

        <span
          className={`block mx-2 font-medium text-theme-sm ${
            isRTL ? "order-3" : ""
          }`}
        >
          {user?.first_name
            ? `${user.first_name} ${user.last_name || ""}`
            : t("user_dropdown.loading")}
        </span>

        <svg
          className={`stroke-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${isRTL ? "order-1" : ""}`}
          width="18"
          height="20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className={`absolute mt-[17px] flex w-[260px] flex-col rounded-2xl border bg-white p-3 shadow-theme-lg ${
          isRTL ? "left-0" : "right-0"
        }`}
      >
        {/* User Info */}
        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <span className="block font-medium text-gray-700">
            {user?.first_name
              ? `${user.first_name} ${user.last_name || ""}`
              : ""}
          </span>
          <span className="mt-0.5 block text-gray-500 text-sm">
            {user?.email}
          </span>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b">
          <li>
            <DropdownItem
              className={`${isRTL ? "text-right" : "text-left"}`}
              onItemClick={() => {
                closeDropdown();
                navigate("/profile");
              }}
            >
              {t("user_dropdown.edit_profile")}
            </DropdownItem>
          </li>

          <li>
            <DropdownItem tag="a" to="/settings" onItemClick={closeDropdown}>
              {t("user_dropdown.account_settings")}
            </DropdownItem>
          </li>

          <li>
            <DropdownItem tag="a" to="/support" onItemClick={closeDropdown}>
              {t("user_dropdown.support")}
            </DropdownItem>
          </li>
        </ul>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg hover:bg-gray-100"
        >
          {t("user_dropdown.sign_out")}
        </button>
      </Dropdown>
    </div>
  );
}
