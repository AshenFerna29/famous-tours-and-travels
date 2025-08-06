import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageGallery() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Small delay after component mounts

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4">
      <div className="flex justify-center max-w-8xl mx-auto -space-x-30">
        {/* Image 1 - Peacock */}
        <div
          className={`relative w-96 h-[32rem] overflow-hidden transition-all duration-1000 ease-out z-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Image
            src="/images/one.png"
            alt="Wildlife - Peacock"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 2 - Lighthouse */}
        <div
          className={`relative w-96 h-[32rem] overflow-hidden transition-all duration-1000 ease-out z-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
        >
          <Image
            src="/images/two.png"
            alt="Lighthouse"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 3 - Beach/Boat */}
        <div
          className={`relative w-96 h-[32rem] overflow-hidden transition-all duration-1000 ease-out z-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "200ms" : "0ms",
          }}
        >
          <Image
            src="/images/three.png"
            alt="Beach activities"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 4 - Sigiriya Rock */}
        <div
          className={`relative w-96 h-[32rem] overflow-hidden transition-all duration-1000 ease-out z-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "300ms" : "0ms",
          }}
        >
          <Image
            src="/images/four.png"
            alt="Sigiriya Rock"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
