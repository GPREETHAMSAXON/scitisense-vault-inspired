"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

const STORIES = [
  {
    category:   "ITSM",
    client:     "Global Financial Services Firm",
    headline:   "42% faster incident resolution",
    context:    "Deployed ServiceNow ITSM across a 3,000-seat enterprise — SLA breach rates fell from 31% to under 6%.",
    metrics:    ["42% faster", "SLA < 6%", "Full automation"],
  },
  {
    category:   "ITAM + ITOM + HRSD",
    client:     "Manufacturing Enterprise",
    headline:   "Complete IT asset visibility",
    context:    "Implemented unified asset, operations, and HR service delivery on a single platform — eliminated shadow IT and reduced tool sprawl.",
    metrics:    ["100% visibility", "3 modules", "6 weeks"],
  },
  {
    category:   "IT Operations",
    client:     "Central Government Agency",
    headline:   "Zero-disruption infrastructure ops",
    context:    "Delivered end-to-end IT operations management for a mission-critical government agency — 99.9% uptime maintained throughout.",
    metrics:    ["99.9% uptime", "Zero disruption", "Govt scale"],
  },
] as const;

// ─── Story card ───────────────────────────────────────────────────────────────

function StoryCard({
  story,
  index,
  noMotion,
}: {
  story: (typeof STORIES)[number];
  index: number;
  noMotion: boolean;
}) {
  return (
    <motion.div
      initial={noMotion ? false : { opacity: 0, y: 28 }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      whileHover={noMotion ? {} : {
        y: -8,
        boxShadow: "0 16px 48px rgba(163,113,247,0.12)",
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }}
      className="card-vault"
      style={{
        background:    "rgba(22,27,34,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius:  "20px",
        padding:       "36px 32px",
        border:        "1px solid #30363D",
        borderLeft:    "3px solid #A371F7",
        display:       "flex",
        flexDirection: "column",
        gap:           "16px",
        cursor:        "default",
      }}
    >
      {/* Category badge */}
      <div style={{
        display:       "inline-flex",
        alignItems:    "center",
        background:    "rgba(163,113,247,0.08)",
        border:        "1px solid rgba(163,113,247,0.18)",
        borderRadius:  "999px",
        padding:       "4px 12px",
        width:         "fit-content",
      }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#A371F7", letterSpacing: "0.06em" }}>
          {story.category}
        </span>
      </div>

      {/* Client type */}
      <p style={{ fontSize: "0.8rem", color: "#484F58", fontWeight: 500, margin: 0 }}>
        {story.client}
      </p>

      {/* Result headline */}
      <h3 style={{
        fontSize:      "1.35rem",
        fontWeight:    700,
        color:         "#E6EDF3",
        lineHeight:    1.25,
        margin:        0,
        letterSpacing: "-0.015em",
      }}>
        {story.headline}
      </h3>

      {/* Context */}
      <p style={{
        fontSize:   "0.875rem",
        color:      "#8B949E",
        lineHeight: 1.65,
        margin:     0,
        flexGrow:   1,
      }}>
        {story.context}
      </p>

      {/* Metric pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {story.metrics.map((m) => (
          <span
            key={m}
            style={{
              background:   "rgba(163,113,247,0.08)",
              border:       "1px solid rgba(163,113,247,0.20)",
              borderRadius: "999px",
              padding:      "4px 12px",
              fontSize:     "0.75rem",
              fontWeight:   600,
              color:        "#A371F7",
              whiteSpace:   "nowrap",
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href="/stories"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1"
        style={{ color: "#A371F7", width: "fit-content" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Read Full Story
        <ArrowRight size={14} strokeWidth={2.5} />
      </a>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HomepageStories() {
  const noMotion = useReducedMotion() === true;

  return (
    <section className="relative overflow-hidden" style={{ background: "transparent", paddingBlock: "120px" }}>
      {/* Top fade — smooths transition from previous section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, rgba(13,17,23,0.3), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div className="relative container px-5 md:px-8" style={{ zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "64px" }}>
          <motion.p
            initial={noMotion ? false : { opacity: 0, y: 12 }}
            whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
            style={{
              fontSize:      "0.68rem",
              fontWeight:    700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "#00E5C0",
              marginBottom:  "14px",
            }}
          >
            Success Stories
          </motion.p>

          <motion.h2
            initial={noMotion ? false : { opacity: 0, y: 20 }}
            whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            style={{
              fontSize:      "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight:    800,
              color:         "#E6EDF3",
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              marginBottom:  "14px",
            }}
          >
            Outcomes That Speak For Themselves
          </motion.h2>

          <motion.p
            initial={noMotion ? false : { opacity: 0, y: 16 }}
            whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            style={{ fontSize: "1rem", color: "#8B949E", margin: 0 }}
          >
            Real results from real implementations.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <StoryCard key={story.headline} story={story} index={i} noMotion={noMotion} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={noMotion ? false : { opacity: 0, y: 16 }}
          whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <motion.a
            href="/stories"
            className="inline-flex items-center gap-2 font-semibold text-sm"
            style={{
              color:         "#E6EDF3",
              border:        "1px solid #30363D",
              borderRadius:  "999px",
              padding:       "12px 28px",
              transition:    "all 0.2s ease",
            }}
            whileHover={noMotion ? {} : {
              borderColor:     "#A371F7",
              color:           "#A371F7",
            }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease }}
          >
            View All Case Studies
            <ArrowRight size={14} strokeWidth={2.5} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
