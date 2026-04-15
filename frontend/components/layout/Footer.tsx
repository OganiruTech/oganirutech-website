"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { api } from "@/lib/api";

type SubStatus = "idle" | "loading" | "success" | "error";

const Footer = () => {
  const [subEmail, setSubEmail]   = useState("");
  const [subStatus, setSubStatus] = useState<SubStatus>("idle");
  const [subMsg, setSubMsg]       = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const socials = [
    { icon: <FaXTwitter />, link: "https://x.com/oganirutech", name: "Twitter" },
    { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61567296328675", name: "Facebook" },
    { icon: <FaInstagram />, link: "https://instagram.com/oganirutechnologies", name: "Instagram" },
  ];

  const handleSubscribe = async () => {
    if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      setSubStatus("error");
      setSubMsg("Please enter a valid email address.");
      return;
    }

    setSubStatus("loading");
    setSubMsg("");

    try {
      const result = await api.subscribe({ email: subEmail });
      if (result.success) {
        setSubStatus("success");
        setSubMsg(result.message);
        setSubEmail("");
      } else {
        setSubStatus("error");
        setSubMsg(result.message ?? "Subscription failed. Please try again.");
      }
    } catch {
      setSubStatus("error");
      setSubMsg("Network error. Please try again.");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0B1C2D] to-[#081520] text-gray-300 pt-20 pb-12 px-6 sm:px-8 md:px-12 overflow-hidden">

      {/* Emerald Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />

      {/* Subtle Glow */}
      <div className="absolute -top-40 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Oganiru <span className="text-emerald-400">Technologies</span>
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Building powerful digital solutions that empower businesses,
            creators, and industries across Africa and beyond.
          </p>
          <div className="flex space-x-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3">
            {["About", "Products", "Careers", "Contact"].map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3">
            {["Blog", "Documentation", "Support", "Privacy Policy"].map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-emerald-400 transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-5">Get product updates and company news.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email address"
              disabled={subStatus === "loading" || subStatus === "success"}
              className="w-full px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/10 border border-white/10 focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400 disabled:opacity-50 transition-colors"
            />
            <button
              onClick={handleSubscribe}
              disabled={subStatus === "loading" || subStatus === "success"}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none text-white font-medium transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {subStatus === "loading" ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : subStatus === "success" ? "✓ Done" : "Subscribe"}
            </button>
          </div>

          {/* Inline feedback */}
          <AnimatePresence>
            {subMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-3 text-xs font-medium ${
                  subStatus === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {subMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-16 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Oganiru Technologies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;