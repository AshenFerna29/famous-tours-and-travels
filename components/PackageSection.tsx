"use client";

import PackageCard from "./PackageCard";
import type { TourPackage } from "@/types/package";
import packagesData from "@/data/packages.json"; // static import

export default function PackagesSection() {
  const packages = packagesData as TourPackage[];

  const handleExplore = (id: string) => {
    // navigate, open modal, or route push – your choice.
    // Example (client): router.push(`/packages/${id}`)
    console.log("Explore:", id);
  };

  return (
    <section className="mt-15 mx-auto max-w-7xl">
      <header className="max-w-2xl">
        <h2 className="text-4xl font-bold text-black mb-4 ml-15 text-left">
          Plan the Trip of a <span className="text-[#fda720]">Lifetime</span>
          <br /> with Ease
        </h2>
        <p className="text-lg text-black max-w-2xl text-left ml-15">
          Carefully crafted itineraries that showcase the best of Sri Lanka’s
          natural beauty, rich culture, and unique experiences.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-15">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} data={pkg} onExplore={handleExplore} />
        ))}
      </div>
    </section>
  );
}
