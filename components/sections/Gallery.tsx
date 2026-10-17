"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { gallery as originalGallery } from "@/data/wedding";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const firstTwoPhotos = originalGallery.slice(0, 2);

const gallery = Array.from({ length: 8 }, (_, index) => {
  const image = firstTwoPhotos[index % firstTwoPhotos.length];

  return {
    ...image,
    id: `gallery-${index}`,
  };
});

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = gallery.length;

  const nextImage = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const prevImage = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, nextImage, prevImage]);

  if (firstTwoPhotos.length === 0) return null;

  const activeImage = gallery[activeIndex];

  // Trzy zdjęcia widoczne jednocześnie.
  const visiblePhotos = [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + total) % total;

    return {
      ...gallery[index],
      position: offset,
      index,
    };
  });

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-title"
        className="scroll-mt-20 overflow-hidden bg-[#F8F5EF] py-20 sm:py-28 lg:scroll-mt-24 lg:py-36"
      >
        <Container>
          {/* NAGŁÓWEK */}
          <Reveal>
            <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
              <p className="mb-5 text-[9px] uppercase tracking-[0.38em] text-[#A58A65] sm:text-[10px] sm:tracking-[0.5em]">
                NASZA HISTORIA
              </p>

              <h2
                id="gallery-title"
                className="font-heading text-4xl font-light leading-[1.1] tracking-[-0.035em] text-[#302820] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Nasze wspólne
                <span className="mt-1 block italic text-[#A58A65]">
                  najpiękniejsze chwile
                </span>
              </h2>

              <div className="mx-auto mt-7 h-px w-12 bg-[#B79A72]/70 sm:mt-9" />
            </header>
          </Reveal>

          {/* KARUZELA — TRZY ZDJĘCIA */}
          <Reveal>
            <div className="relative">
              <div className="grid grid-cols-3 items-center gap-2 sm:gap-4 lg:gap-6">
                {visiblePhotos.map((photo) => {
                  const isCenter = photo.position === 0;

                  return (
                    <motion.button
                      key={photo.id}
                      type="button"
                      layout
                      onClick={() => {
                        setActiveIndex(photo.index);
                        setLightboxOpen(true);
                      }}
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.72,
                        scale: isCenter ? 1 : 0.91,
                        y: isCenter ? 0 : 8,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      aria-label={`Powiększ zdjęcie ${photo.index + 1}`}
                      className={`group relative block w-full overflow-hidden rounded-xl bg-[#E8DFD2] text-left ring-1 ring-[#B79A72]/20 transition-shadow duration-500 sm:rounded-2xl ${
                        isCenter
                          ? "aspect-[3/4] shadow-[0_18px_45px_rgba(48,40,32,0.16)]"
                          : "aspect-[3/4] shadow-[0_8px_24px_rgba(48,40,32,0.08)]"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 31vw, (max-width: 1024px) 30vw, 28vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />

                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                      {isCenter && (
                        <span className="absolute bottom-3 left-3 text-[8px] tracking-[0.15em] text-white sm:bottom-5 sm:left-5 sm:text-[10px] sm:tracking-[0.2em]">
                          ANGELIKA & PATRYK
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* STRZAŁKI */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Poprzednie zdjęcia"
                className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/3 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8CCBB] bg-[#F8F5EF] text-[#514438] shadow-md transition hover:bg-white sm:left-2 sm:h-11 sm:w-11 sm:translate-x-0 lg:left-6"
              >
                <ChevronLeft size={19} strokeWidth={1.4} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Następne zdjęcia"
                className="absolute right-0 top-1/2 z-10 flex h-9 w-9 translate-x-1/3 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8CCBB] bg-[#F8F5EF] text-[#514438] shadow-md transition hover:bg-white sm:right-2 sm:h-11 sm:w-11 sm:translate-x-0 lg:right-6"
              >
                <ChevronRight size={19} strokeWidth={1.4} />
              </button>
            </div>
          </Reveal>

          {/* LICZNIK I POSTĘP */}
          <div className="mx-auto mt-8 max-w-sm sm:mt-10">
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg italic text-[#A58A65]">
                Nasze wspomnienia
              </span>

              <span className="text-[10px] tracking-[0.2em] text-[#766B5E]">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-[#B79A72]">/</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-4 h-px overflow-hidden bg-[#E4DACC]">
              <motion.div
                className="h-full bg-[#A58A65]"
                animate={{
                  width: `${((activeIndex + 1) / total) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* PODPIS */}
          <div className="mt-12 text-center sm:mt-16">
            <p className="font-heading text-xl font-light italic text-[#514438] sm:text-3xl">
              „Miłość to wspólne patrzenie w tym samym kierunku”.
            </p>
          </div>
        </Container>
      </section>

      {/* PEŁNOEKRANOWE ZDJĘCIE */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171411]/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Zamknij zdjęcie"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <X size={21} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:left-8"
            >
              <ChevronLeft size={22} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Następne zdjęcie"
              className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:right-8"
            >
              <ChevronRight size={22} strokeWidth={1.4} />
            </button>

            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative h-[72vh] w-full max-w-5xl sm:h-[82vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <p className="absolute bottom-5 text-[10px] tracking-[0.25em] text-white/70">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
