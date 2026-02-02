"use client";
import React from "react";

const TrustNZL = () => {
  return (
    <section className="relative bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* LEFT — STICKY */}
          <div className="lg:sticky lg:top-32 self-start">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Why Thousands <br />
              Trust <span className="text-blue-600">NZL</span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
              We don’t just promise savings — we prove them through real-time
              pricing, transparency, and a shopping experience people come back
              to every day.
            </p>
          </div>

          {/* RIGHT — SCROLL CONTENT */}
          <div className="space-y-20">
            {/* ITEM 1 */}
            <div>
              <div className="text-5xl font-extrabold text-green-500">5.0</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">
                average app rating
              </div>
              <p className="mt-4 max-w-md text-gray-600">
                Our users consistently rate NZL at the top for delivering a fun,
                fair, and rewarding shopping experience.
              </p>
            </div>

            {/* ITEM 2 */}
            <div>
              <div className="text-5xl font-extrabold text-blue-600">35+</div>
              <div className="mt-2 text-lg font-semibold text-gray-900">
                minutes per session
              </div>
              <p className="mt-4 max-w-md text-gray-600">
                Shoppers stay longer, watching prices drop in real time and
                timing their purchases for the best possible deal.
              </p>
            </div>

            {/* ITEM 3 */}
            <div>
              <div className="text-5xl font-extrabold text-purple-600">
                $0.00
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-900">
                everything is free
              </div>
              <p className="mt-4 max-w-md text-gray-600">
                From downloading the app to tracking deals and setting price
                alerts — NZL never charges users to participate.
              </p>
            </div>

            {/* ITEM 4 (optional extra) */}
            <div>
              <div className="text-5xl font-extrabold text-orange-500">
                24/7
              </div>
              <div className="mt-2 text-lg font-semibold text-gray-900">
                live auctions
              </div>
              <p className="mt-4 max-w-md text-gray-600">
                Deals never sleep. Auctions run around the clock so users can
                shop anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustNZL;
