import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, CarFront, Hotel, Flag } from "lucide-react";
import { getAllPackageIds, getPackageById } from "@/lib/packages";
import Navbar from "@/components/Navbar";

export async function generateStaticParams() {
  return getAllPackageIds().map((id) => ({ id }));
}

export default function PackageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = getPackageById(params.id);
  if (!data) return notFound();

  const b = data.badges || {};
  const gallery = data.gallery?.length ? data.gallery : [data.image];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10 pt-32">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <Link href="/#packages" className="hover:underline">
            Packages
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">{data.title}</span>
        </nav>

        <h2 className="text-3xl font-bold text-[#fda720] mb-6">{data.title}</h2>

        <section className="mb-6 grid grid-cols-4 gap-3">
          <div className="relative col-span-4 aspect-[16/9] overflow-hidden rounded-xl sm:col-span-2 sm:row-span-2">
            <Image
              src={gallery[0]}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
          {gallery.slice(1, 5).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`${data.title} ${i + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </section>

        <section className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Badge
            icon={<Flag size={16} />}
            label="Type"
            value={b.type || data.type}
          />
          <Badge
            icon={<CalendarDays size={16} />}
            label="Duration"
            value={b.duration || `${data.days} Days`}
          />
          <Badge
            icon={<CarFront size={16} />}
            label="Vehicle"
            value={b.vehicle || "Car / Van"}
          />
          <Badge
            icon={<Hotel size={16} />}
            label="Hotel Category"
            value={b.hotelCategory || "3‑4 star"}
          />
        </section>

        {data.overview && (
          <section className="prose max-w-none">
            <h2>Tour Overview</h2>
            <p>{data.overview}</p>
          </section>
        )}

        {!!data.highlights?.length && (
          <section className="prose mt-8 max-w-none">
            <h2>Tour Highlights</h2>
            <ul>
              {data.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>
        )}

        {!!data.itinerary?.length && (
          <section className="prose mt-8 max-w-none">
            <h2>Itinerary</h2>
            <ol className="not-prose space-y-4">
              {data.itinerary.map((item) => (
                <li
                  key={item.day}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="mb-1 text-sm font-semibold text-orange-600">
                    Day {item.day}
                  </div>
                  <div className="text-base font-semibold">{item.title}</div>
                  <p className="mt-1 text-gray-600">{item.details}</p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>
    </>
  );
}

function Badge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
}
