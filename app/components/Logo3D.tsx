"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Logo3D() {
  const logoRef = useRef(null);

  useEffect(() => {
    const logo = logoRef.current;

    // 🔁 Auto rotation (slow 3D effect)
    const rotateTl = gsap.timeline({ repeat: -1, yoyo: true });
    rotateTl
      .to(logo, {
        rotateY: 15,
        rotateX: -15,
        scale: 0.95,
        duration: 5,
        ease: "sine.inOut",
      })
      .to(logo, {
        rotateY: -15,
        rotateX: 15,
        scale: 1.05,
        duration: 5,
        ease: "sine.inOut",
      });

    // 📌 Snap logo to position per section
    const moveLogo = (top: string, left: string, xPercent: number, yPercent: number) => {
      gsap.to(logo, {
        top,
        left,
        xPercent,
        yPercent,
        position: "absolute",
        duration: 1,
        ease: "power3.out",
      });
    };

    const triggers = [
      { id: "#section0", top: "0%", left: "50%", x: -50, y: -50 },
      { id: "#section1", top: "50%", left: "50%", x: -50, y: -50 },
      { id: "#section2", top: "50%", left: "0%", x: 0, y: -50 },
      { id: "#section3", top: "50%", left: "100%", x: -100, y: -50 },
      { id: "#section4", top: "50%", left: "0%", x: 0, y: -50 },
    ];

    triggers.forEach(({ id, top, left, x, y }) => {
      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        onEnter: () => moveLogo(top, left, x, y),
        onEnterBack: () => moveLogo(top, left, x, y),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none ba-3d"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Logo"
        className="absolute"
        style={{
          top: "50%",
          left: "10%",
          transform: "translateY(-50%)",
          opacity: 0.05,
          width: "50vw",
          height: "auto",
        }}
      />
    </div>
  );
}
