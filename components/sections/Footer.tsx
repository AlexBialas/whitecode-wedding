"use client";

import { ArrowUpRight, Heart } from "lucide-react";

import { wedding } from "@/data/wedding";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#302820] text-[#F8F4EC]">
      {/* Subtelne światło w tle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#B49A75]/[0.07] blur-[130px]"
      />

      <Container>
        {/* The WhiteCode Studio */}
        <Reveal delay={0.12}>
          <div className="relative border-t border-[#D8CBBB]/15 py-9 sm:py-11">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-10">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The WhiteCode Studio — otwórz stronę"
                className="group text-center md:text-left"
              >
                <p className="text-[8px] uppercase tracking-[0.35em] text-[#C5AD8B]/75">
                  DESIGN & DEVELOPMENT
                </p>

                <span className="mt-3 inline-flex items-center gap-2 font-heading text-2xl font-light tracking-[-0.025em] text-[#F8F4EC] transition-colors duration-300 group-hover:text-[#C5AD8B] sm:text-3xl">
                  The WhiteCode Studio
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.2}
                    className="text-[#C5AD8B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>

                <p className="mt-2 text-xs text-[#D8CBBB]/55">
                  Created by Aleksandra Białas
                </p>
              </a>

              {/* Linki */}
              <nav
                aria-label="Linki do The WhiteCode Studio"
                className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-[10px] uppercase tracking-[0.16em] text-[#D8CBBB]/65 sm:gap-x-9"
              ></nav>
            </div>
          </div>
        </Reveal>

        {/* Dolna linia */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-[#D8CBBB]/10 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[9px] tracking-[0.12em] text-[#D8CBBB]/40">
            © {new Date().getFullYear()} The WhiteCode Studio
          </p>

          <p className="text-[9px] tracking-[0.12em] text-[#D8CBBB]/40">
            Made with love <span className="text-[#C5AD8B]">♥</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
