export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tags: readonly string[];
  href: string | null;
  /** One tight opening line. */
  lead: string;
  /** Short problem points. */
  context: readonly { label: string; detail: string }[];
  /** What shipped, in one breath. */
  outcome: string;
  /** Stack as label → tech. */
  stack: readonly { label: string; detail: string }[];
  /** Named choices with a one-liner each. */
  decisions: readonly { title: string; detail: string }[];
  /** Hard parts, kept short. */
  friction: readonly { title: string; detail: string }[];
  /** What’s next — optional. */
  roadmap?: readonly { title: string; detail: string }[];
  /** Closing insight. */
  takeaway: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "graphorg",
    title: "GraphOrg",
    subtitle: "Organisation knowledge platform with a page-aware AI assistant",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "Redis",
      "Python",
      "FastAPI",
      "LangChain",
      "Ollama",
      "Docker",
      "Vercel",
    ],
    href: "https://www.graphorg.com",
    lead: "One place to review an organisation’s structure and ask a page-aware AI, answered only from the data in front of you.",
    context: [
      {
        label: "Scattered",
        detail: "Structure lives in docs, chat threads and people’s heads.",
      },
      {
        label: "Stale",
        detail: "Org charts are drawn once, then drift with no source of truth.",
      },
      {
        label: "Unsafe for AI",
        detail: "Wiki dumps leak data and don’t map back to records.",
      },
    ],
    outcome:
      "Multi-tenant org charts for people, teams and departments, plus an AI assistant scoped to the page you’re on.",
    stack: [
      {
        label: "Web",
        detail: "Next.js, React, TypeScript · role-gated pages, flowchart builder",
      },
      {
        label: "Data",
        detail: "PostgreSQL + Drizzle · every query scoped to the org",
      },
      {
        label: "Auth",
        detail: "NextAuth · viewer / editor / admin / owner enforced in API",
      },
      {
        label: "AI worker",
        detail: "FastAPI + LangChain · streams over SSE",
      },
      {
        label: "Models",
        detail: "Ollama locally · hosted open-weights via config",
      },
      {
        label: "Guardrails",
        detail: "Redis rate limits · size budgets · shared-secret boundary",
      },
    ],
    decisions: [
      {
        title: "Context built on the server",
        detail: "Client sends scope + question; API builds tenant-scoped context.",
      },
      {
        title: "One builder, two features",
        detail: "Copy-context and Ask AI share builders; no emails or credentials.",
      },
      {
        title: "Separate AI worker",
        detail: "Streaming LLM calls live in FastAPI, not Next route handlers.",
      },
      {
        title: "Provider-agnostic",
        detail: "Local and hosted models behind one OpenAI-compatible API.",
      },
      {
        title: "Budget the whole prompt",
        detail: "System, page, history and answer share one window; history trims first.",
      },
      {
        title: "Fail honestly",
        detail: "Redis down → chat stays up. No worker → clear setup guidance.",
      },
    ],
    friction: [
      {
        title: "Silent truncation",
        detail: "Raised Ollama’s window and aligned app limits to it.",
      },
      {
        title: "Primary-team races",
        detail: "Advisory locks before mutations; settle step after deletes.",
      },
      {
        title: "Redis first-call fail",
        detail: "Retry + connect timeout, with Redis-down path tests.",
      },
      {
        title: "Stale chat across tabs",
        detail: "Key conversation state by page scope.",
      },
    ],
    roadmap: [
      {
        title: "Deploy the AI worker",
        detail: "Hosted model + provider spend limit",
      },
      {
        title: "Persistence & eval",
        detail: "Stored chats, injection cases, groundedness checks",
      },
      {
        title: "Observability",
        detail: "Tracing and cost tracking via Langfuse",
      },
      {
        title: "Retrieval & MCP",
        detail: "pgvector for cross-page Q&A; MCP under the same access rules",
      },
    ],
    takeaway:
      "Access control, prompt budgets and honest failure modes matter more than prompt tricks.",
  },
  {
    slug: "mafia",
    title: "Mafia Minds",
    subtitle: "Multiplayer social-deduction platform",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase",
      "Vercel",
    ],
    href: "https://mafiaminds.com",
    lead: "Hidden roles only work if the server enforces them: against the UI, and against anyone who opens DevTools.",
    context: [
      {
        label: "Secrets",
        detail: "Roles, private chat and night actions must stay hidden.",
      },
      {
        label: "Real play",
        detail: "Timed phases and voting have to stay fair on any device.",
      },
      {
        label: "Hostile clients",
        detail: "Hidden UI is not access control.",
      },
    ],
    outcome:
      "Realtime multiplayer Mafia with server-enforced roles, phases and chat over Supabase.",
    stack: [
      {
        label: "Client",
        detail: "Next.js / React PWA on Vercel + Tailwind",
      },
      {
        label: "Realtime",
        detail: "Supabase auth + subscriptions for state, chat and timers",
      },
      {
        label: "Data",
        detail: "Relational tables with FKs, not a single game-state blob",
      },
      {
        label: "Authz",
        detail: "Role membership checked in queries and API handlers",
      },
    ],
    decisions: [
      {
        title: "Never trust the client",
        detail: "Roles and night actions validated server-side before they resolve.",
      },
      {
        title: "Chat scoped in the query",
        detail: "Wrong role → no rows. Membership comes from the database.",
      },
      {
        title: "Hide existence",
        detail: "Restricted channels can’t be enumerated from outside.",
      },
    ],
    friction: [
      {
        title: "API bypass",
        detail: "Authorization at the data layer, not the UI.",
      },
      {
        title: "Timers & races",
        detail: "Deterministic phase and vote resolution under latency.",
      },
    ],
    takeaway:
      "Authorize at the data layer first. Clients are views that can be stale: never the source of truth.",
  },
  {
    slug: "graafex",
    title: "Graafex",
    subtitle: "Creative studio marketing site for strategy, design and film",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Vercel",
    ],
    href: "https://graafex.com",
    lead: "A film-first studio site where motion, portfolio and case studies stay fast without a CMS.",
    context: [
      {
        label: "Film-heavy",
        detail: "Hero and portfolio need video that feels premium, not sluggish.",
      },
      {
        label: "Frequent updates",
        detail: "New client work should ship without rebuilding page templates.",
      },
      {
        label: "Brand presence",
        detail: "Scroll, type and hover states have to carry the studio’s identity.",
      },
    ],
    outcome:
      "A Next.js marketing site with scroll-driven intro, hover-play portfolio grid, and data-driven case study pages for films, reels and photos.",
    stack: [
      {
        label: "Web",
        detail: "Next.js App Router, React, TypeScript",
      },
      {
        label: "Style",
        detail: "Tailwind CSS · Syne via next/font",
      },
      {
        label: "Motion",
        detail: "Motion library for scroll and hover interactions",
      },
      {
        label: "Content",
        detail: "Typed site copy and case study entries in lib/",
      },
      {
        label: "Deploy",
        detail: "Vercel",
      },
    ],
    decisions: [
      {
        title: "Case studies as data",
        detail: "One entry object drives the card and the detail page: video, reels, photos.",
      },
      {
        title: "Film-first layout",
        detail: "Hero and portfolio lead with video; stills and reels follow as optional sections.",
      },
      {
        title: "Hover-play grid",
        detail: "Portfolio cards preview on hover so browsing stays immersive without autoplay noise.",
      },
      {
        title: "No CMS for v1",
        detail: "Typed content files keep deploy simple while the brand and reel set settle.",
      },
    ],
    friction: [
      {
        title: "Video formats",
        detail: "Standardised on MP4: browsers don’t reliably play .mov.",
      },
      {
        title: "Layout shift on photos",
        detail: "Read local image sizes at build time so galleries don’t jump.",
      },
      {
        title: "Placeholder content",
        detail: "Site copy and media stay swappable from lib/ and public/ without template churn.",
      },
    ],
    roadmap: [
      {
        title: "Real brand media",
        detail: "Replace hero, reels and case study assets with final deliverables",
      },
      {
        title: "CMS when needed",
        detail: "Move entries to a headless CMS once update cadence demands it",
      },
    ],
    takeaway:
      "For a studio site, the template is the product: data-driven pages and careful video handling matter more than a CMS on day one.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
