import React from "react";
import { Eyebrow } from "./Section";

/* Shared dark page header. Every route now opens on a dark band, which is
   what lets the fixed navbar sit transparent at the top of the page without
   colliding with content — the old build had a transparent bar over a white
   page on some routes. */

export default function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-[150px]"
      />
      <div className="shell relative pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-display-xl font-extrabold text-white">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lead text-navy-200">{lead}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
