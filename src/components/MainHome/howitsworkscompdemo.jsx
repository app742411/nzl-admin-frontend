"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const steps = [
    {
        id: 1,
        title: "Browse Exclusive Deals",
        desc: "Open the NZL app and explore our curated selection of limited-time deals on premium products. Each deal shows the current price, time remaining, and how many items are left.",
    },
    {
        id: 2,
        title: "Watch Prices Drop",
        desc: "See the price decrease every second in real-time. The earlier you buy, the better chance you have at a great price. But wait too long and someone else might grab it first!",
    },
    {
        id: 3,
        title: "Make Your Decision",
        desc: "Choose your perfect moment to buy. You can purchase immediately or wait for the price to drop more. Remember: once it's sold out, the deal is gone forever.",
    },
    {
        id: 4,
        title: "Complete Purchase",
        desc: "Tap \"Buy Now\" when you're ready. Complete payment using your preferred method (card, Apple Pay, etc.). Your order is confirmed instantly.",
    },
    {
        id: 5,
        title: "Receive Your Product",
        desc: "Track your order in the app. We deliver across Saudi Arabia. Your genuine product arrives at your doorstep within days.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const HowItWorksCompDemo = () => {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                {/* Main Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                        How NZL Works
                    </h2>
                </div>

                {/* Top Bar Card */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                    <div className="text-2xl font-black text-blue-600 tracking-tighter">
                        NZL
                    </div>
                    <div className="hidden sm:block text-sm text-gray-400 text-center flex-1 px-4">
                        Simple, exciting, and rewarding. Follow these steps to start saving on your favorite products.
                    </div>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition">
                        Download App
                    </button>
                </motion.div>

                {/* Steps List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-4"
                >
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            {/* Step Card */}
                            <motion.div
                                variants={cardVariants}
                                className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Number Badge */}
                                <div className="flex bg-blue-600 text-white w-14 h-14 rounded-full items-center justify-center text-2xl font-bold flex-shrink-0 shadow-md">
                                    {step.id}
                                </div>

                                {/* Text Content */}
                                <div className="pt-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Connecting Arrow (except after last item) */}
                            {index !== steps.length - 1 && (
                                <motion.div
                                    variants={cardVariants}
                                    className="flex justify-center py-2"
                                >
                                    <FaArrowDown className="text-blue-500 text-xl animate-bounce" />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWorksCompDemo;
