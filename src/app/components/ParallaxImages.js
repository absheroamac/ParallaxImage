"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import CardWrapper from "@/components/CardWrapper";
import Stars from "@/components/Stars";
import Button from "@/components/Button";

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

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const contentWrapper = container.firstChild;

    // Clone content twice initially for seamless scroll
    // for (let i = 0; i < 3; i++) {
    //   const clone = contentWrapper.cloneNode(true);
    //   container.appendChild(clone);
    // }

    // Initialize Lenis
    const lenis = new Lenis({
      wrapper: container,
      content: container.firstChild,
      smooth: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1,
      orientation: "vertical",
    });
    lenisRef.current = lenis;

    // Tell ScrollTrigger to use Lenis for scroll positions
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.style.transform ? "transform" : "fixed",
    });

    gsap.ticker.lagSmoothing(0);

    // Setup ScrollTrigger animations per card
    const cards = container.querySelectorAll(".parallax-card");
    cards.forEach((card) => {
      const img = card.querySelector(".object-cover");
      const details = card.querySelector(".details-container");
      const award = card.querySelector(".award-container");
      const button = card.querySelector(".button");
      const reviews = card.querySelectorAll(".review");
      if (!img) return;

      gsap.fromTo(
        img,
        { y: "-40%" },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            immediateRender: false,
          },
        }
      );

      gsap.fromTo(
        award,
        {
          y: "150%",
        },
        {
          y: "-150%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            immediateRender: false,
          },
        }
      );

      gsap.fromTo(
        button,
        {
          y: "500%",
        },
        {
          y: "-500%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            immediateRender: false,
          },
        }
      );

      gsap.fromTo(
        reviews,
        {
          y: "150%",
        },
        {
          y: "-150%",
          ease: "power2.inOut",
          stagger: 0.025,
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            immediateRender: false,
          },
        }
      );

      gsap.fromTo(
        details,
        {
          y: "150%",
        },
        {
          y: "-150%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            immediateRender: false,
          },
        }
      );
    });

    // Lenis animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Calculate initial scroll position
    const initialScroll =
      (container.scrollHeight - container.clientHeight) / 2 -
      window.innerHeight * 0.08;

    // Scroll to the middle
    lenis.scrollTo(initialScroll, { immediate: true });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
    // eslint-disable-next-line
  }, []);

  // Scroll by card height
  const scrollByCard = (direction) => {
    const container = containerRef.current;
    if (!container || !lenisRef.current) return;
    const card = container.querySelector(".parallax-card");
    if (!card) return;
    const cardHeight = card.offsetHeight + window.innerHeight * 0.08;
    lenisRef.current.scrollTo(
      lenisRef.current.scroll + (direction === "up" ? -cardHeight : cardHeight),
      {
        immediate: false,
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      }
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden"
        style={{ position: "relative" }}
      >
        <div className="relative my-0 p-0 mx-auto flex flex-col gap-0 items-center">
          {[...images, ...images, ...images].map((src, index) => (
            <div key={index} className="parallax-card my-[4vh] relative">
              <div className="absolute bottom-10  left-10 z-50 details-container ">
                <div className="flex flex-col justify-center items-center gap-5 mb-4">
                  <p className="p22 tracking-[2.9px] text-[9px] text-white">
                    DOCUMENTARY
                  </p>
                  <h1 className="font-myfont text-[46px] leading-none">
                    KAFKA'S LAST
                  </h1>
                </div>
                <div className="flex">
                  <div className="w-40">
                    <hr className="w-full" />
                    <h3 className="table-text ml-4">DIRECTOR</h3>
                    <hr className="w-full" />
                    <h3 className="table-text ml-14">YEAR</h3>
                    <hr className="w-full" />
                    <h3 className="table-text ml-8">CATEGORY</h3>
                    <hr className="w-full" />
                  </div>
                  <div className="w-40 flex flex-col justify-center items-center ">
                    <hr className="w-full" />
                    <h3 className="table-text">ELIRANPELED</h3>
                    <hr className="w-full " />
                    <h3 className="table-text">2025</h3>
                    <hr className="w-full" />
                    <h3 className=" table-text ">DOCUMENTARY</h3>
                    <hr className="w-full" />
                  </div>
                </div>
              </div>
              <div className="absolute top-10 left-10 z-50 award-container">
                <div className="flex flex-col items-center">
                  <h3 className="font-myfont text-[18px]">2024</h3>
                  <p className="font-myfont text-[10px]">WORLD PREMIERE</p>
                  <Image
                    src={"/award.webp"}
                    height={200}
                    width={200}
                    className="w-20"
                  />
                </div>
              </div>
              <div className="absolute top-10 right-10 z-50 details-container">
                <div className="flex flex-col justify-between h-[60vh]">
                  <div className="flex flex-col gap-0">
                    <div className="flex flex-col gap-3 items-center review">
                      <Stars width={70} />
                      <h3 className="p22 tracking-[2.9px] text-[11px]">
                        POV MAGAZINE
                      </h3>
                      <p className="font-myfont leading-none text-center text-[10px]">
                        &quot;TOUCHING AND <br /> INTIMATE&quot;
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 items-center review">
                      <Stars width={70} />
                      <h3 className="p22 tracking-[2.9px] text-[11px]">
                        POV MAGAZINE
                      </h3>
                      <p className="font-myfont leading-none text-center text-[10px]">
                        &quot;TOUCHING AND <br /> INTIMATE&quot;
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 items-center review">
                      <Stars width={70} />
                      <h3 className="p22 tracking-[2.9px] text-[11px]">
                        POV MAGAZINE
                      </h3>
                      <p className="font-myfont leading-none text-center text-[10px]">
                        &quot;TOUCHING AND <br /> INTIMATE&quot;
                      </p>
                    </div>
                  </div>
                  <div className="button">
                    <Button key={index} text={"EXPLORE"} />
                  </div>
                </div>
              </div>
              <CardWrapper>
                <div className="parallax-card w-[90vw] h-[70vh] mx-auto rounded-3xl overflow-hidden">
                  <Image
                    src={src}
                    width={1000}
                    height={2000}
                    className="w-full h-[100vh] object-cover object-center scale-105"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </CardWrapper>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={() => scrollByCard("down")}
        className="absolute cursor-pointer bottom-0 bg-gradient-to-t from-black to-transparent h-[10vh] w-[100vw]"
      ></div>
      <div
        onClick={() => scrollByCard("up")}
        className="absolute cursor-pointer top-0 bg-gradient-to-t to-black from-transparent h-[10vh] w-[100vw]"
      ></div>

      <Image
        src={"/Layer 2.png"}
        className="absolute z-[99] top-6 left-6 w-20"
        alt="image"
        width={450}
        height={200}
      />
    </div>
  );
}
