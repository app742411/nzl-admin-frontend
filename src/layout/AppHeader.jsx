"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

// import { searchEverything } from "../api/searchApi";

const AppHeader = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  // Toggle search suggestions
  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const res = await searchEverything(value); // API request
    setResults(res);
    setShowResults(true);
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  // Command + K focus search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {/* LEFT AREA */}
        <div className="flex items-center gap-10 w-full gap-2 px-3 py-3 border-b lg:border-b-0 lg:px-0 lg:py-4">
          {/* Sidebar Button */}
          <button
            className="items-center justify-center w-10 h-10 text-brand-500 rounded-lg lg:flex"
            onClick={handleToggle}
          >
            {isMobileOpen ? "✖" : "☰"}
          </button>

          {/* Mobile Logo */}
          <Link to="/dashboard" className="lg:hidden">
            <img
              className="w-[100px]"
              src="/images/logo/nzl-logo.png"
              alt="Logo"
            />
          </Link>

          {/* Mobile Apps Menu */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 lg:hidden"
          >
            ⋮
          </button>

          {/* SEARCH BAR */}
          <div className="hidden lg:block relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t("common.search_or_type")}
              className="h-11 w-[430px] border rounded-lg px-12"
            />

            {/* Icon */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search size={14} />
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 border rounded">
              ⌘ K
            </span>

            {/* SEARCH RESULTS DROPDOWN */}
            {showResults && (
              <div className="absolute mt-2 w-full bg-white shadow-lg border rounded-lg max-h-80 overflow-auto z-50 p-3">
                <SearchResults results={results} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT AREA */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-end w-full gap-4 px-5 py-4 lg:flex`}
        >
          <LanguageSwitcher />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
