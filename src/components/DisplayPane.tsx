"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState, projects, experiences, skills, achievements, flutterSpring, gentleSpring, TargetRole, roleConfigs } from "./data";
import dynamic from "next/dynamic";
import WbTelemetry from "./WbTelemetry";
import { NETWORK_NODES } from "./ThreeNeuralNetwork";

const ThreeNeuralNetwork = dynamic(() => import("./ThreeNeuralNetwork"), { ssr: false });

interface DisplayPaneProps {
  activeView: ViewState;
  mobileDisplayOpen: boolean;
  onCloseMobile: () => void;
  selectedRole: TargetRole;
  focusedNode: string | null;
  onSelectNode: (id: string | null) => void;
}

// ─── Typewriter & Counter Hooks ─────────────────────────────────────

function useTypewriter(text: string, speed = 25, delay = 350) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
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

function useCounter(target: number, duration = 1200, delay = 250) {
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

function StatCard({ value, isFloat = false, suffix, label, color, delay = 0 }: { value: number; isFloat?: boolean; suffix: string; label: string; color: string; delay?: number }) {
  const count = useCounter(isFloat ? value * 100 : value, 1300, 200 + delay);
  const displayValue = isFloat ? (count / 100).toFixed(2) : count;
  
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: flutterSpring } }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      className="glass-panel"
      style={{
        flex: 1, minWidth: "120px",
        borderRadius: "16px", padding: "18px 16px",
        position: "relative", overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", bottom: -20, right: -20, width: 60, height: 60,
        borderRadius: "50%", background: color, opacity: 0.06, filter: "blur(18px)",
      }} />
      <div style={{
        fontSize: "28px", fontWeight: 800, color,
        letterSpacing: "-0.5px", lineHeight: 1,
        fontFamily: "var(--font-display)",
      }}>
        {displayValue}{suffix}
      </div>
      <div style={{
        fontSize: "10px", color: "var(--text-faint)",
        textTransform: "uppercase", letterSpacing: "1px",
        marginTop: "6px", fontWeight: 600,
        fontFamily: "var(--font-mono)",
      }}>{label}</div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: flutterSpring },
};

// ─── Main Display Component ──────────────────────────────────────────

export default function DisplayPane({ activeView, mobileDisplayOpen, onCloseMobile, selectedRole, focusedNode, onSelectNode }: DisplayPaneProps) {
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
      {/* 3D Canvas Background in hero, faded in other views */}
      {activeView === "hero" ? (
        <ThreeNeuralNetwork
          activeRole={selectedRole}
          focusedNode={focusedNode}
          onSelectNode={onSelectNode}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
          <ThreeNeuralNetwork
            activeRole={selectedRole}
            focusedNode={null}
            onSelectNode={() => {}}
          />
        </div>
      )}

      {/* Ambient background glows */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "-15%", right: "-10%", width: "500px", height: "500px",
          background: "var(--accent-glow)", borderRadius: "50%", filter: "blur(120px)",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 3 }}
        style={{
          position: "absolute", bottom: "-10%", left: "5%", width: "350px", height: "350px",
          background: "var(--glow-cyan)", borderRadius: "50%", filter: "blur(90px)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* Mobile Swipe-down sheet handle */}
      <div
        className="mobile-only-flex"
        style={{
          padding: "12px 20px",
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
        <div style={{ width: "40px", height: "4px", background: "var(--text-muted)", borderRadius: "99px", opacity: 0.4 }} />
      </div>

      {/* Scrollable Layout Content */}
      <div
        className="hide-scrollbar"
        style={{
          flex: 1, overflowY: "auto",
          padding: "clamp(24px, 5vw, 64px) clamp(20px, 5vw, 64px)",
          display: "flex", flexDirection: "column", justifyContent: "flex-start",
          position: "relative", zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">

          {/* ═══════════════ HERO ═══════════════ */}
          {activeView === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              style={{
                position: "absolute", inset: 0,
                padding: "clamp(12px, 3vw, 24px)",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {/* Top HUD Stats Panel */}
              <div style={{ pointerEvents: "auto", maxWidth: "440px" }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, ...flutterSpring }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 14px",
                    background: "var(--bg-card)", backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                    color: "var(--text-muted)", marginBottom: "16px",
                    fontFamily: "var(--font-mono)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                  W&B NODE CLUSTERING · ACTIVE
                </motion.div>

                <h2 style={{
                  fontSize: "clamp(34px, 5vw, 64px)",
                  fontWeight: 800, lineHeight: 0.95, letterSpacing: "-1.5px",
                  marginBottom: "8px", color: "var(--text-main)",
                  fontFamily: "var(--font-display)",
                }}>
                  Geetish<br />
                  <span style={{
                    background: `linear-gradient(135deg, ${roleConfigs[selectedRole].accent} 0%, #22d3ee 100%)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Mahato
                  </span>
                </h2>

                <HeroTagline />

                <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                  <motion.a
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    href="mailto:geetish.mahato.19@gmail.com"
                    style={{
                      background: `linear-gradient(135deg, ${roleConfigs[selectedRole].accent}, ${roleConfigs[selectedRole].accent}cc)`,
                      color: "#fff", padding: "8px 18px", borderRadius: "10px",
                      fontWeight: 700, fontSize: "13px", textDecoration: "none",
                      boxShadow: `0 4px 16px ${roleConfigs[selectedRole].accent}25`,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Contact ↗
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    href="https://github.com/GeetishM" target="_blank" rel="noreferrer"
                    style={{
                      background: "var(--bg-card)", backdropFilter: "blur(12px)",
                      border: "1px solid var(--border-card)",
                      color: "var(--text-main)", padding: "8px 18px", borderRadius: "10px",
                      fontWeight: 600, fontSize: "13px", textDecoration: "none",
                      boxShadow: "var(--shadow-card)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    GitHub →
                  </motion.a>
                </div>
              </div>

              {/* Bottom HUD Workspace panels */}
              <div
                className="mobile-stack"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: "20px",
                  width: "100%",
                  marginTop: "auto",
                }}
              >
                {/* Left side: Node simulator panel */}
                <div style={{ pointerEvents: "auto", flex: 1, maxWidth: "450px" }}>
                  {focusedNode ? (
                    <motion.div
                      key={focusedNode}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-panel"
                      style={{
                        borderRadius: "16px",
                        padding: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                      }}
                    >
                      <div style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: roleConfigs[selectedRole].accent, fontWeight: 700, marginBottom: "4px" }}>
                        TELEMETRY SIMULATOR ATTACHED
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff", fontFamily: "var(--font-display)" }}>
                        {NETWORK_NODES.find(n => n.id === focusedNode)?.name}
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "4px 0 12px" }}>
                        {NETWORK_NODES.find(n => n.id === focusedNode)?.info}
                      </p>
                      
                      <NodeSimulatorWrapper selectedRole={selectedRole} focusedNode={focusedNode} />
                    </motion.div>
                  ) : (
                    <div
                      className="glass-panel"
                      style={{
                        borderRadius: "16px",
                        padding: "14px 18px",
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        lineHeight: 1.5,
                      }}
                    >
                      💡 CLICK ON A NEURAL NODE IN THE 3D WEBGL CONSTELATION TO LOAD LIVE INTERACTIVE SIMULATORS.
                    </div>
                  )}
                </div>

                {/* Right side: Charts */}
                <div style={{ pointerEvents: "auto" }}>
                  <WbTelemetry
                    activeRole={selectedRole}
                    focusedNodeName={focusedNode ? NETWORK_NODES.find(n => n.id === focusedNode)?.name || null : null}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ PROJECTS ═══════════════ */}
          {activeView === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="⬡" label="PROJECTS" title="Production Architecture" />
              <motion.div
                variants={containerVariants} initial="hidden" animate="show"
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}
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
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="neon-hover glass-panel"
                        style={{
                          borderRadius: "16px", padding: "24px",
                          border: isPrimary ? `1px solid ${p.color}88` : "1px solid var(--border-card)",
                          boxShadow: isPrimary ? `0 8px 30px ${p.color}10` : "var(--shadow-card)",
                          position: "relative", overflow: "hidden",
                          cursor: "default",
                          "--accent": p.color,
                          "--accent-glow": `${p.color}15`
                        } as React.CSSProperties}
                      >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                          <div style={{ fontSize: "19px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
                            {p.title}
                          </div>
                          <a href={p.github} target="_blank" rel="noreferrer"
                            style={{
                              fontSize: "11px", fontWeight: 700, color: p.color,
                              background: `${p.color}14`, border: `1px solid ${p.color}25`,
                              padding: "3px 8px", borderRadius: "6px", textDecoration: "none",
                              fontFamily: "var(--font-mono)",
                              transition: "background 0.2s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = `${p.color}25`)}
                            onMouseLeave={e => (e.currentTarget.style.background = `${p.color}14`)}
                          >
                            GitHub ↗
                          </a>
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                          <span style={{ background: `${p.color}14`, color: p.color, fontSize: "11px", padding: "4px 10px", borderRadius: "99px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                            {p.metric}
                          </span>
                          <span style={{ background: "var(--bg-input)", color: "var(--text-faint)", fontSize: "11px", padding: "4px 10px", borderRadius: "99px", fontWeight: 650, fontFamily: "var(--font-mono)" }}>
                            {p.period}
                          </span>
                        </div>
                        <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>{p.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid var(--border-subtle)", paddingTop: "14px" }}>
                          {p.tech.map(t => (
                            <span key={t} style={{ fontSize: "10.5px", fontFamily: "var(--font-mono)", background: "var(--bg-input)", color: "var(--text-faint)", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--border-subtle)" }}>{t}</span>
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="▸" label="EXPERIENCE" title="Professional Milestones" />
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                <div style={{ position: "absolute", left: "28px", top: "24px", bottom: "24px", width: "1px", background: "linear-gradient(to bottom, var(--accent), #22d3ee, transparent)", opacity: 0.15, zIndex: 0 }} />
                {experiences.map((exp, i) => (
                  <motion.div key={i} variants={itemVariants} style={{ display: "flex", gap: "20px", alignItems: "flex-start", position: "relative", zIndex: 1, paddingBottom: i < experiences.length - 1 ? "6px" : "0" }}>
                    <div style={{ flexShrink: 0, width: "56px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: `${exp.color}14`, border: `1px solid ${exp.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", boxShadow: `0 0 12px ${exp.color}15` }}>{exp.icon}</div>
                    </div>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="glass-panel" style={{ flex: 1, borderRadius: "16px", padding: "18px 20px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px", flexWrap: "wrap", gap: "8px" }}>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)", letterSpacing: "-0.2px" }}>{exp.role}</div>
                          <div style={{ fontSize: "13.5px", color: exp.color, fontWeight: 600, marginBottom: "8px" }}>{exp.org}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 600, background: "var(--bg-input)", color: "var(--text-faint)", padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>{exp.period}</span>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{exp.type}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.6 }}>{exp.desc}</p>
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              transition={flutterSpring}
            >
              <SectionHeader icon="◈" label="SKILLS" title="Technical Capability Matrix" />
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {skills.map((skill, i) => (
                  <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.005 }} className="glass-panel" style={{ borderRadius: "16px", padding: "18px 20px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: skill.color, borderRadius: "4px 0 0 4px" }} />
                    <div style={{ paddingLeft: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <span style={{ fontSize: "16px" }}>{skill.icon}</span>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: skill.color, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "1px" }}>{skill.category}</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {skill.items.map(item => {
                          const isPrimary = roleConfigs[selectedRole].primarySkills.includes(item);
                          return (
                            <motion.span
                              key={item}
                              whileHover={{ scale: 1.03, borderColor: skill.color, color: skill.color }}
                              transition={{ duration: 0.15 }}
                              style={{
                                fontSize: "12px",
                                background: "var(--bg-input)",
                                padding: "5px 10px",
                                borderRadius: "8px",
                                color: isPrimary ? "var(--text-main)" : "var(--text-muted)",
                                border: isPrimary ? `1px solid ${skill.color}` : "1px solid var(--border-subtle)",
                                boxShadow: isPrimary ? `0 0 8px ${skill.color}15` : "none",
                                fontWeight: isPrimary ? 700 : 500,
                                fontFamily: "var(--font-body)",
                                cursor: "default",
                                transition: "all 0.15s ease",
                                display: "inline-block"
                              }}
                            >
                              {isPrimary ? `✦ ${item}` : item}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ...gentleSpring }} style={{ marginTop: "24px" }}>
                <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>HACKATHONS & AWARDS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                  {achievements.map((a, i) => (
                    <div key={i} className="glass-panel" style={{ borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{a.title}</div>
                        <div style={{ fontSize: "11px", color: a.color, fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "2px" }}>{a.result}</div>
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
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
              transition={flutterSpring}
              style={{ maxWidth: "500px", margin: "0 auto", width: "100%" }}
            >
              <motion.div className="float" style={{ width: 80, height: 80, borderRadius: "24px", background: "linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 900, color: "#fff", margin: "0 auto 24px", fontFamily: "var(--font-display)", boxShadow: "0 12px 30px rgba(124,58,237,0.3)" }}>G</motion.div>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, textAlign: "center", letterSpacing: "-1px", marginBottom: "8px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Let&apos;s Build Solutions</h3>
              <p style={{ fontSize: "14.5px", color: "var(--text-muted)", lineHeight: 1.6, textAlign: "center", maxWidth: "380px", margin: "0 auto 30px" }}>Final-year B.Tech CSE (AI) developer ready to deliver production ready AI integrations, SDE backends, and data pipelines.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                {["📍 Durg, India", "🎓 BIT Durg · 8.28 GPA", "🚀 Open to Relocation"].map(chip => (
                  <span key={chip} className="glass-panel" style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", padding: "6px 14px", borderRadius: "99px" }}>{chip}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <ContactLink href="mailto:geetish.mahato.19@gmail.com" icon="✉" label="Email" value="geetish.mahato.19@gmail.com" primary />
                <ContactLink href="https://linkedin.com/in/geetish-mahato" icon="in" label="LinkedIn" value="linkedin.com/in/geetish-mahato" color="#0a66c2" />
                <ContactLink href="https://github.com/GeetishM" icon="⌥" label="GitHub" value="github.com/GeetishM" color="#7c3aed" />
              </div>
              <div style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>Phone: +91 7587027511</div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Sub-components & Helpers ────────────────────────────────────────

function HeroTagline() {
  const roles = [
    "Machine Learning & RAG Dev.",
    "Data Analyst & Pipeline Dev.",
    "Cross-Platform Flutter Intern.",
    "Full-Stack Django Developer.",
    "IEEE Student Branch Chairperson.",
  ];
  const [idx, setIdx] = useState(0);
  const text = useTypewriter(roles[idx], 25, 150);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <p style={{
      fontSize: "clamp(14px, 1.6vw, 17px)",
      color: "var(--accent)", lineHeight: 1.5,
      marginBottom: "16px", minHeight: "1.5em",
      fontWeight: 600, display: "flex", alignItems: "center",
      fontFamily: "var(--font-mono)"
    }}>
      <span style={{ marginRight: 6, fontSize: 16 }}>_</span>
      {text}
      <span className="cursor-blink" />
    </p>
  );
}

function SectionHeader({ icon, label, title }: { icon: string; label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, ...gentleSpring }}
      style={{ marginBottom: "22px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ color: "var(--accent)", fontSize: "14px" }}>{icon}</span>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          {label}
        </span>
      </div>
      <h3 style={{
        fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.5px",
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
      whileHover={{ scale: 1.015, y: -2 }} whileTap={{ scale: 0.985 }}
      href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
      className={primary ? "" : "glass-panel"}
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        background: primary ? "linear-gradient(135deg, #7c3aed, #4338ca)" : undefined,
        border: primary ? "none" : undefined,
        color: primary ? "#fff" : "var(--text-main)",
        padding: "14px 20px", borderRadius: "12px",
        textDecoration: "none", fontWeight: 600,
        boxShadow: primary ? "0 8px 24px rgba(124,58,237,0.25)" : undefined,
        fontFamily: "var(--font-body)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: "8px", flexShrink: 0,
        background: primary ? "rgba(255,255,255,0.15)" : `${color || "var(--accent)"}14`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", fontWeight: 800, color: primary ? "#fff" : (color || "var(--accent)"),
        fontFamily: "var(--font-mono)",
        border: primary ? "1px solid rgba(255,255,255,0.2)" : `1px solid ${color || "var(--accent)"}25`,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "10px", fontWeight: 600, opacity: primary ? 0.75 : 1, color: primary ? "#fff" : "var(--text-faint)", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "2px" }}>
          {label}
        </div>
        <div style={{ fontSize: "13.5px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </div>
      </div>
      <span style={{ opacity: 0.5, fontSize: "14px" }}>↗</span>
    </motion.a>
  );
}

// ─── PLAYGROUND SIMULATORS ────────────────────────────────────────

function NodeSimulatorWrapper({ selectedRole, focusedNode }: { selectedRole: TargetRole; focusedNode: string }) {
  const accent = roleConfigs[selectedRole].accent;

  switch (focusedNode) {
    case "edu":
      return <SDESimulator accent={accent} />;
    case "bsp":
      return <DataSimulator accent={accent} />;
    case "matdar":
      return <FlutterSimulator accent={accent} isMatdar />;
    case "astitva":
      return <PMSimulator accent={accent} />;
    case "aurora":
      return <RAGSimulator accent={accent} />;
    case "resq":
      return <MLSimulator accent={accent} />;
    case "sarthi":
      return <FlutterSimulator accent={accent} isMatdar={false} />;
    default:
      return null;
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
          }, 900);
          return 100;
        }
        return p + 25;
      });
    }, 70);
  };

  const getSimulatedData = () => {
    if (query.includes("languages")) {
      return {
        chunks: [
          { text: "Aurora supports women's healthcare queries in 29 languages (22 Indian regional languages).", score: "0.937" },
          { text: "Indian regional language translation pipeline is built via Groq LLaMA 3.1 and FastAPI.", score: "0.898" }
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
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>VECTOR RAG SIMULATOR</div>
      <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Test Aurora's Retrieval Pipeline</div>
      
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
        {[
          "Which Indian regional languages are supported?",
          "What maternal health info is provided?",
          "What embeddings and search mode are used?"
        ].map(q => (
          <button
            key={q}
            onClick={() => { setQuery(q); setStep("idle"); }}
            style={{
              background: query === q ? `${accent}14` : "var(--bg-card)",
              border: `1px solid ${query === q ? accent : "var(--border-subtle)"}`,
              color: query === q ? "var(--text-main)" : "var(--text-muted)",
              padding: "5px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {q.substring(0, 22)}...
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
        <input
          type="text"
          value={query}
          readOnly
          style={{ flex: 1, minWidth: 0, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", padding: "8px 12px", borderRadius: "8px", color: "var(--text-main)", fontSize: "12px" }}
        />
        <button
          onClick={runSimulation}
          style={{ background: accent, color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
        >
          Run
        </button>
      </div>

      {step !== "idle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg-card)", borderRadius: "8px", padding: "12px", border: "1px solid var(--border-subtle)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: step === "embedding" ? accent : "#10b981", fontWeight: 700 }}>
              {step === "embedding" ? "⚡ Generating Embeddings..." : "✓ Embeddings Generated (mxbai-embed-large)"}
            </span>
            {step === "embedding" && <span style={{ fontSize: "10px" }}>{progress}%</span>}
          </div>
          {step === "embedding" && (
            <div style={{ height: "3px", background: "var(--bg-input)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: accent, transition: "width 0.1s" }} />
            </div>
          )}

          {(step === "retrieval" || step === "generation") && (
            <div style={{ borderLeft: `2px solid ${step === "retrieval" ? accent : "#10b981"}`, paddingLeft: "10px", margin: "4px 0" }}>
              <div style={{ color: "var(--text-faint)", fontSize: "10px", marginBottom: "4px", fontWeight: 700 }}>QDRANT MMR RETRIEVAL RETURNING CHUNKS:</div>
              {data.chunks.map((ch, idx) => (
                <div key={idx} style={{ marginBottom: "4px" }}>
                  <div style={{ fontSize: "11.5px", color: "var(--text-main)", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>&quot;{ch.text}&quot;</div>
                  <div style={{ fontSize: "9px", color: accent, fontWeight: 700 }}>Similarity Score: {ch.score}</div>
                </div>
              ))}
            </div>
          )}

          {step === "generation" && (
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", marginTop: "4px" }}>
              <div style={{ color: "#10b981", fontWeight: 700, fontSize: "10px", marginBottom: "4px" }}>GROQ LLAMA 3.1 SYNTHESIZED RESPONSE:</div>
              <div style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", lineHeight: 1.45, fontSize: "12px" }}>
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
    { label: "Accident", conf: 0.91, box: { x: 30, y: 28, w: 42, h: 48 }, color: "#ef4444" },
    { label: "Car", conf: 0.84, box: { x: 4, y: 42, w: 22, h: 32 }, color: "#3b82f6" },
    { label: "Car", conf: 0.76, box: { x: 74, y: 38, w: 22, h: 34 }, color: "#3b82f6" },
    { label: "Pedestrian", conf: 0.44, box: { x: 67, y: 38, w: 8, h: 20 }, color: "#10b981" }
  ];

  const activeDetections = detections.filter(d => d.conf >= threshold);

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>COMPUTER VISION INTERFACE</div>
      <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>ResQVision Live YOLOv8 Inference</div>

      <div style={{ position: "relative", width: "100%", height: "170px", background: "#050508", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
        {/* Simple road simulation */}
        <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: "90px", background: "#18181b", clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", width: "2px", height: "70px", background: "#52525b", borderStyle: "dashed", transform: "translateX(-50%)" }} />
        
        <div style={{ position: "absolute", left: "41%", top: "40%", fontSize: "24px" }}>💥🚗</div>
        <div style={{ position: "absolute", left: "8%", top: "50%", fontSize: "20px" }}>🚙</div>
        <div style={{ position: "absolute", right: "10%", top: "45%", fontSize: "20px" }}>🚗</div>
        <div style={{ position: "absolute", left: "67%", top: "42%", fontSize: "14px" }}>🚶</div>

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
            <div style={{ position: "absolute", top: -16, left: -2, background: d.color, color: "#fff", fontSize: "9px", fontFamily: "var(--font-mono)", fontWeight: 700, padding: "1px 4px", whiteSpace: "nowrap" }}>
              {d.label}: {(d.conf * 100).toFixed(0)}%
            </div>
          </div>
        ))}
        
        <div style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(0,0,0,0.75)", padding: "3px 6px", borderRadius: "4px", fontSize: "9px", color: "#10b981", fontFamily: "var(--font-mono)" }}>
          FPS: 30 · INFERENCE: 0.20s · mAP: 91%
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <span style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 600 }}>YOLO Confidence Threshold:</span>
          <span style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700 }}>{threshold.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.95"
          step="0.05"
          value={threshold}
          onChange={e => setThreshold(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: accent, cursor: "pointer", height: "4px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", color: "var(--text-faint)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
          <span>Low (Recall - 4 detections)</span>
          <span>High (Precision - strict)</span>
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
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>DATA PIPELINE DASHBOARD</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Bhilai Steel Ingestion Analytics</span>
        <div style={{ display: "flex", gap: "3px" }}>
          {(["2024", "2025", "2026"] as const).map(y => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              style={{
                background: activeYear === y ? accent : "var(--bg-card)",
                color: activeYear === y ? "#fff" : "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
                padding: "2px 6px", borderRadius: "4px", fontSize: "10px", cursor: "pointer",
                fontWeight: 700
              }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "100px", alignItems: "end", gap: "12px", padding: "8px 0", borderBottom: "1px solid var(--border-subtle)" }}>
        {currentData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{ display: "flex", gap: "3px", width: "100%", height: "70px", alignItems: "end" }}>
              <div
                style={{
                  flex: 1,
                  background: accent,
                  height: `${(d.vol / 130) * 100}%`,
                  borderRadius: "2px 2px 0 0",
                  transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                title={`Procurement volume: ${d.vol}k`}
              />
              <div
                style={{
                  flex: 1,
                  background: "#71717a",
                  height: `${(d.cost / 100) * 100}%`,
                  borderRadius: "2px 2px 0 0",
                  transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                title={`Pipeline Latency: ${d.cost}ms`}
              />
            </div>
            <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{d.month}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ width: 6, height: 6, background: accent, borderRadius: "50%" }} /> Volume
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ width: 6, height: 6, background: "#71717a", borderRadius: "50%" }} /> Latency
          </span>
        </div>
        <span style={{ color: "#10b981", fontWeight: 700 }}>
          {activeYear === "2024" ? "Baseline" : activeYear === "2025" ? "ETL Ingestion: -60% delay" : "Current Rate: 125k logs/mo"}
        </span>
      </div>
    </div>
  );
}

function FlutterSimulator({ accent, isMatdar }: { accent: string; isMatdar: boolean }) {
  const [chats, setChats] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: isMatdar
        ? "Me Matdar campaign optimization module online. Tap below to simulate pagination & Riverpod state triggers."
        : "Hello! I am MindSarthi wellness bot. Tap a greeting below to query Gemini API."
    }
  ]);
  const [providerState, setProviderState] = useState("State: AsyncValue.data");

  const clickUserMessage = (text: string, response: string) => {
    if (providerState.includes("loading")) return;
    setChats(prev => [...prev, { sender: "user", text }]);
    setProviderState("State: AsyncValue.loading (Riverpod)");
    setTimeout(() => {
      setChats(prev => [...prev, { sender: "bot", text: response }]);
      setProviderState(isMatdar ? "State: Paginated Feed Loaded" : "State: Gemini Reply (Hive Cached)");
    }, 700);
  };

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>FLUTTER APP MOCKUP</div>
      <div style={{ width: "100%", fontSize: "14px", fontWeight: 800, marginBottom: "10px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>
        {isMatdar ? "Me Matdar: Riverpod Ingestion" : "MindSarthi: Gemini Wellness App"}
      </div>

      <div style={{ width: "220px", height: "300px", background: "var(--bg-chat)", borderRadius: "24px", border: "6px solid #27272a", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ width: "80px", height: "12px", background: "#27272a", borderRadius: "0 0 10px 10px", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 100 }} />
        
        <div style={{ background: "#27272a", padding: "16px 8px 3px", fontSize: "8.5px", fontFamily: "var(--font-mono)", color: accent, display: "flex", justifyContent: "space-between", zIndex: 90 }}>
          <span>Provider: {isMatdar ? "feedProvider" : "chatProvider"}</span>
          <span style={{ fontSize: "8px" }}>{providerState}</span>
        </div>

        <div className="hide-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "8px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "10.5px" }}>
          {chats.map((c, i) => (
            <div key={i} style={{ alignSelf: c.sender === "user" ? "flex-end" : "flex-start", background: c.sender === "user" ? accent : "var(--bg-input)", color: c.sender === "user" ? "#fff" : "var(--text-main)", padding: "6px 10px", borderRadius: "10px", maxWidth: "88%", lineHeight: 1.35 }}>
              {c.text}
            </div>
          ))}
        </div>

        <div style={{ padding: "6px", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "4px", background: "var(--bg-input)" }}>
          {isMatdar ? (
            <>
              <button
                onClick={() => clickUserMessage("Load campaign feed index", "Fetched next 20 campaign records (lazy loading enabled). Load latency reduced by 30%.")}
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "9.5px", padding: "5px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
              >
                &quot;Fetch page 2 (Paginated)&quot;
              </button>
              <button
                onClick={() => clickUserMessage("Trigger hot reload state", "State re-initialized. Riverpod cache holds 3 active filters.")}
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "9.5px", padding: "5px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
              >
                &quot;Flush local Provider state&quot;
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => clickUserMessage("I am feeling stressed today.", "Let's take a deep breath. Breathe in for 4 seconds, hold, and release. Mindfulness guide loaded.")}
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "9.5px", padding: "5px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
              >
                &quot;I'm feeling a bit stressed today&quot;
              </button>
              <button
                onClick={() => clickUserMessage("Give me a motivation quote.", "Goals are waiting: 'The best way to predict the future is to create it.' - Peter Drucker.")}
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "9.5px", padding: "5px", cursor: "pointer", color: "var(--text-muted)", textAlign: "left" }}
              >
                &quot;Give me a motivation quote&quot;
              </button>
            </>
          )}
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
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>CODE QUALITY TERMINAL</div>
      <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>Inspect Production Source Quality</div>

      <div style={{ display: "flex", gap: "4px", background: "var(--bg-card)", padding: "4px 4px 0", borderRadius: "8px 8px 0 0", border: "1px solid var(--border-subtle)", borderBottom: "none" }}>
        {(["api", "state", "django"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "var(--bg-input)" : "transparent",
              color: activeTab === tab ? "var(--text-main)" : "var(--text-faint)",
              border: "none",
              padding: "4px 10px", borderRadius: "6px 6px 0 0", fontSize: "10.5px", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontWeight: 700,
              borderBottom: activeTab === tab ? `2px solid ${accent}` : "none",
            }}
          >
            {tab === "api" ? "aurora_api.py" : tab === "state" ? "chat_notifier.dart" : "ingest_logs.py"}
          </button>
        ))}
      </div>

      <pre className="hide-scrollbar" style={{ margin: 0, background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "0 0 8px 8px", padding: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", overflowX: "auto", whiteSpace: "pre", lineHeight: 1.45 }}>
        <code>{codes[activeTab]}</code>
      </pre>
    </div>
  );
}

function PMSimulator({ accent }: { accent: string }) {
  const [activePhase, setActivePhase] = useState<"scoping" | "delivery" | "impact">("delivery");

  const content = {
    scoping: {
      title: "Scoping: Astitva Redesign",
      bullets: [
        "Mapped digital requirements for grassroots rural education initiatives.",
        "Defined key user group: Remote community instructors and 500+ female beneficiaries.",
        "Drafted timeline, budgets, and milestones for modular website upgrading."
      ],
      kpi: "Goal: Scope technology across 3+ rural initiatives"
    },
    delivery: {
      title: "Agile Development & Timeline Coordination",
      bullets: [
        "Led a cross-functional team of volunteers to rebuild database nodes.",
        "Monitored progress, tracked deliverable status, and resolved pipeline roadblocks.",
        "Prepared release updates for foundation leadership and community partners."
      ],
      kpi: "Timeline: Redesign delivery within 2 months"
    },
    impact: {
      title: "Metrics & Stakeholder Feedback",
      bullets: [
        "Deployed platform. Monitored regional user traffic and data latency.",
        "Expanded program accessibility by 40% across remote regions.",
        "Produced adoption reports recommending future scalable tech paths."
      ],
      kpi: "Outcome: 500+ empowerment beneficiaries impacted"
    }
  };

  return (
    <div style={{ background: "var(--bg-input)", borderRadius: "12px", padding: "16px", border: "1px solid var(--border-subtle)", marginTop: "12px", position: "relative", zIndex: 10 }}>
      <div style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>PRODUCT PLAYBOOK</div>
      <div style={{ fontSize: "14px", fontWeight: 800, marginBottom: "10px", color: "var(--text-main)", fontFamily: "var(--font-display)" }}>NGO Digital Transformation Timeline</div>

      <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
        {(["scoping", "delivery", "impact"] as const).map(p => (
          <button
            key={p}
            onClick={() => setActivePhase(p)}
            style={{
              flex: 1,
              background: activePhase === p ? `${accent}14` : "var(--bg-card)",
              border: `1px solid ${activePhase === p ? accent : "var(--border-subtle)"}`,
              color: activePhase === p ? "var(--text-main)" : "var(--text-muted)",
              padding: "5px 6px", borderRadius: "6px", fontSize: "11px", cursor: "pointer",
              fontWeight: 700, textTransform: "capitalize"
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "8px", padding: "12px" }}>
        <div style={{ fontSize: "12.5px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>{content[activePhase].title}</div>
        <ul style={{ paddingLeft: "14px", margin: "0 0 10px 0", fontSize: "11.5px", color: "var(--text-muted)", lineHeight: 1.45 }}>
          {content[activePhase].bullets.map((b, idx) => (
            <li key={idx} style={{ marginBottom: "4px" }}>{b}</li>
          ))}
        </ul>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", color: "var(--text-faint)", fontWeight: 700 }}>PM FOCUS</span>
          <span style={{ fontSize: "10.5px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#10b981" }}>{content[activePhase].kpi}</span>
        </div>
      </div>
    </div>
  );
}