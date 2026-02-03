"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Share2, Eye, Gift, Check } from "lucide-react";

const steps = [
    {
        title: "Join the Deal",
        desc: "Reserve your spot with a few taps",
        icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
        title: "Share & Invite",
        desc: "Send to friends and family",
        icon: <Share2 className="h-5 w-5 text-purple-500" />,
    },
    {
        title: "Watch Progress",
        desc: "See real-time buyer count",
        icon: <Eye className="h-5 w-5 text-indigo-500" />,
    },
    {
        title: "Everyone Saves",
        desc: "Discount activated!",
        icon: <Gift className="h-5 w-5 text-pink-500" />,
    },
];

const BuyTogetherDemo = () => {
    return (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute top-0 left-0 -ml-20 -mt-20 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-50" />
            <div className="pointer-events-none absolute bottom-0 right-0 -mr-20 -mb-20 h-96 w-96 rounded-full bg-purple-50 blur-3xl opacity-50" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Text & Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">
                            Buy Together, <span className="text-blue-600">Win Together</span>
                        </h2>
                        <p className="text-lg leading-8 text-gray-600 mb-10">
                            Join forces with other shoppers to unlock exclusive discounts. The
                            more people join, the more everyone saves.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            How Buy Together Works
                        </h3>

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-50">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {step.title}
                                            <span className="hidden sm:inline text-gray-400 font-normal ml-2">
                                                — {step.desc}
                                            </span>
                                        </h4>
                                        <p className="sm:hidden text-sm text-gray-500 mt-1">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Live Demo Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Card Container */}
                        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-2xl p-8">
                            <div className="text-center mb-8">
                                <h4 className="text-lg font-bold text-gray-900">
                                    Live Buy Together
                                </h4>
                                <p className="text-sm text-gray-500">Sony WH-1000XM5 Headphones</p>
                            </div>

                            {/* Avatars */}
                            <div className="flex justify-center -space-x-2 mb-8">
                                {/* Example user images */}
                                {[
                                    "/images/user/user-01.jpg",
                                    "/images/user/user-02.jpg",
                                    "/images/user/user-03.jpg",
                                    "/images/user/user-04.jpg",
                                    "/images/user/user-05.jpg",
                                    "/images/user/user-06.jpg",
                                    "/images/user/user-07.jpg",
                                    "/images/user/user-08.jpg",
                                ].map((img, i) => (
                                    <motion.img
                                        key={i}
                                        src={img}
                                        alt={`User ${i + 1}`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                                        className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                                    />
                                ))}

                                {/* Empty placeholders */}
                                {[...Array(2)].map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="h-10 w-10 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-300 text-xs"
                                    >
                                        ?
                                    </div>
                                ))}
                            </div>


                            {/* Progress Bar */}
                            <div className="mb-2 flex justify-between text-sm font-medium">
                                <span className="text-gray-900">8 of 10 buyers</span>
                                <span className="text-blue-600">Almost there!</span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden mb-8">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "80%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                />
                            </div>

                            {/* Savings Callout */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2 }}
                                className="rounded-xl bg-blue-50 p-6 text-center border border-blue-100"
                            >
                                <p className="text-3xl font-black text-blue-600 mb-1">Save 25%</p>
                                <p className="text-sm text-blue-800 font-medium">when buying together</p>
                            </motion.div>

                        </div>

                        {/* Background Blob behind card */}
                        <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-blue-100 to-white rounded-[2.5rem] blur-xl opacity-70" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BuyTogetherDemo;
