"use client";
import gsap from "gsap";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Button = ({ text, link = "/" }) => {
  useEffect(() => {
    gsap.set([".normalState", ".hoverState", "#blackArrow", "#whiteArrow"], {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(".hoverState", {
      yPercent: 50,
    });
    gsap.set("#blackArrow", {
      xPercent: -200,
    });

    // Set initial SVG styles
    gsap.set("#ticket-path", {
      fill: "none",
      stroke: "white",
      strokeWidth: 1,
    });
  });

  const handleMouseEnter = () => {
    gsap.to(".normalState", {
      yPercent: -150,
      duration: 0.2,
    });

    gsap.to(".hoverState", {
      yPercent: -50,
      duration: 0.2,
    });

    gsap.to("#blackArrow", {
      xPercent: -50,
      duration: 0.2,
    });

    gsap.to("#whiteArrow", {
      xPercent: 100,
      duration: 0.2,
    });

    // Animate SVG on mouse enter
    gsap.to("#ticket-path", {
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      duration: 0.2,
    });

    gsap.to("#dash-stroke", {
      stroke: "black",
      strokeWidth: 1,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".normalState", {
      yPercent: -50,
      duration: 0.2,
    });

    gsap.to(".hoverState", {
      yPercent: 50,
      duration: 0.2,
    });

    // Animate SVG on mouse leave
    gsap.to("#ticket-path", {
      fill: "none",
      stroke: "white",
      strokeWidth: 1,
      duration: 0.2,
    });

    gsap.to("#blackArrow", {
      xPercent: -200,
      duration: 0.2,
    });

    gsap.to("#whiteArrow", {
      xPercent: -50,
      duration: 0.2,
    });

    gsap.to("#dash-stroke", {
      stroke: "white",
      strokeWidth: 1,
    });
  };

  return (
    <div
      className="relative w-[140px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => redirect("/explore")}
    >
      <div className="text-container text-black z-50 absolute w-[96px] h-[45px] flex justify-center items-center">
        <div className="w-full relative h-[18px] overflow-hidden">
          <p className="text-[12px] font-myfont tracking-wider absolute text-white normalState">
            {text}
          </p>
          <p className="text-[12px] font-myfont tracking-wider absolute text-black hoverState">
            {text}
          </p>
        </div>
      </div>

      <div className="absolute overflow-hidden w-[32px] h-[35px] top-1/2 -translate-y-1/2  right-[6px] ">
        <div className="relative h-full w-full">
          <svg
            className="absolute "
            id="whiteArrow"
            width="18"
            viewBox="0 0 12 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.83716 1.9533V0.378906C13.343 1.48993 13.1047 8.79546 4.83716 9.91261V8.34543C7.48395 8.13647 8.90216 6.6824 9.13433 5.94234L0.701538 5.86405V4.12274H9.13433C8.1592 2.31178 5.76586 1.99684 4.83716 1.9533Z"
              fill="white"
            />
          </svg>
          <svg
            id="blackArrow"
            className="absolute"
            width="18"
            viewBox="0 0 12 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.83716 1.9533V0.378906C13.343 1.48993 13.1047 8.79546 4.83716 9.91261V8.34543C7.48395 8.13647 8.90216 6.6824 9.13433 5.94234L0.701538 5.86405V4.12274H9.13433C8.1592 2.31178 5.76586 1.99684 4.83716 1.9533Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      <svg width="140" viewBox="0 0 141 45" xmlns="http://www.w3.org/2000/svg">
        <path
          id="ticket-path"
          d="M93.4287 1.15918C93.6654 2.97618 95.1732 4.39392 97.0312 4.48828L97.2285 4.49316H97.2295C99.1767 4.49256 100.784 3.03991 101.029 1.15918H136.695C136.919 2.87652 138.279 4.23521 139.996 4.45898V40.4326C138.279 40.6564 136.919 42.016 136.695 43.7334H101.029C100.792 41.9163 99.2839 40.4986 97.4258 40.4043L97.2295 40.3994H97.2285C95.2808 40.3996 93.6738 41.8525 93.4287 43.7334H4.29785C4.07394 42.0159 2.7135 40.6564 0.996094 40.4326V4.45898C2.71342 4.23523 4.07395 2.87666 4.29785 1.15918H93.4287Z"
          fill="#D9D9D9"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M97.1564 4.81488V40.0772"
          id="dash-stroke"
          stroke="white"
          stroke-dasharray="4 4"
        />
      </svg>
    </div>
  );
};

export default Button;
