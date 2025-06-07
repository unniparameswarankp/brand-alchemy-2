"use client";

import { useEffect, useRef } from "react";

const WigglyTitle = () => {
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
        const maxDistance = 150;

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

  const title = "In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.";

  return (
    <div className="title-section">
      <h1 ref={containerRef} className="title-text">
        {title.split("").map((char, idx) => (
          <span key={idx} className="wiggle-letter">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default WigglyTitle;
