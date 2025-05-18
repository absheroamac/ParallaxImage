"use client";

import { Howl, Howler } from "howler";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Menu = () => {
  const clipPathRef = useRef(null);
  const [expanded, setIsExpanded] = useState(false);
  const ContainerclipPathRef = useRef(null);
  const expandSound = useRef(null);
  useEffect(() => {
    expandSound.current = new Howl({
      src: ["/menu/expand.mp3"], // Path to your sound file in the public folder
    });
    gsap.set(clipPathRef.current, {
      attr: {
        height: 0, // Initially hidden
        y: 100, // Start from the bottom
      },
    });

    gsap.set(ContainerclipPathRef.current, {
      attr: {
        height: 0, // Initially hidden
        y: 0, // Start from the bottom
      },
    });
  }, []);

  useEffect(() => {
    if (expanded) {
      if (expandSound.current) {
        expandSound.current.play();
      }

      gsap.to(ContainerclipPathRef.current, {
        duration: 1,
        attr: {
          height: 326, // Expand to full height
          yPercent: 100, // Move to the top
        },
        ease: "power2.inOut",
      });

      gsap.to(".dash-1", {
        rotate: -45,
        width: "30%",
        y: +4,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(".dash-3", {
        rotate: 45,
        width: "30%",
        y: -4,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(".dash-2", {
        width: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        ".menu-text",
        { y: "100%", opacity: 1 }, // Start from bottom and transparent
        {
          y: "0%",
          delay: 0.5,
          duration: 0.5,
          stagger: 0.05, // Stagger duration
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".link",
        { y: "100%", opacity: 1 }, // Start from bottom and transparent
        {
          y: "0%",
          delay: 0.7,
          duration: 0.5,
          stagger: 0.05, // Stagger duration
          ease: "power2.out",
        }
      );

      gsap.to(".card-title", {
        yPercent: -100,
        ease: "power2.inOut",
      });

      gsap.to(".card-image", {
        xPercent: -200,
        ease: "power2.inOut",
      });

      gsap.to(".card-details", {
        yPercent: 100,
        ease: "power2.inOut",
      });

      gsap.to(".arrow-icon", {
        rotate: 180,
        opacity: 0,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(ContainerclipPathRef.current, {
        duration: 0.5,
        attr: {
          height: 0, // Expand to full height
          yPercent: 0, // Move to the top
        },
        ease: "power2.inOut",
      });

      gsap.to(".dash-1", {
        rotate: 0,
        width: "40%",
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(".dash-3", {
        rotate: 0,
        width: "40%",
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(".dash-2", {
        width: "40%",
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(".menu-text", {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "power2.inOut",
      });

      gsap.to(".card-title", {
        yPercent: 0,
        ease: "power2.inOut",
      });

      gsap.to(".card-image", {
        xPercent: 0,
        ease: "power2.inOut",
      });

      gsap.to(".card-details", {
        yPercent: 0,
        ease: "power2.inOut",
      });

      gsap.to(".arrow-icon", {
        rotate: 0,
        opacity: 1,
        ease: "power2.inOut",
      });
    }
  }, [expanded]);
  const onExpand = () => {};

  const onMouseEnter = () => {
    gsap.to(clipPathRef.current, {
      duration: 1,
      attr: {
        height: 100, // Expand to full height
        y: 0, // Move to the top
      },
      ease: "power2.inOut",
    });
  };

  const onMouseLeave = () => {
    gsap.to(clipPathRef.current, {
      attr: {
        height: 0, // Initially hidden
        y: 100, // Start from the bottom
      },
    });
  };

  return (
    <div className="relative flex flex-col ">
      <div className="w-[223px] overflow-hidden top-0 left-0 text-black absolute flex flex-col justify-between z-100 h-[100px]">
        <div className="p-4 flex justify-between">
          <div className="flex justify-start gap-3">
            <div className="w-[33px] h-[33px] card-image overflow-hidden rounded-[5px]">
              <Image
                src={"/img2.jpg"}
                width={500}
                height={500}
                className="object-cover  w-[33px] h-[33px] rounded-20"
              />
            </div>
            <h3 className="font-myfont card-title">ANA MAXIM</h3>
          </div>
          <div>
            <svg
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
              className="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.22192 1.66913L6.03294 6.24837C6.79859 6.97713 7.99914 6.98427 8.7734 6.26466L13.7179 1.66913"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="grid card-details grid-cols-5 border-t-1">
          <div className="tracking-wider font-myfont col-span-2 p-2 border-r-1 text-[8px] flex justify-center items-center">
            <p className="tracking-widest text-[8px]">SHORT FILM</p>
          </div>
          <div className=" font-myfont  col-span-1 border-r-1 text-[8px] flex justify-center items-center">
            <p className="tracking-widest">2024</p>
          </div>
          <div className="tracking-wider font-myfont col-span-2  flex justify-center items-center">
            <p className="tracking-widest text-[8px]"> MIN 27</p>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-[100px] cursor-pointer h-[100px] flex flex-col gap-[3px] justify-center overflow-hidden items-center absolute z-100 right-0"
      >
        {/* <div className="w-[100px] h-[100px] absolute  left-0 bg-[#D6D3CC] hoverShadow"></div> */}
        <div className="rounded-full bg-black w-[40%] h-[2px] dash-1"></div>
        <div className="rounded-full bg-black w-[40%] h-[2px] dash-2"></div>
        <div className="rounded-full bg-black w-[40%] h-[2px] dash-3"></div>
      </div>
      <div
        className="absolute z-100 w-[320px] flex flex-col gap-1 h-[326px]  bottom-0 container-content"
        style={{ clipPath: "url(#container-clip-path)" }}
      >
        <div className="text-black p-5 py-3 flex flex-col ">
          <div className="mask overflow-hidden">
            <div className="flex items-end gap-2 -mb-2 menu-text">
              <p className="text-[12px] mb-3">01</p>
              <Link href={"/explore"}>
                <h3 className="font-myfont text-[32px]">WORK</h3>
              </Link>
            </div>
          </div>
          <div className="mask overflow-hidden">
            <div className="flex items-end gap-2 -mb-2 menu-text">
              <p className="text-[12px] mb-3">02</p>
              <Link href={"/explore"}>
                <h3 className="font-myfont text-[32px]">ABOUT</h3>
              </Link>
            </div>
          </div>
          <div className="mask overflow-hidden">
            <div className="flex items-end gap-2 -mb-2 menu-text">
              <p className="text-[12px] mb-3">03</p>
              <Link href={"/explore"}>
                <h3 className="font-myfont text-[32px]">CONTACT</h3>
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-black opacity-25" />
        <div className="flex p-4 gap-10 py-4 opacity-50 tracking-widest font-myfont text-gray-700 text-[12px]">
          <Link className="overflow-hidden" href={"/"}>
            <p className="link">COOKIE</p>
          </Link>
          <Link className="overflow-hidden" href={"/"}>
            <p className="link">TERMS</p>
          </Link>
          <Link className="overflow-hidden" href={"/"}>
            <p className="link"> PRIVACY</p>
          </Link>
        </div>
        <hr className="border-black opacity-25" />
        <div className="flex p-4 items-center gap-6 font-myfont text-gray-700 text-[12px]">
          <Image
            src={"/menu/social media/instagram.png"}
            width={12}
            height={12}
            alt="instagram button"
            className="w-5 h-5"
          />

          <Image
            src={"/menu/social media/facebook.png"}
            width={12}
            height={12}
            alt="instagram button"
            className=" w-4 h-4 "
          />
          <Image
            src={"/menu/social media/linkedin.png"}
            width={12}
            height={12}
            alt="instagram button"
            className=" w-4 h-4 "
          />
        </div>
        <hr className="border-black opacity-25" />
        <div className="text-black flex p-4 px-5 items-center">
          <p className="text-[10px] tracking-widest">
            ©2024. SIENA FILM FOUNDATION.
          </p>
        </div>
      </div>
      <svg
        width="320"
        viewBox="0 0 257 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative overflow-hidden"
      >
        <path
          d="M172.299 0.826111C172.299 4.57179 175.335 7.60811 179.081 7.60834L179.082 7.60736V7.60834C182.711 7.60811 185.674 4.7584 185.855 1.17474L185.864 0.826111H249.081C249.081 4.57187 252.118 7.60824 255.863 7.60834C256.045 7.60832 256.226 7.598 256.404 7.58392V73.081C256.226 73.0669 256.045 73.0585 255.863 73.0585C252.118 73.0586 249.081 76.095 249.081 79.8408H185.864C185.864 76.212 183.014 73.249 179.431 73.0673L179.082 73.0585H179.081C175.335 73.0588 172.299 76.0951 172.299 79.8408H7.07227C7.07227 76.212 4.22227 73.249 0.638672 73.0673L0.290039 73.0585V7.60834C3.91874 7.60811 6.88202 4.7584 7.06348 1.17474L7.07227 0.826111H172.299Z"
          fill="#FAF7EF"
          className="overflow-hidden"
        >
          <div className="w-[100px] h-[100px] absolute  left-0 bg-[#D6D3CC] hoverShadow"></div>
        </path>
        <path
          d="M179.394 7.18628L179.394 73.1299"
          stroke="black"
          stroke-dasharray="1.5 1.5"
        />
      </svg>

      <svg
        width="100"
        height="100"
        viewBox="0 0 76 76"
        className="absolute top-0 right-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="clip-path">
            <rect
              x="0"
              y="0"
              width="100"
              height="0" // Initial height
              ref={clipPathRef}
            />
          </clipPath>
        </defs>
        <path
          d="M68.2707 0.891235C68.2707 4.08115 71.1987 6.66693 74.8106 6.66693C74.9859 6.66692 75.1594 6.65893 75.3312 6.64697V69.5736C75.1594 69.5617 74.9859 69.5545 74.8106 69.5545C71.8057 69.5545 68.2707 70.213 68.2707 75.3302H8.83148C8.83148 70.4844 5.36198 68.5019 0.772976 68.5019L0.69043 6.97465L0.691261 6.97548C4.19042 6.97543 7.12964 4.24004 7.30461 1.18813L7.31293 0.891235L68.2707 0.891235Z"
          fill="#D9D9D9"
          clipPath="url(#clip-path)"
        />
      </svg>

      <svg
        width="320"
        viewBox="0 0 257 262"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="container-clip-path">
            <rect
              x="0"
              y="0"
              width="320"
              height="0" // Initial height
              ref={ContainerclipPathRef}
            />
          </clipPath>
        </defs>
        <path
          d="M172.299 0.575256C172.299 4.32094 175.335 7.35725 179.081 7.35748C182.71 7.35748 185.674 4.5077 185.855 0.923889L185.864 0.575256H249.081C249.081 4.32102 252.118 7.35738 255.863 7.35748C256.045 7.35748 256.226 7.34716 256.404 7.33307V254.979C256.226 254.964 256.045 254.955 255.863 254.955C252.118 254.955 249.081 257.992 249.081 261.737H7.07227C7.07217 258.109 4.22239 255.145 0.638672 254.964L0.290039 254.955V7.35748C3.91891 7.35745 6.88202 4.50767 7.06348 0.923889L7.07227 0.575256H172.299Z"
          fill="#FAF7EF"
          clipPath="url(#container-clip-path)"
        />
      </svg>
    </div>
  );
};

export default Menu;
