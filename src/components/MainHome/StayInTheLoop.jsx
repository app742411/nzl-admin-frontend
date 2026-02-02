"use client";
import React from "react";

const StayInTheLoop = () => {
  return (
    <section className="relative   pb-8">
      <div className="relative z-10 mx-auto max-w-7xl px-6 -mt-30">
        {/* CARD */}
        <div
          className="
    relative mx-auto max-w-4xl
    overflow-hidden
    rounded-3xl
    bg-white/80 backdrop-blur-xl
    border border-gray-200
    px-8 py-12 md:px-12
    shadow-sm
  "
        >
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="../../../public/video/videoOne.mp4" type="video/mp4" />
            </video>

            {/* Optional overlay for readability */}
            <div className="absolute inset-0 bg-black/0" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Stay in the Loop
            </h2>

            <p className="mt-3 max-w-xl text-gray-600">
              Get the latest on new product drops, price changes, and insider
              tips—straight to your inbox.
            </p>

            {/* INPUT */}
            <div className="mt-8 flex items-center gap-3">
              <input
                type="tel"
                placeholder="Your WhatsApp Number"
                className="
          w-full rounded-full
          bg-white
          px-6 py-4
          text-gray-900 placeholder-gray-500
          outline-none
          ring-1 ring-gray-200
          focus:ring-2 focus:ring-brand-500
        "
              />

              <button
                className="
          flex h-14 w-14 flex-shrink-0 items-center justify-center
          rounded-full
          bg-brand-500
          text-white
          transition-all duration-300
          hover:scale-105 hover:shadow-lg
        "
                aria-label="Submit"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayInTheLoop;
