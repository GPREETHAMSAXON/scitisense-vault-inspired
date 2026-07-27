import { Lightbulb, ShieldCheck, Layers, Zap, type LucideIcon } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

// ─── Why Choose — reuses the real copy published on /aboutus ─────────────────

interface WhyCard { icon: LucideIcon; color: string; title: string; body: string }

const WHY_CHOOSE: WhyCard[] = [
  { icon: Lightbulb,   color: "#0071E3", title: "Innovation First",         body: "Recognized by DPIIT and Startup India for our unique contributions to the industry." },
  { icon: ShieldCheck, color: "#0071E3", title: "Trusted & Compliant",      body: "Fully registered with MCA and MSME, ensuring a secure and professional partnership." },
  { icon: Layers,      color: "#0071E3", title: "Multi-Disciplinary",      body: "From the laboratory bench to the cloud, our team spans the full spectrum of R&D and HealthTech." },
  { icon: Zap,         color: "#0071E3", title: "Agile & Reliable",        body: "We combine the agility of a startup with the reliability of a certified enterprise." },
];

export default function Home() {
  return (
    <>
    <main>
      <Hero />
      <Services />

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
    </main>
    <Footer />
    </>
  );
}
