export const site = {
  name: "Ashal Syed",
  domain: "AshalSyed.dev",
  title: "Software Engineer",
  tagline:
    "I build software end to end: frontend, backend, databases, infrastructure, testing, and AI features.",
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
    "I'm a software engineer based in Melbourne who likes building products end to end architecture, backend, database design, infrastructure and the UI on top. I'm especially interested in startups where engineers work close to the product and can see the impact of their work directly.",
  highlights: [
    {
      label: "Current role",
      value: "Software Prod & Platform Engineering Analyst at Accenture",
    },
    {
      label: "Background",
      value: "Bachelor of Computer Science, Deakin University",
    },
    {
      label: "Focus",
      value: "Full-stack product engineering across frontend, backend, infrastructure and testing",
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
      { name: "FastAPI", level: 78 },
      { name: "PostgreSQL", level: 80 },
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
      { name: "Figma", level: 70 },
      { name: "Jira", level: 78 },
    ],
  },
] as const;

export const projects = [
  {
    title: "GraphOrg",
    subtitle: "Organisation knowledge platform with a page-aware AI assistant",
    summary:
      "Multi-tenant org charts for people, teams and departments: plus a page-aware AI assistant that answers only from the data on the page you’re viewing.",
    description:
      "GraphOrg is a multi-tenant web app that models people, teams and departments with relationships, renders them as an org chart, and lets each user ask an AI assistant questions about the page they’re looking at, answered only from that page’s data.",
    tags: ["Python", "TypeScript", "Next.js", "PostgreSQL", "FastAPI", "Ollama"],
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
    role: "Software Prod & Platform Engineering Analyst",
    company: "Accenture",
    description:
      "Contributing to enterprise software delivery for the Australian Taxation Office's PayDay Super project. Working across backend validation, database queries, system integration, defect investigation and end-to-end testing of interconnected services. Collaborating with developers and engineers throughout Agile delivery cycles to support system reliability and production readiness.",
  },
  {
    period: "Jan 2024 - Sep 2025",
    role: "Software Engineer",
    company: "Webifex Labs",
    description:
      "Developed and delivered production full-stack applications for external clients, translating business requirements into scalable software solutions. Built RESTful APIs, backend services and database architectures using Node.js, Express.js, PostgreSQL and MongoDB, alongside React and Next.js interfaces. Owned features from design through deployment, including authentication, payment integrations, CI/CD workflows and production support.",
  },
] as const;

export const nowBuilding = [
  "GraphOrg   Org knowledge platform · latest: page-aware AI assistant and multi-tenant org chart",
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
  "Reinvention with Agentic AI",
  "ICAgile Fundamentals",
] as const;
