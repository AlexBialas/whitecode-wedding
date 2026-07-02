import { Camera, Images, UploadCloud } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Upload() {
  return (
    <section className="bg-white py-32 md:py-40">
      <Container>
        <div className="grid items-center gap-24 lg:grid-cols-2">
          {/* Lewa kolumna */}
          <Reveal>
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-72 w-72 items-center justify-center rounded-full border border-[#EFE8DD] bg-[#F8F7F4] shadow-2xl transition duration-500 hover:scale-105">
                  <Camera
                    size={115}
                    strokeWidth={1.2}
                    className="text-[#C8A97E]"
                  />
                </div>

                <div className="absolute -right-3 bottom-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#C8A97E] shadow-xl">
                  <Images size={34} className="text-white" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Prawa kolumna */}
          <Reveal delay={0.2}>
            <div>
              <SectionTitle
                overline="WSPOMNIENIA"
                title="Podziel się chwilami, które udało Ci się uchwycić"
                description="Każde zdjęcie i każdy film z naszego ślubu będzie dla nas wyjątkową pamiątką. Jeśli udało Ci się zatrzymać piękne momenty, będziemy wdzięczni za ich udostępnienie."
              />

              <div className="mt-10 rounded-[32px] border border-[#E9E2D8] bg-[#F8F7F4] p-8">
                <p className="leading-8 text-neutral-600">
                  Wszystkie przesłane zdjęcia i filmy zostaną automatycznie
                  zapisane w naszej prywatnej galerii. Dziękujemy, że tworzysz
                  razem z nami wspomnienia na całe życie.
                </p>
              </div>

              <button className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#111111] px-9 py-5 text-sm font-medium uppercase tracking-[0.3em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#C8A97E]">
                <UploadCloud
                  size={22}
                  className="transition duration-300 group-hover:rotate-12"
                />
                Dodaj zdjęcia
              </button>

              <p className="mt-6 text-sm italic text-neutral-500">
                Dziękujemy za każdą wspólnie uchwyconą chwilę 🤍
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
