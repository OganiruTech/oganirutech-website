"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, ShieldCheck, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { SectionHeader } from "./ui/Section";

type Status = "idle" | "loading" | "success" | "error";

const promises = [
  {
    icon: Zap,
    title: "Built for real conditions",
    body: "Fast on mid-range devices and unreliable connections, not just on a demo laptop.",
  },
  {
    icon: ShieldCheck,
    title: "Yours, not rented",
    body: "Clear data ownership and export from day one. No lock-in dressed up as convenience.",
  },
  {
    icon: Boxes,
    title: "Solving one thing well",
    body: "Each product targets a specific operational problem we kept meeting in client work.",
  },
];

export default function ProductsSection({ showHeader = true }: { showHeader?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();
  const reduce = useReducedMotion();

  const busy = status === "loading" || status === "success";

  /* The old "Notify Me" button was decorative — it had no handler at all.
     This posts to the same subscribe endpoint the footer uses. */
  const handleSubmit = async (e: React.FormEvent) => {
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
        setMessage(result.message || "You're on the list — we'll be in touch at launch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const reveal = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="products" aria-labelledby="products-heading" className="section-y relative bg-surface">
      <div aria-hidden="true" className="grid-texture mask-fade-edges pointer-events-none absolute inset-0 opacity-50" />

      <div className="shell relative">
        {showHeader && (
          <SectionHeader
            eyebrow="Our products"
            title="We're building our own software, too"
            lead="Alongside client work, we're developing products for problems we kept running into — inventory, operations and payments for small African businesses. The first is in private testing."
          />
        )}

        <motion.div {...reveal} className={`grid gap-5 sm:grid-cols-3 ${showHeader ? "mt-14" : ""}`}>
          {promises.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-hairline bg-surface-subtle p-6 transition-colors duration-300 hover:border-emerald-200"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-700 ring-1 ring-emerald-100">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy-800">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
            </div>
          ))}
        </motion.div>

        {/* Notify card */}
        <motion.div
          {...reveal}
          className="relative mt-8 overflow-hidden rounded-2xl bg-navy-800 p-8 sm:p-12"
          data-surface="dark"
        >
          <div aria-hidden="true" className="grid-texture-dark pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-500/15 blur-[110px]"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-display-md font-bold text-white">
                Be first through the door
              </h3>
              <p className="mt-3 max-w-md text-navy-200">
                Leave an address and we&apos;ll write once — when there&apos;s something real to open.
                No drip sequence.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
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
                  className="h-12 min-w-0 flex-1 rounded-lg border border-white/12 bg-white/[0.06] px-4 text-sm text-white placeholder:text-navy-300 transition-colors focus:border-emerald-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-55"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending
                    </>
                  ) : status === "success" ? (
                    "You're on the list"
                  ) : (
                    "Notify me"
                  )}
                </button>
              </div>
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
      </div>
    </section>
  );
}
