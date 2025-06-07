'use client';

import { useLayoutEffect, useRef, useEffect, } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TitleAndCornersSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRefs1 = useRef(null);
  const imageRefs2 = useRef(null);
  const imageRefs3 = useRef(null);
  const imageRefs4 = useRef(null);
  const imageRefs5 = useRef(null);
    useEffect(() => {
    gsap.to(titleRef.current, {
      y:'100px',
      scrollTrigger: {
        trigger: sectionRef.current, // 🔥 this triggers the animation
        start: 'top center',
        end: 'top top',
        scrub: true,
      },
    });
  }, []);




  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
        },
      });

      // Title shrinking
      // Title scale down starts at 0
        tl.to(titleRef.current, {
        scale: 0.5,
        duration: 1,
        // ease: 'power2.out',
        ease: 'none',
        }, 0);

        // Title opacity fades out starting halfway into the scale animation
        tl.to(titleRef.current, {
        opacity: 0,
        duration: 0.2,
        // ease: 'power2.out',
        ease: 'none',
        }, 0.5); // <-- starts at 0.5 seconds into the timeline

      // 5 Corner Images
      tl.fromTo(imageRefs1.current, 
        { x: '-150vw', y: '0%' }, 
        { x: '0%', y: '0%', duration: 1 }, 
        0
        );

        tl.fromTo(imageRefs2.current, 
        { x: '100vw', y: '-200%' }, 
        { x: '0%', y: '0%', duration: 1 }, 
        0
        );

        tl.fromTo(imageRefs3.current, 
        { x: '130vw', y: '250%' }, 
        { x: '0%', y: '0%', duration: 1 }, 
        0
        );

        tl.fromTo(imageRefs4.current, 
        { x: '-70vw', y: '150vh' }, 
        { x: '0%', y: '0%', duration: 1 }, 
        0
        );

        tl.fromTo(imageRefs5.current, 
        { x: '-80vw', y: '-150vh' }, 
        { x: '0%', y: '0%', duration: 1 }, 
        0
        );


    }, sectionRef);

    return () => ctx.revert();
  }, []);


  

  return (
    <section
      ref={sectionRef}
      className="relative h-screen color-primary bg-light overflow-hidden ba-tagline"
    >
      {/* Title */}
      <div
        ref={titleRef}
        className="w-full text-center mt-[-100px] text-[clamp(2rem,9vw,30rem)] font-light text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        Own Your Identity.
      </div>
        <figure ref={imageRefs1} className='image image-1' ><Image width={100} height={100} src="/images/d1.png" alt="Description of image" /></figure>
        <figure ref={imageRefs2} className='image image-2' ><Image width={100} height={100} src="/images/d2.png" alt="Description of image" /></figure>
        <figure ref={imageRefs3} className='image image-3' ><Image width={100} height={100} src="/images/d3.png" alt="Description of image" /></figure>
        <figure ref={imageRefs4} className='image image-4' ><Image width={100} height={100} src="/images/d4.png" alt="Description of image" /></figure>
        <figure ref={imageRefs5} className='image image-5' ><Image width={100} height={100} src="/images/d5.png" alt="Description of image" /></figure>



    
    </section>
  );
}
