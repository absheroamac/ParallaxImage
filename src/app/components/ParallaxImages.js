"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
];

export default function ParallaxSlider() {
  const containerRef = useRef(null);

  const infiniteImages = [
    images[images.length - 4],
    images[images.length - 3],
    images[images.length - 2],
    images[images.length - 1],
    ...images,
    images[0],
    images[1],
    images[2],
    images[3],
  ];

  // Adjusted logic to ensure the card is vertically centered in the viewport
  useEffect(() => {
    const container = containerRef.current;

    // Set initial scroll position to the middle of the container
    const cardHeight = container.firstChild.offsetHeight + 32; // Card height + margin
    const viewportHeight = container.clientHeight;
    const offsetToCenter = (viewportHeight - cardHeight) / 2; // Calculate offset to center the card

    container.scrollTop =
      Math.floor(container.scrollHeight / 2 / cardHeight) * cardHeight -
      offsetToCenter;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Infinite scroll logic
      if (scrollTop <= 0) {
        container.scrollTop = scrollHeight / 2 - clientHeight;
      } else if (scrollTop + clientHeight >= scrollHeight) {
        container.scrollTop = scrollHeight / 2;
      }

      // Identify active, previous, and next cards
      const cards = Array.from(container.children);
      const activeIndex = Math.round((scrollTop + offsetToCenter) / cardHeight);

      cards.forEach((card, index) => {
        const image = card.querySelector(".object-cover");

        if (index === activeIndex) {
          // Active card parallax effect
          const offset = ((scrollTop + offsetToCenter) % cardHeight) * 0.2;
          gsap.to(image, {
            y: -offset, // Move up when scrolling down, down when scrolling up
            duration: 0.5,
            ease: "power2.out",
          });
        } else if (index === activeIndex - 1 || index === activeIndex + 1) {
          // Previous and next cards parallax effect
          const offset = ((scrollTop + offsetToCenter) % cardHeight) * 0.1;
          gsap.to(image, {
            y: index < activeIndex ? offset : -offset, // Adjust direction based on position
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          // Reset image position for cards out of view
          gsap.to(image, {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ensure the card is centered programmatically
  const handleNext = () => {
    const container = containerRef.current;
    const cardHeight = container.firstChild.offsetHeight + 32; // Card height + margin
    gsap.to(container, {
      scrollTo: { y: container.scrollTop + cardHeight },
      duration: 0.5,
      onComplete: () => {
        // Ensure the active card is centered
        const activeIndex = Math.round(container.scrollTop / cardHeight);
        const targetScroll = activeIndex * cardHeight;
        gsap.to(container, {
          scrollTo: { y: targetScroll },
          duration: 0.2,
        });
      },
    });
  };

  const handlePrev = () => {
    const container = containerRef.current;
    const cardHeight = container.firstChild.offsetHeight + 32; // Card height + margin
    gsap.to(container, {
      scrollTo: { y: container.scrollTop - cardHeight },
      duration: 0.5,
      onComplete: () => {
        // Ensure the active card is centered
        const activeIndex = Math.round(container.scrollTop / cardHeight);
        const targetScroll = activeIndex * cardHeight;
        gsap.to(container, {
          scrollTo: { y: targetScroll },
          duration: 0.2,
        });
      },
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <button
        className="text-white absolute z-50 bg-amber-500 p-4"
        onClick={handlePrev}
      >
        Prev
      </button>

      <button
        className="text-white absolute left-20 z-50 bg-amber-600 p-4"
        onClick={handleNext}
      >
        Next
      </button>

      <div
        ref={containerRef}
        className="h-full overflow-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {infiniteImages.map((src, index) => (
          <div
            key={index}
            className="w-[80vw] h-[70vh] rounded-4xl overflow-hidden my-[4vh]"
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
