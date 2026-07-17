"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

const STORIES = [
  {
    id: 0,
    tag:   "ITSM",
    title: "Implemented ITSM",
    org:   "Global Financial Services Firm",
    desc:
      "Deployed ServiceNow ITSM across a 3,000-seat enterprise, replacing a fragmented legacy ticketing system. Incident resolution times dropped by 42% within 90 days of go-live, and SLA breach rates fell from 31% to under 6%. Change management workflows were fully automated, eliminating manual approval bottlenecks.",
    outcomes: ["42% faster incident resolution", "SLA breaches cut to under 6%", "Full change automation"],
    accent: "#22D3EE",
  },
  {
    id: 1,
    tag:   "ITAM · ITOM · HRSD",
    title: "Implemented ITAM, ITOM and HRSD",
    org:   "Leading Manufacturing Conglomerate",
    desc:
      "Delivered a unified ServiceNow implementation spanning Asset Management, Operations Management, and HR Service Delivery across 12 global sites. Complete hardware and software asset visibility reduced shadow IT costs by 28%. Automated infrastructure event correlation cut P1 incidents by 55%, while the HRSD rollout reduced HR case backlog by 70%.",
    outcomes: ["28% reduction in shadow IT costs", "55% fewer P1 incidents", "70% drop in HR case backlog"],
    accent: "#818CF8",
  },
  {
    id: 2,
    tag:   "IT Operations",
    title: "Implemented IT Operation for Central Government Agency",
    org:   "Central Government Agency",
    desc:
      "Designed and deployed a sovereign ServiceNow environment for a central government body managing citizen-facing services. The engagement included full ITSM, ITOM, and SecOps integration — meeting strict compliance requirements while improving internal IT response times by 60%. The platform now supports 8,000+ government employees across 6 departments.",
    outcomes: ["60% faster IT response times", "8,000+ users onboarded", "Full SecOps compliance met"],
    accent: "#34D399",
  },
];

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial:     { opacity: 0, y: 28 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: false, margin: "-80px" } as const,
    transition:  { duration: 0.65, delay, ease },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Stories() {
  const noMotion = useReducedMotion() === true;
  const [active, setActive] = useState(0);

  const prev = () => setActive((v) => (v - 1 + STORIES.length) % STORIES.length);
  const next = () => setActive((v) => (v + 1) % STORIES.length);
  const story = STORIES[active];

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "var(--bg-base)" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative text-center overflow-hidden"
          style={{
            paddingTop: "160px",
            paddingBottom: "100px",
            backgroundImage:
              "radial-gradient(ellipse at 25% 55%, rgba(34,211,238,0.07) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 78% 30%, rgba(129,140,248,0.07) 0%, transparent 55%)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Case Studies
            </motion.p>
            <motion.h1
              className="font-bold tracking-[-0.028em] mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "var(--text-primary)",
                lineHeight: 1.08,
              }}
              {...fadeUp(noMotion, 0.08)}
            >
              Our Success Stories
            </motion.h1>
            <motion.p
              style={{
                fontSize:  "clamp(0.95rem, 1.7vw, 1.1rem)",
                color:     "var(--text-secondary)",
                lineHeight: 1.78,
                maxWidth:  "600px",
                margin:    "0 auto",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.16)}
            >
              Real IT transformations. Measurable outcomes. See how we&apos;ve helped
              enterprises modernize their operations with ServiceNow.
            </motion.p>
          </div>
        </section>

        {/* ── Carousel ──────────────────────────────────────────────────────── */}
        <section style={{ paddingTop: "80px", paddingBottom: "120px" }}>
          <div className="container px-5 md:px-8">

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
              {STORIES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="rounded-full text-xs transition-all duration-200"
                  style={{
                    padding:         "8px 18px",
                    backgroundColor: active === i ? "#C2761A"              : "rgba(0,0,0,0.04)",
                    color:           active === i ? "#FFFFFF"              : "#6B7280",
                    fontWeight:      active === i ? 600                    : 500,
                    border:          active === i ? "none"                 : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {s.tag}
                </button>
              ))}
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={story.id}
                className="glass-card relative overflow-hidden"
                style={{
                  padding:      "48px 56px",
                  borderRadius: "20px",
                  boxShadow:    "0 8px 40px rgba(0,0,0,0.08)",
                }}
                initial={noMotion ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={noMotion ? {} : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
              >
                {/* Accent glow corner — decorative, softened */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${story.accent}, transparent 65%)`,
                    opacity: 0.15,
                  }}
                />

                {/* Tag + org */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span
                    className="rounded-full text-[0.65rem] font-semibold tracking-wide uppercase"
                    style={{
                      padding:         "4px 12px",
                      backgroundColor: story.accent + "22",
                      color:           story.accent,
                    }}
                  >
                    {story.tag}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {story.org}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-bold tracking-[-0.022em]"
                  style={{
                    fontSize:     "clamp(1.4rem, 3vw, 2rem)",
                    color:        "var(--text-primary)",
                    marginBottom: "20px",
                  }}
                >
                  {story.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize:     "clamp(0.92rem, 1.5vw, 1rem)",
                    color:        "var(--text-secondary)",
                    lineHeight:   1.75,
                    marginBottom: "24px",
                  }}
                >
                  {story.desc}
                </p>

                {/* Outcomes */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {story.outcomes.map((o) => (
                    <span
                      key={o}
                      style={{
                        display:      "inline-flex",
                        alignItems:   "center",
                        background:   "rgba(194,118,26,0.08)",
                        border:       "1px solid rgba(194,118,26,0.2)",
                        borderRadius: "999px",
                        padding:      "6px 14px",
                        fontSize:     "0.8rem",
                        fontWeight:   600,
                        color:        "#C2761A",
                      }}
                    >
                      {o}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: story.accent }}
                >
                  Read Full Case Study
                  <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between" style={{ marginTop: "32px" }}>
              <button
                onClick={prev}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:  active === i ? "24px" : "8px",
                      height: "8px",
                      backgroundColor: active === i ? "var(--accent)" : "var(--border)",
                    }}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
