"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const chapters = [
  {
    year: "2022",
    era: "The Beginning",
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.4)",
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
    glowColor: "rgba(167,139,250,0.4)",
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
    glowColor: "rgba(244,114,182,0.4)",
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
    glowColor: "rgba(251,191,36,0.4)",
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
    glowColor: "rgba(248,113,113,0.4)",
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
    glowColor: "rgba(56,189,248,0.4)",
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
    glowColor: "rgba(251,146,60,0.4)",
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
    glowColor: "rgba(167,139,250,0.4)",
    icon: "🌐",
    title: "Aurora — Magnum Opus",
    desc: "Multilingual RAG for women's healthcare. 29 languages. 93.7% relevancy. LangChain + Qdrant + Groq + Flutter.",
    tags: ["RAG", "LangChain", "Qdrant", "Groq", "29 langs", "93.7%"],
    metric: { v: "93.7%", l: "RAG Relevancy" },
    side: "right",
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, animId: number, t = 0;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 1.5 + 0.3,
      color: ["#7c3aed","#38bdf8","#00ff96","#f472b6","#fbbf24"][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const rings = Array.from({ length: 24 }, (_, i) => ({
      z: i / 24,
      color: ["#7c3aed","#2563eb","#0891b2","#059669","#f472b6"][i % 5],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Tunnel rings
      rings.forEach((ring, i) => {
        ring.z = (ring.z + 0.002) % 1;
        const perspective = 1 - ring.z;
        const size = perspective * Math.min(W, H) * 0.55;
        const alpha = perspective * 0.12;
        ctx.beginPath();
        ctx.ellipse(cx, cy, size, size * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + Math.floor(alpha * 255).toString(16).padStart(2,"0");
        ctx.lineWidth = 0.8;
        ctx.stroke();
        for (let d = 0; d < 10; d++) {
          const angle = (d / 10) * Math.PI * 2 + t * 0.15 * (i % 2 === 0 ? 1 : -1);
          const dx = Math.cos(angle) * size;
          const dy = Math.sin(angle) * size * 0.45;
          ctx.beginPath();
          ctx.arc(cx + dx, cy + dy, perspective * 2, 0, Math.PI * 2);
          ctx.fillStyle = ring.color + Math.floor(alpha * 2.5 * 255).toString(16).padStart(2,"0");
          ctx.fill();
        }
      });

      // Particles
      particles.forEach(p => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        p.twinkle += 0.03;
        const opacity = p.opacity * (0.6 + 0.4 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(opacity * 255).toString(16).padStart(2,"0");
        ctx.fill();
      });

      // Central glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      grd.addColorStop(0, "rgba(124,58,237,0.1)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      t += 0.01;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />;
}

function ScanLines() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    }} />
  );
}

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-py * 12);
    rotY.set(px * 12);
  };
  const handleMouseLeave = () => {
    rotX.set(0); rotY.set(0); setHovered(false);
  };

  return (
    <div ref={ref} style={{
      display: "flex",
      justifyContent: chapter.side === "left" ? "flex-start" : "flex-end",
      position: "relative",
    }}>
      <motion.div
        initial={{ opacity: 0, x: chapter.side === "left" ? -120 : 120, rotateY: chapter.side === "left" ? -25 : 25 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 60 }}
        style={{
          width: "clamp(100%, 100%, 46%)",
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        {/* Outer glow wrapper */}
        <div style={{
          position: "relative",
          borderRadius: 24,
          padding: 1.5,
          background: hovered
            ? `linear-gradient(135deg, ${chapter.color}, ${chapter.color}44, transparent)`
            : `linear-gradient(135deg, ${chapter.color}44, transparent)`,
          boxShadow: hovered
            ? `0 0 60px ${chapter.glowColor}, 0 0 120px ${chapter.color}20, inset 0 0 60px ${chapter.color}05`
            : `0 0 20px ${chapter.color}20`,
          transition: "box-shadow 0.4s ease",
        }}>
          <div style={{
            background: "rgba(4,4,12,0.96)",
            borderRadius: 23,
            padding: "32px 36px",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(30px)",
          }}>
            {/* Top accent bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, transparent, ${chapter.color}, ${chapter.color}80, transparent)`,
            }} />

            {/* Corner accent */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: 80, height: 80,
              background: `conic-gradient(from 180deg at 100% 0%, ${chapter.color}30, transparent 50%)`,
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, width: 80, height: 80,
              background: `conic-gradient(from 0deg at 0% 100%, ${chapter.color}20, transparent 50%)`,
            }} />

            {/* Background grid */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: `linear-gradient(${chapter.color} 1px, transparent 1px), linear-gradient(90deg, ${chapter.color} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }} />

            {/* Big bg glow */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 200, height: 200,
              background: `radial-gradient(circle, ${chapter.color}18 0%, transparent 70%)`,
              pointerEvents: "none",
              transition: "opacity 0.4s",
              opacity: hovered ? 1 : 0.5,
            }} />

            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, position: "relative", zIndex: 2, flexWrap: "wrap", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: "clamp(20px, 5vw, 26px)" }}>{chapter.icon}</span>
                  <div>
                    <div style={{ fontSize: "clamp(8px, 1.5vw, 9px)", color: chapter.color, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.9 }}>{chapter.era}</div>
                    <div style={{ fontSize: "clamp(8px, 1.5vw, 9px)", color: "#333", letterSpacing: "1px" }}>◈ {chapter.year}</div>
                  </div>
                </div>
                <div style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.2 }}>{chapter.title}</div>
              </div>

              {/* Metric box */}
              <div style={{
                flexShrink: 0,
                background: `${chapter.color}10`,
                border: `1px solid ${chapter.color}30`,
                borderRadius: 12,
                padding: "8px 12px",
                textAlign: "center",
                boxShadow: `0 0 20px ${chapter.color}15`,
              }}>
                <div style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 900, color: chapter.color, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{chapter.metric.v}</div>
                <div style={{ fontSize: "clamp(7px, 1.5vw, 9px)", color: "#555", marginTop: 3, letterSpacing: "1px", textTransform: "uppercase" }}>{chapter.metric.l}</div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "clamp(12px, 2vw, 13px)", color: "#666", lineHeight: 1.8, marginBottom: 20, position: "relative", zIndex: 2 }}>{chapter.desc}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, position: "relative", zIndex: 2 }}>
              {chapter.tags.map(t => (
                <span key={t} style={{
                  fontSize: "clamp(8px, 1.5vw, 10px)", padding: "4px 12px", borderRadius: 8,
                  border: `1px solid ${chapter.color}35`,
                  color: chapter.color,
                  background: `${chapter.color}0c`,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  transition: "all 0.2s",
                }}>{t}</span>
              ))}
            </div>

            {/* Bottom scan line animation */}
            {hovered && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${chapter.color}, transparent)`,
                  transformOrigin: "left",
                }}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Center timeline node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
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
        <motion.div
          animate={{ boxShadow: [`0 0 20px ${chapter.glowColor}, 0 0 40px ${chapter.color}30`, `0 0 40px ${chapter.glowColor}, 0 0 80px ${chapter.color}40`, `0 0 20px ${chapter.glowColor}, 0 0 40px ${chapter.color}30`] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            width: 60, height: 60, borderRadius: "50%",
            background: `radial-gradient(circle, ${chapter.color}50, ${chapter.color}15)`,
            border: `2px solid ${chapter.color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}
        >
          {chapter.icon}
        </motion.div>
        <div style={{ fontSize: 9, color: chapter.color, fontWeight: 800, marginTop: 5, letterSpacing: "2px", textShadow: `0 0 10px ${chapter.color}` }}>{chapter.year}</div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" style={{ background: "#000", position: "relative", padding: "120px 24px 160px", overflow: "hidden" }}>
      <ParticleField />
      <ScanLines />

      {/* Vertical spine */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          position: "absolute", left: "50%", top: 120, bottom: 80, width: 2,
          background: "linear-gradient(180deg, transparent, #7c3aed 10%, #38bdf8 40%, #00ff96 70%, #f472b6 90%, transparent)",
          transform: "translateX(-50%)",
          transformOrigin: "top",
          zIndex: 1,
          boxShadow: "0 0 12px #7c3aed80, 0 0 24px #7c3aed30",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 5 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 100 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "6px 20px", border: "1px solid #7c3aed40", borderRadius: 99, background: "#7c3aed10", backdropFilter: "blur(10px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 8px #7c3aed", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>The Story So Far</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 8px #7c3aed", display: "inline-block" }} />
          </div>

          <h2 style={{ fontSize: "clamp(42px,6vw,80px)", fontWeight: 900, letterSpacing: "-3px", color: "#fff", lineHeight: 1, marginBottom: 20 }}>
            My{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa 0%,#38bdf8 40%,#00ff96 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px #7c3aed60)" }}>
              Journey
            </span>
          </h2>

          <p style={{ fontSize: 15, color: "#555", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            From mobile apps to production AI — every step, every win, every late-night commit.
          </p>

          {/* Decorative line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg,transparent,#7c3aed)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 16px #7c3aed" }} />
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg,#7c3aed,transparent)" }} />
          </div>
        </motion.div>

        {/* Chapter cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 72, perspective: "1200px" }}>
          {chapters.map((chapter, i) => (
            <ChapterCard key={i} chapter={chapter} index={i} />
          ))}
        </div>

        {/* End node */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80 }}
          style={{ textAlign: "center", marginTop: 80, position: "relative", zIndex: 10 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)", "0 0 80px rgba(124,58,237,0.8), 0 0 160px rgba(124,58,237,0.4)", "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.5), rgba(124,58,237,0.05))",
              border: "2px solid #7c3aed",
              margin: "0 auto 20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
            }}
          >
            🚀
          </motion.div>
          <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 800, letterSpacing: "4px", marginBottom: 8, textShadow: "0 0 20px #7c3aed" }}>CHAPTER NEXT</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 10 }}>Writing the future...</div>
          <div style={{ fontSize: 13, color: "#444", letterSpacing: "1px" }}>Final year · Graduating 2026 · Open to full-time</div>
        </motion.div>

      </div>

      {/* Global styles for this section */}
      <style>{`
        #journey * { box-sizing: border-box; }
      `}</style>
    </section>
  );
}