"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity as ActivityIcon,
  Bug,
  CheckCircle2,
  FolderKanban,
  GitCommit,
  GitPullRequest,
  MessageSquareCode,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import { fadeUpItem, staggerContainer, viewport } from "@/lib/motion";
import {
  activityStats,
  combinedTrackerStats,
  type ContributionDay,
  type GithubActivityStats,
} from "@/lib/activity-stats";
import { site } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

const LEVEL_CLASS: Record<number, string> = {
  0: "bg-contrib-0 border border-border/70",
  1: "bg-contrib-1 border border-contrib-1",
  2: "bg-contrib-2 border border-contrib-2",
  3: "bg-contrib-3 border border-contrib-3",
  4: "bg-contrib-4 border border-contrib-4",
};

const CELL = "h-[10px] w-[10px] sm:h-[11px] sm:w-[11px]";
const WEEKDAY_GUTTER = "w-7 shrink-0";

function formatCount(n: number) {
  return new Intl.NumberFormat("en-AU").format(n);
}

function formatDayLabel(isoDate: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${isoDate}T12:00:00`));
  } catch {
    return isoDate;
  }
}

function contributionLabel(day: ContributionDay) {
  const n = day.count;
  const countText =
    n === 0 ? "No contributions" : `${n} contribution${n === 1 ? "" : "s"}`;
  return `${countText} on ${formatDayLabel(day.date)}`;
}

/** Label the week column that contains the 1st of a month. */
function monthLabels(weeks: GithubActivityStats["calendar"]["weeks"]) {
  const labels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, weekIndex) => {
    const firstOfMonth = week.contributionDays.find((day) => {
      const d = new Date(`${day.date}T12:00:00`);
      return d.getDate() === 1;
    });
    if (!firstOfMonth) return;
    const label = new Date(`${firstOfMonth.date}T12:00:00`).toLocaleString(
      "en-AU",
      { month: "short" }
    );
    labels.push({ label, weekIndex });
  });
  return labels;
}

function yearContributionTotal(
  weeks: GithubActivityStats["calendar"]["weeks"]
) {
  return weeks.reduce(
    (sum, week) =>
      sum + week.contributionDays.reduce((daySum, day) => daySum + day.count, 0),
    0
  );
}

function DayCell({
  day,
  active,
  onEnter,
  onLeave,
}: {
  day: ContributionDay;
  active: boolean;
  onEnter: (day: ContributionDay, el: HTMLButtonElement) => void;
  onLeave: () => void;
}) {
  const label = contributionLabel(day);
  return (
    <button
      type="button"
      aria-label={label}
      onMouseEnter={(e) => onEnter(day, e.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(e) => onEnter(day, e.currentTarget)}
      onBlur={onLeave}
      className={`block ${CELL} shrink-0 rounded-[2px] outline-none transition-shadow ${
        LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0]
      } ${active ? "ring-1 ring-foreground/80 ring-offset-1 ring-offset-card" : "hover:ring-1 hover:ring-foreground/50"}`}
    />
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <motion.div
      variants={fadeUpItem}
      className="rounded-xl border border-border/80 bg-card/40 p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon className="w-3.5 h-3.5 text-accent" aria-hidden />
        <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-bold font-mono text-foreground tabular-nums">
        {formatCount(value)}
      </p>
    </motion.div>
  );
}

export function Activity() {
  const { github, linear, jira } = activityStats;
  const trackers = combinedTrackerStats(linear, jira);
  const weeks = github.calendar.weeks;
  const hasCalendar = weeks.length > 0;
  const months = hasCalendar ? monthLabels(weeks) : [];
  const yearTotal = hasCalendar ? yearContributionTotal(weeks) : 0;
  const profileUrl = `https://github.com/${github.login}`;
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const showTooltip = (day: ContributionDay, el: HTMLButtonElement) => {
    const rect = el.getBoundingClientRect();
    const parent = el.closest("[data-calendar-root]")?.getBoundingClientRect();
    if (!parent) return;
    setActiveDate(day.date);
    setTooltip({
      text: contributionLabel(day),
      x: rect.left - parent.left + rect.width / 2,
      y: rect.top - parent.top,
    });
  };

  const hideTooltip = () => {
    setActiveDate(null);
    setTooltip(null);
  };

  const githubCounters = [
    {
      label: "Contributions",
      value: github.totalContributions,
      icon: ActivityIcon,
    },
    {
      label: "Commits",
      value: github.commits,
      icon: GitCommit,
    },
    {
      label: "Pull requests",
      value: github.pullRequests,
      icon: GitPullRequest,
    },
    {
      label: "Code reviews",
      value: github.codeReviews,
      icon: MessageSquareCode,
    },
  ];

  const trackerCounters = trackers
    ? [
        {
          label: "Created",
          value: trackers.created,
          icon: PlusCircle,
        },
        {
          label: "Closed",
          value: trackers.closed,
          icon: CheckCircle2,
        },
        {
          label: "Projects",
          value: trackers.projects,
          icon: FolderKanban,
        },
        {
          label: "Bugs reported",
          value: trackers.bugsReported,
          icon: Bug,
        },
      ]
    : [];

  const trackerSources = [linear && "Linear", jira && "Jira"]
    .filter(Boolean)
    .join(" + ");

  return (
    <section id="activity" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Activity"
          title="What I've been contributing"
        />

        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              GitHub
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              All-time contributions, commits, pull requests and reviews.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {githubCounters.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>

        {trackers && (
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                Linear &amp; Jira
              </h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                Combined task activity across {trackerSources}.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer}
            >
              {trackerCounters.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUpItem}
          className="rounded-xl border border-border/80 bg-card/40 p-4 sm:p-6 overflow-x-auto"
        >
          <div className="flex items-center justify-between gap-4 mb-4 min-w-[640px]">
            <p className="font-mono text-xs text-muted-foreground">
              GitHub contribution calendar
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              @{github.login}
            </a>
          </div>

          {hasCalendar ? (
            <div className="relative min-w-[640px]" data-calendar-root>
              {tooltip && (
                <div
                  role="tooltip"
                  className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-border bg-foreground px-2.5 py-1.5 text-xs text-background shadow-lg"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {tooltip.text}
                  <span
                    className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-foreground"
                    aria-hidden
                  />
                </div>
              )}

              <div className="flex gap-2 mb-1">
                <div className={WEEKDAY_GUTTER} aria-hidden />
                <div className="flex gap-[3px]">
                  {weeks.map((_, weekIndex) => {
                    const month = months.find((m) => m.weekIndex === weekIndex);
                    return (
                      <span
                        key={weekIndex}
                        className={`${CELL} relative shrink-0 overflow-visible text-[10px] text-muted-foreground font-mono leading-none`}
                      >
                        {month ? (
                          <span className="absolute left-0 top-0 whitespace-nowrap">
                            {month.label}
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <div
                  className={`${WEEKDAY_GUTTER} flex flex-col justify-between py-[1px] text-[10px] text-muted-foreground font-mono leading-none h-[82px] sm:h-[90px]`}
                >
                  <span />
                  <span>Mon</span>
                  <span />
                  <span>Wed</span>
                  <span />
                  <span>Fri</span>
                  <span />
                </div>

                <div className="flex gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.contributionDays.map((day) => (
                        <DayCell
                          key={day.date}
                          day={day}
                          active={activeDate === day.date}
                          onEnter={showTooltip}
                          onLeave={hideTooltip}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <p className="font-mono">
                  <span className="text-accent font-medium">
                    {formatCount(yearTotal)}
                  </span>{" "}
                  contributions in the last year
                </p>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`block h-2.5 w-2.5 shrink-0 rounded-[2px] ${LEVEL_CLASS[level]}`}
                      aria-hidden
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-muted-foreground">
              <p>
                Contribution data will appear after the next build with{" "}
                <code className="font-mono text-accent">GH_STATS_TOKEN</code>{" "}
                configured.
              </p>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-accent hover:underline font-mono text-xs"
              >
                View profile on GitHub
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
