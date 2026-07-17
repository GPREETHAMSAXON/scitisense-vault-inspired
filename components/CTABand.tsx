"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTABand() {
  const noMotion = useReducedMotion() === true;

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #14213D 0%, #2A3F66 100%)",
        padding: "100px 24px",
      }}
    >
      {/* Centre ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "-40%",
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "700px",
          height:        "700px",
          borderRadius:  "50%",
          background:    "radial-gradient(circle, rgba(194,118,26,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Top-right accent glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "-20%",
          right:         "-10%",
          width:         "500px",
          height:        "500px",
          borderRadius:  "50%",
          background:    "radial-gradient(circle, rgba(194,118,26,0.15) 0%, transparent 60%)",
          filter:        "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position:         "absolute",
          inset:            0,
          pointerEvents:    "none",
          backgroundImage:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "200px 200px",
          opacity:          0.02,
          mixBlendMode:     "overlay",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative container text-center flex flex-col items-center"
        initial={noMotion ? false : { opacity: 0, y: 40 }}
        whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
      >
        {/* Heading */}
        <h2
          className="font-bold tracking-tight mb-5"
          style={{
            fontSize:   "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.08,
            color:      "#FFFFFF",
          }}
        >
          Ready to Transform Your
          <br className="hidden sm:block" />
          {" "}IT Operations?
        </h2>

        {/* Subtext */}
        <p
          className="mb-10"
          style={{
            fontSize:   "clamp(1rem, 1.8vw, 1.15rem)",
            color:      "rgba(255,255,255,0.9)",
            lineHeight: 1.7,
            maxWidth:   "560px",
            margin:     "0 auto 40px",
          }}
        >
          Let&apos;s build something that scales — together.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">

          {/* White filled */}
          <motion.a
            href="/contact"
            className="flex items-center gap-2 font-bold"
            style={{
              background:   "#FFFFFF",
              color:        "#C2761A",
              fontWeight:   700,
              padding:      "14px 32px",
              borderRadius: "999px",
              fontSize:     "0.95rem",
              boxShadow:    "0 2px 0 rgba(140,80,10,0.20), 0 4px 12px rgba(0,0,0,0.12)",
            }}
            whileHover={noMotion ? {} : { scale: 1.04, boxShadow: "0 2px 0 rgba(140,80,10,0.20), 0 8px 24px rgba(0,0,0,0.18)" }}
            whileTap={noMotion ? {} : { scale: 0.97, y: 1, boxShadow: "0 1px 0 rgba(140,80,10,0.20)" } as Parameters<typeof motion.a>[0]["whileTap"]}
            transition={{ duration: 0.2, ease }}
          >
            Book a Free Consult
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>

          {/* Ghost */}
          <motion.a
            href="/stories"
            className="flex items-center gap-2 font-semibold"
            style={{
              background:   "transparent",
              color:        "#FFFFFF",
              border:       "2px solid rgba(255,255,255,0.6)",
              padding:      "14px 32px",
              borderRadius: "999px",
              fontSize:     "0.95rem",
            }}
            whileHover={
              noMotion
                ? {}
                : { scale: 1.04, backgroundColor: "rgba(255,255,255,0.10)", borderColor: "#ffffff" }
            }
            whileTap={noMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2, ease }}
          >
            View Success Stories
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>

        </div>
      </motion.div>
    </section>
  );
}
