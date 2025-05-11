import Image from "next/image";
import GsapInit from "./components/GsapInit";
import ParallaxImages from "./components/ParallaxImages";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <ParallaxImages />
    </main>
  );
}
