"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import ParallaxSection from "@/components/ParallaxSection";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOGOS = [
  { file: "algoleap.webp",     name: "Algoleap"                            },
  { file: "ananttam.webp",     name: "Ananttam"                            },
  { file: "bmc.webp",          name: "BMC"                                 },
  { file: "dy.webp",           name: "DY"                                  },
  { file: "hadron.webp",       name: "Hadron Global Business Solutions"    },
  { file: "IIB.webp",          name: "Insurance Information Bureau of India" },
  { file: "kerryaa-logo.webp", name: "KREEYAA"                             },
  { file: "kyndryl.webp",      name: "Kyndryl"                             },
  { file: "proviniti.webp",    name: "Proviniti"                           },
  { file: "quintica.webp",     name: "Quintica"                            },
  { file: "tcs.webp",          name: "Tata Consultancy Services"           },
  { file: "wissen-logo.webp",  name: "Wissen"                              },
] as const;

// ─── Logo pill ────────────────────────────────────────────────────────────────

function LogoPill({ name, file }: { name: string; file: string }) {
  return (
    <div
      style={{
        background:     "#FFFFFF",
        border:         "1px solid #D2D2D7",
        borderRadius:   "12px",
        padding:        "16px 28px",
        marginRight:    "20px",
        flexShrink:     0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        minWidth:       "120px",
        boxShadow:      "0 1px 3px rgba(0,0,0,0.04)",
        transition:     "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        cursor:         "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform  = "translateY(-5px) scale(1.03)";
        el.style.borderColor = "rgba(0,113,227,0.3)";
        el.style.boxShadow   = "0 8px 24px rgba(0,113,227,0.1)";
        const img = el.querySelector("img");
        if (img) img.style.filter = "none";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform  = "translateY(0) scale(1)";
        el.style.borderColor = "#D2D2D7";
        el.style.boxShadow   = "0 1px 3px rgba(0,0,0,0.04)";
        const img = el.querySelector("img");
        if (img) img.style.filter = "grayscale(1) opacity(0.6)";
      }}
    >
      <Image
        src={`/logos/${file}`}
        alt={name}
        width={130}
        height={50}
        style={{ objectFit: "contain", filter: "grayscale(1) opacity(0.6)", transition: "filter 0.2s ease" }}
        draggable={false}
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Logos() {
  const noMotion  = useReducedMotion() === true;
  const trackRef  = useRef<HTMLDivElement>(null);

  const pauseMarquee  = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resumeMarquee = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "100px", background: "#FFFFFF" }}>
      {/* Bottom fade — smooths transition into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.03))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Keyframe + hover-pause via class selector */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Label ── */}
      <p
        style={{
          textAlign:      "center",
          fontSize:       "0.67rem",
          fontWeight:     600,
          letterSpacing:  "0.15em",
          textTransform:  "uppercase",
          color:          "var(--accent)",
          marginBottom:   "16px",
        }}
      >
        Trusted By Industry Leaders
      </p>

      {/* ── Heading ── */}
      <h2
        style={{
          textAlign:      "center",
          fontSize:       "clamp(2rem, 4vw, 3rem)",
          fontWeight:     700,
          color:          "var(--text-primary)",
          letterSpacing:  "-0.025em",
          lineHeight:     1.1,
          marginBottom:   "64px",
        }}
      >
        Our Clients
      </h2>

      {noMotion ? (
        /* ── Reduced-motion: static 4-per-row wrap ── */
        <div className="container px-5 md:px-8">
          <div
            style={{
              display:        "flex",
              flexWrap:       "wrap",
              justifyContent: "center",
              gap:            "24px",
            }}
          >
            {LOGOS.map((logo) => (
              <LogoPill key={logo.file} name={logo.name} file={logo.file} />
            ))}
          </div>
        </div>
      ) : (
        /* ── Animated marquee with parallax ── */
        <ParallaxSection speed={0.2}>
          <div
            style={{ overflow: "hidden" }}
            onMouseEnter={pauseMarquee}
            onMouseLeave={resumeMarquee}
          >
            <div
              ref={trackRef}
              className="marquee-track"
              style={{
                display:    "flex",
                width:      "max-content",
                willChange: "transform",
              }}
              aria-hidden="true"
            >
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <LogoPill
                  key={`${logo.file}-${i}`}
                  name={logo.name}
                  file={logo.file}
                />
              ))}
            </div>
          </div>
        </ParallaxSection>
      )}
    </section>
  );
}
