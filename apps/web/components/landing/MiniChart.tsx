"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const data = [30, 45, 25, 60, 35, 50, 40, 55, 45, 70, 50, 65, 55, 75, 60, 80, 65, 85, 70, 90, 75, 95, 80, 100, 85];

export default function MiniChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-sm rounded-xl border border-beulrock-border bg-beulrock-card/80 backdrop-blur-sm p-4"
    >
      <span className="text-xs text-gray-500 font-semibold">Script Execution Latency (ms)</span>
      <div className="flex items-end gap-1 h-20 mt-3">
        {data.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={isInView ? { height: `${(h / 100) * 100}%` } : {}}
            transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" }}
            className="flex-1 bg-beulrock-red/60 rounded-t"
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-600">
        <span>-60s</span>
        <span>Now</span>
      </div>
    </motion.div>
  );
}