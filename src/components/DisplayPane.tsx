"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ViewState, projects, experiences, skills, flutterSpring } from "./data";

interface DisplayPaneProps {
  activeView: ViewState;
  mobileDisplayOpen: boolean;
  onCloseMobile: () => void;
}

export default function DisplayPane({ activeView, mobileDisplayOpen, onCloseMobile }: DisplayPaneProps) {
  return (
    <section className={`pane-display ${mobileDisplayOpen ? 'mobile-open' : ''}`} style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg-display)", overflow: "hidden" }}>
      {/* Mobile-only drag handle */}
      <div className="mobile-only-flex" style={{ padding: "12px 20px", background: "var(--bg-header)", borderBottom: "1px solid var(--border-subtle)", justifyContent: "center", position: "relative", zIndex: 50 }}>
        <button onClick={onCloseMobile} style={{ position: "absolute", left: "20px", background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>↓ Close</button>
        <div style={{ width: "40px", height: "4px", background: "var(--text-muted)", borderRadius: "99px", opacity: 0.5 }} />
      </div>

      <div style={{ flex: 1, padding: "clamp(20px, 4vw, 60px)", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          
          {/* HERO VIEW */}
          {activeView === "hero" && (
            <motion.div key="hero" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={flutterSpring}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, ...flutterSpring }} style={{ display: "inline-block", padding: "6px 16px", background: "rgba(0, 255, 150, 0.1)", border: "1px solid rgba(0, 255, 150, 0.3)", color: "#00ff96", borderRadius: "99px", fontSize: "12px", fontWeight: 600, marginBottom: "24px" }}>
                Status: Available for hire
              </motion.div>
              <h2 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-2px", marginBottom: "20px", color: "var(--text-main)" }}>
                Geetish <span style={{ background: "linear-gradient(135deg, #a78bfa, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mahato</span>
              </h2>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.6, marginBottom: "40px" }}>
                AI/ML Engineer & Flutter Developer. Building intelligent systems that scale, from 29-language RAG pipelines to real-time computer vision models.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[{ val: "93.7%", lbl: "RAG Relevancy", col: "#a78bfa" }, { val: "91%", lbl: "YOLOv8 mAP", col: "#38bdf8" }, { val: "4×", lbl: "Hackathon Wins", col: "#fbbf24" }].map(stat => (
                  <motion.div whileHover={{ y: -5 }} transition={flutterSpring} key={stat.lbl} style={{ flex: 1, background: "var(--bg-card)", backdropFilter: "blur(10px)", padding: "20px", borderRadius: "24px", border: "1px solid var(--border-subtle)", boxShadow: "0 8px 32px rgba(0,0,0,0.05)", minWidth: "140px" }}>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: stat.col }}>{stat.val}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" }}>{stat.lbl}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROJECTS VIEW */}
          {activeView === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)" }}>Core Architecture</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
                {projects.map((p, i) => (
                  <motion.div whileHover={{ scale: 1.02 }} key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, ...flutterSpring }} style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: `1px solid var(--border-subtle)`, borderRadius: "24px", padding: "28px", boxShadow: "0 8px 32px rgba(0,0,0,0.05)", borderTop: `2px solid ${p.color}` }}>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px" }}>{p.title}</div>
                    <div style={{ display: "inline-block", background: `${p.color}15`, color: p.color, fontSize: "12px", padding: "6px 12px", borderRadius: "99px", fontWeight: 600, marginBottom: "16px" }}>{p.metric}</div>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>{p.desc}</p>
                    <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "1px", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>{p.tech}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE VIEW */}
          {activeView === "experience" && (
            <motion.div key="exp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)" }}>Execution Timeline</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {experiences.map((exp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, ...flutterSpring }} style={{ display: "flex", alignItems: "flex-start", gap: "20px", background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-subtle)", borderRadius: "24px", padding: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: exp.color, boxShadow: `0 0 16px ${exp.color}50`, marginTop: "4px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)" }}>{exp.role}</div>
                      <div style={{ fontSize: "14px", color: exp.color, marginBottom: "8px", fontWeight: 600 }}>{exp.org}</div>
                      <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "12px" }}>{exp.desc}</div>
                      <div style={{ display: "inline-block", fontSize: "12px", color: "var(--text-faint)", fontWeight: 600, background: "var(--bg-input)", padding: "4px 12px", borderRadius: "99px" }}>{exp.period}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SKILLS VIEW */}
          {activeView === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)" }}>System Capabilities</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {skills.map((skill, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, ...flutterSpring }} style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-subtle)", borderRadius: "24px", padding: "24px", borderLeft: `6px solid ${skill.color}`, boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)", marginBottom: "12px" }}>{skill.category}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {skill.items.split(', ').map(item => (
                        <span key={item} style={{ fontSize: "13px", background: "var(--bg-input)", padding: "6px 14px", borderRadius: "12px", color: "var(--text-muted)" }}>{item}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT VIEW */}
          {activeView === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={flutterSpring} style={{ textAlign: "center", padding: "20px 0" }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(56, 189, 248, 0.1))", border: "2px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 32px", boxShadow: "0 16px 40px rgba(124, 58, 237, 0.1)" }}>👋</motion.div>
              <h3 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-1px", color: "var(--text-main)" }}>Initialize Connection</h3>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "var(--text-muted)", maxWidth: "440px", margin: "0 auto 48px", lineHeight: 1.6 }}>Ready to bring production-grade AI and scalable mobile development to your team.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:geetish.mahato.19@gmail.com" style={{ background: "linear-gradient(135deg, #7c3aed, #38bdf8)", color: "#fff", padding: "18px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 700, width: "100%", maxWidth: "320px", boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)" }}>geetish.mahato.19@gmail.com</motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} href="https://linkedin.com/in/geetish-mahato" target="_blank" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", padding: "18px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 600, width: "100%", maxWidth: "320px" }}>LinkedIn Profile ↗</motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} href="https://github.com/GeetishM" target="_blank" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", padding: "18px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 600, width: "100%", maxWidth: "320px" }}>GitHub Repository ↗</motion.a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}