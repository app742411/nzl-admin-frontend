"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const ArsenalSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9FAFB] py-32">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-green-400/20 blur-[180px]" />
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* HEADING */}
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Your Arsenal for{" "}
          <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
            Smarter, Faster, Safer Wins
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          NZL equips you with everything you need to outplay the clock and
          competitors. Here’s how we empower your strategy.
        </p>

        {/* CARDS */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {/* ================= CARD 1 ================= */}
          <div
            className="
            group relative overflow-hidden rounded-3xl
            bg-white/70 backdrop-blur-xl
            border border-white/60
            p-8 shadow-sm
            transition-all duration-300
            hover:-translate-y-2 hover:shadow-2xl
          "
          >
            {/* SHINE OVERLAY */}
            <div
              className="
              pointer-events-none absolute inset-0
              bg-gradient-to-br from-white/60 via-transparent to-transparent
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
            />

            {/* IMAGE WITH BOTTOM FADE */}
            <div className="relative mb-10 h-[320px] overflow-hidden rounded-2xl">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                className="h-full"
              >
                <SwiperSlide>
                  <img
                    src="/images/image/logomockup.png"
                    alt="Checkout Alt"
                    className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/image/loginmockup.png"
                    alt="Checkout"
                    className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    src="/images/image/homemockup.png"
                    alt="Checkout Alt"
                    className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                  />
                </SwiperSlide>
              </Swiper>

              {/* BOTTOM FADE */}
              <div
                className="
                pointer-events-none
                absolute inset-x-0 bottom-0 h-24
                bg-gradient-to-t from-white via-white/80 to-transparent
                z-10
              "
              />
            </div>

            {/* TEXT */}
            <h3 className="text-2xl font-semibold text-gray-900">
              Price Gauge + Probability Meter
            </h3>

            <p className="mt-4 text-gray-600">
              See real-time estimates of your chance to win an item at your
              target price. Data-driven insights help you decide — wait or act
              now?
            </p>
          </div>

          {/* ================= CARD 2 ================= */}
          <div
            className="
            group relative overflow-hidden rounded-3xl
            bg-white/70 backdrop-blur-xl
            border border-white/60
            p-8 shadow-sm
            transition-all duration-300
            hover:-translate-y-2 hover:shadow-2xl
          "
          >
            {/* SHINE OVERLAY */}
            <div
              className="
              pointer-events-none absolute inset-0
              bg-gradient-to-br from-white/60 via-transparent to-transparent
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
            />

            {/* IMAGE WITH BOTTOM FADE */}
            <div className="relative mb-10 h-[320px] overflow-hidden rounded-2xl">
              <div className="relative mb-10 h-[320px] overflow-hidden rounded-2xl">
                <Swiper
                  modules={[EffectFade, Autoplay]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop
                  className="h-full"
                >
                  <SwiperSlide>
                    <img
                      src="/images/image/detailmockup.png"
                      alt="Checkout Alt"
                      className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/images/image/walletmockup.png"
                      alt="Checkout"
                      className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <img
                      src="/images/image/searchbarmockup.png"
                      alt="Checkout Alt"
                      className="absolute left-1/2 top-0 h-[420px] -translate-x-1/2"
                    />
                  </SwiperSlide>
                </Swiper>

                {/* BOTTOM FADE */}
                <div
                  className="
                pointer-events-none
                absolute inset-x-0 bottom-0 h-24
                bg-gradient-to-t from-white via-white/80 to-transparent
                z-10
              "
                />
              </div>

              {/* BOTTOM FADE */}
              <div
                className="
                pointer-events-none z-10
                absolute inset-x-0 bottom-0 h-32
                bg-gradient-to-t from-white via-white/80 to-transparent
              "
              />
            </div>

            {/* TEXT */}
            <h3 className="text-2xl font-semibold text-gray-900">
              Safe Checkout + Community Sharing
            </h3>

            <p className="mt-4 text-gray-600">
              Check out worry-free with encrypted payments, then share deals
              with friends to boost your chances of unlocking group discounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;
