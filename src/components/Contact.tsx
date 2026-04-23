"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("geetish.mahato.19@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ background: "#09090b", padding: "100px 24px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Contact</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        {/* Main contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "#111113",
            border: "1px solid #1c1c1e",
            borderRadius: 24,
            padding: "60px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 11, color: "#34d399",
              border: "1px solid rgba(52,211,153,0.2)",
              background: "rgba(52,211,153,0.06)",
              padding: "4px 14px", borderRadius: 999, marginBottom: 24,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
              Available for opportunities
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 700, letterSpacing: "-1.5px",
              color: "#fafafa", marginBottom: 16, lineHeight: 1.1,
            }}>
              Let's build something{" "}
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                together
              </span>
            </h2>

            <p style={{ color: "#52525b", fontSize: 15, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
              I'm actively looking for internships and full-time roles in AI/ML, backend development, or mobile engineering. Open to remote and on-site opportunities.
            </p>

            {/* Email copy button */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <button
                onClick={copyEmail}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 12,
                  background: copied ? "rgba(52,211,153,0.1)" : "#7c3aed",
                  border: copied ? "1px solid rgba(52,211,153,0.3)" : "none",
                  color: copied ? "#34d399" : "#fff",
                  fontSize: 14, fontWeight: 500, cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                {copied ? "✓ Copied!" : "📋 geetish.mahato.19@gmail.com"}
              </button>

              
              <a
                href="https://linkedin.com/in/geetish-mahato"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 12,
                  border: "1px solid #27272a", color: "#a1a1aa",
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(103,232,249,0.4)"; e.currentTarget.style.color = "#67e8f9"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                LinkedIn ↗
              </a>

              <a
                href="https://github.com/GeetishM"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 12,
                  border: "1px solid #27272a", color: "#a1a1aa",
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = "#a78bfa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                GitHub ↗
              </a>
            </div>

            {/* Quick info row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              {[
                { label: "Location", value: "Bhilai, India" },
                { label: "Phone", value: "+91 7587027511" },
                { label: "Status", value: "Final Year · 2026" },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#3f3f46", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#71717a" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "24px 0",
            borderTop: "1px solid #1c1c1e",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "#3f3f46" }}>
            © 2026 Geetish Mahato · Built with Next.js & Framer Motion
          </span>

          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "GitHub", href: "https://github.com/GeetishM" },
              { label: "LinkedIn", href: "https://linkedin.com/in/geetish-mahato" },
              { label: "Email", href: "mailto:geetish.mahato.19@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12, color: "#3f3f46", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
                onMouseLeave={e => (e.currentTarget.style.color = "#3f3f46")}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}