"use client";

import React from "react";

const ClientMarquee = () => {
  const brands = [
    "/images/image/c1.png",
    "/images/image/c2.png",
    "/images/image/c3.png",
    "/images/image/c4.png",
  ];

  return (
    <>
      {/* TRUSTED BY STRIP */}
      <div className="relative border-t border-white/10 pt-10 pb-6">
        <p className="mb-6 text-center text-xs uppercase tracking-widest text-dark/70">
          Trusted by leading brands
        </p>

        <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
          {brands.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Brand Logo"
              className="
                h-16
                object-contain
                invert
                transition-all duration-300
                hover:opacity-100
                hover:grayscale-0
                hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]
              
              "
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientMarquee;
