import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "Platform Optimization — Scitisense Futurize" };

const FEATURES = [
  "Platform Performance Optimization",
  "License Optimization",
  "Workflow & Process Optimization",
  "UI/UX & Workspace Optimization",
];

const DEEP_DIVE = [
  {
    heading: "Customization & Configuration Enhancement",
    body:    "Refine configurations to match evolving business needs without technical debt.",
  },
  {
    heading: "Workflow & Process Optimization",
    body:    "Eliminate redundant steps and accelerate process throughput.",
  },
  {
    heading: "Data & Search Optimization",
    body:    "Improve data quality and search performance platform-wide.",
  },
  {
    heading: "Integration & System Alignment",
    body:    "Keep ServiceNow aligned with your broader systems landscape.",
  },
];

export default function PlatformOptimizationPage() {
  return (
    <>
      <ServiceDetailHero
        title="Platform Optimization"
        tagline="Monitors and manages your ServiceNow platform to ensure optimal performance, usability, and ROI on every license."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
