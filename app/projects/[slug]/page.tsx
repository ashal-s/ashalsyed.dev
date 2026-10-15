import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    return new URL(href).hostname;
  } catch {
    return href.replace(/^https?:\/\//, "");
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

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

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="font-mono text-xs text-accent">Case Study</p>
            {caseStudy.draft && (
              <span className="px-2 py-0.5 rounded-md bg-muted/60 text-xs font-mono text-muted-foreground">
                Draft
              </span>
            )}
          </div>
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
              className="inline-block mt-4 font-mono text-sm text-accent underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors"
            >
              {displayUrl(caseStudy.href)}
            </a>
          )}

          {caseStudy.tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-6">
              {caseStudy.tags.map((tag) => (
                <li key={tag} className="font-mono text-xs text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug mb-12">
          {caseStudy.lead}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-12">
          {caseStudy.context.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/70 bg-card/40 p-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2">
                {item.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed mb-14 max-w-2xl">
          {caseStudy.outcome}
        </p>

        <div className="mb-14">
          <ol className="grid gap-0 sm:grid-cols-1">
            {caseStudy.stack.map((step, i) => (
              <li
                key={step.label}
                className="relative flex gap-4 border-l border-border/70 pl-5 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className="absolute -left-[5px] top-4 size-2.5 rounded-full bg-accent"
                  aria-hidden
                />
                <span className="font-mono text-xs text-muted-foreground tabular-nums pt-0.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {step.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-14">
          {caseStudy.decisions.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-accent/25 bg-accent/5 p-4"
            >
              <p className="text-sm font-semibold text-foreground mb-2 leading-snug">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-14">
          {caseStudy.friction.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-border/60 bg-muted/20 px-4 py-3.5"
            >
              <ArrowRight
                className="w-4 h-4 text-accent shrink-0 mt-0.5"
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-2 border-accent pl-5 py-1">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed italic">
            {caseStudy.takeaway}
          </p>
        </blockquote>
      </div>
    </main>
  );
}
