import { Heart } from "lucide-react";
import { wedding } from "@/data/wedding";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] py-32 text-white">
      <Container>
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.55em] text-white/40">
              DZIĘKUJEMY
            </p>

            <h2 className="mt-10 font-heading text-6xl font-light md:text-8xl">
              {wedding.bride}
            </h2>

            <div className="my-8 text-4xl text-[#C8A97E]">&</div>

            <h2 className="font-heading text-6xl font-light md:text-8xl">
              {wedding.groom}
            </h2>

            <div className="mx-auto mt-12 h-px w-24 bg-[#C8A97E]" />

            <p className="mt-10 uppercase tracking-[0.35em] text-white/60">
              {wedding.weddingDate}
            </p>

            <p className="mx-auto mt-8 max-w-2xl leading-8 text-white/60">
              Dziękujemy, że byliście częścią naszego wyjątkowego dnia. Wasza
              obecność była dla nas najpiękniejszym prezentem i stworzyła
              wspomnienia, które pozostaną z nami na całe życie.
            </p>

            <Heart
              size={34}
              strokeWidth={1.5}
              className="mx-auto mt-12 text-[#C8A97E]"
            />
          </div>
        </Reveal>

        {/* WhiteCode */}

        <Reveal delay={0.25}>
          <div className="mt-28 border-t border-white/10 pt-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.55em] text-white/35">
              Projekt i realizacja
            </p>

            <h3 className="mt-6 font-heading text-3xl font-light">
              The WhiteCode Studio
            </h3>

            <p className="mt-2 text-white/50">Aleksandra Białas</p>

            <p className="mt-8 text-sm leading-7 text-white/35">
              Nowoczesne strony internetowe • Wedding Landing Pages
              <br />
              Automatyzacje AI • Aplikacje Webowe
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/50">
              <a
                href="https://whitecode.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#C8A97E]"
              >
                WhiteCode Studio
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#C8A97E]"
              >
                Instagram
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#C8A97E]"
              >
                LinkedIn
              </a>
            </div>

            <div className="mx-auto mt-10 h-px w-20 bg-white/10" />

            <p className="mt-8 text-xs tracking-wider text-white/25">
              © {new Date().getFullYear()} The WhiteCode Studio The WhiteCode
              Studio • All Rights Reserved
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
