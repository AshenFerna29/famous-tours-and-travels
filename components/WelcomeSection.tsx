"use client";

import Image from "next/image";
import BookNowButton from "./Button";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsLoaded(true), []);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Subtle “settle” of the whole block when it enters
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 24, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Title + text: calm fade/slide with a tiny letter-spacing relax
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".welcome-title",
        { opacity: 0, y: 18, letterSpacing: "0.08em" },
        { opacity: 1, y: 0, duration: 0.7, letterSpacing: "0.02em" }
      )
        .fromTo(
          ".welcome-text",
          { opacity: 0, y: 16, filter: "blur(4px)" },
          { opacity: 1, y: 0, duration: 0.7, filter: "blur(0px)" },
          "-=0.35"
        )
        .fromTo(
          ".welcome-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        );

      // Gentle scroll-linked drift for the logo (no bounce, just calm)
      gsap.to(".welcome-logo", {
        yPercent: -6,
        rotate: 0.001, // prevent subpixel jitter
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Very light parallax on the left column so it feels alive but not busy
      gsap.to(".welcome-left", {
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-25 px-10 md:px-35 grid grid-cols-1 md:grid-cols-2 gap-50 items-center overflow-hidden"
    >
      <div>
        <h2 className="welcome-title text-4xl md:text-5xl font-black mb-6 leading-tight text-black uppercase tracking-tight">
          Welcome to{" "}
          <span className="text-[#000000] block">Famous Tours and Travels</span>
        </h2>

        <p className="welcome-text text-black text-1x2 mb-6 max-w-xl text-justify font-medium leading-relaxed">
          From the misty highlands of Kandy to the golden beaches of Galle, from
          ancient ruins of Polonnaruwa to the wildlife of Yala National Park, we
          craft journeys that create lasting memories and deep connections with
          Sri Lanka’s rich culture and nature.
        </p>

        <div className="welcome-cta">
          <BookNowButton
            text="ABOUT US"
            isVisible={isLoaded}
            delay="700ms"
            size="md"
            variant="primary"
          />
        </div>
      </div>

      <div
        className="flex justify-center"
        style={{ marginLeft: "40px", marginTop: "-30px" }}
      >
        <Image
          src="/images/logo.png"
          alt="Famous Tours Logo"
          width={350}
          height={350}
          className="welcome-logo object-contain max-w-full h-auto will-change-transform"
          style={{ width: "auto", height: "350px" }}
        />
      </div>
    </section>
  );
}
