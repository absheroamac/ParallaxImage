"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import GSDevTools from "gsap/GSDevTools";

gsap.registerPlugin(SplitText, GSDevTools);

const TitleAnimation = ({ text }) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const repeatCount = 8;
    const tl = gsap.timeline({ paused: true });
    const split = new SplitText(headingRef.current, {
      type: "chars,words",
      smartWrap: true,
    });

    const directions = [];

    split.chars.forEach((char, i) => {
      const txt = char.innerText;
      const clone = document.createElement("div");
      clone.className = "cloneText";
      clone.textContent = txt;

      const original = document.createElement("div");
      original.className = "originalText";
      original.textContent = txt;

      char.innerHTML = "";
      char.appendChild(original);
      char.appendChild(clone);

      // Check last two directions to avoid more than 2 adjacent same directions
      const last1 = directions[i - 1];
      const last2 = directions[i - 2];
      let newDir;

      if (last1 === last2 && last1 !== undefined) {
        // If last two directions are the same, force opposite direction
        newDir = last1 === 100 ? -100 : 100;
      } else {
        // Otherwise, pick randomly between -100 and 100
        newDir = gsap.utils.random([-100, 100]);
      }

      directions.push(newDir);

      gsap.set(clone, {
        yPercent: newDir,
      });

      const tween = gsap.to(char.childNodes, {
        repeat: repeatCount,
        ease: "none",
        yPercent: newDir > 0 ? "-=100" : "+=100",
        delay: gsap.utils.random(0, 0.5),
      });

      tl.add(tween, 0);
    });

    gsap.to(tl, {
      progress: 1,
      repeat: -1,
      delay: 2,
      repeatDelay: 4,
      duration: 3,
      stagger: 1,
      ease: "expo.out",
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <h1 className="heading-text max-w-70 text-center" ref={headingRef}>
      {text}
    </h1>
  );
};

export default TitleAnimation;
