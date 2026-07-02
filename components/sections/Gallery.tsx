"use client";

import { useState } from "react";
import Image from "next/image";

import { gallery } from "@/data/wedding";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage === null) return;

    setSelectedImage((selectedImage + 1) % gallery.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;

    setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length);
  };

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-24 bg-[#F8F7F4] py-32 md:py-40"
      >
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

                <blockquote className="mt-12 border-l-2 border-[#C8A97E] pl-6 italic leading-8 text-neutral-600">
                  „Miłość nie polega na patrzeniu na siebie, lecz na patrzeniu
                  razem w tym samym kierunku.”
                </blockquote>
              </div>
            </Reveal>

            {/* Zdjęcia */}

            <div className="order-1 grid grid-cols-2 gap-5 md:gap-6 lg:order-2">
              {/* 1 */}

              <Reveal delay={0.1}>
                <div
                  onClick={() => setSelectedImage(0)}
                  className="row-span-2 cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-xl"
                >
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>

              {/* 2 */}

              <Reveal delay={0.2}>
                <div
                  onClick={() => setSelectedImage(1)}
                  className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg"
                >
                  <Image
                    src={gallery[1].src}
                    alt={gallery[1].alt}
                    width={700}
                    height={500}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>

              {/* 3 */}

              <Reveal delay={0.3}>
                <div
                  onClick={() => setSelectedImage(2)}
                  className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg"
                >
                  <Image
                    src={gallery[2].src}
                    alt={gallery[2].alt}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>

              {/* 4 */}

              <Reveal delay={0.4}>
                <div
                  onClick={() => setSelectedImage(3)}
                  className="cursor-pointer overflow-hidden rounded-[32px] border border-white shadow-lg"
                >
                  <Image
                    src={gallery[3].src}
                    alt={gallery[3].alt}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Lightbox
        images={gallery}
        index={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
