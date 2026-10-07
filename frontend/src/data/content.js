export const PERSON = {
  name: "Harshitha C.",
  nameUpper: "HARSHITHA C.",
  role: "Software Developer",
  tagline:
    "I build full-stack applications — designing backend APIs, modelling the databases behind them and shipping clean React interfaces on top of them.",
  techLine: "Java • Spring Boot • React • REST APIs • MySQL",
  email: "harshithac0512@gmail.com",
  location: "Mysore, India",
  github: "https://github.com/Harshitha0501",
  linkedin: "https://linkedin.com/in/harshitha-c2605",
  resumeUrl: `${process.env.PUBLIC_URL}/Harshitha_C_Resume.pdf`,
  photo: `${process.env.PUBLIC_URL}/profile-photo.jpg`,
};

export const TECH_STACK = [
  { label: "Java", icon: "coffee" },
  { label: "Spring Boot", icon: "leaf" },
  { label: "React", icon: "atom" },
  { label: "REST APIs", icon: "braces" },
  { label: "MySQL", icon: "database" },
  { label: "MongoDB", icon: "layers" },
  { label: "Docker", icon: "container" },
  { label: "Git / GitHub", icon: "git-branch" },
];

export const SNAPSHOT = [
  { icon: "grad", label: "B.E. — Electronics & Communication Engineering" },
  { icon: "coffee", label: "Java + Spring Boot" },
  { icon: "atom", label: "React + JavaScript" },
  { icon: "braces", label: "REST APIs" },
  { icon: "db", label: "MySQL · MongoDB · H2" },
  { icon: "rocket", label: "Full-Stack Development" },
  { icon: "pin", label: "Mysore, India" },
];

export const ABOUT_TEXT =
  "I'm a Software Developer with a B.E. in Electronics and Communication Engineering. I build full-stack applications — REST APIs in Java and Spring Boot, database integration on MySQL and MongoDB, and React frontends on top. Most of my work is the part that makes software actually work: clean API integration, patient debugging, and shipping applications people can genuinely use.";

export const FOCUSED_ON = ["Java", "Spring Boot", "React", "REST APIs", "MySQL", "Git / GitHub"];

export const EDUCATION = {
  institution: "Vidya Vikas Institute of Engineering and Technology, Mysore",
  degree: "B.E. in Electronics and Communication Engineering",
  period: "Aug 2019 – Jun 2023",
  cgpa: "CGPA: 7.16 / 10",
};

export const EXPERIENCE = [
  {
    num: "01",
    role: "Freelance Full Stack Developer",
    company: "Pre-Startup Client",
    project: "E-commerce Website for Pre-Startup Client",
    location: "Remote",
    period: "2025",
    tags: ["Java", "Spring Boot", "React", "REST APIs", "MySQL"],
    bullets: [
      "Developed approximately 70% of an e-commerce web application using Java, Spring Boot, React, REST APIs, and MySQL.",
      "Built core product catalog, shopping cart, checkout, user account, and order management features with CRUD operations and database integration.",
      "Implemented Admin and Customer roles with role-based access control for application features and workflows.",
      "Worked directly with the client on requirements, feature development, API integration, debugging, and assigned scope delivery within 2 months.",
    ],
  },
  {
    num: "02",
    role: "Software Developer Intern",
    company: "Sigvitas & Company",
    project: "Patent Search & Clustering Application",
    location: "Mysore, Karnataka",
    period: "Oct 2024 – Dec 2024",
    tags: ["Java", "Spring Boot", "React", "REST APIs"],
    bullets: [
      "Developed frontend and backend features for a patent search and clustering application across 3+ key modules.",
      "Integrated 5+ REST API workflows and resolved frontend–backend integration issues during development.",
      "Fixed cross-browser compatibility issues to improve application usability.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "staffhub",
    featured: true,
    name: "StaffHub",
    subtitle: "Employee Management System",
    description:
      "Full-stack employee management system supporting Admin, HR and Employee roles, with attendance, leave, payroll, tasks and employee management behind role-based access control and REST APIs.",
    tech: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "H2", "JavaScript"],
    techLine: "Java • Spring Boot • Spring Security • Spring Data JPA • H2",
    screenshot: `${process.env.PUBLIC_URL}/staffhub-preview.jpeg`,
    github: "https://github.com/Harshitha0501/staffhub-employee-management",
    demo: "https://staffhub-employee-management.onrender.com",
    problem:
      "Managing employees, attendance, leave and payroll through disconnected processes can be inefficient and error-prone for small teams.",
    built:
      "Developed a full-stack employee management system with separate Admin, HR and Employee workflows, role-based access control and REST APIs covering every core HR operation.",
    features: [
      "Admin, HR and Employee roles",
      "Attendance management",
      "Leave management",
      "Payroll",
      "Task management",
      "Employee management",
      "Role-based access control",
      "REST APIs",
    ],
  },
  {
    id: "sf-crud",
    name: "Salesforce CRUD App",
    subtitle: "Salesforce Integration Application",
    description:
      "React + FastAPI application that integrates with Salesforce using OAuth 2.0 and supports CRUD workflows on Salesforce data.",
    tech: ["React", "FastAPI", "OAuth 2.0", "REST APIs"],
    techLine: "React • FastAPI • OAuth 2.0 • REST APIs",
    screenshot: `${process.env.PUBLIC_URL}/sf-crud-preview.jpeg`,
    screenshotAlt: "Salesforce CRUD application project preview",
    github: "https://github.com/Harshitha0501/sf-crud-app",
    demo: null,
    problem:
      "Working with Salesforce records usually means switching between consoles — a lightweight connected app makes everyday record work simpler.",
    built:
      "Built a React + FastAPI application that connects to Salesforce over OAuth 2.0 and performs create, read, update and delete workflows on Salesforce data through REST APIs.",
    features: [
      "Salesforce OAuth 2.0 connection",
      "Create, read, update and delete workflows",
      "React frontend",
      "FastAPI REST APIs",
    ],
  },
  {
    id: "skillgap",
    name: "SkillGap AI",
    subtitle: "Career Analysis Platform",
    description:
      "Career analysis platform using rule-based scoring for job matching, missing-skill analysis, career roadmaps and interview preparation.",
    tech: ["React", "FastAPI", "MongoDB", "JavaScript"],
    techLine: "React • FastAPI • MongoDB • JavaScript",
    screenshot: `${process.env.PUBLIC_URL}/skillgap-preview.jpeg`,
    github: "https://github.com/Harshitha0501/skillgap-ai",
    demo: "https://skillgap-ai-mu.vercel.app/",
    problem:
      "Students and career switchers often know the role they want but not which exact skills are missing or what to learn first.",
    built:
      "Built a platform that implements rule-based scoring across 5+ job roles, surfaces missing skills and returns career roadmaps with interview preparation — connecting a React frontend with FastAPI REST APIs.",
    features: [
      "Job matching",
      "Missing-skill analysis",
      "Career roadmaps",
      "Interview preparation",
      "Rule-based scoring across 5+ job roles",
      "React + FastAPI REST APIs",
    ],
  },
  {
    id: "url-shortener",
    name: "URL Shortener",
    subtitle: "URL Shortening Service",
    description:
      "URL shortening service built with Spring Boot and REST APIs, with a web interface for creating and managing shortened URLs.",
    tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "Docker"],
    techLine: "Java • Spring Boot • REST APIs • MySQL • Docker",
    screenshot: `${process.env.PUBLIC_URL}/url-shortener-preview.jpeg`,
    screenshotAlt: "URL Shortener project preview",
    github: "https://github.com/Harshitha0501/url-shortener",
    demo: null,
    problem:
      "Long links are hard to share and manage, and teams need a simple self-hosted way to create, use and share shortened URLs.",
    built:
      "Developed a URL shortening service with a web interface for creating and managing shortened URLs, implementing CRUD operations, database integration, API endpoints and Docker containerization.",
    features: [
      "URL shortening service",
      "Web interface",
      "Create and manage shortened URLs",
      "CRUD operations",
      "Database integration",
      "API endpoints",
      "Docker containerization",
    ],
  },
];

export const SKILLS = [
  { category: "Languages", items: ["Java", "SQL", "JavaScript", "Python"] },
  { category: "Backend", items: ["Spring Boot", "Spring MVC", "Spring Security", "JDBC", "FastAPI", "REST APIs"] },
  { category: "Frontend", items: ["React", "HTML", "CSS", "Bootstrap"] },
  { category: "Databases", items: ["MySQL", "MongoDB", "H2"] },
  { category: "Tools", items: ["Git", "GitHub", "Docker", "Maven", "Postman", "Eclipse", "VS Code", "Microsoft Office"] },
];

export const REPOS = [
  {
    name: "staffhub-employee-management",
    desc: "Full-stack Employee Management System with Spring Boot, Spring Security and H2, featuring Admin, HR and Employee dashboards.",
    lang: "Java",
    langColor: "#f89820",
    url: "https://github.com/Harshitha0501/staffhub-employee-management",
  },
  {
    name: "skillgap-ai",
    desc: "Career analysis platform with rule-based scoring across 5+ job roles, built with React, FastAPI and MongoDB — deployed for live use.",
    lang: "Python",
    langColor: "#3572A5",
    url: "https://github.com/Harshitha0501/skillgap-ai",
  },
  {
    name: "url-shortener",
    desc: "Backend URL Shortener with Java, Spring Boot, MySQL, Docker and REST APIs.",
    lang: "Java",
    langColor: "#f89820",
    url: "https://github.com/Harshitha0501/url-shortener",
  },
  {
    name: "sf-crud-app",
    desc: "React + FastAPI Salesforce integration application using OAuth 2.0 and CRUD workflows.",
    lang: "JavaScript",
    langColor: "#f1e05a",
    url: "https://github.com/Harshitha0501/sf-crud-app",
  },
];

export const CERTIFICATIONS = [
  {
    title: "HackerRank — Software Engineer",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/9a6b4d2791a5",
  },
  {
    title: "HackerRank — SQL (Intermediate)",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/1cbdb84dd236",
  },
];
