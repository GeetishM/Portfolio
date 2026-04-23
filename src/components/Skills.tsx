"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "AI / ML",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch / Keras", level: 80 },
      { name: "YOLOv8", level: 90 },
      { name: "LangChain", level: 88 },
      { name: "LangGraph", level: 75 },
      { name: "OpenCV", level: 88 },
      { name: "Qdrant", level: 82 },
      { name: "RAGAS", level: 78 },
    ],
  },
  {
    category: "Backend & APIs",
    color: "#67e8f9",
    glow: "rgba(103,232,249,0.15)",
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "Django", level: 82 },
      { name: "Flask", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "REST APIs", level: 90 },
      { name: "WebSockets", level: 78 },
    ],
  },
  {
    category: "Mobile & Frontend",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    skills: [
      { name: "Flutter", level: 88 },
      { name: "React Native", level: 72 },
      { name: "React / Next.js", level: 75 },
      { name: "Riverpod", level: 82 },
      { name: "Firebase", level: 85 },
      { name: "Figma", level: 75 },
    ],
  },
  {
    category: "Data & Analytics",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.15)",
    skills: [
      { name: "Python / Pandas", level: 92 },
      { name: "Power BI", level: 80 },
      { name: "Tableau", level: 75 },
      { name: "MySQL / SQLite", level: 85 },
      { name: "NumPy / Matplotlib", level: 88 },
      { name: "Jupyter", level: 90 },
    ],
  },
];

const languages = ["Python", "C++", "C", "Java", "Dart", "JavaScript", "TypeScript", "SQL"];
const tools = ["GitHub", "Linux", "Figma", "AutoCAD", "Fusion360", "Mediapipe", "Streamlit", "Groq", "Ollama"];

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#09090b", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Skills</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#fafafa", letterSpacing: "-1px", marginBottom: 48 }}
        >
          Technical expertise
        </motion.h2>

        {/* Skill groups grid */}
        <div className="grid-2col" style={{ marginBottom: 40 }}>
          {skillGroups.map(({ category, color, glow, skills }, gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              style={{
                background: "#111113",
                border: "1px solid #1c1c1e",
                borderRadius: 16,
                padding: "24px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#1c1c1e")}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#e4e4e7" }}>{category}</span>
              </div>

              {/* Skill bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {skills.map(({ name, level }, si) => (
                  <div key={name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "#71717a" }}>{name}</span>
                      <span style={{ fontSize: 11, color: "#3f3f46" }}>{level}%</span>
                    </div>
                    <div style={{ height: 3, background: "#1c1c1e", borderRadius: 999, overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: si * 0.05, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          background: `linear-gradient(90deg, ${color}99, ${color})`,
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#111113",
            border: "1px solid #1c1c1e",
            borderRadius: 16,
            padding: "24px",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "#52525b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Languages</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {languages.map(lang => (
              <span key={lang} style={{
                fontSize: 13, padding: "6px 16px", borderRadius: 999,
                border: "1px solid #27272a", color: "#a1a1aa",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"; e.currentTarget.style.color = "#a78bfa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "#111113",
            border: "1px solid #1c1c1e",
            borderRadius: 16,
            padding: "24px",
          }}
        >
          <div style={{ fontSize: 12, color: "#52525b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Tools & Platforms</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tools.map(tool => (
              <span key={tool} style={{
                fontSize: 13, padding: "6px 16px", borderRadius: 999,
                border: "1px solid #27272a", color: "#a1a1aa",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(103,232,249,0.4)"; e.currentTarget.style.color = "#67e8f9"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}