'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function WritingParagraph() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

  useEffect(() => {
    const para = paragraphRef.current;
    if (!para) return;

    // Clear text initially
    para.textContent = '';

    const ctx = gsap.context(() => {
      gsap.to(para, {
        duration: 4,
        text: fullText,
        ease: 'none',
        scrollTrigger: {
          trigger: para,
          start: 'top 80%',
          toggleActions: 'play none none none',
          // play only once
          once: true,
        },
      });
    }, para);

    return () => ctx.revert();
  }, [fullText]);

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <p
        ref={paragraphRef}
        className="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
      />
    </section>
  );
}
