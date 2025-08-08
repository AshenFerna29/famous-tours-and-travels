"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import heroImage from "@/public/images/about-hero.png";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Beach"
          fill
          className="object-cover"
          priority
        />

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

      {/* Content Section */}
      <div className="px-6 md:px-40 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-[#fda720] ">About Us</h2>
          <p className="text-gray-700 leading-relaxed text-justify pt-5">
            The journey began years ago when I worked as an executive personnel
            at the Abans counter, where I had the privilege of regularly
            assisting international airline crews like Emirates and others. That
            experience didn’t just hone my professional skills—it ignited a
            passion for hospitality, cultural exchange, and travel. Working
            closely with people from different parts of the world gave me a deep
            appreciation for the stories each traveler carries and the joy of
            being part of their journey, even in the smallest way.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#fda720] mb-4">
            Why I Started
          </h2>
          <p className="text-gray-700 leading-relaxed pt-5">
            With that passion deeply rooted, I realized I didn’t want to just
            help people in transit—I wanted to create the journey itself. I
            started this tour business to give travelers more than a
            destination—I wanted to offer them memories, moments, and meaningful
            connections. Sri Lanka has so much to offer, from its rich culture
            to breathtaking landscapes, and I felt it was time to become a
            storyteller of my own land, one tour at a time.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-30 mt-50">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center space-y-10">
            <h3 className="text-xl font-semibold text-[#52ACE4]">
              OUR MISSION
            </h3>
            <Image
              src={"/images/Mission.png"}
              alt="Mission"
              width={80}
              height={80}
              className="mx-auto"
            />
            <p className="text-gray-600 ">
              To provide authentic, personalized travel experiences that connect
              people not just with places, but with the heart of Sri Lanka.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center space-y-10">
            <h3 className="text-xl font-semibold text-[#52ACE4]">OUR VISION</h3>
            <Image
              src={"/images/Vision.png"}
              alt="Vision"
              width={80}
              height={88}
              className="mx-auto"
            />
            <p className="text-gray-600 top-5">
              To become a trusted name in Sri Lankan tourism, known for
              meaningful journeys, warm hospitality, and creating a home away
              from home for every traveler.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
