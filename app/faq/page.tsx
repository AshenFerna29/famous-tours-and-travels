export const metadata = {
  title: "FAQ | Famous Tours & Travels",
  description:
    "Find answers to the most common travel questions about our Sri Lanka tour packages, bookings, payments, transport, and more.",
  alternates: {
    canonical: "https://famoustoursandtravels.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Learn more about tour packages, booking details, pricing, itinerary flexibility, and other travel-related FAQs for Famous Tours & Travels.",
    url: "https://famoustoursandtravels.com/faq",
    type: "website",
  },
};


import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function FAQPage() {
  return (
    <>
      <Navbar />
      <FAQ />
      <Footer />
    </>
  );
}
