"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { wedding } from "@/data/wedding";
import { useCountdown } from "../../hooks/useCountdown";
import CountdownCard from "@/components/ui/CountdownCard";

export default function Hero() {
  const countdown = useCountdown("2027-07-02T16:00:00");

  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 700], [0, 120]);
  const imageScale = useTransform(scrollY, [0, 700], [1.05, 1.15]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}

      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.jpg"
          alt={`${wedding.bride} i ${wedding.groom}`}
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75" />

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-6xl px-6 text-center text-white"
      >
        <span className="mb-8 block text-[11px] uppercase tracking-[0.65em] text-white/80">
          {wedding.weddingDate}
        </span>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.2 }}
          className="font-heading text-6xl font-light leading-none md:text-[10rem]"
        >
          {wedding.bride}
        </motion.h1>

        <div className="my-7 text-4xl text-[#C8A97E]">&</div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.35 }}
          className="font-heading text-6xl font-light leading-none md:text-[10rem]"
        >
          {wedding.groom}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-14 h-px bg-[#C8A97E]"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mx-auto mt-10 max-w-md leading-8 text-white/90"
        >
          Z radością zapraszamy Was do wspólnego świętowania naszego wyjątkowego
          dnia.
        </motion.p>

        {countdown && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <p className="mb-8 text-center text-[11px] uppercase tracking-[0.45em] text-white/70">
              Do naszego ślubu pozostało
            </p>

            <div className="rounded-[36px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <CountdownCard value={countdown.days} label="Dni" pad={3} />

                <CountdownCard value={countdown.hours} label="Godzin" />

                <CountdownCard value={countdown.minutes} label="Minut" />

                <CountdownCard value={countdown.seconds} label="Sekund" />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll */}

      <motion.a
        href="#gallery"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/80">
            Odkryj
          </span>

          <ChevronDown size={28} className="mt-3" />
        </div>
      </motion.a>
    </section>
  );
}
