"use client";

import { ArrowUpRight } from "lucide-react";

interface BookNowButtonProps {
  onClick?: () => void;
  className?: string;
  isVisible?: boolean;
  delay?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  text?: string;
}

export default function BookNowButton({
  onClick,
  className = "",
  isVisible = true,
  delay = "0ms",
  size = "md",
  variant = "primary",
  text = "BOOK NOW",
}: BookNowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-[#ffffff] text-black hover:text-white",
    secondary: "bg-[#52ACE4] text-white hover:text-black",
  };

  const dotColor = variant === "primary" ? "bg-[#fda720]" : "bg-white";

  return (
    <button
      onClick={onClick}
      className={`relative ${variantClasses[variant]} ${
        sizeClasses[size]
      } rounded-full font-semibold flex items-center gap-2 overflow-hidden group transition-all duration-100 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{
        transitionDelay: delay,
      }}
    >
      {/* Animated dot positioned below arrow head */}
      <div
        className={`absolute top-3.5 right-6 w-5 h-5 ${dotColor} rounded-full transition-all duration-1000 group-hover:scale-[50] z-0`}
      ></div>

      <span className="relative z-10">{text}</span>
      <ArrowUpRight size={20} className="relative z-10" />
    </button>
  );
}
