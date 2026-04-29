"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  { name: "Free", price: "$0", period: "forever", features: ["Limited Scripts", "Daily Execute Limit", "Ads"], cta: "Get Started", popular: false },
  { name: "Basic", price: "$5", period: "per month", features: ["More Scripts", "Save Favorites", "Faster Execution", "No Ads"], cta: "Upgrade", popular: false },
  { name: "Premium", price: "$15", period: "per month", features: ["Auto Update", "Priority Execution", "Advanced Filters", "Script Stats", "All Premium Features"], cta: "Upgrade", popular: true },
  { name: "Ultimate", price: "$30", period: "per month", features: ["Private Scripts", "Instant Inject", "Stealth Mode", "All Premium Features"], cta: "Upgrade", popular: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold"
        >
          PRICING
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-center text-gray-400"
        >
          Choose the plan that fits your needs.
        </motion.p>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`rounded-xl border bg-beulrock-card/90 backdrop-blur-sm p-6 transition-all duration-300 ${
                plan.popular
                  ? "border-beulrock-red ring-1 ring-beulrock-red box-glow-red"
                  : "border-beulrock-border hover:border-beulrock-red/50"
              }`}
            >
              {plan.popular && (
                <span className="mb-4 inline-block rounded-full bg-beulrock-red px-3 py-1 text-xs font-bold text-white animate-pulse-slow">
                  POPULAR
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-extrabold">
                {plan.price}
                <span className="text-sm text-gray-400">/{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-beulrock-red" /> {feat}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-beulrock-red text-white hover:bg-red-700 hover:box-glow-red"
                    : "border border-beulrock-border text-white hover:bg-beulrock-red/10"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}