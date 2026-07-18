"use client";

import { motion, useReducedMotion } from "motion/react";
import { Settings2, Users, Headphones, Lock, Activity, Package, Shield, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DIVE_ICONS: LucideIcon[] = [Settings2, Users, Headphones, Lock, Activity, Package, Shield, Zap];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface DiveSection {
  heading: string;
  body:    string;
}

interface Props {
  sections: DiveSection[];
}

export default function ServiceDeepDive({ sections }: Props) {
  const noMotion = useReducedMotion() === true;

  return (
    <section className="relative" style={{ backgroundColor: "transparent", padding: "80px 24px" }}>
      <div className="container">
        <div className="flex flex-col gap-5">
          {sections.map((sec, i) => {
            const Icon   = DIVE_ICONS[i % DIVE_ICONS.length];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={sec.heading}
                initial={noMotion ? false : { opacity: 0, y: 32 }}
                whileInView={noMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
                className="card-3d"
                style={{
                  background:   "rgba(22,27,34,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border:       "1px solid #30363D",
                  padding:      "36px 40px",
                }}
              >
                {/* Alternating flex direction on md+ */}
                <div className={`flex flex-col gap-8 items-start md:items-center md:flex-row${isEven ? "" : " md:flex-row-reverse"}`}>

                  {/* Heading side */}
                  <div className="flex items-start gap-4 md:w-2/5 shrink-0">
                    <div
                      style={{
                        width:          "48px",
                        height:         "48px",
                        background:     "rgba(0,229,192,0.10)",
                        borderRadius:   "12px",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        color:          "#00E5C0",
                        flexShrink:     0,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </div>
                    <div>
                      <span
                        style={{
                          display:       "block",
                          color:         "#00E5C0",
                          fontSize:      "0.68rem",
                          fontWeight:    700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          marginBottom:  "6px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        style={{
                          fontSize:  "1.1rem",
                          fontWeight: 700,
                          color:     "#E6EDF3",
                          lineHeight: 1.3,
                        }}
                      >
                        {sec.heading}
                      </h3>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="hidden md:block self-stretch"
                    style={{ width: "1px", background: "#30363D", flexShrink: 0 }}
                  />

                  {/* Body side */}
                  <div className="md:flex-1">
                    <p style={{ color: "#8B949E", fontSize: "0.95rem", lineHeight: 1.82 }}>
                      {sec.body}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
