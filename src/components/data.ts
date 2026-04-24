export type Message = { id: string; sender: "user" | "ai"; text: string; isTyping?: boolean };
export type ViewState = "hero" | "projects" | "experience" | "skills" | "contact";

export const flutterSpring = { type: "spring", stiffness: 260, damping: 24 } as const;
export const gentleSpring  = { type: "spring", stiffness: 180, damping: 28 } as const;

export const projects = [
  {
    title: "Aurora",
    metric: "93.7% Relevancy",
    sub: "89.8% Context Precision",
    tech: ["FastAPI", "Flutter", "Qdrant", "Groq Whisper", "LangChain"],
    desc: "An AI-powered women's health assistant built with a RAG pipeline. Features real-time WebSocket streaming, voice input, and a mobile frontend supporting 29 languages.",
    color: "#a78bfa", // Purple
    github: "https://github.com/GeetishM/Aurora",
    period: "Oct 2025 – Apr 2026",
    tags: ["RAG", "NLP", "Mobile", "Healthcare"],
  },
  {
    title: "MindSarthi",
    metric: "20% Latency Reduction",
    sub: "MVVM + Firebase Auth",
    tech: ["Flutter", "Firebase", "Gemini API", "Hive"],
    desc: "A mobile-first mental wellness platform built to deliver accessible, secure, and empathetic support to individuals and professionals via an AI chatbot.",
    color: "#34d399", // Green
    github: "https://github.com/GeetishM/MindSarthi",
    period: "Apr – Sep 2024",
    tags: ["Mobile", "AI", "Health"],
  },
  {
    title: "Enterprise Dashboard",
    metric: "60% Efficiency Gain",
    sub: "300K+ records migrated",
    tech: ["Django", "MySQL", "Bootstrap 5", "Chart.js"],
    desc: "Full-stack Material Management Dashboard visualizing budgeting, procurement, and stock data. Enables real-time insights and data-driven decisions across departments.",
    color: "#fb923c", // Orange
    github: "https://github.com/GeetishM/Dashboard",
    period: "May – Jun 2025",
    tags: ["Backend", "Data", "Enterprise"],
  },
  {
    title: "GestureX Virtual Mouse",
    metric: "Touchless Control",
    sub: "Voice & Gesture Activated",
    tech: ["Python", "OpenCV", "MediaPipe"],
    desc: "A virtual mouse system utilizing hand gestures for cursor movement, clicking, and scrolling. Includes voice-activated tools for hygienic, accessible interaction.",
    color: "#60a5fa", // Blue
    github: "https://github.com/Pragya-Kumar/GestureX-Virtual-Mouse",
    period: "2024",
    tags: ["CV", "Accessibility", "Python"],
  },
  {
    title: "EmotionXtract",
    metric: "79% Accuracy",
    sub: "35,000+ Training Samples",
    tech: ["CNN", "TensorFlow", "Keras", "OpenCV"],
    desc: "A deep learning facial emotion detection system using a Convolutional Neural Network, trained to recognize facial expressions across 7 distinct emotion classes.",
    color: "#fbbf24", // Yellow
    github: "https://github.com/anamikadey099/EmotionXtract",
    period: "Sep – Dec 2024",
    tags: ["Deep Learning", "CNN", "Vision"],
  },
  {
    title: "Customer Trends Analytics",
    metric: "4,000+ Records",
    sub: "Data-driven Insights",
    tech: ["Python", "Pandas", "MySQL", "Power BI"],
    desc: "Explored customer shopping behavior to uncover purchasing patterns and key sales drivers. Designed to enhance marketing strategies and inventory planning.",
    color: "#22d3ee", // Cyan
    github: "https://github.com/GeetishM/Data_Analytic_projects",
    period: "Nov – Dec 2024",
    tags: ["Data Analytics", "Power BI", "SQL"],
  },
];

export const experiences = [
  {
    role: "AI/ML Intern",
    org: "IEEE CS Bangalore Chapter",
    period: "Apr – Sep 2025",
    desc: "Engineered ResQVision using YOLOv8 & OpenCV. Trained on 5,000+ annotated frames achieving 91% mAP for reliable real-time accident alerts.",
    color: "#a78bfa",
    icon: "🤖",
    type: "remote",
  },
  {
    role: "Full-Stack Django Intern",
    org: "Bhilai Steel Plant",
    period: "May – Jun 2025",
    desc: "Migrated legacy JSP system to Django. Improved data processing efficiency by 60% and enhanced accessibility for 300K+ procurement records.",
    color: "#f87171",
    icon: "🏭",
    type: "on-site",
  },
  {
    role: "Flutter Developer Intern",
    org: "Me Matdar",
    period: "Jan – Mar 2025",
    desc: "Optimized a live political digital marketing app using lazy loading, pagination & Riverpod state management. Reduced load time by 30%.",
    color: "#34d399",
    icon: "📱",
    type: "remote",
  },
  {
    role: "Student Branch Chairperson",
    org: "IEEE BIT Durg",
    period: "2023 – Present",
    desc: "Managing 30+ members with 200%+ retention rate. Led STEAM SPARK outreach, IEEE ESG Symposium, and WIE Webmaster duties.",
    color: "#fbbf24",
    icon: "⚡",
    type: "leadership",
  },
];

export const skills = [
  {
    category: "AI / ML",
    icon: "🧠",
    items: ["TensorFlow", "PyTorch", "YOLOv8", "LangChain", "LangGraph", "OpenCV", "Qdrant", "RAG", "Mediapipe"],
    color: "#a78bfa",
  },
  {
    category: "Backend & APIs",
    icon: "⚙️",
    items: ["FastAPI", "Django", "Flask", "Streamlit", "REST APIs", "WebSockets"],
    color: "#22d3ee",
  },
  {
    category: "Mobile & Frontend",
    icon: "📱",
    items: ["Flutter", "React Native", "Next.js", "Riverpod", "Firebase", "Figma"],
    color: "#34d399",
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    items: ["Pandas", "NumPy", "Power BI", "Tableau", "MySQL", "Jupyter", "Matplotlib"],
    color: "#fbbf24",
  },
  {
    category: "Languages & Tools",
    icon: "💻",
    items: ["Python", "Dart", "JavaScript", "C++", "Java", "Git", "Linux"],
    color: "#fb923c",
  },
];

export const achievements = [
  { title: "BitShine Hackathon",        result: "1st Place",         year: "Feb 2025", color: "#fbbf24" },
  { title: "Hacksagon",                 result: "Top Performing Team",year: "Jun 2025", color: "#a78bfa" },
  { title: "IEEE ESG Symposium",        result: "1st Place",         year: "Oct 2024", color: "#34d399" },
  { title: "IEEE Leadership in AI",     result: "Best Presentation", year: "Oct 2024", color: "#22d3ee" },
];