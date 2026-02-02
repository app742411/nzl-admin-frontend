"use client";
import React from "react";

const videos = [
  {
    id: 1,
    thumbnail: "/images/image/videoimage1.webp",
    title: "NZL",
    handle: "@nzlapp",
  },
  {
    id: 2,
    thumbnail: "/images/image/videoimage2.webp",
    title: "NZL",
    handle: "@nzlapp",
  },
  {
    id: 3,
    thumbnail: "/images/image/videoimage5.webp",
    title: "NZL",
    handle: "@nzlapp",
  },
];

const StayConnectedSection = () => {
  return (
    <section className="relative bg-white py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADING */}
        <h2 className="mx-auto mb-20 max-w-3xl text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Stay connected with us for the latest
          <br />
          <span className="text-brand-500">updates and exclusive offers</span>
        </h2>

        {/* VIDEO GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((item) => (
            <div
              key={item.id}
              className="
                group relative overflow-hidden rounded-3xl
                bg-white
                shadow-lg
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
              "
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
                  <span className="text-xs font-bold text-white">N</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.handle}</div>
                </div>
              </div>

              {/* THUMBNAIL */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="
                    flex h-14 w-14 items-center justify-center
                    rounded-full bg-brand-500/90
                    shadow-lg
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                  >
                    <svg
                      className="h-6 w-6 translate-x-[1px] text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayConnectedSection;
