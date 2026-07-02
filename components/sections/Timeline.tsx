import { Church, GlassWater, Music4 } from "lucide-react";
import { wedding } from "@/data/wedding";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Timeline() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8F7F4] py-32">
      <Container>
        <SectionTitle
          overline="HARMONOGRAM"
          title="Plan naszego dnia"
          description="Chcemy, abyście mogli przeżywać ten dzień razem z nami od pierwszej do ostatniej chwili."
          center
        />

        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {/* 01 */}
          <div className="group rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <span className="text-sm font-medium tracking-[0.4em] text-[#C8A97E]">
              01
            </span>

            <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
              <Church
                size={34}
                className="text-[#C8A97E] transition group-hover:text-white"
              />
            </div>

            <p className="mt-10 text-5xl font-extralight tracking-wide">
              {wedding.ceremonyTime}
            </p>

            <h3 className="mt-6 text-2xl font-medium">Ceremonia</h3>

            <div className="mt-6 h-px w-16 bg-[#C8A97E]" />

            <p className="mt-6 leading-8 text-neutral-600">{wedding.church}</p>
          </div>

          {/* 02 */}

          <div className="group rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <span className="text-sm font-medium tracking-[0.4em] text-[#C8A97E]">
              02
            </span>

            <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
              <GlassWater
                size={34}
                className="text-[#C8A97E] transition group-hover:text-white"
              />
            </div>

            <p className="mt-10 text-5xl font-extralight tracking-wide">
              {wedding.receptionTime}
            </p>

            <h3 className="mt-6 text-2xl font-medium">Przyjęcie</h3>

            <div className="mt-6 h-px w-16 bg-[#C8A97E]" />

            <p className="mt-6 leading-8 text-neutral-600">{wedding.venue}</p>
          </div>

          {/* 03 */}

          <div className="group rounded-[36px] border border-[#E9DFCF] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
            <span className="text-sm font-medium tracking-[0.4em] text-[#C8A97E]">
              03
            </span>

            <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F7F4] transition group-hover:bg-[#C8A97E]">
              <Music4
                size={34}
                className="text-[#C8A97E] transition group-hover:text-white"
              />
            </div>

            <p className="mt-10 text-5xl font-extralight tracking-wide">
              Do rana
            </p>

            <h3 className="mt-6 text-2xl font-medium">Wspólna zabawa</h3>

            <div className="mt-6 h-px w-16 bg-[#C8A97E]" />

            <p className="mt-6 leading-8 text-neutral-600">
              Niech ten wieczór będzie pełen tańca, śmiechu i pięknych
              wspomnień.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
