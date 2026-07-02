"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/data/wedding";

const links = [
  { label: "Historia", href: "#gallery" },
  { label: "Plan dnia", href: "#timeline" },
  { label: "Lokalizacja", href: "#location" },
  { label: "Zdjęcia", href: "#upload" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-white/70 backdrop-blur-2xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}

          <a
            href="#hero"
            className={`font-heading text-2xl transition ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            {wedding.bride}
            <span className="mx-2 text-[#C8A97E]">&</span>
            {wedding.groom}
          </a>

          {/* Desktop */}

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-[0.25em] transition hover:text-[#C8A97E] ${
                  scrolled ? "text-neutral-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden ${scrolled ? "text-black" : "text-white"}`}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="flex h-full flex-col items-center justify-center gap-10">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-4xl"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
