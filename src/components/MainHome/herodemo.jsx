"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { FaStar, FaMapPin, FaShieldAlt } from "react-icons/fa";


const HeroBannerdemo = () => {
    const { scrollYProgress } = useScroll();

    const heroProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const leftX = useTransform(heroProgress, [0, 1], [0, -200]);
    const rightX = useTransform(heroProgress, [0, 1], [0, 250]);
    const phoneY = useTransform(heroProgress, [0, 1], [0, -80]);

    const overlayY = useTransform(heroProgress, [0, 0.25], [0, -710]);

    return (
        <section className="relative overflow-hidden bg-white max-w-full">
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[160px] animate-pulse" />
            <div className="pointer-events-none absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-[180px] animate-pulse delay-300" />

            {/* Grid background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[110vh] max-w-7xl flex-col items-center px-6 pt-24 text-center">
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-extrabold leading-tight text-dark md:text-7xl"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                        className="inline-block"
                    >
                        Beat the Clock,
                    </motion.span>
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        className="inline-block text-blue-500"
                    >
                        Win the Deal
                    </motion.span>
                </motion.h1>

                {/* Description */}
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/70 md:text-base">
                    Every second saves you money. Watch prices drop in real-time, compete
                    with other shoppers, and grab exclusive deals before they're gone.
                    Welcome to the future of shopping in Saudi Arabia.
                </p>

                {/* CTA */}
                <div className="mt-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mb-3 text-lg font-semibold text-dark"
                    >
                        Download NZL Now
                    </motion.p>
                    <p className="mb-5 text-sm text-dark/70">
                        Grab the price before it's gone
                    </p>
                </div>

                {/* Store buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex flex-col items-center"
                    >

                        <img
                            src="/images/image/AppStore.png"
                            className="h-12"
                            alt="Download on App Store"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex flex-col items-center"
                    >

                        <img
                            src="/images/image/GooglePlay.png"
                            className="h-12"
                            alt="Get it on Google Play"
                        />
                    </motion.div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-dark/70">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <FaStar className="text-yellow-500" />
                        <span>4.8/5 Rating</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <FaMapPin className="text-green-500" />
                        <span>Safe Download</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <FaShieldAlt className="text-blue-500" />
                        <span>Free to Join</span>
                    </motion.div>
                </div>

                {/* Phone section */}
                <div className="sticky top-20 mt-16 flex items-center justify-center">
                    <motion.h1
                        style={{ x: leftX }}
                        className="absolute left-1/2 -translate-x-full text-[18vw] font-black text-brand-500/25 select-none"
                    >
                        N
                    </motion.h1>

                    <motion.h1
                        style={{ x: rightX }}
                        className="absolute right-1/2 translate-x-full text-[18vw] font-black text-brand-500/25 select-none"
                    >
                        ZL
                    </motion.h1>

                    <motion.div style={{ y: phoneY }} className="relative z-20">
                        <div className="relative w-[360px]">
                            <div className="absolute inset-[12px] z-10 overflow-hidden rounded-[32px]">
                                <img
                                    src="/images/image/homepage.png"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    alt="NZL App Homepage"
                                />
                                <motion.img
                                    src="/images/image/logoscreen.png"
                                    style={{ y: overlayY }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    alt="NZL Logo Screen"
                                />
                            </div>

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
};

export default HeroBannerdemo;
