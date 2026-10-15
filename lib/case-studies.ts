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
  /** Closing insight — pull-quote style. */
  takeaway: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "graphorg",
    title: "GraphOrg",
    subtitle: "Company knowledge and engineering context platform",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    draft: true,
    href: "https://www.graphorg.com",
    lead: "Engineers shouldn’t need five tools to answer “who owns this” or “what depends on what.”",
    context: [
      {
        label: "Scattered context",
        detail:
          "Ownership, docs and dependencies live across GitHub, Jira, Confluence and cloud consoles — none of which know about each other.",
      },
      {
        label: "No shared IDs",
        detail:
          "The same service shows up as a repo name, a Jira component and a Confluence title, with nothing linking them.",
      },
      {
        label: "Manual stitching",
        detail:
          "Onboarding or a 2am incident means rebuilding the picture by hand, every time.",
      },
    ],
    outcome:
      "GraphOrg syncs those sources into one searchable organisation graph — teams, services, repos, infrastructure and the edges between them — with search, a citation-backed AI assistant, and MCP access for agents.",
    stack: [
      {
        label: "Connectors",
        detail: "GitHub, Jira & Confluence via background incremental sync",
      },
      {
        label: "Graph store",
        detail: "Entities and relationships normalised in PostgreSQL",
      },
      {
        label: "API layer",
        detail: "Auth-gated access for web, search and the assistant",
      },
      {
        label: "Surfaces",
        detail: "Web app, citation-backed AI, MCP for agents",
      },
      {
        label: "Ops",
        detail: "Docker on AWS, CI/CD, observability on sync failures",
      },
    ],
    decisions: [
      {
        title: "Model entities, not mirrors",
        detail:
          "Mirroring tickets and pages doesn’t answer “what does this team own.” Explicit entities and edges do.",
      },
      {
        title: "Cite every AI answer",
        detail:
          "A confident wrong answer about org context is worse than none. Every response traces to a source record.",
      },
      {
        title: "Incremental sync",
        detail:
          "Background sync keeps the graph minutes-fresh and recoverable from partial runs — not a nightly full rebuild.",
      },
    ],
    friction: [
      {
        title: "Identity reconciliation",
        detail:
          "Matching the same service across tools with no shared ID — without false merges — is ongoing tuning, not a one-time fix.",
      },
      {
        title: "Three APIs, three rate limits",
        detail:
          "Different pagination and throttling forced a design that progresses incrementally and survives partial syncs.",
      },
    ],
    takeaway:
      "Citation-backed AI stays useful when it’s imperfect; unverifiable confidence dies the first time it’s caught. Sync freshness isn’t an implementation detail — it’s whether people trust the graph during an incident.",
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
