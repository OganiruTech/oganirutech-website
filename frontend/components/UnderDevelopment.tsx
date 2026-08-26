"use client";

import Button from "./Button";
import { LogoMark } from "./brand/Logo";

/* Reusable "nothing here yet" state. The old version rendered a 115KB
   third-party SVG illustration next to the copy; this is drawn from brand
   tokens and weighs nothing. */

export default function UnderDevelopment({
  eyebrow = "404",
  title = "This page doesn't exist",
  body = "The link may be out of date, or the page may have moved. Everything we've published is one click away.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section
      data-surface="dark"
      className="relative flex min-h-svh items-center overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]"
      />

      <div className="shell relative py-32 text-center">
        <div className="mx-auto max-w-xl">
          <LogoMark
            className="mx-auto h-14 w-14"
            ringClassName="text-white/25"
            arrowClassName="text-emerald-400"
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-display-lg font-bold text-white">{title}</h1>
          <p className="mt-5 text-lead text-navy-200">{body}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Button href="/" size="lg" withArrow>
              Back to home
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
