import Image from "next/image";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading text-5xl text-center mb-16">
          Nasza historia
        </h2>

        <div className="space-y-10">
          <Image
            src="/images/gallery-1.jpg"
            alt=""
            width={1200}
            height={1600}
            className="rounded-3xl w-full object-cover"
          />

          <Image
            src="/images/gallery-2.jpg"
            alt=""
            width={1200}
            height={1600}
            className="rounded-3xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
