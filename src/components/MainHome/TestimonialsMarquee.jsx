"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    text: "NZL makes shopping genuinely exciting. I grabbed deals at almost half the price just by waiting a little. Watching prices drop in real time completely changed how I shop online.",
    name: "Shailesh Pandey",
    role: "Verified Buyer",
    rating: 5,
  },
  {
    text: "Watching prices drop live is honestly addictive. The instant buy option gives flexibility, and the overall experience feels smooth, fast, and rewarding every time.",
    name: "Devraj Singh",
    role: "Power User",
    rating: 5,
  },
  {
    text: "Group buying helped me save more than I expected. Being part of a community where everyone benefits together makes NZL feel different from any other shopping app.",
    name: "Akash Sharma",
    role: "Frequent Shopper",
    rating: 4,
  },
  {
    text: "The option to either buy instantly or wait for a better deal puts complete control in my hands. NZL truly understands how modern shoppers think.",
    name: "Ritika Verma",
    role: "Early Adopter",
    rating: 5,
  },
  {
    text: "The gamified experience is brilliant. Shopping doesn’t feel boring anymore — it feels like a game where you actually win real savings.",
    name: "Aman Gupta",
    role: "Happy Customer",
    rating: 5,
  },
];

const TestimonialsMarquee = () => {
  return (
    <section className="relative overflow-hidden pb-16">
      {/* HEADER */}
      <div className="relative z-10 mb-8 text-center">
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-blue-600">
          Our Testimonials
        </span>

        <h2 className="mt-6 text-4xl font-bold text-dark md:text-5xl">
          Loved by Thousands
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm text-dark/60">
          Join a growing community of happy shoppers saving more every day.
        </p>
      </div>

      {/* FADE EDGES */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#f9f9f9] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#f9f9f9] to-transparent" />

      {/* MARQUEE */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={24}
        loop
        speed={10000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        className="testimonial-marquee relative z-10 px-6"
      >
        {[...testimonials, ...testimonials].map((item, index) => (
          <SwiperSlide key={index} className="!w-[320px] sm:!w-[360px]">
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsMarquee;

/* CARD */
const TestimonialCard = ({ text, name, role, rating }) => {
  return (
    <div className="relative my-2 min-h-[220px] rounded-2xl border border-dark/15 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
      <p className="text-sm leading-relaxed text-dark/80">“{text}”</p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-dark">{name}</p>
          <p className="text-xs text-dark/50">{role}</p>
        </div>

        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
};
