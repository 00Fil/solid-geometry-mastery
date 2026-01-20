import Beams from "@/components/Beams";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black selection:bg-lotus-purple selection:text-white">
      <Navbar />
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#5227FF"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Hero Layer */}
      <Hero />

    </main>
  );
}
