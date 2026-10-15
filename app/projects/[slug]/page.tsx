import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { site } from "@/lib/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.title} Case Study · ${site.name}`;
  const description = caseStudy.lead;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${site.domain}/projects/${caseStudy.slug}`,
      siteName: site.domain,
      type: "article",
    },
  };
}

function displayUrl(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border/50 pt-8">
      <h2 className="font-mono text-xs uppercase tracking-wider text-accent mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const nav = [
    { id: "problem", label: "Problem" },
    { id: "shipped", label: "Shipped" },
    { id: "stack", label: "Stack" },
    { id: "decisions", label: "Decisions" },
    { id: "hard-parts", label: "Hard parts" },
    ...(caseStudy.roadmap?.length
      ? [{ id: "next", label: "Next" }]
      : []),
  ];

  return (
    <main className="pt-24 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10 font-mono group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          ~/projects
        </Link>

        <header className="mb-10">
          <p className="font-mono text-xs text-accent mb-3">Case Study</p>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight">
            {caseStudy.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            {caseStudy.subtitle}
          </p>

          {caseStudy.href && (
            <a
              href={caseStudy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 mt-4 font-mono text-sm tracking-wide text-foreground underline decoration-foreground/25 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 ease-out hover:text-accent hover:decoration-accent"
            >
              {displayUrl(caseStudy.href)}
              <ArrowUpRight
                className="h-3.5 w-3.5 shrink-0 opacity-60 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                aria-hidden
              />
            </a>
          )}

          {caseStudy.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-6">
              {caseStudy.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug mb-8">
          {caseStudy.lead}
        </p>

        <nav
          aria-label="Case study sections"
          className="flex flex-wrap gap-x-5 gap-y-2 mb-10 pb-2"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-mono text-xs tracking-wide text-foreground underline decoration-foreground/30 underline-offset-[4px] transition-[color,text-decoration-color] duration-200 hover:text-accent hover:decoration-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          <Section id="problem" title="Problem">
            <dl className="space-y-4">
              {caseStudy.context.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-xs text-foreground pt-0.5">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-foreground leading-relaxed">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="shipped" title="What shipped">
            <p className="text-sm text-foreground leading-relaxed max-w-2xl">
              {caseStudy.outcome}
            </p>
          </Section>

          <Section id="stack" title="Stack">
            <dl className="space-y-3">
              {caseStudy.stack.map((step) => (
                <div
                  key={step.label}
                  className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-xs text-accent pt-0.5">
                    {step.label}
                  </dt>
                  <dd className="text-sm text-foreground leading-relaxed">
                    {step.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="decisions" title="Decisions">
            <ol className="space-y-4">
              {caseStudy.decisions.map((item, i) => (
                <li
                  key={item.title}
                  className="grid gap-1 sm:grid-cols-[2rem_1fr] sm:gap-3"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="hard-parts" title="Hard parts">
            <dl className="space-y-4">
              {caseStudy.friction.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-foreground">
                    {item.title}
                  </dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {caseStudy.roadmap && caseStudy.roadmap.length > 0 && (
            <Section id="next" title="Next">
              <ul className="space-y-3">
                {caseStudy.roadmap.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <blockquote className="border-l-2 border-accent pl-5 py-1">
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              {caseStudy.takeaway}
            </p>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
