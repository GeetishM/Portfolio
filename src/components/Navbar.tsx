"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(9,9,11,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}>
            GM
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-only">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setActive(label)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                color: active === label ? "#a78bfa" : "#71717a",
                background: active === label ? "rgba(139,92,246,0.08)" : "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                if (active !== label) {
                  e.currentTarget.style.color = "#e4e4e7";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={e => {
                if (active !== label) {
                  e.currentTarget.style.color = "#71717a";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {label}
            </a>
          ))}

          {/* Resume CTA */}
          <a
            href="https://drive.google.com/file/d/1rxstoBFfRCkvymYDsUTIolaWxp2vZv-p/view?usp=sharing"
            target="_blank"
            style={{
              marginLeft: 8,
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              color: "#a78bfa",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.06)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(139,92,246,0.15)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(139,92,246,0.06)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
            }}
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "#71717a",
          }}
          className="mobile-menu-btn"
        >
          <div style={{ width: 20, height: 1.5, background: "currentColor", marginBottom: 5, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(10px)" : "rotate(0)" }} />
          <div style={{ width: 20, height: 1.5, background: "currentColor", marginBottom: 5, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 20, height: 1.5, background: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-10px)" : "rotate(0)" }} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(9,9,11,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 24px 24px",
        }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => { setActive(label); setMenuOpen(false); }}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                color: active === label ? "#a78bfa" : "#71717a",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}