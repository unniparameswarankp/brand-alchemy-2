"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Escolhe a zona",
    text: "Ajudamos na escolha da área e melhor solução para instalar a sua Grab&Go, e damos-lhe exclusividade total, onde pode desenvolver a sua atividade e abrir mais lojas. Só necessita de 30 m2 . .",
    image: "/images/service.jpeg",
  },
  {
    title: "Escolhe o pack",
    text: "Ajudamos na escolha da área e melhor solução para instalar a sua Grab&Go, e damos-lhe exclusividade total, onde pode desenvolver a sua atividade e abrir mais lojas. Só necessita de 30 m2 . .",
    image: "/images/service.jpeg",
  },
  {
    title: "Loja pronta em 1 mês",
    text: "Ajudamos na escolha da área e melhor solução para instalar a sua Grab&Go, e damos-lhe exclusividade total, onde pode desenvolver a sua atividade e abrir mais lojas. Só necessita de 30 m2 . .",
    image: "/images/service.jpeg",
  },
];

export default function ScrollSteps() {
    const textRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const imageTriggers = gsap.utils.toArray(".step-image") as HTMLElement[];

    imageTriggers.forEach((img, index) => {
      ScrollTrigger.create({
        trigger: img,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });

    ScrollTrigger.create({
  trigger: textRef.current,
  start: "top top",
  end: `+=${window.innerHeight * (steps.length - 1)}`, // pin until last image
  pin: true,
  scrub: true,
});

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
    <div className="pb-[200] mt--1"></div>
    <section id="section3" className="relative text-black  ba-steps">
      <div className="grid md:grid-cols-2 gap-10 relative ba-container">
        {/* Left: Scrollable images */}
        <div className="flex flex-col space-y-30 pt-[100px] pb-[100] mr-[-100]">
          {steps.map((step, index) => (
  <img
    src={step.image}
    key={index}
    alt={step.title}
    className={`step-image w-full transition-opacity duration-500 ease-in-out ${
      activeStep === index ? "opacity-100" : "opacity-0"
    }`}
  />
))}
        </div>

        {/* Right: Pinned text */}
    <div className="sticky h-screen flex align-center pt-[100px] pb-[100] pl-[100]" ref={textRef}>
  <div className="space-y-15 p-4 h-auto">
    {steps.map((step, index) => (
      <div
        key={index}
        className={`transition-opacity duration-300 ${
          activeStep === index ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="flex items-center gap-4">
          <h3 className="text-4xl font-light color-primary mb-4">{step.title}</h3>
        </div>
        <p className="text-sm text-black max-w-sm">{step.text}</p>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
    </>
  );
}