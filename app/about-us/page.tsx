"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import heroImage from "@/public/images/about-hero.jpg";
import MissionVision from "@/components/MissionVision"; // <-- add this
import AboutCollageSection from "@/components/AboutCollageSection";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image src={heroImage} alt="Beach" fill className="object-cover" priority />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-8xl font-bold text-white drop-shadow-md text-center">
            About Us
          </h1>
        </div>
      </div>

 {/* Breadcrumb */}
      <div className="px-6 md:px-40 mt-10 text-sm text-gray-500">
        Home &gt; <span className="text-black">About Us</span>
      </div>

      {/* About Us Section */}
      <AboutCollageSection
        label="About Us"
        titleItalic="Our Story"
        paragraphs={[
          "The journey began years ago when I worked as an executive personnel at the Abans counter, where I had the privilege of regularly assisting international airline crews like Emirates and others. That experience didn’t just hone my professional skills—it ignited a passion for hospitality, cultural exchange, and travel. Working closely with people from different parts of the world gave me a deep appreciation for the stories each traveler carries and the joy of being part of their journey, even in the smallest way."
        ]}
        images={[
          { src: "/images/about/about-1.jpg", alt: "Portrait 1" },
          { src: "/images/about/about-2.jpg", alt: "Detail 2" },
          { src: "/images/about/about-3.jpg", alt: "Elephant 3" },
          { src: "/images/about/about-4.jpg", alt: "Landscape 4" },
          { src: "/images/about/about-5.jpg", alt: "Mountains 5" },
        ]}
      />

      {/* Why I Started Section */}
      <AboutCollageSection
        label="Why I Started"
        titleItalic="The Inspiration"
        paragraphs={[
          "With that passion deeply rooted, I realized I didn’t want to just help people in transit—I wanted to create the journey itself. I started this tour business to give travelers more than a destination—I wanted to offer them memories, moments, and meaningful connections. Sri Lanka has so much to offer, from its rich culture to breathtaking landscapes, and I felt it was time to become a storyteller of my own land, one tour at a time."
        ]}
        images={[
          { src: "/images/why/why-1.jpg", alt: "Portrait A" },
          { src: "/images/why/why-2.jpg", alt: "Square B" },
          { src: "/images/why/why-3.jpg", alt: "Portrait C" },
          { src: "/images/why/why-4.jpg", alt: "Landscape D" },
          { src: "/images/why/why-5.jpg", alt: "Wide E" },
        ]}
      />
<div className="px-6 md:px-40">
  <hr className="border-t-1 border-[#fda720]" />
</div>


      {/* New Mission & Vision block */}
      <MissionVision />



      <Footer />
    </>
  );
}
