"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Shield, Lock, Check } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial:     { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: false, margin: "-40px" } as const,
    transition:  { duration: 0.6, delay, ease },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const CERT_BADGES = [
  { icon: ShieldCheck, color: "#10B981", label: "ISO 27001 Certified"  },
  { icon: Shield,      color: "#3B82F6", label: "SOC 2 Compliant"      },
  { icon: Lock,        color: "#8B5CF6", label: "GDPR Ready"           },
] as const;

const METRICS = [
  {
    number: "98%",
    label:  "Customer Satisfaction",
    source: "Verified by post-project surveys",
    last:   false,
  },
  {
    number: "40+",
    label:  "Enterprise Clients",
    source: "Across India & USA",
    last:   false,
  },
  {
    number: "Zero",
    label:  "Failed Implementations",
    source: "100% delivery track record",
    last:   true,
  },
] as const;

const PARTNERS = [
  "ServiceNow",
  "BMC Partner",
  "ManageEngine",
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TrustBadges() {
  const noMotion = useReducedMotion() === true;

  return (
    <section
      style={{
        background: "#080808",
        paddingBlock: "64px",
        borderTop: "1px solid rgba(0,229,192,0.15)",
      }}
    >
      <div className="container px-5 md:px-8">

        {/* Desktop: 3-col grid — Mobile: single column */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-10 md:gap-0">

          {/* ── Col 1 — Certifications ── */}
          <motion.div
            {...fadeUp(noMotion, 0)}
            className="flex flex-col items-center md:items-start md:border-r md:pr-10 lg:pr-14"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p style={{
              fontSize:      "0.65rem",
              fontWeight:    700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "#00E5C0",
              marginBottom:  "16px",
            }}>
              Certifications &amp; Compliance
            </p>

            <div className="flex flex-col gap-3">
              {CERT_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display:       "flex",
                    alignItems:    "center",
                    gap:           "8px",
                    background:    "rgba(0,229,192,0.06)",
                    border:        "1px solid rgba(0,229,192,0.20)",
                    borderRadius:  "999px",
                    padding:       "8px 16px",
                    width:         "fit-content",
                  }}
                >
                  <Icon size={16} style={{ color: "#00E5C0", flexShrink: 0 }} strokeWidth={2} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#FFFFFF", whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2 — Key Metrics ── */}
          <motion.div
            {...fadeUp(noMotion, 0.1)}
            className="flex flex-col items-center md:border-r md:px-8 lg:px-12"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="grid grid-cols-3 w-full"
              style={{ gap: 0 }}
            >
              {METRICS.map(({ number, label, source, last }) => (
                <div
                  key={label}
                  style={{
                    textAlign:   "center",
                    padding:     "20px 12px",
                    borderRight: last ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{
                    display:    "block",
                    fontSize:   "1.9rem",
                    fontWeight: 800,
                    color:      "#00E5C0",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {number}
                  </span>
                  <span style={{
                    display:    "block",
                    fontSize:   "0.78rem",
                    fontWeight: 600,
                    color:      "#FFFFFF",
                    lineHeight: 1.3,
                    marginBottom: "4px",
                  }}>
                    {label}
                  </span>
                  <span style={{
                    display:  "block",
                    fontSize: "0.68rem",
                    color:    "rgba(255,255,255,0.30)",
                    lineHeight: 1.4,
                  }}>
                    {source}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Col 3 — Technology Partners ── */}
          <motion.div
            {...fadeUp(noMotion, 0.2)}
            className="flex flex-col items-center md:items-end md:pl-10 lg:pl-14"
          >
            <p style={{
              fontSize:      "0.65rem",
              fontWeight:    700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "#00E5C0",
              marginBottom:  "16px",
              alignSelf:     "flex-start",
            }}>
              Trusted Technology Partners
            </p>

            <div className="flex flex-col gap-3 w-full">
              {PARTNERS.map((partner) => (
                <div
                  key={partner}
                  style={{
                    display:       "flex",
                    alignItems:    "center",
                    gap:           "8px",
                    background:    "rgba(255,255,255,0.04)",
                    border:        "1px solid rgba(255,255,255,0.08)",
                    borderRadius:  "999px",
                    padding:       "8px 16px",
                    width:         "fit-content",
                  }}
                >
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    style={{ color: "#00E5C0", flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
