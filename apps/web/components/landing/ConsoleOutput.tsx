"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const logLines = [
  { time: "12:08:01", type: "SUCCESS", text: "Injected." },
  { time: "12:08:01", type: "CONSOLE", text: "Connected -> Spider-core Subsector" },
  { time: "12:08:02", type: "SUCCESS", text: "Bypassed Protections." },
  { time: "12:08:03", type: "SUCCESS", text: "Executing: Spider-spawn@Subsector" },
  { time: "12:08:03", type: "SUCCESS", text: "Execution OK." },
  { time: "12:08:04", type: "CONSOLE", text: "All modules loaded." },
  { time: "12:08:05", type: "SUCCESS", text: "Connected to Cyber-netic Subsector" },
  { time: "12:08:06", type: "CONSOLE", text: "Productivity (downloader) ready" },
];

export default function ConsoleOutput() {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    if (visibleCount >= logLines.length) return;

    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= logLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [isInView, visibleCount]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl rounded-xl border border-beulrock-border bg-[#0d0d0d] p-5 font-mono text-xs shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between text-gray-500">
        <span>Scriptable Output</span>
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-beulrock-red animate-pulse-slow" />
          LIVE
        </span>
      </div>
      <div className="space-y-1 max-h-56 overflow-hidden">
        {logLines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-3"
          >
            <span className="text-gray-600">[{line.time}]</span>
            <span
              className={
                line.type === "SUCCESS"
                  ? "text-green-400"
                  : line.type === "ERROR"
                  ? "text-red-400"
                  : "text-blue-400"
              }
            >
              [{line.type}]
            </span>
            <span className="text-gray-300">{line.text}</span>
          </motion.div>
        ))}
      </div>
      {visibleCount < logLines.length && (
        <span className="inline-block w-2 h-4 bg-beulrock-red animate-pulse mt-1" />
      )}
    </motion.div>
  );
}