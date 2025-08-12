"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Flag } from "lucide-react";
import type { TourPackage } from "@/types/package";

type Props = {
  data: TourPackage;
};

export default function PackageCard({ data }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white ">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, 100vw"
          priority={false}
        />
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        {/* Days badge */}
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-gray-600">
            <CalendarDays size={14} />
            {data.days} {data.days === 1 ? "Day" : "Days"}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-gray-600 ring-1 ring-gray-200">
            <Flag size={14} /> {data.type}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-tight">{data.title}</h3>
        <p className="line-clamp-3 text-sm text-gray-600">{data.description}</p>

        {/* Explore */}
        <Link
          href={`/packages/${data.id}`}
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gray-800 transition group-hover:gap-3"
          aria-label={`Explore ${data.title}`}
        >
          EXPLORE
          <ArrowUpRight size={18} className="opacity-70" />
        </Link>
      </div>
    </div>
  );
}
