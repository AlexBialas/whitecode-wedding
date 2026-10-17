"use client";

import { Church, GlassWater, Music4, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { wedding } from "@/data/wedding";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const events = [
  {
    number: "01",
    label: "THE CEREMONY",
    title: "Ceremonia",
    time: wedding.ceremonyTime,
    description:
      "Wszystko zaczyna się od jednego słowa. Chcemy, abyście byli obok nas w chwili, która na zawsze pozostanie częścią naszej historii.",
    location: wedding.church,
    Icon: Church,
    accent: "Pierwszy rozdział",
  },
  {
    number: "02",
    label: "THE CELEBRATION",
    title: "Przyjęcie weselne",
    time: wedding.receptionTime,
    description:
      "Wspólny toast, wyjątkowe smaki i rozmowy, które mogłyby trwać bez końca. Czas celebrować miłość w gronie najbliższych.",
    location: wedding.venue,
    Icon: GlassWater,
    accent: "Razem przy jednym stole",
  },
  {
    number: "03",
    label: "THE PARTY",
    title: "Do białego rana",
    time: "Do rana",
    description:
      "Muzyka, taniec i spontaniczne chwile. Niech ten wieczór stanie się jednym z tych wspomnień, które zawsze wywołują uśmiech.",
    location: "Parkiet czeka na nas wszystkich",
    Icon: Music4,
    accent: "Ostatni taniec? Jeszcze nie",
  },
];

export default function Timeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#F5F1EA] py-24 sm:py-32 lg:scroll-mt-24 lg:py-40"
    >
      {/* DELIKATNA TEKSTURA KOLORU */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[#D8C3A3]/15 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-white/70 blur-[130px]"
      />

      <Container>
        {/* NAGŁÓWEK */}

        <Reveal>
          <header className="relative mx-auto max-w-4xl text-center">
            <div className="mb-7 flex items-center justify-center gap-4">
              <span className="h-px w-9 bg-[#B49A75]" />

              <p className="text-[9px] uppercase tracking-[0.42em] text-[#9C8058] sm:text-[10px] sm:tracking-[0.5em]">
                THE WEDDING DAY
              </p>

              <span className="h-px w-9 bg-[#B49A75]" />
            </div>

            <h2
              id="timeline-title"
              className="font-heading text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#302820]"
            >
              Jeden dzień.
              <span className="mt-2 block italic text-[#A58A65] sm:mt-3">
                Całe wspomnienia.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#786D60] sm:mt-9 sm:text-base sm:leading-8">
              Od pierwszego wzruszenia po ostatni taniec. Oto chwile, które
              wspólnie stworzą historię naszego dnia.
            </p>
          </header>
        </Reveal>

        {/* DEKORACYJNY ZNAK */}

        <Reveal>
          <div className="my-14 flex items-center justify-center gap-3 sm:my-20">
            <span className="h-px w-12 bg-[#D6C4AA]" />
            <span className="rotate-45 border border-[#B49A75] p-1" />
            <span className="h-px w-12 bg-[#D6C4AA]" />
          </div>
        </Reveal>

        {/* WYDARZENIA */}

        <div className="relative">
          <div className="grid gap-0 lg:grid-cols-3">
            {events.map((event, index) => {
              const Icon = event.Icon;

              return (
                <Reveal
                  key={event.number}
                  delay={index * 0.12}
                  className="h-full"
                >
                  <motion.article
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                            transition: { duration: 0.3 },
                          }
                    }
                    className={`group relative flex h-full flex-col px-5 py-9 sm:px-10 sm:py-12 lg:px-9 lg:py-8 xl:px-12 ${
                      index !== 0
                        ? "border-t border-[#D8C8B2] lg:border-l lg:border-t-0"
                        : ""
                    }`}
                  >
                    {/* NUMER */}

                    <div className="flex items-start justify-between">
                      <span className="font-heading text-[76px] font-light leading-[0.8] tracking-[-0.07em] text-[#D5C3A8]/70 transition-colors duration-500 group-hover:text-[#B79A72] sm:text-[96px] lg:text-[88px] xl:text-[104px]">
                        {event.number}
                      </span>

                      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-[#D8C8B2] text-[#9C8058] transition-all duration-500 group-hover:border-[#A58A65] group-hover:bg-[#A58A65] group-hover:text-white">
                        <Icon size={19} strokeWidth={1.2} />
                      </div>
                    </div>

                    {/* NAZWA ETAPU */}

                    <p className="mt-9 text-[9px] font-medium uppercase tracking-[0.3em] text-[#9C8058] sm:mt-11 sm:text-[10px]">
                      {event.label}
                    </p>

                    {/* GODZINA */}

                    <p className="mt-4 font-heading text-4xl font-light tracking-[-0.035em] text-[#302820] sm:text-5xl xl:text-[54px]">
                      {event.time}
                    </p>

                    {/* TYTUŁ */}

                    <h3 className="mt-3 font-heading text-2xl font-medium leading-tight text-[#514438] sm:text-3xl">
                      {event.title}
                    </h3>

                    <div className="mt-6 h-px w-10 bg-[#B79A72] transition-all duration-500 group-hover:w-16" />

                    {/* OPIS */}

                    <p className="mt-6 flex-1 text-sm leading-7 text-[#786D60] sm:text-[15px] sm:leading-8">
                      {event.description}
                    </p>

                    {/* LOKALIZACJA */}

                    <div className="mt-9 border-t border-[#D8C8B2]/80 pt-5">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-[#A58A65]">
                        MIEJSCE
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#514438]">
                        {event.location}
                      </p>
                    </div>

                    {/* PODPIS */}

                    <p className="mt-6 font-heading text-lg italic text-[#A58A65]">
                      {event.accent}
                    </p>

                    {/* DEKORACYJNA STRZAŁKA */}

                    <div className="absolute bottom-10 right-5 hidden opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 lg:block">
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.2}
                        className="text-[#A58A65]"
                      />
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ZAMKNIĘCIE SEKCJI */}

        <Reveal>
          <div className="mt-12 border-t border-[#D8C8B2] pt-10 text-center sm:mt-16 sm:pt-14">
            <p className="font-heading text-2xl font-light italic text-[#514438] sm:text-3xl md:text-4xl">
              Najważniejsze, że będziemy tam razem.
            </p>

            <a
              href="#location"
              className="group mt-7 inline-flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.25em] text-[#9C8058] transition-colors duration-300 hover:text-[#514438] sm:mt-9 sm:text-[10px]"
            >
              Odkryj miejsce uroczystości
              <ArrowUpRight
                size={14}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
