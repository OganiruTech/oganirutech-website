"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { api } from "@/lib/api";
import Logo from "../brand/Logo";
import { siteConfig } from "@/lib/seo.config";

type SubStatus = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: FaXTwitter, link: siteConfig.socials.twitter, name: "X (Twitter)" },
  { icon: FaFacebookF, link: siteConfig.socials.facebook, name: "Facebook" },
  { icon: FaInstagram, link: siteConfig.socials.instagram, name: "Instagram" },
];

/* Every one of these previously pointed at href="#". */
const columns = [
  {
    title: "Company",
    links: [
      { label: "What we do", href: "/#services" },
      { label: "How we work", href: "/#process" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Start a project", href: "/contact" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubStatus>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();
  const reduce = useReducedMotion();

  const busy = status === "loading" || status === "success";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await api.subscribe({ email });
      if (result.success) {
        setStatus("success");
        setMessage(result.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.message ?? "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <footer
      data-surface="dark"
      className="relative overflow-hidden bg-navy-900 text-navy-300"
    >
      {/* Emerald hairline — the one decorative flourish kept from the old footer */}
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.07] blur-[130px]"
      />
      <div aria-hidden="true" className="grid-texture-dark mask-fade-b pointer-events-none absolute inset-0" />

      <div className="shell relative pt-20 pb-10">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm leading-relaxed text-navy-300">
              We design and build resilient digital systems for businesses across Africa —
              web platforms, mobile products, and the brands around them.
            </p>
            <ul className="mt-7 flex gap-3">
              {socials.map(({ icon: Icon, link, name }) => (
                <li key={name}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-navy-200 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold tracking-wide text-white">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-300 transition-colors duration-200 hover:text-emerald-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-sm font-semibold tracking-wide text-white">
              Stay in the loop
            </h2>
            <p className="mt-5 text-sm leading-relaxed">
              Occasional notes on what we&apos;re building and shipping. No noise.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5" noValidate>
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  id={inputId}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={busy}
                  aria-invalid={status === "error"}
                  aria-describedby={message ? `${inputId}-msg` : undefined}
                  className="h-11 min-w-0 flex-1 rounded-lg border border-white/12 bg-white/[0.06] px-3.5 text-sm text-white placeholder:text-navy-300 transition-colors focus:border-emerald-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-55"
                >
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      <span>Joining</span>
                    </>
                  ) : status === "success" ? (
                    "Subscribed"
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* aria-live so screen readers hear the result, which the old one never announced */}
              <div id={`${inputId}-msg`} role="status" aria-live="polite" className="mt-2.5 min-h-5">
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.p
                      key={message}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`text-xs font-medium ${
                        status === "success" ? "text-emerald-300" : "text-red-300"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Legal row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-navy-300 sm:flex-row"
        >
          <p>© {new Date().getFullYear()} Oganiru Technologies. All rights reserved.</p>
          <p>Nigeria · Building for Africa and beyond.</p>
        </motion.div>
      </div>
    </footer>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
