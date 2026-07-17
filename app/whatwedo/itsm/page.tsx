import Navbar from "@/components/Navbar";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "IT Service Management — Scitisense Futurize" };

const FEATURES = ["Incident", "Change Request", "Problem", "Service Catalog"];

const DEEP_DIVE = [
  {
    heading: "Core ITSM Module Implementation",
    body:    "Deploy foundational ITSM modules configured to your organization's workflows and compliance needs.",
  },
  {
    heading: "Workflow Automation & Customization",
    body:    "Automate repetitive processes and tailor workflows to match your team's operating model.",
  },
  {
    heading: "Performance Analytics & Reporting",
    body:    "Transform ITSM data into actionable insights — real-time SLA tracking, incident trend monitoring, and data-driven bottleneck identification.",
  },
  {
    heading: "Workspace & Interface Optimization",
    body:    "Streamline agent and end-user interfaces for faster resolution and higher satisfaction.",
  },
];

export default function ITSMPage() {
  return (
    <>
      <Navbar />
      <ServiceDetailHero
        title="IT Service Management"
        tagline="We deliver end-to-end ITSM design and optimization services aligned with best practices like ITIL. Our goal is to streamline service delivery, improve efficiency, and enhance user satisfaction."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
