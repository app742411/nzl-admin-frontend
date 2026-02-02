"use client";

import React from "react";
import {
  ShoppingCart,
  Globe,
  Zap,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";

const featuresLeft = [
  {
    title: "Smart Shopping",
    desc: "Get the best price instantly with our reverse auction model.",
    icon: ShoppingCart,
  },
  {
    title: "Global Reach",
    desc: "Shop seamlessly across 50+ countries worldwide.",
    icon: Globe,
  },
  {
    title: "Instant Checkout",
    desc: "Fast, secure checkout with minimal steps.",
    icon: Zap,
  },
];

const featuresRight = [
  {
    title: "Personalized Deals",
    desc: "AI-powered offers tailored to your preferences.",
    icon: Sparkles,
  },
  {
    title: "Community Power",
    desc: "Group-buying that unlocks bigger discounts.",
    icon: Users,
  },
  {
    title: "Secure Payments",
    desc: "Enterprise-grade protection for every transaction.",
    icon: ShieldCheck,
  },
];

const ServicesBenefits = () => {
  return (
    <section className="relative overflow-hidden bg-[#000513] pb-20">
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[260px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-24 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-blue-400 backdrop-blur">
            Our Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Discover NZL’s Benefits
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Everything you need to shop smarter, save more, and enjoy a
            next-generation buying experience.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-3">
          {/* LEFT CARDS */}
          <div className="space-y-10">
            {featuresLeft.map((item, index) => (
              <FeatureCard
                key={index}
                {...item}
                align="right"
                delay={index * 100}
              />
            ))}
          </div>

          {/* PHONE WITH GLOW */}
          <div className="relative flex justify-center">
            {/* STRONG PHONE GLOW */}
            <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/25 blur-[160px]" />

            <img
              src="/images/image/Mockup.png"
              alt="App Preview"
              className="w-[260px] animate-float md:w-[320px]"
            />
          </div>

          {/* RIGHT CARDS */}
          <div className="space-y-10">
            {featuresRight.map((item, index) => (
              <FeatureCard key={index} {...item} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesBenefits;

/* FEATURE CARD */
const FeatureCard = ({ title, desc, icon: Icon, align = "left", delay }) => {
  return (
    <div
      className={`
        group relative
        rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        p-6
        transition-all duration-300
        hover:-translate-y-2
        hover:bg-white/15
        ${align === "right" ? "text-right" : "text-left"}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`flex items-center gap-3 flex-row-reverse ${
          align === "right" ? "left" : ""
        }`}
      >
        {/* ICON */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
          <Icon className="h-5 w-5" />
        </div>

        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/60">{desc}</p>

      {/* HOVER GRADIENT */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
