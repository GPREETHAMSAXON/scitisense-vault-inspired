import Navbar from "@/components/Navbar";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "Human Resource Service Delivery — Scitisense Futurize" };

const FEATURES = [
  "HR Service Center",
  "HR Case Management",
  "Center of Excellence (CoE)",
  "HR Lifecycle Events",
];

const DEEP_DIVE = [
  {
    heading: "Financial Wellness & Rewards",
    body:    "Streamline compensation, benefits, and rewards programs through self-service.",
  },
  {
    heading: "Holistic Wellbeing and Benefits",
    body:    "Give employees a single place to manage health, wellness, and benefits enrollment.",
  },
  {
    heading: "Time & Equilibrium Management",
    body:    "Simplify leave, time-off, and work-life balance requests.",
  },
  {
    heading: "Talent Acceleration & Growth",
    body:    "Connect learning and development journeys directly to HR case workflows.",
  },
];

export default function HRSDPage() {
  return (
    <>
      <Navbar />
      <ServiceDetailHero
        title="Human Resource Service Delivery"
        tagline="We help HR teams deliver consumer-grade employee experiences — unifying case management, self-service, and lifecycle events on a single platform."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
