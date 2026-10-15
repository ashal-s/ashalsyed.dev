"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import {
  fadeUpItem,
  springSnappy,
  staggerContainer,
  viewport,
} from "@/lib/motion";
import { projects } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

function displayUrl(href: string) {
  try {
    return new URL(href).hostname;
  } catch {
    return href.replace(/^https?:\/\//, "");
  }
}

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="01   Projects"
          title="Selected work"
          description="What I built, why it matters, and where to dig deeper."
        />

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
      <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
        Featured
      </p>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>

          <p className="text-sm font-medium text-accent/90 mb-2">
            {project.subtitle}
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-xl text-base">
            {project.summary}
          </p>

          <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-5">
            {project.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 shrink-0 md:items-end md:pt-1">
          {hasCaseStudy && project.caseStudyHref && (
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Link
                href={project.caseStudyHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium shadow-lg shadow-accent/20 w-full md:w-auto"
              >
                Read case study
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            {hasLive && project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors"
              >
                {displayUrl(project.href)}
              </a>
            )}
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
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {project.summary}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {project.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-muted-foreground/80">
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
          {hasLive && project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-accent underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors"
            >
              {displayUrl(project.href)}
            </a>
          )}
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
