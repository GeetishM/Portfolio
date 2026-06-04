"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import ChatPane from "@/components/ChatPane";
import DisplayPane from "@/components/DisplayPane";
import { Message, ViewState, TargetRole, roleConfigs, Hyperparams } from "@/components/data";
import { useEffect } from "react";

export default function ConversationalPortfolio() {
  const [isBooting, setIsBooting]             = useState(true);
  const [selectedRole, setSelectedRole]       = useState<TargetRole>("general");
  const [messages, setMessages]               = useState<Message[]>([]);
  const [activeView, setActiveView]           = useState<ViewState>("hero");
  const [isTyping, setIsTyping]               = useState(false);
  const [mobileDisplayOpen, setMobileDisplayOpen] = useState(false);
  const [hyperparams, setHyperparams]         = useState<Hyperparams>(roleConfigs.general.hyperparams);
  const [focusedNode, setFocusedNode]         = useState<string | null>(null);

  // Synchronize initial greeting, hyperparams, and focus when recruiter role persona shifts
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: roleConfigs[selectedRole].greeting,
      }
    ]);
    setHyperparams(roleConfigs[selectedRole].hyperparams);
    setFocusedNode(null);
  }, [selectedRole]);

  const handleHyperparamChange = (key: keyof Hyperparams, val: number) => {
    setHyperparams(prev => ({ ...prev, [key]: val }));
  };

  const processQuery = (query: string): { responseText: string; nextView: ViewState } => {
    const q = query.toLowerCase();

    // ── About / hero ──────────────────────────────
    if (q.match(/who|about|introduce|overview|summary|tell me|background|fresher/)) {
      if (selectedRole === "rag") {
        return {
          responseText: "Geetish is a RAG & GenAI Developer specializing in building robust semantic retrieval pipelines. He integrates Qdrant vector databases, builds custom chunking/embedding processes, and deploys high-speed FastAPI backends with Groq LLM orchestration.",
          nextView: "hero"
        };
      }
      if (selectedRole === "ml") {
        return {
          responseText: "Geetish is a Machine Learning & CV Engineer. He trains YOLOv8 models for real-time detection, builds CNNs for feature extraction, and designs OpenCV pipelines optimized for low-latency edge deployment.",
          nextView: "hero"
        };
      }
      if (selectedRole === "data") {
        return {
          responseText: "Geetish is a Data Scientist and Analyst. He specializes in SQL data modeling, building Pandas processing pipelines, and creating interactive Power BI dashboards that turn large datasets into actionable business intelligence.",
          nextView: "hero"
        };
      }
      if (selectedRole === "flutter") {
        return {
          responseText: "Geetish is a Cross-Platform Flutter Developer. He builds high-fidelity, responsive mobile applications using clean architecture, Riverpod state management, and Hive local database caching.",
          nextView: "hero"
        };
      }
      if (selectedRole === "pm") {
        return {
          responseText: "Geetish is a Tech Product Manager and Student Branch Chairperson. He excels at coordinating cross-functional teams, scoping technical MVPs, tracking performance KPIs, and scoping user-centric features.",
          nextView: "hero"
        };
      }
      return {
        responseText: "Geetish is a Machine Learning Developer and Data Analyst at BIT Durg. He builds production-grade AI models, data pipelines, and Flutter apps. He's ready to bring highly scalable solutions to your team.",
        nextView: "hero",
      };
    }

    // ── Experience ─────────────────────────────────
    if (q.match(/experience|intern|ieee|work|django|flutter|bhilai steel|matdar|job|mentor/)) {
      if (selectedRole === "rag") {
        return {
          responseText: "During his AI/ML mentorship with IEEE CS Bangalore, Geetish specialized in high-performance model orchestration. At Bhilai Steel Plant, he optimized procurement databases, and at Me Matdar, he integrated cached APIs to reduce loading overhead.",
          nextView: "experience"
        };
      }
      if (selectedRole === "ml") {
        return {
          responseText: "As an AI/ML Mentee at IEEE CS Bangalore, he trained a YOLOv8 real-time detection model on the IISc-AIM UVH-26 dataset (5000+ annotated frames), achieving 91% mAP at 0.2s latency. At Bhilai Steel Plant, he built automated ML-adjacent logs ingestion.",
          nextView: "experience"
        };
      }
      if (selectedRole === "data") {
        return {
          responseText: "During his Full-Stack Django Internship at Bhilai Steel Plant, he migrated legacy systems, optimizing SQL queries to handle over 300,000 procurement logs and reducing processing latency by 60%.",
          nextView: "experience"
        };
      }
      if (selectedRole === "flutter") {
        return {
          responseText: "As a Flutter Developer Intern at Me Matdar, he optimized 3+ core features in a live production app, using Riverpod, pagination, and lazy loading to achieve a 30% reduction in app load times.",
          nextView: "experience"
        };
      }
      if (selectedRole === "pm") {
        return {
          responseText: "As the Chairperson of the IEEE Student Branch and VP of the CSE Association, he manages 30+ core members, delivering technical hackathons and NGO initiatives with a 200%+ volunteer retention rate.",
          nextView: "experience"
        };
      }
      return {
        responseText: "Geetish has completed 2 formal technical internships (Full-Stack Django at Bhilai Steel Plant and Flutter Dev at Me Matdar) and a rigorous AI/ML Mentorship with IEEE CS Bangalore, where he engineered the ResQVision model.",
        nextView: "experience",
      };
    }

    // ── Projects ──────────────────────────────────
    if (q.match(/project|aurora|resq|yolo|mindsarthi|bsp|build|app|portfolio|data/)) {
      if (selectedRole === "rag") {
        return {
          responseText: "His flagship project, Aurora, is a 29-language RAG chatbot supporting 22 Indian regional languages. It achieves 93.7% Retrieval Relevancy and 89.8% Context Precision using Qdrant vector database and Groq LLaMA 3.1 APIs.",
          nextView: "projects"
        };
      }
      if (selectedRole === "ml") {
        return {
          responseText: "He engineered ResQVision, a YOLOv8 and OpenCV pipeline for real-time accident detection. He also built EmotionXtract, a CNN face emotion detection system achieving 79% accuracy over 35,000 training samples.",
          nextView: "projects"
        };
      }
      if (selectedRole === "data") {
        return {
          responseText: "He built the Customer Trends Analysis dashboard, modeling 4,000+ customer transaction logs with Pandas, MySQL, and Power BI. He also built the BSP Materials Dashboard for steel logistics insights.",
          nextView: "projects"
        };
      }
      if (selectedRole === "flutter") {
        return {
          responseText: "He developed MindSarthi, a wellness app with MVVM layout, Hive offline storage, and Gemini API integration. He also designed the Aurora Flutter frontend to support RAG query streaming.",
          nextView: "projects"
        };
      }
      if (selectedRole === "pm") {
        return {
          responseText: "He spearheaded 'Aurora' from concept to delivery, scoping feature modules (29 languages) and prioritizing engineering sprints. He also managed the MVP timeline for MindSarthi's wellness features.",
          nextView: "projects"
        };
      }
      return {
        responseText: "Geetish builds systems that actually scale. His flagship project, Aurora, is a 29-language RAG chatbot. He's also built real-time accident detection (ResQVision), Customer Trend dashboards in Power BI, and scalable mobile apps.",
        nextView: "projects",
      };
    }

    // ── Skills ─────────────────────────────────────
    if (q.match(/skill|tech|stack|language|python|flutter|fastapi|rag|langchain|qdrant|yolov8|tensorflow|data/)) {
      if (selectedRole === "rag") {
        return {
          responseText: "His RAG stack consists of: LangChain, Qdrant Vector DB, Ollama, Groq LLaMA 3.1, FastAPI backend, RAGAS pipeline evaluation, and Python.",
          nextView: "skills"
        };
      }
      if (selectedRole === "ml") {
        return {
          responseText: "His machine learning stack consists of: PyTorch, TensorFlow, YOLOv8, OpenCV, CNN architectures, CNN, and Python.",
          nextView: "skills"
        };
      }
      if (selectedRole === "data") {
        return {
          responseText: "His data stack consists of: Pandas, NumPy, Power BI, MySQL database modeling, Tableau, Hadoop distributed processing, and Seaborn.",
          nextView: "skills"
        };
      }
      if (selectedRole === "flutter") {
        return {
          responseText: "His mobile stack consists of: Flutter, Dart, Riverpod state management, Firebase, local Hive storage, and Figma prototyping.",
          nextView: "skills"
        };
      }
      if (selectedRole === "pm") {
        return {
          responseText: "His PM skill set includes: technical product roadmap planning, User Persona definition, KPI tracking, UI/UX Wireframing (Figma), and agile scrum coordination.",
          nextView: "skills"
        };
      }
      return {
        responseText: "His core stack includes Python, FastAPI, and LangChain for ML/GenAI, Pandas and Power BI for Data Analytics, and Flutter for cross-platform mobile UI.",
        nextView: "skills",
      };
    }

    // ── Leadership / NGO / Astitva ──────────────────
    if (q.match(/astitva|ngo|women|foundation|empowerment|sight|spark|outreach|lead|chairperson|president|volunteer/)) {
      return {
        responseText: "Geetish has extensive leadership and social impact experience. He led digital transformation at the Astitva Foundation (improving rural platform access for 500+ beneficiaries), served as IEEE Student Branch Chairperson (coordinating 30+ members with 200%+ retention), spearheaded the STEAM SPARK outreach for 100+ students, and coordinated volunteers for the Golden Empathy Foundation.",
        nextView: "experience",
      };
    }

    // ── Awards & Achievements ────────────────────────
    if (q.match(/hack|award|win|achieve|prize|competition|trophy|hacksagon|bitshine|symposium/)) {
      return {
        responseText: "Geetish is a 4× hackathon and tech symposium winner: 1st Place at the BitShine Hackathon (Feb 2025), Top Performing Team at Hacksagon (June 2025), 1st Place at the IEEE ESG Symposium (Oct 2024), and Best Presentation at IEEE Leadership in AI (Oct 2024).",
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
      responseText: `I'm tuned to Geetish's ${roleConfigs[selectedRole].title} data. Try asking about his '${roleConfigs[selectedRole].suggestions[0]}', or other skills to see why he'd be a great hire!`,
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
      <style>{`
        :root {
          --accent: ${roleConfigs[selectedRole].accent};
          --accent-glow: ${roleConfigs[selectedRole].accentGlow};
        }
      `}</style>
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
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          hyperparams={hyperparams}
          onHyperparamChange={handleHyperparamChange}
        />

        {!isBooting && (
          <DisplayPane
            activeView={activeView}
            mobileDisplayOpen={mobileDisplayOpen}
            onCloseMobile={() => setMobileDisplayOpen(false)}
            selectedRole={selectedRole}
            focusedNode={focusedNode}
            onSelectNode={setFocusedNode}
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