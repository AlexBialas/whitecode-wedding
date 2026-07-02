"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Church, MapPin, ArrowUpRight } from "lucide-react";

import { location } from "@/data/wedding";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Location() {
  const [active, setActive] = useState<"church" | "venue">("church");

  const currentLocation =
    active === "church" ? location.church : location.venue;

  const currentMap = `https://www.google.com/maps?q=${encodeURIComponent(
    currentLocation.query
  )}&output=embed`;

  const churchMap = `https://www.google.com/maps?q=${encodeURIComponent(
    location.church.query
  )}`;

  const venueMap = `https://www.google.com/maps?q=${encodeURIComponent(
    location.venue.query
  )}`;

  return (
    <section
      id="location"
      className="relative scroll-mt-24 overflow-hidden bg-[#F8F7F4] py-32 md:py-40"
    >
      {/* Background */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#C8A97E]/5 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C8A97E]/5 blur-3xl" />

      <Container>
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Left */}

          <Reveal>
            <div>
              <SectionTitle
                overline="LOKALIZACJA"
                title="Gdzie się spotykamy?"
                description="Kliknij wybraną lokalizację, aby zobaczyć ją na mapie lub uruchomić nawigację."
              />

              {/* Church */}

              <div
                onClick={() => setActive("church")}
                className={`group mt-14 cursor-pointer rounded-[34px] border bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  active === "church"
                    ? "border-[#C8A97E] shadow-xl"
                    : "border-neutral-200 shadow-sm"
                }`}
              >
                <div className="flex gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
                    <Church
                      size={30}
                      className="text-[#C8A97E] transition group-hover:text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">Ceremonia</h3>

                    <p className="mt-3 text-neutral-700">
                      {location.church.name}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                      {location.church.address}
                    </p>

                    <a
                      href={churchMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C8A97E] px-6 py-3 text-xs uppercase tracking-[0.35em] transition hover:bg-[#C8A97E] hover:text-white"
                    >
                      Nawiguj
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Venue */}

              <div
                onClick={() => setActive("venue")}
                className={`group mt-8 cursor-pointer rounded-[34px] border bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  active === "venue"
                    ? "border-[#C8A97E] shadow-xl"
                    : "border-neutral-200 shadow-sm"
                }`}
              >
                <div className="flex gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
                    <MapPin
                      size={30}
                      className="text-[#C8A97E] transition group-hover:text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">Przyjęcie weselne</h3>

                    <p className="mt-3 text-neutral-700">
                      {location.venue.name}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-neutral-500">
                      {location.venue.address}
                    </p>

                    <a
                      href={venueMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C8A97E] px-6 py-3 text-xs uppercase tracking-[0.35em] transition hover:bg-[#C8A97E] hover:text-white"
                    >
                      Nawiguj
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Map */}

          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-[38px] border border-white bg-white shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={active}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  title="Mapa"
                  src={currentMap}
                  className="h-[620px] w-full border-0"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
