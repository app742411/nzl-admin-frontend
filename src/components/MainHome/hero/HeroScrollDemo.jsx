"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroScrollDemo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // BIG TEXT
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // PHONE + OVERLAY
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayY = useTransform(scrollYProgress, [0, 0.6], [0, -520]);

  return (
    <section ref={ref} className="relative h-[130vh]">
      <div className="sticky top-32">
        <div className="relative flex items-center justify-center">
          {/* BIG TEXT */}
          <motion.h1
            style={{ x: leftX }}
            className="absolute left-1/2 -translate-x-full
            text-[18vw] font-black text-brand-500/20"
          >
            NZ
          </motion.h1>

          <motion.h1
            style={{ x: rightX }}
            className="absolute right-1/2 translate-x-full
            text-[18vw] font-black text-brand-500/20"
          >
            L
          </motion.h1>

          {/* PHONE */}
          <motion.div style={{ y: phoneY }} className="relative z-20">
            {/* PHONE WRAPPER */}
            <div className="relative w-[360px]">
              {/* 🔒 SCREEN MASK (THIS FIXES EVERYTHING) */}
              <div
                className="
                absolute inset-[12px]
                z-10
                overflow-hidden
                rounded-[32px]
              "
              >
                {/* HOME SCREEN */}
                <img
                  src="/images/image/homepage.png"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Home Screen"
                />

                {/* LOGO SPLASH */}
                <motion.img
                  src="/images/image/logoscreen.png"
                  style={{ y: overlayY }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Logo Splash"
                />
              </div>

              {/* FRAME — ALWAYS ON TOP */}
              <img
                src="/images/image/frame.png"
                className="relative z-30 w-full"
                alt="Phone Frame"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
