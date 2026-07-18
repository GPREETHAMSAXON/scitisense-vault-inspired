"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SERVICES, SERVICE_ICON_MAP, hexToRgb } from "@/lib/services-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const noMotion = useReducedMotion() === true;
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = SERVICE_ICON_MAP[service.icon];
  const rgb = hexToRgb(service.color);

  return (
    <Link href={`/services#${service.slug}`} style={{ display: "block", textDecoration: "none" }}>
      <motion.div
        ref={cardRef}
        initial={noMotion ? false : { opacity: 0, y: 24 }}
        whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.55, delay: index * 0.07, ease }}
        style={{
          position: "relative",
          height: "100%",
          background: "rgba(22,27,34,0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(48,54,61,0.8)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          cursor: "pointer",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-6px)";
          el.style.borderColor = `rgba(${rgb},0.4)`;
          el.style.boxShadow = `0 12px 40px rgba(${rgb},0.15)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "rgba(48,54,61,0.8)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Top — icon box + label pill */}
        <div className="flex items-center justify-between">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `rgba(${rgb},0.12)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={22} strokeWidth={1.8} style={{ color: service.color }} />
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: service.color,
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.25)`,
              borderRadius: "999px",
              padding: "4px 10px",
            }}
          >
            {service.label}
          </span>
        </div>

        {/* Middle — name + tagline */}
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#E6EDF3",
              marginBottom: "6px",
              lineHeight: 1.3,
            }}
          >
            {service.name}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#8B949E", lineHeight: 1.6 }}>{service.tagline}</p>
        </div>

        {/* Bottom — industry pills + explore link */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="flex flex-wrap" style={{ gap: "6px" }}>
            {service.industries.slice(0, 3).map((industry) => (
              <span
                key={industry}
                style={{
                  fontSize: "0.68rem",
                  color: "#8B949E",
                  background: "rgba(48,54,61,0.4)",
                  border: "1px solid #30363D",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {industry}
              </span>
            ))}
          </div>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ fontSize: "0.85rem", fontWeight: 600, color: service.color, width: "fit-content" }}
          >
            Explore Research
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  const noMotion = useReducedMotion() === true;

  const fadeUp = (delay = 0) =>
    noMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: false, margin: "-80px" } as const,
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{ background: "transparent", paddingBlock: "120px" }}
    >
      <div className="container px-5 md:px-8" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <motion.p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#00E5C0",
              marginBottom: "16px",
            }}
            {...fadeUp()}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="text-gradient"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
            {...fadeUp(0.08)}
          >
            AI Research & Innovation
          </motion.h2>
          <motion.p
            style={{
              fontSize: "1.05rem",
              color: "#8B949E",
              lineHeight: 1.75,
              maxWidth: "640px",
              margin: "0 auto",
            }}
            {...fadeUp(0.16)}
          >
            {SERVICES.length} research domains, one team — from computer vision and IoT to
            generative and agentic AI, to medical IT, backed by hands-on training and consultancy.
          </motion.p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "20px" }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <motion.a
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-sm"
            style={{ color: "#A371F7" }}
            whileHover={noMotion ? {} : { opacity: 0.8 }}
            {...fadeUp(0.2)}
          >
            View All Services & Research Areas
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
