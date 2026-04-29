"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "Beulrock completely changed how I execute scripts. Fast, secure, and reliable.", name: "ShadowX", role: "Roblox Developer" },
  { quote: "The script hub is insane. I can find any script I need in seconds.", name: "NightCoder", role: "Scripter" },
  { quote: "99.9% uptime is real. Never had a crash during an event.", name: "UltraHub", role: "Game Owner" },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold"
        >
          WHAT DEVELOPERS SAY
        </motion.h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-beulrock-border bg-beulrock-card p-8 transition-all duration-300 hover:border-beulrock-red/30 hover:shadow-lg hover:shadow-red-900/5"
            >
              <p className="text-gray-300 italic">"{t.quote}"</p>
              <p className="mt-4 font-bold text-white">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}