"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { buttonTap } from "@/lib/motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (theme === "system") setTheme("dark");
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-lg ${className}`} aria-hidden />
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  const cycleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <motion.button
      type="button"
      onClick={cycleTheme}
      whileTap={buttonTap}
      className={`group inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground/30 focus-visible:outline-offset-2 ${className}`}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon
              className="h-4 w-4 fill-transparent transition-[fill] duration-300 ease-out group-hover:fill-current"
              aria-hidden
            />
          ) : (
            <Sun
              className="h-4 w-4 fill-transparent transition-[fill] duration-300 ease-out group-hover:fill-current"
              aria-hidden
            />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
