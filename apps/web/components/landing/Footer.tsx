"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-beulrock-border bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-gray-500">© 2024 Beulrock Serverside Engine. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-green-500"
            />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}