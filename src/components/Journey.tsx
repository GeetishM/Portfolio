"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const chapters = [
  {
    year: "2022",
    era: "The Beginning",
    color: "#34d399",
    icon: "📱",
    title: "Discovered Flutter",
    desc: "Started mobile development journey. Built first cross-platform apps. Fell in love with beautiful UI.",
    tags: ["Flutter", "Dart", "Firebase", "Figma"],
    metric: { v: "3+", l: "Apps Built" },
    side: "left",
  },
  {
    year: "2022",
    era: "Academia",
    color: "#a78bfa",
    icon: "🎓",
    title: "Joined BIT Durg CSE(AI)",
    desc: "Enrolled in AI specialization. Started thinking about machines that learn. GPA 8.28 maintained throughout.",
    tags: ["Python", "C++", "Data Structures", "Algorithms"],
    metric: { v: "8.28", l: "GPA" },
    side: "right",
  },
  {
    year: "2023",
    era: "Leadership",
    color: "#f472b6",
    icon: "⚡",
    title: "IEEE Chairperson",
    desc: "Became Student Branch Chairperson. Managed 30+ members. Achieved 200%+ retention. Led STEAM SPARK outreach.",
    tags: ["IEEE", "Leadership", "SIGHT", "WIE", "STEAM SPARK"],
    metric: { v: "30+", l: "Members Led" },
    side: "left",
  },
  {
    year: "2024",
    era: "AI/ML Era",
    color: "#fbbf24",
    icon: "🤖",
    title: "Entered Computer Vision",
    desc: "Built EmotionXtract — CNN emotion detection on 35K samples. Won IEEE ESG Symposium 1st Place.",
    tags: ["CNN", "TensorFlow", "Keras", "OpenCV", "IEEE 1st"],
    metric: { v: "79%", l: "CNN Accuracy" },
    side: "right",
  },
  {
    year: "2024",
    era: "Hackathons",
    color: "#f87171",
    icon: "🏆",
    title: "Hackathon Wins Begin",
    desc: "BitShine Hackathon 1st place. IEEE Leadership in AI Best Presentation. Started competing seriously.",
    tags: ["BitShine 1st", "IEEE Best Pres", "Full-Stack", "Django"],
    metric: { v: "4×", l: "Awards Won" },
    side: "left",
  },
  {
    year: "2025",
    era: "Production AI",
    color: "#38bdf8",
    icon: "👁️",
    title: "ResQVision — YOLOv8",
    desc: "Trained on 5,000+ annotated frames. 91% mAP. 0.2s latency. Real-time accident detection for IEEE CS Bangalore.",
    tags: ["YOLOv8", "OpenCV", "IEEE CS", "91% mAP", "0.2s"],
    metric: { v: "91%", l: "mAP Score" },
    side: "right",
  },
  {
    year: "2025",
    era: "Enterprise",
    color: "#fb923c",
    icon: "🏭",
    title: "Bhilai Steel Plant Intern",
    desc: "Migrated legacy JSP → Django. 300,000+ procurement records. 60% efficiency gain. Real enterprise impact.",
    tags: ["Django", "MySQL", "Bootstrap", "300K+ records"],
    metric: { v: "60%", l: "Efficiency Gain" },
    side: "left",
  },
  {
    year: "2026",
    era: "RAG Systems",
    color: "#a78bfa",
    icon: "🌐",
    title: "Aurora — Magnum Opus",
    desc: "Multilingual RAG for women's healthcare. 29 languages. 93.7% relevancy. LangChain + Qdrant + Groq + Flutter.",
    tags: ["RAG", "LangChain", "Qdrant", "Groq", "29 langs", "93.7%"],
    metric: { v: "93.7%", l: "RAG Relevancy" },
    side: "right",
  },
];

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{
      display: "flex",
      justifyContent: chapter.side === "left" ? "flex-start" : "flex-end",
      marginBottom: 0,
      position: "relative",
    }}>
      <motion.div
        initial={{ opacity: 0, x: chapter.side === "left" ? -80 : 80, rotateY: chapter.side === "left" ? -15 : 15 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 80 }}
        whileHover={{ scale: 1.02, rotateY: chapter.side === "left" ? 3 : -3, z: 30 }}
        style={{
          width: "44%",
          background: "rgba(10,10,15,0.9)",
          border: `1px solid ${chapter.color}30`,
          borderRadius: 20,
          padding: "24px",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          cursor: "default",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top glow bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${chapter.color}, transparent)` }} />

        {/* Background glow */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: `radial-gradient(circle, ${chapter.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{chapter.icon}</span>
              <span style={{ fontSize: 10, color: chapter.color, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{chapter.era}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{chapter.title}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: chapter.color }}>{chapter.metric.v}</div>
            <div style={{ fontSize: 9, color: "#333", marginTop: 1 }}>{chapter.metric.l}</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7, marginBottom: 14 }}>{chapter.desc}</p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {chapter.tags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, border: `1px solid ${chapter.color}25`, color: chapter.color, background: `${chapter.color}08` }}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Center dot connector */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{
          width: 48, height: 48,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${chapter.color}40, ${chapter.color}10)`,
          border: `2px solid ${chapter.color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
          boxShadow: `0 0 20px ${chapter.color}50, 0 0 40px ${chapter.color}20`,
        }}>
          {chapter.icon}
        </div>
        <div style={{ fontSize: 10, color: chapter.color, fontWeight: 700, marginTop: 4, letterSpacing: "1px" }}>{chapter.year}</div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Tunnel canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, animId: number, t = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rings: { z: number; color: string }[] = Array.from({ length: 20 }, (_, i) => ({
      z: i / 20,
      color: ["#7c3aed", "#2563eb", "#0891b2", "#059669"][i % 4],
    }));

    const drawTunnel = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      rings.forEach((ring, i) => {
        ring.z = (ring.z + 0.003) % 1;
        const perspective = 1 - ring.z;
        const size = perspective * Math.min(W, H) * 0.5;
        const alpha = perspective * 0.15;

        ctx.beginPath();
        ctx.ellipse(cx, cy, size, size * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Ring dots
        for (let d = 0; d < 8; d++) {
          const angle = (d / 8) * Math.PI * 2 + t * 0.2 * (i % 2 === 0 ? 1 : -1);
          const dx = Math.cos(angle) * size;
          const dy = Math.sin(angle) * size * 0.5;
          ctx.beginPath();
          ctx.arc(cx + dx, cy + dy, perspective * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = ring.color + Math.floor(alpha * 2 * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
      });

      // Central glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      grd.addColorStop(0, "rgba(124,58,237,0.08)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      t += 0.01;
      animId = requestAnimationFrame(drawTunnel);
    };
    drawTunnel();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="journey" ref={sectionRef} style={{ background: "#000", position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      {/* Tunnel background */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />

      {/* Vertical spine line */}
      <div style={{ position: "absolute", left: "50%", top: 120, bottom: 80, width: 1, background: "linear-gradient(180deg,transparent,#7c3aed,#38bdf8,#00ff96,transparent)", transform: "translateX(-50%)", zIndex: 1 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 5 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div style={{ fontSize: 10, color: "#7c3aed", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>
            ◈ THE STORY SO FAR
          </div>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-2px", color: "#fff", lineHeight: 1.05, marginBottom: 14 }}>
            My{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8,#00ff96)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Journey
            </span>
          </h2>
          <p style={{ fontSize: 14, color: "#444", maxWidth: 480, margin: "0 auto" }}>
            From mobile apps to production AI — every step, every win, every late night commit.
          </p>
        </motion.div>

        {/* Chapters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 60, perspective: "1000px" }}>
          {chapters.map((chapter, i) => (
            <ChapterCard key={i} chapter={chapter} index={i} />
          ))}
        </div>

        {/* End node */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ textAlign: "center", marginTop: 60, position: "relative", zIndex: 10 }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(124,58,237,0.4),rgba(124,58,237,0.05))",
            border: "2px solid #7c3aed",
            margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28,
            boxShadow: "0 0 40px rgba(124,58,237,0.4)",
          }}>
            🚀
          </div>
          <div style={{ fontSize: 13, color: "#7c3aed", fontWeight: 700, letterSpacing: "2px", marginBottom: 6 }}>CHAPTER NEXT</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Writing the future...</div>
          <div style={{ fontSize: 12, color: "#444" }}>Final year · Graduating 2026 · Open to full-time</div>
        </motion.div>

      </div>
    </section>
  );
}