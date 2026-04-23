"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{ minHeight: "100vh", background: "#09090b" }}
      className="relative flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Purple glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Cyan glow */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "30%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, width: "100%", margin: "0 auto", textAlign: "center" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
        >
          <span style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, color: "#c4b5fd",
            border: "1px solid rgba(139,92,246,0.25)",
            background: "rgba(139,92,246,0.06)",
            padding: "6px 16px", borderRadius: 999,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 6px #34d399",
              animation: "pulse 2s infinite",
            }} />
            Open to internships &amp; full-time roles
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-2px", marginBottom: 24, lineHeight: 1.1 }}
        >
          <span style={{ color: "#ffffff" }}>Geetish </span>
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mahato
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#71717a", marginBottom: 24, height: 40 }}
        >
          <TypeAnimation
            sequence={[
              "ML Engineer & RAG Systems Developer", 2000,
              "Computer Vision Specialist", 2000,
              "Flutter & FastAPI Developer", 2000,
              "Data Analytics Engineer", 2000,
              "IEEE Chairperson & Hackathon Winner", 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ color: "#52525b", fontSize: "clamp(14px, 1.8vw, 17px)", maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.8 }}
        >
          Building production-grade AI systems — from multilingual RAG pipelines
          to real-time computer vision. BIT Durg CSE (AI) · GPA 8.28 · 4× Award winner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}
        >
          <a href="#projects" style={{
            padding: "11px 28px", borderRadius: 12,
            background: "#7c3aed", color: "#fff",
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
            onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
          >
            View Projects
          </a>
          <a href="#contact" style={{
            padding: "11px 28px", borderRadius: 12,
            border: "1px solid #3f3f46", color: "#a1a1aa",
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.color = "#c4b5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
          >
            Get in Touch
          </a>
          <a href="/resume.pdf" target="_blank" style={{
            padding: "11px 28px", borderRadius: 12,
            border: "1px solid #3f3f46", color: "#a1a1aa",
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.color = "#c4b5fd"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
          >
            Resume ↗
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: "flex", justifyContent: "center", gap: 16 }}
        >
          <a
            href="https://github.com/GeetishM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: "1px solid #27272a",
              background: "rgba(39,39,42,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#71717a", textDecoration: "none", transition: "all 0.2s",
            }}
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/geetish-mahato"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: "1px solid #27272a",
              background: "rgba(39,39,42,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#71717a", textDecoration: "none", transition: "all 0.2s",
            }}
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:geetish.mahato.19@gmail.com"
            aria-label="Email"
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: "1px solid #27272a",
              background: "rgba(39,39,42,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#71717a", textDecoration: "none", transition: "all 0.2s",
            }}
          >
            <Mail size={18} />
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute", bottom: 32,
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "#3f3f46",
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

    </section>
  );
}