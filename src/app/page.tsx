"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import ChatPane from "@/components/ChatPane";
import DisplayPane from "@/components/DisplayPane";
import { Message, ViewState } from "@/components/data";

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "ai",
  text: "Connection established. I'm Geetish's AI assistant. He is a final-year B.Tech CSE student (8.28 GPA) actively looking for full-time SDE or ML roles and Flutter development opportunities. Ask me about his internships, projects, or leadership experience!",
};

export default function ConversationalPortfolio() {
  const [isBooting, setIsBooting]             = useState(true);
  const [messages, setMessages]               = useState<Message[]>([INITIAL_MESSAGE]);
  const [activeView, setActiveView]           = useState<ViewState>("hero");
  const [isTyping, setIsTyping]               = useState(false);
  const [mobileDisplayOpen, setMobileDisplayOpen] = useState(false);

  const processQuery = (query: string): { responseText: string; nextView: ViewState } => {
    const q = query.toLowerCase();

    // ── About / hero ──────────────────────────────
    if (q.match(/who|about|introduce|overview|summary|tell me|background|fresher/)) {
      return {
        responseText: "Geetish is a final-year AI/ML Engineer and Flutter Developer at BIT Durg. He has 3 technical internships under his belt and is currently the IEEE Student Branch Chairperson. He's ready to bring production-grade systems to your team.",
        nextView: "hero",
      };
    }

    // ── Experience ─────────────────────────────────
    if (q.match(/experience|intern|ieee|work|django|flutter|bhilai steel|matdar|job/)) {
      return {
        responseText: "As a fresher, Geetish already has 3 technical internships: AI/ML at IEEE CS Bangalore, Full-Stack Django at Bhilai Steel Plant, and Flutter Dev at Me Matdar. He also manages 30+ members as an IEEE Chairperson.",
        nextView: "experience",
      };
    }

    // ── Projects ──────────────────────────────────
    if (q.match(/project|aurora|resq|yolo|mindsarthi|bsp|build|app|portfolio/)) {
      return {
        responseText: "Geetish builds systems that actually scale. His flagship project, Aurora, is a 29-language RAG chatbot. He's also built real-time accident detection (ResQVision) and scalable mobile apps like MindSarthi.",
        nextView: "projects",
      };
    }

    // ── Skills ─────────────────────────────────────
    if (q.match(/skill|tech|stack|language|python|flutter|fastapi|rag|langchain|qdrant|yolov8|tensorflow/)) {
      return {
        responseText: "His core stack includes Python, FastAPI, and LangChain for ML/Backend, and Dart/Flutter for cross-platform mobile UI. He is highly proficient in bringing complex models into production environments.",
        nextView: "skills",
      };
    }

    // ── Hackathon / achievements ────────────────────
    if (q.match(/hack|award|win|achieve|prize|competition|trophy/)) {
      return {
        responseText: "Geetish is a 4× hackathon winner! He secured 1st place at the BitShine Hackathon and was part of the top-performing team at Hacksagon. He thrives in high-pressure, fast-paced development environments.",
        nextView: "skills",
      };
    }

    // ── Contact ────────────────────────────────────
    if (q.match(/contact|hire|email|resume|opportunity|connect|reach|linkedin|github/)) {
      return {
        responseText: "He is actively seeking full-time AI/ML or SDE roles and is open to relocation! You can reach him at geetish.mahato.19@gmail.com, or check his LinkedIn and GitHub on the right.",
        nextView: "contact",
      };
    }

    // ── Education / GPA ────────────────────────────
    if (q.match(/gpa|education|college|bit|durg|university|degree|cse|grade/)) {
      return {
        responseText: "He is currently completing his B.Tech in CSE (AI specialization) at Bhilai Institute of Technology, Durg. He maintains an 8.28/10 GPA and will be graduating and available for full-time work in July 2026.",
        nextView: "hero",
      };
    }

    // ── Fallback ────────────────────────────────────
    return {
      responseText: "I'm tuned to Geetish's resume data. Try asking about his 'internships', 'AI skills', 'hackathon wins', or 'contact details' to see why he'd be a great hire!",
      nextView: activeView,
    };
  };

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text }]);
    setIsTyping(true);

    const delay = 700 + Math.random() * 500;
    setTimeout(() => {
      const { responseText, nextView } = processQuery(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: responseText }]);
      setActiveView(nextView);
      setMobileDisplayOpen(true);
    }, delay);
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <main
        className="app-container"
        style={{
          display: "flex", height: "100dvh",
          background: "var(--bg-display)",
          color: "var(--text-main)",
          overflow: "hidden",
          fontFamily: "var(--font-body)",
          position: "relative",
        }}
      >
        <ChatPane
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onOpenDisplay={() => setMobileDisplayOpen(true)}
        />

        {!isBooting && (
          <DisplayPane
            activeView={activeView}
            mobileDisplayOpen={mobileDisplayOpen}
            onCloseMobile={() => setMobileDisplayOpen(false)}
          />
        )}

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .mobile-only-flex { display: none !important; }

          @media (max-width: 900px) {
            .mobile-only-flex { display: flex !important; }

            .pane-chat {
              width: 100% !important;
              max-width: 100% !important;
              border-right: none !important;
            }
            
            .pane-display {
              position: fixed !important;
              top: 40px;
              left: 0; right: 0; bottom: 0;
              z-index: 1000;
              border-top-left-radius: 24px;
              border-top-right-radius: 24px;
              box-shadow: 0 -10px 40px rgba(0,0,0,0.25);
              border-top: 1px solid var(--border-subtle);
              transform: translateY(100%);
              transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
            }
            
            .pane-display.mobile-open {
              transform: translateY(0);
            }
          }
        `}</style>
      </main>
    </>
  );
}