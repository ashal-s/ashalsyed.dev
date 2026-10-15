"use client";

import { useEffect, useMemo, useState } from "react";

const CHAR_MS = 28;
const LINE_PAUSE_MS = 320;

export type TerminalIntroLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; large?: boolean }
  | { type: "role"; text: string };

function fullText(line: TerminalIntroLine) {
  if (line.type === "cmd") return `$ ${line.text}`;
  if (line.type === "role") return `$ ${line.text}`;
  return line.text;
}

/**
 * Types every terminal line in order (including the first role as static text).
 * When finished, the UI should move the cursor to the role line and start cycling.
 */
export function useTerminalIntro(lines: readonly TerminalIntroLine[]) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = lines[lineIndex];

  useEffect(() => {
    if (finished || !current) return;

    const full = fullText(current);

    if (charIndex < full.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
      return () => clearTimeout(timeout);
    }

    if (lineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setFinished(true), LINE_PAUSE_MS);
    return () => clearTimeout(timeout);
  }, [charIndex, current, finished, lineIndex, lines.length]);

  const visibleLines = useMemo(
    () =>
      lines.map((line, i) => {
        const full = fullText(line);
        if (finished || i < lineIndex) {
          return { line, status: "done" as const, text: full };
        }
        if (i > lineIndex) {
          return { line, status: "pending" as const, text: "" };
        }
        return {
          line,
          status: "typing" as const,
          text: full.slice(0, charIndex),
        };
      }),
    [charIndex, finished, lineIndex, lines]
  );

  return {
    visibleLines,
    finished,
    /** Line currently receiving keystrokes; after finish, -1 (cursor sits on role). */
    cursorLineIndex: finished ? -1 : lineIndex,
  };
}
