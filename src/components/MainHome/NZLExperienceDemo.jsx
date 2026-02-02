"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FaBolt,
    FaLayerGroup,
    FaUsers,
    FaBell,
    FaShieldAlt,
    FaTruck,
} from "react-icons/fa";

/* FEATURES DATA */
const features = [
    {
        title: "Real-Time Price Drops",
        desc: "Prices decrease every second automatically. No manual refreshing needed — watch the magic happen live.",
        icon: <FaBolt />,
    },
    {
        title: "Limited Quantity",
        desc: "Each deal has limited stock. Once it’s gone, it’s gone — creating real urgency and fair access.",
        icon: <FaLayerGroup />,
    },
    {
        title: "Group Deals",
        desc: "Unlock bigger discounts when more people join. Share with friends and save together.",
        icon: <FaUsers />,
    },
    {
        title: "Instant Notifications",
        desc: "Get alerts when deals go live, when prices drop, or when your target price is reached.",
        icon: <FaBell />,
    },
    {
        title: "100% Genuine Products",
        desc: "All items are authentic and sourced from authorized sellers across Saudi Arabia.",
        icon: <FaShieldAlt />,
    },
    {
        title: "Fast Delivery",
        desc: "Free delivery across Saudi Arabia with real-time order tracking to your doorstep.",
        icon: <FaTruck />,
    },
];

/* ANIMATIONS */
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const NZLExperienceSection = () => {
    return (
        <section className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center mb-16"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        The NZL Experience
                    </h2>
                    <p className="mt-4 text-gray-600">
                        A smarter, faster, and more exciting way to shop online.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white text-xl group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default NZLExperienceSection;
