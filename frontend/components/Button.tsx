"use client";

import Link from "next/link";
import React from "react";

/* ---------------------------------------------------------------------------
   BUTTON
   The previous version exposed ten style-slot props (bgColor, hoverBgColor,
   paddingX, rounded, fontSize...), which is why no two buttons on the site
   matched. This replaces them with a closed set of variants so every CTA is
   consistent by default and hover/focus/disabled states are handled once.
--------------------------------------------------------------------------- */

type Variant = "primary" | "secondary" | "outline" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold " +
  "whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  // emerald-600 rather than 500: white on emerald-500 is only 3.5:1, which
  // fails AA for the 13-16px label these buttons carry.
  primary:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md",
  secondary:
    "bg-navy-800 text-white shadow-sm hover:bg-navy-700 hover:shadow-md",
  // For dark surfaces — a hairline that fills in rather than a floating box.
  outline:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
  // For light surfaces.
  subtle:
    "border border-navy-100 bg-white text-navy-800 shadow-xs hover:border-navy-200 hover:bg-navy-50",
  ghost:
    "text-navy-700 hover:bg-navy-50 hover:text-navy-900",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  // 44px — the minimum comfortable touch target.
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

export interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  target?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Renders a trailing arrow that nudges right on hover. */
  withArrow?: boolean;
  "aria-label"?: string;
}

const Arrow = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  target,
  type = "button",
  disabled,
  withArrow = false,
  ...rest
}) => {
  const classes = `group/btn ${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (href && !disabled) {
    const external = href.startsWith("http") || target === "_blank";
    if (external) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel="noopener noreferrer"
          onClick={onClick}
          className={classes}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
};

export default Button;
