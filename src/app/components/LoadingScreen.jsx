"use client";

import Button from "@/components/Button";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    gsap.set(".loading-tile", {
      x: "0%",
    });

    gsap.set(".tagline", {
      scale: 0.9,
      filter: "blur(20px)",
    });

    gsap.set(".logo", {
      scale: 0.8,
      opacity: 0,
    });

    gsap.to(".loading-tile", {
      x: "+101%",
      duration: 2,
    });

    gsap.to(".logo", {
      scale: 1,
      opacity: 100,
      duration: 3,
    });

    gsap.to(".tagline", {
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      delay: 1.5,
    });
  });
  return (
    <div className="grid relative grid-cols-18 gap-0 h-screen bg-white">
      <Image
        src={"/Layer 2.png"}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference logo z-40"
        width={600}
        height={450}
      />
      <Image
        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-40 tagline mix-blend-difference z-40"
        src={"/tagline.png"}
        width={600}
        height={100}
        alt="Tagline"
      />
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
        <Button text={"ENTER"} className />
      </div>

      {Array.from({ length: 18 }).map((_, index) => (
        <div
          key={index}
          className="bg-black h-full overflow-hidden flex items-center justify-center text-white"
        >
          <div className="w-full h-full bg-white loading-tile "></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingScreen;
