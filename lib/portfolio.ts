export const site = {
  name: "Ashal Syed",
  domain: "AshalSyed.dev",
  title: "Software Engineer",
  tagline:
    "I build software end to end: full-stack products, enterprise platforms, and AI-backed features from requirements through deployment.",
  email: "ashal.syed@gmail.com",
  cvUrl: "/resume/Ashal%20Resume.pdf",
  location: "Melbourne, Australia",
  availability: "Melbourne, Australia",
  github: "https://github.com/ashal-s",
  linkedin: "https://www.linkedin.com/in/ashalsyed",
} as const;

export const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#activity", label: "Activity" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    href: site.github,
    handle: "@ashal-s",
  },
  {
    name: "LinkedIn",
    href: site.linkedin,
    handle: "ashalsyed",
  },
  {
    name: "Email",
    href: `mailto:${site.email}`,
    handle: "@ashal.syed",
  },
] as const;

export const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Building GraphOrg",
  "Building Mafia Minds",
  "Software Engineer",
  "Building Graafex",
] as const;

export const about = {
  intro:
    "Software engineer with 3+ years across full-stack development and enterprise software delivery. Background in startup product development and enterprise systems within Agile teams, taking features from requirements through development, testing and deployment. Currently building GraphOrg, an organisational knowledge platform with AI integration capabilities.",
  highlights: [
    {
      label: "Current role",
      value: "Software Prod & Platform Engineer at Accenture",
    },
    {
      label: "Background",
      value: "Bachelor of Computer Science, Deakin University",
    },
    {
      label: "Focus",
      value: "Full-stack product engineering and enterprise platform delivery",
    },
  ],
} as const;

export const skillGroups = [
  {
    name: "Languages",
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 78 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    name: "Backend & Data",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "FastAPI", level: 78 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 76 },
      { name: "Supabase", level: 78 },
      { name: "Redis", level: 74 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    name: "AI",
    skills: [
      { name: "LangChain", level: 78 },
      { name: "Ollama", level: 75 },
      { name: "OpenAI-compatible APIs", level: 76 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 75 },
      { name: "Docker", level: 78 },
      { name: "Vercel", level: 85 },
      { name: "GitHub Actions", level: 82 },
    ],
  },
  {
    name: "Testing & Observability",
    skills: [
      { name: "Jest", level: 80 },
      { name: "Playwright", level: 78 },
      { name: "Sentry", level: 72 },
      { name: "Better Stack", level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Azure DevOps", level: 78 },
      { name: "Figma", level: 70 },
      { name: "Jira", level: 78 },
    ],
  },
] as const;

export const projects = [
  {
    title: "GraphOrg",
    subtitle: "Organisational knowledge & AI platform",
    summary:
      "Full-stack platform that maps organisational structures, employees, teams, software services and technical dependencies, with a context-aware AI assistant backed by LangChain and FastAPI.",
    description:
      "GraphOrg maps people, teams, services, repositories and technical dependencies across an organisation. It includes backend APIs, relational data models and auth workflows, plus a context-aware AI assistant using LangChain and FastAPI with streamed responses from local and hosted LLMs, containerised with Docker for local and self-hosted setups.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "LangChain", "FastAPI", "Ollama"],
    href: "https://www.graphorg.com",
    github: null,
    caseStudyHref: "/projects/graphorg",
    featured: true,
    hidden: false,
    year: "2025: Present",
  },
  {
    title: "Graafex",
    subtitle: "Creative studio marketing site for strategy, design and film",
    summary:
      "A film-first marketing site with scroll-driven motion, a hover-play portfolio, and data-driven case study pages for a creative studio.",
    description:
      "Graafex is the marketing site for a creative studio focused on strategy, design and film: video hero, portfolio grid, and per-project case study pages built as data so new work ships without new templates.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Motion"],
    href: "https://graafex.com",
    github: null,
    caseStudyHref: "/projects/graafex",
    featured: false,
    hidden: false,
    year: "2025: Present",
  },
  {
    title: "Mafia Minds",
    subtitle: "Multiplayer social-deduction platform",
    summary:
      "Real-time multiplayer Mafia with roles, timed phases, private chat, and server-enforced game rules: built for actual games, not demos.",
    description:
      "A long-form multiplayer Mafia platform supporting games with multiple roles, timed phases, private communication, voting and automated game management, built for real games with real people rather than a tech demo.",
    tags: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    href: "https://mafiaminds.com",
    github: null,
    caseStudyHref: "/projects/mafia",
    featured: false,
    hidden: false,
    year: "2025: Present",
  },
  {
    title: "Pachrukhi",
    subtitle: "Family history and genealogy platform",
    summary:
      "Early work on the hard parts of genealogy software: family graphs, search, privacy, and media at scale.",
    description:
      "An early-stage project working through the harder engineering problems in genealogy software: graph-like family relationships, searching large family structures, privacy and access control over sensitive records, and media and document handling at scale. Still early, more to show here soon.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    href: null,
    github: null,
    caseStudyHref: null,
    featured: false,
    hidden: true,
    year: "2026",
  },
] as const;

export const experience = [
  {
    period: "Sep 2025 - Present",
    role: "Software Prod & Platform Engineer",
    company: "Accenture",
    description:
      "Contributing to an enterprise government platform for the Australian Taxation Office's PayDay Super program, working across interconnected systems. Collaborate with developers, system designers, testers, product owners and business analysts on system integration, issue resolution and delivery requirements. Work in a structured Agile environment (sprint planning, stand-ups, refinement and releases), analysing requirements and technical specifications to validate workflows. Support delivery workflows in Azure DevOps spanning work item tracking, defect management and release coordination.",
  },
  {
    period: "Jan 2024 - Sep 2025",
    role: "Software Engineer",
    company: "Webifex Labs",
    description:
      "Delivered software products and client solutions in a fast-paced startup environment, working directly with customers to gather requirements, define scope and turn business needs into technical solutions. Owned the end-to-end SDLC from consultation and system design through development, testing, deployment and production support. Built full-stack applications with backend services, RESTful APIs, database architectures and user-facing interfaces, including authentication, payment processing and third-party integrations. Established CI/CD pipelines and automated deployment workflows, collaborating across concurrent projects with code reviews and production issue resolution.",
  },
  {
    period: "Jan 2023 - Dec 2023",
    role: "System Analyst",
    company: "Aphex Pharma Solutions",
    description:
      "Oversaw daily IT operations including hardware and software troubleshooting, network connectivity, data backups and infrastructure reliability. Maintained company websites and internal infrastructure to support business operations. Administered the Microsoft 365 environment (Exchange, Teams, OneDrive and email hosting) with a focus on functionality, security and compliance.",
  },
] as const;

export const nowBuilding = [
  "GraphOrg   Organisational knowledge & AI platform · latest: LangChain/FastAPI assistant and org dependency mapping",
  "Graafex   Creative studio marketing site · latest: film-first portfolio and data-driven case studies",
  "Mafia Minds   Multiplayer social-deduction platform · latest: building out the voting system and timed game phases",
] as const;

export const stats = [
  { value: "3+", label: "Years in software engineering" },
  { value: "2", label: "Professional certifications" },
  { value: "3", label: "Products in active development" },
] as const;

export const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Deakin University",
    detail: "Major in Full-Stack Development",
  },
] as const;

export const certifications = [
  "Reinvention with Agentic AI, Accenture",
  "ICAgile Fundamentals, International Consortium for Agile",
] as const;
