"use client";

import { useEffect, useState, useMemo } from "react";
import { TargetRole, roleConfigs, TelemetryPoint } from "./data";

interface WbTelemetryProps {
  activeRole: TargetRole;
  focusedNodeName: string | null;
}

export default function WbTelemetry({ activeRole, focusedNodeName }: WbTelemetryProps) {
  const config = roleConfigs[activeRole];
  const accent = config.accent;

  const [epoch, setEpoch] = useState(0);
  const [activeTab, setActiveTab] = useState<"charts" | "logs">("charts");

  // Animate the training epoch count on preset change
  useEffect(() => {
    setEpoch(0);
    const interval = setInterval(() => {
      setEpoch(e => {
        if (e >= 50) {
          clearInterval(interval);
          return 50;
        }
        return e + 5;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [activeRole]);

  // Interpolate SVG path coordinates for the training curves
  const makeSvgPath = (points: TelemetryPoint[], width = 220, height = 85, isLoss = true) => {
    if (points.length === 0) return "";
    const xMin = 0;
    const xMax = 50;
    const yMin = 0;
    const yMax = isLoss ? 1.2 : 1.0;

    const coords = points.map(p => {
      const x = ((p.x - xMin) / (xMax - xMin)) * width;
      const y = height - ((p.y - yMin) / (yMax - yMin)) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${coords.join(" L ")}`;
  };

  // Create an area path to render gradient fills under the line chart
  const makeAreaPath = (points: TelemetryPoint[], width = 220, height = 85, isLoss = true) => {
    const linePath = makeSvgPath(points, width, height, isLoss);
    if (!linePath) return "";
    return `${linePath} L ${width},${height} L 0,${height} Z`;
  };

  const width = 220;
  const height = 80;

  const lossPath = useMemo(() => makeSvgPath(config.lossCurve, width, height, true), [config.lossCurve]);
  const lossAreaPath = useMemo(() => makeAreaPath(config.lossCurve, width, height, true), [config.lossCurve]);
  const accPath  = useMemo(() => makeSvgPath(config.accuracyCurve, width, height, false), [config.accuracyCurve]);
  const accAreaPath  = useMemo(() => makeAreaPath(config.accuracyCurve, width, height, false), [config.accuracyCurve]);

  // Compute final values
  const currentLoss = (config.lossCurve.find(p => p.x === epoch)?.y || 0.12).toFixed(2);
  const currentAcc  = ((config.accuracyCurve.find(p => p.x === epoch)?.y || 0.96) * 100).toFixed(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px",
        background: "rgba(9, 9, 11, 0.7)",
        backdropFilter: "blur(24px)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "18px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
        pointerEvents: "auto",
        maxWidth: "520px",
        width: "100%",
        fontFamily: "var(--font-mono)",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Run Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} className="pulse-ring" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-main)", letterSpacing: "0.5px" }}>RUN: geetish_{config.id}_tuning</span>
          </div>
          {focusedNodeName && (
            <div style={{ fontSize: "10px", color: "#10b981", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span className="pulse-ring">✦</span> FOCUSING NODE: {focusedNodeName.toUpperCase()}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "12px", fontSize: "10px", color: "var(--text-muted)", fontWeight: 500 }}>
          <div>EPOCH: <span style={{ color: "#fff", fontWeight: 700 }}>{epoch}/50</span></div>
          <div>RUNTIME: <span style={{ color: "#fff", fontWeight: 700 }}>24m 18s</span></div>
        </div>
      </div>

      {/* Tab Selectors */}
      <div style={{ display: "flex", gap: "6px" }}>
        {(["charts", "logs"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              background: activeTab === tab ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              color: activeTab === tab ? "#fff" : "rgba(255, 255, 255, 0.4)",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11px",
              cursor: "pointer",
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              transition: "all 0.2s ease"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Section Content */}
      {activeTab === "charts" ? (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* Chart 1: Training Loss */}
          <div style={{ flex: 1, minWidth: "200px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", padding: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
              <span>train/loss</span>
              <span style={{ color: accent, fontWeight: 700 }}>{currentLoss}</span>
            </div>
            <svg width="100%" height="80" viewBox="0 0 220 80" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id={`lossGrad-${config.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              <line x1="0" y1="40" x2="220" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              <line x1="0" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              
              {/* Area Fill */}
              <path d={lossAreaPath} fill={`url(#lossGrad-${config.id})`} style={{ transition: "d 0.3s ease" }} />
              
              {/* Curve Line */}
              <path
                d={lossPath}
                fill="none"
                stroke={accent}
                strokeWidth="2.0"
                style={{ transition: "d 0.3s ease" }}
              />
            </svg>
          </div>

          {/* Chart 2: Validation Accuracy */}
          <div style={{ flex: 1, minWidth: "200px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", padding: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
              <span>val/accuracy</span>
              <span style={{ color: "#10b981", fontWeight: 700 }}>{currentAcc}%</span>
            </div>
            <svg width="100%" height="80" viewBox="0 0 220 80" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id={`accGrad-${config.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              <line x1="0" y1="40" x2="220" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              <line x1="0" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
              
              {/* Area Fill */}
              <path d={accAreaPath} fill={`url(#accGrad-${config.id})`} style={{ transition: "d 0.3s ease" }} />
              
              {/* Curve Line */}
              <path
                d={accPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.0"
                style={{ transition: "d 0.3s ease" }}
              />
            </svg>
          </div>
        </div>
      ) : (
        /* Logs Terminal Widget */
        <div
          className="hide-scrollbar"
          style={{
            height: "98px",
            overflowY: "auto",
            background: "rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "11px",
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          }}
        >
          {config.epochLogs.map((log, idx) => (
            <div key={idx} style={{ display: "flex", gap: "8px" }}>
              <span style={{ color: "rgba(255, 255, 255, 0.25)", flexShrink: 0 }}>[{10 * idx}s]</span>
              <span style={{
                color: log.startsWith("✓") || log.includes("complete") || log.includes("success") || log.includes("stabilized")
                  ? "#10b981"
                  : log.startsWith("Epoch")
                    ? accent
                    : "#e4e4e7"
              }}>
                {log}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
