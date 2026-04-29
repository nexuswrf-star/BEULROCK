"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Developers" },
  { value: 50, suffix: "M+", label: "Events" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 20, suffix: "+", label: "Games" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count >= 1000 ? (count / 1000).toFixed(count >= 10000 ? 0 : 1) + "K" : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-beulrock-border bg-[#0a0a0a] py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5 pointer-events-none" />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-4xl font-extrabold text-beulrock-red text-glow-red">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}