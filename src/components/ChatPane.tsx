"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Message, flutterSpring, TargetRole, roleConfigs, Hyperparams } from "./data";

interface ChatPaneProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onOpenDisplay: () => void;
  selectedRole: TargetRole;
  onRoleChange: (role: TargetRole) => void;
  hyperparams: Hyperparams;
  onHyperparamChange: (key: keyof Hyperparams, val: number) => void;
}

// Typewriter hook for the initial AI messages
function useTypewriter(text: string, speed = 20, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);
  return displayed;
}

function ChatBubble({ msg, isFirst, selectedRole }: { msg: Message; isFirst: boolean; selectedRole: TargetRole }) {
  const displayed = useTypewriter(msg.text, 15, msg.sender === "ai" && isFirst);
  const isAi = msg.sender === "ai";
  const accent = roleConfigs[selectedRole].accent;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12, originX: isAi ? 0 : 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={flutterSpring}
      style={{ display: "flex", flexDirection: "column", alignItems: isAi ? "flex-start" : "flex-end" }}
    >
      <div style={{
        fontSize: "9px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase",
        color: "var(--text-faint)", marginBottom: "4px",
        fontFamily: "var(--font-mono)",
        paddingLeft: isAi ? "4px" : "0",
        paddingRight: isAi ? "0" : "4px",
      }}>
        {isAi ? "GEETISH.AI" : "YOU"}
      </div>

      <div
        className={isAi ? "glass-panel" : ""}
        style={{
          background: isAi
            ? "var(--bg-card)"
            : `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
          color: isAi ? "var(--ai-text)" : "#fff",
          padding: "12px 16px",
          borderRadius: isAi ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          maxWidth: "88%",
          fontSize: "14px",
          lineHeight: 1.55,
          boxShadow: isAi ? "var(--shadow-card)" : `0 6px 20px ${accent}25`,
          border: isAi ? "1px solid var(--border-card)" : "none",
          fontWeight: 450,
          fontFamily: "var(--font-body)",
        }}
      >
        {displayed}
        {isFirst && isAi && displayed.length < msg.text.length && (
          <span className="cursor-blink" />
        )}
      </div>
    </motion.div>
  );
}

export default function ChatPane({ messages, isTyping, onSendMessage, onOpenDisplay, selectedRole, onRoleChange, hyperparams, onHyperparamChange }: ChatPaneProps) {
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showParams, setShowParams] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInputValue("");
  };

  return (
    <section
      className="pane-chat"
      style={{
        width: "40%", maxWidth: "440px",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column",
        background: "var(--bg-chat)",
        zIndex: 20, position: "relative",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{
        padding: "14px 20px",
        background: "var(--bg-header)",
        backdropFilter: "blur(28px)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "12px",
              background: `linear-gradient(135deg, ${roleConfigs[selectedRole].accent}, ${roleConfigs[selectedRole].accent}aa)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "16px", color: "#fff",
              fontFamily: "var(--font-display)",
              boxShadow: `0 4px 16px ${roleConfigs[selectedRole].accent}35`,
            }}>G</div>
            <div style={{ position: "absolute", bottom: -2, right: -2 }} className="pulse-ring">
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                background: "#10b981",
                border: "2px solid var(--bg-chat)",
                position: "relative", zIndex: 1,
              }} />
            </div>
          </div>

          <div>
            <h1 style={{
              fontSize: "15px", fontWeight: 800, letterSpacing: "-0.2px",
              color: "var(--text-main)", lineHeight: 1.2,
              fontFamily: "var(--font-display)",
            }}>Geetish.AI</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: 500 }}>
                Recruiter Mode · {roleConfigs[selectedRole].title}
              </p>
            </div>
          </div>
        </div>

        {mounted && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              width: 36, height: 36, borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-main)", fontSize: "14px",
            }}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </motion.button>
        )}
      </div>

      {/* ── ROLE TARGET SELECTOR ── */}
      <div style={{
        padding: "8px 20px",
        background: "var(--bg-input)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", gap: "8px",
        justifyContent: "space-between",
        fontSize: "11.5px",
        color: "var(--text-muted)",
        zIndex: 15,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontSize: "11px", color: roleConfigs[selectedRole].accent }}>✦</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>RECRUITER TARGET:</span>
        </div>
        <select
          value={selectedRole}
          onChange={e => onRoleChange(e.target.value as TargetRole)}
          style={{
            background: "var(--bg-chat)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-main)",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 700,
            outline: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          {Object.values(roleConfigs).map(cfg => (
            <option key={cfg.id} value={cfg.id}>
              {cfg.title}
            </option>
          ))}
        </select>
      </div>

      {/* ── HYPERPARAMETERS TUNING PANEL ── */}
      <div style={{
        background: "rgba(255,255,255,0.01)",
        borderBottom: "1px solid var(--border-subtle)",
        fontSize: "11px",
        zIndex: 10,
      }}>
        <button
          onClick={() => setShowParams(!showParams)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            padding: "8px 20px",
            textAlign: "left",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>⚙ HYPERPARAMETER CONFIG {showParams ? "[-]" : "[+]"}</span>
          <span style={{ color: roleConfigs[selectedRole].accent }}>
            Tuned: {Object.values(hyperparams).join("·")}
          </span>
        </button>

        {showParams && (
          <div style={{
            padding: "10px 20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            background: "var(--bg-input)",
            borderTop: "1px solid var(--border-subtle)"
          }}>
            {[
              { key: "aiCapacity", label: "GenAI/RAG Capacity" },
              { key: "cvDepth", label: "Computer Vision Depth" },
              { key: "dataPipes", label: "Data Pipelines" },
              { key: "mobilePolish", label: "Mobile UI Polish" },
              { key: "systemScale", label: "Systems Scaling" },
              { key: "productScope", label: "Product Management" }
            ].map(p => (
              <div key={p.key} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", fontWeight: 600 }}>
                  <span>{p.label}</span>
                  <span style={{ color: roleConfigs[selectedRole].accent, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    {hyperparams[p.key as keyof Hyperparams]}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={hyperparams[p.key as keyof Hyperparams]}
                  onChange={e => onHyperparamChange(p.key as keyof Hyperparams, parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: roleConfigs[selectedRole].accent, cursor: "pointer", height: "4px" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MESSAGES ── */}
      <div
        className="hide-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <ChatBubble key={msg.id} msg={msg} isFirst={idx === 0} selectedRole={selectedRole} />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, originX: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={flutterSpring}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}
            >
              <div style={{ fontSize: "9px", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "1.2px", fontFamily: "var(--font-mono)", paddingLeft: "4px" }}>GEETISH.AI</div>
              <div
                className="glass-panel"
                style={{
                  display: "flex", gap: "5px", alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: "4px 16px 16px 16px",
                  border: "1px solid var(--border-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.65, delay }}
                    style={{ width: 6, height: 6, background: roleConfigs[selectedRole].accent, borderRadius: "50%" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length > 1 && !isTyping && (
          <motion.div
            className="mobile-only-flex"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: "sticky", bottom: 0, justifyContent: "center", pointerEvents: "none", paddingBottom: "6px", zIndex: 30 }}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onOpenDisplay}
              style={{
                pointerEvents: "auto",
                background: "var(--bg-header)", backdropFilter: "blur(20px)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                borderRadius: 999, padding: "10px 18px",
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700,
                color: "var(--text-main)", cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ color: roleConfigs[selectedRole].accent }}
              >◱</motion.span>
              View Telemetry Data
            </motion.button>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ── INPUT AREA ── */}
      <div style={{
        padding: "12px 16px 20px",
        background: "var(--bg-header)",
        backdropFilter: "blur(28px)",
        borderTop: "1px solid var(--border-subtle)",
        zIndex: 20,
      }}>
        {/* Suggestion Chips */}
        <AnimatePresence>
          {inputValue.trim().length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", padding: "2px" }}>
                {roleConfigs[selectedRole].suggestions.map(text => (
                  <motion.button
                    key={text}
                    whileHover={{ y: -1.5, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSend(text)}
                    style={{
                      background: "var(--bg-card)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid var(--border-card)",
                      color: "var(--text-muted)",
                      fontSize: "12.5px", fontWeight: 500,
                      padding: "6px 12px", borderRadius: "99px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "var(--text-main)";
                      e.currentTarget.style.borderColor = roleConfigs[selectedRole].accent;
                      e.currentTarget.style.background = "var(--bg-input)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderColor = "var(--border-card)";
                      e.currentTarget.style.background = "var(--bg-card)";
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input Row */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask about projects, skills, achievements..."
            style={{
              flex: 1, minWidth: 0,
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-main)",
              padding: "12px 18px",
              borderRadius: "99px", fontSize: "13.5px",
              outline: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 450,
              transition: "all 0.2s ease",
            }}
            onFocus={e => {
              e.target.style.borderColor = roleConfigs[selectedRole].accent;
              e.target.style.boxShadow = `0 0 0 3px ${roleConfigs[selectedRole].accentGlow}`;
            }}
            onBlur={e => {
              e.target.style.borderColor = "var(--border-subtle)";
              e.target.style.boxShadow = "none";
            }}
          />
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => handleSend(inputValue)}
            style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: inputValue.trim()
                ? `linear-gradient(135deg, ${roleConfigs[selectedRole].accent}, ${roleConfigs[selectedRole].accent}cc)`
                : "var(--bg-input)",
              color: inputValue.trim() ? "#fff" : "var(--text-faint)",
              border: "1px solid",
              borderColor: inputValue.trim() ? "transparent" : "var(--border-subtle)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: inputValue.trim() ? "pointer" : "default",
              boxShadow: inputValue.trim() ? `0 6px 18px ${roleConfigs[selectedRole].accent}35` : "none",
              transition: "all 0.25s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.button>
        </div>

        {/* Hints */}
        <div style={{ marginTop: "6px", textAlign: "center", fontSize: "10.5px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
          Press Enter ↵ to submit query
        </div>
      </div>
    </section>
  );
}