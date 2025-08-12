"use client";

import React from "react";
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

          const dotStyle: "filled" | "hollow" =
            item.dot ?? (isFirst || isLast ? "filled" : "hollow");

          return (
            <li key={`${item.day}-${item.title}`} className="relative pl-12">
              {/* Dot */}
              <span
                aria-hidden
                className={clsx(
                  "absolute left-0 top-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border-2",
                  dotStyle === "filled" ? "border-transparent" : "bg-white"
                )}
                style={{
                  backgroundColor: dotStyle === "filled" ? colorHex : "white",
                  borderColor: colorHex,
                }}
              >
                {/* Inner small dot for hollow style */}
                {dotStyle === "hollow" ? (
                  <span
                    className="block h-2 w-2 rounded-full"
                    style={{ backgroundColor: colorHex }}
                  />
                ) : null}
              </span>

              {/* Text */}
              <div className="space-y-2">
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
