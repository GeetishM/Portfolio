"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewState, projects, experiences, skills, flutterSpring } from "./data";

interface DisplayPaneProps {
  activeView: ViewState;
  mobileDisplayOpen: boolean;
  onCloseMobile: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: flutterSpring }
};

export default function DisplayPane({ activeView, mobileDisplayOpen, onCloseMobile }: DisplayPaneProps) {
  // --- DRAG GESTURE STATE ---
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);

  const onDragStart = (y: number) => {
    dragStartY.current = y;
  };

  const onDragMove = (y: number) => {
    if (dragStartY.current === null) return;
    const dy = y - dragStartY.current;
    // Only allow dragging downwards
    if (dy > 0) {
      setDragOffset(dy);
    }
  };

  const onDragEnd = () => {
    // If pulled down more than 100px, close the sheet
    if (dragOffset > 100) {
      onCloseMobile();
    }
    // Reset state so it snaps back or animates out smoothly
    setDragOffset(0);
    dragStartY.current = null;
  };

  return (
    <section 
      className={`pane-display bg-grid-pattern ${mobileDisplayOpen ? 'mobile-open' : ''}`} 
      style={{ 
        flex: 1, display: "flex", flexDirection: "column", background: "var(--bg-display)", 
        overflow: "hidden", position: "relative",
        // Apply 1:1 finger tracking when dragging, fallback to CSS when released
        transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
        transition: dragOffset > 0 ? "none" : undefined
      }}
    >
      
      {/* Ambient Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "-10%", right: "-10%", width: "600px", height: "600px", background: "var(--accent-glow)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} 
      />

      {/* MOBILE DRAG HANDLE (Native iOS Style) */}
      <div 
        className="mobile-only-flex" 
        style={{ 
          padding: "16px 20px", 
          background: "var(--bg-header)", 
          backdropFilter: "blur(20px)", 
          borderBottom: "1px solid var(--border-subtle)", 
          justifyContent: "center", 
          position: "relative", 
          zIndex: 50,
          cursor: "grab",
          touchAction: "none" // Prevents the page from scrolling while dragging the handle
        }}
        // Touch events for mobile
        onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
        onTouchEnd={onDragEnd}
        // Mouse events so you can test it on your laptop browser
        onMouseDown={(e) => onDragStart(e.clientY)}
        onMouseMove={(e) => { if (e.buttons === 1) onDragMove(e.clientY); }}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {/* The little pill indicator */}
        <div style={{ width: "48px", height: "5px", background: "var(--text-muted)", borderRadius: "99px", opacity: 0.5 }} />
      </div>

      <div style={{ flex: 1, padding: "clamp(20px, 5vw, 80px)", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">
          
          {/* HERO VIEW */}
          {activeView === "hero" && (
            <motion.div key="hero" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, filter: "blur(10px)" }} transition={flutterSpring}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, ...flutterSpring }} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", borderRadius: "99px", fontSize: "12px", fontWeight: 600, marginBottom: "24px", backdropFilter: "blur(10px)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff96", boxShadow: "0 0 10px #00ff96" }} />
                Status: Available for hire
              </motion.div>
              <h2 style={{ fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-3px", marginBottom: "24px", color: "var(--text-main)" }}>
                Geetish <span style={{ background: "linear-gradient(135deg, #7c3aed, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mahato</span>
              </h2>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.7, marginBottom: "48px" }}>
                AI/ML Engineer & Flutter Developer. Building intelligent systems that scale, from 29-language RAG pipelines to real-time computer vision models.
              </p>
              
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[{ val: "93.7%", lbl: "RAG Relevancy", col: "#a78bfa" }, { val: "91%", lbl: "YOLOv8 mAP", col: "#38bdf8" }, { val: "4×", lbl: "Hackathon Wins", col: "#fbbf24" }].map(stat => (
                  <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={flutterSpring} key={stat.lbl} style={{ flex: 1, background: "var(--bg-card)", backdropFilter: "blur(20px)", padding: "24px", borderRadius: "24px", border: "1px solid var(--border-card)", boxShadow: "var(--shadow-card)", minWidth: "140px" }}>
                    <div style={{ fontSize: "32px", fontWeight: 800, color: stat.col, letterSpacing: "-1px" }}>{stat.val}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "1px", marginTop: "6px", fontWeight: 600 }}>{stat.lbl}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* PROJECTS VIEW */}
          {activeView === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, filter: "blur(10px)" }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)", letterSpacing: "-1px" }}>Core Architecture</h3>
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {projects.map((p, i) => (
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.02, y: -5 }} key={i} style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", border: `1px solid var(--border-card)`, borderRadius: "24px", padding: "32px", boxShadow: "var(--shadow-card)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)", marginBottom: "12px", letterSpacing: "-0.5px" }}>{p.title}</div>
                    <div style={{ display: "inline-block", background: `${p.color}15`, color: p.color, fontSize: "12px", padding: "6px 12px", borderRadius: "99px", fontWeight: 700, marginBottom: "20px" }}>{p.metric}</div>
                    <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "24px" }}>{p.desc}</p>
                    <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "1px", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px", fontWeight: 600 }}>{p.tech}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* EXPERIENCE VIEW */}
          {activeView === "experience" && (
            <motion.div key="exp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, filter: "blur(10px)" }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)", letterSpacing: "-1px" }}>Execution Timeline</h3>
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {experiences.map((exp, i) => (
                  <motion.div variants={itemVariants} whileHover={{ x: 10 }} key={i} style={{ display: "flex", alignItems: "flex-start", gap: "24px", background: "var(--bg-card)", backdropFilter: "blur(20px)", border: "1px solid var(--border-card)", borderRadius: "24px", padding: "28px", boxShadow: "var(--shadow-card)" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: `${exp.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${exp.color}30` }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: exp.color, boxShadow: `0 0 20px ${exp.color}` }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{exp.role}</div>
                      <div style={{ fontSize: "15px", color: exp.color, marginBottom: "12px", fontWeight: 600 }}>{exp.org}</div>
                      <div style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.6 }}>{exp.desc}</div>
                      <div style={{ display: "inline-block", fontSize: "12px", color: "var(--text-faint)", fontWeight: 700, background: "var(--bg-input)", padding: "6px 14px", borderRadius: "99px", border: "1px solid var(--border-subtle)" }}>{exp.period}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* SKILLS VIEW */}
          {activeView === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, filter: "blur(10px)" }} transition={flutterSpring}>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: "32px", color: "var(--text-main)", letterSpacing: "-1px" }}>System Capabilities</h3>
              <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {skills.map((skill, i) => (
                  <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} key={i} style={{ background: "var(--bg-card)", backdropFilter: "blur(20px)", border: "1px solid var(--border-card)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", background: skill.color }} />
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", marginBottom: "16px", paddingLeft: "12px" }}>{skill.category}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingLeft: "12px" }}>
                      {skill.items.split(', ').map(item => (
                        <span key={item} style={{ fontSize: "14px", background: "var(--bg-input)", padding: "8px 16px", borderRadius: "12px", color: "var(--text-muted)", border: "1px solid var(--border-subtle)", fontWeight: 500 }}>{item}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* CONTACT VIEW */}
          {activeView === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} transition={flutterSpring} style={{ textAlign: "center", padding: "20px 0" }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(56, 189, 248, 0.1))", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", margin: "0 auto 40px", boxShadow: "var(--shadow-card)" }}>👋</motion.div>
              <h3 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, marginBottom: "20px", letterSpacing: "-2px", color: "var(--text-main)" }}>Initialize Connection</h3>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7 }}>Ready to bring production-grade AI and scalable mobile development to your team.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:geetish.mahato.19@gmail.com" style={{ background: "linear-gradient(135deg, #7c3aed, #38bdf8)", color: "#fff", padding: "20px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 800, width: "100%", maxWidth: "340px", boxShadow: "0 12px 30px rgba(124, 58, 237, 0.3)", fontSize: "16px" }}>geetish.mahato.19@gmail.com</motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} href="https://linkedin.com/in/geetish-mahato" target="_blank" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-card)", color: "var(--text-main)", padding: "18px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 600, width: "100%", maxWidth: "340px", fontSize: "15px" }}>LinkedIn Profile ↗</motion.a>
                <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} href="https://github.com/GeetishM" target="_blank" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-card)", color: "var(--text-main)", padding: "18px 32px", borderRadius: "99px", textDecoration: "none", fontWeight: 600, width: "100%", maxWidth: "340px", fontSize: "15px" }}>GitHub Repository ↗</motion.a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}