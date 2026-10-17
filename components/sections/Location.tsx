"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import { location } from "@/data/wedding";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type LocationType = "church" | "venue";

const locations = [
  {
    id: "church" as const,
    number: "01",
    category: "CEREMONY",
    title: "Ceremonia",
    name: location.church.name,
    address: location.church.address,
    query: location.church.query,
  },
  {
    id: "venue" as const,
    number: "02",
    category: "CELEBRATION",
    title: "Przyjęcie weselne",
    name: location.venue.name,
    address: location.venue.address,
    query: location.venue.query,
  },
];

export default function Location() {
  const [active, setActive] = useState<LocationType>("church");
  const [mapLoaded, setMapLoaded] = useState(false);

  const reduceMotion = useReducedMotion();

  const current = locations.find((item) => item.id === active)!;

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    current.query
  )}&z=15&output=embed`;

  const navigationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    current.query
  )}`;

  const handleLocationChange = (id: LocationType) => {
    if (id === active) return;

    setActive(id);
    setMapLoaded(false);
  };

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="scroll-mt-20 bg-[#F7F4EE] py-20 sm:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        {/* Nagłówek sekcji */}
        <Reveal>
          <div className="grid gap-6 border-b border-[#D9D0C2] pb-10 sm:pb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#9B805D]">
                INFORMACJE PRAKTYCZNE
              </p>

              <h2
                id="location-title"
                className="max-w-3xl font-heading text-5xl font-light leading-[0.98] tracking-[-0.045em] text-[#302820] sm:text-6xl md:text-7xl lg:text-[82px]"
              >
                Gdzie zacznie się
                <span className="block italic text-[#A58A65]">
                  nasza historia?
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#766B5E] lg:pb-2">
              Dwa miejsca, jeden wyjątkowy dzień. Wybierz lokalizację, sprawdź
              adres i zaplanuj dojazd.
            </p>
          </div>
        </Reveal>

        {/* Lokalizacje i podgląd mapy */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Lista lokalizacji */}
          <Reveal>
            <div>
              <div className="mb-2 flex items-center justify-between py-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#9B805D]">
                  NASZE LOKALIZACJE
                </p>

                <span className="text-[10px] tracking-[0.15em] text-[#8D8376]">
                  02 MIEJSCA
                </span>
              </div>

              <div className="border-t border-[#D9D0C2]">
                {locations.map((item) => {
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleLocationChange(item.id)}
                      aria-pressed={isActive}
                      className="group relative block w-full border-b border-[#D9D0C2] py-7 text-left sm:py-9"
                    >
                      <div className="grid grid-cols-[42px_1fr_24px] gap-3 sm:grid-cols-[52px_1fr_28px] sm:gap-5">
                        <span
                          className={`pt-1 font-heading text-2xl font-light italic transition-colors duration-300 sm:text-3xl ${
                            isActive ? "text-[#A58A65]" : "text-[#BDB3A4]"
                          }`}
                        >
                          {item.number}
                        </span>

                        <div className="min-w-0">
                          <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[#9B805D]">
                            {item.category}
                          </p>

                          <h3
                            className={`font-heading text-3xl font-light leading-tight tracking-[-0.025em] transition-colors duration-300 sm:text-4xl ${
                              isActive
                                ? "text-[#302820]"
                                : "text-[#82796D] group-hover:text-[#514438]"
                            }`}
                          >
                            {item.title}
                          </h3>

                          <p className="mt-3 text-sm leading-6 text-[#514438]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs leading-6 text-[#82796D] sm:text-sm">
                            {item.address}
                          </p>

                          <span
                            className={`mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                              isActive
                                ? "text-[#9B805D]"
                                : "text-[#82796D] group-hover:text-[#9B805D]"
                            }`}
                          >
                            Pokaż lokalizację
                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.4}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                        </div>

                        <span
                          className={`mt-1 flex h-7 w-7 items-center justify-center transition-colors duration-300 ${
                            isActive ? "text-[#A58A65]" : "text-[#BDB3A4]"
                          }`}
                        >
                          <MapPin size={18} strokeWidth={1.2} />
                        </span>
                      </div>

                      {isActive && (
                        <motion.span
                          layoutId="location-indicator"
                          className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#A58A65]"
                          transition={{
                            duration: reduceMotion ? 0 : 0.25,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 max-w-sm text-xs leading-6 text-[#82796D]">
                Wybierz miejsce, aby zobaczyć jego szczegóły. Mapę możesz
                otworzyć tylko wtedy, gdy jej potrzebujesz.
              </p>
            </div>
          </Reveal>

          {/* Mapa — ładowana dopiero na żądanie */}
          <Reveal delay={0.12}>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-[#EAE5DC]">
                <AnimatePresence mode="wait">
                  {!mapLoaded ? (
                    <motion.div
                      key={`preview-${active}`}
                      initial={
                        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.25,
                      }}
                      className="flex h-[280px] flex-col items-center justify-center px-6 text-center sm:h-[360px] lg:h-[420px]"
                    >
                      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9B79D] text-[#927653]">
                        <MapPin size={21} strokeWidth={1.2} />
                      </span>

                      <p className="text-[9px] uppercase tracking-[0.25em] text-[#9B805D]">
                        {current.number} / {current.category}
                      </p>

                      <h3 className="mt-3 font-heading text-3xl font-light text-[#302820] sm:text-4xl">
                        {current.title}
                      </h3>

                      <p className="mt-3 max-w-xs text-sm leading-6 text-[#786D60]">
                        {current.name}
                      </p>

                      <p className="mt-1 max-w-xs text-xs leading-6 text-[#82796D]">
                        {current.address}
                      </p>

                      <button
                        type="button"
                        onClick={() => setMapLoaded(true)}
                        className="mt-7 inline-flex items-center gap-3 border-b border-[#A58A65] pb-2 text-[10px] uppercase tracking-[0.2em] text-[#514438] transition-colors hover:text-[#A58A65]"
                      >
                        Pokaż mapę
                        <ArrowUpRight size={15} strokeWidth={1.3} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`map-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.25,
                      }}
                    >
                      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9B805D]">
                            {current.category}
                          </p>

                          <p className="mt-1 truncate font-heading text-xl font-light text-[#302820] sm:text-2xl">
                            {current.name}
                          </p>
                        </div>

                        <a
                          href={navigationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Otwórz nawigację do: ${current.name}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#C9B79D] text-[#514438] transition-colors hover:bg-[#A58A65] hover:text-white"
                        >
                          <ArrowUpRight size={18} strokeWidth={1.3} />
                        </a>
                      </div>

                      <iframe
                        title={`Mapa — ${current.name}`}
                        src={mapUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className="h-[280px] w-full border-0 sm:h-[360px] lg:h-[420px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Adres i nawigacja */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#D9D0C2] py-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#9B805D]">
                    ADRES
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#514438]">
                    {current.address}
                  </p>
                </div>

                <a
                  href={navigationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 border-b border-[#A58A65] pb-1 text-[9px] uppercase tracking-[0.2em] text-[#514438] transition-colors hover:text-[#A58A65]"
                >
                  Wyznacz trasę
                  <ArrowUpRight size={14} strokeWidth={1.3} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Zakończenie sekcji */}
        <Reveal>
          <div className="mt-16 flex flex-col gap-3 border-t border-[#D9D0C2] pt-7 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-heading text-2xl font-light italic text-[#514438] sm:text-3xl">
              Do zobaczenia w naszym wyjątkowym dniu.
            </p>

            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9B805D]">
              ANGELIKA & PATRYK
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
