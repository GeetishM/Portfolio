"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
  
  // Theme logic
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
    <section className="pane-chat" style={{ width: "40%", maxWidth: "450px", borderRight: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", background: "var(--bg-chat)", zIndex: 10 }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", background: "var(--bg-header)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border-subtle)", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 40, height: 40, borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px", color: "#fff" }}>G</div>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#00ff96", border: "2px solid var(--bg-chat)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.5px", color: "var(--text-main)" }}>Geetish.AI</h1>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Online</p>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Theme Toggle Button */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ background: "var(--bg-input)", border: "1px solid var(--border-subtle)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "0.2s" }}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          )}
          <button className="mobile-only-flex" onClick={onOpenDisplay} style={{ background: "rgba(124, 58, 237, 0.15)", border: "1px solid rgba(124, 58, 237, 0.3)", color: "#a78bfa", padding: "0 12px", borderRadius: 10, fontSize: "12px", fontWeight: 600 }}>
            Interface ↗
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9, y: 20, originX: msg.sender === "user" ? 1 : 0 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={flutterSpring} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: msg.sender === "user" ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "var(--ai-bubble)",
              color: msg.sender === "user" ? "#fff" : "var(--ai-text)",
              padding: "14px 18px", 
              borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              maxWidth: "90%", fontSize: "14px", lineHeight: 1.6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: msg.sender === "user" ? "none" : "1px solid var(--ai-bubble-border)"
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0, scale: 0.8, originX: 0 }} animate={{ opacity: 1, scale: 1 }} transition={flutterSpring} style={{ display: "flex", gap: "4px", padding: "16px 20px", background: "var(--ai-bubble)", borderRadius: "20px 20px 20px 4px", width: "fit-content", border: "1px solid var(--ai-bubble-border)" }}>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: 6, height: 6, background: "#a78bfa", borderRadius: "50%" }} />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} style={{ width: 6, height: 6, background: "#a78bfa", borderRadius: "50%" }} />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} style={{ width: 6, height: 6, background: "#a78bfa", borderRadius: "50%" }} />
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: "12px 20px 20px", background: "var(--bg-header)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "8px", marginBottom: "12px", overflowX: "auto", paddingBottom: "4px", whiteSpace: "nowrap" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => handleSend(s)} style={{ flexShrink: 0, background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "12px", padding: "8px 16px", borderRadius: "99px", cursor: "pointer", transition: "all 0.2s" }}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input 
            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask me anything..."
            style={{ flex: 1, background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", padding: "14px 20px", borderRadius: "99px", fontSize: "14px", outline: "none", minWidth: 0 }}
          />
          <button onClick={() => handleSend(inputValue)} style={{ width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0, background: inputValue.trim() ? "#7c3aed" : "var(--bg-input)", color: inputValue.trim() ? "#fff" : "var(--text-muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: inputValue.trim() ? "pointer" : "default" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </section>
  );
}