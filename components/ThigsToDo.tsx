"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Location = {
  id: number;
  name: string;
  slug: string;
  x: number; // left %
  y: number; // top %
  excerpt: string;
};

const LOCATIONS: Location[] = [
  { id: 1,  name: "Negombo",      slug: "negombo",       x: 28, y: 55, excerpt: "Beaches, canals, and fresh seafood close to the airport." },
  { id: 2,  name: "Colombo",       slug: "colombo",       x: 29, y: 60, excerpt: "Sri Lanka’s energetic capital—food, culture, shopping." },
  { id: 3,  name: "Galle",         slug: "galle",         x: 38, y: 74, excerpt: "UNESCO fort, cobblestoned streets, cafes, sunset ramparts." },
  { id: 4,  name: "Yala",          slug: "yala",          x: 82, y: 66, excerpt: "Leopards, elephants, and epic safari landscapes." },
  { id: 5,  name: "Kandy",         slug: "kandy",         x: 48, y: 53, excerpt: "Temple of the Tooth, lake walks, and hill-country gateway." },
  { id: 6,  name: "Nuwara Eliya",  slug: "nuwara-eliya",  x: 54, y: 60, excerpt: "Tea country, misty mornings, and colonial charm." },
  { id: 7,  name: "Jaffna",        slug: "jaffna",        x: 33, y: 12, excerpt: "Colorful temples and unique northern Tamil culture." },
  { id: 8,  name: "Anuradhapura",  slug: "anuradhapura",  x: 43, y: 31, excerpt: "Sacred ancient city with colossal stupas and ruins." },
  { id: 9,  name: "Polonnaruwa",   slug: "polonnaruwa",   x: 63, y: 38, excerpt: "Medieval capital with well-preserved ruins and ancient temples." },
  { id: 10, name: "Trincomalee",   slug: "trincomalee",   x: 66, y: 29, excerpt: "Nilaveli beaches, Pigeon Island, and Koneswaram Temple." },
  { id: 11, name: "Ella",          slug: "ella",          x: 61, y: 68, excerpt: "Hill-country village for Ella Rock, Nine Arches Bridge & Ravana Falls." },
  { id: 12, name: "Mirissa",       slug: "mirissa",       x: 51, y: 78, excerpt: "South-coast bay with whale watching and Coconut Tree Hill." },
  { id: 13, name: "Dambulla",      slug: "dambulla",      x: 55, y: 46, excerpt: "UNESCO cave temples filled with gilded Buddhas and murals." },
  { id: 14, name: "Bentota",       slug: "bentota",       x: 33, y: 71, excerpt: "Golden beaches and watersports on the Bentota River." },
  { id: 15, name: "Hikkaduwa",     slug: "hikkaduwa",     x: 36, y: 73, excerpt: "Coral sanctuary, mellow surf, and turtle hatcheries." },
  { id: 16, name: "Wilpattu",      slug: "wilpattu",      x: 34, y: 28, excerpt: "Sri Lanka’s largest park—leopards, lakes (villus), and quiet safaris." },
  { id: 17, name: "Wasgamuwa",     slug: "wasgamuwa",     x: 60, y: 50, excerpt: "Low-key national park with elephants and rich birdlife." },
  { id: 18, name: "Sinharaja",     slug: "sinharaja",     x: 45, y: 67, excerpt: "UNESCO rainforest—endemic flora, frogs, and superb birding." },
  { id: 19, name: "Udawalawe",     slug: "udawalawe",     x: 64, y: 70, excerpt: "Open landscapes and large elephant herds—classic safari." },
  { id: 20, name: "Pinnawala",     slug: "pinnawala",     x: 44, y: 56, excerpt: "Elephant Orphanage with riverside viewing and feeding times." },
  { id: 21, name: "Batticaloa",    slug: "batticaloa",    x: 80, y: 40, excerpt: "East-coast lagoons, Kallady Beach, and the old Dutch Fort." },
  { id: 22, name: "Arugam Bay",    slug: "arugam-bay",    x: 90, y: 60, excerpt: "World-class surf, chilled cafes, and wild beaches near Pottuvil." },
];

/** itinerary neighbors for glowing arcs */
const ARC_NEIGHBORS: Record<number, number[]> = {
  1: [2, 5],
  2: [1, 3],
  3: [2, 4],
  4: [3, 6, 22],              
  5: [6, 9],
  6: [5, 4],
  7: [8],
  8: [9, 7],
  9: [10, 5, 21],             
  10: [9, 8, 21],             
  11: [6, 20, 4, 19, 22],    
  12: [15, 3, 19],
  13: [5, 9, 8, 20, 17],
  14: [2, 15, 3],
  15: [14, 3, 12, 18],
  16: [8, 1, 2],
  17: [13, 9, 5],
  18: [3, 15, 19],
  19: [11, 18, 12, 4, 22],    
  20: [5, 2, 1, 13],
  21: [10, 9, 22],            
  22: [21, 4, 11, 19],        
};


export default function ThingsToDo() {
  const [activeId, setActiveId] = useState<number>(3);
  const active = useMemo(
    () => LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0],
    [activeId]
  );

  // Variants (unchanged)
  const fade: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const listStagger: Variants = {
    show: { transition: { staggerChildren: 0.04 } },
  };
  const pinPop: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  // Ripple trail (unchanged)
  const rippleLayerRef = useRef<HTMLDivElement | null>(null);
  const rippleNodesRef = useRef<HTMLSpanElement[]>([]);
  const poolIdxRef = useRef(0);
  const lastTsRef = useRef(0);
  const POOL = 12;

  const setRippleNode = (el: HTMLSpanElement | null, i: number) => {
    if (!el) return;
    rippleNodesRef.current[i] = el;
  };
  const spawnRipple = (x: number, y: number) => {
    const node = rippleNodesRef.current[poolIdxRef.current];
    poolIdxRef.current = (poolIdxRef.current + 1) % POOL;
    if (!node) return;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.classList.remove("r-burst");
    // restart keyframes
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    node.offsetWidth;
    node.classList.add("r-burst");
  };
  const onRippleMove = (e: React.MouseEvent) => {
    const layer = rippleLayerRef.current;
    if (!layer) return;
    const now = performance.now();
    if (now - lastTsRef.current < 90) return;
    lastTsRef.current = now;
    const rect = layer.getBoundingClientRect();
    spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  // Arc helpers (unchanged)
  const idToLoc = (id: number) => LOCATIONS.find((l) => l.id === id);
  const quadPath = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    k = 0.18
  ) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const nx = -dy / len;
    const ny = dx / len;
    const cx = mx + nx * len * k;
    const cy = my + ny * len * k;
    return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
  };
  const neighborIds = ARC_NEIGHBORS[activeId] ?? [];
  const arcPairs = neighborIds
    .map((nid) => {
      const A = active;
      const B = idToLoc(nid);
      if (!A || !B) return null;
      return {
        key: `${A.id}-${B.id}`,
        d: quadPath({ x: A.x, y: A.y }, { x: B.x, y: B.y }),
      };
    })
    .filter(Boolean) as { key: string; d: string }[];

  // Sparkle ring settings (still used for active)
  const SPARKLES = 7;
  const RADIUS_PX = 18;
  const DURATIONS = [720, 780, 840, 900];

  return (
    <section className="relative bg-white">
      {/* background aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(14,165,233,0.2),transparent_60%),radial-gradient(40%_45%_at_80%_15%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(50%_60%_at_50%_90%,rgba(2,132,199,0.16),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 pt-10 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr_1fr] items-start">
          {/* LEFT copy */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-[42px] leading-[0.9] font-extrabold text-black sm:text-6xl lg:text-7xl">
              <span className="block">PLACES THAT</span>
              <span className="block">WE VISIT</span>
            </h2>
            <p className="mt-2 text-xl tracking-[0.12em] uppercase text-black/80">
              in sri lanka
            </p>
            <p className="mt-8 max-w-xl text-[15px] leading-7 text-black/80">
              We want to share Sri Lanka’s extraordinarily diverse and authentic
              story with the rest of the world. We want to help you discover the
              many thousands of different ways in which you can fall in love
              with our home &amp; plan the perfect trip; local experts, local
              perspective and all the best tips on where to eat, what to do, who
              to meet, how to get there and where to make your next favourite
              memory.
            </p>
          </motion.div>

          {/* MIDDLE: map (static) */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[660px]">
              {/* watercolor backdrop */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-6%] -z-10"
              >
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_55%_30%,rgba(59,130,246,0.16),transparent_55%)] blur-2xl" />
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_45%_75%,rgba(14,165,233,0.18),transparent_60%)] blur-2xl" />
              </div>

              {/* stage */}
              <div className="relative w-full" onMouseMove={onRippleMove}>
                {/* base map */}
                <div className="relative w-full">
                  <Image
                    src="/images/map-srilanka.png"
                    alt="Sri Lanka map"
                    width={720}
                    height={920}
                    className="object-contain select-none pointer-events-none w-full h-auto drop-shadow-xl"
                    priority
                  />
                </div>

                {/* ripple layer */}
                <div
                  ref={rippleLayerRef}
                  className="pointer-events-none absolute inset-0 overflow-hidden map-clip z-[2]"
                >
                  {Array.from({ length: POOL }).map((_, i) => (
                    <span
                      key={i}
                      ref={(el) => setRippleNode(el, i)}
                      className="ripple-dot"
                    />
                  ))}
                </div>

                {/* arcs */}
                <div className="pointer-events-none absolute inset-0 map-clip z-[2]">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <defs>
                      <linearGradient
                        id="arcStroke"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgba(56,189,248,0.0)" />
                        <stop offset="50%" stopColor="rgba(56,189,248,0.7)" />
                        <stop offset="100%" stopColor="rgba(2,132,199,0.0)" />
                      </linearGradient>
                    </defs>
                    {arcPairs.map(({ key, d }, idx) => (
                      <g key={key}>
                        <motion.path
                          d={d}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.55 }}
                          transition={{
                            duration: 0.8 + idx * 0.1,
                            ease: "easeOut",
                          }}
                          fill="none"
                          stroke="rgba(56,189,248,0.35)"
                          strokeWidth={6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ filter: "blur(2px)" }}
                          vectorEffect="non-scaling-stroke"
                        />
                        <motion.path
                          d={d}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{
                            duration: 0.8 + idx * 0.1,
                            ease: "easeOut",
                          }}
                          fill="none"
                          stroke="url(#arcStroke)"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* pins — NEW number hover treatment */}
                <motion.div
                  variants={listStagger}
                  initial="hidden"
                  animate="show"
                  className="pointer-events-none absolute inset-0 z-[3]"
                >
                  {LOCATIONS.map((loc) => {
                    const isActive = activeId === loc.id;
                    return (
                      <motion.button
                        key={loc.id}
                        title={loc.name}
                        aria-label={loc.name}
                        onMouseEnter={() => setActiveId(loc.id)}
                        onFocus={() => setActiveId(loc.id)}
                        variants={pinPop}
                        whileHover={{ scale: 1.04 }}
                        className={cn(
                          "pointer-events-auto group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none"
                        )}
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                      >
                        {/* Number chip */}
                        <span className="pin-chip">
                          <span
                            className={cn(
                              "pin-num",
                              isActive && "pin-num--active"
                            )}
                          >
                            {loc.id}
                          </span>
                          {/* Slide-out label on hover/focus */}
                          <span className="pin-label">{loc.name}</span>
                        </span>

                        {/* keep active sparkles for the selected pin */}
                        {isActive && (
                          <span
                            className="pointer-events-none absolute left-1/2 top-1/2"
                            key={`sp-${activeId}`}
                          >
                            {Array.from({ length: SPARKLES }).map((_, i) => {
                              const angle = (i * 360) / SPARKLES;
                              const dur = `${
                                DURATIONS[i % DURATIONS.length]
                              }ms`;
                              const delay = `${i * 60}ms`;
                              return (
                                <span
                                  key={i}
                                  className="sparkle"
                                  style={
                                    {
                                      "--rot": `${angle}deg`,
                                      "--rad": `${RADIUS_PX}px`,
                                    } as React.CSSProperties
                                  }
                                >
                                  <span
                                    className="sparkle-i"
                                    style={
                                      {
                                        "--dur": dur,
                                        "--delay": delay,
                                      } as React.CSSProperties
                                    }
                                  />
                                </span>
                              );
                            })}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: card */}
          <motion.aside
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:mt-4 xl:mt-10"
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-[22px] bg-white shadow-[0_20px_80px_rgba(2,132,199,0.12)] ring-1 ring-black/5"
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="relative w-full h-72 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Image
                      src={`/images/locations/${active.slug}.jpg`}
                      alt={active.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-extrabold tracking-tight uppercase">
                  {active.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-gray-400">
                  ideas &amp; tips · sri lanka
                </p>
                <p className="mt-4 text-[15px] leading-7 text-gray-700">
                  {active.excerpt}
                </p>
                <button
                  type="button"
                  aria-label="Open"
                  className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-300 hover:ring-sky-400 hover:text-sky-700 transition"
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>

      {/* Local CSS (new pin styles + keep existing utility animations) */}
      <style jsx global>{`
        .map-clip {
          -webkit-mask-image: url("/images/map-srilanka.png");
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          -webkit-mask-size: contain;
          mask-image: url("/images/map-srilanka.png");
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: contain;
        }

        /* ===== NEW number chip ===== */
        .pin-chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 8px 0 0;
          height: 28px;
          transform-origin: left center;
        }
        .pin-num {
          position: relative;
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          border: 2px solid #fff;
          background: radial-gradient(
            circle at 50% 35%,
            #0ea5e9 0%,
            #0284c7 60%,
            #0369a1 100%
          );
          box-shadow: 0 6px 14px rgba(2, 132, 199, 0.24);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        /* shine sweep on the number */
        .pin-num::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0) 0deg,
            rgba(255, 255, 255, 0.9) 40deg,
            rgba(255, 255, 255, 0) 80deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transform: rotate(0deg);
        }
        .group:hover .pin-num::after,
        .group:focus .pin-num::after {
          opacity: 0.9;
          animation: pinRing 950ms linear infinite;
        }
        @keyframes pinRing {
          to {
            transform: rotate(360deg);
          }
        }

        /* slide-out label to the right */
        .pin-label {
          position: absolute;
          left: 28px; /* just to the right of the number */
          top: 50%;
          transform: translateY(-50%) translateX(6px) scale(0.98);
          transform-origin: left center;
          max-width: 0;
          opacity: 0;
          padding: 6px 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(2, 132, 199, 0.35);
          backdrop-filter: saturate(1.1) blur(2px);
          color: #0c4a6e; /* sky-900 */
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.18);
          transition: max-width 0.25s ease, opacity 0.2s ease,
            transform 0.22s ease;
        }
        .pin-label::before {
          content: "";
          position: absolute;
          left: -5px;
          top: 50%;
          width: 8px;
          height: 8px;
          transform: translateY(-50%) rotate(45deg);
          background: inherit;
          border-left: 1px solid rgba(2, 132, 199, 0.35);
          border-bottom: 1px solid rgba(2, 132, 199, 0.35);
          border-radius: 1px;
        }
        .group:hover .pin-label,
        .group:focus .pin-label {
          max-width: 220px;
          opacity: 1;
          transform: translateY(-50%) translateX(10px) scale(1);
        }
        .group:hover .pin-num,
        .group:focus .pin-num {
          transform: translateY(-1px) scale(1.06);
          box-shadow: 0 14px 28px rgba(2, 132, 199, 0.3);
        }
        .pin-num--active {
          outline: 2px solid rgba(56, 189, 248, 0.45); /* subtle state hint for selected pin */
          outline-offset: 2px;
        }

        /* existing sparkles / ripple (unchanged) */
        .sparkle {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%) rotate(var(--rot))
            translate(var(--rad));
          pointer-events: none;
        }
        .sparkle-i {
          position: absolute;
          left: 0;
          top: 0;
          width: 12px;
          height: 12px;
          transform: translate(-50%, -50%) scale(0.65);
          opacity: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0) 65%
          );
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.65));
          border-radius: 9999px;
          animation: sparklePop var(--dur, 780ms) ease-out var(--delay, 0ms)
            forwards;
        }
        .sparkle-i::before,
        .sparkle-i::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          pointer-events: none;
        }
        .sparkle-i::before {
          width: 14px;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
          );
        }
        .sparkle-i::after {
          width: 2px;
          height: 14px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
          );
        }
        @keyframes sparklePop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.65);
          }
          35% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .ripple-dot {
          position: absolute;
          width: 180px;
          height: 180px;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          border-radius: 9999px;
          pointer-events: none;
          background: radial-gradient(
            circle at center,
            rgba(56, 189, 248, 0.25) 0%,
            rgba(56, 189, 248, 0.18) 35%,
            rgba(56, 189, 248, 0.1) 55%,
            rgba(56, 189, 248, 0) 70%
          );
          filter: saturate(1.15);
        }
        .r-burst {
          animation: burst 900ms ease-out forwards;
        }
        @keyframes burst {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(0.6);
          }
          70% {
            opacity: 0.15;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .r-burst,
          .sparkle-i {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
