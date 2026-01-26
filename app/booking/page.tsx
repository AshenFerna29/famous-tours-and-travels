export const metadata = {
  title: "Book Your Trip | Famous Tours & Travels",
  description:
    "Secure your Sri Lanka travel experience today. Book your personalized tour package with Famous Tours & Travels quickly and easily.",
  alternates: {
    canonical: "https://famoustoursandtravels.com/booking",
  },
  openGraph: {
    title: "Book Your Sri Lanka Tour",
    description:
      "Reserve your Sri Lanka tour package with ease. Customize your journey and book securely with Famous Tours & Travels.",
    url: "https://famoustoursandtravels.com/booking",
    type: "website",
  },
};

import BookingContent from "./booking-content";

export default function BookingPage() {
  return <BookingContent />;
}
