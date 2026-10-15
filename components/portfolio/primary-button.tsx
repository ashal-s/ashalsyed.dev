"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttonTap } from "@/lib/motion";

const baseClass =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm tracking-wide text-white bg-accent border border-accent/80 shadow-[0_0_0_1px_hsl(var(--accent)/0.15),0_8px_24px_-12px_hsl(var(--accent)/0.55)] transition-[background-color,border-color,box-shadow,color] duration-300 ease-out hover:bg-accent/90 hover:border-accent hover:shadow-[0_0_0_1px_hsl(var(--accent)/0.25),0_12px_28px_-10px_hsl(var(--accent)/0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export function PrimaryButton({
  children,
  className = "",
  href,
  download,
  type = "button",
  onClick,
  target,
  rel,
}: PrimaryButtonProps) {
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
