"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import Button from "./Button";
import { SectionHeader } from "./ui/Section";
import { siteConfig } from "@/lib/seo.config";

const values = [
  {
    title: "Small team, real ownership",
    body: "You own features end to end — from the schema to the copy on the button. Nobody here is three approvals away from shipping.",
  },
  {
    title: "Built in the open",
    body: "Decisions get written down and argued in public. Seniority doesn't win the argument; the reasoning does.",
  },
  {
    title: "Africa-first engineering",
    body: "We optimise for mid-range Android and unreliable networks, because that is what our users are actually holding.",
  },
  {
    title: "Finished means maintained",
    body: "We stay on products after launch. You'll live with the consequences of your own decisions, which is the fastest way to get better at making them.",
  },
];

const hiringProcess = [
  { title: "You send work", body: "A repo, a case study, a product you shipped. A CV is optional; evidence isn't." },
  { title: "A conversation", body: "45 minutes on what you've built and how you think. No whiteboard puzzles." },
  { title: "A paid exercise", body: "A small, real problem, scoped to a day. We pay for your time." },
  { title: "Meet the team", body: "You talk to everyone you'd work with. They get a vote." },
];

const socials = [
  { icon: FaXTwitter, link: siteConfig.socials.twitter, name: "X (Twitter)" },
  { icon: FaFacebookF, link: siteConfig.socials.facebook, name: "Facebook" },
  { icon: FaInstagram, link: siteConfig.socials.instagram, name: "Instagram" },
];

export default function CareersPage() {
  const reduce = useReducedMotion();

  const reveal = (i = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <>
      {/* ---------- Open roles: the honest answer ---------- */}
      <section aria-labelledby="roles-heading" className="section-y relative bg-surface-subtle">
        <div aria-hidden="true" className="grid-texture mask-fade-edges pointer-events-none absolute inset-0 opacity-60" />

        <div className="shell relative">
          <motion.div
            {...reveal()}
            className="mx-auto max-w-3xl rounded-2xl border border-hairline bg-surface p-8 text-center shadow-sm sm:p-12"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              No open roles right now
            </span>

            <h2 id="roles-heading" className="mt-6 text-display-md font-bold text-navy-800">
              We&apos;re not hiring today — but we&apos;re still reading
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-muted">
              We&apos;d rather say this plainly than list roles we can&apos;t fill. When a
              position opens it is posted here first, and announced on our social channels
              the same day.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
              If you&apos;re strong and patient: send us something you&apos;ve built and a
              line about why it was hard. We keep good work on file, and we do go back to it
              when a role opens.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg" withArrow>
                Send us your work
              </Button>
              <ul className="flex gap-2.5">
                {socials.map(({ icon: Icon, link, name }) => (
                  <li key={name}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Oganiru Technologies on ${name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-navy-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- What it's like ---------- */}
      <section aria-labelledby="values-heading" className="section-y bg-surface">
        <div className="shell">
          <SectionHeader
            eyebrow="How we work"
            title="What it's actually like here"
            lead="Four things that are true of the job, including the parts that won't suit everyone."
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.li
                key={value.title}
                {...reveal(i)}
                className="rounded-2xl border border-hairline bg-surface-subtle p-7 transition-colors duration-300 hover:border-emerald-200"
              >
                <h3 className="font-display text-lg font-bold text-navy-800">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{value.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Hiring process ---------- */}
      <section
        data-surface="dark"
        aria-labelledby="process-heading"
        className="section-y relative overflow-hidden bg-navy-800"
      >
        <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]"
        />

        <div className="shell relative">
          <SectionHeader
            tone="dark"
            eyebrow="Hiring"
            title="How we'll assess you, when the time comes"
            lead="So you know what you'd be signing up for. Four steps, about two weeks end to end."
          />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hiringProcess.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(i)}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="font-display text-sm font-bold tracking-wider text-emerald-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-200">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
