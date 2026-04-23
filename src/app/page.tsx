"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import ChatPane from "@/components/ChatPane";
import DisplayPane from "@/components/DisplayPane";
import { Message, ViewState } from "@/components/data";

export default function ConversationalPortfolio() {
  const [isBooting, setIsBooting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Connection established. I am an interactive RAG interface guiding you through Geetish's portfolio. Ask me about his projects, experience, or skills!" }
  ]);
  const [activeView, setActiveView] = useState<ViewState>("hero");
  const [isTyping, setIsTyping] = useState(false);
  const [mobileDisplayOpen, setMobileDisplayOpen] = useState(false);

  const processQuery = (query: string) => {
    const q = query.toLowerCase();
    let responseText = "";
    let nextView: ViewState = "hero";

    if (q.includes("project") || q.includes("aurora") || q.includes("build") || q.includes("yolo")) {
      responseText = "Geetish specializes in production AI and mobile apps. I've retrieved his core projects, including Aurora RAG and ResQVision.";
      nextView = "projects";
    } else if (q.includes("experience") || q.includes("intern") || q.includes("ieee") || q.includes("work")) {
      responseText = "He's led technical teams as IEEE Chairperson and shipped production code as an intern in AI, Django, and Flutter. Here is his timeline.";
      nextView = "experience";
    } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
      responseText = "His stack is heavily focused on Python for ML/Backend, and Dart/Flutter for cross-platform mobile UI. Displaying his technical matrix.";
      nextView = "skills";
    } else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("resume") || q.includes("opportunity")) {
      responseText = "He is actively looking for full-time roles and internships! I've loaded his contact endpoints.";
      nextView = "contact";
    } else if (q.includes("gpa") || q.includes("education") || q.includes("college")) {
      responseText = "He is a final-year CSE (AI) student at BIT Durg with an 8.28 GPA. He's won 4 hackathons during his time there!";
      nextView = "hero";
    } else {
      responseText = "I'm tuned specifically for Geetish's resume data. Try asking about his 'projects', 'AI skills', or 'internships'!";
      nextView = activeView; 
    }
    return { responseText, nextView };
  };

  const handleSendMessage = (text: string) => {
    const newMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: newMsgId, sender: "user", text }]);
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, nextView } = processQuery(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: responseText }]);
      setActiveView(nextView);
      setMobileDisplayOpen(true);
    }, 800 + Math.random() * 500); 
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Notice the background and color variables here! */}
      <main className="app-container" style={{ display: "flex", height: "100dvh", background: "var(--bg-display)", color: "var(--text-main)", overflow: "hidden", fontFamily: "sans-serif", position: "relative" }}>
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
              box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
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