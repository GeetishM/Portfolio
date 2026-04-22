"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="flex items-center gap-2 text-xs text-violet-300 border border-violet-500/20 bg-violet-500/5 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to internships & full-time roles
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-6"
        >
          <span className="text-white">Geetish </span>
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Mahato
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xl md:text-2xl text-zinc-400 mb-6 h-8"
        >
          <TypeAnimation
            sequence={[
              "ML Engineer & RAG Systems Developer",
              2000,
              "Computer Vision Specialist",
              2000,
              "Flutter & FastAPI Developer",
              2000,
              "Data Analytics Engineer",
              2000,
              "IEEE Chairperson & Hackathon Winner",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building production-grade AI systems — from multilingual RAG pipelines
          to real-time computer vision. BIT Durg CSE (AI) · GPA 8.28 · 4× Award winner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-violet-500/50 text-zinc-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            Resume ↗
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/GeetishM", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/geetish-mahato", label: "LinkedIn" },
            { icon: Mail, href: "mailto:geetish.mahato.19@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-zinc-800 hover:border-violet-500/40 bg-zinc-900/50 hover:bg-violet-500/10 flex items-center justify-center text-zinc-400 hover:text-violet-400 transition-all duration-200"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

    </section>
  );
}