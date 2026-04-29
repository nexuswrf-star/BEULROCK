"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";

export default function InjectionProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 86) return 86; // Maks 86% seperti gambar
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 200);

    controls.start({ width: "100%" });

    return () => clearInterval(interval);
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-md rounded-xl border border-beulrock-border bg-beulrock-card/80 backdrop-blur-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400 font-semibold tracking-wide">
          INJECTION PROGRESS
        </span>
        <span className="text-beulrock-red font-bold text-lg">{progress}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-beulrock-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-beulrock-red to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">Injecting script into target server...</p>
    </motion.div>
  );
}