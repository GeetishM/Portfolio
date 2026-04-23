export type Message = { id: string; sender: "user" | "ai"; text: string; isTyping?: boolean };
export type ViewState = "hero" | "projects" | "experience" | "skills" | "contact";

// Add 'as const' at the very end
export const flutterSpring = { type: "spring", stiffness: 260, damping: 24 } as const;

export const projects = [
  { title: "Aurora", metric: "93.7% Relevancy", tech: "RAG / LangChain / Qdrant", desc: "Multilingual RAG-based conversational AI for women's healthcare supporting 29 languages.", color: "#a78bfa" },
  { title: "ResQVision", metric: "91% mAP", tech: "YOLOv8 / OpenCV", desc: "Real-time accident detection trained on 5,000+ frames with 0.2s latency.", color: "#f87171" },
  { title: "MindSarthi", metric: "Gemini API", tech: "Flutter / Firebase", desc: "Scalable mental wellness app with MVVM architecture and AI chatbot.", color: "#34d399" },
  { title: "BSP Materials", metric: "60% Efficiency", tech: "Django / MySQL", desc: "Migrated legacy JSP to Django managing 300,000+ procurement records.", color: "#fb923c" },
];

export const experiences = [
  { role: "AI/ML Intern", org: "IEEE CS Bangalore", period: "2025", desc: "Engineered ResQVision using YOLOv8. Achieved 91% mAP for real-time accident alerts.", color: "#a78bfa" },
  { role: "Django Intern", org: "Bhilai Steel Plant", period: "2025", desc: "Migrated legacy systems, improving data processing efficiency by 60%.", color: "#f87171" },
  { role: "Flutter Intern", org: "Me Matdar", period: "2025", desc: "Optimized live political digital marketing app, reducing load times by 30%.", color: "#34d399" },
  { role: "Student Branch Chair", org: "IEEE", period: "2023-Present", desc: "Managing 30+ members, achieved 200%+ retention rate. Led STEAM SPARK.", color: "#fbbf24" },
];

export const skills = [
  { category: "AI / ML", items: "TensorFlow, PyTorch, YOLOv8, LangChain, OpenCV, Qdrant", color: "#a78bfa" },
  { category: "Backend & APIs", items: "FastAPI, Django, REST APIs", color: "#67e8f9" },
  { category: "Mobile & Frontend", items: "Flutter, React Native, Next.js", color: "#34d399" },
  { category: "Data Analytics", items: "Python, Pandas, Power BI, MySQL", color: "#fbbf24" },
];