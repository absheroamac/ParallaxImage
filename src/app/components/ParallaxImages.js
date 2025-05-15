"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
];

export default function ParallaxSlider() {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  const infiniteImages = [
    ...images.slice(-4),
    ...images,
    ...images.slice(0, 4),
  ];

  // Lenis setup
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Lenis
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstChild,
      infinite: true,
      smooth: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1,
      orientation: "vertical",
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    // GSAP Parallax on scroll
    lenis.on("scroll", ({ scroll }) => {
      applyParallax(scroll);
    });

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // const totalHeight = containerRef.current.firstChild.scrollHeight;
    // console.log(totalHeight);
    // lenis.scrollTo(totalHeight / 2, { immediate: true });

    const container = containerRef.current;
    const viewportHeight = container.clientHeight;
    const viewportWidth = container.clientWidth;
    const contentHeight = container.firstChild.scrollHeight;
    const margin = window.innerHeight * 0.04; // 4vh in pixels
    const centerPosition = (contentHeight - viewportHeight) / 2 + margin;
    const cardHeight = window.innerHeight * 0.74;

    lenis.on("scroll", ({ scroll }) => {
      // When reaching the bottom of the content
      if (scroll >= contentHeight - viewportHeight) {
        lenis.scrollTo(centerPosition + cardHeight, { immediate: true });
      }
      // When reaching the top of the content
      else if (scroll <= 0) {
        lenis.scrollTo(centerPosition, { immediate: true });
      }
    });

    // Scroll to center
    lenis.scrollTo(centerPosition, {
      immediate: false,
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
    });

    return () => {
      lenis.destroy();
    };
    // eslint-disable-next-line
  }, []);

  // Parallax logic (adjust as needed)
  const applyParallax = (scrollTop) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".parallax-card");
    cards.forEach((card) => {
      const img = card.querySelector(".object-cover");
      if (!img) return;
      // Example: move image based on scroll position

      gsap.set(img, {
        objectPosition: "center center",
        y: "-40%",
      });

      gsap.to(
        img,

        {
          y: "20%",

          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            immediateRender: true,
          },
        }
      );
    });
  };

  // Button scroll (Lenis API)
  const scrollByCard = (direction) => {
    const container = containerRef.current;
    if (!container || !lenisRef.current) return;
    const card = container.querySelector(".parallax-card");
    if (!card) return;
    const cardHeight = card.offsetHeight + window.innerHeight * 0.04;
    lenisRef.current.scrollTo(
      lenisRef.current.scroll + (direction === "up" ? -cardHeight : cardHeight),
      { immediate: false, duration: 1 }
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden"
        style={{ position: "relative" }}
      >
        <div className="relative">
          {infiniteImages.map((src, index) => (
            <div
              key={index}
              className="parallax-card w-[80vw] h-[70vh] mx-auto rounded-3xl overflow-hidden my-[4vh]"
            >
              <Image
                src={src}
                width={1000}
                height={2000}
                className="w-full h-[100vh] object-cover object-center scale-105"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute z-50 top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded"
        onClick={() => scrollByCard("up")}
      >
        Prev
      </button>
      <button
        className="absolute z-50 top-4 left-24 bg-amber-600 text-white px-4 py-2 rounded"
        onClick={() => scrollByCard("down")}
      >
        Next
      </button>
    </div>
  );
}
