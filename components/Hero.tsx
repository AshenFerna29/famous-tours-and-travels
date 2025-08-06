"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ImageGallery from "./ImageGallery";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[140vh] flex flex-col justify-start items-center text-center pt-45"
      style={{
        backgroundImage: `url('/images/home2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated Cloud */}
      <Image
        src="/images/cloud1.png"
        alt="Cloud"
        width={1200}
        height={800}
        className={`absolute z-5 transition-all duration-[2000ms] ease-out ${
          isLoaded ? "left-1/3 transform -translate-x-1/2" : "-left-96"
        }`}
      />

      {/* Second Animated Cloud (right to left, smaller) */}
      <Image
        src="/images/cloud1.png"
        alt="Cloud"
        width={800}
        height={533}
        className={`absolute top-10 z-4  transition-all duration-[2500ms] ease-out ${
          isLoaded ? "right-1/3 transform translate-x-1/2" : "-right-96"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Heading (centered) */}
        <h1 className="text-4xl md:text-7xl font-black font-Geomanist text-black">
          UNWRAP THE WONDERS OF SRI LANKA
        </h1>
        <br />

        {/* Paragraph + Button (left aligned) */}
        <p className="text-black font-Geomanist text-30">
          Famous Tours and Travel is a Sri Lanka-based travel company dedicated
          to creating memorable and stress free journeys. From cultural tours to
          scenic getaways, we help you experience the very best of the island.
        </p>
        <button
          className={`mt-6 relative bg-[#ffffff] text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto overflow-hidden group transition-all duration-1000 ease-out hover:text-white ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isLoaded ? "0ms" : "500ms",
          }}
        >
          {/* Orange dot positioned below arrow head */}
          <div className="absolute top-3.5 right-6 w-5 h-5 bg-orange-500 rounded-full transition-all duration-500 group-hover:scale-[50] z-0"></div>

          <span className="relative z-10">BOOK NOW</span>
          <ArrowUpRight size={20} className="relative z-10" />
        </button>
      </div>
      <div>
        <ImageGallery />
      </div>
    </section>
  );
}
