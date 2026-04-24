"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Message, flutterSpring } from "./data";

interface ChatPaneProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onOpenDisplay: () => void;
}

// Clean, professional, action-oriented text. No emojis.
const SUGGESTIONS = [
  "View main projects",
  "Technical skills",
  "Internship experience",
  "Hackathon wins",
  "Education & GPA",
  "Contact details"
];

// Typewriter hook for the initial AI message
function useTypewriter(text: string, speed = 22, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

// Single message bubble
function ChatBubble({ msg, isFirst }: { msg: Message; isFirst: boolean }) {
  const displayed = useTypewriter(msg.text, 18, msg.sender === "ai" && isFirst);
  const isAi = msg.sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16, originX: isAi ? 0 : 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={flutterSpring}
      style={{ display: "flex", flexDirection: "column", alignItems: isAi ? "flex-start" : "flex-end" }}
    >
      <div style={{
        fontSize: "10px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
        color: "var(--text-faint)", marginBottom: "6px",
        fontFamily: "var(--font-mono)",
        paddingLeft: isAi ? "4px" : "0",
        paddingRight: isAi ? "0" : "4px",
      }}>
        {isAi ? "GEETISH.AI" : "YOU"}
      </div>

      <div style={{
        background: isAi
          ? "var(--bg-card)"
          : "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
        color: isAi ? "var(--ai-text)" : "#fff",
        padding: "14px 20px",
        borderRadius: isAi ? "4px 20px 20px 20px" : "20px 4px 20px 20px",
        maxWidth: "90%",
        fontSize: "15px",
        lineHeight: 1.65,
        boxShadow: isAi
          ? "var(--shadow-card)"
          : "0 8px 28px rgba(124,58,237,0.30)",
        border: isAi ? "1px solid var(--border-card)" : "none",
        fontWeight: 450,
        fontFamily: "var(--font-body)",
        backdropFilter: isAi ? "blur(16px)" : undefined,
      }}>
        {displayed}
        {isFirst && isAi && displayed.length < msg.text.length && (
          <span className="cursor-blink" />
        )}
      </div>
    </motion.div>
  );
}

export default function ChatPane({ messages, isTyping, onSendMessage, onOpenDisplay }: ChatPaneProps) {
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
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
      {/* ── HEADER ─────────────────────────────────── */}
      <div style={{
        padding: "14px 20px",
        background: "var(--bg-header)",
        backdropFilter: "blur(28px)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "18px", color: "#fff",
              fontFamily: "var(--font-display)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}>G</div>
            <div style={{ position: "absolute", bottom: -2, right: -2 }} className="pulse-ring">
              <div style={{
                width: 13, height: 13, borderRadius: "50%",
                background: "#10b981",
                border: "2.5px solid var(--bg-chat)",
                position: "relative", zIndex: 1,
              }} />
            </div>
          </div>

          <div>
            <h1 style={{
              fontSize: "16px", fontWeight: 700, letterSpacing: "-0.3px",
              color: "var(--text-main)", lineHeight: 1.2,
              fontFamily: "var(--font-display)",
            }}>Geetish.AI</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
                Available for hire · AI/ML Engineer
              </p>
            </div>
          </div>
        </div>

        {mounted && (
          <motion.button
            whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              width: 40, height: 40, borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-main)", fontSize: "15px",
            }}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </motion.button>
        )}
      </div>

      {/* ── MESSAGES ───────────────────────────────── */}
      <div
        className="hide-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <ChatBubble key={msg.id} msg={msg} isFirst={idx === 0} />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, originX: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={flutterSpring}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}
            >
              <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "1.5px", fontFamily: "var(--font-mono)", paddingLeft: "4px" }}>GEETISH.AI</div>
              <div style={{
                display: "flex", gap: "6px", alignItems: "center",
                padding: "14px 18px",
                background: "var(--bg-card)", backdropFilter: "blur(16px)",
                borderRadius: "4px 20px 20px 20px",
                border: "1px solid var(--border-card)",
                boxShadow: "var(--shadow-card)",
              }}>
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay }}
                    style={{ width: 7, height: 7, background: "var(--accent)", borderRadius: "50%" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length > 1 && !isTyping && (
          <motion.div
            className="mobile-only-flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: "sticky", bottom: 0, justifyContent: "center", pointerEvents: "none", paddingBottom: "8px", zIndex: 30 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDisplay}
              style={{
                pointerEvents: "auto",
                background: "var(--bg-header)", backdropFilter: "blur(20px)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                borderRadius: 999, padding: "12px 22px",
                display: "flex", alignItems: "center", gap: 9,
                fontSize: 14, fontWeight: 700,
                color: "var(--text-main)", cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ color: "var(--accent)" }}
              >◱</motion.span>
              View Portfolio Data
            </motion.button>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ── INPUT AREA ─────────────────────────────── */}
      <div style={{
        padding: "14px 20px 22px",
        background: "var(--bg-header)",
        backdropFilter: "blur(28px)",
        borderTop: "1px solid var(--border-subtle)",
        zIndex: 20,
      }}>
        {/* Suggestion chips */}
        <AnimatePresence>
          {inputValue.trim().length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{ overflow: "hidden" }}
            >
              {/* THE FIX: Added justifyContent: "center" and increased gap to 10px */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "4px 2px", margin: "-4px -2px" }}>
                {SUGGESTIONS.map(text => (
                  <motion.button
                    key={text}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSend(text)}
                    style={{
                      background: "var(--bg-card)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid var(--border-card)",
                      color: "var(--text-muted)",
                      fontSize: "13px", fontWeight: 500,
                      padding: "8px 16px", borderRadius: "99px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "var(--text-main)";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
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

        {/* Text input + send */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask about projects, skills, experience…"
            style={{
              flex: 1, minWidth: 0,
              background: "var(--bg-input)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-main)",
              padding: "14px 20px",
              borderRadius: "99px", fontSize: "14px",
              outline: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 450,
              transition: "border-color 0.25s, box-shadow 0.25s",
            }}
            onFocus={e => {
              e.target.style.borderColor = "var(--accent)";
              e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "var(--border-subtle)";
              e.target.style.boxShadow = "none";
            }}
          />
          <motion.button
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => handleSend(inputValue)}
            style={{
              width: 50, height: 50, borderRadius: "50%", flexShrink: 0,
              background: inputValue.trim()
                ? "linear-gradient(135deg, #7c3aed, #22d3ee)"
                : "var(--bg-input)",
              color: inputValue.trim() ? "#fff" : "var(--text-faint)",
              border: "1px solid",
              borderColor: inputValue.trim() ? "transparent" : "var(--border-subtle)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: inputValue.trim() ? "pointer" : "default",
              boxShadow: inputValue.trim() ? "0 8px 24px rgba(124,58,237,0.35)" : "none",
              transition: "background 0.3s, box-shadow 0.3s, color 0.3s",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.button>
        </div>

        {/* Keyboard hint */}
        <div style={{ marginTop: "8px", textAlign: "center", fontSize: "11px", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
          Press Enter ↵ to send
        </div>
      </div>
    </section>
  );
}