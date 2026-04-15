"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { api } from "@/lib/api";

const typingText = [
  "Tell us about your idea...",
  "What are you building?",
  "How can we help you scale?",
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const socials = [
  { icon: <FaXTwitter />, link: "https://x.com/oganirutech", name: "Twitter" },
  { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61567296328675", name: "Facebook" },
  { icon: <FaInstagram />, link: "https://instagram.com/oganirutechnologies", name: "Instagram" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPageClient() {
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex]     = useState(0);
  const [charIndex, setCharIndex]     = useState(0);
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (message.length > 0) return;
    const timeout = setTimeout(() => {
      const current = typingText[textIndex];
      if (charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % typingText.length);
        }, 1500);
      }
    }, 40);
    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, message]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    setFieldErrors({});

    try {
      const result = await api.contact({ email, message });

      if (result.success) {
        setStatus("success");
        setFeedback(result.message);
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(result.message ?? "Something went wrong.");
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

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-b from-[#081520] via-[#0B1C2D] to-[#050C15] text-white overflow-hidden py-28 px-6 md:px-12"
    >
      {/* Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.15), transparent 60%)`,
        }}
      />

      {/* Ambient Glow */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]"
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto"
      >
        {/* HEADER */}
        <motion.div variants={item} className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Build Something{" "}
            <span className="text-emerald-400">Great Together</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Have a question, partnership idea, or project in mind?
            Send us a message and our team will get back to you.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* CONTACT FORM */}
          <motion.form
            variants={item}
            onSubmit={handleSubmit}
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-xl space-y-6 overflow-hidden"
          >
            <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    status === "success"
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                      : "bg-red-500/20 border border-red-500/40 text-red-300"
                  }`}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={displayText}
                disabled={status === "loading"}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 resize-none focus:outline-none transition-colors
                  ${fieldErrors.message
                    ? "border-red-400 focus:border-red-400"
                    : "border-white/10 focus:border-emerald-400"
                  }
                  disabled:opacity-50`}
              />
              {fieldErrors.message && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
              )}
            </div>

            <div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === "loading"}
                className={`relative z-10 w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:outline-none transition-colors
                  ${fieldErrors.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-white/10 focus:border-emerald-400"
                  }
                  disabled:opacity-50`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="relative z-10 overflow-hidden bg-emerald-600 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-[1.04] group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : status === "success" ? (
                <>✓ Message Sent</>
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </>
              )}
            </button>
          </motion.form>

          {/* RIGHT SIDE INFO */}
          <motion.div variants={item} className="space-y-12">

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <p className="text-gray-300 leading-relaxed">Monday – Friday: 9:00 AM – 6:00 PM (WAT)</p>
              <p className="text-gray-300">Saturday: 10:00 AM – 3:00 PM</p>
              <p className="text-gray-300">Sunday: Closed</p>
              <div className="mt-4 text-emerald-400">Typical response time: within 24 hours</div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
              <div className="flex gap-5">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-gray-400 mt-6">
                Follow us for product updates, engineering insights, and company announcements.
              </p>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}