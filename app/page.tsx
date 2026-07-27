import Link from "next/link";
import { Lightbulb, ShieldCheck, Layers, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/services-data";

// ─── Why Choose — reuses the real copy published on /aboutus ─────────────────

interface WhyCard { icon: LucideIcon; color: string; title: string; body: string }

const WHY_CHOOSE: WhyCard[] = [
  { icon: Lightbulb,   color: "#0071E3", title: "Innovation First",         body: "Recognized by DPIIT and Startup India for our unique contributions to the industry." },
  { icon: ShieldCheck, color: "#0071E3", title: "Trusted & Compliant",      body: "Fully registered with MCA and MSME, ensuring a secure and professional partnership." },
  { icon: Layers,      color: "#0071E3", title: "Multi-Disciplinary",      body: "From the laboratory bench to the cloud, our team spans the full spectrum of R&D and HealthTech." },
  { icon: Zap,         color: "#0071E3", title: "Agile & Reliable",        body: "We combine the agility of a startup with the reliability of a certified enterprise." },
];

// ─── Featured Projects — real project entries pulled from lib/services-data ──

const FEATURED_PROJECTS = [
  {
    slug: "computer-vision",
    color: SERVICES.find((s) => s.id === "computer-vision")!.color,
    category: "Computer Vision",
    title: "Smart Attendance System using Face Recognition",
    outcome: "Automated identity verification for daily attendance tracking",
    metric: "Real-Time Recognition",
  },
  {
    slug: "nlp-llm-research",
    color: SERVICES.find((s) => s.id === "nlp-llm")!.color,
    category: "NLP & LLM",
    title: "Hospital Knowledge Base Chatbot with RAG",
    outcome: "Grounded query resolution over verified hospital documentation",
    metric: "Grounded, Verified Answers",
  },
  {
    slug: "iot-wearable-sensors",
    color: SERVICES.find((s) => s.id === "iot-wearable")!.color,
    category: "IoT & Wearables",
    title: "Smart Wearable ECG & SpO2 Monitoring System",
    outcome: "Continuous cardiac vitals monitoring with real-time alerting",
    metric: "Real-Time Vitals Alerts",
  },
];

export default function Home() {
  return (
    <>
    <main>
      <Hero />
      <Services />
      <Stats />

      {/* ── Why Choose ── */}
      <div className="section-divider" style={{ margin: "0 40px" }} />
      <section className="relative overflow-hidden" style={{ background: "#FFFFFF", paddingBlock: 80 }}>
        <div className="container px-5 md:px-8">
          <div className="animate-on-scroll" style={{ marginBottom: 56, textAlign: "center" }}>
            <span className="tag-pill-light" style={{ marginBottom: 16, display: "inline-flex" }}>
              Why Scitisense Futurize
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.03em", marginTop: 16 }}>
              Built for Trust <span className="text-gradient-teal">& Execution</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20, maxWidth: 880, margin: "0 auto" }}>
            {WHY_CHOOSE.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="animate-on-scroll spotlight-card service-card-light"
                  style={{ padding: 32, display: "flex", flexDirection: "column", gap: 14, animationDelay: `${i * 0.08}s` }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(0,113,227,0.08)", border: "1px solid rgba(0,113,227,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={20} strokeWidth={1.8} style={{ color: card.color }} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1D1D1F" }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.65 }}>{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="relative overflow-hidden" style={{ background: "#F5F5F7", paddingBlock: 80 }}>
        <div className="container px-5 md:px-8">
          <div className="animate-on-scroll" style={{ marginBottom: 56, textAlign: "center" }}>
            <span className="tag-pill-light" style={{ marginBottom: 16, display: "inline-flex" }}>
              Featured Work
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.03em", marginTop: 16 }}>
              Research, <span className="text-gradient-teal">Shipped</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20 }}>
            {FEATURED_PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="animate-on-scroll spotlight-card service-card-light"
                style={{ padding: 32, display: "flex", flexDirection: "column", gap: 14, animationDelay: `${i * 0.08}s` }}
              >
                <span
                  className="tag-pill-light"
                  style={{ width: "fit-content", color: p.color, borderColor: `${p.color}30`, background: `${p.color}15` }}
                >
                  {p.category}
                </span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1D1D1F", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.6, marginTop: -4 }}>{p.outcome}</p>
                <span
                  className="inline-flex items-center"
                  style={{
                    width: "fit-content",
                    background: "rgba(0,113,227,0.06)",
                    border: "1px solid rgba(0,113,227,0.15)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#0071E3",
                  }}
                >
                  {p.metric}
                </span>
                <Link
                  href={`/services#${p.slug}`}
                  className="inline-flex items-center gap-1.5"
                  style={{ fontSize: 13, fontWeight: 600, color: p.color, marginTop: "auto" }}
                >
                  View Details <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" style={{ margin: "0 40px" }} />

      <CTABand
        heading={<>Ready to Build <span className="text-gradient-teal">the Future?</span></>}
        subtext="Partner with our research team to turn ambitious ideas into deployed, production-grade AI and Medical IT systems."
        primary={{ label: "Book a Free Consultation", href: "/contact" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </main>
    <Footer />
    </>
  );
}
