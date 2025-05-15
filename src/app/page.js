import Image from "next/image";
import GsapInit from "./components/GsapInit";
import ParallaxImages from "./components/ParallaxImages";
import LoadingScreen from "./components/LoadingScreen";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* <Button /> */}
      {/* <LoadingScreen /> */}
      <ParallaxImages />
    </main>
  );
}
