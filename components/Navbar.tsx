'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'; // Icon from Lucide (used by ShadCN)

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6  backdrop-blur-md flex justify-between items-center">
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
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Booking</a>
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
        <Search
          size={18}
          className="absolute right-3 text-[#52ACE4]"
        />
      </div>
    </nav>
  );
}
