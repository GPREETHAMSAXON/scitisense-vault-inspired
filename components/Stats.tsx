"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useScrambleCount } from "@/hooks/useScrambleCount";
import RevealBlock from "@/components/RevealBlock";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRIMARY_STAT = { value: 150, suffix: "+", label: "Projects Delivered" };

const PILLS = [
  {
    id: "growth",
    text: "GROWTH by 40% per year",
    tag: "8+ Years of Craft",
    position: { top: "6%", left: "2%" },
    duration: 3,
  },
  {
    id: "clients",
    text: "80+ Happy Clients",
    tag: "Enterprise Scale",
    position: { top: "10%", right: "0%" },
    duration: 4,
  },
  {
    id: "trained",
    text: "200+ Professionals Trained",
    tag: "Expert Team",
    position: { bottom: "8%", left: "4%" },
    duration: 3.5,
  },
  {
    id: "active",
    text: "50+ Professionals",
    tag: "Active Team",
    position: { bottom: "4%", right: "2%" },
    duration: 4.5,
  },
] as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Stats() {
  const noMotion = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const inView = useInView(numberRef, { once: false, margin: "-60px" });
  const display = useScrambleCount(PRIMARY_STAT.value, inView, noMotion, 2000);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden"
      style={{ background: "#080808", padding: "120px 24px" }}
    >
      {/* ── Ambient teal glow behind stats ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(0,229,192,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="relative container" style={{ zIndex: 3 }}>
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "48px" }}>
          <RevealBlock direction="perspective">
            <p
              style={{
                color: "#00E5C0",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              By the Numbers
            </p>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Our Impact
            </h2>
          </RevealBlock>
        </div>

        {/* ── Featured centered stat with floating pills ── */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: "900px",
            height: "440px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Connector lines — desktop only */}
          <svg
            className="hidden md:block"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
          >
            <line x1="12%" y1="14%" x2="50%" y2="50%" stroke="rgba(0,229,192,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="88%" y1="18%" x2="50%" y2="50%" stroke="rgba(0,229,192,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="14%" y1="86%" x2="50%" y2="50%" stroke="rgba(0,229,192,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="90%" y1="90%" x2="50%" y2="50%" stroke="rgba(0,229,192,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Center number */}
          <motion.div
            ref={numberRef}
            className="relative text-center"
            style={{ zIndex: 2 }}
            initial={noMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={noMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span
              className="block tabular-nums"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 800,
                lineHeight: 1,
                fontSize: "clamp(4rem, 10vw, 8rem)",
                color: "#00E5C0",
              }}
            >
              {display}
              {PRIMARY_STAT.suffix}
            </span>
            <span
              className="block"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "1rem",
                fontWeight: 500,
                marginTop: "8px",
                letterSpacing: "0.02em",
              }}
            >
              {PRIMARY_STAT.label}
            </span>
          </motion.div>

          {/* Floating pills — desktop only */}
          <div className="hidden md:block">
            {PILLS.map((pill, i) => (
              <motion.div
                key={pill.id}
                className="absolute flex flex-col items-start"
                style={{ ...pill.position, gap: "6px", zIndex: 2 }}
                initial={noMotion ? false : { opacity: 0, y: 12 }}
                whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <motion.div
                  animate={noMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: pill.duration, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-start"
                  style={{ gap: "6px" }}
                >
                  <span
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "999px",
                      padding: "8px 16px",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.7)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pill.text}
                  </span>
                  <span
                    style={{
                      background: "#00E5C0",
                      color: "#080808",
                      borderRadius: "999px",
                      padding: "4px 12px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      marginLeft: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pill.tag}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — simple stacked metric list */}
        <div className="md:hidden grid grid-cols-2 gap-4" style={{ marginTop: "24px" }}>
          {PILLS.map((pill) => (
            <div
              key={pill.id}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#FFFFFF", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>
                {pill.text}
              </p>
              <span
                style={{
                  background: "#00E5C0",
                  color: "#080808",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                }}
              >
                {pill.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
