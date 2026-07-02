"use client";

import { useState } from "react";
import { Church, MapPin, ArrowUpRight } from "lucide-react";

import { location } from "@/data/wedding";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Location() {
  const [active, setActive] = useState<"church" | "venue">("church");

  return (
    <section className="bg-[#F8F7F4] py-32 md:py-40">
      <Container>
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Lewa kolumna */}
          <Reveal>
            <div>
              <SectionTitle
                overline="LOKALIZACJA"
                title="Gdzie się spotykamy?"
                description="Przygotowaliśmy wszystkie najważniejsze miejsca. Jedno kliknięcie wystarczy, aby uruchomić nawigację."
              />

              {/* Kościół */}

              <div
                onClick={() => setActive("church")}
                className={`group mt-14 cursor-pointer rounded-[32px] border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  active === "church"
                    ? "border-[#C8A97E]"
                    : "border-neutral-200"
                }`}
              >
                <div className="flex gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
                    <Church
                      size={30}
                      className="text-[#C8A97E] transition group-hover:text-white"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Ceremonia</h3>

                    <p className="mt-3 text-neutral-700">
                      {location.church.name}
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                      {location.church.address}
                    </p>

                    <a
                      href={location.church.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C8A97E] px-6 py-3 text-xs uppercase tracking-[0.35em] transition hover:bg-[#C8A97E] hover:text-white"
                    >
                      Nawiguj
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sala */}

              <div
                onClick={() => setActive("venue")}
                className={`group mt-8 cursor-pointer rounded-[32px] border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  active === "venue" ? "border-[#C8A97E]" : "border-neutral-200"
                }`}
              >
                <div className="flex gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
                    <MapPin
                      size={30}
                      className="text-[#C8A97E] transition group-hover:text-white"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Przyjęcie weselne</h3>

                    <p className="mt-3 text-neutral-700">
                      {location.venue.name}
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                      {location.venue.address}
                    </p>

                    <a
                      href={location.venue.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C8A97E] px-6 py-3 text-xs uppercase tracking-[0.35em] transition hover:bg-[#C8A97E] hover:text-white"
                    >
                      Nawiguj
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Prawa kolumna */}

          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-[36px] border border-white bg-white shadow-2xl">
              <iframe
                key={active}
                title="Mapa"
                src={`${
                  active === "church"
                    ? location.church.maps
                    : location.venue.maps
                }&output=embed`}
                className="h-[620px] w-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
