"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState, projects, experiences, skills, achievements, flutterSpring, gentleSpring, TargetRole, roleConfigs } from "./data";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

interface DisplayPaneProps {
  activeView: ViewState;
  mobileDisplayOpen: boolean;
  onCloseMobile: () => void;
  selectedRole: TargetRole;
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

export default function DisplayPane({ activeView, mobileDisplayOpen, onCloseMobile, selectedRole }: DisplayPaneProps) {
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
      {/* Dynamic 3D Canvas Background */}
      <ThreeBackground color={roleConfigs[selectedRole].accent} />
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
                Machine Learning Developer and Data Analyst with production experience across AI systems, data pipelines, and cross-platform mobile apps. Experienced in production-grade model deployment and embedding AI solutions within cross-platform Flutter applications, emphasizing performance, scalability, and reliability.
              </p>

              {/* Fresher Hiring Stats */}
              <motion.div
                variants={containerVariants} initial="hidden" animate="show"
                style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}
              >
                <StatCard value={8.28} isFloat={true} suffix="" label="GPA (BIT Durg CSE)" color="#a78bfa" delay={0} />
                <StatCard value={2} suffix="+" label="Internships" color="#22d3ee" delay={100} />
                <StatCard value={4} suffix="×" label="Hackathon Wins" color="#fbbf24" delay={200} />
                <StatCard value={30} suffix="+" label="Members Led (IEEE)" color="#34d399" delay={300} />
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...gentleSpring }}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}
              >
                <motion.a
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  href="mailto:geetish.mahato.19@gmail.com"
                  style={{
                    background: `linear-gradient(135deg, ${roleConfigs[selectedRole].accent}, ${roleConfigs[selectedRole].accent}cc)`,
                    color: "#fff", padding: "14px 28px", borderRadius: "14px",
                    fontWeight: 700, fontSize: "14px", textDecoration: "none",
                    boxShadow: `0 8px 24px ${roleConfigs[selectedRole].accent}44`,
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

              {/* Recruiter Playground Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ...gentleSpring }}
              >
                <RecruiterPlayground selectedRole={selectedRole} />
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
                {[...projects]
                  .sort((a, b) => {
                    const aIsPrimary = roleConfigs[selectedRole].primaryProjects.includes(a.title);
                    const bIsPrimary = roleConfigs[selectedRole].primaryProjects.includes(b.title);
                    if (aIsPrimary && !bIsPrimary) return -1;
                    if (!aIsPrimary && bIsPrimary) return 1;
                    return 0;
                  })
                  .map((p, i) => {
                    const isPrimary = roleConfigs[selectedRole].primaryProjects.includes(p.title);
                    return (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.015 }}
                        transition={{ duration: 0.25 }}
                        className="neon-hover"
                        style={{
                          background: "var(--bg-card)", backdropFilter: "blur(20px)",
                          border: isPrimary ? `1px solid ${p.color}aa` : "1px solid var(--border-card)",
                          borderRadius: "20px", padding: "28px",
                          boxShadow: isPrimary ? `0 8px 30px ${p.color}15` : "var(--shadow-card)",
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
                    );
                  })}
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
                        {skill.items.map(item => {
                          const isPrimary = roleConfigs[selectedRole].primarySkills.includes(item);
                          return (
                            <motion.span
                              key={item}
                              whileHover={{ scale: 1.05, borderColor: skill.color, color: skill.color }}
                              transition={{ duration: 0.15 }}
                              style={{
                                fontSize: "13px",
                                background: "var(--bg-input)",
                                padding: "6px 14px",
                                borderRadius: "10px",
                                color: isPrimary ? "var(--text-main)" : "var(--text-muted)",
                                border: isPrimary ? `1px solid ${skill.color}` : "1px solid var(--border-subtle)",
                                boxShadow: isPrimary ? `0 0 8px ${skill.color}22` : "none",
                                fontWeight: isPrimary ? 700 : 500,
                                fontFamily: "var(--font-body)",
                                cursor: "default",
                                transition: "color 0.15s, border-color 0.15s",
                                display: "inline-block"
                              }}
                            >
                              {isPrimary ? `✦ {item}` : item}
                            </motion.span>
                          );
                        })}
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
    "Machine Learning Developer.",
    "Data Analyst & Pipeline Engineer.",
    "Cross-Platform Flutter Dev.",
    "3× Technical Intern (AI, Django, Flutter).",
    "Seeking LLM Engineer / Data Analyst Roles.",
    ""
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

// ─── PLAYGROUND SIMULATORS ────────────────────────────────────────

interface PlaygroundProps {
  selectedRole: TargetRole;
}

function RecruiterPlayground({ selectedRole }: PlaygroundProps) {
  const accent = roleConfigs[selectedRole].accent;
  
  switch (selectedRole) {
    case "rag":
      return <RAGSimulator accent={accent} />;
    case "ml":
      return <MLSimulator accent={accent} />;
    case "data":
      return <DataSimulator accent={accent} />;
    case "flutter":
      return <FlutterSimulator accent={accent} />;
    case "sde":
      return <SDESimulator accent={accent} />;
    case "pm":
      return <PMSimulator accent={accent} />;
    default:
      return <GeneralOverviewSimulator accent={accent} />;
  }
}

function RAGSimulator({ accent }: { accent: string }) {
  const [query, setQuery] = useState("Which Indian regional languages are supported?");
  const [step, setStep] = useState<"idle" | "embedding" | "retrieval" | "generation">("idle");
  const [progress, setProgress] = useState(0);

  const runSimulation = () => {
    setStep("embedding");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("retrieval");
          setTimeout(() => {
            setStep("generation");
          }, 1000);
          return 100;
        }
        return p + 20;
      });
    }, 80);
  };

  const getSimulatedData = () => {
    if (query.includes("languages")) {
      return {
        chunks: [
          { text: "Aurora supports women's healthcare queries in 29 languages (22 Indian regional languages).", score: "0.938" },
          { text: "Indian regional language translation pipeline is built via Groq LLaMA 3.1 and FastAPI.", score: "0.891" }
        ],
        answer: "Aurora offers full multilingual support across 29 languages, specifically targeting 22 official Indian regional languages to provide accessible healthcare guidelines for women in rural India."
      };
    } else if (query.includes("health")) {
      return {
        chunks: [
          { text: "Maternal healthcare modules cover prenatal, neonatal, and general pregnancy wellness tips.", score: "0.952" },
          { text: "Guidelines are integrated with regional medical databases to ensure high reliability.", score: "0.884" }
        ],
        answer: "Aurora delivers structured guidelines on maternal health, including prenatal care, nutrition, safe birthing practices, and newborn wellness, tailored to local regional contexts."
      };
    } else {
      return {
        chunks: [
          { text: "Aurora utilizes mxbai-embed-large embeddings for generating 1024-dimensional vectors.", score: "0.915" },
          { text: "Qdrant vector database is configured with Maximal Marginal Relevance (MMR) search.", score: "0.897" }
        ],
        answer: "The pipeline uses mxbai-embed-large embeddings to encode queries, which are matched against a Qdrant vector database using MMR search to ensure diversity and accuracy in retrieved documents."
      };
    }
  };

  const data = getSimulatedData();

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>VECTOR RAG SIMULATOR</div>
      <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Test Aurora's Retrieval & Generation Pipeline</div>
      
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
        {[
          "Which Indian regional languages are supported?",
          "What maternal health info is provided?",
          "What embeddings and search mode are used?"
        ].map(q => (
          <button
            key={q}
            onClick={() => { setQuery(q); setStep("idle"); }}
            style={{
              background: query === q ? `${accent}18` : "var(--bg-card)",
              border: `1px solid ${query === q ? accent : "var(--border-subtle)"}`,
              color: query === q ? "var(--text-main)" : "var(--text-muted)",
              padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {q.substring(0, 25)}...
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
        <input
          type="text"
          value={query}
          readOnly
          style={{ flex: 1, minWidth: 0, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", padding: "10px 14px", borderRadius: "10px", color: "var(--text-main)", fontSize: "13px" }}
        />
        <button
          onClick={runSimulation}
          style={{ background: accent, color: "#fff", border: "none", padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
        >
          Run
        </button>
      </div>

      {step !== "idle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "var(--bg-card)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: step === "embedding" ? accent : "#10b981", fontWeight: 700 }}>
              {step === "embedding" ? "⚡ Generating Embeddings..." : "✓ Embeddings Generated (mxbai-embed-large)"}
            </span>
            {step === "embedding" && <span style={{ fontSize: "11px" }}>{progress}%</span>}
          </div>
          {step === "embedding" && (
            <div style={{ height: "4px", background: "var(--bg-input)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: accent, transition: "width 0.1s" }} />
            </div>
          )}

          {(step === "retrieval" || step === "generation") && (
            <div style={{ borderLeft: `2px solid ${step === "retrieval" ? accent : "#10b981"}`, paddingLeft: "12px", margin: "4px 0" }}>
              <div style={{ color: "var(--text-faint)", fontSize: "11px", marginBottom: "4px", fontWeight: 700 }}>RETRIEVED FROM QDRANT (MMR RETRIEVAL)</div>
              {data.chunks.map((ch, idx) => (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-main)", fontFamily: "var(--font-body)" }}>&quot;{ch.text}&quot;</div>
                  <div style={{ fontSize: "10px", color: accent, fontWeight: 700 }}>Similarity Score: {ch.score}</div>
                </div>
              ))}
            </div>
          )}

          {step === "generation" && (
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "10px", marginTop: "4px" }}>
              <div style={{ color: "#10b981", fontWeight: 700, fontSize: "11px", marginBottom: "6px" }}>GROQ LLAMA 3.1 RESPONSE:</div>
              <div style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", lineHeight: 1.5, fontSize: "13px" }}>
                {data.answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MLSimulator({ accent }: { accent: string }) {
  const [threshold, setThreshold] = useState(0.65);
  
  const detections = [
    { label: "Accident", conf: 0.91, box: { x: 30, y: 32, w: 40, h: 45 }, color: "#ef4444" },
    { label: "Car", conf: 0.84, box: { x: 5, y: 45, w: 20, h: 30 }, color: "#3b82f6" },
    { label: "Car", conf: 0.76, box: { x: 75, y: 40, w: 20, h: 32 }, color: "#3b82f6" },
    { label: "Pedestrian", conf: 0.44, box: { x: 67, y: 38, w: 8, h: 18 }, color: "#10b981" }
  ];

  const activeDetections = detections.filter(d => d.conf >= threshold);

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>COMPUTER VISION DASHBOARD</div>
      <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>ResQVision Live YOLOv8 Inference</div>

      <div style={{ position: "relative", width: "100%", height: "200px", background: "#09090b", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
        <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: "100px", background: "#1f1f23", clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", width: "2px", height: "80px", background: "#71717a", borderStyle: "dashed", transform: "translateX(-50%)" }} />
        
        <div style={{ position: "absolute", left: "42%", top: "45%", fontSize: "28px" }}>💥🚗</div>
        <div style={{ position: "absolute", left: "10%", top: "55%", fontSize: "24px" }}>🚙</div>
        <div style={{ position: "absolute", right: "12%", top: "50%", fontSize: "24px" }}>🚗</div>
        <div style={{ position: "absolute", left: "67%", top: "44%", fontSize: "16px" }}>🚶</div>

        {activeDetections.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${d.box.x}%`,
              top: `${d.box.y}%`,
              width: `${d.box.w}%`,
              height: `${d.box.h}%`,
              border: `2px solid ${d.color}`,
              boxShadow: `0 0 8px ${d.color}44`,
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ position: "absolute", top: -18, left: -2, background: d.color, color: "#fff", fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700, padding: "2px 6px", whiteSpace: "nowrap" }}>
              {d.label}: {(d.conf * 100).toFixed(0)}%
            </div>
          </div>
        ))}
        
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.7)", padding: "4px 8px", borderRadius: "6px", fontSize: "10px", color: "#10b981", fontFamily: "var(--font-mono)" }}>
          FPS: 30 · LATENCY: 0.18s · mAP: 91%
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>Confidence Threshold:</span>
          <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700 }}>{threshold.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.95"
          step="0.05"
          value={threshold}
          onChange={e => setThreshold(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: accent, cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-faint)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          <span>Low (Recall oriented)</span>
          <span>High (Precision oriented)</span>
        </div>
      </div>
    </div>
  );
}

function DataSimulator({ accent }: { accent: string }) {
  const [activeYear, setActiveYear] = useState<"2024" | "2025" | "2026">("2025");

  const records = {
    "2024": [
      { month: "Jan", vol: 62, cost: 72 },
      { month: "Mar", vol: 54, cost: 65 },
      { month: "May", vol: 81, cost: 90 },
      { month: "Jul", vol: 70, cost: 78 }
    ],
    "2025": [
      { month: "Jan", vol: 88, cost: 42 },
      { month: "Mar", vol: 92, cost: 38 },
      { month: "May", vol: 95, cost: 35 },
      { month: "Jul", vol: 98, cost: 33 }
    ],
    "2026": [
      { month: "Jan", vol: 110, cost: 28 },
      { month: "Mar", vol: 115, cost: 26 },
      { month: "May", vol: 120, cost: 24 },
      { month: "Jul", vol: 125, cost: 22 }
    ]
  };

  const currentData = records[activeYear];

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>DATA ANALYTICS DASHBOARD</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Steel Plant Procurement Analytics</span>
        <div style={{ display: "flex", gap: "4px" }}>
          {(["2024", "2025", "2026"] as const).map(y => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              style={{
                background: activeYear === y ? accent : "var(--bg-card)",
                color: activeYear === y ? "#fff" : "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
                padding: "3px 8px", borderRadius: "6px", fontSize: "11px", cursor: "pointer",
                fontWeight: 700
              }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "130px", alignItems: "end", gap: "16px", padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        {currentData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{ display: "flex", gap: "4px", width: "100%", height: "100px", alignItems: "end" }}>
              <div
                style={{
                  flex: 1,
                  background: accent,
                  height: `${(d.vol / 130) * 100}%`,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                title={`Volume: ${d.vol}k`}
              />
              <div
                style={{
                  flex: 1,
                  background: "#71717a",
                  height: `${(d.cost / 130) * 100}%`,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                title={`Processing Cost: ${d.cost}ms`}
              />
            </div>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d.month}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: 8, height: 8, background: accent, borderRadius: "50%" }} /> Volume
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: 8, height: 8, background: "#71717a", borderRadius: "50%" }} /> Ingestion Latency
          </span>
        </div>
        <span style={{ color: "#10b981", fontWeight: 700 }}>
          {activeYear === "2024" ? "Baseline" : activeYear === "2025" ? "Intern Optimization: -60% latency" : "Max Scale: 125k logs/mo"}
        </span>
      </div>
    </div>
  );
}

function FlutterSimulator({ accent }: { accent: string }) {
  const [chats, setChats] = useState<{ sender: "user" | "gemini"; text: string }[]>([
    { sender: "gemini", text: "Hello! I am MindSarthi, your wellness companion powered by Gemini API. How are you feeling today?" }
  ]);
  const [providerState, setProviderState] = useState("AppState.idle");

  const clickUserMessage = (text: string, response: string) => {
    if (providerState === "AppState.loading") return;
    setChats(prev => [...prev, { sender: "user", text }]);
    setProviderState("AppState.loading");
    setTimeout(() => {
      setChats(prev => [...prev, { sender: "gemini", text: response }]);
      setProviderState("AppState.success (Hive Cached)");
    }, 800);
  };

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>FLUTTER UI SIMULATOR</div>
      <div style={{ width: "100%", fontSize: "16px", fontWeight: 800, marginBottom: "14px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Interactive Mobile Mockup: MindSarthi</div>

      <div style={{ width: "240px", height: "350px", background: "var(--bg-chat)", borderRadius: "32px", border: "8px solid #1f2937", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ width: "100px", height: "16px", background: "#1f2937", borderRadius: "0 0 12px 12px", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 100 }} />
        
        <div style={{ background: "#1f2937", padding: "22px 10px 4px", fontSize: "9px", fontFamily: "var(--font-mono)", color: accent, display: "flex", justifyContent: "space-between", zIndex: 90 }}>
          <span>Provider: authStateProvider</span>
          <span>{providerState}</span>
        </div>

        <div className="hide-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
          {chats.map((c, i) => (
            <div key={i} style={{ alignSelf: c.sender === "user" ? "flex-end" : "flex-start", background: c.sender === "user" ? accent : "var(--bg-input)", color: c.sender === "user" ? "#fff" : "var(--text-main)", padding: "8px 12px", borderRadius: "12px", maxWidth: "85%", lineHeight: 1.4 }}>
              {c.text}
            </div>
          ))}
        </div>

        <div style={{ padding: "8px", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "6px", background: "var(--bg-input)" }}>
          <button
            onClick={() => clickUserMessage("I am feeling a bit stressed today.", "Let's take a deep breath. Breathe in for 4 seconds, hold, and release. Would you like a 5-minute mindfulness guide?")}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "10px", padding: "6px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
          >
            &quot;I am feeling stressed today&quot;
          </button>
          <button
            onClick={() => clickUserMessage("Give me a motivation quote.", "Your goals are waiting. 'The best way to predict the future is to create it.' - Peter Drucker.")}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "10px", padding: "6px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
          >
            &quot;Give me a motivation quote&quot;
          </button>
        </div>
      </div>
    </div>
  );
}

function SDESimulator({ accent }: { accent: string }) {
  const [activeTab, setActiveTab] = useState<"api" | "state" | "django">("api");

  const codes = {
    api: `@app.post("/api/v1/query")
async def process_rag_query(request: QueryRequest):
    try:
        # Generate 1024D query embeddings
        embeddings = model.embed(request.query)
        
        # Search Qdrant with MMR retrieval
        results = qdrant.search(
            collection="health_nodes",
            query_vector=embeddings,
            limit=3,
            search_params=QueryParams(score_threshold=0.8)
        )
        
        # Stream response from LLaMA 3.1
        return StreamingResponse(
            generate_stream(request.query, results), 
            media_type="text/event-stream"
        )
    except Exception as e:
        logger.error(f"Failed pipeline: {str(e)}")
        raise HTTPException(status_code=500)`,
    state: `class ChatNotifier extends StateNotifier<ChatState> {
  final GeminiService _geminiService;
  final HiveBox _hiveBox;

  ChatNotifier(this._geminiService, this._hiveBox) : super(ChatState.initial());

  Future<void> sendUserMessage(String text) async {
    state = state.copyWith(status: ChatStatus.loading);
    try {
      final userMessage = Message(text: text, isUser: true);
      state = state.copyWith(messages: [...state.messages, userMessage]);
      
      // Request model predictions
      final aiResponse = await _geminiService.chat(text);
      
      // Cache response in Local Hive DB
      _hiveBox.put(text, aiResponse);
      
      state = state.copyWith(
        messages: [...state.messages, Message(text: aiResponse, isUser: false)],
        status: ChatStatus.success
      );
    } catch (e) {
      state = state.copyWith(status: ChatStatus.error);
    }
  }
}`,
    django: `class IngestProcurementLogs(View):
    def post(self, request):
        csv_file = request.FILES.get('file')
        if not csv_file.name.endswith('.csv'):
            return JsonResponse({"error": "Invalid format"}, status=400)
            
        # Parse and ingest 300,000+ records
        with transaction.atomic():
            reader = csv.DictReader(codecs.iterdecode(csv_file, 'utf-8'))
            logs = [
                ProcurementLog(
                    material_id=row['MaterialID'],
                    quantity=row['Quantity'],
                    cost=row['Cost'],
                    timestamp=parse_datetime(row['Timestamp'])
                ) for row in reader
            ]
            ProcurementLog.objects.bulk_create(logs, batch_size=1000)
            
        return JsonResponse({"status": "bulk_ingestion_success", "count": len(logs)})`
  };

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>CODE QUALITY VIEW</div>
      <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Inspect Geetish's Production Code Quality</div>

      <div style={{ display: "flex", gap: "4px", background: "var(--bg-card)", padding: "6px 6px 0", borderRadius: "10px 10px 0 0", border: "1px solid var(--border-subtle)", borderBottom: "none" }}>
        {(["api", "state", "django"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "var(--bg-input)" : "transparent",
              color: activeTab === tab ? "var(--text-main)" : "var(--text-faint)",
              border: "none",
              padding: "6px 12px", borderRadius: "6px 6px 0 0", fontSize: "11px", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontWeight: 700,
              borderBottom: activeTab === tab ? `2px solid ${accent}` : "none",
            }}
          >
            {tab === "api" ? "aurora_api.py" : tab === "state" ? "chat_notifier.dart" : "ingest_logs.py"}
          </button>
        ))}
      </div>

      <pre style={{ margin: 0, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "0 0 10px 10px", padding: "16px", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", overflowX: "auto", whiteSpace: "pre", lineHeight: 1.5 }}>
        <code>{codes[activeTab]}</code>
      </pre>
    </div>
  );
}

function PMSimulator({ accent }: { accent: string }) {
  const [activePhase, setActivePhase] = useState<"discovery" | "delivery" | "impact">("delivery");

  const content = {
    discovery: {
      title: "Problem Scoping: Me Matdar App Lag",
      bullets: [
        "Identified 30% load latency issue on user dashboards via telemetry logging.",
        "Defined key Persona: Field marketing teams accessing client feeds in low-bandwidth regions.",
        "Scoped MVP: Transition from default full fetch to paginated Riverpod state updates."
      ],
      kpi: "Goal: Feed latency reduction > 25%"
    },
    delivery: {
      title: "Iterative Feature Implementation",
      bullets: [
        "Coordinated with engineering to replace legacy state with Riverpod providers.",
        "Designed and monitored performance testing for pagination and lazy-loaded items.",
        "Pushed update to staging and verified 0% regression on user registration."
      ],
      kpi: "Outcome: Delivered 3 core features within 3-week sprint"
    },
    impact: {
      title: "Launch & Metric Verification",
      bullets: [
        "Deployed to production. Measured dashboard speedup using analytics trackers.",
        "Verified load times fell from 1.8 seconds to 1.2 seconds on rural cellular networks.",
        "Presented metrics to stakeholders at the IEEE leadership committee."
      ],
      kpi: "Final Impact: 30% speedup, 12% increase in retention"
    }
  };

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>PRODUCT MANAGEMENT PLAYBOOK</div>
      <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "14px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Project Lifecycle: Me Matdar App</div>

      <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
        {(["discovery", "delivery", "impact"] as const).map(p => (
          <button
            key={p}
            onClick={() => setActivePhase(p)}
            style={{
              flex: 1,
              background: activePhase === p ? `${accent}18` : "var(--bg-card)",
              border: `1px solid ${activePhase === p ? accent : "var(--border-subtle)"}`,
              color: activePhase === p ? "var(--text-main)" : "var(--text-muted)",
              padding: "6px 8px", borderRadius: "8px", fontSize: "11px", cursor: "pointer",
              fontWeight: 700, textTransform: "capitalize"
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "10px" }}>{content[activePhase].title}</div>
        <ul style={{ paddingLeft: "16px", margin: "0 0 12px 0", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
          {content[activePhase].bullets.map((b, idx) => (
            <li key={idx} style={{ marginBottom: "6px" }}>{b}</li>
          ))}
        </ul>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--text-faint)", fontWeight: 700 }}>METRIC FOCUS</span>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#10b981" }}>{content[activePhase].kpi}</span>
        </div>
      </div>
    </div>
  );
}

function GeneralOverviewSimulator({ accent }: { accent: string }) {
  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "16px", padding: "20px", border: "1px solid var(--border-subtle)", marginTop: "24px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "8px" }}>SYSTEM OVERVIEW</div>
      <div style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Adaptive Recruiting Experience</div>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
        Geetish Mahato is a multi-talented developer. Select a <strong>Recruiter Target</strong> dropdown on the left side of the screen to tailor this entire portfolio and test live interactive simulations in RAG search, computer vision, data metrics, code editing, and product roadmaps!
      </p>
    </div>
  );
}