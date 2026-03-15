"use client";

import Button from "./Button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {

  /* Scroll Parallax */
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  // Paragraph story lines
  const storyLines = [
    "Africa's future will be built on technology that scales, adapts, and empowers.",
    "At Oganiru, we design resilient digital systems that help businesses and communities thrive.",
    "From bold ideas to real-world platforms, we build technology that moves Africa forward."
  ];

  // State to track which line is currently visible
  const [currentLine, setCurrentLine] = useState(0);

  // Duration per line (in milliseconds)
  const DURATION = 5000;

  // Cycle through lines
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % storyLines.length);
    }, DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center overflow-hidden">

      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.img
          src="/hero.png"
          alt="Oganiru Background"
          initial={{ scale: 1.1 }}
          animate={{ scale: [1.1, 1, 1.05, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
      </motion.div>

      {/* ATMOSPHERIC GLOW */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute left-20 top-20 w-125 h-125 bg-emerald-400/15 blur-[140px] rounded-full"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl px-10 xl:pl-70 lg:pl-40 md:pl-20">
        <div className="max-w-2xl text-left text-white">

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Building the Digital Future{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Africa Deserves
            </span>
          </motion.h1>

          {/* PARAGRAPH */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentLine}   // Important! Ensures AnimatePresence triggers a transition
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mt-6 mb-8 text-lg md:text-xl text-gray-200"
            >
              {storyLines[currentLine]}
            </motion.p>
          </AnimatePresence>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-6"
          >
            <Button text="Build With Us" />

            <Button
              text="Our Products"
              bgColor="bg-transparent"
              hoverBgColor="hover:bg-white/30"
              className="
                border
                border-white/40
                hover:border-white
              "
            />
          </motion.div>

        </div>
      </div>

      {/* ANGLED DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">

        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,140 1080,-40 1440,60 L1440,120 L0,120 Z"
            className="fill-white"
          />
        </svg>
      </div>

    </section>
  );
}