"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import RevealBlock from "@/components/RevealBlock";
import ParallaxSection from "@/components/ParallaxSection";
import {
  Settings2,
  Activity,
  Package,
  Users,
  Shield,
  Headphones,
  Zap,
  Lock,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CardData {
  id: string;
  title: string;
  desc: string;
  Icon: React.ComponentType;
  href: string;
}

interface TileData {
  id:   string;
  name: string;
  icon: LucideIcon;
  desc: string;
  href: string;
}

// ─── Custom SVG icons for the three hero cards ────────────────────────────────

function ServiceNowIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      {/* Central hub */}
      <circle cx="13" cy="13" r="3" fill="currentColor" />
      {/* Satellite nodes */}
      <circle cx="4"  cy="7"  r="2" fill="currentColor" opacity="0.55" />
      <circle cx="22" cy="7"  r="2" fill="currentColor" opacity="0.80" />
      <circle cx="4"  cy="19" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="22" cy="19" r="2" fill="currentColor" opacity="0.65" />
      {/* Spokes */}
      <path d="M10.3 11.3 6 8.8M15.7 11.3 20 8.8M10.3 14.7 6 17.2M15.7 14.7 20 17.2"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function BMCIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      {/* Shield body */}
      <path
        d="M13 2 L23 6.5 V12.5 C23 18.5 18.5 23 13 25 C7.5 23 3 18.5 3 12.5 V6.5 Z"
        fill="currentColor"
        fillOpacity="0.10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
      <path
        d="M8.5 13 L11.5 16 L17.5 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ManageEngineIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      {/* Three layer bars */}
      <rect x="2" y="4"  width="22" height="5" rx="2" fill="currentColor" />
      <rect x="2" y="11" width="22" height="5" rx="2" fill="currentColor" opacity="0.65" />
      <rect x="2" y="18" width="22" height="5" rx="2" fill="currentColor" opacity="0.35" />
      {/* Activity dots punched into each bar */}
      <circle cx="20.5" cy="6.5"  r="1.3" fill="var(--bg-base)" />
      <circle cx="20.5" cy="13.5" r="1.3" fill="var(--bg-base)" opacity="0.85" />
      <circle cx="20.5" cy="20.5" r="1.3" fill="var(--bg-base)" opacity="0.7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_CARDS: CardData[] = [
  {
    id: "servicenow",
    title: "ServiceNow Services",
    desc: "Transform your IT organization with intelligent automation. We design, implement, and scale ServiceNow platforms that eliminate silos and accelerate resolution times across the enterprise.",
    Icon: ServiceNowIcon,
    href: "/whatwedo",
  },
  {
    id: "bmc",
    title: "BMC Remedy Services",
    desc: "Modernize enterprise ITSM with battle-tested BMC Remedy expertise. From legacy migration to cloud-ready deployments, we ensure continuity while unlocking new efficiency gains.",
    Icon: BMCIcon,
    href: "/whatwedo",
  },
  {
    id: "manageengine",
    title: "ManageEngine Services",
    desc: "Unify IT management across endpoints, networks, and helpdesk. Our implementations give mid-market teams enterprise-grade visibility and control at a sustainable cost.",
    Icon: ManageEngineIcon,
    href: "/whatwedo",
  },
];

const CAPABILITIES: TileData[] = [
  { id: "itsm",     name: "ITSM",                  icon: Settings2,  desc: "Streamline incident, change, and request workflows",          href: "/whatwedo/itsm"                  },
  { id: "itom",     name: "ITOM",                  icon: Activity,   desc: "Monitor, predict, and resolve infrastructure events",         href: "/whatwedo/itom"                  },
  { id: "itam",     name: "ITAM",                  icon: Package,    desc: "Full lifecycle visibility of hardware and software assets",    href: "/whatwedo/itam"                  },
  { id: "hrsd",     name: "HRSD",                  icon: Users,      desc: "Unified employee self-service and case management",           href: "/whatwedo/hrsd"                  },
  { id: "grc",      name: "GRC",                   icon: Shield,     desc: "Automate policy, risk, and audit workflows at scale",         href: "/whatwedo/grc"                   },
  { id: "csm",      name: "CSM",                   icon: Headphones, desc: "Deliver omnichannel support that drives loyalty",             href: "/whatwedo/csm"                   },
  { id: "platform", name: "Platform Optimization", icon: Zap,        desc: "Maximize ROI on your existing platform investments",          href: "/whatwedo/platform-optimization" },
  { id: "secops",   name: "SecOps",                icon: Lock,       desc: "Unify vulnerability response and threat intelligence",        href: "/whatwedo/secops"                },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];


const tileReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.055, ease },
  }),
};

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ card, index }: { card: CardData; index: number }) {
  const noMotion = useReducedMotion() === true;
  const glowRef  = useRef<HTMLDivElement>(null);
  const shimRef  = useRef<HTMLDivElement>(null);

  // 3-D tilt MotionValues
  const rotXRaw = useMotionValue(0);
  const rotYRaw = useMotionValue(0);
  const rotX = useSpring(rotXRaw, { stiffness: 270, damping: 26 });
  const rotY = useSpring(rotYRaw, { stiffness: 270, damping: 26 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;   // 0 – 1
    const ny = (e.clientY - rect.top)  / rect.height;

    // Tilt — max ±8 °
    rotYRaw.set((nx - 0.5) * 16);
    rotXRaw.set(-(ny - 0.5) * 16);

    // Cursor glow — direct DOM, no React re-render
    if (glowRef.current) {
      glowRef.current.style.setProperty("--gx", `${nx * 100}%`);
      glowRef.current.style.setProperty("--gy", `${ny * 100}%`);
      glowRef.current.style.opacity = "1";
    }
  };

  const onEnter = () => {
    if (shimRef.current) shimRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    rotXRaw.set(0);
    rotYRaw.set(0);
    if (glowRef.current) glowRef.current.style.opacity  = "0";
    if (shimRef.current) shimRef.current.style.opacity  = "0";
  };

  return (
    <motion.div data-cursor="card" style={{ perspective: "1100px" }}>
      <motion.div
        className="h-full flex flex-col relative overflow-hidden cursor-default"
        style={{
          padding:         "32px",
          rotateX:         rotX,
          rotateY:         rotY,
          transformStyle:  "preserve-3d",
          background:      "#0F0F0F",
          border:          "1px solid rgba(255,255,255,0.08)",
          boxShadow:       "0 4px 24px rgba(0,0,0,0.8)",
          borderRadius:    "16px",
          transition:      "box-shadow 0.25s ease",
        }}
        onMouseMove={onMove}
        onMouseEnter={(e) => {
          onEnter();
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 48px rgba(0,229,192,0.10)";
        }}
        onMouseLeave={(e) => {
          onLeave();
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.8)";
        }}
      >
        {/* ── Cursor-following radial glow ── */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at var(--gx, 50%) var(--gy, 35%), rgba(0,229,192,0.09), transparent 65%)",
            opacity: 0,
            transition: "opacity 0.28s",
          }}
        />

        {/* ── Top shimmer line ── */}
        <div
          ref={shimRef}
          className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,229,192,0.35) 50%, transparent 100%)",
            opacity: 0,
            transition: "opacity 0.35s",
          }}
        />

        {/* ── Content ── */}
        <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
          {/* Icon badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
            style={{ background: "rgba(0,229,192,0.10)", color: "#00E5C0" }}
          >
            <card.Icon />
          </div>

          {/* Title */}
          <h3
            className="font-semibold mb-3"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.3,
              color: "#FFFFFF",
            }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm flex-grow mb-6"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.72 }}
          >
            {card.desc}
          </p>

          {/* CTA link */}
          <a
            href={card.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-70 mt-auto w-fit"
            style={{ color: "#00E5C0" }}
          >
            Learn More
            <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CapabilityTile ───────────────────────────────────────────────────────────

function CapabilityTile({ tile, index }: { tile: TileData; index: number }) {
  const noMotion = useReducedMotion() === true;
  const glowRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion || !glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background =
      `radial-gradient(180px circle at ${x}px ${y}px, rgba(0,229,192,0.12), transparent 70%)`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      custom={index}
      variants={noMotion ? {} : tileReveal}
      initial={noMotion ? false : "hidden"}
      whileInView={noMotion ? undefined : "visible"}
      viewport={{ once: false, margin: "-40px" }}
      whileHover={noMotion ? {} : {
        y: -8,
        scale: 1.02,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position:       "relative",
        overflow:       "hidden",
        borderRadius:   "20px",
        padding:        "32px 28px",
        minHeight:      "160px",
        background:     "rgba(255,255,255,0.03)",
        border:         "1px solid rgba(255,255,255,0.07)",
        boxShadow:      "0 4px 24px rgba(0,0,0,0.5)",
        cursor:         "pointer",
        display:        "flex",
        flexDirection:  "column",
        gap:            "16px",
        willChange:     "transform",
        transition:     "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      data-cursor="card"
    >
      {/* Cursor-following radial glow */}
      <div
        ref={glowRef}
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

      {/* Hover border glow */}
      <motion.div
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "20px",
          border:       "1px solid rgba(0,229,192,0)",
          pointerEvents:"none",
          zIndex:       1,
        }}
        whileHover={{
          border:     "1px solid rgba(0,229,192,0.35)",
          boxShadow:  "0 8px 32px rgba(0,229,192,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon badge */}
      <div
        style={{
          position:       "relative",
          zIndex:         2,
          width:          "52px",
          height:         "52px",
          borderRadius:   "14px",
          background:     "linear-gradient(135deg, rgba(0,229,192,0.12) 0%, rgba(0,229,192,0.06) 100%)",
          border:         "1px solid rgba(0,229,192,0.15)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}
      >
        <tile.icon size={22} strokeWidth={1.6} style={{ color: "#00E5C0" }} />
      </div>

      {/* Text content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{
          fontSize:      "1rem",
          fontWeight:    700,
          color:         "#FFFFFF",
          marginBottom:  "8px",
          letterSpacing: "-0.01em",
          lineHeight:    1.3,
        }}>
          {tile.name}
        </p>
        <p style={{
          fontSize:   "0.85rem",
          lineHeight: 1.65,
          color:      "rgba(255,255,255,0.55)",
          fontWeight: 400,
        }}>
          {tile.desc}
        </p>
      </div>

      {/* Bottom accent line — slides in on hover */}
      <motion.div
        style={{
          position:        "absolute",
          bottom:          0,
          left:            0,
          right:           0,
          height:          "3px",
          background:      "linear-gradient(90deg, #00E5C0, #00C4A6)",
          borderRadius:    "0 0 20px 20px",
          scaleX:          0,
          transformOrigin: "left",
          zIndex:          2,
        }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Top-right corner accent dot */}
      <motion.div
        style={{
          position:     "absolute",
          top:          "20px",
          right:        "20px",
          width:        "6px",
          height:       "6px",
          borderRadius: "50%",
          background:   "#00E5C0",
          opacity:      0,
          zIndex:       2,
        }}
        whileHover={{ opacity: 0.6, scale: 1.5 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  const noMotion    = useReducedMotion() === true;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Heading scroll reveal
  const fadeUp = (delay = 0) =>
    noMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: false, margin: "-80px" } as const,
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section id="services" className="section relative overflow-hidden" style={{ paddingTop: "160px", paddingBottom: "160px" }}>

      {/* ── Decorative blobs (parallax) ── */}
      <ParallaxSection speed={0.2} style={{ position: "absolute", top: 0, right: "-60px", width: "400px", height: "400px", pointerEvents: "none", zIndex: 0 }}>
        <div aria-hidden="true" style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse, rgba(0,229,192,0.02) 0%, transparent 65%)", filter: "blur(40px)", borderRadius: "50%" }} />
      </ParallaxSection>
      <ParallaxSection speed={0.35} style={{ position: "absolute", bottom: "80px", left: "-40px", width: "300px", height: "300px", pointerEvents: "none", zIndex: 0 }}>
        <div aria-hidden="true" style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse, rgba(0,229,192,0.02) 0%, transparent 65%)", filter: "blur(40px)", borderRadius: "50%" }} />
      </ParallaxSection>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section heading ─────────────────────────────────────────────── */}
        <ParallaxSection speed={0.25}>
        <div style={{ marginBottom: "72px" }}>
          <RevealBlock direction="perspective">
            <h2
              className="relative inline-block font-bold tracking-[-0.025em]"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                color: "var(--text-primary)",
                marginBottom: "32px",
              }}
            >
              Our Practices
              {/* Underline — scales in from left on scroll */}
              <motion.span
                className="absolute left-0 w-full rounded-full pointer-events-none"
                style={{
                  bottom: "-8px",
                  height: "3px",
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 10px var(--accent-glow)",
                  transformOrigin: "left center",
                }}
                initial={noMotion ? false : { scaleX: 0 }}
                whileInView={noMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.28, ease }}
              />
            </h2>
          </RevealBlock>

          <RevealBlock direction="up" delay={0.14}>
            <p
              style={{
                fontSize: "clamp(0.93rem, 1.6vw, 1.05rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.78,
                marginTop: "24px",
                marginBottom: "56px",
                maxWidth: "640px",
              }}
            >
              We simplify complex IT ecosystems by implementing and optimizing the
              world&apos;s leading platforms — ServiceNow, BMC Remedy, and
              ManageEngine. Whether you&apos;re modernizing legacy ITSM, automating
              operations, or building enterprise-wide governance frameworks, our
              consultants deliver outcomes that compound.
            </p>
          </RevealBlock>
        </div>
        </ParallaxSection>

        {/* ── Hero service cards — orbital arc layout ────────────────────── */}
        <ParallaxSection speed={0.3}>
        <div style={{ marginBottom: "64px" }}>

          {/* Mobile — vertical stack */}
          <div className="md:hidden flex flex-col" style={{ gap: "28px" }}>
            {SERVICE_CARDS.map((card, i) => (
              <RevealBlock key={card.id} direction="up" delay={i * 0.08}>
                <ServiceCard card={card} index={i} />
              </RevealBlock>
            ))}
          </div>

          {/* Desktop — orbital arc */}
          <div
            className="hidden md:block relative"
            style={{ height: "520px", perspective: "1400px" }}
          >
            {/* Spotlight glow under center card */}
            <div
              aria-hidden="true"
              style={{
                position:     "absolute",
                bottom:       "-40px",
                left:         "50%",
                transform:    "translateX(-50%)",
                width:        "300px",
                height:       "60px",
                background:   "radial-gradient(ellipse, rgba(0,229,192,0.06) 0%, transparent 70%)",
                filter:       "blur(10px)",
                borderRadius: "50%",
                zIndex:       0,
                pointerEvents:"none",
              }}
            />

            {/* ── Left card — ServiceNow ── */}
            <motion.div
              style={{
                position:      "absolute",
                left:          "0%",
                top:           "40px",
                width:         "36%",
                zIndex:        hoveredCard === SERVICE_CARDS[0].id ? 3 : 1,
                transformStyle:"preserve-3d",
              }}
              initial={noMotion ? false : { opacity: 0, x: -40 }}
              whileInView={noMotion ? undefined : {
                opacity:  0.95,
                x:        0,
                rotateY:  10,
                rotateX: -1,
                z:        -30,
                scale:    0.97,
              }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              whileHover={noMotion ? {} : {
                rotateY: 0, rotateX: 0, z: 12, opacity: 1, scale: 1,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              }}
              onHoverStart={() => setHoveredCard(SERVICE_CARDS[0].id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <ServiceCard card={SERVICE_CARDS[0]} index={0} />
            </motion.div>

            {/* ── Center card — BMC Remedy (featured) ── */}
            <motion.div
              style={{
                position:      "absolute",
                left:          "50%",
                top:           "0px",
                width:         "38%",
                zIndex:        hoveredCard === SERVICE_CARDS[1].id ? 3 : 2,
                transformStyle:"preserve-3d",
              }}
              initial={noMotion ? false : { opacity: 0, y: 30 }}
              whileInView={noMotion ? undefined : {
                opacity: 1,
                y:       0,
                x:       "-50%",
              }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              whileHover={noMotion ? {} : {
                z: 12, scale: 1.02, y: -4,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              }}
              onHoverStart={() => setHoveredCard(SERVICE_CARDS[1].id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <ServiceCard card={SERVICE_CARDS[1]} index={1} />
            </motion.div>

            {/* ── Right card — ManageEngine ── */}
            <motion.div
              style={{
                position:      "absolute",
                right:         "0%",
                top:           "40px",
                width:         "36%",
                zIndex:        hoveredCard === SERVICE_CARDS[2].id ? 3 : 1,
                transformStyle:"preserve-3d",
              }}
              initial={noMotion ? false : { opacity: 0, x: 40 }}
              whileInView={noMotion ? undefined : {
                opacity:  0.95,
                x:        0,
                rotateY: -10,
                rotateX: -1,
                z:        -30,
                scale:    0.97,
              }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              whileHover={noMotion ? {} : {
                rotateY: 0, rotateX: 0, z: 12, opacity: 1, scale: 1,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              }}
              onHoverStart={() => setHoveredCard(SERVICE_CARDS[2].id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <ServiceCard card={SERVICE_CARDS[2]} index={2} />
            </motion.div>
          </div>
        </div>
        </ParallaxSection>

        {/* ── Capabilities label + heading ─────────────────────────────────── */}
        <div style={{ marginTop: "96px", marginBottom: "40px" }}>
          <motion.p
            style={{
              fontSize:      "0.7rem",
              fontWeight:    700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "#00E5C0",
              marginBottom:  "12px",
            }}
            {...fadeUp()}
          >
            Our Capabilities
          </motion.p>
          <motion.h3
            style={{
              fontSize:      "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight:    700,
              color:         "#FFFFFF",
              letterSpacing: "-0.02em",
              maxWidth:      "500px",
            }}
            {...fadeUp(0.1)}
          >
            Eight ways we transform your IT operations
          </motion.h3>
        </div>

        {/* ── Capability tiles 4×2 ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "16px" }}>
          {CAPABILITIES.map((tile, i) => (
            <Link key={tile.id} href={tile.href} style={{ display: "block", textDecoration: "none" }}>
              <CapabilityTile tile={tile} index={i} />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
