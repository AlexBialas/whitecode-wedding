"use client";

import { Camera, ArrowUpRight, Sparkles } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FileUploader from "@/components/ui/FileUploader";

export default function Upload() {
  return (
    <section
      id="upload"
      aria-labelledby="upload-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#F3EEE5] py-24 sm:py-32 lg:py-40"
    >
      {/* Subtelne tło */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#E5D7C2]/25 blur-[120px]"
      />

      <Container>
        {/* Nagłówek */}
        <Reveal>
          <header className="relative mx-auto max-w-4xl text-center">
            <div className="mb-7 flex items-center justify-center gap-4">
              <span className="h-px w-9 bg-[#C6AE8B]" />
              <p className="text-[9px] uppercase tracking-[0.42em] text-[#A58A65]">
                A COLLECTION OF MEMORIES
              </p>
              <span className="h-px w-9 bg-[#C6AE8B]" />
            </div>

            <h2
              id="upload-title"
              className="font-heading text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.98] tracking-[-0.055em] text-[#514438]"
            >
              Niech te chwile
              <span className="mt-2 block italic text-[#B39A76]">
                zostaną z nami.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-[#82776A] sm:mt-9 sm:text-base sm:leading-8">
              Wasze spojrzenia. Nasze wspomnienia. Jeden wyjątkowy dzień.
            </p>
          </header>
        </Reveal>

        {/* Główna kompozycja */}
        <div className="relative mx-auto mt-16 grid max-w-6xl items-center gap-12 sm:mt-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* Lewa strona */}
          <Reveal>
            <div className="relative px-2 pb-5 sm:px-5 lg:py-10">
              <div className="absolute -left-1 top-0 hidden h-20 w-px bg-[#C6AE8B] lg:block" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#A58A65]">
                THE ART OF REMEMBERING
              </p>

              <h3 className="mt-6 font-heading text-4xl font-light leading-[1.12] tracking-[-0.035em] text-[#514438] sm:text-5xl">
                Każda fotografia
                <span className="block italic text-[#B39A76]">
                  ma swoją historię.
                </span>
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#82776A]">
                Podzielcie się z nami kadrami, do których będziemy wracać
                jeszcze długo po tym wyjątkowym dniu.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D5C3A8] text-[#A58A65]">
                  <Camera size={19} strokeWidth={1.1} />
                </div>

                <div>
                  <p className="font-heading text-xl italic text-[#75634D]">
                    Angelika & Patryk
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#A39786]">
                    Our wedding memories
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Panel galerii */}
          <Reveal delay={0.12}>
            <div className="relative">
              {/* Delikatna rama */}
              <div
                aria-hidden="true"
                className="absolute -right-2 -top-2 h-20 w-20 border-r border-t border-[#C6AE8B] sm:-right-3 sm:-top-3"
              />

              <div className="relative border border-[#E1D5C4] bg-[#FBF9F5] p-5 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 border-b border-[#E9E0D4] pb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#A58A65]">
                      PRIVATE WEDDING GALLERY
                    </p>

                    <h3 className="mt-3 font-heading text-3xl font-light tracking-[-0.025em] text-[#514438] sm:text-4xl">
                      Podziel się chwilą
                    </h3>
                  </div>

                  <Sparkles
                    size={21}
                    strokeWidth={1}
                    className="mt-1 shrink-0 text-[#B39A76]"
                  />
                </div>

                <div className="upload-luxury mt-7">
                  <FileUploader />
                </div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#E9E0D4] pt-5">
                  <p className="max-w-xs font-heading text-lg italic text-[#9B8464] sm:text-xl">
                    Wspomnienia, które zostają.
                  </p>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.1}
                    className="shrink-0 text-[#B39A76]"
                  />
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 h-20 w-20 border-b border-l border-[#C6AE8B] sm:-bottom-3 sm:-left-3"
              />
            </div>
          </Reveal>
        </div>

        {/* Zakończenie */}
        <Reveal>
          <div className="mt-20 text-center sm:mt-28">
            <p className="font-heading text-2xl font-light italic text-[#75634D] sm:text-3xl">
              Z miłością. Na zawsze.
            </p>
          </div>
        </Reveal>
      </Container>

      <style jsx global>{`
        .upload-luxury {
          min-width: 0;
        }

        .upload-luxury > * {
          max-width: 100%;
        }

        .upload-luxury button {
          border-radius: 0 !important;
          background-color: #e9dfcf !important;
          border: 1px solid #d5c3a8 !important;
          color: #75634d !important;
          box-shadow: none !important;
          transition: background-color 250ms ease, color 250ms ease,
            border-color 250ms ease;
        }

        .upload-luxury button:hover {
          background-color: #dfd0ba !important;
          border-color: #bda581 !important;
          color: #514438 !important;
        }

        .upload-luxury button:focus-visible {
          outline: 2px solid #b39a76;
          outline-offset: 4px;
        }

        .upload-luxury input {
          max-width: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .upload-luxury button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
