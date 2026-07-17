import Navbar from "@/components/Navbar";
import ServiceDetailHero from "@/components/ServiceDetailHero";
import ServiceFeatureGrid from "@/components/ServiceFeatureGrid";
import ServiceDeepDive from "@/components/ServiceDeepDive";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export const metadata = { title: "IT Asset Management — Scitisense Futurize" };

const FEATURES = [
  "Asset Lifecycle Management",
  "Asset Visibility & Tracking",
  "Cost Optimization & Control",
  "Compliance & Governance",
];

const HARDWARE_SECTIONS = [
  {
    heading: "Hardware Lifecycle Management",
    body:    "Track assets from procurement to retirement with complete lifecycle visibility.",
  },
  {
    heading: "Inventory & Asset Tracking",
    body:    "Real-time inventory accuracy across every location and department.",
  },
  {
    heading: "Cost & Vendor Management",
    body:    "Control spend and manage vendor relationships from a single source of truth.",
  },
  {
    heading: "Asset Disposal & Compliance",
    body:    "Ensure secure, compliant disposal at end of asset life.",
  },
];

const SOFTWARE_SECTIONS = [
  {
    heading: "Software Lifecycle Management",
    body:    "Govern software from deployment to decommission.",
  },
  {
    heading: "License Management & Compliance",
    body:    "Avoid penalties and over-spend with accurate license tracking.",
  },
  {
    heading: "Usage Monitoring & Optimization",
    body:    "Identify underused licenses and reclaim wasted spend.",
  },
  {
    heading: "Vendor & Subscription Management",
    body:    "Centralize subscription renewals and vendor contracts.",
  },
];

function GroupLabel({ label }: { label: string }) {
  return (
    <div style={{ backgroundColor: "#080808", padding: "40px 24px 0" }}>
      <div className="container">
        <p
          style={{
            color:         "#00E5C0",
            fontSize:      "0.75rem",
            fontWeight:    700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            paddingBottom: "24px",
            borderBottom:  "1px solid rgba(0,229,192,0.15)",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function ITAMPage() {
  return (
    <>
      <Navbar />
      <ServiceDetailHero
        title="IT Asset Management"
        tagline="Enterprise asset management, simplified. We bring full lifecycle visibility to your hardware and software so every dollar and every device is accounted for."
      />
      <ServiceFeatureGrid features={FEATURES} />
      <GroupLabel label="Hardware Asset Management" />
      <ServiceDeepDive sections={HARDWARE_SECTIONS} />
      <GroupLabel label="Software Asset Management" />
      <ServiceDeepDive sections={SOFTWARE_SECTIONS} />
      <CTABand />
      <Footer />
    </>
  );
}
