"use client";
import React from "react";

const DownloadAppSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1 text-sm font-medium text-brand-500">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Ready to play the price drop game?
            </div>

            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Download the <br />
              <span className="text-brand-500">NZL App</span>
            </h2>
            <p className="mt-4 w-xl">
              NZL is redefining shopping with real-time price drops, instant
              buying, and gamified experiences — all in one powerful app.
            </p>

            {/* STORE BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="">
                <img
                  src="/images/image/AppStore.png"
                  alt="App Store"
                  className="h-12 cursor-pointer transition-transform hover:scale-105"
                />
              </button>

              <button className="">
                <img
                  src="/images/image/GooglePlay.png"
                  alt="Google Play"
                  className="h-12 cursor-pointer transition-transform hover:scale-105"
                />
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            {/* IMAGE CONTAINER */}
            <div className="relative">
              {/* HAND + PHONE IMAGE */}
              <img
                src="/images/image/handm.png"
                alt="NZL App"
                className="
                  relative
                  z-10
                  w-full
                  translate-y-20
                "
              />

              {/* IMAGE GLOW */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
