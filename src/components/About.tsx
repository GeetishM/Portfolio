"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8.28", label: "GPA", sub: "BIT Durg CSE (AI)" },
  { value: "91%", label: "mAP", sub: "ResQVision (YOLOv8)" },
  { value: "93.7%", label: "Relevancy", sub: "Aurora RAG system" },
  { value: "4×", label: "Awards", sub: "Hackathons & IEEE" },
];

const highlights = [
  { emoji: "🤖", title: "Generative AI & RAG", desc: "Built Aurora — a multilingual RAG system supporting 29 languages with 93.7% answer relevancy using LangChain, Qdrant & Groq." },
  { emoji: "👁️", title: "Computer Vision", desc: "Engineered ResQVision using YOLOv8 achieving 91% mAP and 0.2s per-frame latency for real-time accident detection." },
  { emoji: "📱", title: "Flutter & Mobile", desc: "Developed production Flutter apps with MVVM, Firebase, Riverpod and Gemini API integration used by real users." },
  { emoji: "📊", title: "Data Analytics", desc: "Analyzed 4,000+ customer records using Python, MySQL and Power BI to deliver actionable business insights." },
];

export default function About() {
  return (
    <section id="about" style={{ background: "#09090b", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>About</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        {/* Main grid */}
        <div className="grid-2col" style={{ alignItems: "start" }}>

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#fafafa", letterSpacing: "-1px", marginBottom: 20, lineHeight: 1.2 }}>
              Building AI systems that{" "}
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                actually work
              </span>
            </h2>

            <p style={{ color: "#71717a", fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              I'm a final-year CSE (AI) student at BIT Durg with a deep focus on production-grade machine learning systems. My work spans RAG pipelines, computer vision, mobile development, and data analytics — always with an emphasis on real-world performance and scalability.
            </p>

            <p style={{ color: "#71717a", fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
              As IEEE Student Branch Chairperson managing 30+ members, I've led technical workshops, social impact programs like STEAM SPARK, and represented our branch at national symposiums — winning multiple awards along the way.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["BIT Durg · CSE (AI)", "IEEE Chairperson", "GPA 8.28", "Bhilai, India"].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, padding: "4px 12px", borderRadius: 999,
                  border: "1px solid #27272a", color: "#52525b",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stats + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats grid */}
            <div className="grid-2col" style={{ marginBottom: 24 }}>
              {stats.map(({ value, label, sub }) => (
                <div key={label} style={{
                  background: "#111113",
                  border: "1px solid #1c1c1e",
                  borderRadius: 12,
                  padding: "20px 16px",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1c1c1e")}
                >
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#a78bfa", letterSpacing: "-1px" }}>{value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e4e4e7", marginTop: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#52525b", marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {highlights.map(({ emoji, title, desc }) => (
                <div key={title} style={{
                  background: "#111113",
                  border: "1px solid #1c1c1e",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1c1c1e")}
                >
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e4e4e7", marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "#52525b", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}