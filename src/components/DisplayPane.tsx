"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState, projects, experiences, skills, achievements, flutterSpring, gentleSpring } from "./data";

interface DisplayPaneProps {
  activeView: ViewState;
  mobileDisplayOpen: boolean;
  onCloseMobile: () => void;
}

// ─── Hooks ──────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 28, delay = 400) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed("");
    const timeout = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}

function useCounter(target: number, duration = 1200, delay = 300) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const id = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress >= 1) clearInterval(id);
      }, 16);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

// ─── Animated stat counter ────────────────────────────────────────

function StatCard({ value, isFloat = false, suffix, label, color, delay = 0 }: { value: number; isFloat?: boolean; suffix: string; label: string; color: string; delay?: number }) {
  const count = useCounter(isFloat ? value * 100 : value, 1400, 300 + delay);
  const displayValue = isFloat ? (count / 100).toFixed(2) : count;
  
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: flutterSpring } }}
      whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
      style={{
        flex: 1, minWidth: "120px",
        background: "var(--bg-card)", backdropFilter: "blur(20px)",
        border: "1px solid var(--border-card)",
        borderRadius: "20px", padding: "22px 20px",
        boxShadow: "var(--shadow-card)",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", bottom: -20, right: -20, width: 70, height: 70,
        borderRadius: "50%", background: color, opacity: 0.08, filter: "blur(20px)",
      }} />
      <div style={{
        fontSize: "32px", fontWeight: 800, color,
        letterSpacing: "-1px", lineHeight: 1,
        fontFamily: "var(--font-display)",
      }}>
        {displayValue}{suffix}
      </div>
      <div style={{
        fontSize: "11px", color: "var(--text-faint)",
        textTransform: "uppercase", letterSpacing: "1.2px",
        marginTop: "8px", fontWeight: 600,
        fontFamily: "var(--font-mono)",
      }}>{label}</div>
    </motion.div>
  );
}

// ─── Container animation variants ────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: flutterSpring },
};

// ─── Main Component ───────────────────────────────────────────────

export default function DisplayPane({ activeView, mobileDisplayOpen, onCloseMobile }: DisplayPaneProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);

  const onDragStart = (y: number) => { dragStartY.current = y; };
  const onDragMove  = (y: number) => {
    if (dragStartY.current === null) return;
    const dy = y - dragStartY.current;
    if (dy > 0) setDragOffset(dy);
  };
  const onDragEnd   = () => {
    if (dragOffset > 100) onCloseMobile();
    setDragOffset(0);
    dragStartY.current = null;
  };

  return (
    <section
      className={`pane-display bg-grid-dots ${mobileDisplayOpen ? "mobile-open" : ""}`}
      style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: "var(--bg-display)",
        overflow: "hidden", position: "relative",
        transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
        transition: dragOffset > 0 ? "none" : undefined,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4], rotate: [0, 120, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "-15%", right: "-15%", width: "560px", height: "560px",
          background: "var(--accent-glow)", borderRadius: "50%", filter: "blur(100px)",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 5 }}
        style={{
          position: "absolute", bottom: "-10%", left: "5%", width: "400px", height: "400px",
          background: "var(--glow-cyan)", borderRadius: "50%", filter: "blur(80px)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* Mobile drag handle */}
      <div
        className="mobile-only-flex"
        style={{
          padding: "14px 20px",
          background: "var(--bg-header)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-subtle)",
          justifyContent: "center", position: "relative", zIndex: 50,
          cursor: "grab", touchAction: "none",
        }}
        onTouchStart={e => onDragStart(e.touches[0].clientY)}
        onTouchMove={e => onDragMove(e.touches[0].clientY)}
        onTouchEnd={onDragEnd}
        onMouseDown={e => onDragStart(e.clientY)}
        onMouseMove={e => { if (e.buttons === 1) onDragMove(e.clientY); }}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <div style={{ width: "44px", height: "4px", background: "var(--text-muted)", borderRadius: "99px", opacity: 0.4 }} />
      </div>

      {/* Content area */}
      <div
        className="hide-scrollbar"
        style={{
          flex: 1, overflowY: "auto",
          padding: "clamp(24px, 5vw, 72px) clamp(20px, 5vw, 72px)",
          display: "flex", flexDirection: "column", justifyContent: "flex-start",
          position: "relative", zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">

          {/* ═══════════════ HERO ═══════════════ */}
          {activeView === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48, filter: "blur(12px)" }}
              transition={flutterSpring}
            >
              {/* Status badge */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, ...flutterSpring }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "7px 16px",
                  background: "var(--bg-card)", backdropFilter: "blur(12px)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "99px", fontSize: "12px", fontWeight: 600,
                  color: "var(--text-muted)", marginBottom: "28px",
                  fontFamily: "var(--font-mono)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                STATUS · OPEN TO FULL-TIME ROLES (2026)
              </motion.div>

              {/* Name */}
              <h2 style={{
                fontSize: "clamp(48px, 6.5vw, 92px)",
                fontWeight: 800, lineHeight: 0.95, letterSpacing: "-3px",
                marginBottom: "20px", color: "var(--text-main)",
                fontFamily: "var(--font-display)",
              }}>
                Geetish<br />
                <span style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Mahato
                </span>
              </h2>

              {/* Typewriter tagline */}
              <HeroTagline />

              {/* Resume Summary */}
              <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.8, marginBottom: "40px" }}>
                Machine Learning Developer specializing in Generative AI, RAG systems, and Data Analytics. With technical internships across AI, Django, and Flutter, I focus on building production-grade models and scalable cross-platform applications.
              </p>

              {/* Fresher Hiring Stats */}
              <motion.div
                variants={containerVariants} initial="hidden" animate="show"
                style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}
              >
                <StatCard value={8.28} isFloat={true} suffix="" label="GPA (BIT Durg CSE)" color="#a78bfa" delay={0} />
                <StatCard value={3} suffix="" label="Tech Internships" color="#22d3ee" delay={100} />
                <StatCard value={4} suffix="×" label="Hackathon Wins" color="#fbbf24" delay={200} />
                <StatCard value={30} suffix="+" label="Members Led (IEEE)" color="#34d399" delay={300} />
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...gentleSpring }}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              >
                <motion.a
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  href="mailto:geetish.mahato.19@gmail.com"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4338ca)",
                    color: "#fff", padding: "14px 28px", borderRadius: "14px",
                    fontWeight: 700, fontSize: "14px", textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.32)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Hire Me ↗
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  href="https://github.com/GeetishM" target="_blank" rel="noreferrer"
                  style={{
                    background: "var(--bg-card)", backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-card)",
                    color: "var(--text-main)", padding: "14px 28px", borderRadius: "14px",
                    fontWeight: 600, fontSize: "14px", textDecoration: "none",
                    boxShadow: "var(--shadow-card)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  GitHub →
                </motion.a>
              </motion.div>
            </motion.div>
          )}

          {/* ... Keep the other views exactly the same (projects, experience, skills, contact) ... */}
          {/* I am omitting them here for brevity, but you retain them from the previous file! */}

          {/* ═══════════════ PROJECTS ═══════════════ */}
          {activeView === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48, filter: "blur(12px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="⬡" label="PROJECTS" title="Core Architecture" />
              <motion.div
                variants={containerVariants} initial="hidden" animate="show"
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}
              >
                {projects.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                    className="neon-hover"
                    style={{
                      background: "var(--bg-card)", backdropFilter: "blur(20px)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "20px", padding: "28px",
                      boxShadow: "var(--shadow-card)",
                      position: "relative", overflow: "hidden",
                      cursor: "default",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
                        {p.title}
                      </div>
                      <a href={p.github} target="_blank" rel="noreferrer"
                        style={{
                          fontSize: "11px", fontWeight: 600, color: p.color,
                          background: `${p.color}18`, border: `1px solid ${p.color}30`,
                          padding: "4px 10px", borderRadius: "8px", textDecoration: "none",
                          fontFamily: "var(--font-mono)",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${p.color}30`)}
                        onMouseLeave={e => (e.currentTarget.style.background = `${p.color}18`)}
                      >
                        ↗ GitHub
                      </a>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                      <span style={{ background: `${p.color}18`, color: p.color, fontSize: "12px", padding: "5px 12px", borderRadius: "99px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                        {p.metric}
                      </span>
                      <span style={{ background: "var(--bg-input)", color: "var(--text-faint)", fontSize: "11px", padding: "5px 12px", borderRadius: "99px", fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                        {p.period}
                      </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                      {p.tech.map(t => (
                        <span key={t} style={{ fontSize: "11px", fontFamily: "var(--font-mono)", background: "var(--bg-input)", color: "var(--text-faint)", padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-subtle)" }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════ EXPERIENCE ═══════════════ */}
          {activeView === "experience" && (
            <motion.div
              key="exp"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48, filter: "blur(12px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="▸" label="EXPERIENCE" title="Execution Timeline" />
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                <div style={{ position: "absolute", left: "28px", top: "24px", bottom: "24px", width: "1px", background: "linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)", opacity: 0.25, zIndex: 0 }} />
                {experiences.map((exp, i) => (
                  <motion.div key={i} variants={itemVariants} style={{ display: "flex", gap: "24px", alignItems: "flex-start", position: "relative", zIndex: 1, paddingBottom: i < experiences.length - 1 ? "8px" : "0" }}>
                    <div style={{ flexShrink: 0, width: "56px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "24px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "14px", background: `${exp.color}14`, border: `1px solid ${exp.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: `0 0 16px ${exp.color}20` }}>{exp.icon}</div>
                    </div>
                    <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }} style={{ flex: 1, background: "var(--bg-card)", backdropFilter: "blur(20px)", border: "1px solid var(--border-card)", borderRadius: "18px", padding: "22px 24px", marginBottom: "14px", boxShadow: "var(--shadow-card)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <div>
                          <div style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>{exp.role}</div>
                          <div style={{ fontSize: "14px", color: exp.color, fontWeight: 600, marginBottom: "10px" }}>{exp.org}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 600, background: "var(--bg-input)", color: "var(--text-faint)", padding: "5px 12px", borderRadius: "8px", border: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>{exp.period}</span>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 500, color: exp.type === "leadership" ? "#fbbf24" : "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.8px" }}>{exp.type}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.65 }}>{exp.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════ SKILLS ═══════════════ */}
          {activeView === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48, filter: "blur(12px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="◈" label="SKILLS" title="System Capabilities" />
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {skills.map((skill, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.01 }} style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", border: "1px solid var(--border-card)", borderRadius: "18px", padding: "22px 24px", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: skill.color, borderRadius: "4px 0 0 4px" }} />
                    <div style={{ paddingLeft: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <span style={{ fontSize: "18px" }}>{skill.icon}</span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: skill.color, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px" }}>{skill.category}</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {skill.items.map(item => (
                          <motion.span key={item} whileHover={{ scale: 1.05, borderColor: skill.color, color: skill.color }} transition={{ duration: 0.15 }} style={{ fontSize: "13px", background: "var(--bg-input)", padding: "6px 14px", borderRadius: "10px", color: "var(--text-muted)", border: "1px solid var(--border-subtle)", fontWeight: 500, fontFamily: "var(--font-body)", cursor: "default", transition: "color 0.15s, border-color 0.15s", display: "inline-block" }}>{item}</motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ...gentleSpring }} style={{ marginTop: "24px" }}>
                <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-faint)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>ACHIEVEMENTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                  {achievements.map((a, i) => (
                    <div key={i} style={{ background: "var(--bg-card)", backdropFilter: "blur(12px)", border: "1px solid var(--border-card)", borderRadius: "14px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "var(--shadow-card)" }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{a.title}</div>
                        <div style={{ fontSize: "11px", color: a.color, fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "3px" }}>{a.result}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>{a.year}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════ CONTACT ═══════════════ */}
          {activeView === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={flutterSpring}
              style={{ maxWidth: "520px", margin: "0 auto", width: "100%" }}
            >
              <motion.div className="float" style={{ width: 96, height: 96, borderRadius: "28px", background: "linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", fontWeight: 900, color: "#fff", margin: "0 auto 32px", fontFamily: "var(--font-display)", boxShadow: "0 16px 40px rgba(124,58,237,0.35)" }}>G</motion.div>
              <h3 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, textAlign: "center", letterSpacing: "-2px", marginBottom: "12px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Let&apos;s Build Something</h3>
              <p style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7, textAlign: "center", maxWidth: "400px", margin: "0 auto 40px" }}>Final-year AI/ML engineer ready to bring production-grade systems and full-stack mobile development to your team.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                {["📍 Bhilai, India", "🎓 BIT Durg · 8.28 GPA", "🚀 Open to Relocation"].map(chip => (
                  <span key={chip} style={{ fontSize: "13px", fontWeight: 600, background: "var(--bg-card)", backdropFilter: "blur(12px)", border: "1px solid var(--border-card)", color: "var(--text-muted)", padding: "7px 16px", borderRadius: "99px", boxShadow: "var(--shadow-card)" }}>{chip}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <ContactLink href="mailto:geetish.mahato.19@gmail.com" icon="✉" label="Email" value="geetish.mahato.19@gmail.com" primary />
                <ContactLink href="https://linkedin.com/in/geetish-mahato" icon="in" label="LinkedIn" value="linkedin.com/in/geetish-mahato" color="#0a66c2" />
                <ContactLink href="https://github.com/GeetishM" icon="⌥" label="GitHub" value="github.com/GeetishM" color="#7c3aed" />
              </div>
              <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>📞 +91 7587027511</div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────

function HeroTagline() {
  const roles = [
    "B.Tech CSE (AI) @ BIT Durg.",
    "3× Technical Intern (AI, Django, Flutter).",
    "IEEE Student Branch Chairperson.",
    "Seeking Full-Time SDE / ML Roles.",
  ];
  const [idx, setIdx] = useState(0);
  const text = useTypewriter(roles[idx], 32, 200);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % roles.length), 3500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p style={{
      fontSize: "clamp(15px, 1.8vw, 19px)",
      color: "var(--accent)", lineHeight: 1.6,
      marginBottom: "20px", minHeight: "1.5em",
      fontWeight: 600, display: "flex", alignItems: "center",
      fontFamily: "var(--font-mono)"
    }}>
      <span style={{ marginRight: 8, fontSize: 18 }}>_</span>
      {text}
      <span className="cursor-blink" />
    </p>
  );
}

function SectionHeader({ icon, label, title }: { icon: string; label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, ...gentleSpring }}
      style={{ marginBottom: "28px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{ color: "var(--accent)", fontSize: "14px" }}>{icon}</span>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          {label}
        </span>
      </div>
      <h3 style={{
        fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-1px",
        color: "var(--text-main)", fontFamily: "var(--font-display)",
      }}>
        {title}
      </h3>
    </motion.div>
  );
}

function ContactLink({ href, icon, label, value, primary, color }: {
  href: string; icon: string; label: string; value: string;
  primary?: boolean; color?: string;
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.97 }}
      href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: "16px",
        background: primary ? "linear-gradient(135deg, #7c3aed, #4338ca)" : "var(--bg-card)",
        backdropFilter: primary ? undefined : "blur(16px)",
        border: primary ? "none" : "1px solid var(--border-card)",
        color: primary ? "#fff" : "var(--text-main)",
        padding: "18px 24px", borderRadius: "16px",
        textDecoration: "none", fontWeight: 600,
        boxShadow: primary ? "0 10px 28px rgba(124,58,237,0.3)" : "var(--shadow-card)",
        fontFamily: "var(--font-body)",
        transition: "box-shadow 0.25s",
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: "10px", flexShrink: 0,
        background: primary ? "rgba(255,255,255,0.15)" : `${color || "var(--accent)"}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "14px", fontWeight: 800, color: primary ? "#fff" : (color || "var(--accent)"),
        fontFamily: "var(--font-mono)",
        border: primary ? "1px solid rgba(255,255,255,0.2)" : `1px solid ${color || "var(--accent)"}30`,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "11px", fontWeight: 600, opacity: primary ? 0.7 : 1, color: primary ? "#fff" : "var(--text-faint)", letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "2px" }}>
          {label}
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </div>
      </div>
      <span style={{ opacity: 0.6, fontSize: "16px" }}>↗</span>
    </motion.a>
  );
}