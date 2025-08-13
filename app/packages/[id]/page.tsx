import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CarFront, Hotel, Flag } from "lucide-react";
import { getAllPackageIds, getPackageById } from "@/lib/packages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateStaticParams() {
  return getAllPackageIds().map((id) => ({ id }));
}

export default async function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = getPackageById(id);
  if (!data) return notFound();

  const b = data.badges || {};
  const gallery = data.gallery?.length ? data.gallery : [data.image];

  return (
    <>
      <Navbar />

      <div className="pt-25">
        <Breadcrumb
          items={[{ label: "Home", href: "/home" }, { label: "Bookings" }]}
        />
      </div>

      <main className="px-6 md:px-40 py-6 space-y-12">
        <h2 className="text-3xl font-bold text-[#fda720] mb-6">{data.title}</h2>

        <section className="mb-6 grid grid-cols-4 gap-4">
          <div className="relative col-span-4 aspect-[16/11] overflow-hidden sm:col-span-2 sm:row-span-2">
            <Image
              src={gallery[0]}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
          {gallery.slice(1, 5).map((src, i) => (
            <div key={i} className="relative aspect-[6/4.1] overflow-hidden">
              <Image
                src={src}
                alt={`${data.title} ${i + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </section>

        <section className="mb-10">
          <div className="flex flex-wrap justify-between items-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#353978]">
                <Flag size={16} />
              </div>
              <div>
                <div className="text-xs text-[#353978]">Type</div>
                <div className="text-sm font-medium text-gray-900">
                  {b.type || data.type}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#353978]">
                <CalendarDays size={16} />
              </div>
              <div>
                <div className="text-xs text-[#353978]">Duration</div>
                <div className="text-sm font-medium text-gray-900">
                  {b.duration || `${data.days} Days`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#353978]">
                <CarFront size={16} />
              </div>
              <div>
                <div className="text-xs text-[#353978]">Vehicle</div>
                <div className="text-sm font-medium text-gray-900">
                  {b.vehicle || "Car / Van"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#353978]">
                <Hotel size={16} />
              </div>
              <div>
                <div className="text-xs text-[#353978]">Hotel Category</div>
                <div className="text-sm font-medium text-gray-900">
                  {b.hotelCategory || "3‑4 star"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {data.overview && (
          <section className="prose max-w-none">
            <h2 className="text-3xl font-bold text-[#fda720] mb-6">
              Tour Overview
            </h2>
            <p>{data.overview}</p>
          </section>
        )}

        {!!data.highlights?.length && (
          <section className="prose mt-8 max-w-none">
            <h2 className="text-3xl font-bold text-[#fda720] mb-6">
              Tour Highlights
            </h2>
            <ul className="not-prose space-y-3 mt-4">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2"></div>
                  <span className="text-black leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!!data.itinerary?.length && (
          <section className="prose mt-8 max-w-none">
            <h2 className="text-3xl font-bold text-[#fda720] mb-6">
              Itinerary
            </h2>
            <div className="not-prose">
              <ItineraryTimeline items={data.itinerary} colorHex="#fda720" />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
