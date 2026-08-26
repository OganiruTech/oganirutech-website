"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Search, Palette, Code2, Megaphone, Rocket } from "lucide-react";
import { SectionHeader } from "./ui/Section";

const AUTO_MS = 7000;

const steps = [
  {
    icon: Lightbulb,
    title: "Ideation & strategy",
    description:
      "We pull the idea apart before anyone writes code — who it serves, what it charges for, and which assumption would sink it.",
    deliverables: ["Problem & opportunity brief", "Business model canvas", "Scope and phasing plan"],
  },
  {
    icon: Search,
    title: "Market intelligence",
    description:
      "We test the concept against the market it has to survive in: real competitors, real pricing, real willingness to pay.",
    deliverables: ["Competitive landscape", "User & buyer interviews", "Positioning recommendation"],
  },
  {
    icon: Palette,
    title: "Brand identity",
    description:
      "The name, the mark, the voice and the design system — built as tokens and components your team can actually use.",
    deliverables: ["Logo & visual identity", "Design system in Figma", "Brand usage guide"],
  },
  {
    icon: Code2,
    title: "Platform development",
    description:
      "Engineering in two-week increments against a staging environment you can open any day of the sprint.",
    deliverables: ["Next.js front end", "Laravel API & data model", "CI, monitoring and docs"],
  },
  {
    icon: Megaphone,
    title: "Digital amplification",
    description:
      "Launch is a campaign, not a deploy. We set up the channels, the tracking and the content that brings the first users in.",
    deliverables: ["Launch campaign plan", "Analytics & event tracking", "Content and SEO groundwork"],
  },
  {
    icon: Rocket,
    title: "Launch & scale",
    description:
      "We stay on after go-live — watching the numbers, fixing what breaks, and deciding together what gets built next.",
    deliverables: ["Performance & uptime SLAs", "Monthly product reviews", "Roadmap for the next quarter"],
  },
];

export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  // Auto-advance, but only while the section isn't being interacted with.
  // The old version advanced unconditionally with no way to stop it.
  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setActive((p) => (p + 1) % steps.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduce]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const last = steps.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next !== null) {
      e.preventDefault();
      setActive(next);
      setPaused(true);
      tabRefs.current[next]?.focus();
    }
  }, [active]);

  const Current = steps[active].icon;

  return (
    <section
      id="process"
      data-surface="dark"
      aria-labelledby="process-heading"
      className="section-y relative overflow-hidden bg-navy-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px] motion-safe:animate-float-slow"
      />

      <div className="shell relative">
        <SectionHeader
          tone="dark"
          eyebrow="How we work"
          title={
            <>
              We walk with your business,{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                every step of the way
              </span>
            </>
          }
          lead="Six stages, in order. You can enter at any of them — most clients come to us somewhere in the middle."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Step list (tabs) ---------- */}
          <div
            role="tablist"
            aria-label="Our process"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const selected = i === active;
              return (
                <button
                  key={step.title}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`process-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`process-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className={`group relative flex shrink-0 items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 lg:w-full lg:shrink ${
                    selected
                      ? "border-emerald-400/40 bg-white/[0.07]"
                      : "border-white/8 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      selected
                        ? "bg-emerald-600 text-white"
                        : "bg-white/8 text-navy-200 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className={`text-[0.6875rem] font-semibold tracking-[0.14em] ${selected ? "text-emerald-300" : "text-navy-300"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`truncate text-sm font-semibold ${selected ? "text-white" : "text-navy-200"}`}>
                      {step.title}
                    </span>
                  </span>

                  {/* Auto-advance progress, only on the active tab */}
                  {selected && !paused && !reduce && (
                    <motion.span
                      key={`bar-${active}`}
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-emerald-400/70"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- Detail panel ---------- */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 p-8 backdrop-blur-sm sm:p-10">
              <div aria-hidden="true" className="grid-texture-dark pointer-events-none absolute inset-0 opacity-50" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  id={`process-panel-${active}`}
                  role="tabpanel"
                  aria-labelledby={`process-tab-${active}`}
                  tabIndex={0}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                      <Current className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-5xl font-extrabold leading-none text-white/8">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-display-md font-bold text-white">{steps[active].title}</h3>
                  <p className="mt-4 max-w-xl text-lead text-navy-200">{steps[active].description}</p>

                  <div className="mt-8">
                    <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-navy-300">
                      What you get
                    </h4>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {steps[active].deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-navy-100">
                          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400">
                            <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
