"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BeulrockLogo from "./BeulrockLogo";

const navLinks = [
  { label: "Platforms", href: "#platforms" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-beulrock-red/30 bg-beulrock-black/95 shadow-lg shadow-red-900/10"
          : "border-beulrock-border bg-beulrock-black/80"
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <BeulrockLogo showSubtitle={false} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/auth/login" className="text-sm text-gray-300 transition hover:text-white">
            Sign In
          </Link>
          <Link href="/auth/register" className="rounded-lg bg-beulrock-red px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:box-glow-red">
            Get Started
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-beulrock-border bg-beulrock-black md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="block py-2 text-sm text-gray-400" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Link href="/auth/login" className="text-sm text-gray-300" onClick={() => setOpen(false)}>Sign In</Link>
              <Link href="/auth/register" className="rounded-lg bg-beulrock-red px-5 py-3 text-center text-sm font-semibold" onClick={() => setOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}