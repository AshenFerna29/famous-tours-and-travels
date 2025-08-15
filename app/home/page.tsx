import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeSection from "@/components/WelcomeSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThingsToDo from "@/components/ThigsToDo";
import Gallery from "@/components/Gallery";
import PackageSection from "@/components/PackageSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />
      <ThingsToDo />
      <PackageSection />
      <Gallery />
      <Footer />
    </>
  );
}
