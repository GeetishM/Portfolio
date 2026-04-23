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

const suggestions = ["Main projects?", "AI skills?", "IEEE experience?", "Contact you?"];

export default function ChatPane({ messages, isTyping, onSendMessage, onOpenDisplay }: ChatPaneProps) {
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    onSendMessage(text);
    setInputValue("");
  };

  return (
    <section className="pane-chat" style={{ width: "40%", maxWidth: "450px", borderRight: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", background: "var(--bg-chat)", zIndex: 20 }}>
      {/* Header */}
      <div style={{ padding: "20px 24px", background: "var(--bg-header)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border-subtle)", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 44, height: 44, borderRadius: "14px", background: "linear-gradient(135deg, #7c3aed, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", color: "#fff", boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)" }}>G</div>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: "#00ff96", border: "3px solid var(--bg-chat)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-main)" }}>Geetish.AI</h1>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px", fontWeight: 500 }}>Online</p>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {mounted && (
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ background: "var(--bg-input)", border: "1px solid var(--border-subtle)", width: 40, height: 40, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-main)", fontSize: "16px" }}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </motion.button>
          )}
          <button className="mobile-only-flex" onClick={onOpenDisplay} style={{ background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.2)", color: "#a78bfa", padding: "0 16px", borderRadius: "12px", fontSize: "13px", fontWeight: 700 }}>
            Interface ↗
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.8, y: 20, originX: msg.sender === "user" ? 1 : 0 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={flutterSpring} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                background: msg.sender === "user" ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "var(--ai-bubble)",
                color: msg.sender === "user" ? "#fff" : "var(--ai-text)",
                padding: "16px 20px", 
                borderRadius: msg.sender === "user" ? "24px 24px 6px 24px" : "24px 24px 24px 6px",
                maxWidth: "88%", fontSize: "15px", lineHeight: 1.6,
                boxShadow: msg.sender === "user" ? "0 8px 24px rgba(124, 58, 237, 0.2)" : "0 4px 12px rgba(0,0,0,0.02)",
                border: msg.sender === "user" ? "none" : "1px solid var(--border-subtle)",
                fontWeight: 500
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0, scale: 0.8, originX: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, originX: 0 }} transition={flutterSpring} style={{ display: "flex", gap: "6px", padding: "18px 24px", background: "var(--ai-bubble)", borderRadius: "24px 24px 24px 6px", width: "fit-content", border: "1px solid var(--border-subtle)" }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: "16px 24px 24px", background: "var(--bg-header)", backdropFilter: "blur(24px)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "10px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px", whiteSpace: "nowrap" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => handleSend(s)} style={{ flexShrink: 0, background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "13px", fontWeight: 600, padding: "10px 18px", borderRadius: "99px", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(124, 58, 237, 0.08)"; e.currentTarget.style.color = "#a78bfa"; e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-input)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input 
            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask me anything..."
            style={{ flex: 1, background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", padding: "16px 24px", borderRadius: "99px", fontSize: "15px", outline: "none", minWidth: 0, transition: "all 0.3s ease", fontWeight: 500 }}
            onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "var(--border-subtle)"; e.target.style.boxShadow = "none"; }}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(inputValue)} 
            style={{ width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0, background: inputValue.trim() ? "linear-gradient(135deg, #7c3aed, #38bdf8)" : "var(--bg-input)", color: inputValue.trim() ? "#fff" : "var(--text-faint)", border: "1px solid", borderColor: inputValue.trim() ? "transparent" : "var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", cursor: inputValue.trim() ? "pointer" : "default", boxShadow: inputValue.trim() ? "0 8px 20px rgba(124, 58, 237, 0.3)" : "none" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}