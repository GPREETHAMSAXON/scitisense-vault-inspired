import Navbar from "@/components/Navbar";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "Governance, Risk and Compliance — Scitisense Futurize" };

const FEATURES = [
  "Risk Management",
  "Audit Management",
  "Policy and Compliance Management",
  "Business Continuity Management",
];

const DEEP_DIVE = [
  {
    heading: "Managing Daily Risks & Rules",
    body:    "Integrated risk management that keeps policy and operations aligned in real time.",
  },
  {
    heading: "Securing Your Supply Chain",
    body:    "Third-party risk management that extends visibility beyond your own walls.",
  },
  {
    heading: "Protecting Customer Data",
    body:    "Privacy management built for evolving regulatory requirements.",
  },
  {
    heading: "Preparing for Disasters",
    body:    "Business continuity management that keeps operations resilient under disruption.",
  },
];

export default function GRCPage() {
  return (
    <>
      <Navbar />
      <ServiceDetailHero
        title="Governance, Risk and Compliance"
        tagline="Enterprise GRC, simplified. We transform fragmented compliance rules and hidden risks into a unified, automated framework — delivering real-time protection without the manual overhead."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
