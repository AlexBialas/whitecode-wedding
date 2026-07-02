"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  value: number;
  label: string;
  pad?: number;
};

export default function CountdownCard({ value, label, pad = 2 }: Props) {
  const display = String(value).padStart(pad, "0");

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={display}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="font-heading text-5xl font-light text-white md:text-6xl"
        >
          {display}
        </motion.p>
      </AnimatePresence>

      <div className="mx-auto my-4 h-px w-10 bg-[#C8A97E]" />

      <p className="text-[10px] uppercase tracking-[0.45em] text-white/70">
        {label}
      </p>
    </div>
  );
}
