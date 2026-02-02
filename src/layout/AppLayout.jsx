import React, { useEffect } from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
// @ts-ignore
import AppSidebar from "./AppSidebar";
import { useTranslation } from "react-i18next";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  //   update <html dir="rtl"> dynamically
  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.dir());
  }, [i18n.language]);

  return (
    <div className={`min-h-screen xl:flex ${isRTL ? "flex-row-reverse" : ""}`}>
      {/* Sidebar & Backdrop */}
      <div
        className={`fixed top-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${isRTL ? "right-0" : "left-0"
          }`}
      >
        <AppSidebar />
        <Backdrop />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered
            ? isRTL
              ? "xl:mr-[290px]"
              : "xl:ml-[290px]"
            : isRTL
              ? "xl:mr-[90px]"
              : "xl:ml-[90px]"
          } ${isMobileOpen ? "ml-0 mr-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-[1536px] md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
