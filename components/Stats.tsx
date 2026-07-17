"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useScrambleCount } from "@/hooks/useScrambleCount";
import RevealBlock from "@/components/RevealBlock";
import ParallaxSection from "@/components/ParallaxSection";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 8,   suffix: "+", label: "Years of Craft"     },
  { value: 80,  suffix: "+", label: "Happy Clients"      },
  { value: 50,  suffix: "+", label: "Professionals"      },
  { value: 200, suffix: "+", label: "Trained"            },
] as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── SVG grain data URI (reused from Hero) ────────────────────────────────────

const GRAIN_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

// useScrambleCount is imported from hooks/useScrambleCount

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  value, suffix, label, noMotion, index,
}: {
  value: number; suffix: string; label: string; noMotion: boolean; index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cardRef, { once: false, margin: "-60px" });
  const display = useScrambleCount(value, inView, noMotion, 2000);
  const isSettled = display === String(value);

  const onEnter = (el: HTMLDivElement) => {
    el.style.transform = "translateY(-6px)";
    el.style.boxShadow =
      "0 2px 4px rgba(0,0,0,0.20), 0 16px 40px rgba(194,118,26,0.20), inset 0 1px 0 rgba(255,255,255,0.12)";
    el.style.borderColor = "rgba(194,118,26,0.25)";
  };
  const onLeave = (el: HTMLDivElement) => {
    el.style.transform   = "translateY(0)";
    el.style.boxShadow   =
      "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
    el.style.borderColor = "rgba(244,232,213,0.10)";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={noMotion ? false : { opacity: 0, y: 32 }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      onMouseEnter={(e) => !noMotion && onEnter(e.currentTarget as HTMLDivElement)}
      onMouseLeave={(e) => !noMotion && onLeave(e.currentTarget as HTMLDivElement)}
      style={{
        background:    "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border:        "1px solid rgba(244,232,213,0.10)",
        borderRadius:  "20px",
        padding:       "40px 28px",
        textAlign:     "center",
        position:      "relative",
        overflow:      "hidden",
        cursor:        "default",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition:    "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
        willChange:    "transform",
      }}
    >
      {/* Inner ambient glow — behind content */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(circle at 50% 0%, rgba(194,118,26,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex:        0,
        }}
      />

      {/* Content — above glow */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Accent bar */}
        <div
          aria-hidden="true"
          style={{
            width:        "40px",
            height:       "3px",
            background:   "#C2761A",
            borderRadius: "999px",
            margin:       "0 auto 20px auto",
          }}
        />

        {/* Number — scramble + gradient text */}
        <span
          className="block tabular-nums"
          style={{
            fontFamily:             "'Geist Mono', monospace",
            fontWeight:             800,
            lineHeight:             1,
            fontSize:               "clamp(2.6rem, 4.5vw, 4rem)",
            background:             "linear-gradient(135deg, #E0941F 0%, #C2761A 100%)",
            WebkitBackgroundClip:   "text",
            WebkitTextFillColor:    "transparent",
            backgroundClip:         "text",
          }}
        >
          {display}{suffix}
        </span>

        {/* Label */}
        <span
          className="block"
          style={{
            color:         "rgba(244,232,213,0.65)",
            fontSize:      "0.88rem",
            fontWeight:    500,
            marginTop:     "10px",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Stats() {
  const noMotion  = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax — bg glows shift on scroll
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden"
      style={{ padding: "100px 24px" }}
    >
      {/* ── Deep navy base background ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: "#14213D",
          zIndex:     0,
        }}
      />

      {/* ── Parallax radial glows ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          zIndex:     1,
          pointerEvents: "none",
          y: noMotion ? 0 : bgY,
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(194,118,26,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(42,63,102,0.4) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position:         "absolute",
          inset:            0,
          zIndex:           2,
          pointerEvents:    "none",
          backgroundImage:  `url("${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "200px 200px",
          opacity:          0.02,
          mixBlendMode:     "overlay",
        }}
      />

      {/* ── Content ── */}
      <div className="relative container" style={{ zIndex: 3 }}>

        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "48px" }}>
          <RevealBlock direction="perspective">
            <p
              style={{
                color:         "#C2761A",
                fontSize:      "0.75rem",
                fontWeight:    600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom:  "12px",
              }}
            >
              By the Numbers
            </p>
            <h2
              style={{
                color:      "#F4E8D5",
                fontSize:   "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Our Impact
            </h2>
          </RevealBlock>
        </div>

        {/* Cards */}
        <ParallaxSection speed={0.3}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                noMotion={noMotion}
                index={i}
              />
            ))}
          </div>
        </ParallaxSection>

      </div>
    </section>
  );
}
