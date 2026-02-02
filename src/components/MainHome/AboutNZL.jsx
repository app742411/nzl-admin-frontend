"use client";
import { GroupAnimation } from "framer-motion";
import React from "react";

const AboutNZL = () => {
  return (
    <section className="relative bg-[#F8FAFC] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP TEXT */}
        <div className="mb-10 max-w-3xl text-center mx-auto">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-blue-600">
            Who we are
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            We are <span className="text-blue-600">NZL</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Redefining shopping with thrill, savings, and real-time deals —
            built for how the world shops today.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid gap-6">
          {/* TOP ROW */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* CARD 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900">
                Reverse Auction Mode
              </h3>
              <p className="mt-4 text-gray-600">
                Watch prices fall in real time — every second counts. Buy smart,
                wait strategically, or act fast before others do.
              </p>

              {/* IMAGE / ICON CLUSTER */}
              <div className="mt-10 flex gap-3">
                <img src="images/image/user.png" alt="" />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mt-10 mb-8 flex gap-3">
                <img src="images/image/icons.png" alt="" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Price Target Alerts
              </h3>
              <p className="mt-4 text-gray-600">
                Set your ideal price and forget it. NZL automatically alerts or
                purchases when your target is reached.
              </p>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900">
                Gamified Strategy
              </h4>
              <p className="mt-3 text-sm text-gray-600">
                Hidden quantities and countdowns — trust instincts, not
                spoilers.
              </p>
              <img src="/images/image/02.png" alt="" className="mt-5" />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <img src="/images/image/01.png" alt="" className="mb-5" />
              <h4 className="text-lg font-semibold text-gray-900">
                Group Purchasing
              </h4>
              <p className="mt-3 text-sm text-gray-600">
                Rally buyers together to unlock exclusive bulk discounts.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900">
                Notify & Track
              </h4>
              <p className="mt-3 text-sm text-gray-600">
                Get alerts when auctions begin or your price is close.
              </p>
              <img src="/images/image/05.png" alt="" className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNZL;
