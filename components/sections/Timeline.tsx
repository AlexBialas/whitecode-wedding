import { Church, GlassWater, Music4 } from "lucide-react";

import { wedding } from "@/data/wedding";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white to-[#F8F7F4] py-32 md:py-40"
    >
      {/* Dekoracyjne tło */}
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-[#C8A97E]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C8A97E]/5 blur-3xl" />

      <Container>
        <Reveal>
          <SectionTitle
            overline="HARMONOGRAM"
            title="Plan naszego dnia"
            description="Nie możemy się doczekać, aby wspólnie z Wami przeżyć ten wyjątkowy dzień – od ceremonii aż po ostatni taniec."
            center
          />
        </Reveal>

        <div className="relative mt-24">
          {/* Linia na desktopie */}
          <div className="absolute left-0 right-0 top-24 hidden h-px bg-[#E9DFCF] lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* 01 */}
            <Reveal delay={0.1}>
              <div className="group relative rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#C8A97E] hover:shadow-2xl">
                <span className="absolute right-8 top-8 text-6xl font-thin text-[#C8A97E]/15">
                  01
                </span>

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition duration-300 group-hover:bg-[#C8A97E]">
                  <Church
                    size={34}
                    className="text-[#C8A97E] transition duration-300 group-hover:text-white"
                  />
                </div>

                <p className="mt-10 text-5xl font-extralight tracking-wide">
                  {wedding.ceremonyTime}
                </p>

                <h3 className="mt-5 text-2xl font-medium">Ceremonia</h3>

                <div className="mt-5 h-px w-16 bg-[#C8A97E]" />

                <p className="mt-6 leading-8 text-neutral-600">
                  {wedding.church}
                </p>
              </div>
            </Reveal>

            {/* 02 */}
            <Reveal delay={0.25}>
              <div className="group relative rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#C8A97E] hover:shadow-2xl">
                <span className="absolute right-8 top-8 text-6xl font-thin text-[#C8A97E]/15">
                  02
                </span>

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition duration-300 group-hover:bg-[#C8A97E]">
                  <GlassWater
                    size={34}
                    className="text-[#C8A97E] transition duration-300 group-hover:text-white"
                  />
                </div>

                <p className="mt-10 text-5xl font-extralight tracking-wide">
                  {wedding.receptionTime}
                </p>

                <h3 className="mt-5 text-2xl font-medium">Przyjęcie weselne</h3>

                <div className="mt-5 h-px w-16 bg-[#C8A97E]" />

                <p className="mt-6 leading-8 text-neutral-600">
                  {wedding.venue}
                </p>
              </div>
            </Reveal>

            {/* 03 */}
            <Reveal delay={0.4}>
              <div className="group relative rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#C8A97E] hover:shadow-2xl">
                <span className="absolute right-8 top-8 text-6xl font-thin text-[#C8A97E]/15">
                  03
                </span>

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition duration-300 group-hover:bg-[#C8A97E]">
                  <Music4
                    size={34}
                    className="text-[#C8A97E] transition duration-300 group-hover:text-white"
                  />
                </div>

                <p className="mt-10 text-5xl font-extralight tracking-wide">
                  Do rana
                </p>

                <h3 className="mt-5 text-2xl font-medium">Wspólna zabawa</h3>

                <div className="mt-5 h-px w-16 bg-[#C8A97E]" />

                <p className="mt-6 leading-8 text-neutral-600">
                  Niech ten wieczór będzie pełen tańca, śmiechu i wspomnień,
                  które zostaną z nami na zawsze.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
