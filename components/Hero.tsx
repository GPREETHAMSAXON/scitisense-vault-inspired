"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ChevronDown, ArrowRight, Layers, Cpu, Cloud } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = ["Enterprise IT", "AI & ML", "Biomedical", "Cloud"];

const HEADLINE_LINES = [
  { text: "Build, Optimize &", color: "#FFFFFF" },
  { text: "Transform", color: "#00E5C0" },
  { text: "Your IT Operations.", color: "rgba(255,255,255,0.85)" },
];

// ─── Magnetic button hook ─────────────────────────────────────────────────────

function useMagnetic() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 24 });
  const y = useSpring(rawY, { stiffness: 320, damping: 24 });

  function onMove<T extends HTMLElement>(e: React.MouseEvent<T>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.38);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { x, y, onMove, onLeave };
}

// ─── Floating vault card ────────────────────────────────────────────────────

function FloatingCard({
  style,
  rotateAnim,
  yAnim,
  duration,
  children,
}: {
  style: React.CSSProperties;
  rotateAnim: number[];
  yAnim?: number[];
  duration: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="card-vault absolute flex flex-col items-center justify-center gap-3"
      style={{
        width: "180px",
        height: "220px",
        ...style,
      }}
      animate={{ rotate: rotateAnim, ...(yAnim ? { y: yAnim } : {}) }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const noMotion = reducedMotion === true;

  const btn1 = useMagnetic();
  const btn2 = useMagnetic();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const tr = (d: number, delay = 0) =>
    noMotion ? { duration: 0, delay: 0 } : { duration: d, delay, ease };

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minHeight: "100dvh",
        background: "#080808",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      {/* ── Background layers ─────────────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Layer 0 — base */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#080808" }} />

        {/* Layer 2 — subtle texture video, barely visible */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.08,
            mixBlendMode: "luminosity",
            pointerEvents: "none",
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Layer 3 — radial teal glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,229,192,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Layer 4 — bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, #080808)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Tab pills */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "8px", marginBottom: "32px" }}
        >
          {TABS.map((tab, i) => (
            <motion.span
              key={tab}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tr(0.5, i * 0.05)}
            >
              {tab}
            </motion.span>
          ))}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden" style={{ paddingBottom: "0.08em" }}>
              <motion.span
                className="inline-block"
                style={{ color: line.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={tr(0.9, i * 0.15)}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "1.1rem",
            maxWidth: "560px",
            margin: "24px auto 48px",
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.6, 0.6)}
        >
          <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>Scitisense Futurize</strong>{" "}
          partners with enterprises to implement, optimize and scale ServiceNow
          solutions — delivering measurable outcomes across ITSM, ITOM, and beyond.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "16px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr(0.6, 0.75)}
        >
          <motion.button
            data-cursor="cta"
            style={{
              x: btn1.x,
              y: btn1.y,
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 700,
              borderRadius: "999px",
              background: "#00E5C0",
              color: "#080808",
              boxShadow: "0 0 30px rgba(0,229,192,0.3)",
              border: "none",
              whiteSpace: "nowrap",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn1.onMove}
            onMouseLeave={noMotion ? undefined : btn1.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, boxShadow: "0 0 48px rgba(0,229,192,0.5)" }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={tr(0.2)}
          >
            Start Your Transformation
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            style={{
              x: btn2.x,
              y: btn2.y,
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "999px",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.2)",
              whiteSpace: "nowrap",
            }}
            className="flex items-center gap-2"
            onMouseMove={noMotion ? undefined : btn2.onMove}
            onMouseLeave={noMotion ? undefined : btn2.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, borderColor: "rgba(255,255,255,0.5)" }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={tr(0.2)}
          >
            View Our Work
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Rotating 3D cards */}
        {!noMotion && (
          <div
            className="hidden md:flex"
            style={{
              position: "relative",
              height: "280px",
              marginTop: "60px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            aria-hidden="true"
          >
            <FloatingCard
              style={{ transform: "translateX(-240px) translateY(20px)" }}
              rotateAnim={[-25, -30, -25]}
              duration={6}
            >
              <Layers size={28} color="#00E5C0" strokeWidth={1.6} />
              <span style={{ color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 600 }}>ITSM</span>
            </FloatingCard>

            <FloatingCard
              style={{ transform: "translateY(-10px)" }}
              rotateAnim={[-8, -12, -8]}
              yAnim={[-10, -18, -10]}
              duration={5}
            >
              <Cpu size={28} color="#00E5C0" strokeWidth={1.6} />
              <span style={{ color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 600, textAlign: "center", padding: "0 12px" }}>
                Scitisense Futurize
              </span>
            </FloatingCard>

            <FloatingCard
              style={{ transform: "translateX(240px) translateY(30px)" }}
              rotateAnim={[12, 8, 12]}
              duration={7}
            >
              <Cloud size={28} color="#00E5C0" strokeWidth={1.6} />
              <span style={{ color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 600 }}>ServiceNow</span>
            </FloatingCard>
          </div>
        )}
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={tr(0.5, 1.4)}
        aria-hidden="true"
      >
        <span style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Scroll
        </span>
        <motion.div
          animate={noMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#00E5C0" }}
        >
          <ChevronDown size={16} strokeWidth={1.8} />
        </motion.div>
      </motion.div>
    </section>
  );
}
