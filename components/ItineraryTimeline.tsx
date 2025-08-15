"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type ItineraryItem = {
  /** e.g. 1, 2, 3 */
  day: number;
  /** e.g. "Airport Pick Up" */
  title: string;
  /** Full line of details */
  details: string;
  /** Optional: force the dot style. If omitted, first/last are filled, middle are hollow */
  dot?: "filled" | "hollow";
};

type Props = {
  items: ItineraryItem[];
  /** Brand color (default: #fda720) */
  colorHex?: string;
};

export default function ItineraryTimeline({
  items,
  colorHex = "#fda720",
}: Props) {
  const [visibleDays, setVisibleDays] = useState<Set<number>>(new Set([1]));
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dayIndex = parseInt(
              entry.target.getAttribute("data-day-index") || "0"
            );
            const day = items[dayIndex]?.day;
            if (day) {
              setVisibleDays((prev) => new Set([...prev, day]));
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the dot is visible
        rootMargin: "-20% 0px -20% 0px", // Add some margin for better timing
      }
    );

    dotRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items?.length) return null;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        aria-hidden
        className="absolute left-[12px] top-5 h-[calc(100%-4rem)] border-l-2 border-dotted"
        style={{ borderColor: colorHex }}
      />

      <ul className="space-y-8">
        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;
          const isVisible = visibleDays.has(item.day);

          const dotStyle: "filled" | "hollow" =
            item.dot ?? (isFirst || isLast ? "filled" : "hollow");

          return (
            <li key={`${item.day}-${item.title}`} className="relative pl-12">
              {/* Dot with scroll detection */}
              <div
                ref={(el) => {
                  dotRefs.current[idx] = el;
                }}
                data-day-index={idx}
                className={clsx(
                  "absolute left-0 top-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500",
                  dotStyle === "filled" ? "border-transparent" : "bg-white",
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-40"
                )}
                style={{
                  backgroundColor: dotStyle === "filled" ? colorHex : "white",
                  borderColor: colorHex,
                }}
              >
                {/* Inner small dot for hollow style */}
                {dotStyle === "hollow" ? (
                  <span
                    className="block h-2 w-2 rounded-full transition-all duration-500"
                    style={{ backgroundColor: colorHex }}
                  />
                ) : null}
              </div>

              {/* Text with animation */}
              <div
                className={clsx(
                  "space-y-2 transition-all duration-700 ease-out overflow-hidden",
                  isVisible
                    ? "opacity-100 max-h-96 transform translate-y-0"
                    : "opacity-0 max-h-0 transform translate-y-4"
                )}
              >
                <h3 className="text-[15px] sm:text-base font-semibold text-gray-900">
                  <span className="mr-2">Day {item.day}:</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                  {item.details}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
