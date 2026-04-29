"use client";

import { motion } from "framer-motion";

export default function StatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed top-24 right-6 z-40 hidden lg:flex items-center gap-3 rounded-full border border-beulrock-border bg-beulrock-card/90 backdrop-blur-md px-4 py-2 text-xs shadow-lg"
    >
      <motion.span
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-2 w-2 rounded-full bg-green-500"
      />
      <span className="text-gray-400">All Systems Operational</span>
      <span className="text-gray-600">|</span>
      <span className="text-white font-semibold">99.9% Uptime</span>
    </motion.div>
  );
}