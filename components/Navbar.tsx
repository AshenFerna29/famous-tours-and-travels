"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past initial threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show navbar at the very top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed h-2 z-50 left-20 top-5 px-10 w-[90%] py-10 shadow-md rounded-4xl flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-xl border border-white/30"
          : "bg-white"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="object-contain"
      />

      {/* Nav Links */}
      <div className="hidden md:flex gap-10 text-sm font-medium text-black">
        <a href="/home">Home</a>
        <a href="/about-us">About Us</a>
        <a href="/booking">Booking</a>
        <a href="#">FAQ</a>
        <a href="#">Contact Us</a>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center relative w-48">
        <Input
          type="text"
          placeholder="Search... "
          className="rounded-full px-4 pr-10 py-2 bg-[#f5f8ff] placeholder:text-[#52ACE4]"
        />
        <Search size={18} className="absolute right-3 text-[#52ACE4]" />
      </div>
    </nav>
  );
}
