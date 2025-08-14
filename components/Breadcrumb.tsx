import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({
  items,
  className = "px-6 md:px-40 mt-10 text-sm text-gray-500",
  separator = ">"
}: {
  items: Crumb[];
  className?: string;
  separator?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#fda720] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-black" : "text-gray-500"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="mx-1">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
