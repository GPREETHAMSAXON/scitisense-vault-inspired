"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Package, Shield, Activity, Zap, Settings2, Users, Headphones, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [Package, Shield, Activity, Zap, Settings2, Users, Headphones, Lock];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  features: string[];
}

// ─── Single feature card with 3D tilt ─────────────────────────────────────────

function FeatureCard({ name, index, noMotion }: { name: string; index: number; noMotion: boolean }) {
  const Icon    = ICONS[index % ICONS.length];
  const glowRef = useRef<HTMLDivElement>(null);

  const rotXRaw = useMotionValue(0);
  const rotYRaw = useMotionValue(0);
  const rotX    = useSpring(rotXRaw, { stiffness: 270, damping: 26 });
  const rotY    = useSpring(rotYRaw, { stiffness: 270, damping: 26 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx   = (e.clientX - rect.left) / rect.width;
    const ny   = (e.clientY - rect.top)  / rect.height;
    rotYRaw.set((nx - 0.5) * 12);
    rotXRaw.set(-(ny - 0.5) * 12);
    if (glowRef.current) {
      glowRef.current.style.setProperty("--gx", `${nx * 100}%`);
      glowRef.current.style.setProperty("--gy", `${ny * 100}%`);
      glowRef.current.style.opacity = "1";
    }
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rotXRaw.set(0);
    rotYRaw.set(0);
    if (glowRef.current) glowRef.current.style.opacity = "0";
    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.8)";
  };

  return (
    <motion.div
      style={{ perspective: "1100px" }}
      initial={noMotion ? false : { opacity: 0, y: 32 }}
      whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
    >
      <motion.div
        style={{
          rotateX:        rotX,
          rotateY:        rotY,
          transformStyle: "preserve-3d",
          background:     "#0F0F0F",
          border:         "1px solid rgba(255,255,255,0.08)",
          borderRadius:   "16px",
          padding:        "28px",
          height:         "100%",
          position:       "relative",
          overflow:       "hidden",
          cursor:         "default",
          boxShadow:      "0 4px 24px rgba(0,0,0,0.8)",
          transition:     "box-shadow 0.2s ease",
        }}
        onMouseMove={onMove}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 32px rgba(0,229,192,0.14), 0 24px 48px rgba(0,229,192,0.10)";
        }}
        onMouseLeave={onLeave}
      >
        {/* Cursor glow */}
        <div
          ref={glowRef}
          style={{
            position:     "absolute",
            inset:        0,
            borderRadius: "16px",
            background:   "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(0,229,192,0.09), transparent 65%)",
            opacity:      0,
            transition:   "opacity 0.28s",
            pointerEvents:"none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              width:          "44px",
              height:         "44px",
              background:     "rgba(0,229,192,0.10)",
              borderRadius:   "12px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              marginBottom:   "16px",
              color:          "#00E5C0",
            }}
          >
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", lineHeight: 1.3 }}>
            {name}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
            Enterprise-grade {name.toLowerCase()} configuration and optimization.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServiceFeatureGrid({ features }: Props) {
  const noMotion = useReducedMotion() === true;

  return (
    <section style={{ backgroundColor: "#080808", padding: "80px 24px" }}>
      <div className="container">

        <motion.p
          initial={noMotion ? false : { opacity: 0, y: 16 }}
          whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          style={{
            color:         "#00E5C0",
            fontSize:      "0.75rem",
            fontWeight:    600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom:  "40px",
          }}
        >
          Core Capabilities
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {features.map((name, i) => (
            <FeatureCard key={name} name={name} index={i} noMotion={noMotion} />
          ))}
        </div>

      </div>
    </section>
  );
}
