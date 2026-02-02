"use client";

import React from "react";
import { Search, TrendingDown, Zap, Users, PartyPopper } from "lucide-react";

const steps = [
  {
    title: "Discover Deals",
    desc: "Browse exciting products and live auctions instantly.",
    image: "/images/image/01.png",
  },
  {
    title: "Watch Price Drop",
    desc: "Prices fall in real time — patience pays off.",
    image: "/images/image/02.png",
  },
  {
    title: "Buy or Wait",
    desc: "Purchase instantly or wait for a better deal.",
    image: "/images/image/03.png",
  },
  {
    title: "Group Power Deals",
    desc: "Join others to unlock even bigger discounts.",
    image: "/images/image/04.png",
  },
  {
    title: "Celebrate Your Win",
    desc: "Enjoy savings and the thrill of winning.",
    image: "/images/image/05.png",
  },
];

const HowNZLWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#000513] py-28">
      {/* GRID BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#000513_85%)]" />
      </div>

      {/* SOFT TOP GLOW */}
      <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-blue-400 backdrop-blur">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            How <span className="text-blue-500">NZL</span> Works
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
            Shopping made simple, thrilling, and rewarding — every step of the
            way.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowNZLWorks;

/* STEP CARD */
const StepCard = ({ title, desc, image, index }) => {
  return (
    <div
      className="
        group relative
        rounded-2xl
        border border-white/15
        bg-white/5 backdrop-blur-xl
        p-6 text-center
        transition-all duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
      "
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* ICON */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
        <img src={image} alt={title} className="h-8 w-8 object-contain" />
      </div>

      {/* TITLE */}
      <h4 className="text-sm font-semibold text-white">{title}</h4>

      {/* DESCRIPTION */}
      <p className="mt-2 text-xs leading-relaxed text-white/60">{desc}</p>

      {/* HOVER GLOW */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
