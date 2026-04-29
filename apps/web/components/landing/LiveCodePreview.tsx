"use client";

import { motion } from "framer-motion";

const codeLines = [
  "-- Beulrock Executor v3.0",
  'local ReplicatedStorage = game:GetService("ReplicatedStorage")',
  'local Core = require(ReplicatedStorage:WaitForChild("BeulrockCore"))',
  "",
  "Core:Connect()",
  'print("Connected to Spider-core Subsector")',
  "Core:Execute()",
];

export default function LiveCodePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-lg rounded-xl border border-beulrock-border bg-[#0d0d0d] p-5 font-mono text-sm shadow-2xl shadow-red-900/20"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500">script.lua</span>
      </div>
      <div className="space-y-1">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
            className="flex"
          >
            <span className="mr-4 text-gray-600 select-none w-5 text-right">
              {i + 1}
            </span>
            <span
              className={
                line.startsWith("--")
                  ? "text-gray-500 italic"
                  : line.startsWith("local")
                  ? "text-blue-400"
                  : line.startsWith("Core")
                  ? "text-beulrock-red"
                  : line.startsWith("print")
                  ? "text-green-400"
                  : "text-gray-300"
              }
            >
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}