"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ASCII_HEADER = `
 ██████╗ ███████╗███████╗████████╗██╗███████╗██╗  ██╗
██╔════╝ ██╔════╝██╔════╝╚══██╔══╝██║██╔════╝██║  ██║
██║  ███╗█████╗  █████╗     ██║   ██║███████╗███████║
██║   ██║██╔══╝  ██╔══╝    ██║   ██║╚════██║██╔══██║
╚██████╔╝███████╗███████╗   ██║   ██║███████║██║  ██║
 ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝╚══════╝╚═╝  ╚═╝`;

const BOOT_SEQUENCE = [
  // Updated colors to be much brighter against the black background
  { text: "Mounting filesystem...", color: "#a1a1aa" },
  { text: "Loading portfolio.env → OK", color: "#a1a1aa" },
  { text: "Initializing Qdrant vector store...", color: "#a1a1aa" },
  { text: "Embedding context chunks [████████] 512 vectors", color: "#a1a1aa" },
  { text: "Loading experience_data.json → 4 entries", color: "#d4d4d8" },
  { text: "Loading projects_data.json  → 4 entries", color: "#d4d4d8" },
  { text: "Warming Groq LLaMA 3.1 inference endpoint...", color: "#d4d4d8" },
  { text: "Calibrating MMR retrieval pipeline...", color: "#a78bfa" },
  { text: "✓ All systems nominal. Handing off to UI renderer.", color: "#10b981" },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [pid, setPid] = useState("0000");

  useEffect(() => {
    // Safely generate random number ONLY on the client to prevent Hydration Mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPid(String(Math.floor(Math.random() * 9000) + 1000));

    const g1 = setTimeout(() => setGlitch(true), 300);
    const g2 = setTimeout(() => setGlitch(false), 450);

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < BOOT_SEQUENCE.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => {
      clearTimeout(g1);
      clearTimeout(g2);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (step === BOOT_SEQUENCE.length) {
      const timeout = setTimeout(onComplete, 700);
      return () => clearTimeout(timeout);
    }
  }, [step, onComplete]);

  // Safe slicing prevents undefined elements
  const logs = BOOT_SEQUENCE.slice(0, step);
  const progress = Math.min(Math.round((step / BOOT_SEQUENCE.length) * 100), 100);

  return (
    <motion.div
      key="boot"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#05050b",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        overflow: "hidden",
      }}
      className="scanline"
    >
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(124,58,237,0.04)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "5%",  width: 300, height: 300, borderRadius: "50%", background: "rgba(34,211,238,0.04)", filter: "blur(70px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "640px", width: "100%", position: "relative", zIndex: 10 }}>
        <motion.pre
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            color: glitch ? "#22d3ee" : "#a78bfa",
            fontSize: "clamp(4px, 1.1vw, 9px)",
            lineHeight: 1.3, marginBottom: "28px", letterSpacing: "0.02em",
            textShadow: glitch ? "2px 0 #f87171, -2px 0 #22d3ee" : "0 0 20px rgba(167,139,250,0.4)",
            transition: "color 0.1s, text-shadow 0.1s",
            whiteSpace: "pre", overflow: "hidden",
          }}
        >
          {ASCII_HEADER}
        </motion.pre>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>PORTFOLIO_OS v2.0</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(167,139,250,0.15)" }} />
          <span style={{ color: "#8e8bac", fontSize: "11px" }}>PID: {pid}</span>
        </div>

        <div style={{ height: "220px", overflow: "hidden", marginBottom: "28px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              {/* Bumped the bracket color from #4e4b70 to #71717a for better contrast */}
              <span style={{ color: "#71717a", fontSize: "11px", flexShrink: 0 }}>{`[${String(i).padStart(2, "0")}]`}</span>
              <span style={{ color: log.color, fontSize: "12px", lineHeight: 1.5 }}>{log.text}</span>
              {i === logs.length - 1 && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: "inline-block", width: "8px", height: "14px", background: log.color, borderRadius: "1px", flexShrink: 0 }} />
              )}
            </motion.div>
          ))}
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ color: "#8e8bac", fontSize: "11px", letterSpacing: "1px" }}>LOADING VECTORS</span>
            <motion.span key={progress} initial={{ scale: 1.2, color: "#a78bfa" }} animate={{ scale: 1, color: "#10b981" }} style={{ fontSize: "12px", fontWeight: 600 }}>
              {progress}%
            </motion.span>
          </div>
          <div style={{ height: "3px", background: "rgba(16, 14, 30, 0.8)", borderRadius: "99px", overflow: "hidden", position: "relative" }}>
            <motion.div
              style={{ height: "100%", borderRadius: "99px", background: "linear-gradient(90deg, #9d6fff, #22d3ee)", boxShadow: "0 0 12px rgba(34,211,238,0.5)" }}
              animate={{ width: `${progress}%` }} transition={{ ease: "easeOut", duration: 0.25 }}
            />
          </div>
        </div>

        {/* Made footer brighter so it's readable */}
        <div style={{ marginTop: "20px", fontSize: "10px", color: "#8e8bac", letterSpacing: "1px" }}>
          GEETISH MAHATO · AI/ML ENGINEER · BIT DURG · GPA 8.28
        </div>
      </div>
    </motion.div>
  );
}