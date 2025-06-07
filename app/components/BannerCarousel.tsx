'use client';

import React, { useState, useEffect, useRef } from "react";
// import Slider, { type Slider as SlickSlider } from "react-slick";
import Link from "next/link";
import Slider from "react-slick";
import gsap from 'gsap';
    


const slides = [
  {
    videoSrc: "/videos/banner1.mp4",
    heading: "We build cool things for the web",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
  },
  {
    videoSrc: "/videos/banner2.mp4",
    heading: "Fast and Modern design in everything",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
  },
  {
    videoSrc: "/videos/banner3.mp4",
    heading: "Responsive Design and fast performance",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
  },
];

export default function BannerCarousel() {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  useEffect(() => {
    gsap.to(sectionRef.current, {
      y:'25vh',
      scrollTrigger: {
        trigger: sectionRef.current, // 🔥 this triggers the animation
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const nextSlideIndex = (currentSlide + 1) % slides.length;

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    fade: true,
    pauseOnHover: false,
    beforeChange: (oldIndex: number, nextIndex: number) => setCurrentSlide(nextIndex), // ✅ Explicit typing
  };

  return (
    <div className="ba-banner" ref={sectionRef}>
      {/* Main Slider */}
      <Slider ref={sliderRef} {...mainSettings} className="ba-main-slider">
        {slides.map(({ videoSrc, heading, description }, index) => (
          <div key={index} className="items-ba">
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%" }}
            />
            <div className="ba-container">
              <h1 className="cont-light">{heading}</h1>
              <p>{description}</p>
              <Link href="#" className="inline-flex items-center gap-3 arrow-btn">
                Read More <img src="/arrow_right_white.svg" alt="arrow" />
              </Link>
            </div>
          </div>
        ))}
      </Slider>

      {/* Thumbnails and Buttons */}
      <div className="ba-thumbnails mt-4">
        {/* Next Slide Preview (Clickable) */}
        <button
          onClick={() => sliderRef.current?.slickGoTo(nextSlideIndex)}
          className="flex items-center text-left gap-2 mb-2 video-btn"
        >
          <video
            src={slides[nextSlideIndex].videoSrc}
            muted
            playsInline
          />
          <p className="text-white button-name">
            <small>Next</small><br />
            {slides[nextSlideIndex].heading}
          </p>
        </button>

        {/* Slide Buttons */}
        <div className="flex gap-2 flex-wrap button-ba">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                index === currentSlide ? "active" : ""
              }`}
            >
              {slide.heading.split(" ")[0]} {/* You can use number or full heading too */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
