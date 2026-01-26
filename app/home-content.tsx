"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeSection from "@/components/WelcomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThingsToDo from "@/components/ThigsToDo";
import Gallery from "@/components/Gallery";
import PackageSection from "@/components/PackageSection";
import Footer from "@/components/Footer";
import VelocityMarqueeSection from "@/components/VelocityMarqueeSection";

export default function HomeContent() {
  const router = useRouter();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    if (!hasVisited) {
      sessionStorage.setItem("visited", "true");
      router.push("/splash");
    } else {
      setShowHome(true);
    }
  }, [router]);

  if (!showHome) return null;

  return (
    <>
      <Navbar />
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />
      <ThingsToDo />
      <PackageSection />
      <Gallery />
      <VelocityMarqueeSection />
      <Footer />
    </>
  );
}
