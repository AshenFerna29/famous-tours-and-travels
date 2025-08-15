import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === "undefined") return defaultValue;
    return (
      values[queries.findIndex((q) => window.matchMedia(q).matches)] ??
      defaultValue
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const get = () =>
      values[queries.findIndex((q) => window.matchMedia(q).matches)] ??
      defaultValue;

    const handler = () => setValue(get);
    queries.forEach((q) =>
      window.matchMedia(q).addEventListener("change", handler)
    );
    return () =>
      queries.forEach((q) =>
        window.matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// Note: We previously preloaded images before animating. On slower/mobile
// networks this could delay rendering entirely. We now render immediately
// and let the browser stream images in to ensure content is visible.

interface Item {
  id: string;
  img: string;
  url?: string;
  height: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getInitialPosition = useCallback(
    (item: GridItem) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return { x: item.x, y: item.y };

      let direction = animateFrom;
      if (animateFrom === "random") {
        const dirs = ["top", "bottom", "left", "right"];
        direction = dirs[
          Math.floor(Math.random() * dirs.length)
        ] as typeof animateFrom;
      }

      switch (direction) {
        case "top":
          return { x: item.x, y: -200 };
        case "bottom":
          return {
            x: item.x,
            y:
              typeof window !== "undefined"
                ? window.innerHeight + 200
                : item.y + 200,
          };
        case "left":
          return { x: -200, y: item.y };
        case "right":
          return {
            x:
              typeof window !== "undefined"
                ? window.innerWidth + 200
                : item.x + 200,
            y: item.y,
          };
        case "center":
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 100 };
      }
    },
    [animateFrom, containerRef]
  );

  // No preloading step; show content right away for better mobile UX

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: "50px", // Start animation 50px before the component is fully visible
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems: GridItem[] = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    const maxHeight = Math.max(...colHeights, 0) - (columns > 0 ? gap : 0);
    return { grid: gridItems, containerHeight: Math.max(0, maxHeight) };
  }, [columns, items, width]);

  const hasMounted = useRef(false);
  const hasAnimated = useRef(false);

  // Set initial positions without animation when images are ready
  useLayoutEffect(() => {
    if (!width) return;

    grid.forEach((item) => {
      const selector = `[data-key="${item.id}"]`;

      // Set initial hidden state without animation
      if (!hasAnimated.current) {
        const start = getInitialPosition(item);
        gsap.set(selector, {
          opacity: 0,
          x: start.x,
          y: start.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        });
      } else {
        // Handle resize animations
        gsap.to(selector, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [grid, width, getInitialPosition, blurToFocus, duration, ease]);

  // Animate in when component comes into view
  useLayoutEffect(() => {
    if (!isInView || hasAnimated.current) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      gsap.to(selector, {
        opacity: 1,
        ...animProps,
        ...(blurToFocus && { filter: "blur(0px)" }),
        duration: 0.8,
        ease: "power3.out",
        delay: index * stagger,
      });
    });

    hasAnimated.current = true;
  }, [grid, isInView, stagger, blurToFocus]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight || undefined }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className={`absolute box-content ${
            item.url ? "cursor-pointer" : "cursor-default"
          }`}
          style={{ willChange: "transform, width, height, opacity" }}
          onClick={
            item.url
              ? () => window.open(item.url, "_blank", "noopener")
              : undefined
          }
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
