"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./ui/Section";
import { LogoMark } from "./brand/Logo";

const principles = [
  {
    n: "01",
    title: "Systems, not screens",
    body: "A pretty interface over a fragile back end is a liability. We design the data model and the deployment story with the same care as the UI.",
  },
  {
    n: "02",
    title: "Built to be handed over",
    body: "Documented, conventional, boring where boring is correct. You should be able to hire someone else to maintain what we build.",
  },
  {
    n: "03",
    title: "Present after launch",
    body: "The interesting problems start once real users arrive. We stay for that part.",
  },
];

export default function AboutSection() {
  const reduce = useReducedMotion();

  const reveal = (i = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="about" aria-labelledby="about-heading" className="section-y relative bg-surface">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Statement */}
          <motion.div {...reveal()} className="lg:col-span-6">
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="about-heading" className="mt-5 text-display-lg font-bold text-navy-800">
              An engineering studio, not a template shop
            </h2>
            <div className="mt-6 space-y-5 text-lead text-ink-muted">
              <p>
                Oganiru Technologies works with businesses, institutions and founders across
                Nigeria and the wider continent — the ones whose spreadsheets have stopped
                coping, whose customers expect an app, or whose brand no longer matches the
                company behind it.
              </p>
              <p>
                We are deliberately small. The people who scope your project are the people
                who build it, and there is no layer between you and them.
              </p>
            </div>

            {/* Brand moment: the name */}
            <div className="mt-10 flex items-start gap-5 rounded-2xl border border-hairline bg-surface-subtle p-6">
              <LogoMark className="h-10 w-10 shrink-0" />
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-display font-bold text-navy-800">Oganiru</span> is an Igbo
                word for progress — moving forward, and lifting what you carry with you. It is
                the standard we set the work against.
              </p>
            </div>
          </motion.div>

          {/* Principles */}
          <div className="lg:col-span-6 lg:pt-14">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {principles.map((p, i) => (
                <motion.li key={p.n} {...reveal(i + 1)} className="group flex gap-6 py-7">
                  <span className="font-display text-sm font-bold tracking-wider text-emerald-600">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-800">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
