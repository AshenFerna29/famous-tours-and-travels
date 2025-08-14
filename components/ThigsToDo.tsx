"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Location = {
  id: number;
  name: string;
  slug: string;
  x: number; // left %
  y: number; // top %
  excerpt: string;
};

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Negombo",
    slug: "negombo",
    x: 28,
    y: 55,
    excerpt: "Beaches, canals, and fresh seafood close to the airport.",
  },
  {
    id: 2,
    name: "Colombo",
    slug: "colombo",
    x: 29,
    y: 60,
    excerpt: "Sri Lanka’s energetic capital—food, culture, shopping.",
  },
  {
    id: 3,
    name: "Galle",
    slug: "galle",
    x: 38,
    y: 74,
    excerpt: "UNESCO fort, cobblestoned streets, cafes, sunset ramparts.",
  },
  {
    id: 4,
    name: "Yala",
    slug: "yala",
    x: 82,
    y: 66,
    excerpt: "Leopards, elephants, and epic safari landscapes.",
  },
  {
    id: 5,
    name: "Kandy",
    slug: "kandy",
    x: 48,
    y: 53,
    excerpt: "Temple of the Tooth, lake walks, and hill‑country gateway.",
  },
  {
    id: 6,
    name: "Nuwara Eliya",
    slug: "nuwara-eliya",
    x: 54,
    y: 60,
    excerpt: "Tea country, misty mornings, and colonial charm.",
  },
  {
    id: 7,
    name: "Jaffna",
    slug: "jaffna",
    x: 33,
    y: 12,
    excerpt: "Colorful temples and unique northern Tamil culture.",
  },
  {
    id: 8,
    name: "Anuradhapura",
    slug: "anuradhapura",
    x: 43,
    y: 31,
    excerpt: "Sacred ancient city with colossal stupas and ruins.",
  },
  {
    id: 9,
    name: "Polonnaruwa",
    slug: "polonnaruwa",
    x: 63,
    y: 38,
    excerpt: "Medieval capital with well-preserved ruins and ancient temples.",
  },
  {
    id: 10,
    name: "Trincomalee",
    slug: "trincomalee",
    x: 66,
    y: 29,
    excerpt: "Nilaveli beaches, Pigeon Island, and Koneswaram Temple.",
  },
];

export default function ThingsToDo() {
  const [activeId, setActiveId] = useState<number>(3);
  const active = useMemo(
    () => LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0],
    [activeId]
  );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading + paragraph (SAME styling as your Gallery section) */}
        <div>
          <h2 className="text-4xl font-bold text-black mb-4 ml-15 text-left">
            Things to do in <br /> Sri Lanka
          </h2>
          <p className="text-lg text-black max-w-2xl text-left ml-15">
            We want to share Sri Lanka’s extraordinarily diverse and authentic
            story. Hover a location to preview ideas, tips, and must‑do
            experiences curated by local experts.
          </p>
        </div>

        {/* GRID — only map (left) and card (right) */}
        <div className="mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] items-start -mt-5">
          {/* Left: Map */}
          <div className="relative w-full ml-15">
            <div className="relative w-full max-w-[500px]">
              <Image
                src="/images/map-srilanka.png"
                alt="Sri Lanka map"
                width={600}
                height={900} // match your map’s actual aspect ratio
                className="object-contain select-none pointer-events-none w-full h-auto"
                priority
              />

              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  title={loc.name}
                  aria-label={loc.name}
                  onMouseEnter={() => setActiveId(loc.id)}
                  onFocus={() => setActiveId(loc.id)}
                  className={cn(
                    "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-sky-500/70"
                  )}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full border-2 text-[10px] font-bold",
                      activeId === loc.id
                        ? "bg-sky-600 text-white border-white ring-4 ring-sky-300/40"
                        : "bg-white text-sky-800 border-sky-700 group-hover:bg-sky-600 group-hover:text-white"
                    )}
                  >
                    {loc.id}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Swappable card */}
          <aside className="flex items-start justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden mt-35">
              <div className="relative h-64 w-full">
                <Image
                  key={active.slug}
                  src={`/images/locations/${active.slug}.jpg`}
                  alt={active.name}
                  fill
                  className="object-cover transition-opacity duration-300 data-[hidden=true]:opacity-0"
                  data-hidden={false}
                  priority
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold tracking-tight">
                  {active.id}. {active.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-gray-400">
                  ideas & tips · sri lanka
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {active.excerpt}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
