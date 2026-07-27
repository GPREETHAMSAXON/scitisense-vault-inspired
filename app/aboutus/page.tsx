"use client";

import { motion, useReducedMotion } from "motion/react";
import { Lightbulb, ShieldCheck, Layers, Zap, FlaskConical, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";
import { hexToRgb } from "@/lib/services-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial:     { opacity: 0, y: 28 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: false, margin: "-80px" } as const,
    transition:  { duration: 0.65, delay, ease },
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DESCRIPTION_PARAGRAPHS = [
  "At Scitisense Futurize Private Limited, we are dedicated to accelerating the pace of innovation. As a recognized leader in Scientific Research & Development and Information Technology, we provide the intellectual infrastructure and technological solutions necessary to solve complex challenges in modern science and healthcare.",
  "We function as a strategic partner to our clients, offering end-to-end consultation and R&D services across various scientific disciplines. By integrating rigorous scientific methodology with advanced IT frameworks, we empower organizations to modernize their operations and achieve breakthrough results.",
  "We exist at the intersection of Research and Technology. In an era where data is the new currency of healthcare and innovation is the engine of growth, Scitisense Futurize serves as a catalyst for change. We don't just consult — we co-innovate. Whether it is deep-tech scientific research or deploying next-gen Medical IT systems, our goal is to future-proof your endeavors.",
];

interface PartnerCard {
  icon: LucideIcon;
  color: string;
  title: string;
  body: string;
}

const PARTNER_CARDS: PartnerCard[] = [
  {
    icon: Lightbulb,
    color: "#0071E3",
    title: "Innovation First",
    body: "Recognized by DPIIT and Startup India for our unique contributions to the industry.",
  },
  {
    icon: ShieldCheck,
    color: "#0071E3",
    title: "Trusted & Compliant",
    body: "Fully registered with MCA and MSME, ensuring a secure and professional partnership.",
  },
  {
    icon: Layers,
    color: "#0071E3",
    title: "Multi-Disciplinary Expertise",
    body: "From the laboratory bench to the cloud, our team spans the full spectrum of R&D and HealthTech.",
  },
  {
    icon: Zap,
    color: "#0071E3",
    title: "Agile & Reliable",
    body: "We combine the agility of a startup with the reliability of a certified enterprise.",
  },
];

interface WhatWeDoCard {
  icon: LucideIcon;
  color: string;
  title: string;
  body: string;
}

const WHAT_WE_DO_CARDS: WhatWeDoCard[] = [
  {
    icon: FlaskConical,
    color: "#0071E3",
    title: "Scientific R&D",
    body: "We conduct and facilitate cutting-edge research, offering consultation for experimental design, data analysis, and product development across multiple scientific sectors.",
  },
  {
    icon: HeartPulse,
    color: "#0071E3",
    title: "Medical Information Technology",
    body: "We digitize the healthcare experience, creating robust IT solutions that manage medical data, improve patient outcomes, and streamline clinical workflows.",
  },
];

// ─── Card sub-component ───────────────────────────────────────────────────────

function InfoCard({
  icon: Icon, color, title, body, noMotion, delay,
}: {
  icon: LucideIcon; color: string; title: string; body: string; noMotion: boolean; delay: number;
}) {
  const rgb = hexToRgb(color);
  return (
    <motion.div
      {...fadeUp(noMotion, delay)}
      style={{
        background: "#FFFFFF",
        border: "1px solid #D2D2D7",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `rgba(${rgb},0.35)`;
        el.style.boxShadow = `0 12px 32px rgba(${rgb},0.12)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "#D2D2D7";
        el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: `rgba(${rgb},0.12)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "18px",
        }}
      >
        <Icon size={22} strokeWidth={1.8} style={{ color }} />
      </div>
      <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0A0A0A", marginBottom: "10px" }}>{title}</p>
      <p style={{ fontSize: "0.9rem", color: "#6E6E73", lineHeight: 1.75 }}>{body}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const noMotion = useReducedMotion() === true;

  return (
    <>
      <main className="relative" style={{ backgroundColor: "transparent" }}>

        {/* ── Company description ──────────────────────────────────────────── */}
        <section style={{ paddingTop: "160px", paddingBottom: "100px" }}>
          <div className="container px-5 md:px-8" style={{ maxWidth: "820px", marginInline: "auto" }}>
            <div className="flex flex-col" style={{ gap: "24px" }}>
              {DESCRIPTION_PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp(noMotion, i * 0.1)}
                  style={{
                    fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Partner With Us ──────────────────────────────────────────── */}
        <section
          className="relative"
          style={{
            paddingTop: "80px",
            paddingBottom: "100px",
            backgroundColor: "transparent",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container px-5 md:px-8">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <motion.p
                className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: "var(--accent)" }}
                {...fadeUp(noMotion)}
              >
                Why Partner With Us
              </motion.p>
              <motion.h2
                className="font-bold tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  color: "var(--text-primary)",
                }}
                {...fadeUp(noMotion, 0.08)}
              >
                Why Partner With Us?
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px", maxWidth: "880px", marginInline: "auto" }}>
              {PARTNER_CARDS.map((card, i) => (
                <InfoCard key={card.title} {...card} noMotion={noMotion} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── What We Do ───────────────────────────────────────────────────── */}
        <section
          className="relative"
          style={{
            paddingTop: "80px",
            paddingBottom: "100px",
            backgroundColor: "transparent",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container px-5 md:px-8">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <motion.p
                className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: "var(--accent)" }}
                {...fadeUp(noMotion)}
              >
                Our Focus
              </motion.p>
              <motion.h2
                className="font-bold tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  color: "var(--text-primary)",
                }}
                {...fadeUp(noMotion, 0.08)}
              >
                What We Do
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px", maxWidth: "880px", marginInline: "auto" }}>
              {WHAT_WE_DO_CARDS.map((card, i) => (
                <InfoCard key={card.title} {...card} noMotion={noMotion} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Mission ───────────────────────────────────────────────────── */}
        <section
          className="relative text-center"
          style={{
            paddingTop: "100px",
            paddingBottom: "120px",
            backgroundColor: "transparent",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-6"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Our Mission
            </motion.p>
            <motion.div {...fadeUp(noMotion, 0.1)} style={{ maxWidth: "700px", margin: "0 auto" }}>
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  fontSize: "6rem",
                  color: "rgba(0,113,227,0.2)",
                  lineHeight: 0,
                  marginBottom: "24px",
                  fontFamily: "Georgia, serif",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  color: "#0A0A0A",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                To democratize access to high-quality scientific research tools and
                medical technology, enabling researchers and healthcare providers to
                focus on what matters most: discovery and care.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
