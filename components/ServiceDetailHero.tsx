"use client";

import { motion, useReducedMotion } from "motion/react";

interface Props {
  title:   string;
  tagline: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ServiceDetailHero({ title, tagline }: Props) {
  const noMotion = useReducedMotion() === true;

  return (
    <section
      style={{
        background:    "linear-gradient(135deg, #FBF3E7 0%, rgba(194,118,26,0.06) 100%)",
        paddingTop:    "160px",
        paddingBottom: "80px",
        borderBottom:  "1px solid rgba(20,33,61,0.12)",
      }}
    >
      <div className="container px-5 md:px-8">

        {/* Breadcrumb */}
        <motion.p
          initial={noMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          style={{ color: "#94A0B8", fontSize: "0.8rem", marginBottom: "20px" }}
        >
          <a
            href="/whatwedo"
            style={{ color: "#94A0B8", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C2761A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94A0B8")}
          >
            What We Do
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{title}</span>
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={noMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          style={{
            fontSize:      "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight:    800,
            color:         "#14213D",
            marginBottom:  "20px",
            lineHeight:    1.1,
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={noMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease }}
          style={{
            fontSize:  "1.15rem",
            color:     "#4A5568",
            maxWidth:  "700px",
            lineHeight: 1.78,
          }}
        >
          {tagline}
        </motion.p>

      </div>
    </section>
  );
}
