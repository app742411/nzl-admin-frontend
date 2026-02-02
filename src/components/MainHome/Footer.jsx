"use client";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white pt-20 pb-10 border-t border-gray-200">
      {/* 🔵 TOP GRADIENT BLOBS */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-[180px] animate-pulse delay-300" />

      {/* GRID EFFECT */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* TOP FOOTER */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div>
            <img
              src="/images/logo/nzl-logo.png"
              alt="NZL Logo"
              className="h-16"
            />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
              NZL is redefining shopping with real-time price drops, instant
              buying, and gamified experiences — all in one powerful app.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Company</h4>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-gray-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Support</h4>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/faq" className="hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-gray-900">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* APP DOWNLOAD */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Get the App</h4>

            <p className="mt-4 text-sm text-gray-600">
              Download NZL and start shopping smarter today.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <img
                src="/images/image/AppStore.png"
                alt="App Store"
                className="h-10 cursor-pointer transition-transform hover:scale-105"
              />
              <img
                src="/images/image/GooglePlay.png"
                alt="Google Play"
                className="h-10 cursor-pointer transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gray-200" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} NZL. All rights reserved.</p>
          <p>Designed for a smarter way to shop.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
