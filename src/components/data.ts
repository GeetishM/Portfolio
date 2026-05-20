export type Message = { id: string; sender: "user" | "ai"; text: string; isTyping?: boolean };
export type ViewState = "hero" | "projects" | "experience" | "skills" | "contact";

export const flutterSpring = { type: "spring", stiffness: 260, damping: 24 } as const;
export const gentleSpring  = { type: "spring", stiffness: 180, damping: 28 } as const;

export const projects = [
  {
    title: "Aurora",
    metric: "93.7% Relevancy",
    sub: "89.8% Context Precision",
    tech: ["FastAPI", "Flutter", "Qdrant", "Groq LLaMA 3.1", "LangChain", "Ollama"],
    desc: "Built a multilingual RAG system for women's healthcare supporting 29 languages (22 Indian regional) using mxbai-embed-large embeddings, Qdrant with MMR retrieval, and Groq LLAMA 3.1 via FastAPI.",
    color: "#a78bfa", // Purple
    github: "https://github.com/GeetishM/Aurora",
    period: "Oct 2025 – Apr 2026",
    tags: ["RAG", "NLP", "Mobile", "Healthcare"],
  },
  {
    title: "ResQVision",
    metric: "91% mAP",
    sub: "0.2s per-frame latency",
    tech: ["YOLOv8", "OpenCV", "Python"],
    desc: "Engineered a YOLOv8 and OpenCV pipeline trained on the IISc-AIM UVH-26 dataset (5,000+ annotated frames) for real-time accident detection.",
    color: "#f87171", // Red
    github: "https://github.com/GeetishM",
    period: "Apr 2025 – Sep 2025",
    tags: ["CV", "Real-time", "Safety"],
  },
  {
    title: "MindSarthi",
    metric: "20% Latency Reduction",
    sub: "MVVM + Firebase Auth",
    tech: ["Flutter", "Firebase", "Gemini API", "Hive"],
    desc: "Architected a scalable Flutter app using MVVM, Firebase Auth and Hive for state management. Integrated the Gemini API through RESTful APIs to enable chatbot interactions.",
    color: "#34d399", // Green
    github: "https://github.com/GeetishM/MindSarthi",
    period: "Apr 2024 – Sep 2024",
    tags: ["Mobile", "AI", "Health"],
  },
  {
    title: "Enterprise Dashboard",
    metric: "60% Faster Processing",
    sub: "300K+ records",
    tech: ["Django", "MySQL", "Bootstrap 5", "Chart.js"],
    desc: "Migrated a legacy JSP materials management system to a modular Django application using MySQL, and built an Excel-to-SQL ingestion pipeline.",
    color: "#fb923c", // Orange
    github: "https://github.com/GeetishM/Dashboard",
    period: "May 2025 – Jun 2025",
    tags: ["Backend", "Data", "Enterprise"],
  },
  {
    title: "EmotionXtract",
    metric: "79% Accuracy",
    sub: "35,000+ Training Samples",
    tech: ["CNN", "TensorFlow", "Keras", "OpenCV"],
    desc: "Constructed an emotion detection system using a CNN model trained on a Kaggle dataset of 35,000 to recognize facial expressions with OpenCV.",
    color: "#fbbf24", // Yellow
    github: "https://github.com/GeetishM/EmotionXtract",
    period: "Sep 2024 – Dec 2024",
    tags: ["Deep Learning", "CNN", "Vision"],
  },
  {
    title: "Customer Trends Analysis",
    metric: "4,000+ Records",
    sub: "Data-driven Insights",
    tech: ["Python", "Pandas", "MySQL", "Power BI", "Jupyter"],
    desc: "Analyzed customer data using Pandas. Extracted and transformed data from MySQL and developed interactive dashboards in Power BI to identify key purchasing patterns.",
    color: "#22d3ee", // Cyan
    github: "https://github.com/GeetishM/Data_Analytic_projects",
    period: "2025 – Dec 2025",
    tags: ["Data Analytics", "Power BI", "SQL"],
  },
];

export const experiences = [
  {
    role: "AI/ML Mentorship Program",
    org: "IEEE CS Bangalore Chapter",
    period: "Apr 2025 – Sep 2025",
    desc: "Engineered ResQVision, training a YOLOv8 and OpenCV pipeline on the IISc-AIM UVH-26 dataset (5,000+ annotated frames) to achieve 91% mAP at 0.2s per-frame latency.",
    color: "#a78bfa",
    icon: "🤖",
    type: "mentorship",
  },
  {
    role: "Full-Stack Django Intern",
    org: "Bhilai Steel Plant",
    period: "May 2025 – Jun 2025",
    desc: "Migrated legacy JSP system to Django. Cut data processing time by 60%, expanded accessibility by 40%, and enabled real-time monitoring of 300,000+ procurement records.",
    color: "#f87171",
    icon: "🏭",
    type: "on-site",
  },
  {
    role: "Flutter Developer Intern",
    org: "Me Matdar",
    period: "Jan 2025 – Mar 2025",
    desc: "Optimized 3+ core features in a live political marketing product using lazy loading, pagination, and Riverpod state management, reducing app load time by 30%.",
    color: "#34d399",
    icon: "📱",
    type: "remote",
  },
  {
    role: "Chairperson & Vice-President",
    org: "IEEE & CSE Student Association",
    period: "2023 – Present",
    desc: "Managing 30+ members with 200%+ retention. Project Coordinator for IEEE SIGHT, WIE Webmaster, and volunteer with NGO Golden Empathy Foundation.",
    color: "#fbbf24",
    icon: "⚡",
    type: "leadership",
  },
];

export const skills = [
  {
    category: "AI / ML & GenAI",
    icon: "🧠",
    items: ["TensorFlow", "PyTorch", "YOLOv8", "LangChain", "Qdrant", "Ollama", "Groq LLaMA 3.1", "RAGAS", "OpenCV"],
    color: "#a78bfa",
  },
  {
    category: "Data Analytics",
    icon: "📊",
    items: ["Pandas", "NumPy", "Power BI", "Tableau", "MySQL", "Hadoop", "Seaborn", "Jupyter"],
    color: "#fbbf24",
  },
  {
    category: "Backend Frameworks",
    icon: "⚙️",
    items: ["FastAPI", "Django", "Flask", "Streamlit"],
    color: "#22d3ee",
  },
  {
    category: "Mobile & Frontend",
    icon: "📱",
    items: ["Flutter", "React Native", "Riverpod", "Firebase", "Figma"],
    color: "#34d399",
  },
  {
    category: "Languages & Tools",
    icon: "💻",
    items: ["Python", "C++", "Java", "Dart", "JavaScript", "Git", "Linux"],
    color: "#fb923c",
  },
];

export const achievements = [
  { title: "BitShine Hackathon",        result: "1st Place",         year: "Feb 2025", color: "#fbbf24" },
  { title: "Hacksagon",                 result: "Top Performing Team",year: "Jun 2025", color: "#a78bfa" },
  { title: "IEEE ESG Symposium",        result: "1st Place",         year: "Oct 2024", color: "#34d399" },
  { title: "IEEE Leadership in AI",     result: "Best Presentation", year: "Oct 2024", color: "#22d3ee" },
];