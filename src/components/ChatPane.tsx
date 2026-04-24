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

const suggestions = [
  { text: "Main projects", icon: "🚀" },
  { text: "AI skills", icon: "🧠" },
  { text: "IEEE experience", icon: "⚡" },
  { text: "Contact details", icon: "📬" }
];

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
    <section className="pane-chat" style={{ width: "40%", maxWidth: "450px", borderRight: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", background: "var(--bg-chat)", zIndex: 20, position: "relative" }}>
      
      {/* 1. CLEANER HEADER */}
      <div style={{ padding: "16px 24px", background: "var(--bg-header)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border-subtle)", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 42, height: 42, borderRadius: "14px", background: "linear-gradient(135deg, #7c3aed, #38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", color: "#fff", boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)" }}>G</div>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: "#00ff96", border: "3px solid var(--bg-chat)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-main)", lineHeight: 1.2 }}>Geetish.AI</h1>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>Online</p>
          </div>
        </div>
        
        {/* Only the theme toggle remains in the header */}
        {mounted && (
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ background: "var(--bg-input)", border: "1px solid var(--border-subtle)", width: 42, height: 42, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-main)", fontSize: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </motion.button>
        )}
      </div>

      {/* 2. CHAT MESSAGES AREA */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9, y: 20, originX: msg.sender === "user" ? 1 : 0 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={flutterSpring} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                background: msg.sender === "user" ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "var(--bg-card)",
                color: msg.sender === "user" ? "#fff" : "var(--ai-text)",
                padding: "14px 18px", 
                borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                maxWidth: "88%", fontSize: "15px", lineHeight: 1.6,
                boxShadow: msg.sender === "user" ? "0 8px 24px rgba(124, 58, 237, 0.25)" : "var(--shadow-card)",
                border: msg.sender === "user" ? "none" : "1px solid var(--border-card)",
                fontWeight: 500
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0, scale: 0.8, originX: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, originX: 0 }} transition={flutterSpring} style={{ display: "flex", gap: "6px", padding: "16px 20px", background: "var(--bg-card)", borderRadius: "20px 20px 20px 4px", width: "fit-content", border: "1px solid var(--border-card)", boxShadow: "var(--shadow-card)" }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} style={{ width: 8, height: 8, background: "#a78bfa", borderRadius: "50%" }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} style={{ height: "40px" }} /> {/* Extra padding at bottom for the floating button */}
        
        {/* NEW UX: FLOATING INTERFACE BUTTON (Mobile Only) */}
        {messages.length > 1 && !isTyping && (
          <motion.div 
            className="mobile-only-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: "sticky", bottom: 0, left: 0, right: 0, justifyContent: "center", pointerEvents: "none", paddingBottom: "10px", zIndex: 30 }}
          >
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDisplay} 
              style={{ pointerEvents: "auto", background: "var(--bg-header)", backdropFilter: "blur(16px)", border: "1px solid var(--border-subtle)", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", borderRadius: 999, padding: "12px 24px", display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, color: "var(--text-main)", cursor: "pointer" }}
            >
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ color: "#7c3aed" }}>◱</motion.span> 
              View Portfolio Data
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* 3. INPUT AREA WITH CLIPPING FIX */}
      <div style={{ padding: "16px 24px 24px", background: "var(--bg-header)", backdropFilter: "blur(24px)", borderTop: "1px solid var(--border-subtle)", zIndex: 20 }}>
        
        <AnimatePresence>
          {inputValue.trim().length === 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }} 
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              style={{ overflow: "hidden" }}
            >
              {/* CLIPPING FIX: The negative margin and positive padding trick creates a bleed area */}
              <div className="hide-scrollbar" style={{ display: "flex", gap: "10px", overflowX: "auto", padding: "4px", margin: "-4px" }}>
                {suggestions.map(s => (
                  <motion.button 
                    key={s.text} 
                    whileHover={{ y: -2 }} // Swapped scale for y-translation to guarantee no clipping
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(s.text)} 
                    style={{ 
                      flexShrink: 0, display: "flex", alignItems: "center", gap: "8px",
                      background: "var(--bg-card)", border: "1px solid var(--border-card)", 
                      color: "var(--text-muted)", fontSize: "14px", fontWeight: 600, 
                      padding: "10px 16px", borderRadius: "14px", cursor: "pointer", 
                      transition: "color 0.2s, border-color 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--text-main)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border-card)"; }}
                  >
                    <span style={{ fontSize: "16px" }}>{s.icon}</span>
                    {s.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input 
            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            placeholder="Ask me anything..."
            style={{ flex: 1, background: "var(--bg-input)", border: "1px solid var(--border-subtle)", color: "var(--text-main)", padding: "16px 24px", borderRadius: "99px", fontSize: "15px", outline: "none", minWidth: 0, transition: "all 0.3s ease", fontWeight: 500 }}
            onFocus={e => { e.target.style.borderColor = "#7c3aed"; e.target.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.15)"; }}
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