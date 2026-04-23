"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startupSequence = [
      "Initializing environment variables...",
      "Connecting to Qdrant vector store...",
      "Loading embedded portfolio context...",
      "Fetching experience_data.json...",
      "Fetching projects_data.json...",
      "Calibrating LangChain retrieval pipeline...",
      "Warming up local LLM weights...",
      "System ready. Handing over to UI."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < startupSequence.length) {
        setBootLogs(prev => [...prev, startupSequence[currentStep]]);
        setProgress(Math.min(((currentStep + 1) / startupSequence.length) * 100, 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600); // Trigger unmount after a short delay
      }
    }, 350); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      key="boot"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#050505", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px", fontFamily: "monospace" }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
        <div style={{ color: "#a78bfa", fontSize: "14px", marginBottom: "20px", fontWeight: "bold" }}>
          [ SYSTEM BOOT : GEETISH_PORTFOLIO_V2 ]
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "30px", height: "200px", overflow: "hidden" }}>
          {bootLogs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: i === bootLogs.length - 1 ? "#00ff96" : "#71717a", fontSize: "12px" }}>
              <span style={{ color: "#52525b", marginRight: "10px" }}>{`[${String(i).padStart(2, '0')}]`}</span>
              {log}
            </motion.div>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa", fontSize: "12px", marginBottom: "8px" }}>
            <span>Loading Vectors...</span>
            <span style={{ color: "#00ff96" }}>{Math.floor(progress)}%</span>
          </div>
          <div style={{ height: "2px", background: "#1c1c1e", width: "100%", position: "relative", overflow: "hidden" }}>
            <motion.div style={{ height: "100%", background: "#00ff96", width: `${progress}%` }} transition={{ ease: "linear" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}