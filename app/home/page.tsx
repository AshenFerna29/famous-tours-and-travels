import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeSection from "@/components/WelcomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />

      <Footer />
    </>
  );
}
