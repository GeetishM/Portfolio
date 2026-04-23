"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Aurora",
    category: "AI/ML",
    period: "Oct 2025 – Apr 2026",
    desc: "Multilingual RAG-based conversational AI for women's healthcare guidance supporting 29 languages including 22 Indian regional languages.",
    metrics: [
      { label: "Answer Relevancy", value: "93.7%" },
      { label: "Context Precision", value: "89.8%" },
      { label: "Languages", value: "29" },
      { label: "Faithfulness", value: "78.3%" },
    ],
    tags: ["RAG", "LangChain", "Qdrant", "FastAPI", "Flutter", "Groq", "Whisper", "RAGAS"],
    color: "#a78bfa",
    github: "https://github.com/GeetishM",
    highlight: true,
  },
  {
    title: "ResQVision",
    category: "AI/ML",
    period: "Apr 2025 – Sep 2025",
    desc: "Real-time accident detection system using YOLOv8 and OpenCV trained on 5,000+ annotated frames for reliable automated alerts.",
    metrics: [
      { label: "mAP Score", value: "91%" },
      { label: "Frame Latency", value: "0.2s" },
      { label: "Training Frames", value: "5,000+" },
      { label: "Detection", value: "Real-time" },
    ],
    tags: ["YOLOv8", "OpenCV", "Python", "Computer Vision", "IEEE"],
    color: "#f87171",
    github: "https://github.com/GeetishM",
    highlight: false,
  },
  {
    title: "EmotionXtract",
    category: "AI/ML",
    period: "Sep 2024 – Dec 2024",
    desc: "CNN-based facial emotion detection system trained on 35,000 samples achieving 79% accuracy across 7 emotion classes.",
    metrics: [
      { label: "Accuracy", value: "79%" },
      { label: "Training Samples", value: "35,000" },
      { label: "Model", value: "CNN" },
      { label: "Framework", value: "Keras" },
    ],
    tags: ["CNN", "TensorFlow", "Keras", "OpenCV", "Python"],
    color: "#fbbf24",
    github: "https://github.com/GeetishM",
    highlight: false,
  },
  {
    title: "MindSarthi",
    category: "App",
    period: "Apr 2024 – Sep 2024",
    desc: "Scalable Flutter mental wellness app with MVVM architecture, Firebase Auth, Hive state management and Gemini API chatbot integration.",
    metrics: [
      { label: "Latency Reduction", value: "20%" },
      { label: "Architecture", value: "MVVM" },
      { label: "AI", value: "Gemini" },
      { label: "Storage", value: "Hive" },
    ],
    tags: ["Flutter", "Firebase", "Hive", "Gemini API", "Figma"],
    color: "#34d399",
    github: "https://github.com/GeetishM",
    highlight: false,
  },
  {
    title: "Customer Trends Analysis",
    category: "Data",
    period: "Nov 2025 – Dec 2025",
    desc: "Analyzed 4,000+ customer records using Python and MySQL, built interactive Power BI dashboards to identify key purchasing patterns.",
    metrics: [
      { label: "Records Analyzed", value: "4,000+" },
      { label: "Tool", value: "Power BI" },
      { label: "Database", value: "MySQL" },
      { label: "Library", value: "Pandas" },
    ],
    tags: ["Python", "Pandas", "MySQL", "Power BI", "Jupyter"],
    color: "#67e8f9",
    github: "https://github.com/GeetishM",
    highlight: false,
  },
  {
    title: "BSP Materials System",
    category: "App",
    period: "May 2025 – Jun 2025",
    desc: "Migrated legacy JSP-based materials management to full-stack Django app monitoring 300,000+ procurement records with Excel-to-SQL pipeline.",
    metrics: [
      { label: "Records", value: "300K+" },
      { label: "Efficiency Gain", value: "60%" },
      { label: "Accessibility", value: "+40%" },
      { label: "Stack", value: "Django" },
    ],
    tags: ["Django", "MySQL", "Bootstrap", "Chart.js", "Python"],
    color: "#fb923c",
    github: "https://github.com/GeetishM",
    highlight: false,
  },
];

const filters = ["All", "AI/ML", "App", "Data"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" style={{ background: "#09090b", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Projects</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#fafafa", letterSpacing: "-1px" }}
          >
            Things I've built
          </motion.h2>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, background: "#111113", border: "1px solid #1c1c1e", borderRadius: 10, padding: 4 }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 7,
                  border: "none",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: active === f ? "#7c3aed" : "transparent",
                  color: active === f ? "#fff" : "#71717a",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid-2col">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: "#111113",
                  border: `1px solid ${project.highlight ? `${project.color}30` : "#1c1c1e"}`,
                  borderRadius: 16,
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${project.color}50`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = project.highlight ? `${project.color}30` : "#1c1c1e";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Glow top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)`, borderRadius: "16px 16px 0 0" }} />

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{project.title}</span>
                      {project.highlight && (
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40`, fontWeight: 600 }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: "#3f3f46" }}>{project.period}</span>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 32, height: 32, borderRadius: 8,
                      border: "1px solid #27272a",
                      background: "rgba(39,39,42,0.5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#71717a", textDecoration: "none", fontSize: 14,
                      transition: "all 0.2s", flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}60`; e.currentTarget.style.color = project.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#71717a"; }}
                  >
                    ↗
                  </a>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7, marginBottom: 16 }}>
                  {project.desc}
                </p>

                {/* Metrics */}
                <div className="grid-4col" style={{ marginBottom: 16 }}>
                  {project.metrics.map(({ label, value }) => (
                    <div key={label} style={{ background: "#0d0d0f", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: project.color }}>{value}</div>
                      <div style={{ fontSize: 10, color: "#3f3f46", marginTop: 2, lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, padding: "3px 10px", borderRadius: 999,
                      border: "1px solid #27272a", color: "#52525b",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}