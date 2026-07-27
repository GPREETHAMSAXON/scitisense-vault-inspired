import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "Customer Service Management — Scitisense Futurize" };

const FEATURES = [
  "Seamless Omnichannel Engagement",
  "Empowering Self-Service Portals",
  "Intelligent Case Management",
  "Proactive & Predictive Care",
];

const DEEP_DIVE = [
  {
    heading: "Elevate Your Customer Experience with ServiceNow CSM",
    body:    "Unify every customer touchpoint into one connected experience.",
  },
  {
    heading: "Integrated Customer Support Channels",
    body:    "Omni-channel support that meets customers wherever they are.",
  },
  {
    heading: "Intelligent Request Routing & Tracking",
    body:    "Route and track requests automatically for faster resolution.",
  },
  {
    heading: "Forward-Thinking Problem Solving",
    body:    "Predictive care that resolves issues before customers notice them.",
  },
];

export default function CSMPage() {
  return (
    <>
      <ServiceDetailHero
        title="Customer Service Management"
        tagline="Monitors and manages customer-facing operations to ensure fast, consistent, and proactive service experiences."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
