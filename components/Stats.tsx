"use client";

import { useScrambleCount } from "@/hooks/useScrambleCount";
import { useInView } from "@/hooks/useInView";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 18, suffix: "+", label: "Projects"   },
  { value: 5,  suffix: "+", label: "Clients"    },
  { value: 2,  suffix: "+", label: "Researchers" },
  { value: 4,  suffix: "+", label: "Workshops"  },
  { value: 18, suffix: "+", label: "Industries" },
  { value: 7,  suffix: "",  label: "Domains"    },
] as const;

function StatCell({ value, suffix, label, index, inView }: {
  value: number; suffix: string; label: string; index: number; inView: boolean;
}) {
  const display = useScrambleCount(value, inView, false, 1600 + index * 150);
  return (
    <div
      className="animate-on-scroll"
      style={{
        textAlign: "center",
        padding: "28px 20px",
        flex: "1 1 0",
        minWidth: 110,
        borderRight: index < STATS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <div className="number-accent" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.75rem)", fontWeight: 800, color: "#0071E3", letterSpacing: "-0.03em" }}>
        {display}{suffix}
      </div>
      <div style={{ fontSize: 13, color: "#6E6E73", marginTop: 6, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Stats() {
  const [ref, inView] = useInView<HTMLElement>(0.3);

  return (
    <section
      ref={ref}
      id="stats"
      className="relative overflow-hidden"
      style={{ background: "#F5F5F7", padding: "64px 24px" }}
    >
      <div
        className="container"
        style={{ maxWidth: 1100, display: "flex", overflowX: "auto" }}
      >
        {STATS.map((stat, i) => (
          <StatCell key={stat.label} {...stat} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
