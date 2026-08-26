"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";

/* The four things Oganiru actually sells, stated in the hero. The previous
   hero cycled three sentences on a 5s timer, so a visitor could never finish
   reading one — and never learned what the company does. */
const capabilities = [
  "Web platforms",
  "Mobile products",
  "Brand identity",
  "Digital strategy",
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy-900 pt-28 pb-20 sm:min-h-[46rem] lg:pt-32"
    >
      {/* ---------- Background ----------
          Same photograph, graded hard into the brand navy so it reads as
          Oganiru's image rather than a stock library's. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/hero-office.jpg"
          alt=""
          fill
          priority
          quality={82}
          sizes="100vw"
          className="scale-105 object-cover object-[72%_center]"
        />
        {/* Navy grade */}
        <div className="absolute inset-0 bg-navy-900/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
        <div className="absolute inset-0 bg-navy-950/45 md:hidden" />
        {/* Engineered texture */}
        <div className="grid-texture-dark mask-fade-edges absolute inset-0 opacity-70" />
        {/* Single soft accent, replacing the old stack of floating blurs */}
        <div className="absolute -left-20 top-1/4 h-[32rem] w-[32rem] rounded-full bg-emerald-500/12 blur-[150px]" />
      </div>

      <div className="shell relative">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-navy-100 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Engineering studio · Nigeria, building for Africa
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...rise(0.08)}
            className="mt-7 text-display-2xl font-extrabold text-white"
          >
            Building the digital future{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Africa deserves
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-lead text-navy-200"
          >
            Oganiru Technologies designs and builds resilient digital systems — web
            platforms, mobile products and the brands around them — for organisations
            that need technology to hold up under real-world pressure.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-3.5">
            <Button href="/contact" size="lg" withArrow>
              Start a project
            </Button>
            <Button href="/#services" size="lg" variant="outline">
              See what we do
            </Button>
          </motion.div>

          {/* Capability strip — answers "what do you actually do" above the fold */}
          <motion.ul
            {...rise(0.32)}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-navy-300"
          >
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400">
                  <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
