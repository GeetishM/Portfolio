"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logs = [
  "Initializing neural network...",
  "Loading YOLOv8 weights → resqvision.pt",
  "Connecting Qdrant vector store...",
  "Embedding 29 language corpus...",
  "Aurora RAG pipeline ready ✓",
  "Flutter UI compiled → release mode",
  "FastAPI server running on :8000",
  "Model accuracy: 93.7% ✓",
  "Deploying Geetish Mahato v2.0...",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [done, setDone] = useState(false);
  const [loss, setLoss] = useState(2.4);
  const [acc, setAcc] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 4 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onDone, 800); }, 400);
          return 100;
        }
        return next;
      });
      setLoss(l => Math.max(0.08, l - Math.random() * 0.12));
      setAcc(a => Math.min(93.7, a + Math.random() * 4));
      setCurrentLog(l => Math.min(logs.length - 1, l + 1));
    }, 220);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            fontFamily: "monospace",
          }}
        >
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,100,0.015) 2px,rgba(0,255,100,0.015) 4px)",
          }} />

          <div style={{ width: "min(520px, 90vw)", position: "relative", zIndex: 1 }}>

            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: "#00ff96", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>
                ◈ GEETISH_MAHATO :: PORTFOLIO_BOOT
              </div>
              <div style={{ fontSize: 10, color: "#1a3a2a", letterSpacing: "1px" }}>
                BIT_DURG_CSE_AI · v2.0 · {new Date().toISOString().split("T")[0]}
              </div>
            </div>

            {/* Loss + Accuracy row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "LOSS", value: loss.toFixed(3), color: "#f87171" },
                { label: "ACCURACY", value: acc.toFixed(1) + "%", color: "#00ff96" },
                { label: "EPOCH", value: Math.floor(progress / 10) + "/10", color: "#a78bfa" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: "#080808", border: "1px solid #111", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 8, color: "#333", letterSpacing: "1px", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Loss curve */}
            <div style={{ background: "#080808", border: "1px solid #111", borderRadius: 8, padding: "12px", marginBottom: 16, height: 80, position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 8, color: "#333", letterSpacing: "1px", marginBottom: 6 }}>TRAINING LOSS CURVE</div>
              <svg width="100%" height="50" viewBox="0 0 400 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#00ff96" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,45 C20,42 40,35 80,20 C120,8 160,4 200,3 C240,2 280,2 ${Math.floor(progress * 4)},${Math.max(1, 45 - progress * 0.44)}`}
                  fill="none" stroke="url(#lg)" strokeWidth="1.5"
                />
                <motion.circle
                  cx={Math.floor(progress * 4)}
                  cy={Math.max(1, 45 - progress * 0.44)}
                  r="3" fill="#00ff96"
                />
              </svg>
            </div>

            {/* Log terminal */}
            <div style={{ background: "#050505", border: "1px solid #111", borderRadius: 8, padding: "12px", marginBottom: 16, height: 110, overflow: "hidden" }}>
              <div style={{ fontSize: 8, color: "#333", letterSpacing: "1px", marginBottom: 8 }}>SYSTEM LOG</div>
              {logs.slice(0, currentLog + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ fontSize: 10, color: i === currentLog ? "#00ff96" : "#1a3a2a", marginBottom: 3, display: "flex", gap: 8 }}
                >
                  <span style={{ color: "#0f2a1a" }}>[{String(i).padStart(2, "0")}]</span>
                  {log}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 9, color: "#1a3a2a", letterSpacing: "1px" }}>DEPLOYING PORTFOLIO</span>
                <span style={{ fontSize: 9, color: "#00ff96" }}>{Math.floor(progress)}%</span>
              </div>
              <div style={{ height: 3, background: "#0a0a0a", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: "linear-gradient(90deg,#7c3aed,#00ff96)", borderRadius: 999 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {progress >= 100 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", fontSize: 12, color: "#00ff96", letterSpacing: "2px", marginTop: 12 }}>
                ✓ MODEL DEPLOYED · LAUNCHING...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}