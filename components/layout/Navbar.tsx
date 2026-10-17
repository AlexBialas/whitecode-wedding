"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { wedding } from "@/data/wedding";

const links = [
  { label: "Historia", href: "#gallery" },
  { label: "Plan dnia", href: "#timeline" },
  { label: "Lokalizacja", href: "#location" },
  { label: "Zdjęcia", href: "#upload" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#B9A184]/25 bg-[#F8F5EF]/95 text-[#29251F] shadow-[0_4px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            : "border-b border-white/15 bg-black/10 text-white backdrop-blur-[2px]"
        }`}
      >
        <div className="mx-auto grid h-[76px] w-full max-w-[1800px] grid-cols-[1fr_auto] items-center gap-4 px-5 sm:h-[84px] sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 xl:px-20">
          {/* LOGO */}

          <a
            href="#hero"
            onClick={closeMenu}
            aria-label={`${wedding.bride} i ${wedding.groom} — strona główna`}
            className="group flex w-fit min-w-0 items-center"
          >
            <span className="font-heading text-[21px] font-light tracking-[-0.055em] sm:text-2xl lg:text-[27px]">
              {wedding.bride}
            </span>

            <span className="mx-1.5 font-serif text-xl italic text-[#C8A97E] sm:mx-2 sm:text-2xl">
              &
            </span>

            <span className="font-heading text-[21px] font-light tracking-[-0.055em] sm:text-2xl lg:text-[27px]">
              {wedding.groom}
            </span>
          </a>

          {/* MENU DESKTOPOWE */}

          <nav
            aria-label="Nawigacja główna"
            className="hidden items-center justify-center gap-7 lg:flex xl:gap-10"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative whitespace-nowrap py-2 text-[10px] font-medium uppercase tracking-[0.19em] transition-colors duration-300 hover:text-[#B99B72] xl:text-[11px]"
              >
                {link.label}

                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#B99B72] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* PRZYCISK MENU MOBILNEGO */}

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="relative z-[70] flex h-11 w-11 items-center justify-center justify-self-end lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={25} strokeWidth={1.2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={25} strokeWidth={1.2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* MENU MOBILNE */}

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Nawigacja mobilna"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] flex min-h-[100svh] flex-col items-center justify-center overflow-y-auto bg-[#F8F5EF] px-7 text-[#29251F] lg:hidden"
          >
            <p className="mb-3 text-[9px] uppercase tracking-[0.4em] text-[#A58A65]">
              Nasza historia
            </p>

            <p className="text-center font-heading text-3xl font-light tracking-[-0.04em] sm:text-4xl">
              {wedding.bride}
              <span className="mx-2 font-serif italic text-[#B99B72]">&</span>
              {wedding.groom}
            </p>

            <div className="my-8 h-px w-14 bg-[#B99B72]" />

            <div className="flex w-full max-w-sm flex-col">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.07,
                  }}
                  className="flex items-center justify-between border-b border-[#B99B72]/25 py-5 font-heading text-2xl font-light transition-colors hover:text-[#A58A65]"
                >
                  <span>{link.label}</span>

                  <span className="text-xl font-light text-[#B99B72]">↗</span>
                </motion.a>
              ))}
            </div>

            <p className="mt-10 text-center text-[9px] uppercase tracking-[0.3em] text-[#9A9082]">
              Nasz wyjątkowy dzień · {wedding.weddingDate}
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
