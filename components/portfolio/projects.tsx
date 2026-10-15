"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
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
  const visible = projects.filter((p) => !p.hidden);
  const featured = visible.find((p) => p.featured);
  const others = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Projects"
          title="What I have been building"
        />

        {featured && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
            className="mb-6"
          >
            <ProjectCard project={featured} size="full" />
          </motion.div>
        )}

        {others.length > 0 && (
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {others.map((project) => (
              <ProjectCard key={project.title} project={project} size="half" />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  size,
}: {
  project: Project;
  size: "full" | "half";
}) {
  const hasCaseStudy = Boolean(project.caseStudyHref);
  const hasLive = Boolean(project.href);
  const hasGithub = Boolean(project.github);
  const isFull = size === "full";

  return (
    <motion.article
      variants={fadeUpItem}
      className={`rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-accent/5 h-full ${
        isFull ? "p-6 md:p-8" : "p-5 md:p-6"
      }`}
    >
      <div
        className={
          isFull
            ? "flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10"
            : "flex flex-col gap-5 h-full"
        }
      >
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold tracking-tight text-foreground ${
              isFull
                ? "text-2xl md:text-3xl mb-3"
                : "text-xl md:text-2xl mb-2"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`font-medium text-accent/90 ${
              isFull ? "text-sm mb-2" : "text-xs mb-1.5"
            }`}
          >
            {project.subtitle}
          </p>
          <p
            className={`text-foreground leading-relaxed ${
              isFull ? "max-w-xl text-base" : "text-sm"
            }`}
          >
            {project.summary}
          </p>

          <ul className={`flex flex-wrap gap-2 ${isFull ? "mt-5" : "mt-4"}`}>
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

        <div
          className={`flex flex-col gap-3 shrink-0 ${
            isFull ? "md:items-end md:pt-1" : "mt-auto items-start pt-1"
          }`}
        >
          {hasCaseStudy && project.caseStudyHref && (
            <PrimaryButton
              href={project.caseStudyHref}
              className={
                isFull
                  ? "px-5 py-2.5 w-full md:w-auto"
                  : "px-3 py-1.5 text-xs self-start w-auto"
              }
            >
              Case Study
              <ArrowRight
                className={`${isFull ? "w-4 h-4" : "w-3.5 h-3.5"} transition-transform duration-300 ease-out group-hover:translate-x-1`}
                aria-hidden
              />
            </PrimaryButton>
          )}

          <div
            className={`flex flex-wrap items-center gap-4 ${
              isFull ? "md:justify-end" : "justify-start"
            }`}
          >
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
      </div>
    </motion.article>
  );
}
