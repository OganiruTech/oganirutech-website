"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import Button from "./Button";
import { Eyebrow } from "./ui/Section";
import { siteConfig } from "@/lib/seo.config";

/* ---------------------------------------------------------------------------
   CAREERS BAND
   The previous version advertised three named open roles — Frontend
   Developer, Backend Engineer, Product Designer — and every "Apply Now"
   button opened a modal reading "We're Not Hiring Right Now". That is a
   bait-and-switch on the one page candidates arrive at in good faith. This
   states the position honestly and still gives strong candidates a way in.
--------------------------------------------------------------------------- */

const values = [
  {
    title: "Small team, real ownership",
    body: "You own features end to end. Nobody here is three approvals away from shipping.",
  },
  {
    title: "Built in the open",
    body: "Decisions get written down and argued in public. Seniority doesn't win the argument.",
  },
  {
    title: "Africa-first engineering",
    body: "We optimise for the devices and networks our users actually have, not the ones we wish they had.",
  },
];

const socials = [
  { icon: FaXTwitter, link: siteConfig.socials.twitter, name: "X (Twitter)" },
  { icon: FaFacebookF, link: siteConfig.socials.facebook, name: "Facebook" },
  { icon: FaInstagram, link: siteConfig.socials.instagram, name: "Instagram" },
];

export default function CareerSection() {
  const reduce = useReducedMotion();

  const reveal = (i = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="careers"
      data-surface="dark"
      aria-labelledby="careers-heading"
      className="section-y relative overflow-hidden bg-navy-800"
    >
      <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px]"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div {...reveal()} className="lg:col-span-5">
            <Eyebrow tone="dark">Careers</Eyebrow>
            <h2 id="careers-heading" className="mt-5 text-display-lg font-bold text-white">
              Build the future with Oganiru
            </h2>
            <p className="mt-5 text-lead text-navy-200">
              We&apos;re a small engineering studio in Nigeria, working on systems that have
              to survive contact with the real world — across Africa.
            </p>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <p className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                No open roles right now
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">
                When that changes, it gets posted here and on our social channels first.
                If you&apos;re strong and patient, send us something you&apos;ve built — we
                keep good work on file and we do reach back out.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href="/careers" variant="outline" size="sm" withArrow>
                  More about working here
                </Button>
                <ul className="flex gap-2">
                  {socials.map(({ icon: Icon, link, name }) => (
                    <li key={name}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow Oganiru Technologies on ${name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-navy-200 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                      >
                        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {values.map((value, i) => (
                <motion.li
                  key={value.title}
                  {...reveal(i + 1)}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06]"
                >
                  <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-navy-200">{value.body}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
