"use client";

import { motion } from "framer-motion";
import { Download, LayoutGrid } from "lucide-react";
import { useRoleTypewriter } from "@/hooks/use-role-typewriter";
import {
  useTerminalIntro,
  type TerminalIntroLine,
} from "@/hooks/use-terminal-intro";
import { fadeUpItem, springSnappy, staggerContainer } from "@/lib/motion";
import { roles, site, socialLinks } from "@/lib/portfolio";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";

const terminalLines: TerminalIntroLine[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: site.name, large: true },
  { type: "role", text: roles[0] },
  { type: "cmd", text: site.tagline },
];

function splitPrompt(typed: string) {
  const dollar = typed.startsWith("$") ? "$" : "";
  const rest = typed.startsWith("$ ")
    ? typed.slice(2)
    : typed.startsWith("$")
      ? typed.slice(1)
      : typed;
  return { dollar, rest };
}

export function Hero() {
  const { visibleLines, finished, cursorLineIndex } =
    useTerminalIntro(terminalLines);

  const roleText = useRoleTypewriter(roles, { enabled: finished });

  const roleLineIndex = terminalLines.findIndex((l) => l.type === "role");

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUpItem}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-card/50 text-sm text-muted-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {site.availability}
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="rounded-xl border border-border/80 bg-card/40 backdrop-blur-sm overflow-hidden mb-10 shadow-2xl shadow-black/20"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
            {["bg-red-500", "bg-amber-400", "bg-emerald-500"].map((c) => (
              <motion.span
                key={c}
                className={`w-3 h-3 rounded-full ${c}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springSnappy, delay: 0.1 }}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              ~/welcome   zsh
            </span>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-3">
            {visibleLines.map(({ line, status, text }, i) => {
              const showCursor =
                (!finished && cursorLineIndex === i) ||
                (finished && i === roleLineIndex);

              if (line.type === "role") {
                const display =
                  finished || status === "done"
                    ? roleText
                    : splitPrompt(text).rest;
                const showDollar =
                  finished || status === "done" || text.startsWith("$");

                return (
                  <p
                    key="role"
                    className="h-8 overflow-hidden text-foreground"
                    aria-live="polite"
                  >
                    {showDollar && <span className="font-medium">$</span>}
                    {showDollar ? " " : null}
                    <span className="font-medium">{display}</span>
                    {showCursor && (
                      <span className="cursor-blink text-foreground ml-0.5">
                        |
                      </span>
                    )}
                  </p>
                );
              }

              if (line.type === "cmd") {
                const { dollar, rest } = splitPrompt(text);

                return (
                  <p key={i} className="min-h-[1.5rem] text-foreground">
                    {dollar && (
                      <span className="text-foreground/55">$</span>
                    )}
                    {dollar ? " " : null}
                    {rest}
                    {showCursor && (
                      <span className="cursor-blink text-foreground ml-0.5">
                        |
                      </span>
                    )}
                  </p>
                );
              }

              if (line.type === "out") {
                return (
                  <p
                    key={i}
                    className={`text-signal font-semibold font-sans tracking-tight min-h-[1.75rem] md:min-h-[2rem] ${
                      line.large ? "text-lg md:text-2xl" : ""
                    }`}
                  >
                    {text}
                    {showCursor && (
                      <span className="cursor-blink text-foreground ml-0.5">
                        |
                      </span>
                    )}
                  </p>
                );
              }

              return null;
            })}
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem} className="flex flex-wrap gap-4">
          <PrimaryButton href={site.cvUrl} download="Ashal Resume.pdf">
            <Download
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              aria-hidden
            />
            Resume
          </PrimaryButton>
          <SecondaryButton href="#projects">
            <LayoutGrid className="w-4 h-4" aria-hidden />
            View Projects
          </SecondaryButton>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              {...(link.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              variants={fadeUpItem}
              custom={i}
              className="group"
            >
              <span className="text-foreground font-medium">{link.name}</span>
              <span className="mx-2 text-foreground/45">/</span>
              <span className="text-muted-foreground transition-colors group-hover:text-accent">
                {link.handle}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
