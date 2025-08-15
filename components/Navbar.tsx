"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { packages } from "@/lib/packages";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { href: "/home", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/booking", label: "Booking" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "#") return false;
    // Handle root path for home
    if (href === "/home" && pathname === "/") return true;
    return pathname === href;
  };

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

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <nav
      className={`fixed h-2 z-50 left-4 md:left-20 top-5 px-4 md:px-10 w-[95%] md:w-[90%] py-10 shadow-md rounded-4xl flex justify-between items-center transition-all duration-300 ${
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
        width={50}
        height={50}
        className="object-contain"
        style={{ width: "auto", height: "50px" }}
      />

      {/* Nav Links */}
      <div className="hidden md:flex gap-6 lg:gap-15 text-sm font-medium text-black ml-8 lg:ml-16">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            <a
              href={item.href}
              className={`relative transition-all duration-300 ease-in-out hover:text-[#fda720] ${
                isActiveLink(item.href) ? "text-[#fda720]" : "text-black"
              }`}
            >
              {item.label}
              {/* Sticky animation underline */}
              <div
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#fda720] transition-all duration-300 ease-in-out ${
                  isActiveLink(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        ref={searchRef}
        className="hidden md:flex items-center relative w-60 lg:w-80"
      >
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search tour packages..."
          className="rounded-full px-4 pr-10 py-2 bg-[#f5f8ff] placeholder:text-[#52ACE4]"
        />
        <Search
          size={18}
          className="pointer-events-none absolute right-3 text-[#52ACE4]"
        />

        {open && (
          <div
            role="listbox"
            aria-label="Tour Packages"
            className="absolute left-0 top-11 z-50 w-[28rem] max-w-[80vw] rounded-2xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-xl ring-1 ring-black/5"
          >
            <div className="px-5 pt-4 pb-2 text-xs font-semibold tracking-wider text-gray-700">
              TOUR PACKAGES
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-2 pb-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-3 text-sm text-gray-500">
                  No matches
                </div>
              ) : (
                filtered.map((p) => (
                  <Link
                    key={p.id}
                    href={`/packages/${p.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[0.95rem] text-gray-900 transition-colors hover:bg-[#f5f8ff] hover:text-[#353978]"
                  >
                    {p.title}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
