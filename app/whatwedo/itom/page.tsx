import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "IT Operations Management — Scitisense Futurize" };

const FEATURES = ["Discovery", "Event Management", "Service Mapping", "CMDB & CMDB Health"];

const DEEP_DIVE = [
  {
    heading: "Gaining Total Infrastructure Visibility",
    body:    "Automatically discover and map every asset across your hybrid environment.",
  },
  {
    heading: "Turning Noise into Actionable Insights",
    body:    "Correlate event data into meaningful alerts, cutting through operational noise.",
  },
  {
    heading: "Connecting IT to Business Value",
    body:    "Map technical services to business outcomes so impact is always clear.",
  },
  {
    heading: "Building a Trustworthy Foundation",
    body:    "Maintain a clean, reliable CMDB that every other ServiceNow module can depend on.",
  },
];

export default function ITOMPage() {
  return (
    <>
      <ServiceDetailHero
        title="IT Operations Management"
        tagline="Monitors and manages IT infrastructure, cloud resources, and services to ensure optimal performance and availability."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
