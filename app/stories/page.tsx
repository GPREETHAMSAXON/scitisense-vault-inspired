"use client"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function AnnouncementsPage() {
  return (
    <div style={{
      background: "#FAFAFA",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Coming Soon Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "80px",
        paddingInline: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Grid background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,113,227,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,113,227,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }} />

        {/* Radial glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(0,113,227,0.06), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Tag pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(0,113,227,0.2)",
            background: "rgba(0,113,227,0.06)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#0071E3",
            marginBottom: "32px",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#0071E3",
              animation: "pulse 2s ease-in-out infinite",
            }} />
            Announcements
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#1D1D1F",
            marginBottom: "24px",
          }}>
            Coming{" "}
            <span style={{
              background: "linear-gradient(135deg, #0071E3, #34AADC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Soon
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "1.1rem",
            color: "#6E6E73",
            maxWidth: "480px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            We are working on something exciting.
            Stay tuned for the latest news, research
            updates, and announcements from
            Scitisense Futurize.
          </p>

          {/* Divider dots */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "48px",
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 1 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: i === 1 ? "#0071E3" : "#D2D2D7",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Back to home link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              background: "#0071E3",
              color: "#FFFFFF",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "#0077ED"
              ;(e.currentTarget as HTMLElement).style.transform = "scale(1.02)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "#0071E3"
              ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
