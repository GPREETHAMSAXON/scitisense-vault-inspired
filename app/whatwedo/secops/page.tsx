import Navbar from "@/components/Navbar";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "Security Operations — Scitisense Futurize" };

const FEATURES = [
  "Security Incident Response (SIR)",
  "Vulnerability Response (VR)",
  "Threat Intelligence",
  "Configuration Compliance",
];

const DEEP_DIVE = [
  {
    heading: "Zero Trust & Adaptive Security Architecture",
    body:    "Build security postures that adapt to evolving threat landscapes.",
  },
  {
    heading: "Cloud SecOps & Posture Management",
    body:    "Maintain continuous visibility into cloud security posture.",
  },
  {
    heading: "Intelligence-Led Security Operations",
    body:    "Drive response with real-time threat intelligence.",
  },
  {
    heading: "Risk-Based Vulnerability Management",
    body:    "Prioritize remediation based on actual business risk, not just CVSS scores.",
  },
];

export default function SecOpsPage() {
  return (
    <>
      <Navbar />
      <ServiceDetailHero
        title="Security Operations (SecOps)"
        tagline="Intelligent security response. Replace manual coordination with automated playbooks. We bridge the gap between security and IT to resolve vulnerabilities and incidents before they impact your bottom line."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <ServiceDeepDive sections={DEEP_DIVE} />
      <CTABand />
      <Footer />
    </>
  );
}
