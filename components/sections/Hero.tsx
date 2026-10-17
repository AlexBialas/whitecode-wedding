"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

import { wedding } from "@/data/wedding";
import { useCountdown } from "../../hooks/useCountdown";

export default function Hero() {
  const countdown = useCountdown("2027-07-02T16:00:00");
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 45]);

  const imageScale = useTransform(
    scrollY,
    [0, 800],
    [1.02, reduceMotion ? 1.02 : 1.08]
  );

  const countdownItems = countdown
    ? [
        { value: countdown.days, label: "Dni", pad: 3 },
        { value: countdown.hours, label: "Godzin", pad: 2 },
        { value: countdown.minutes, label: "Minut", pad: 2 },
        { value: countdown.seconds, label: "Sekund", pad: 2 },
      ]
    : [];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#211D18] px-5 pb-28 pt-32 text-white sm:px-8 sm:pb-32 sm:pt-36 lg:px-12"
    >
      {/* ZDJĘCIE W TLE */}

      <motion.div
        aria-hidden="true"
        className="absolute -inset-y-8 inset-x-0"
        style={
          reduceMotion
            ? undefined
            : {
                y: imageY,
                scale: imageScale,
              }
        }
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </motion.div>

      {/* PRZYCIEMNIENIE ZDJĘCIA */}

      <div aria-hidden="true" className="absolute inset-0 bg-black/25" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-[#2C241C]/10" />

      {/* GŁÓWNA KOMPOZYCJA */}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        {/* NADPIS */}

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="mb-14 text-[9px] font-medium uppercase tracking-[0.38em] text-[#E4CBA7] sm:mb-20 sm:text-[10px] sm:tracking-[0.55em] md:mb-24"
        >
          ZAPROSZENIE NA NASZ ŚLUB
        </motion.p>

        {/* IMIONA */}

        <h1
          id="hero-title"
          className="flex w-full flex-col items-center font-heading font-light leading-[1.05] tracking-[-0.055em]"
        >
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
            className="max-w-full break-words text-[clamp(3.4rem,10vw,9rem)]"
          >
            {wedding.bride}
          </motion.span>

          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.35,
            }}
            className="my-7 font-serif text-4xl font-light italic leading-none text-[#E2C39A] sm:my-10 sm:text-6xl md:my-12 md:text-7xl"
          >
            &
          </motion.span>

          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.4,
              ease: "easeOut",
            }}
            className="max-w-full break-words text-[clamp(3.4rem,10vw,9rem)]"
          >
            {wedding.groom}
          </motion.span>
        </h1>

        {/* SEPARATOR */}

        <div className="mt-14 flex items-center gap-5 sm:mt-20 sm:gap-7 md:mt-24">
          <span className="h-px w-10 bg-[#D4B58D]/70 sm:w-14" />

          <span className="h-2 w-2 rotate-45 border border-[#E2C39A]" />

          <span className="h-px w-10 bg-[#D4B58D]/70 sm:w-14" />
        </div>

        {/* DATA */}

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.32em] text-white sm:mt-14 sm:text-xs sm:tracking-[0.5em] md:mt-16 md:text-sm">
          {wedding.weddingDate}
        </p>

        {/* TEKST ZAPROSZENIA */}

        <p className="mx-auto mt-9 max-w-md px-3 font-serif text-base font-light italic leading-8 text-white/90 sm:mt-12 sm:text-lg sm:leading-9 md:mt-14 md:text-xl">
          Z radością zapraszamy Was do wspólnego świętowania naszego wyjątkowego
          dnia.
        </p>

        {/* ODLICZANIE */}

        {countdown && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.55,
            }}
            className="mt-16 w-full max-w-3xl sm:mt-20 md:mt-24"
          >
            {/* NAPIS NAD LICZNIKIEM */}

            <p className="mb-14 text-[9px] font-medium uppercase tracking-[0.3em] text-white/80 sm:mb-16 sm:text-[10px] sm:tracking-[0.42em]">
              Do naszego dnia pozostało
            </p>

            {/* POLA LICZNIKA */}

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10 md:gap-x-12">
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-0 flex-col items-center"
                >
                  {/* LICZBA */}

                  <span className="font-heading text-4xl font-light leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
                    {String(item.value).padStart(item.pad, "0")}
                  </span>

                  {/* PODPIS — WIĘKSZY ODSTĘP OD LICZBY */}

                  <span className="mt-5 text-[9px] font-medium uppercase tracking-[0.24em] text-white/75 sm:mt-7 sm:text-[10px] sm:tracking-[0.3em]">
                    {item.label}
                  </span>

                  {/* ZŁOTY SEPARATOR */}

                  <span
                    aria-hidden="true"
                    className="mt-4 h-px w-7 bg-[#D4B58D]/60 sm:mt-5 sm:w-9"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* WSKAZÓWKA PRZEWIJANIA */}

      <motion.a
        href="#gallery"
        aria-label="Przejdź do galerii zdjęć"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 6, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }
        }
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4 text-white/80 transition-colors hover:text-[#E2C39A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-8 sm:gap-5"
      >
        <span className="text-[8px] uppercase tracking-[0.45em] sm:text-[9px]">
          Odkryj
        </span>

        <ArrowDown size={18} strokeWidth={1} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
