"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { fadeUpItem, staggerContainer, viewport } from "@/lib/motion";
import { projects } from "@/lib/portfolio";
import { PrimaryButton } from "./primary-button";
import { SectionHeader } from "./section-header";

function displayUrl(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

function LiveLink({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 font-mono text-sm tracking-wide text-foreground underline decoration-foreground/25 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 ease-out hover:text-accent hover:decoration-accent ${className}`}
    >
      {displayUrl(href)}
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 opacity-60 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        aria-hidden
      />
    </a>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Projects" />

        {featured && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
            className="mb-10"
          >
            <FeaturedProject project={featured} />
          </motion.div>
        )}

        {others.length > 0 && (
          <motion.ul
            className="divide-y divide-border/70 border-t border-border/70"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {others.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function FeaturedProject({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudyHref);
  const hasLive = Boolean(project.href);
  const hasGithub = Boolean(project.github);

  return (
    <motion.article
      variants={fadeUpItem}
      className="rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-accent/5 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
            {project.title}
          </h3>

          <p className="text-sm font-medium text-accent/90 mb-2">
            {project.subtitle}
          </p>
          <p className="text-foreground leading-relaxed max-w-xl text-base">
            {project.summary}
          </p>

          <ul className="flex flex-wrap gap-2 mt-5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 shrink-0 md:items-end md:pt-1">
          {hasCaseStudy && project.caseStudyHref && (
            <PrimaryButton
              href={project.caseStudyHref}
              className="px-5 py-2.5 w-full md:w-auto"
            >
              Read case study
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </PrimaryButton>
          )}

          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            {hasLive && project.href && <LiveLink href={project.href} />}
            {hasGithub && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="w-3.5 h-3.5" aria-hidden />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudyHref);
  const hasLive = Boolean(project.href);
  const hasGithub = Boolean(project.github);

  return (
    <motion.li variants={fadeUpItem} className="py-6 md:py-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1.5">
            {project.title}
          </h3>
          <p className="text-sm text-foreground leading-relaxed max-w-xl">
            {project.summary}
          </p>
          <ul className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 md:justify-end md:pt-0.5">
          {hasCaseStudy && project.caseStudyHref && (
            <Link
              href={project.caseStudyHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Case study
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>
          )}
          {hasLive && project.href && <LiveLink href={project.href} />}
          {hasGithub && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden />
              GitHub
            </a>
          )}
          {!hasCaseStudy && !hasLive && !hasGithub && (
            <span className="font-mono text-xs text-muted-foreground">
              In progress
            </span>
          )}
        </div>
      </div>
    </motion.li>
  );
}
