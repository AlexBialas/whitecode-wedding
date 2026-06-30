"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <Image
        src="/images/hero.jpg"
        alt={`${wedding.bride} i ${wedding.groom}`}
        fill
        priority
        className="object-cover scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="relative z-10 text-center text-white"
      >
        <span className="mb-8 block text-xs uppercase tracking-[0.6em] text-white/80">
          02 LIPCA 2027
        </span>

        <h1 className="font-heading text-[5.5rem] leading-none md:text-[10rem]">
          {wedding.bride}
        </h1>

        <div className="my-7 text-4xl opacity-80">&</div>

        <h1 className="font-heading text-[5.5rem] leading-none md:text-[10rem]">
          {wedding.groom}
        </h1>

        <div className="mx-auto mt-14 h-px w-24 bg-white/50" />

        <p className="mx-auto mt-10 max-w-md px-6 text-sm leading-8 text-white/85">
          Z radością zapraszamy Was do wspólnego świętowania naszego wyjątkowego
          dnia.
        </p>
      </motion.div>

      {/* Scroll */}
      <a
        href="#gallery"
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-[11px] uppercase tracking-[0.4em]">Odkryj</span>

          <ChevronDown size={30} className="mt-3" />
        </motion.div>
      </a>
    </section>
  );
}
