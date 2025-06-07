'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function Hexagon3D() {
  const hexRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null); // invisible drag target

  useEffect(() => {
    let proxy = { rotationY: 0 };

    Draggable.create(dragRef.current!, {
      type: 'x',
      inertia: true,
      onDrag: function () {
        proxy.rotationY = this.x;
        if (hexRef.current) {
          gsap.to(hexRef.current, {
            rotationY: proxy.rotationY,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      },
      onThrowUpdate: function () {
        proxy.rotationY = this.x;
        if (hexRef.current) {
          gsap.to(hexRef.current, {
            rotationY: proxy.rotationY,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      },
    });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Draggable invisible div */}
      <div ref={dragRef} className="absolute w-full h-full top-0 left-0 cursor-grab z-10" />

      {/* 3D Hexagon */}
      <div
        ref={hexRef}
        className="w-40 h-40 bg-gradient-to-br from-purple-600 to-indigo-600"
        style={{
          clipPath:
            'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
        }}
      />
    </div>
  );
}
