"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  MessageSquare, Brain, Cpu, Search, Bot,
  Workflow, Database, ShieldCheck, Layers, Network,
  Repeat, GitBranch, HeartPulse, Leaf, TrendingUp,
  Smile, Wifi, Activity, Zap, Cloud, GitMerge,
  Server, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RevealBlock from "@/components/RevealBlock";
import ParallaxSection from "@/components/ParallaxSection";

// ─── Icon registry ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare, Brain, Cpu, Search, Bot, Workflow, Database, ShieldCheck,
  Layers, Network, Repeat, GitBranch, HeartPulse, Leaf, TrendingUp, Smile,
  Wifi, Activity, Zap, Cloud, GitMerge, Server, Lock,
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceLineItem {
  icon:        string;
  title:       string;
  description: string;
}

export interface ServiceLineSectionProps {
  id?:          string;
  label:        string;
  heading:      string;
  description:  string;
  background:   "cream" | "navy";
  items:        ServiceLineItem[];
  items2?:      ServiceLineItem[];
  items2Label?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Magnetic hook ────────────────────────────────────────────────────────────

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
  function onLeave() { rawX.set(0); rawY.set(0); }

  return { x, y, onMove, onLeave };
}

// ─── Item card ────────────────────────────────────────────────────────────────

function ItemCard({
  item, index, noMotion,
}: {
  item: ServiceLineItem;
  index: number;
  noMotion: boolean;
}) {
  const Icon      = ICON_MAP[item.icon] ?? Bot;
  const glowRef   = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  const cardStyle: React.CSSProperties = {
    position:     "relative",
    overflow:     "hidden",
    borderRadius: "20px",
    padding:      "28px 24px",
    cursor:       "default",
    willChange:   "transform",
    background:   "#0F0F0F",
    border:       "1px solid rgba(255,255,255,0.08)",
    boxShadow:    "0 4px 24px rgba(0,0,0,0.8)",
    transition:   "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion || !glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    glowRef.current.style.background =
      `radial-gradient(160px circle at ${x}px ${y}px, rgba(0,229,192,0.12), transparent 70%)`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow   = "0 8px 48px rgba(0,229,192,0.10)";
    el.style.borderColor = "rgba(0,229,192,0.25)";
    if (accentRef.current) accentRef.current.style.transform = "scaleX(1)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const el = e.currentTarget as HTMLDivElement;
    el.style.boxShadow   = "0 4px 24px rgba(0,0,0,0.8)";
    el.style.borderColor = "rgba(255,255,255,0.08)";
    if (glowRef.current)   glowRef.current.style.opacity = "0";
    if (accentRef.current) accentRef.current.style.transform = "scaleX(0)";
  };

  return (
    <motion.div
      initial={noMotion ? false : { opacity: 0, y: 28 }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      whileHover={noMotion ? {} : { y: -8, scale: 1.02, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-tracking glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position:     "absolute",
          inset:        0,
          opacity:      0,
          transition:   "opacity 0.3s ease",
          pointerEvents:"none",
          borderRadius: "20px",
          zIndex:       0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ width: "44px", height: "44px", background: "rgba(0,229,192,0.08)", border: "1px solid rgba(0,229,192,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#00E5C0" }}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.65 }}>
          {item.description}
        </p>
      </div>

      {/* Bottom teal accent line */}
      <div
        ref={accentRef}
        aria-hidden="true"
        style={{
          position:        "absolute",
          bottom:          0,
          left:            0,
          right:           0,
          height:          "3px",
          background:      "linear-gradient(90deg, #00E5C0, #00C4A6)",
          borderRadius:    "0 0 20px 20px",
          transform:       "scaleX(0)",
          transformOrigin: "left",
          transition:      "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex:          2,
        }}
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServiceLineSection({
  id, label, heading, description, items, items2, items2Label,
}: ServiceLineSectionProps) {
  const noMotion = useReducedMotion() === true;
  const mag       = useMagnetic();

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ padding: "120px 24px", background: "#080808" }}
    >
      {/* ── Ambient teal glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "60%",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(0,229,192,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Content ── */}
      <div className="relative container" style={{ zIndex: 3 }}>

        {/* Header */}
        <ParallaxSection speed={0.25}>
          <div style={{ marginBottom: "56px" }}>
            <RevealBlock direction="perspective">
              <p style={{ color: "#00E5C0", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                {label}
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: "20px" }}>
                {heading}
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "700px" }}>
                {description}
              </p>
            </RevealBlock>
          </div>
        </ParallaxSection>

        {/* Primary items grid */}
        <ParallaxSection speed={0.35}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
          {items.map((item, i) => (
            <ItemCard key={item.title} item={item} index={i} noMotion={noMotion} />
          ))}
        </div>
        </ParallaxSection>

        {/* Optional second items group */}
        {items2 && items2.length > 0 && (
          <div style={{ marginTop: "56px" }}>
            {items2Label && (
              <motion.p
                initial={noMotion ? false : { opacity: 0, y: 12 }}
                whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.45, ease }}
                style={{ color: "#00E5C0", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px" }}
              >
                {items2Label}
              </motion.p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
              {items2.map((item, i) => (
                <ItemCard key={item.title} item={item} index={i} noMotion={noMotion} />
              ))}
            </div>
          </div>
        )}

        {/* Explore Projects CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <motion.a
            href="/contact"
            style={{
              x:            mag.x,
              y:            mag.y,
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "transparent",
              border:       "1px solid rgba(0,229,192,0.40)",
              color:        "#00E5C0",
              fontWeight:   700,
              fontSize:     "0.95rem",
              padding:      "14px 32px",
              borderRadius: "999px",
              textDecoration: "none",
            }}
            onMouseMove={mag.onMove}
            onMouseLeave={mag.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, backgroundColor: "rgba(0,229,192,0.08)" }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease }}
          >
            Explore {heading} Projects
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
