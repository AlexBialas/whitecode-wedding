import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Timeline from "@/components/sections/Timeline";
import Location from "@/components/sections/Location";
import Upload from "@/components/sections/Upload";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Timeline />
      <Location />
      <Upload />
      <Footer />
    </main>
  );
}
