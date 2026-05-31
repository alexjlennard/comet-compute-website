import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Platform from "@/components/Platform";
import Solutions from "@/components/Solutions";
import Infrastructure from "@/components/Infrastructure";
import Metrics from "@/components/Metrics";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <Platform />
      <Solutions />
      <Infrastructure />
      <Metrics />
      <Comparison />
      <Testimonials />
      <Certifications />
      <CTA />
      <Footer />
    </>
  );
}
