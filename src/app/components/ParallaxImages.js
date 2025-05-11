"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const images = ["/img1.jpeg", "/img2.jpeg", "/img2.jpeg", "/img1.jpeg"];

export default function ParallaxImages() {
  // Create an array of refs for each image
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((image) => {
      gsap.to(image, {
        yPercent: 40, // Adjust this for the parallax movement
        ease: "none",
        scrollTrigger: {
          trigger: image.parentElement, // Trigger on the section containing the image
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className="flex flex-col justify-center gap-8 items-center">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="parallax-section round relative h-[70vh] w-[80vw] flex justify-center items-center overflow-hidden"
        >
          <img
            ref={(el) => (imageRefs.current[idx] = el)} // Assign refs to images
            src={src}
            alt=""
            className="w-full h-[130vh] object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
