"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const services = [
  {
    title: "Branding",
    image: "/images/icon1.png",
    subs: [
      { label: "Logos", image: "/images/icon2.png", },
      { label: "Brand guidelines", image: "/icons/branding.png", },
      { label: "Stationery design", image: "/icons/branding.png", },
    ],
  },
  {
    title: "Marketing",
    image: "/images/icon3.png",
    subs: [
      { label: "Marketing strategy", image: "/images/icon4.png", },
      { label: "Social media management", image: "/images/icon5.png", },
    ],
  },
  {
    title: "Ads",
    image: "/images/icon6.png",
    subs: [
      { label: "Facebook Ads", image: "/images/icon7.png", },
      { label: "Google Ads", image: "/images/icon8.png", },
    ],
  },
  {
    title: "Website",
    image: "/images/icon9.png",
    subs: [
      { label: "Custom website designs", image: "/images/icon10.png", },
      { label: "E-commerce solutions", image: "/images/icon11.png", },
    ],
  },
  {
    title: "Ads",
    image: "/images/icon6.png",
    subs: [
      { label: "Facebook Ads", image: "/images/icon7.png", },
      { label: "Google Ads", image: "/images/icon8.png", },
    ],
  },
  {
    title: "Website",
    image: "/images/icon9.png",
    subs: [
      { label: "Custom website designs", image: "/images/icon10.png", },
      { label: "E-commerce solutions", image: "/images/icon11.png", },
    ],
  },
];





export default function LineupSlider() {
      const titleRef = useRef(null);

useEffect(() => {
  if (titleRef.current) {
    gsap.fromTo(
      titleRef.current,
      { scale: 2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }
}, []);

  return (
    <section className="py-16 flex align-center bg-light color-black ba-service-slider">
      <div  className="ba-container">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw,30rem)] font-light text-center mb-15 color-primary">
          Explore the line-up
        </h2>

        {/* Main slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 4,
            },
          }}
        >
          {services.map((service, mainIndex) => (
            <SwiperSlide key={mainIndex}>
                <div className="service-box">
              {/* Sub slider inside each main slide */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                style={{ padding: '10px 0' }}
              >
                {service.subs.map((sub, subIndex) => (
                   <SwiperSlide key={subIndex}>
                      <div className="flex flex-col items-center text-center">
                        <figure>
                        <img
                          src={sub.image}
                          alt={sub.label}
                          className="w-20 h-20 object-contain mb-2"
                        />
                        </figure>
                        <p className="text-sm font-medium">{sub.label}</p>
                      </div>
                    </SwiperSlide>
                ))}
              </Swiper>
              <h2 className="text-[clamp(1.5rem,1.5vw,3rem)] color-primary mb-3">{service.title}</h2>
              <a className="inline-flex items-center gap-3 arrow-btn-black" href="#">Read More <img src="/arrow_right_white.svg" alt="arrow"/></a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
