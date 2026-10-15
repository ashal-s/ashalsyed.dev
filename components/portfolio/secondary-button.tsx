"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttonTap } from "@/lib/motion";

const baseClass =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm tracking-wide text-foreground bg-transparent border border-foreground shadow-[0_0_0_1px_hsl(var(--foreground)/0.15),0_8px_24px_-12px_hsl(var(--foreground)/0.55)] transition-[border-width,box-shadow] duration-300 ease-out hover:border-2 hover:shadow-[0_0_0_1px_hsl(var(--foreground)/0.25),0_12px_28px_-10px_hsl(var(--foreground)/0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground/30 focus-visible:outline-offset-2";

type SecondaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export function SecondaryButton({
  children,
  className = "",
  href,
  download,
  type = "button",
  onClick,
  target,
  rel,
}: SecondaryButtonProps) {
  const classes = `${baseClass} ${className}`.trim();

  if (href) {
    const isInternal =
      href.startsWith("/") && !href.startsWith("//") && !download;

    if (isInternal) {
      return (
        <motion.div whileTap={buttonTap} className="inline-flex w-full md:w-auto">
          <Link href={href} className={`${classes} w-full`}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        whileTap={buttonTap}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} whileTap={buttonTap} className={classes}>
      {children}
    </motion.button>
  );
}
