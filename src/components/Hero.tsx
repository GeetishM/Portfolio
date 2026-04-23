"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [termLines, setTermLines] = useState<string[]>([]);

  // Neural net canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, animId: number;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM = 90;
    type TNode = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; color: string };
    const nodes: TNode[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? "167,139,250" : Math.random() > 0.5 ? "56,189,248" : "0,255,150",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < NUM; i++) {
        const n = nodes[i];
        n.pulse += 0.02;
        const dx = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) { n.vx -= (dx / dist) * 0.03; n.vy -= (dy / dist) * 0.03; }
        n.vx *= 0.99; n.vy *= 0.99;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        for (let j = i + 1; j < NUM; j++) {
          const m = nodes[j];
          const dx2 = n.x - m.x, dy2 = n.y - m.y;
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const a = 0.5 + Math.sin(n.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Terminal typewriter
  useEffect(() => {
    const cmds = [
      "$ python aurora.py --langs=29",
      "→ RAG pipeline initialized",
      "$ yolo predict model=resqvision.pt",
      "→ mAP: 91% · latency: 0.2s",
      "$ flutter build apk --release",
      "→ Build complete ✓",
      "$ fastapi run main.py",
      "→ Server: http://localhost:8000",
    ];
    let i = 0;
    const iv = setInterval(() => {
      setTermLines(prev => {
        const next = [...prev, cmds[i % cmds.length]];
        return next.slice(-6);
      });
      i++;
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={e => {
        const r = containerRef.current?.getBoundingClientRect();
        if (r) { mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }
      }}
      style={{ position: "relative", minHeight: "100vh", background: "#000", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Neural net canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "30%", width: 500, height: 500, background: "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 300, height: 300, background: "radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Terminal - top left - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "absolute", top: 90, left: 24, zIndex: 10,
          background: "rgba(0,0,0,0.85)", border: "1px solid rgba(0,255,150,0.2)",
          borderRadius: 10, padding: "12px 14px", fontFamily: "monospace",
          fontSize: 10, width: 260, backdropFilter: "blur(10px)",
          display: "none",
        }}
        className="desktop-terminal"
      >
        <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ color: "#333", fontSize: 9, marginLeft: 4 }}>geetish@portfolio</span>
        </div>
        {termLines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            style={{ color: line.startsWith("$") ? "#a78bfa" : "#00ff96", marginBottom: 2, fontSize: 10 }}
          >
            {line}
          </motion.div>
        ))}
        <span style={{ display: "inline-block", width: 6, height: 12, background: "#00ff96", animation: "blink 1s infinite", verticalAlign: "middle" }} />
      </motion.div>

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 5, textAlign: "center", maxWidth: 700, padding: "0 16px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "clamp(9px, 2vw, 11px)", color: "#00ff96", border: "1px solid rgba(0,255,150,0.2)", background: "rgba(0,255,150,0.05)", padding: "5px clamp(12px, 3vw, 16px)", borderRadius: 999, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff96", boxShadow: "0 0 8px #00ff96", display: "inline-block" }} />
          <span>ML Engineer · Flutter Dev · IEEE Chairperson · Open to work</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: "clamp(52px,9vw,88px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 16 }}
        >
          <span style={{ color: "#fff" }}>Geetish</span><br />
          <span style={{ background: "linear-gradient(135deg,#a78bfa,#38bdf8,#00ff96)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mahato
          </span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: "clamp(14px,2vw,20px)", color: "#555", marginBottom: 32, height: 28 }}
        >
          <TypeAnimation
            sequence={[
              "Building RAG systems that speak 29 languages", 2500,
              "Training YOLOv8 models at 91% mAP", 2500,
              "Shipping Flutter apps to production", 2500,
              "Leading IEEE with 200%+ retention", 2500,
              "Winning hackathons across India", 2500,
            ]}
            speed={55} repeat={Infinity} wrapper="span"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}
        >
          <a href="#journey" style={{ padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 700, textDecoration: "none", letterSpacing: "0.3px" }}>
            My Journey ↓
          </a>
          <a href="#projects" style={{ padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)", borderRadius: 12, border: "1px solid #222", color: "#888", fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 500, textDecoration: "none" }}>
            Projects
          </a>
          <a href="/resume.pdf" target="_blank" style={{ padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)", borderRadius: 12, border: "1px solid rgba(0,255,150,0.2)", color: "#00ff96", fontSize: "clamp(12px, 2vw, 14px)", fontWeight: 500, textDecoration: "none" }}>
            Resume ↗
          </a>
        </motion.div>

        {/* Floating metric pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ display: "flex", gap: "clamp(8px, 2vw, 10px)", justifyContent: "center", flexWrap: "wrap" }}
        >
          {[
            { v: "93.7%", l: "RAG Relevancy", c: "#a78bfa" },
            { v: "91%", l: "mAP Score", c: "#38bdf8" },
            { v: "29", l: "Languages", c: "#00ff96" },
            { v: "4×", l: "Award Winner", c: "#fbbf24" },
            { v: "8.28", l: "GPA", c: "#f87171" },
          ].map(({ v, l, c }) => (
            <motion.div key={l} whileHover={{ y: -4, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c}30`, borderRadius: 10, padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 14px)", textAlign: "center", cursor: "default", minWidth: "max-content" }}
            >
              <div style={{ fontSize: "clamp(14px, 4vw, 18px)", fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: "clamp(7px, 1.5vw, 9px)", color: "#333", marginTop: 2, letterSpacing: "0.5px" }}>{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Phone mockup - right - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 60, rotateY: -20 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ position: "absolute", right: 40, bottom: 20, zIndex: 10, perspective: 1000, display: "none" }}
        className="desktop-phone"
      >
        <div style={{
          width: 140, height: 280,
          background: "linear-gradient(145deg,#1a1a2e,#0f0f1a)",
          border: "2px solid rgba(167,139,250,0.25)",
          borderRadius: 28, overflow: "hidden",
          boxShadow: "0 0 60px rgba(124,58,237,0.15), 0 0 0 1px rgba(255,255,255,0.05)",
        }}>
          {/* Phone notch */}
          <div style={{ height: 20, background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 40, height: 4, background: "#1a1a2e", borderRadius: 999 }} />
          </div>
          <div style={{ padding: "10px 8px", background: "#080810" }}>
            <div style={{ fontSize: 7, color: "#a78bfa", fontWeight: 700, letterSpacing: "1px", marginBottom: 6, textAlign: "center" }}>AURORA · RAG</div>
            {[
              { l: "Answer Relevancy", v: 93.7, c: "#a78bfa" },
              { l: "Context Precision", v: 89.8, c: "#38bdf8" },
              { l: "Faithfulness", v: 78.3, c: "#00ff96" },
              { l: "Languages", v: 96, c: "#fbbf24", label: "29 langs" },
            ].map(({ l, v, c, label }) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "6px 7px", marginBottom: 4 }}>
                <div style={{ fontSize: 6, color: "#333", marginBottom: 2 }}>{l}</div>
                <div style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>{label || v + "%"}</div>
                <div style={{ height: 2, background: "#111", borderRadius: 999, marginTop: 3, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 1.2, duration: 1 }}
                    style={{ height: "100%", background: c, borderRadius: 999 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, borderTop: "0.5px solid #111", paddingTop: 6 }}>
              <div style={{ fontSize: 6, color: "#1a1a3a", textAlign: "center" }}>Flutter · FastAPI · Groq · Qdrant</div>
              <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 5 }}>
                {["RAG","CV","App","Data"].map(t => (
                  <div key={t} style={{ fontSize: 5, padding: "2px 5px", borderRadius: 3, background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 5 }}
      >
        <div style={{ fontSize: 9, color: "#222", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>Scroll to begin journey</div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ fontSize: 16, color: "#333" }}>↓</motion.div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (min-width: 1024px) {
          .desktop-terminal { display: block !important; }
          .desktop-phone { display: block !important; }
        }
        @media (max-width: 768px) {
          .desktop-terminal { display: none !important; }
          .desktop-phone { display: none !important; }
        }
      `}</style>
    </section>
  );
}