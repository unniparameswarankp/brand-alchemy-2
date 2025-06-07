"use client";

import { useEffect, useRef } from "react";

const Cube3D = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll(".wiggle-letter");

    const handleMouseMove = (e: MouseEvent) => {
      if (!letters) return;

      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 50;

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * (maxDistance - distance);
          const moveY = Math.sin(angle) * (maxDistance - distance);
          (letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          (letter as HTMLElement).style.transform = "translate(0, 0)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const title = "Own Your Identity";

  useEffect(() => {
    const cube = cubeRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const rotateX = ((e.clientY / innerHeight) - 0.5) * -30;
      const rotateY = ((e.clientX / innerWidth) - 0.5) * 30;

      if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="h-screen flex align-center justify-center">
    <div className="scene">
      <div className="cube" ref={cubeRef}>
        <div className="face front">
          <h1 ref={containerRef} className="title-text font-light">
            {title.split("").map((char, idx) => (
              <span key={idx} className="wiggle-letter">
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="face back"></div>
        {/* <div className="face right">Right</div>
        <div className="face left">Left</div>
        <div className="face top">Top</div>
        <div className="face bottom">Bottom</div> */}
      </div>
    </div>
    </div>
  );
};

export default Cube3D;
