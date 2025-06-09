// components/OurStory.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OurStory() {

  const logoRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top top',      // when the section hits top of viewport
          end: '+=1000',         // amount of scroll needed to complete the animation
          scrub: true,
          pin: true,             // pin the section during animation
          anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      });

      tl.fromTo(
        '.line-left-inner',
        { height: 0 },
        { height: '100%', duration: 2 },
        '-=0.5'
      )
        .fromTo(
          '.circle-cover',
          { width: '110%' },
          { width: 0, duration: 3 }
        )
        .fromTo(
          '.line-right-inner',
          { height: 0 },
          { height: '100%', duration: 2 },
          '-=0.4'
        );
        
    }, logoRef);

    return () => ctx.revert();
  }, []);



  return (
    <section id="section4" className="flex align-center text-white h-screen py-20 ba-our-story" ref={logoRef}>


      <div className="ba-container grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">
        
        {/* Left Content */}
        <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-ba"
            >
          <h2 className="text-5xl md:text-6xl font-liggt color-primary mb-6">Our Story</h2>
          <p className="text-lg leading-relaxed text-black mb-10 font-light">
            In a world brimming with possibilities, we sprouted, seizing our destiny to create an extraordinary
            narrative – a tale that encapsulates laughter, tears, challenges, and triumphs.
          </p>
          <Link href="#" className="inline-flex items-center gap-3 arrow-btn-border-black">
                Read More <img src="/arrow_right_white.svg" alt="arrow" />
              </Link>
        </motion.div>

        {/* Right Orb Image */}
       <div className='image-ba'>
               <div  className="ba-logo">
                <div className="circle">
                  <div className='inner-circle'></div>
                  <div className='circle-cover'></div>
                </div>
                <div className="line-left">
                  <div className="line-left-inner"></div>
                </div>
                <div className="line-right">
                  <div className="line-right-inner"></div>
                </div>
               </div>
              
       </div>

      </div>
    </section>
  );
}
