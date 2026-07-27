"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, FlaskConical, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const SERVICE_OPTIONS = [
  "Computer Vision",
  "IoT & Wearable",
  "ML & DL",
  "NLP & LLM",
  "Generative AI",
  "Agentic AI",
  "Medical IT",
  "Training & Consultancy",
  "General",
];

const FIELD_STYLE: React.CSSProperties = {
  background:   "#F5F5F7",
  border:       "1px solid #D2D2D7",
  borderRadius: 12,
  padding:      "14px 16px",
  fontSize:     14,
  color:        "#1D1D1F",
  width:        "100%",
  outline:      "none",
  transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
};

const LABEL_STYLE: React.CSSProperties = {
  display:       "block",
  fontSize:      12,
  fontWeight:    600,
  color:         "#6E6E73",
  marginBottom:  6,
};

function focusField(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "#0071E3";
  e.target.style.boxShadow = "0 0 0 3px rgba(0,113,227,0.12)";
}
function blurField(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "#D2D2D7";
  e.target.style.boxShadow = "none";
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <main className="relative" style={{ backgroundColor: "#FAFAFA" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative text-center overflow-hidden grid-bg-light"
          style={{
            paddingTop: 160,
            paddingBottom: 80,
            background: "linear-gradient(180deg, #F5F5F7 0%, #FAFAFA 60%, #FFFFFF 100%)",
          }}
        >
          <div className="beam" style={{ left: "20%", top: 0 }} aria-hidden="true" />
          <div className="beam beam-delay-1" style={{ left: "50%", top: 0 }} aria-hidden="true" />
          <div className="beam beam-delay-2" style={{ left: "80%", top: 0 }} aria-hidden="true" />

          <div className="container px-5 md:px-8" style={{ position: "relative", zIndex: 1 }}>
            <span className="tag-pill-light" style={{ marginBottom: 20, display: "inline-flex" }}>
              Contact Us
            </span>
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0A0A0A",
                lineHeight: 1.08,
                marginBottom: 20,
              }}
            >
              Start a{" "}
              <span className="text-gradient-teal">Research Conversation</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.7vw, 1.05rem)",
                color: "#6E6E73",
                lineHeight: 1.78,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Ready to start your transformation? Drop us a message and a consultant will
              respond within one business day.
            </p>
          </div>
        </section>

        {/* ── Form + Info ───────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 80, paddingBottom: 120 }}>
          <div className="container px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* Form — 60% */}
              <div className="lg:col-span-3">
                <div className="service-card-light" style={{ padding: 32 }}>
                  {sent ? (
                    <div className="text-center py-12">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "rgba(0,113,227,0.1)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" stroke="#0071E3" strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "#0A0A0A" }}>
                        Message Sent!
                      </h3>
                      <p className="text-sm" style={{ color: "#6E6E73" }}>
                        We&apos;ll be in touch within one business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <label htmlFor="name" style={LABEL_STYLE}>Full Name *</label>
                        <input
                          id="name" name="name" type="text" required
                          placeholder="Jane Smith"
                          value={form.name} onChange={handleChange}
                          style={FIELD_STYLE} onFocus={focusField} onBlur={blurField}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" style={LABEL_STYLE}>Contact Number *</label>
                        <input
                          id="phone" name="phone" type="tel" required
                          placeholder="+91 8500631655"
                          value={form.phone} onChange={handleChange}
                          style={FIELD_STYLE} onFocus={focusField} onBlur={blurField}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" style={LABEL_STYLE}>Email Address *</label>
                        <input
                          id="email" name="email" type="email" required
                          placeholder="jane@company.com"
                          value={form.email} onChange={handleChange}
                          style={FIELD_STYLE} onFocus={focusField} onBlur={blurField}
                        />
                      </div>

                      <div>
                        <label htmlFor="service" style={LABEL_STYLE}>Service Interest *</label>
                        <select
                          id="service" name="service" required
                          value={form.service} onChange={handleChange}
                          style={{ ...FIELD_STYLE, appearance: "auto" }}
                          onFocus={focusField} onBlur={blurField}
                        >
                          <option value="" disabled>Select a service</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" style={LABEL_STYLE}>Message *</label>
                        <textarea
                          id="message" name="message" required rows={5}
                          placeholder="Tell us about your project or challenge…"
                          value={form.message} onChange={handleChange}
                          style={{ ...FIELD_STYLE, resize: "vertical" }}
                          onFocus={focusField} onBlur={blurField}
                        />
                      </div>

                      <button type="submit" className="btn-primary-light flex items-center justify-center gap-2 w-full" style={{ padding: "14px 0", fontSize: 14 }}>
                        Send Message
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Info — 40% */}
              <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Direct contact */}
                <div className="service-card-light" style={{ padding: "28px 24px" }}>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: "#0071E3" }}>
                    Direct Contact
                  </p>
                  <div className="flex flex-col" style={{ gap: 20 }}>
                    <a href="mailto:info@scitisensefuturize.in" className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,113,227,0.1)", color: "#0071E3" }}>
                        <Mail size={14} />
                      </span>
                      <span>
                        <span className="block text-xs font-medium mb-0.5" style={{ color: "#86868B" }}>Email</span>
                        <span className="text-sm" style={{ color: "#6E6E73" }}>info@scitisensefuturize.in</span>
                      </span>
                    </a>
                    <a href="tel:+918500631655" className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,113,227,0.1)", color: "#0071E3" }}>
                        <Phone size={14} />
                      </span>
                      <span>
                        <span className="block text-xs font-medium mb-0.5" style={{ color: "#86868B" }}>Phone</span>
                        <span className="text-sm" style={{ color: "#6E6E73" }}>+91 8500631655</span>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Office */}
                <div className="service-card-light" style={{ padding: "28px 24px" }}>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: "#0071E3" }}>
                    Our Office
                  </p>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,113,227,0.1)", color: "#0071E3" }}>
                      <MapPin size={14} />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                      House No 65-6-131, New Gajuwaka MH Colony, Visakhapatnam, Andhra Pradesh 530026
                    </span>
                  </div>
                </div>

                {/* Research collaboration */}
                <div className="service-card-light" style={{ padding: "28px 24px" }}>
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-5" style={{ color: "#0071E3" }}>
                    Research Collaboration
                  </p>
                  <div className="flex items-start gap-3" style={{ marginBottom: 16 }}>
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(0,113,227,0.1)", color: "#0071E3" }}>
                      <FlaskConical size={14} />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                      We partner with universities, research labs, and enterprises for joint
                      R&amp;D projects and technology transfer.
                    </span>
                  </div>
                  <a
                    href="mailto:info@scitisensefuturize.in?subject=Research%20Proposal"
                    className="inline-flex items-center gap-1.5"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0071E3" }}
                  >
                    Submit Research Proposal <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
