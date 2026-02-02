// Ellipses.jsx
"use client";
import { motion } from "framer-motion";

export default function Ellipses() {
  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full
        bg-green-400/30 blur-[160px]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        className="absolute -top-48 -right-40 h-[520px] w-[520px] rounded-full
        bg-blue-500/30 blur-[180px]"
      />
    </>
  );
}
