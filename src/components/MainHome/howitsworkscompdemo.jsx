// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Search, TrendingDown, Zap, Users, PartyPopper } from "lucide-react";

// const steps = [
//     {
//         title: "Discover Deals",
//         desc: "Browse exciting products and live auctions instantly.",
//         image: "/images/image/01.png",
//         icon: Search,
//         color: "bg-blue-500",
//     },
//     {
//         title: "Watch Price Drop",
//         desc: "Prices fall in real time — patience pays off.",
//         image: "/images/image/02.png",
//         icon: TrendingDown,
//         color: "bg-indigo-500",
//     },
//     {
//         title: "Buy or Wait",
//         desc: "Purchase instantly or wait for a better deal.",
//         image: "/images/image/03.png",
//         icon: Zap,
//         color: "bg-purple-500",
//     },
//     {
//         title: "Group Power Deals",
//         desc: "Join others to unlock even bigger discounts.",
//         image: "/images/image/04.png",
//         icon: Users,
//         color: "bg-pink-500",
//     },
//     {
//         title: "Celebrate Your Win",
//         desc: "Enjoy savings and the thrill of winning.",
//         image: "/images/image/05.png",
//         icon: PartyPopper,
//         color: "bg-orange-500",
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

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const HowItWorksCompDemo = () => {
//     return (
//         <section className="relative overflow-hidden bg-white py-24 sm:py-32">
//             {/* Background Decor */}
//             <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
//                 <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
//                 <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-purple-100 blur-3xl" />
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
//             </div>

//             <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//                 <div className="mx-auto max-w-2xl text-center mb-16">
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-4"
//                     >
//                         Simple Process
//                     </motion.div>
//                     <motion.h2
//                         initial={{ opacity: 0, y: 10 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: 0.1 }}
//                         className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
//                     >
//                         How <span className="text-blue-600">NZL</span> Works
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0, y: 10 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: 0.2 }}
//                         className="mt-4 text-lg leading-8 text-gray-600"
//                     >
//                         Start winning in just a few simple steps. Our platform is designed to make shopping thrilling and rewarding.
//                     </motion.p>
//                 </div>

//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, margin: "-100px" }}
//                     className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5"
//                 >
//                     {steps.map((step, index) => (
//                         <motion.div
//                             key={index}
//                             variants={itemVariants}
//                             className="group relative flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                         >
//                             <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} bg-opacity-10 text-white shadow-sm ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-300`}>
//                                 {/* Fallback to icon if image fails or just use icon specifically */}
//                                 <img src={step.image} alt={step.title} className="h-10 w-10 object-contain drop-shadow-md" />
//                             </div>

//                             <h3 className="text-lg font-bold text-gray-900 mb-2">
//                                 {step.title}
//                             </h3>
//                             <p className="text-sm leading-6 text-gray-600">
//                                 {step.desc}
//                             </p>

//                             {/* Connector Line (Desktop only, except last item) */}
//                             {index !== steps.length - 1 && (
//                                 <div className="hidden lg:block absolute top-14 left-full w-full h-[2px] bg-gradient-to-r from-gray-200 to-transparent -translate-y-1/2 -ml-8 -z-10" />
//                             )}
//                         </motion.div>
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
import { FaArrowRight } from "react-icons/fa";

const stepsWithImages = [
    {
        number: "1",
        title: "Browse Exclusive Deals",
        description: "Open the NZL app and explore our curated selection of limited-time deals on premium products.",
        image: "/images/image/01.png",
        highlights: [
            "Current price shown",
            "Time remaining",
            "Limited stock available"
        ]
    },
    {
        number: "2",
        title: "Watch Prices Drop",
        description: "See the price decrease every second in real-time. The earlier you buy, the better chance you have at a great price.",
        image: "/images/image/02.png",
        highlights: [
            "Real-time price drops",
            "Live countdown",
            "Competitive shopping"
        ]
    },
    {
        number: "3",
        title: "Make Your Decision",
        description: "Choose your perfect moment to buy. Purchase immediately or wait for the price to drop more.",
        image: "/images/image/03.png",
        highlights: [
            "Instant purchase option",
            "Wait for better price",
            "Limited-time opportunity"
        ]
    },
    {
        number: "4",
        title: "Complete Purchase",
        description: "Tap 'Buy Now' when you're ready. Complete payment using your preferred method.",
        image: "/images/image/04.png",
        highlights: [
            "Secure payment",
            "Instant confirmation",
            "Multiple payment options"
        ]
    },
    {
        number: "5",
        title: "Receive Your Product",
        description: "Track your order in the app. We deliver across Saudi Arabia within days.",
        image: "/images/image/05.png",
        highlights: [
            "Nationwide delivery",
            "Real-time tracking",
            "Genuine products"
        ]
    }
];

const HowItWorksCombined = () => {
    return (
        <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                        <span className="text-blue-600 font-semibold">Step-by-Step Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Your Journey with <span className="text-blue-600">NZL</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the thrill of shopping where every second counts and every deal is an adventure.
                    </p>
                </div>

                <div className="space-y-16">
                    {stepsWithImages.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                        >
                            {/* Image Section */}
                            <div className="lg:w-1/2">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 blur-xl" />
                                    <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-auto rounded-lg object-cover"
                                        />
                                        <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                            {step.number}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {step.title}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {step.description}
                                </p>

                                <div className="space-y-3">
                                    {step.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-gray-700 font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                {index < stepsWithImages.length - 1 && (
                                    <div className="mt-8 flex items-center gap-2 text-blue-600 font-semibold">
                                        <span>Next: {stepsWithImages[index + 1].title}</span>
                                        <FaArrowRight />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksCombined;