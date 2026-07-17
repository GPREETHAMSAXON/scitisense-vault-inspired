"use client";

import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, Clock, TrendingDown, ChevronDown } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PAIN_POINTS = [
  {
    icon:  AlertCircle,
    color: "#EF4444",
    title: "Siloed, fragmented IT systems",
    body:  "Your teams spend more time managing tools than delivering value. Legacy ticketing systems, disconnected workflows, and manual processes drain productivity and hide the real cost of IT inefficiency.",
  },
  {
    icon:  Clock,
    color: "#F59E0B",
    title: "Slow incident resolution cycles",
    body:  "Every hour of downtime costs your business — in revenue, reputation, and team morale. Without unified visibility and automated workflows, your IT team is always fighting fires instead of preventing them.",
  },
  {
    icon:  TrendingDown,
    color: "#EF4444",
    title: "IT investments not delivering ROI",
    body:  "You've invested in enterprise platforms but aren't seeing the returns. Poor implementation, under-utilization, and lack of optimization leave millions in potential value locked inside your existing tools.",
  },
] as const;

const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

export default function ProblemStatement() {
  const noMotion = useReducedMotion() === true;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#14213D", paddingBlock: "120px" }}
    >
      {/* ── Depth glows ── */}
      <div aria-hidden="true" style={{
        position:   "absolute",
        inset:      0,
        zIndex:     0,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 15% 30%, rgba(194,118,26,0.06) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 85% 70%, rgba(42,63,102,0.35) 0%, transparent 55%)",
      }} />

      {/* ── Grain ── */}
      <div aria-hidden="true" style={{
        position:         "absolute",
        inset:            0,
        zIndex:           1,
        pointerEvents:    "none",
        backgroundImage:  `url("${GRAIN}")`,
        backgroundRepeat: "repeat",
        backgroundSize:   "200px 200px",
        opacity:          0.02,
        mixBlendMode:     "overlay",
      }} />

      {/* ── Content ── */}
      <div className="relative container px-5 md:px-8 text-center" style={{ zIndex: 2 }}>

        {/* Eyebrow */}
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
            color:         "#C2761A",
            marginBottom:  "20px",
          }}
        >
          The Challenge
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={noMotion ? false : { opacity: 0, y: 20 }}
          whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          style={{
            fontSize:      "clamp(2rem, 4vw, 3.2rem)",
            fontWeight:    800,
            color:         "#F4E8D5",
            lineHeight:    1.08,
            letterSpacing: "-0.025em",
            marginBottom:  "64px",
          }}
        >
          IT Operations Shouldn&apos;t Feel Like This.
        </motion.h2>

        {/* ── Pain point cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {PAIN_POINTS.map(({ icon: Icon, color, title, body }, i) => (
            <motion.div
              key={title}
              initial={noMotion ? false : { opacity: 0, rotateX: 15, y: 40 }}
              whileInView={noMotion ? undefined : { opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease }}
              style={{
                background:    "rgba(255,255,255,0.04)",
                border:        "1px solid rgba(244,232,213,0.10)",
                borderRadius:  "20px",
                padding:       "36px 32px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                textAlign:     "left",
                transformOrigin: "50% 0%",
              }}
            >
              {/* Icon */}
              <div style={{
                width:          "52px",
                height:         "52px",
                borderRadius:   "14px",
                background:     `rgba(${color === "#EF4444" ? "239,68,68" : "245,158,11"},0.12)`,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                marginBottom:   "20px",
              }}>
                <Icon size={24} style={{ color }} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize:      "1.05rem",
                fontWeight:    700,
                color:         "#F4E8D5",
                marginBottom:  "12px",
                lineHeight:    1.3,
              }}>
                {title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize:   "0.9rem",
                color:      "rgba(244,232,213,0.62)",
                lineHeight: 1.72,
                margin:     0,
              }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Transition statement ── */}
        <motion.div
          initial={noMotion ? false : { opacity: 0 }}
          whileInView={noMotion ? undefined : { opacity: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{ marginTop: "64px" }}
        >
          <p style={{
            fontSize:   "1.1rem",
            fontStyle:  "italic",
            color:      "rgba(244,232,213,0.70)",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}>
            Sound familiar? You&apos;re not alone — and there&apos;s a better way.
          </p>

          {/* Animated chevron */}
          {!noMotion && (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", color: "#C2761A" }}
              aria-hidden="true"
            >
              <ChevronDown size={28} strokeWidth={1.8} />
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
