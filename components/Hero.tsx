"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageGallery from "./ImageGallery";
import BookNowButton from "./Button";
import RotatingText from "./RotatingText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rotatingItems = [
  " PRISTINE BEACHES ",
  " VIBRANT CULTURE ",
  " LUSH RAINFORESTS ",
  " EXOTIC WILDLIFE ",
  " MISTY MOUNTAINS ",
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Background image slow zoom on scroll
      gsap.fromTo(
        ".hero-bg",
        { scale: 1 },
        {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Slight upward drift of heading/paragraph while scrolling
      gsap.to(".hero-title, .hero-paragraph", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      // "DISCOVER" word animation on load
      gsap.fromTo(
        ".discover-word",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Rotating text chip animation on each change
      gsap.fromTo(
        ".rotating-chip",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ScrollTrigger.getAll().forEach((st) => st.disable());
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-section relative min-h-[140vh] flex flex-col justify-start items-center text-center pt-45 overflow-hidden"
    >
      {/* Real image layer behind everything */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/home2.jpg"
          alt="Sri Lanka landscape"
          fill
          priority
          className="hero-bg object-cover will-change-transform"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backdropFilter: "none" }}
      />

      {/* Clouds */}
      <Image
        src="/images/cloud1.png"
        alt="Cloud"
        width={1200}
        height={800}
        className={`absolute z-5 transition-all duration-[2000ms] ease-out ${
          isLoaded ? "left-1/4 transform -translate-x-1/2" : "-left-full"
        }`}
        style={{ maxWidth: "50vw" }}
      />
      <Image
        src="/images/cloud1.png"
        alt="Cloud"
        width={800}
        height={533}
        className={`absolute top-10 z-4 transition-all duration-[2500ms] ease-out ${
          isLoaded ? "right-1/4 transform translate-x-1/2" : "-right-full"
        }`}
        style={{ maxWidth: "40vw" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 mx-auto">
        <h1
          className={`hero-title text-4xl md:text-6xl font-black font-Geomanist text-black transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } whitespace-nowrap`}
          style={{ transitionDelay: isLoaded ? "300ms" : "0ms" }}
        >
          <span className="discover-word inline-block">DISCOVER </span>

          {/* Rotating text chip */}
          <span className="inline-block align-baseline rotating-chip">
            <RotatingText
              texts={rotatingItems}
              mainClassName="px-2 sm:px-2 md:px-3 text-[#fda720] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              aria-label="Rotating highlights of Sri Lanka"
            />
          </span>
        </h1>

        <br />

        <p
          className={`hero-paragraph text-black font-Geomanist text-base md:text-lg transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isLoaded ? "500ms" : "0ms" }}
        >
          Famous Tours and Travel is a Sri Lanka-based travel company dedicated
          to creating memorable and stress free journeys. From cultural tours to
          scenic getaways, we help you experience the very best of the island.
        </p>

        <div className="mt-6 flex justify-center">
          <BookNowButton
            text="BOOK NOW"
            isVisible={isLoaded}
            delay="700ms"
            size="md"
            variant="primary"
            onClick={() => router.push("/booking")}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <ImageGallery />
      </div>
    </section>
  );
}
