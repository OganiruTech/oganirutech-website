"use client";

import { useId, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Clock, MapPin, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import { Eyebrow } from "./ui/Section";
import { siteConfig } from "@/lib/seo.config";

type Status = "idle" | "loading" | "success" | "error";

const projectTypes = [
  "A new product from scratch",
  "An existing platform that needs work",
  "Brand & identity",
  "Strategy and advice",
  "Something else",
];

const socials = [
  { icon: FaXTwitter, link: siteConfig.socials.twitter, name: "X (Twitter)" },
  { icon: FaFacebookF, link: siteConfig.socials.facebook, name: "Facebook" },
  { icon: FaInstagram, link: siteConfig.socials.instagram, name: "Instagram" },
];

const nextSteps = [
  { title: "We read it properly", body: "A person, not a queue. Usually the same day." },
  { title: "We reply within 24 hours", body: "Either with questions, or with a time to talk." },
  { title: "A 30-minute call", body: "No deck, no pitch. We work out whether this is a fit." },
];

const MIN_MESSAGE = 10;

export default function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Honeypot — bots fill it, humans never see it.
  const honeypot = useRef<HTMLInputElement>(null);

  const uid = useId();
  const reduce = useReducedMotion();
  const busy = status === "loading" || status === "success";

  const fieldId = (n: string) => `${uid}-${n}`;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please tell us who you are.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (message.trim().length < MIN_MESSAGE) {
      errors.message = `A little more detail, please — at least ${MIN_MESSAGE} characters.`;
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.current?.value) return; // silently drop bots

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setFeedback("Please check the highlighted fields.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    /* The API accepts only { email, message }, so the extra context is folded
       into the message body rather than silently dropped. */
    const composed = [
      `From: ${name.trim()}`,
      projectType ? `Enquiry type: ${projectType}` : null,
      "",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const result = await api.contact({ email: email.trim(), message: composed });

      if (result.success) {
        setStatus("success");
        setFeedback(result.message || "Message sent. We'll be in touch within 24 hours.");
        setName("");
        setEmail("");
        setProjectType("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(result.message ?? "Something went wrong. Please try again.");
        if (result.errors) {
          const flat: Record<string, string> = {};
          Object.entries(result.errors).forEach(([k, v]) => {
            flat[k] = Array.isArray(v) ? v[0] : String(v);
          });
          setFieldErrors(flat);
        }
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-lg border bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-navy-300 transition-colors focus:outline-none disabled:opacity-50 ${
      hasError ? "border-red-400/70 focus:border-red-400" : "border-white/12 focus:border-emerald-400"
    }`;

  const labelClass = "mb-2 block text-sm font-medium text-navy-100";

  return (
    <div data-surface="dark" className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="grid-texture-dark mask-fade-edges pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-emerald-500/10 blur-[150px]"
      />

      <div className="shell relative pt-36 pb-24 lg:pt-40 lg:pb-32">
        {/* Header */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h1 className="mt-5 text-display-xl font-extrabold text-white">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              great together
            </span>
          </h1>
          <p className="mt-6 text-lead text-navy-200">
            Tell us what you&apos;re working on — the problem, roughly where you are, and what
            good would look like. We reply to everything within one business day.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---------- Form ---------- */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              noValidate
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9"
            >
              <h2 className="font-display text-xl font-bold text-white">Send us a message</h2>

              <AnimatePresence>
                {feedback && (
                  <motion.p
                    role="status"
                    aria-live="polite"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-5 rounded-lg border px-4 py-3 text-sm font-medium ${
                      status === "success"
                        ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                        : "border-red-400/40 bg-red-500/15 text-red-200"
                    }`}
                  >
                    {feedback}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={fieldId("name")} className={labelClass}>
                    Your name
                  </label>
                  <input
                    id={fieldId("name")}
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={busy}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? fieldId("name-err") : undefined}
                    placeholder="Ada Okeke"
                    className={inputClass(!!fieldErrors.name)}
                  />
                  {fieldErrors.name && (
                    <p id={fieldId("name-err")} className="mt-1.5 text-xs text-red-300 animate-fade-in-up">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={fieldId("email")} className={labelClass}>
                    Email address
                  </label>
                  <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={busy}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? fieldId("email-err") : undefined}
                    placeholder="you@company.com"
                    className={inputClass(!!fieldErrors.email)}
                  />
                  {fieldErrors.email && (
                    <p id={fieldId("email-err")} className="mt-1.5 text-xs text-red-300 animate-fade-in-up">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor={fieldId("type")} className={labelClass}>
                  What&apos;s this about?{" "}
                  <span className="font-normal text-navy-300">(optional)</span>
                </label>
                <select
                  id={fieldId("type")}
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  disabled={busy}
                  className={`${inputClass()} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%237C9CBE' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="" className="bg-navy-800">
                    Select one
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-navy-800">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor={fieldId("message")} className={labelClass}>
                  Your message
                </label>
                <textarea
                  id={fieldId("message")}
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={busy}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? fieldId("msg-err") : fieldId("msg-hint")}
                  placeholder="What are you building, and what's in the way?"
                  className={`${inputClass(!!fieldErrors.message)} resize-y`}
                />
                {fieldErrors.message ? (
                  <p id={fieldId("msg-err")} className="mt-1.5 text-xs text-red-300 animate-fade-in-up">
                    {fieldErrors.message}
                  </p>
                ) : (
                  <p id={fieldId("msg-hint")} className="mt-1.5 text-xs text-navy-300">
                    A couple of sentences is plenty to start.
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={fieldId("company-url")}>Leave this field empty</label>
                <input id={fieldId("company-url")} ref={honeypot} type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-55 sm:w-auto"
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
                  "Message sent"
                ) : (
                  "Send message"
                )}
              </button>
            </motion.form>
          </div>

          {/* ---------- Side info ---------- */}
          <motion.aside
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="flex items-center gap-2.5 font-display text-base font-bold text-white">
                <MessageSquare className="h-4 w-4 text-emerald-400" strokeWidth={2} aria-hidden="true" />
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-navy-300">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="flex items-center gap-2.5 font-display text-base font-bold text-white">
                <Clock className="h-4 w-4 text-emerald-400" strokeWidth={2} aria-hidden="true" />
                Business hours
              </h2>
              <dl className="mt-5 space-y-2.5 text-sm">
                {[
                  ["Monday – Friday", "9:00 – 18:00 WAT"],
                  ["Saturday", "10:00 – 15:00 WAT"],
                  ["Sunday", "Closed"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between gap-4 border-b border-white/[0.07] pb-2.5 last:border-0 last:pb-0">
                    <dt className="text-navy-300">{day}</dt>
                    <dd className="font-medium text-navy-100">{hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 flex items-center gap-2.5 text-sm text-navy-300">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} aria-hidden="true" />
                Nigeria · Working with clients across Africa
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="font-display text-base font-bold text-white">Elsewhere</h2>
              <ul className="mt-5 flex gap-3">
                {socials.map(({ icon: Icon, link, name: label }) => (
                  <li key={label}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Oganiru Technologies on ${label}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-navy-200 transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
