"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Settings2, Activity, Package, Users,
  Shield, Headphones, Zap, Lock,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  {
    id: "advisory",
    title: "Advisory & Consulting",
    desc: "We work as strategic partners to align your IT investments with business outcomes. From platform selection and roadmap planning to process design and governance frameworks, our consultants bring hands-on experience across hundreds of enterprise engagements — guiding you from strategy all the way through to optimization.",
  },
  {
    id: "implementation",
    title: "Implementation",
    desc: "Seamless ServiceNow implementations delivered on time, on scope. We configure, integrate, and deploy enterprise-grade solutions with zero shortcuts — rigorous testing, clean data migrations, and user adoption baked in from day one so your teams hit the ground running.",
  },
  {
    id: "migration",
    title: "Migration & Upgradation",
    desc: "Move to the latest ServiceNow release or migrate from legacy ITSM platforms without disruption. Our structured upgrade methodology protects customizations, preserves data integrity, and keeps your business fully operational throughout every phase of the transition.",
  },
];

const SOLUTIONS = [
  { id: "itsm",     name: "ITSM",                  icon: Settings2,  desc: "Streamline incident, change, and request workflows"       },
  { id: "itom",     name: "ITOM",                  icon: Activity,   desc: "Monitor, predict, and resolve infrastructure events"      },
  { id: "itam",     name: "ITAM",                  icon: Package,    desc: "Full lifecycle visibility of hardware and software assets" },
  { id: "hrsd",     name: "HRSD",                  icon: Users,      desc: "Unified employee self-service and case management"        },
  { id: "grc",      name: "GRC",                   icon: Shield,     desc: "Automate policy, risk, and audit workflows at scale"      },
  { id: "csm",      name: "CSM",                   icon: Headphones, desc: "Deliver omnichannel support that drives loyalty"          },
  { id: "platform", name: "Platform Optimization", icon: Zap,        desc: "Maximize ROI on your existing platform investments"       },
  { id: "secops",   name: "SecOps",                icon: Lock,       desc: "Unify vulnerability response and threat intelligence"     },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fadeUp(noMotion: boolean, delay = 0) {
  if (noMotion) return { initial: false as const };
  return {
    initial:     { opacity: 0, y: 28 } as const,
    whileInView: { opacity: 1, y: 0  } as const,
    viewport:    { once: false, margin: "-80px" } as const,
    transition:  { duration: 0.65, delay, ease },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatWeDo() {
  const noMotion = useReducedMotion() === true;

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "var(--bg-base)" }}>

        {/* ── Hero banner ───────────────────────────────────────────────────── */}
        <section
          className="relative flex items-center justify-center text-center overflow-hidden"
          style={{
            paddingTop: "160px",
            paddingBottom: "80px",
            backgroundImage:
              "radial-gradient(ellipse at 30% 60%, rgba(194,118,26,0.06) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 75% 30%, rgba(20,33,61,0.05) 0%, transparent 55%)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
              {...fadeUp(noMotion)}
            >
              Our Services
            </motion.p>

            <motion.h1
              className="font-bold tracking-[-0.028em] mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "var(--text-primary)",
                lineHeight: 1.08,
              }}
              {...fadeUp(noMotion, 0.08)}
            >
              What We Do
            </motion.h1>

            <motion.p
              style={{
                fontSize:  "clamp(0.95rem, 1.7vw, 1.1rem)",
                color:     "var(--text-secondary)",
                lineHeight: 1.78,
                maxWidth:  "640px",
                margin:    "0 auto",
                textAlign: "center",
              }}
              {...fadeUp(noMotion, 0.16)}
            >
              We help enterprises unlock the full potential of ServiceNow —
              accelerating IT transformation through expert advisory, precision
              implementations, and zero-disruption migrations.
            </motion.p>
          </div>
        </section>

        {/* ── Service types ─────────────────────────────────────────────────── */}
        <section style={{ paddingTop: "40px", paddingBottom: "100px" }}>
          <div className="container px-5 md:px-8">
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {SERVICE_TYPES.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  {...fadeUp(noMotion, i * 0.08)}
                  whileHover={
                    noMotion
                      ? {}
                      : {
                          y: -6,
                          boxShadow:
                            "0 4px 12px rgba(20,33,61,0.06), 0 16px 40px rgba(194,118,26,0.10), 0 32px 64px rgba(194,118,26,0.08)",
                        }
                  }
                  transition={{ duration: 0.3, ease }}
                  style={{
                    background:   "#FFFFFF",
                    borderRadius: "20px",
                    padding:      "40px 44px",
                    border:       "1px solid rgba(20,33,61,0.08)",
                    boxShadow:    "0 2px 8px rgba(20,33,61,0.04), 0 8px 24px rgba(20,33,61,0.06), 0 24px 48px rgba(20,33,61,0.04)",
                    position:     "relative",
                    overflow:     "hidden",
                    cursor:       "default",
                  }}
                >
                  {/* Step number watermark */}
                  <div
                    aria-hidden="true"
                    style={{
                      position:     "absolute",
                      top:          "32px",
                      right:        "40px",
                      fontSize:     "3rem",
                      fontWeight:   800,
                      color:        "rgba(194,118,26,0.08)",
                      lineHeight:   1,
                      pointerEvents:"none",
                      userSelect:   "none",
                    }}
                  >
                    0{i + 1}
                  </div>

                  {/* Butterscotch accent bar */}
                  <div
                    style={{
                      width:        "48px",
                      height:       "4px",
                      background:   "#C2761A",
                      borderRadius: "999px",
                      marginBottom: "24px",
                    }}
                  />

                  <h2
                    style={{
                      fontSize:     "1.5rem",
                      fontWeight:   700,
                      color:        "#14213D",
                      marginBottom: "16px",
                      lineHeight:   1.2,
                    }}
                  >
                    {svc.title}
                  </h2>
                  <p
                    style={{
                      fontSize:  "1rem",
                      color:     "#4A5568",
                      lineHeight: 1.8,
                      maxWidth:  "780px",
                    }}
                  >
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solutions grid ────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop:      "100px",
            paddingBottom:   "120px",
            backgroundColor: "#14213D",
            borderTop:       "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container px-5 md:px-8">
            <motion.p
              className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase mb-3"
              style={{ color: "#C2761A" }}
              {...fadeUp(noMotion)}
            >
              Our Solutions
            </motion.p>
            <motion.h2
              className="font-bold tracking-[-0.025em] mb-14"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color:    "#F4E8D5",
              }}
              {...fadeUp(noMotion, 0.08)}
            >
              Enterprise-Grade Capabilities
            </motion.h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              style={{ gap: "20px" }}
            >
              {SOLUTIONS.map((sol, i) => (
                <motion.div
                  key={sol.id}
                  {...fadeUp(noMotion, i * 0.05)}
                  style={{
                    background:    "#FFFFFF",
                    borderRadius:  "16px",
                    padding:       "28px 24px",
                    border:        "1px solid rgba(20,33,61,0.06)",
                    boxShadow:     "0 2px 12px rgba(20,33,61,0.06)",
                    display:       "flex",
                    flexDirection: "column",
                    cursor:        "default",
                    transition:    "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (noMotion) return;
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform   = "translateY(-4px)";
                    el.style.boxShadow   = "0 8px 24px rgba(194,118,26,0.12)";
                    el.style.borderColor = "rgba(194,118,26,0.20)";
                  }}
                  onMouseLeave={(e) => {
                    if (noMotion) return;
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform   = "translateY(0)";
                    el.style.boxShadow   = "0 2px 12px rgba(20,33,61,0.06)";
                    el.style.borderColor = "rgba(20,33,61,0.06)";
                  }}
                >
                  <div
                    style={{
                      width:          "40px",
                      height:         "40px",
                      background:     "rgba(194,118,26,0.08)",
                      borderRadius:   "10px",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      marginBottom:   "16px",
                      color:          "#C2761A",
                      flexShrink:     0,
                    }}
                  >
                    <sol.icon size={18} strokeWidth={1.8} />
                  </div>

                  <p
                    style={{
                      fontSize:     "0.9rem",
                      fontWeight:   700,
                      color:        "#14213D",
                      marginBottom: "8px",
                    }}
                  >
                    {sol.name}
                  </p>
                  <p
                    style={{
                      fontSize:    "0.8rem",
                      color:       "#4A5568",
                      lineHeight:  1.65,
                      flexGrow:    1,
                      marginBottom:"20px",
                    }}
                  >
                    {sol.desc}
                  </p>
                  <a
                    href={`/whatwedo/${sol.id}`}
                    className="inline-flex items-center gap-1"
                    style={{
                      fontSize:   "0.8rem",
                      fontWeight: 600,
                      color:      "#C2761A",
                      marginTop:  "auto",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    View More
                    <ChevronRight size={12} strokeWidth={2.5} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
