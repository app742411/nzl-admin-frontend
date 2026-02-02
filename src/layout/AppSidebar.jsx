import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  SettingIcon,
} from "../icons";

import { AppWindow, BellIcon } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

export default function AppSidebar() {
  const { t, i18n } = useTranslation();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const { user, permissions } = useSelector((state) => state.auth);
  const isSuperAdmin = user?.role === "superAdmin";

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isRTL = i18n.dir() === "rtl";

  //  PERMISSION CHECKER
  const can = (perm) => isSuperAdmin || !perm || permissions.includes(perm);

  //  MENU CONFIG WITH PERMISSIONS
  const navItems = [
    {
      icon: <GridIcon />,
      name: t("menu.dashboard"),
      path: "/dashboard",
      permission: null,
    },

    {
      name: t("menu.users"),
      icon: <UserCircleIcon />,
      subItems: [
        { name: t("menu.all_users"), path: "/users", permission: "view_users" },
      ],
    },

    {
      name: t("menu.vendor_management"),
      icon: <PageIcon />,
      subItems: [
        {
          name: t("menu.all_vendors"),
          path: "/vendors",
          permission: "manage_vendors",
        },
        {
          name: t("menu.add_vendor"),
          path: "/add-vendor",
          permission: "manage_vendors",
        },
      ],
    },

    {
      icon: <ListIcon />,
      name: t("menu.category_management"),
      path: "/category-management",
      permission: "manage_categories",
    },

    {
      name: t("menu.products"),
      icon: <BoxCubeIcon />,
      subItems: [
        {
          name: t("menu.all_products"),
          path: "/products",
          permission: "view_products",
        },
        {
          name: t("menu.add_product"),
          path: "/add-product",
          permission: "add_products",
        },
        {
          name: t("menu.bulk_product"),
          path: "/bulk-uploads",
          permission: "bulk_product_upload",
        },
      ],
    },

    {
      name: t("menu.auction_management"),
      icon: <ListIcon />,
      subItems: [
        {
          name: t("menu.all_auctions"),
          path: "/auctions",
          permission: "view_auctions",
        },
        {
          name: t("menu.create_auction"),
          path: "/create-auction",
          permission: "manage_auctions",
        },
      ],
    },

    {
      icon: <PageIcon />,
      name: t("menu.orders"),
      path: "/orders",
      permission: "view_orders",
    },

    {
      icon: <PieChartIcon />,
      name: t("menu.reports_analytics"),
      path: "/reports",
      permission: "view_reports",
    },

    {
      name: t("menu.invoices"),
      icon: <TableIcon />,
      subItems: [
        {
          name: t("menu.all_invoices"),
          path: "/invoices",
          permission: "view_invoices",
        },
        {
          name: t("menu.create_invoice_user"),
          path: "/create-invoice-user",
          permission: "create_invoice_user",
        },
        {
          name: t("menu.create_invoice_vendor"),
          path: "/create-invoice-vendor",
          permission: "create_invoice_vendor",
        },
      ],
    },

    {
      icon: <ListIcon />,
      name: t("menu.transactions"),
      path: "/transactions",
      permission: "view_transactions",
    },

    {
      icon: <ListIcon />,
      name: t("menu.coupon"),
      path: "/coupon",
      permission: "manage_coupons",
    },
    {
      icon: <AppWindow />,
      name: t("menu.App_Management"),
      path: "/app-management",
      permission: "manage_app",
    },

    {
      name: t("menu.notifications"),
      icon: <BellIcon />,
      subItems: [
        {
          name: t("menu.notifications"),
          path: "/notifications",
          permission: "send_notifications",
        },
        {
          name: t("menu.add_campaign"),
          path: "/add-campaign",
          permission: "send_notifications",
        },
      ],
    },
  ];

  const othersItems = [
    {
      icon: <UserCircleIcon />,
      name: t("menu.profile"),
      path: "/profile",
      permission: null,
    },

    {
      icon: <SettingIcon />,
      name: t("menu.settings"),
      path: "/settings",
      permission: "system_settings",
    },

    {
      name: t("menu.roles_permissions"),
      icon: <PageIcon />,
      subItems: [
        {
          name: t("menu.roles_permissions"),
          path: "/roles-permissions",
          permission: "manage_roles",
        },
        {
          name: t("menu.add_user_for_roles"),
          path: "/add-user-for-role",
          permission: "manage_roles",
        },
      ],
    },

    // { icon: <PlugInIcon />, name: t("menu.support"), path: "/support", permission: "support_actions" },
    {
      icon: <PlugInIcon />,
      name: t("menu.support"),
      path: "/support",
      permission: "support_actions",
    },
  ];

  //  FILTER MENU BASED ON PERMISSIONS
  const filterMenu = (items) =>
    items
      .map((item) => {
        if (item.subItems) {
          const allowedSubs = item.subItems.filter((sub) =>
            can(sub.permission),
          );
          return allowedSubs.length ? { ...item, subItems: allowedSubs } : null;
        }
        return can(item.permission) ? item : null;
      })
      .filter(Boolean);

  const finalNavItems = filterMenu(navItems);
  const finalOtherItems = filterMenu(othersItems);

  const isActive = useCallback(
    (path) => path && location.pathname === path,
    [location.pathname],
  );

  // ------------------- RENDER MENU ----------------------
  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col">
      {items.map((nav, index) => (
        <li key={`${menuType}-${index}`} className="relative mb-1">
          {nav.subItems ? (
            <>
              {/* Parent Button */}
              <button
                type="button"
                onClick={() =>
                  setOpenSubmenu(
                    openSubmenu?.index === index &&
                      openSubmenu?.type === menuType
                      ? null
                      : { type: menuType, index },
                  )
                }
                className={`menu-item group ${
                  openSubmenu?.index === index && openSubmenu?.type === menuType
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span className="menu-item-icon-size">{nav.icon}</span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}

                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform ${
                      openSubmenu?.index === index &&
                      openSubmenu?.type === menuType
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) =>
                    (subMenuRefs.current[`${menuType}-${index}`] = el)
                  }
                  className="overflow-hidden transition-all"
                  style={{
                    height:
                      openSubmenu?.index === index &&
                      openSubmenu?.type === menuType
                        ? `${
                            subMenuRefs.current[`${menuType}-${index}`]
                              ?.scrollHeight
                          }px`
                        : "0px",
                  }}
                >
                  <ul className={`mt-2 space-y-1 ${isRTL ? "mr-9" : "ml-9"}`}>
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            // Simple menu link
            <Link
              to={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span className="menu-item-icon-size">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  // ------------------- RETURN SIDEBAR -------------------
  return (
    <aside
      className={`fixed top-0 flex flex-col h-screen bg-white border-gray-200 z-50
  transition-all duration-300
  ${isRTL ? "right-0 border-l" : "left-0 border-r"}
  ${
    isMobileOpen
      ? "w-[290px]"
      : isExpanded
        ? "w-[290px]"
        : isHovered
          ? "w-[290px]"
          : "w-[90px]"
  }`}
      onMouseEnter={() => {
        if (!isExpanded && !isMobileOpen) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!isExpanded && !isMobileOpen) {
          setIsHovered(false);
        }
      }}
    >
      <div className="pt-8 pb-10 flex justify-center">
        <Link to="/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/nzl-logo.png" width={120} alt="Logo" />
          ) : (
            <img src="/images/logo/nzl-icon.png" width={36} alt="Logo" />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col overflow-y-auto no-scrollbar px-5">
        <nav className="mb-6">
          <h2 className="mb-4 text-xs uppercase text-gray-400">
            {t("menu.menu")}
          </h2>
          {renderMenuItems(finalNavItems, "main")}

          <h2 className="mt-6 mb-4 text-xs uppercase text-gray-400">
            {t("menu.others")}
          </h2>
          {renderMenuItems(finalOtherItems, "others")}
        </nav>
      </div>
    </aside>
  );
}
