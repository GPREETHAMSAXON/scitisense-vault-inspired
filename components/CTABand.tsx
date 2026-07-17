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
        background: "#080808",
        padding: "100px 24px",
      }}
    >
      {/* Large teal radial glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          background:    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,229,192,0.10) 0%, transparent 70%)",
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
          Ready to Transform
          <br className="hidden sm:block" />
          {" "}<span style={{ color: "#00E5C0" }}>Your IT Operations?</span>
        </h2>

        {/* Subtext */}
        <p
          className="mb-10"
          style={{
            fontSize:   "clamp(1rem, 1.8vw, 1.15rem)",
            color:      "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth:   "560px",
            margin:     "0 auto 40px",
          }}
        >
          Let&apos;s build something that scales — together.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">

          {/* Teal filled primary */}
          <motion.a
            href="/contact"
            className="flex items-center gap-2 font-bold"
            style={{
              background:   "#00E5C0",
              color:        "#080808",
              fontWeight:   700,
              padding:      "14px 32px",
              borderRadius: "999px",
              fontSize:     "0.95rem",
              boxShadow:    "0 0 40px rgba(0,229,192,0.3)",
            }}
            whileHover={noMotion ? {} : { scale: 1.05, boxShadow: "0 0 56px rgba(0,229,192,0.5)" }}
            whileTap={noMotion ? {} : { scale: 0.97 }}
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
              border:       "1px solid rgba(255,255,255,0.2)",
              padding:      "14px 32px",
              borderRadius: "999px",
              fontSize:     "0.95rem",
            }}
            whileHover={
              noMotion
                ? {}
                : { scale: 1.04, borderColor: "#00E5C0", color: "#00E5C0" }
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
