// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import React from "react";

// const HeroBanner = () => {
//   /*  BODY SCROLL */
//   const { scrollYProgress } = useScroll();

//   /*  LIMIT ANIMATION TO HERO RANGE (FIRST 30% SCROLL) */
// const heroProgress = useTransform(
//   scrollYProgress,
//   [0, 0.1], // ← start immediately, smooth, not rushed
//   [0, 1]
// );

//  const leftX = useTransform(heroProgress, [0, 1], [0, -120]);
// const rightX = useTransform(heroProgress, [0, 1], [0, 120]);
// const phoneY = useTransform(heroProgress, [0, 1], [0, -80]);
// // Logo disappears VERY fast (first ~6% scroll)
// const overlayY = useTransform(
//   heroProgress,
//   [0, 0.25],   // ← finishes early
//   [0, -710]
// );

//   return (
//     <section className="relative overflow-hidden bg-white">

//       {/* 🔵 TOP GRADIENT BLOBS */}
//       <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[160px] animate-pulse" />
//       <div className="pointer-events-none absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-[180px] animate-pulse delay-300" />

//       {/* GRID EFFECT */}
//       <div className="pointer-events-none absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
//       </div>

//       {/* HERO CONTENT */}
//       <div className="relative z-10 mx-auto flex min-h-[140vh] max-w-7xl flex-col items-center px-6 pt-28 text-center">

//         {/* TEXT */}
//         <h1 className="text-4xl font-extrabold leading-tight text-dark md:text-6xl">
//           Shop Like an{" "}
//           <span className="text-blue-500">Auction</span>
//           <br />
//           Save Like Never Before
//         </h1>

//         <p className="mt-6 max-w-xl text-sm leading-relaxed text-dark/70 md:text-base">
//           Experience real-time auctions, instant buying, and gamified
//           shopping — all in one powerful app.
//         </p>

//         {/* STORE BUTTONS */}
//         <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
//           <img src="/images/image/AppStore.png" className="h-12" />
//           <img src="/images/image/GooglePlay.png" className="h-12" />
//         </div>

//         {/* SCROLL PHONE */}
//         <div className="sticky top-24 mt-24 flex items-center justify-center">

//           {/* BIG BACK TEXT */}
//           <motion.h1
//             style={{ x: leftX }}
//             className="absolute left-1/2 -translate-x-full
//               text-[18vw] font-black text-brand-500/25 select-none"
//           >
//             NZ
//           </motion.h1>

//           <motion.h1
//             style={{ x: rightX }}
//             className="absolute right-1/2 translate-x-full
//               text-[18vw] font-black text-brand-500/25 select-none"
//           >
//             L
//           </motion.h1>

//           {/* PHONE */}
//           <motion.div style={{ y: phoneY }} className="relative z-20">
//             <div className="relative w-[360px]">

//               {/* SCREEN MASK */}
//               <div className="absolute inset-[12px] z-10 overflow-hidden rounded-[32px]">

//                 {/* HOME SCREEN */}
//                 <img
//                   src="/images/image/homepage.png"
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />

//                 {/* LOGO SPLASH */}
//                 <motion.img
//                   src="/images/image/logoscreen.png"
//                   style={{ y: overlayY }}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </div>

//               {/* FRAME */}
//               <img
//                 src="/images/image/frame.png"
//                 className="relative z-30 w-full"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;





//second version
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const HeroBanner = () => {
  const { scrollYProgress } = useScroll();

  const heroProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const leftX = useTransform(heroProgress, [0, 1], [0, -200]);
  const rightX = useTransform(heroProgress, [0, 1], [0, 250]);
  const phoneY = useTransform(heroProgress, [0, 1], [0, -80]);

  const overlayY = useTransform(heroProgress, [0, 0.25], [0, -710]);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-[180px] animate-pulse delay-300" />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[140vh] max-w-7xl flex-col items-center px-6 pt-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-4xl font-extrabold leading-tight text-dark md:text-6xl"
        >
          Shop Like an{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="text-blue-500 inline-block"
          >
            Auction
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            Save Like Never Before
          </motion.span>
        </motion.h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-dark/70 md:text-base">
          Experience real-time auctions, instant buying, and gamified shopping —
          all in one powerful app.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <img src="/images/image/AppStore.png" className="h-12" />
          <img src="/images/image/GooglePlay.png" className="h-12" />
        </div>

        <div className="sticky top-24 mt-24 flex items-center justify-center">
          <motion.h1
            style={{ x: leftX }}
            className="absolute left-1/2 -translate-x-full
              text-[18vw] font-black text-brand-500/25 select-none"
          >
            N
          </motion.h1>

          <motion.h1
            style={{ x: rightX }}
            className="absolute right-1/2 translate-x-full
              text-[18vw] font-black text-brand-500/25 select-none"
          >
            ZL
          </motion.h1>

          {/* PHONE */}
          <motion.div style={{ y: phoneY }} className="relative z-20">
            <div className="relative w-[360px]">
              {/* SCREEN MASK */}
              <div className="absolute inset-[12px] z-10 overflow-hidden rounded-[32px]">
                <img
                  src="/images/image/homepage.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <motion.img
                  src="/images/image/logoscreen.png"
                  style={{ y: overlayY }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <img
                src="/images/image/frame.png"
                className="relative z-30 w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
