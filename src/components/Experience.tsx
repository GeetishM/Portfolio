"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "AI/ML Intern",
    org: "IEEE Computer Society, Bangalore Chapter",
    period: "Apr 2025 – Sep 2025",
    type: "Remote",
    color: "#a78bfa",
    points: [
      "Engineered ResQVision using YOLOv8 and OpenCV, trained on 5,000+ annotated frames",
      "Achieved 91% mAP and 0.2s per-frame detection latency for real-time accident alerts",
    ],
    tags: ["YOLOv8", "OpenCV", "Python", "Computer Vision"],
  },
  {
    role: "Full-Stack Django Intern",
    org: "Bhilai Steel Plant",
    period: "May 2025 – Jun 2025",
    type: "On-site · Bhilai",
    color: "#f87171",
    points: [
      "Migrated legacy JSP system to modular Django app monitoring 300,000+ procurement records",
      "Improved data processing efficiency by 60% and data accessibility by 40% via Excel-to-SQL pipeline",
    ],
    tags: ["Django", "MySQL", "Bootstrap", "Chart.js", "HTML5"],
  },
  {
    role: "Flutter Developer Intern",
    org: "Me Matdar",
    period: "Jan 2025 – Mar 2025",
    type: "Remote",
    color: "#34d399",
    points: [
      "Enhanced live Political Digital Marketing product by optimizing 3+ core features",
      "Reduced app load time by 30% using lazy loading, pagination and Riverpod state management",
    ],
    tags: ["Flutter", "Riverpod", "Dart", "REST APIs"],
  },
];

const awards = [
  { title: "BitShine Hackathon", result: "1st Place", org: "Feb 2025", color: "#fbbf24", icon: "🥇" },
  { title: "IEEE ESG Symposium", result: "1st Place", org: "Oct 2024", color: "#fbbf24", icon: "🥇" },
  { title: "Hacksagon", result: "Top Performing Team", org: "Jun 2025", color: "#a78bfa", icon: "🏆" },
  { title: "IEEE Leadership in AI", result: "Best Presentation", org: "Oct 2024", color: "#67e8f9", icon: "🎤" },
];

const leadership = [
  { role: "IEEE Student Branch Chairperson", desc: "Managing 30+ members, achieved 200%+ retention rate", color: "#a78bfa" },
  { role: "IEEE SIGHT Project Coordinator", desc: "Driving social innovation and community tech programs", color: "#34d399" },
  { role: "IEEE WIE Webmaster", desc: "Managing digital presence for Women in Engineering chapter", color: "#f472b6" },
  { role: "CSE Student Association VP", desc: "Vice-President representing 200+ CS students", color: "#67e8f9" },
  { role: "STEAM SPARK Lead", desc: "Spearheaded STEM outreach program for inclusive education", color: "#fbbf24" },
];

export default function Experience() {
  return (
    <section id="experience" style={{ background: "#09090b", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Experience</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#fafafa", letterSpacing: "-1px", marginBottom: 48 }}
        >
          Where I've worked
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: "relative", marginBottom: 80 }}>
          <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, #7c3aed, transparent)" }} />

          {experiences.map(({ role, org, period, type, color, points, tags }, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "flex", gap: 32, marginBottom: 40, paddingLeft: 8 }}
            >
              {/* Dot */}
              <div style={{ flexShrink: 0, marginTop: 6 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: color,
                  border: "3px solid #09090b",
                  boxShadow: `0 0 12px ${color}80`,
                  position: "relative", zIndex: 1,
                }} />
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                background: "#111113",
                border: "1px solid #1c1c1e",
                borderRadius: 16,
                padding: "24px",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1c1c1e")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginBottom: 2 }}>{role}</div>
                    <div style={{ fontSize: 13, color, fontWeight: 600 }}>{org}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#52525b" }}>{period}</div>
                    <div style={{ fontSize: 11, color: "#3f3f46" }}>{type}</div>
                  </div>
                </div>

                <ul style={{ paddingLeft: 16, marginBottom: 16 }}>
                  {points.map((pt, pi) => (
                    <li key={pi} style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7, marginBottom: 4 }}>{pt}</li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, padding: "3px 10px", borderRadius: 999,
                      border: "1px solid #27272a", color: "#52525b",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Awards</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 64 }}>
          {awards.map(({ title, result, org, color, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: "#111113",
                border: "1px solid #1c1c1e",
                borderRadius: 14,
                padding: "20px 16px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#1c1c1e";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e4e4e7", marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color, fontWeight: 600, marginBottom: 4 }}>{result}</div>
              <div style={{ fontSize: 11, color: "#3f3f46" }}>{org}</div>
            </motion.div>
          ))}
        </div>

        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed", fontWeight: 600 }}>Leadership</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {leadership.map(({ role, desc, color }, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: "#111113",
                border: "1px solid #1c1c1e",
                borderRadius: 12,
                padding: "16px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#1c1c1e")}
            >
              <div style={{ width: 3, height: "100%", minHeight: 40, background: color, borderRadius: 999, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e4e4e7", marginBottom: 4 }}>{role}</div>
                <div style={{ fontSize: 12, color: "#52525b", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}