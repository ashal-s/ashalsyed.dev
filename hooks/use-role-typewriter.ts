"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const ERASE_MS = 32;
const HOLD_MS = 2000;

type Options = {
  /** When false, display stays on the first role and does not cycle. */
  enabled?: boolean;
};

/**
 * Cycles roles. When enabled becomes true, starts from a hold on the first
 * role so the first change is delayed by HOLD_MS.
 */
export function useRoleTypewriter(
  texts: readonly string[],
  { enabled = true }: Options = {}
) {
  const first = texts[0] ?? "";
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(first);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">(
    "holding"
  );

  useEffect(() => {
    if (!enabled) {
      setIndex(0);
      setDisplay(first);
      setPhase("holding");
      return;
    }
    // Begin cycling from a hold on whatever is currently shown (first role).
    setPhase("holding");
  }, [enabled, first]);

  useEffect(() => {
    if (!enabled) return;

    const full = texts[index] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < full.length) {
        timeout = setTimeout(() => {
          setDisplay(full.slice(0, display.length + 1));
        }, TYPE_MS);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("erasing"), HOLD_MS);
    } else if (display.length > 0) {
      timeout = setTimeout(() => {
        setDisplay(display.slice(0, -1));
      }, ERASE_MS);
    } else {
      timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [display, enabled, index, phase, texts]);

  return enabled ? display : first;
}
