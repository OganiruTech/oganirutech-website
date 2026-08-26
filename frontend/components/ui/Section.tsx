import React from "react";

/* ---------------------------------------------------------------------------
   SECTION PRIMITIVES
   One place that decides how every section header looks, so the eyebrow /
   heading / lead rhythm is identical across the site.
--------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-emerald-300" : "text-emerald-700"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-6 ${dark ? "bg-emerald-400/60" : "bg-emerald-500/50"}`}
      />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "center",
  className = "",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Heading
        className={`mt-5 text-display-lg font-bold ${
          dark ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </Heading>
      {lead && (
        <p
          className={`mt-5 text-lead ${dark ? "text-navy-300" : "text-ink-muted"} ${
            centered ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Emerald-on-navy gradient text, used sparingly for the accent half of a heading. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
