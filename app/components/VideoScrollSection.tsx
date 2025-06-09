'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const title = "Own Your Identity.";

  // Wiggling effect based on mouse movement
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
          const moveX = Math.cos(angle) * (maxDistance - distance) * 0.5;
          const moveY = Math.sin(angle) * (maxDistance - distance) * 0.5;
          (letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          (letter as HTMLElement).style.transform = "translate(0, 0)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ScrollTrigger logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        y: '-20vh',
        scale: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=50%',
        scrub: true,
        pin: titleRef.current,
        onUpdate: (self) => {
          if (titleRef.current) {
            titleRef.current.style.opacity = `${1 - self.progress}`;
            titleRef.current.style.transform = `translateY(${-150 * self.progress}px)`;
          }
        },
      });

      // Subtle independent wiggle using GSAP
      const letters = containerRef.current?.querySelectorAll(".wiggle-letter");
      if (letters) {
        letters.forEach((letter, i) => {
          gsap.to(letter, {
            y: "+=1.5",
            x: "+=1",
            rotation: "+=1",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 0.3 + Math.random() * 0.3,
            delay: i * 0.05,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id='#section0' ref={containerRef} className="relative h-[200vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="video-wrapper absolute top-0 left-0 w-full h-screen" ref={videoRef}>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          src="/videos/banner1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Title Overlay */}
      <div className="h-screen flex items-center justify-center pointer-events-none">
        <h1
          ref={titleRef}
          className="text-white text-5xl md:text-7xl font-light flex tracking-widest pt-10"
        >
          {title.split("").map((char, i) => (
            <span key={i} className="wiggle-letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
