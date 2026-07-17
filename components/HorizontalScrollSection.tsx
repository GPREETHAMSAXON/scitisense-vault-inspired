"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion, useScroll, useTransform, useReducedMotion,
  useMotionValue, useSpring,
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
export interface HScrollItem {
  icon:        string;
  title:       string;
  description: string;
}

export interface HorizontalScrollSectionProps {
  id?:          string;
  label:        string;
  heading:      string;
  description:  string;
  background:   "cream" | "navy";
  items:        HScrollItem[];
  items2?:      HScrollItem[];
  items2Label?: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Magnetic CTA hook ────────────────────────────────────────────────────────
function useMagnetic() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 320, damping: 24 });
  const y    = useSpring(rawY, { stiffness: 320, damping: 24 });

  function onMove<T extends HTMLElement>(e: React.MouseEvent<T>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.38);
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.38);
  }
  function onLeave() { rawX.set(0); rawY.set(0); }

  return { x, y, onMove, onLeave };
}

// ─── Horizontal card ─────────────────────────────────────────────────────────
function HCard({
  item, isNavy, divider,
}: {
  item:     HScrollItem;
  isNavy:   boolean;
  divider?: boolean;
}) {
  const Icon = ICON_MAP[item.icon] ?? Bot;

  if (isNavy) {
    return (
      <div
        style={{
          width:        "300px",
          flexShrink:   0,
          background:   "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border:       `1px solid ${divider ? "rgba(194,118,26,0.3)" : "rgba(244,232,213,0.10)"}`,
          borderRadius: "20px",
          padding:      "28px 24px",
          position:     "relative",
          overflow:     "hidden",
          cursor:       "default",
          boxShadow:    "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
          transition:   "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
          willChange:   "transform",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform   = "translateY(-5px)";
          el.style.boxShadow   = "0 2px 4px rgba(0,0,0,0.20), 0 16px 40px rgba(194,118,26,0.18), inset 0 1px 0 rgba(255,255,255,0.12)";
          el.style.borderColor = "rgba(194,118,26,0.25)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform   = "translateY(0)";
          el.style.boxShadow   = "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
          el.style.borderColor = divider ? "rgba(194,118,26,0.3)" : "rgba(244,232,213,0.10)";
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(194,118,26,0.10) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ width: "44px", height: "44px", background: "rgba(194,118,26,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#C2761A" }}>
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F4E8D5", marginBottom: "8px", lineHeight: 1.3 }}>
            {item.title}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "rgba(244,232,213,0.60)", lineHeight: 1.65 }}>
            {item.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card-3d"
      style={{
        width:      "300px",
        flexShrink: 0,
        padding:    "28px 24px",
        cursor:     "default",
        willChange: "transform",
      }}
    >
      <div style={{ width: "44px", height: "44px", background: "rgba(194,118,26,0.10)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#C2761A" }}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#14213D", marginBottom: "8px", lineHeight: 1.3 }}>
        {item.title}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "#4A5568", lineHeight: 1.65 }}>
        {item.description}
      </p>
    </div>
  );
}

// ─── Mobile grid card ─────────────────────────────────────────────────────────
function MobileCard({ item, index, isNavy, noMotion }: {
  item: HScrollItem; index: number; isNavy: boolean; noMotion: boolean;
}) {
  const Icon = ICON_MAP[item.icon] ?? Bot;
  if (isNavy) {
    return (
      <motion.div
        initial={noMotion ? false : { opacity: 0, y: 28 }}
        whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease }}
        style={{
          background:   "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border:       "1px solid rgba(244,232,213,0.10)",
          borderRadius: "20px",
          padding:      "28px 24px",
          position:     "relative",
          overflow:     "hidden",
          cursor:       "default",
          boxShadow:    "0 1px 2px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(194,118,26,0.10) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ width: "44px", height: "44px", background: "rgba(194,118,26,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#C2761A" }}>
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F4E8D5", marginBottom: "8px", lineHeight: 1.3 }}>{item.title}</h3>
          <p style={{ fontSize: "0.875rem", color: "rgba(244,232,213,0.60)", lineHeight: 1.65 }}>{item.description}</p>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="card-3d"
      initial={noMotion ? false : { opacity: 0, y: 28 }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      style={{ padding: "28px 24px", cursor: "default" }}
    >
      <div style={{ width: "44px", height: "44px", background: "rgba(194,118,26,0.10)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#C2761A" }}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#14213D", marginBottom: "8px", lineHeight: 1.3 }}>{item.title}</h3>
      <p style={{ fontSize: "0.875rem", color: "#4A5568", lineHeight: 1.65 }}>{item.description}</p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function HorizontalScrollSection({
  id, label, heading, description, background, items, items2, items2Label,
}: HorizontalScrollSectionProps) {
  const noMotion = useReducedMotion() === true;
  const isNavy   = background === "navy";
  const mag       = useMagnetic();

  // SSR-safe mobile detection — default to mobile (grid) until hydrated
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const allItems   = [...items, ...(items2 ?? [])];
  const headingColor = isNavy ? "#F4E8D5"                   : "#14213D";
  const bodyColor    = isNavy ? "rgba(244,232,213,0.70)"    : "#4A5568";
  const bg           = isNavy ? "#14213D"                    : "#FBF3E7";

  const outerRef           = useRef<HTMLDivElement>(null);
  const [ready, setReady]  = useState(false);

  // Defer target ref until DOM is committed — avoids "ref not hydrated" during SSR.
  // Note: isDesktop state already covers the first render (shows mobile grid),
  // but useScroll must also be guarded since it's called unconditionally.
  useEffect(() => {
    if (outerRef.current) setReady(true);
  }, [isDesktop]); // re-run when isDesktop flips so desktop render also gets ready

  const { scrollYProgress } = useScroll({
    target:  ready ? outerRef : undefined,
    offset:  ["start start", "end start"],
  });
  const x                = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // ── Mobile / reduced-motion: standard vertical grid ──────────────────────
  if (!isDesktop || noMotion) {
    return (
      <section id={id} style={{ position: "relative", overflow: "hidden", padding: "120px 24px" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: bg, zIndex: 0 }} />
        {isNavy && (
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 25%, rgba(194,118,26,0.05) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(42,63,102,0.35) 0%, transparent 50%)" }} />
        )}
        <div className="relative container" style={{ zIndex: 3 }}>
          <div style={{ marginBottom: "56px" }}>
            <RevealBlock direction="perspective">
              <p style={{ color: "#C2761A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>{label}</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: headingColor, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: "20px" }}>{heading}</h2>
              <p style={{ fontSize: "1.05rem", color: bodyColor, lineHeight: 1.75, maxWidth: "700px" }}>{description}</p>
            </RevealBlock>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {items.map((item, i) => <MobileCard key={item.title} item={item} index={i} isNavy={isNavy} noMotion={noMotion} />)}
          </div>
          {items2 && items2.length > 0 && (
            <div style={{ marginTop: "56px" }}>
              {items2Label && (
                <p style={{ color: "#C2761A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px" }}>{items2Label}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
                {items2.map((item, i) => <MobileCard key={item.title} item={item} index={i} isNavy={isNavy} noMotion={noMotion} />)}
              </div>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <motion.a href="/contact" style={{ x: mag.x, y: mag.y, display: "inline-flex", alignItems: "center", gap: "8px", background: "#C2761A", color: "#FFFFFF", fontWeight: 700, fontSize: "0.95rem", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", boxShadow: "0 2px 0 rgba(140,80,10,0.35), 0 4px 16px rgba(194,118,26,0.28)" }} onMouseMove={mag.onMove} onMouseLeave={mag.onLeave} whileHover={{ scale: 1.04 }} transition={{ duration: 0.2, ease }}>
              Explore {heading} Projects <ArrowRight size={16} strokeWidth={2.5} />
            </motion.a>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: horizontal scroll experience ────────────────────────────────
  return (
    <div
      id={id}
      ref={outerRef}
      style={{ position: "relative", height: "300vh" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position:   "sticky",
          top:        0,
          height:     "100vh",
          overflow:   "hidden",
          display:    "flex",
          alignItems: "center",
          background: bg,
        }}
      >
        {/* Background glows */}
        {isNavy ? (
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 25%, rgba(194,118,26,0.05) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(42,63,102,0.35) 0%, transparent 50%)" }} />
        ) : (
          <div aria-hidden="true" style={{ position: "absolute", top: "30%", left: "60%", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(194,118,26,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        )}

        <div style={{ display: "flex", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 24px", gap: "0", height: "100%", alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* ── Left: sticky text panel ── */}
          <div
            style={{
              width:       "30%",
              flexShrink:  0,
              paddingRight: "60px",
            }}
          >
            <ParallaxSection speed={0.15}>
              <p style={{ color: "#C2761A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>{label}</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)", fontWeight: 800, color: headingColor, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "20px" }}>{heading}</h2>
              <p style={{ fontSize: "0.95rem", color: bodyColor, lineHeight: 1.75, marginBottom: "32px" }}>{description}</p>
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
                  fontSize:     "0.9rem",
                  padding:      "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow:    "0 2px 0 rgba(140,80,10,0.35), 0 4px 16px rgba(194,118,26,0.28)",
                }}
                onMouseMove={mag.onMove}
                onMouseLeave={mag.onLeave}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2, ease }}
              >
                Explore Projects <ArrowRight size={15} strokeWidth={2.5} />
              </motion.a>
            </ParallaxSection>
          </div>

          {/* ── Right: horizontal card track ── */}
          <div style={{ flex: 1, overflow: "hidden", height: "100%", display: "flex", alignItems: "center" }}>
            <motion.div
              style={{ x, display: "flex", gap: "20px", willChange: "transform" }}
            >
              {/* Primary items */}
              {items.map((item) => (
                <HCard key={item.title} item={item} isNavy={isNavy} />
              ))}

              {/* Visual divider between item groups */}
              {items2 && items2.length > 0 && (
                <>
                  <div style={{ flexShrink: 0, width: "1px", height: "120px", background: "rgba(194,118,26,0.2)", alignSelf: "center", margin: "0 8px" }} />
                  {items2Label && (
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", width: "120px" }}>
                      <p style={{ color: "#C2761A", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.4 }}>{items2Label}</p>
                    </div>
                  )}
                  {items2.map((item, i) => (
                    <HCard key={item.title} item={item} isNavy={isNavy} divider={i === 0} />
                  ))}
                </>
              )}

              {/* Trailing fade spacer */}
              <div style={{ flexShrink: 0, width: "60px" }} />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint — fades out once scrolled */}
        <motion.div
          style={{
            position:  "absolute",
            bottom:    "32px",
            left:      "50%",
            transform: "translateX(-50%)",
            opacity:   scrollHintOpacity,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: isNavy ? "rgba(244,232,213,0.40)" : "rgba(20,33,61,0.35)" }}>
              Scroll to explore
            </p>
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "24px", height: "2px", background: "#C2761A", borderRadius: "2px", opacity: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
