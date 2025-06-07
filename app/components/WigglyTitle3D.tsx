"use client";

import { useEffect, useRef } from "react";

const WigglyTitle3D = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleLetters = titleRef.current?.querySelectorAll(".wiggle-letter");
    const paraLetters = paragraphRef.current?.querySelectorAll(".wiggle-letter");

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;

      // Rotate whole box
      if (boxRef.current) {
        boxRef.current.style.transform = `rotateX(${dy * -10}deg) rotateY(${dx * 10}deg)`;
      }

      const wiggle = (letters: NodeListOf<Element> | undefined) => {
        letters?.forEach((letter) => {
          const rect = letter.getBoundingClientRect();
          const lx = rect.left + rect.width / 2;
          const ly = rect.top + rect.height / 2;
          const deltaX = e.clientX - lx;
          const deltaY = e.clientY - ly;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const maxDistance = 100;

          if (distance < maxDistance) {
            const angle = Math.atan2(deltaY, deltaX);
            const moveX = Math.cos(angle) * (maxDistance - distance);
            const moveY = Math.sin(angle) * (maxDistance - distance);
            (letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          } else {
            (letter as HTMLElement).style.transform = "translate(0, 0)";
          }
        });
      };

      wiggle(titleLetters);
      wiggle(paraLetters);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const title = "Own Your Identity.";
  const paragraph = "In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.";

  return (
    <div className="title-section flex align-center text-center">
        <div className="ba-container">
      <div className="title-box" ref={boxRef}>
        <h1 ref={titleRef} className="title-text font-light mb-10">
          {title.split("").map((char, idx) => (
            <span key={idx} className="wiggle-letter">
              {char}
            </span>
          ))}
        </h1>
        <p ref={paragraphRef} className="subtitle text-3xl	font-light">
          {paragraph.split("").map((char, idx) => (
            <span key={idx} className="wiggle-letter">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
      </div>
    </div>
  );
};

export default WigglyTitle3D;
