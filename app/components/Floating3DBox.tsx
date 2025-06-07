'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveTitle() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const idleAngle = useRef(0);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  const title = 'ALCHEMY';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      idleAngle.current += 0.02;

      const idleX = Math.sin(idleAngle.current) * 10;
      const idleY = Math.cos(idleAngle.current) * 10;

      const mouseOffsetX = (mousePos.current.x - 0.5) * 30;
      const mouseOffsetY = (mousePos.current.y - 0.5) * 30;

      const rotateX = idleY + mouseOffsetY;
      const rotateY = idleX + mouseOffsetX;

      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          const delay = index * 0.1;
          const angleX = rotateX + Math.sin(idleAngle.current + delay) * 5;
          const angleY = rotateY + Math.cos(idleAngle.current + delay) * 5;

          letter.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black mag-tp--100vh" >
      <h1 className="text-6xl font-bold text-white tracking-widest flex gap-2">
        {title.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className="inline-block transition-transform duration-200"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
