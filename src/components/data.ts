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
    role: "Digital Transformation Intern",
    org: "Astitva Foundation",
    period: "Jun 2025 – Aug 2025",
    desc: "Led digital transformation for grassroots education, implementing tech solutions across 3+ rural initiatives impacting 500+ beneficiaries, and managed website upgrade and redesign.",
    color: "#3b82f6",
    icon: "🌐",
    type: "internship",
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

export type TargetRole = "rag" | "ml" | "data" | "flutter" | "sde" | "pm" | "general";

export interface TelemetryPoint {
  x: number;
  y: number;
}

export interface Hyperparams {
  aiCapacity: number;
  cvDepth: number;
  dataPipes: number;
  mobilePolish: number;
  systemScale: number;
  productScope: number;
}

export interface RoleConfig {
  id: TargetRole;
  title: string;
  accent: string;
  accentGlow: string;
  greeting: string;
  suggestions: string[];
  primaryProjects: string[];
  primarySkills: string[];
  hyperparams: Hyperparams;
  lossCurve: TelemetryPoint[];
  accuracyCurve: TelemetryPoint[];
  epochLogs: string[];
}

export const roleConfigs: Record<TargetRole, RoleConfig> = {
  general: {
    id: "general",
    title: "General Tech Profile",
    accent: "#8b5cf6", // Purple
    accentGlow: "rgba(139, 92, 246, 0.15)",
    greeting: "Connection established. I'm Geetish's AI assistant. He is a Machine Learning Developer and Data Analyst (8.28 GPA) actively looking for full-time SDE or ML roles. Ask me about his internships, projects, or leadership experience!",
    suggestions: ["View main projects", "Technical skills", "Internship experience", "Hackathon wins", "Education & GPA", "Contact details"],
    primaryProjects: ["Aurora", "ResQVision", "MindSarthi"],
    primarySkills: ["Python", "Flutter", "FastAPI", "Pandas", "YOLOv8"],
    hyperparams: { aiCapacity: 85, cvDepth: 80, dataPipes: 85, mobilePolish: 80, systemScale: 85, productScope: 75 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.72 }, { x: 20, y: 0.51 }, { x: 30, y: 0.35 }, { x: 40, y: 0.22 }, { x: 50, y: 0.12 }],
    accuracyCurve: [{ x: 0, y: 0.1 }, { x: 10, y: 0.45 }, { x: 20, y: 0.72 }, { x: 30, y: 0.88 }, { x: 40, y: 0.94 }, { x: 50, y: 0.96 }],
    epochLogs: [
      "Initializing training run for Geetish Mahato General Profile...",
      "Loading dataset entries: 6 projects, 4 internships, 4 awards.",
      "Weights set for general SDE and ML tasks.",
      "Epoch 10: Loss = 0.72 · Val Acc = 45%",
      "Epoch 30: Loss = 0.35 · Val Acc = 88%",
      "Epoch 50: Training complete. Accuracy stabilized at 96.2%"
    ]
  },
  rag: {
    id: "rag",
    title: "RAG & LLM Engineer",
    accent: "#a78bfa", // Lavender/Purple
    accentGlow: "rgba(167, 139, 250, 0.15)",
    greeting: "Vector search initialized. I am customized to evaluate Geetish for RAG & LLM Engineer positions. Ask me about his work on multi-lingual semantic retrieval, Qdrant vector database, or chunking strategies!",
    suggestions: ["Explain Aurora RAG system", "Vector DB & Chunking", "Groq LLaMA 3.1 usage", "FastAPI API Design"],
    primaryProjects: ["Aurora", "MindSarthi"],
    primarySkills: ["LangChain", "Qdrant", "Ollama", "Groq LLaMA 3.1", "FastAPI", "RAGAS"],
    hyperparams: { aiCapacity: 98, cvDepth: 40, dataPipes: 75, mobilePolish: 80, systemScale: 90, productScope: 70 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.65 }, { x: 20, y: 0.42 }, { x: 30, y: 0.22 }, { x: 40, y: 0.11 }, { x: 50, y: 0.04 }],
    accuracyCurve: [{ x: 0, y: 0.15 }, { x: 10, y: 0.58 }, { x: 20, y: 0.82 }, { x: 30, y: 0.93 }, { x: 40, y: 0.97 }, { x: 50, y: 0.99 }],
    epochLogs: [
      "Initializing RAG/LLM tuning context collection...",
      "Embedding document chunks [mxbai-embed-large] -> 512 dimensions.",
      "Loading Qdrant index: Maximal Marginal Relevance enabled.",
      "Epoch 10: Embedding loss = 0.65 · Retrieval Precision = 78%",
      "Epoch 30: Context Recall = 89.8% · Groq LLaMA 3.1 online.",
      "Epoch 50: Evaluation complete. Context Precision stabilized at 89.8%"
    ]
  },
  ml: {
    id: "ml",
    title: "Machine Learning & CV",
    accent: "#ef4444", // Crimson Red
    accentGlow: "rgba(239, 68, 68, 0.15)",
    greeting: "Neural net weights loaded. Ask me about Geetish's ML & CV expertise, including training YOLOv8 pipelines, CNN architectures, real-time object tracking, and OpenCV latency optimizations!",
    suggestions: ["ResQVision model details", "YOLOv8 & OpenCV latency", "EmotionXtract accuracy", "Deep Learning stack"],
    primaryProjects: ["ResQVision", "EmotionXtract"],
    primarySkills: ["TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "CNN", "Python"],
    hyperparams: { aiCapacity: 85, cvDepth: 98, dataPipes: 85, mobilePolish: 50, systemScale: 88, productScope: 65 },
    lossCurve: [{ x: 0, y: 1.2 }, { x: 10, y: 0.78 }, { x: 20, y: 0.55 }, { x: 30, y: 0.31 }, { x: 40, y: 0.18 }, { x: 50, y: 0.08 }],
    accuracyCurve: [{ x: 0, y: 0.2 }, { x: 10, y: 0.62 }, { x: 20, y: 0.78 }, { x: 30, y: 0.88 }, { x: 40, y: 0.90 }, { x: 50, y: 0.91 }],
    epochLogs: [
      "Warming neural network pipelines. Instantiating YOLOv8 backbone...",
      "Loading IISc-AIM UVH-26 dataset (5,000+ annotated frames).",
      "Epoch 10: Loss = 0.78 · Validation mAP = 62%",
      "Epoch 30: Loss = 0.31 · Validation mAP = 88%",
      "Epoch 50: Weights convergence achieved. mAP stabilized at 91.0% · Inference: 0.2s"
    ]
  },
  data: {
    id: "data",
    title: "Data Scientist / Analyst",
    accent: "#fbbf24", // Yellow/Gold
    accentGlow: "rgba(251, 191, 36, 0.15)",
    greeting: "Data ingestion complete. Ask me about Geetish's data analytics experience, MySQL integrations, Pandas pipelines, Power BI interactive dashboard reporting, and key business insights!",
    suggestions: ["Customer Trend Analysis", "Enterprise Dashboard metrics", "Pandas & MySQL workflows", "Power BI dashboard design"],
    primaryProjects: ["Customer Trends Analysis", "Enterprise Dashboard"],
    primarySkills: ["Pandas", "NumPy", "Power BI", "Tableau", "MySQL", "Hadoop"],
    hyperparams: { aiCapacity: 75, cvDepth: 60, dataPipes: 98, mobilePolish: 40, systemScale: 85, productScope: 80 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.58 }, { x: 20, y: 0.35 }, { x: 30, y: 0.20 }, { x: 40, y: 0.12 }, { x: 50, y: 0.06 }],
    accuracyCurve: [{ x: 0, y: 0.3 }, { x: 10, y: 0.75 }, { x: 20, y: 0.88 }, { x: 30, y: 0.94 }, { x: 40, y: 0.97 }, { x: 50, y: 0.98 }],
    epochLogs: [
      "Opening connection to MySQL procurement databases...",
      "Querying materials logs (300,000+ logs processed). Ingesting to Pandas df.",
      "Epoch 10: Processing latency = 2.5s · Ingestion index = 75%",
      "Epoch 30: Processing latency = 1.2s · Index optimized with SQL indexing.",
      "Epoch 50: Ingestion finished. Latency reduced by 60% · Integrity Check: 100%"
    ]
  },
  flutter: {
    id: "flutter",
    title: "Mobile Dev (Flutter)",
    accent: "#06b6d4", // Cyan
    accentGlow: "rgba(6, 182, 212, 0.15)",
    greeting: "Hot reload complete. I am optimized to discuss Geetish's mobile development expertise. Ask me about his Riverpod state management, MVVM clean architecture, Hive local DB caching, or API integrations!",
    suggestions: ["MindSarthi Flutter app", "Me Matdar performance tips", "Riverpod state management", "MVVM clean layout"],
    primaryProjects: ["MindSarthi", "Aurora"],
    primarySkills: ["Flutter", "Riverpod", "Firebase", "Hive", "Dart", "Figma"],
    hyperparams: { aiCapacity: 80, cvDepth: 45, dataPipes: 70, mobilePolish: 98, systemScale: 85, productScope: 75 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.70 }, { x: 20, y: 0.48 }, { x: 30, y: 0.30 }, { x: 40, y: 0.18 }, { x: 50, y: 0.09 }],
    accuracyCurve: [{ x: 0, y: 0.25 }, { x: 10, y: 0.68 }, { x: 20, y: 0.82 }, { x: 30, y: 0.90 }, { x: 40, y: 0.95 }, { x: 50, y: 0.97 }],
    epochLogs: [
      "Running Flutter pub get. Resolving flutter_riverpod and hive packages...",
      "Configuring MVVM layout. Initializing local database caching routes.",
      "Epoch 10: UI Frame rebuild time = 16ms · State tracking online.",
      "Epoch 30: Dashboard latency minimized via lazy loading and Riverpod.",
      "Epoch 50: UI performance optimized. Dashboard load speed increased by 30%."
    ]
  },
  sde: {
    id: "sde",
    title: "Junior SDE / Developer",
    accent: "#10b981", // Emerald Green
    accentGlow: "rgba(16, 185, 129, 0.15)",
    greeting: "Environment variables loaded. Ask me about Geetish's Software Engineering capabilities, Django backend systems, REST API design, git version control, database migrations, and clean code hygiene!",
    suggestions: ["Django intern achievements", "FastAPI architecture", "C++ & DSA knowledge", "MySQL database schema"],
    primaryProjects: ["Enterprise Dashboard", "Aurora", "MindSarthi"],
    primarySkills: ["Python", "C++", "Java", "JavaScript", "Django", "FastAPI", "Git", "Linux"],
    hyperparams: { aiCapacity: 85, cvDepth: 80, dataPipes: 85, mobilePolish: 80, systemScale: 98, productScope: 70 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.72 }, { x: 20, y: 0.50 }, { x: 30, y: 0.32 }, { x: 40, y: 0.18 }, { x: 50, y: 0.08 }],
    accuracyCurve: [{ x: 0, y: 0.2 }, { x: 10, y: 0.65 }, { x: 20, y: 0.80 }, { x: 30, y: 0.91 }, { x: 40, y: 0.95 }, { x: 50, y: 0.98 }],
    epochLogs: [
      "Verifying system runtime. Checking C++ and Python compile versions...",
      "Parsing REST API endpoints. Validating Django atomic transactions.",
      "Epoch 10: Build passing · Tests running: 24/24 success.",
      "Epoch 30: Database index optimizations verify successful migrations.",
      "Epoch 50: Codebase compile nominal. Git verification: 100% clean."
    ]
  },
  pm: {
    id: "pm",
    title: "Product Manager (Tech)",
    accent: "#3b82f6", // Royal Blue
    accentGlow: "rgba(59, 130, 246, 0.15)",
    greeting: "Product roadmap loaded. I am prepared to highlight Geetish's leadership, communication, team coordination, project delivery metrics, KPI ownership, and user-centric problem solving!",
    suggestions: ["IEEE Branch Leadership", "KPI impact & metrics", "NGO volunteering", "Hackathon project scoping"],
    primaryProjects: ["Aurora", "MindSarthi", "Enterprise Dashboard"],
    primarySkills: ["Figma", "Firebase", "Power BI", "Git", "Linux"],
    hyperparams: { aiCapacity: 80, cvDepth: 60, dataPipes: 85, mobilePolish: 75, systemScale: 80, productScope: 98 },
    lossCurve: [{ x: 0, y: 1.0 }, { x: 10, y: 0.75 }, { x: 20, y: 0.52 }, { x: 30, y: 0.35 }, { x: 40, y: 0.20 }, { x: 50, y: 0.10 }],
    accuracyCurve: [{ x: 0, y: 0.18 }, { x: 10, y: 0.58 }, { x: 20, y: 0.79 }, { x: 30, y: 0.89 }, { x: 40, y: 0.94 }, { x: 50, y: 0.97 }],
    epochLogs: [
      "Loading product roadmaps. Fetching user persona models...",
      "Setting sprint milestones for the IEEE Student Branch and CSE student logs.",
      "Epoch 10: MVP scope defined · User feedback backlog initialized.",
      "Epoch 30: Iteration delivery verified. User retention checks pass (200%+ target).",
      "Epoch 50: Roadmap complete. Milestones achieved on time · Risk mitigation: 100%."
    ]
  }
};