"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FaTimesCircle,
    FaCheckCircle,
    FaBolt,
    FaClock,
    FaUsers,
} from "react-icons/fa";

const traditionalFeatures = [
    "Fixed prices",
    "No urgency to buy",
    "Same deals for everyone",
    "Endless browsing",
    "Miss best prices",
];

const nzlFeatures = [
    { text: "Prices drop every second", icon: <FaBolt /> },
    { text: "Limited-time deals", icon: <FaClock /> },
    { text: "Exclusive group savings", icon: <FaUsers /> },
    { text: "Quick decisions", icon: <FaBolt /> },
    { text: "Best prices guaranteed", icon: <FaCheckCircle /> },
];

const ShoppingComparisonDemo = () => {
    return (
        <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Every Second Saves You Money
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="mt-4 text-lg leading-8 text-gray-600"
                    >
                        Traditional shopping stays still. NZL moves fast — prices drop in
                        real-time so you never miss the best deal.
                    </motion.p>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Traditional */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl bg-white p-10 shadow-md ring-1 ring-gray-900/5"
                    >
                        <h3 className="mb-8 flex items-center justify-center gap-3 text-xl font-semibold text-gray-900">
                            <FaTimesCircle className="text-red-500 text-2xl" />
                            Traditional Shopping
                        </h3>

                        <ul className="space-y-4">
                            {traditionalFeatures.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 text-gray-600"
                                >
                                    <FaTimesCircle className="text-red-400 text-lg flex-none" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 rounded-b-3xl bg-gradient-to-t from-red-50" />
                    </motion.div>

                    {/* NZL */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl bg-gray-900 p-10 shadow-2xl ring-1 ring-gray-900/10 lg:-translate-y-4 hover:-translate-y-6 transition-transform duration-300"
                    >
                        {/* Winner badge */}
                        <div className="absolute -top-4 -right-4 rotate-12 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-black shadow-lg">
                            WINNER
                        </div>

                        <h3 className="mb-8 flex items-center justify-center gap-3 text-xl font-semibold text-white">
                            <FaCheckCircle className="text-green-400 text-2xl" />
                            Shopping with NZL
                        </h3>

                        <ul className="space-y-4">
                            {nzlFeatures.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 text-gray-300"
                                >
                                    <span className="text-green-400 text-lg flex-none">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium text-white">
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Glow */}
                        <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-25 blur-xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingComparisonDemo;
