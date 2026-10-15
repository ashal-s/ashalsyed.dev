export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tags: readonly string[];
  draft: boolean;
  href: string | null;
  /** One tight opening line. */
  lead: string;
  /** The friction, as short labeled points — not a “Problem” essay. */
  context: readonly { label: string; detail: string }[];
  /** What shipped, in one breath. */
  outcome: string;
  /** How the system is put together — shown as a flow, not paragraphs. */
  stack: readonly { label: string; detail: string }[];
  /** Named choices with a one-liner each. */
  decisions: readonly { title: string; detail: string }[];
  /** Hard parts, kept short. */
  friction: readonly { title: string; detail: string }[];
  /** What’s next — optional. */
  roadmap?: readonly { title: string; detail: string }[];
  /** Closing insight — pull-quote style. */
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
    draft: true,
    href: "https://www.graphorg.com",
    lead: "Org knowledge goes stale in slide decks and wikis. People ask “who owns this?” and “who reports to whom?” and get a guess.",
    context: [
      {
        label: "Scattered context",
        detail:
          "Who is on which team, who leads a department and how the org fits together lives in docs, chat threads and people’s heads.",
      },
      {
        label: "Stale by default",
        detail:
          "Org charts are drawn once and drift. Nobody can say which copy is current, or who is allowed to change it.",
      },
      {
        label: "Hard to hand to an AI",
        detail:
          "Pasting a wiki export into a chatbot leaks data it shouldn’t see and answers that don’t trace back to a record.",
      },
    ],
    outcome:
      "GraphOrg is a multi-tenant web app that models people, teams and departments with relationships, renders them as an org chart, and lets each user ask an AI assistant questions about the page they’re looking at, answered only from that page’s data.",
    stack: [
      {
        label: "Web app",
        detail:
          "Next.js 16 (App Router), React 19 and TypeScript, with role-gated pages and a flowchart builder",
      },
      {
        label: "Data",
        detail:
          "PostgreSQL 16 with Drizzle ORM and migrations; every query is scoped to the caller’s organisation",
      },
      {
        label: "Auth & access",
        detail:
          "NextAuth sessions with organisation roles (viewer, editor, admin, owner) enforced in the API and queries, not just hidden in the UI",
      },
      {
        label: "AI worker",
        detail:
          "A separate Python 3.12 FastAPI service using LangChain over an OpenAI-compatible API, streaming tokens over SSE",
      },
      {
        label: "Models",
        detail:
          "Qwen 2.5 7B through Ollama locally; a hosted open-weights model via config, with no code change",
      },
      {
        label: "Guardrails",
        detail:
          "Redis rate limiter, request size budgets, capped answers and a shared-secret boundary between web and worker",
      },
      {
        label: "Quality & ops",
        detail:
          "Jest and React Testing Library (500+ web tests) and pytest for the worker; Docker Compose for Postgres and Redis, web app deployed on Vercel",
      },
    ],
    decisions: [
      {
        title: "Build the context on the server",
        detail:
          "The browser sends only a page scope and a question. The API route builds the context from the database for the signed-in user’s organisation, so a client can’t ask about, or inject, another tenant’s data.",
      },
      {
        title: "One context builder, two features",
        detail:
          "The “copy page context” button and the AI assistant share the same per-page builders. Context is deliberately shallow, with related records as references, and leaves out emails, credentials and photo URLs.",
      },
      {
        title: "A separate worker, not a route handler",
        detail:
          "LLM calls are long-lived and streaming, and the Python ecosystem is where the tooling lives. A small FastAPI service keeps prompts and provider logic out of the web app and can scale and deploy independently.",
      },
      {
        title: "Provider-agnostic from day one",
        detail:
          "Local and hosted models sit behind the same OpenAI-compatible interface. The UI shows which kind answered, and development costs nothing.",
      },
      {
        title: "Budget the prompt as a whole",
        detail:
          "System prompt, page data, history, question and answer share one context window. A budgeter packs them together and trims the oldest history first, so a large page can’t silently truncate itself.",
      },
      {
        title: "Fail open on the limiter, cap at the provider",
        detail:
          "If Redis is down, chat stays up and the provider’s spend limit is the backstop that protects cost without becoming a single point of failure.",
      },
      {
        title: "Degrade honestly when AI isn’t set up",
        detail:
          "With no worker configured, the Ask AI panel explains what to deploy instead of failing with a generic error.",
      },
    ],
    friction: [
      {
        title: "Silent context truncation",
        detail:
          "Ollama defaults to a 4,096-token window and drops the overflow — the model answers wrong without warning. I raised the window and derived the app’s limits from it so they change together.",
      },
      {
        title: "Concurrency in “primary team” rules",
        detail:
          "Each person has exactly one primary team or department. Concurrent edits could leave someone with none. I fixed it with ordered advisory locks taken before any mutation, and a settle step after deletes.",
      },
      {
        title: "A Redis client that blocked the first request",
        detail:
          "Disabling the offline queue made the limiter reject its very first call. I added retry and connect timeout, plus tests for the Redis-down path.",
      },
      {
        title: "Stale chat state across tabs",
        detail:
          "On the org chart, switching tabs changed the data but kept the old conversation, mixing turns from different views. Keying the chat by page scope resets it cleanly.",
      },
    ],
    roadmap: [
      {
        title: "Deploy the AI worker",
        detail:
          "Run it on a container host with a hosted model and a provider spend limit. Today the web app is live on Vercel and the worker runs locally.",
      },
      {
        title: "Persistence and evaluation",
        detail:
          "Stored conversations, a small evaluation set including prompt-injection cases, and groundedness checks on answers.",
      },
      {
        title: "Observability",
        detail:
          "Tracing and cost tracking for every model call, with Langfuse as the default.",
      },
      {
        title: "Retrieval and MCP",
        detail:
          "pgvector search for questions that span pages, and an MCP server so external agents can query the graph under the same access rules.",
      },
    ],
    takeaway:
      "Most of the work in an AI feature isn’t the model call. It’s deciding what the model may see, bounding what it can cost, and failing clearly when it isn’t there. Keeping access control on the server and budgeting the whole prompt mattered more than any prompt trick.",
  },
  {
    slug: "mafia",
    title: "Mafia",
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
    draft: true,
    href: null,
    lead: "Mafia only works when some players know things others don’t — and that asymmetry has to hold against anyone who opens DevTools.",
    context: [
      {
        label: "Asymmetric information",
        detail:
          "Roles, private chat and night actions must stay secret for the game to work at all.",
      },
      {
        label: "Real games, not demos",
        detail:
          "Timed phases, voting and multi-round play have to stay fair over phones and desktops.",
      },
      {
        label: "Hostile clients",
        detail:
          "A curious player will call the API directly. Hidden UI is not access control.",
      },
    ],
    outcome:
      "A real-time multiplayer platform modelled as games, players, roles, phases, actions, votes and chats — with every privilege enforced server-side and state pushed live over Supabase.",
    stack: [
      {
        label: "Client",
        detail: "Next.js / React PWA on Vercel + Tailwind",
      },
      {
        label: "Auth & realtime",
        detail: "Supabase auth, subscriptions for state, chat and timers",
      },
      {
        label: "Data model",
        detail: "Relational tables with FKs — not a single game-state blob",
      },
      {
        label: "Authorization",
        detail: "Role membership checked in queries and API handlers",
      },
    ],
    decisions: [
      {
        title: "Never trust the client",
        detail:
          "Roles are assigned server-side. Night actions validate role + phase before they resolve.",
      },
      {
        title: "Chat scoped in the query",
        detail:
          "Channel membership comes from a role-membership table. Wrong role → no rows, period.",
      },
      {
        title: "Hide existence, not just content",
        detail:
          "Players outside a restricted channel can’t enumerate that it exists.",
      },
    ],
    friction: [
      {
        title: "API bypass",
        detail:
          "Stopping a Mafia player from reading Cult chat by hitting the API meant authorization at the data layer, not the UI.",
      },
      {
        title: "Timers & simultaneous actions",
        detail:
          "Keeping phases in sync under latency, and resolving votes/night actions deterministically in the same window.",
      },
    ],
    takeaway:
      "Design authorization at the data layer first; the UI is a convenience on top. Shared realtime state needs a single server source of truth — clients are views that can be stale, and must be reconciled rather than trusted.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
