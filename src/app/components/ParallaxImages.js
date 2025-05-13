"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useState } from "react";

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
];

export default function ParallaxSlider() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [next, setNext] = useState(1);

  const infiniteImages = [
    images[totalSlides - 4],
    images[totalSlides - 3],
    images[totalSlides - 2], // Clone second-to-last image
    images[totalSlides - 1], // Clone last image
    ...images,
    images[0], // Clone first image
    images[1], // Clone second image
    images[2],
    images[3],
  ];

  useEffect(() => {
    gsap.set(containerRef.current, {
      top: "50%",
      yPercent: -50,
      xPercent: -50,
    });
  }, []);

  useEffect(() => {
    if (currentIndex === -5 || currentIndex === 5) {
      console.log("Triggered");
      gsap.to(containerRef.current, {
        y: 0,
        yPercent: -50,
        duration: 0,
      });
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const handlePrev = () => {
    gsap.to(containerRef.current, {
      y: "+=74vh",
    });

    gsap.to("object-cover", {
      y: "-20%",
    });

    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    gsap.to(containerRef.current, {
      y: "-=74vh",
    });

    gsap.to("object-cover", {
      y: "+=20%",
    });

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <button className="text-white bg-amber-500 p-4" onClick={handlePrev}>
        Prev
      </button>

      <button className="text-white bg-amber-600 p-4" onClick={handleNext}>
        Next
      </button>

      <div
        ref={containerRef}
        className="absolute left-1/2 -translate-x-1/2   overflow-hidden "
      >
        {infiniteImages.map((src, index) => (
          <div
            id={index}
            key={index}
            className={`w-[80vw] h-[70vh] rounded-4xl overflow-hidden my-[4vh]`}
          >
            <Image
              src={src}
              width={1000}
              height={1000}
              className="w-full scale-105 object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
