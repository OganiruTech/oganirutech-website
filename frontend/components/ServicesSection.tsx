"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Smartphone, Palette, Compass } from "lucide-react";
import { SectionHeader } from "./ui/Section";
import Button from "./Button";

/* ---------------------------------------------------------------------------
   WHAT WE DO
   Replaces the untouched Tailwind Plus demo that was shipping to production
   with lorem ipsum, indigo headings, "Deploy faster", and four images
   hotlinked from tailwindcss.com. Every visual below is drawn inline from
   brand tokens — nothing loads from a third-party host.
--------------------------------------------------------------------------- */

const cardBase =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface " +
  "shadow-xs transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg";

function CardHead({
  icon: Icon,
  title,
  body,
  points,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  points?: string[];
  className?: string;
}) {
  return (
    <div className={`p-7 sm:p-8 ${className}`}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-navy-800">{title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{body}</p>
      {points && (
        <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-navy-700">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600">
                <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Inline illustrations ---------- */

function DashboardArt() {
  return (
    <div className="relative mt-auto px-7 pb-0 sm:px-8">
      <div className="translate-y-px overflow-hidden rounded-t-xl border border-b-0 border-navy-100 bg-navy-800 shadow-lg">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 h-1.5 w-24 rounded-full bg-white/10" />
        </div>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-white/[0.06] p-2.5">
                <div className="h-1.5 w-8 rounded-full bg-white/15" />
                <div className={`mt-2 h-2 rounded-full ${i === 0 ? "w-10 bg-emerald-400/80" : "w-7 bg-white/25"}`} />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 240 74" className="h-20 w-full" fill="none" aria-hidden="true" preserveAspectRatio="none">
            <defs>
              <linearGradient id="svcArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12B566" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#12B566" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 62 L34 54 L68 58 L102 38 L136 44 L170 22 L204 28 L240 8 L240 74 L0 74 Z" fill="url(#svcArea)" />
            <path
              d="M0 62 L34 54 L68 58 L102 38 L136 44 L170 22 L204 28 L240 8"
              stroke="#12B566"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PhoneArt() {
  return (
    <div className="relative mt-auto flex justify-center px-8 pb-0">
      <div className="w-36 translate-y-px overflow-hidden rounded-t-[1.5rem] border-[3px] border-b-0 border-navy-800 bg-navy-800 shadow-lg">
        <div className="flex justify-center pt-2 pb-1.5">
          <span className="h-1 w-9 rounded-full bg-white/25" />
        </div>
        <div className="space-y-2 rounded-t-xl bg-navy-700/70 p-3">
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.07] p-2">
            <span className="h-5 w-5 shrink-0 rounded-md bg-emerald-400/80" />
            <span className="h-1.5 flex-1 rounded-full bg-white/20" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.07] p-2">
            <span className="h-5 w-5 shrink-0 rounded-md bg-white/20" />
            <span className="h-1.5 flex-1 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.07] p-2">
            <span className="h-5 w-5 shrink-0 rounded-md bg-white/20" />
            <span className="h-1.5 flex-1 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandArt() {
  return (
    <div className="mt-auto flex items-end gap-4 px-7 pb-8 sm:px-8">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-navy-50">
        <span className="font-display text-2xl font-extrabold tracking-tight text-navy-800">Aa</span>
      </div>
      <div className="flex gap-1.5">
        {["bg-navy-800", "bg-navy-500", "bg-emerald-500", "bg-emerald-300", "bg-emerald-100"].map((c) => (
          <span key={c} className={`h-16 w-5 rounded-md ${c}`} />
        ))}
      </div>
    </div>
  );
}

function StrategyArt() {
  const steps = ["Audit", "Roadmap", "Build", "Scale"];
  return (
    <div className="px-7 pb-8 sm:px-8 lg:px-0 lg:pb-0">
      <div className="relative flex items-center justify-between">
        <span aria-hidden="true" className="absolute inset-x-0 top-[9px] h-px bg-navy-100" />
        <span aria-hidden="true" className="absolute left-0 top-[9px] h-px w-2/3 bg-emerald-500" />
        {steps.map((step, i) => (
          <div key={step} className="relative flex flex-col items-center gap-2.5">
            <span
              className={`h-[18px] w-[18px] rounded-full border-2 bg-surface ${
                i <= 2 ? "border-emerald-500" : "border-navy-200"
              }`}
            >
              {i <= 2 && <span className="block h-full w-full scale-[0.45] rounded-full bg-emerald-500" />}
            </span>
            <span className={`text-xs font-medium ${i <= 2 ? "text-navy-700" : "text-navy-400"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function ServicesSection() {
  const reduce = useReducedMotion();

  const tile = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    // once: true — the old sections re-ran their animation every single time
    // you scrolled past them.
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y relative bg-surface-subtle">
      <div aria-hidden="true" className="grid-texture mask-fade-edges pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHeader
          eyebrow="What we do"
          title={<>Four disciplines, one delivery team</>}
          lead="Most of our work starts with a business that has outgrown its tools. We take it from there — strategy through launch, and the years after."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {/* Tall tile */}
          <motion.article {...tile(0)} className={`${cardBase} lg:row-span-2`}>
            <CardHead
              icon={Globe}
              title="Web platforms"
              body="Customer portals, internal tools and data-heavy dashboards built on Next.js and Laravel — architected so the tenth thousand user costs no more attention than the first."
              points={[
                "Role-based access and audit trails",
                "Reporting that finance will actually trust",
                "Deployed with CI, monitoring and rollback",
              ]}
            />
            <DashboardArt />
          </motion.article>

          {/* Mobile */}
          <motion.article {...tile(1)} className={cardBase}>
            <CardHead
              icon={Smartphone}
              title="Mobile products"
              body="Native-feeling apps that stay usable on mid-range Android and patchy networks — because that is what your market is actually holding."
            />
            <PhoneArt />
          </motion.article>

          {/* Brand */}
          <motion.article {...tile(2)} className={cardBase}>
            <CardHead
              icon={Palette}
              title="Brand identity"
              body="Naming, marks, type and a design system your team can use without us in the room."
            />
            <BrandArt />
          </motion.article>

          {/* Wide tile */}
          <motion.article {...tile(3)} className={`${cardBase} lg:col-span-2 lg:flex-row`}>
            <CardHead
              icon={Compass}
              title="Digital strategy"
              body="Before anything gets built: where the revenue leaks, what to fix first, and what it will realistically take. Delivered as a roadmap you could hand to any competent team — including one that isn't us."
              className="lg:flex-1"
            />
            <div className="lg:w-72 lg:shrink-0 lg:self-center lg:pr-8">
              <StrategyArt />
            </div>
          </motion.article>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <p className="text-[0.9375rem] text-ink-muted">
            Not sure which of these you need? That is usually the first conversation.
          </p>
          <Button href="/contact" variant="subtle" withArrow>
            Talk it through
          </Button>
        </div>
      </div>
    </section>
  );
}
