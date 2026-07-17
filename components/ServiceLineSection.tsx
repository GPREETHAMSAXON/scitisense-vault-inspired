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
const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

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
  item, index, isNavy, noMotion,
}: {
  item: ServiceLineItem;
  index: number;
  isNavy: boolean;
  noMotion: boolean;
}) {
  const Icon      = ICON_MAP[item.icon] ?? Bot;
  const glowRef   = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  const cardStyle: React.CSSProperties = isNavy ? {
    position:     "relative",
    overflow:     "hidden",
    borderRadius: "20px",
    padding:      "28px 24px",
    cursor:       "default",
    willChange:   "transform",
    background:   "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    border:       "1px solid rgba(244,232,213,0.10)",
    boxShadow:    "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
    transition:   "border-color 0.3s ease, box-shadow 0.3s ease",
  } : {
    position:     "relative",
    overflow:     "hidden",
    borderRadius: "20px",
    padding:      "28px 24px",
    cursor:       "default",
    willChange:   "transform",
    background:   "#FFFFFF",
    border:       "1px solid rgba(20,33,61,0.07)",
    boxShadow:    "0 1px 3px rgba(20,33,61,0.04), 0 4px 12px rgba(20,33,61,0.06), 0 12px 28px rgba(20,33,61,0.04)",
    transition:   "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion || !glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    glowRef.current.style.background =
      `radial-gradient(160px circle at ${x}px ${y}px, rgba(194,118,26,${isNavy ? "0.15" : "0.10"}), transparent 70%)`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const el = e.currentTarget as HTMLDivElement;
    if (isNavy) {
      el.style.boxShadow   = "0 2px 4px rgba(0,0,0,0.20), 0 16px 40px rgba(194,118,26,0.18), inset 0 1px 0 rgba(255,255,255,0.12)";
      el.style.borderColor = "rgba(194,118,26,0.25)";
    } else {
      el.style.boxShadow   = "0 8px 32px rgba(194,118,26,0.12), 0 12px 28px rgba(20,33,61,0.08)";
      el.style.borderColor = "rgba(194,118,26,0.25)";
    }
    if (accentRef.current) accentRef.current.style.transform = "scaleX(1)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const el = e.currentTarget as HTMLDivElement;
    if (isNavy) {
      el.style.boxShadow   = "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
      el.style.borderColor = "rgba(244,232,213,0.10)";
    } else {
      el.style.boxShadow   = "0 1px 3px rgba(20,33,61,0.04), 0 4px 12px rgba(20,33,61,0.06), 0 12px 28px rgba(20,33,61,0.04)";
      el.style.borderColor = "rgba(20,33,61,0.07)";
    }
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

      {/* Navy inner glow */}
      {isNavy && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(194,118,26,0.10) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ width: "44px", height: "44px", background: isNavy ? "rgba(194,118,26,0.15)" : "rgba(194,118,26,0.10)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#C2761A" }}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: isNavy ? "#F4E8D5" : "#14213D", marginBottom: "8px", lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: isNavy ? "rgba(244,232,213,0.60)" : "#4A5568", lineHeight: 1.65 }}>
          {item.description}
        </p>
      </div>

      {/* Bottom butterscotch accent line */}
      <div
        ref={accentRef}
        aria-hidden="true"
        style={{
          position:        "absolute",
          bottom:          0,
          left:            0,
          right:           0,
          height:          "3px",
          background:      "linear-gradient(90deg, #C2761A, #E0941F)",
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
  id, label, heading, description, background, items, items2, items2Label,
}: ServiceLineSectionProps) {
  const noMotion = useReducedMotion() === true;
  const isNavy   = background === "navy";
  const mag       = useMagnetic();

  const headingColor = isNavy ? "#F4E8D5"  : "#14213D";
  const bodyColor    = isNavy ? "rgba(244,232,213,0.70)" : "#4A5568";

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ padding: "120px 24px" }}
    >
      {/* ── Base background ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: isNavy ? "#14213D" : "#FBF3E7", zIndex: 0 }} />

      {/* ── Depth glows ── */}
      {isNavy ? (
        <>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 25%, rgba(194,118,26,0.05) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(42,63,102,0.35) 0%, transparent 50%)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", backgroundImage: `url("${GRAIN}")`, backgroundRepeat: "repeat", backgroundSize: "200px 200px", opacity: 0.02, mixBlendMode: "overlay" }} />
        </>
      ) : (
        <div aria-hidden="true" style={{ position: "absolute", top: "30%", left: "60%", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(194,118,26,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 1 }} />
      )}

      {/* ── Floating decorative elements (cream sections only) ── */}
      {!isNavy && (
        <>
          <ParallaxSection speed={0.15} style={{ position: "absolute", top: "15%", right: "8%", pointerEvents: "none", zIndex: 1 }}>
            <div aria-hidden="true" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "2px solid rgba(194,118,26,0.05)", background: "rgba(194,118,26,0.04)" }} />
          </ParallaxSection>
          <ParallaxSection speed={0.30} style={{ position: "absolute", bottom: "20%", right: "15%", pointerEvents: "none", zIndex: 1 }}>
            <div aria-hidden="true" style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(194,118,26,0.05)" }} />
          </ParallaxSection>
          <ParallaxSection speed={0.45} style={{ position: "absolute", top: "40%", left: "5%", pointerEvents: "none", zIndex: 1 }}>
            <div aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "4px", background: "rgba(194,118,26,0.06)", transform: "rotate(15deg)" }} />
          </ParallaxSection>
        </>
      )}

      {/* ── Content ── */}
      <div className="relative container" style={{ zIndex: 3 }}>

        {/* Header */}
        <ParallaxSection speed={0.25}>
          <div style={{ marginBottom: "56px" }}>
            <RevealBlock direction="perspective">
              <p style={{ color: "#C2761A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                {label}
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: headingColor, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: "20px" }}>
                {heading}
              </h2>
              <p style={{ fontSize: "1.05rem", color: bodyColor, lineHeight: 1.75, maxWidth: "700px" }}>
                {description}
              </p>
            </RevealBlock>
          </div>
        </ParallaxSection>

        {/* Primary items grid */}
        <ParallaxSection speed={0.35}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
          {items.map((item, i) => (
            <ItemCard key={item.title} item={item} index={i} isNavy={isNavy} noMotion={noMotion} />
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
                style={{ color: "#C2761A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px" }}
              >
                {items2Label}
              </motion.p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
              {items2.map((item, i) => (
                <ItemCard key={item.title} item={item} index={i} isNavy={isNavy} noMotion={noMotion} />
              ))}
            </div>
          </div>
        )}

        {/* Magnetic CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <motion.a
            href="/contact"
            style={{
              x:            mag.x,
              y:            mag.y,
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "#C2761A",
              color:        "#FFFFFF",
              fontWeight:   700,
              fontSize:     "0.95rem",
              padding:      "14px 32px",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow:    "0 2px 0 rgba(140,80,10,0.35), 0 4px 16px rgba(194,118,26,0.28)",
            }}
            onMouseMove={mag.onMove}
            onMouseLeave={mag.onLeave}
            whileHover={noMotion ? {} : { scale: 1.04, boxShadow: "0 2px 0 rgba(140,80,10,0.35), 0 8px 28px rgba(194,118,26,0.35)" }}
            whileTap={noMotion ? {} : { scale: 0.97, y: 1, boxShadow: "0 1px 0 rgba(140,80,10,0.35)" } as Parameters<typeof motion.a>[0]["whileTap"]}
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
