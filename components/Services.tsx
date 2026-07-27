"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, SERVICE_ICON_MAP, hexToRgb } from "@/lib/services-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CORE_SERVICES = SERVICES.filter(
  (s) => s.id !== "medical-it" && s.id !== "training-consultancy",
);

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = SERVICE_ICON_MAP[service.icon];
  const rgb = hexToRgb(service.color);

  return (
    <Link
      href={`/services#${service.slug}`}
      className="animate-on-scroll spotlight-card service-card-light"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 28,
        textDecoration: "none",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Top — icon circle + area label */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 14,
            background: `rgba(${rgb},0.12)`,
            border: `1px solid rgba(${rgb},0.25)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} strokeWidth={1.8} style={{ color: service.color }} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#86868B", marginBottom: 3 }}>
            Research Area {String(index + 1).padStart(2, "0")}
          </div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0A0A0A", margin: 0, lineHeight: 1.3 }}>
            {service.name}
          </h3>
        </div>
      </div>

      {/* Description — 2-line clamp */}
      <p
        style={{
          fontSize: "0.85rem", color: "#6E6E73", lineHeight: 1.6,
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        } as React.CSSProperties}
      >
        {service.overview}
      </p>

      {/* Bottom — industry pills + explore link */}
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="flex flex-wrap" style={{ gap: 6 }}>
          {service.industries.slice(0, 3).map((industry) => (
            <span key={industry} className="tag-pill-light" style={{ fontSize: 10 }}>
              {industry}
            </span>
          ))}
        </div>
        <span
          className="inline-flex items-center gap-1.5"
          style={{ fontSize: "0.85rem", fontWeight: 600, color: service.color, width: "fit-content" }}
        >
          Explore <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      sectionRef.current?.querySelectorAll(".spotlight-card").forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [sectionRef]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#FFFFFF", paddingBlock: 120 }}
    >
      <div className="container px-5 md:px-8" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="animate-on-scroll" style={{ marginBottom: 64, textAlign: "center" }}>
          <span className="tag-pill-light" style={{ marginBottom: 16, display: "inline-flex" }}>
            Core Research Areas
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 20,
              color: "#0A0A0A",
              marginTop: 16,
            }}
          >
            What We Build <span className="text-gradient-teal">For You</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#6E6E73", lineHeight: 1.75, maxWidth: 640, margin: "0 auto" }}>
            {CORE_SERVICES.length} research domains, one team — from computer vision and IoT to
            generative and agentic AI, backed by hands-on training and consultancy.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
          {CORE_SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div className="animate-on-scroll" style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-sm"
            style={{ color: "#0071E3" }}
          >
            View All Services &amp; Research Areas
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
