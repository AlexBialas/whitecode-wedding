import Image from "next/image";
import { gallery } from "@/data/wedding";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#F8F7F4] py-32 md:py-40">
      <Container>
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* Tekst */}
          <Reveal className="order-2 lg:order-1">
            <div>
              <SectionTitle
                overline="NASZA HISTORIA"
                title="Każda wielka historia zaczyna się od jednego spotkania"
                description="To właśnie z tych chwil powstały wspomnienia, które na zawsze pozostaną w naszych sercach."
              />

              <blockquote className="mt-12 border-l-2 border-[#C8A97E] pl-6 leading-8 italic text-neutral-600">
                „Miłość nie polega na patrzeniu na siebie, lecz na patrzeniu
                razem w tym samym kierunku.”
              </blockquote>
            </div>
          </Reveal>

          {/* Zdjęcia */}
          <div className="order-1 grid grid-cols-2 gap-5 md:gap-6 lg:order-2">
            {/* Duże */}
            <Reveal delay={0.1}>
              <div className="row-span-2 cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-xl">
                <Image
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>

            {/* Prawe górne */}
            <Reveal delay={0.2}>
              <div className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg">
                <Image
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  width={700}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>

            {/* Lewe dolne */}
            <Reveal delay={0.3}>
              <div className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg">
                <Image
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>

            {/* Prawe dolne */}
            <Reveal delay={0.4}>
              <div className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg">
                <Image
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
