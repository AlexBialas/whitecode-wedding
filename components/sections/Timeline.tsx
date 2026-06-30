import { wedding } from "@/data/wedding";

export default function Timeline() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-heading text-5xl text-center mb-20">Plan dnia</h2>

        <div className="space-y-16">
          <div>
            <p className="text-5xl font-light">{wedding.ceremonyTime}</p>

            <h3 className="mt-4 text-2xl">Ceremonia</h3>

            <p className="mt-2 text-neutral-500">{wedding.church}</p>
          </div>

          <div>
            <p className="text-5xl font-light">{wedding.receptionTime}</p>

            <h3 className="mt-4 text-2xl">Przyjęcie weselne</h3>

            <p className="mt-2 text-neutral-500">{wedding.venue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
