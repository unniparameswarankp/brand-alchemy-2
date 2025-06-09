'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphText =
  'In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.';

const repeatedSections = [
  {
    title: 'Create.',
    paragraph: 'Designing solutions with passion and precision.In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.',
    image: '/creative.png',
  },
  {
    title: 'Develop.',
    paragraph: 'Building powerful applications that perform flawlessly.In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.',
    image: '/develop.png',
  },
  {
    title: 'Launch.',
    paragraph: 'Taking ideas live to transform the digital landscape.In the heart of innovation, the Alchemy Project was born — a journey through code, creativity, and transformation that changes everything it touches.',
    image: '/launch.png',
  },
];


export default function InteractiveHomeSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  // Define refs with correct typing, initialized once
  const paragraphLettersRef = useRef<HTMLElement[]>([]);
  const sectionsRefs = useRef<HTMLElement[]>([]);

  // Don't reset .current to [] here, because it will clear on every render!

  const addParagraphLetterRef = (el: HTMLElement | null) => {
    if (el && !paragraphLettersRef.current.includes(el)) {
      paragraphLettersRef.current.push(el);
    }
  };

  const addSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRefs.current.includes(el)) {
      sectionsRefs.current.push(el);
    }
  };





  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalScrollLength = window.innerHeight * (2 + repeatedSections.length);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Reveal paragraph letters
      tl.to(paragraphLettersRef.current, {
        opacity: 1,
        stagger: .05,
        ease: 'none',
        duration: 1,
      }).to(paragraphLettersRef.current, {
        opacity: 0,
        duration: 1,
        delay: .5,
      });




      // Animate repeated sections one by one
      repeatedSections.forEach((_, i) => {
        const section = sectionsRefs.current[i];
        if (!section) {
          console.warn(`Section ref at index ${i} not found!`);
          return;
        }

        const title = section.querySelector('.title');
        const para = section.querySelector('.paragraph');
        const img = section.querySelector('img');

        if (!title || !para || !img) {
          console.warn(`Missing elements in section ${i}`, { title, para, img });
          return;
        }

        // First set section visible (opacity 1) so children can animate
        tl.set(section, { opacity: 1, pointerEvents: 'auto' });

        // Animate title, paragraph, and image sequentially
        tl
          .fromTo(
            title,
            { opacity: 0, letterSpacing: '-0.2em' },
            { opacity: 1, letterSpacing: '0em', duration: 3 }
          )
          .fromTo(
            para,
            // { opacity: 0 },
            // { opacity: 1, duration: 5 },
            { opacity: 0, y: 50, lineHeight: '3em'},   // start: transparent, 50px below, rotated 5 degrees
            { opacity: 1, y: 0, lineHeight: '1.7em', duration: 2 }, 
            '<0.3'
          )
          .fromTo(
            img,
            { scale: .8, opacity: 0 },
            { scale: 1.2, opacity: 1, duration: 5 },
            '<0.1'
          )
          .to(
            [title, para, img, section],
            {
              opacity: 0,
              duration: 2,
              delay: 1,
              pointerEvents: 'none',
            }
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="section1"
      ref={containerRef}
      className="relative w-full h-screen text-white flex items-center justify-center px-8 overflow-hidden ba-interactive-home mag-tp--100vh"
    >
      {/* Paragraph section */}
      <p
        className="text-[clamp(2.1rem,4vw,4rem)] font-light color-primary max-w-4xl leading-tight text-center"
      >
        {paragraphText.split('').map((char, i) => (
          <span
            key={i}
            ref={addParagraphLetterRef}
            style={{ opacity: 0.3 }}
          >
            {char}
          </span>
        ))}
      </p>

      {/* Repeated sections */}
      {repeatedSections.map(({ title, paragraph, image }, i) => (
        <div
          key={i}
          ref={addSectionRef}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-0 pointer-events-none"
          style={{ willChange: 'opacity' }}
        > <figure>
            <img
            src={image}
            alt={title}
            className="w-64"
            draggable={false}
          />
          </figure>
          <h2
            className="title text-[clamp(2rem,4vw,3rem)] tracking-tight color-primary"
            style={{ letterSpacing: '-0.2em' }}
          >
            {title}
          </h2>
          <p className="paragraph color-black text-lg max-w-xl mb-8">{paragraph}<br/><br/><a href="#" className="inline-flex items-center gap-3 arrow-btn-black">
                Read More <img src="/arrow_right_white.svg" alt="arrow" /></a></p>
          
        </div>
      ))}
    </section>
  );
}
