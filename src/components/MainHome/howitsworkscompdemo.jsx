// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { FaArrowDown } from "react-icons/fa";

// const steps = [
//     {
//         id: 1,
//         title: "Browse Exclusive Deals",
//         desc: "Open the NZL app and explore our curated selection of limited-time deals on premium products. Each deal shows the current price, time remaining, and how many items are left.",
//     },
//     {
//         id: 2,
//         title: "Watch Prices Drop",
//         desc: "See the price decrease every second in real-time. The earlier you buy, the better chance you have at a great price. But wait too long and someone else might grab it first!",
//     },
//     {
//         id: 3,
//         title: "Make Your Decision",
//         desc: "Choose your perfect moment to buy. You can purchase immediately or wait for the price to drop more. Remember: once it's sold out, the deal is gone forever.",
//     },
//     {
//         id: 4,
//         title: "Complete Purchase",
//         desc: "Tap \"Buy Now\" when you're ready. Complete payment using your preferred method (card, Apple Pay, etc.). Your order is confirmed instantly.",
//     },
//     {
//         id: 5,
//         title: "Receive Your Product",
//         desc: "Track your order in the app. We deliver across Saudi Arabia. Your genuine product arrives at your doorstep within days.",
//     },
// ];

// const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.2,
//         },
//     },
// };

// const cardVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//         opacity: 1,
//         x: 0,
//         transition: { duration: 0.6, ease: "easeOut" },
//     },
// };

// const HowItWorksCompDemo = () => {
//     return (
//         <section className="bg-gray-50 py-20 sm:py-28">
//             <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

//                 {/* Main Header */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-4xl font-extrabold text-gray-900">
//                         How NZL Works
//                     </h2>
//                     <p className="mt-4 text-gray-500 text-lg">
//                         Simple, exciting, and rewarding. Follow these steps to start saving on your favorite products.
//                     </p>
//                 </div>

//                 {/* Download CTA */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}

//                 >
//                     {/* <div className="text-3xl font-black text-blue-600 tracking-tighter">
//                         NZL
//                     </div>
//                     <button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition">
//                         Download App
//                     </button> */}
//                 </motion.div>

//                 {/* Timeline Steps */}
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                     className="relative border-l-2 border-gray-200 ml-6"
//                 >
//                     {steps.map((step, index) => (
//                         <React.Fragment key={step.id}>
//                             <motion.div
//                                 variants={cardVariants}
//                                 className="mb-12 ml-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
//                             >
//                                 {/* Step Badge */}
//                                 <div className="flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
//                                     {step.id}
//                                 </div>

//                                 {/* Step Content */}
//                                 <div className="pt-1">
//                                     <h3 className="text-xl font-bold text-gray-900 mb-1">
//                                         {step.title}
//                                     </h3>
//                                     <p className="text-gray-600 text-sm md:text-base leading-relaxed">
//                                         {step.desc}
//                                     </p>
//                                 </div>
//                             </motion.div>

//                             {/* Connecting Arrow */}
//                             {index !== steps.length - 1 && (
//                                 <motion.div
//                                     variants={cardVariants}
//                                     className="absolute left-0 top-14 flex justify-center w-6"
//                                 >
//                                     <FaArrowDown className="text-blue-500 text-xl animate-bounce" />
//                                 </motion.div>
//                             )}
//                         </React.Fragment>
//                     ))}
//                 </motion.div>

//             </div>
//         </section>
//     );
// };

// export default HowItWorksCompDemo;
"use client";

import React from "react";
import { motion } from "framer-motion";

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
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1.2, ease: "easeOut" },
    },
};

const HowItWorksCompDemo = () => {
    return (
        <section className="bg-gray-50 py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        How NZL Works
                    </h2>
                    <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
                        Simple, exciting, and rewarding. Follow these steps to start saving on your favorite products.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <motion.div
                        variants={lineVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 to-indigo-500 origin-top hidden md:block"
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-20"
                    >
                        {steps.map((step, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={step.id}
                                    variants={itemVariants}
                                    className={`relative flex flex-col md:flex-row items-center ${isLeft ? "md:justify-start" : "md:justify-end"
                                        }`}
                                >
                                    {/* Card */}
                                    <div
                                        className={`w-full md:w-[45%] bg-white rounded-2xl p-8 shadow-xl ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                                            }`}
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Step Number */}
                                    <div className="absolute md:left-1/2 md:-translate-x-1/2 -top-6 md:top-1/2 md:-translate-y-1/2">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                                            {step.id}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorksCompDemo;
