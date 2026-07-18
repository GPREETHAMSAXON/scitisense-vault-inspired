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
        background:     "rgba(22,27,34,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border:         "1px solid #30363D",
        borderRadius:   "12px",
        padding:        "16px 28px",
        marginRight:    "32px",
        flexShrink:     0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        minWidth:       "120px",
        transition:     "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
        cursor:         "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform  = "translateY(-5px) scale(1.03)";
        el.style.borderColor = "rgba(163,113,247,0.3)";
        el.style.background  = "rgba(163,113,247,0.1)";
        const img = el.querySelector("img");
        if (img) img.style.filter = "none";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform  = "translateY(0) scale(1)";
        el.style.borderColor = "#30363D";
        el.style.background  = "rgba(22,27,34,0.6)";
        const img = el.querySelector("img");
        if (img) img.style.filter = "brightness(0) invert(1)";
      }}
    >
      <Image
        src={`/logos/${file}`}
        alt={name}
        width={130}
        height={50}
        style={{ objectFit: "contain", filter: "brightness(0) invert(1)", transition: "filter 0.2s ease" }}
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
    <section className="relative overflow-hidden" style={{ paddingTop: "100px", paddingBottom: "100px", background: "transparent" }}>
      {/* Bottom fade — smooths transition into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, rgba(13,17,23,0.3))",
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
