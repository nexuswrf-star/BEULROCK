"use client";

import Link from "next/link";
import { Shield, Zap, Server, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Zap, label: "Server-side Execution" },
  { icon: Server, label: "Script Hub" },
  { icon: Shield, label: "HWID Security" },
  { icon: Headphones, label: "24/7 Support" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden">
      {/* Logo background */}
      <div
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/logo.png')",
          backgroundPosition: 'center',
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-20">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 rounded-full border border-beulrock-border bg-beulrock-card/80 backdrop-blur-sm px-5 py-2 text-sm text-gray-300 animate-pulse-slow"
      >
        Coresteel v3.0 is now live
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl"
      >
        READY TO DEPLOY{" "}
        <span className="text-beulrock-red text-glow-red">YOUR FIRST EVENT?</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 max-w-2xl text-lg text-gray-400"
      >
        Execute scripts on your game servers with unmatched power, security, and precision.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        <Link href="/auth/register" className="rounded-lg bg-beulrock-red px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-red-700 hover:box-glow-red">
          Start for Free
        </Link>
        <Link href="#docs" className="rounded-lg border border-beulrock-border bg-transparent px-8 py-4 text-lg font-semibold text-white transition hover:bg-beulrock-card">
          View Documentation
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mt-16 flex flex-wrap justify-center gap-4"
      >
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-2 rounded-full border border-beulrock-border bg-beulrock-card/80 backdrop-blur-sm px-5 py-2 text-sm text-gray-300"
          >
            <badge.icon size={16} className="text-beulrock-red" />
            {badge.label}
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}