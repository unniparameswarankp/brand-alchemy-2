"use client";

import { useEffect, useRef} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 1,
    title: "Web Development",
    desc: "We create custom digital presences that engage your audience with responsive design, seamless user experience, and optimized performance to ensure your website stands out in today’s competitive market.",
    image: "/images/webdevelopment.jpg",
  },
  {
    id: 2,
    title: "Software Development",
    desc: "Providing tailored business solutions through innovative software development that streamlines operations, enhances productivity, and meets your unique enterprise needs.",
    image: "/images/webdevelopment.jpg",
  },
  {
    id: 3,
    title: "Print",
    desc: "Delivering creative printed marketing materials including business cards, flyers, and posters that capture your brand’s essence and leave a lasting impression.",
    image: "/images/webdevelopment.jpg",
  },
  {
    id: 4,
    title: "Web Development",
    desc: "We create custom digital presences that engage your audience with responsive design, seamless user experience, and optimized performance to ensure your website stands out in today’s competitive market.",
    image: "/images/webdevelopment.jpg",
  },
  {
    id: 5,
    title: "Software Development",
    desc: "Providing tailored business solutions through innovative software development that streamlines operations, enhances productivity, and meets your unique enterprise needs.",
    image: "/images/webdevelopment.jpg",
  },
  {
    id: 6,
    title: "Print",
    desc: "Delivering creative printed marketing materials including business cards, flyers, and posters that capture your brand’s essence and leave a lasting impression.",
    image: "/images/webdevelopment.jpg",
  },
];

export default function CaseStudiesScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;
    const title = titleRef.current;

    if (!horizontal || !section || !title) return;

    const scrollWidth = horizontal.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollLength = scrollWidth - windowWidth;

    const ctx = gsap.context(() => {
      gsap.set(horizontal, { x: window.innerWidth });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollLength * 2}`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(title, { opacity: 0, y: -100, duration: 0.2, ease: "none" });
      tl.to(horizontal, { x: `-${scrollLength}px`, ease: "none" }, ">-0.1");
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".ba-service-card");

    cards.forEach((card, i) => {
      gsap.to(card, {
        rotationY: 20,
        rotationX: 5,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        transformOrigin: "center center",
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-light text-black overflow-hidden ba-service-scroll"
    >
      {/* Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
        <h2
          ref={titleRef}
          className="text-[clamp(2rem,8vw,5rem)] font-light text-center whitespace-nowrap"
        >
          Our Services
        </h2>
      </div>

      {/* Horizontally Scrolling Cards */}
      <div
        ref={horizontalRef}
        className="flex h-full items-center px-20 absolute gap-20 top-0 left-0"
        style={{ width: `${caseStudies.length * 420 + 400}px` }}
      >
        {caseStudies.map((study) => (
          <ServiceCard key={study.id} study={study} />
        ))}
        <div className="spacer-400" />
      </div>
    </section>
  );
}

type ServiceCardProps = {
  study: {
    title: string;
    desc: string;
    image: string;
  };
};

function ServiceCard({ study }: ServiceCardProps) {

  return (
    <div className="ba-service-card text-white w-[360px]">
      <div className="face face-front p-4 bg-primaryrounded-2xl shadow-xl h-full flex flex-col justify-between">
        <figure className="mb-4">
          <img src={study.image} alt={study.title} className="rounded-xl" />
        </figure>
        <h2 className="text-2xl font-light text-white mb-2">{study.title}</h2>
        <p className="text-sm opacity-80 text-white mb-4">{study.desc}</p>
        <Link
          href="#"
          className="mt-auto inline-flex items-center gap-3 text-sm arrow-btn"
        >
          Read More <img src="/arrow_right_white.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
}
