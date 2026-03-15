"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Lightbulb,
  Search,
  Palette,
  Code,
  Megaphone,
  Rocket,
} from "lucide-react";

const AUTO_DURATION = 5000;

const steps = [
  {
    icon: Lightbulb,
    title: "Ideation & Strategy",
    description:
      "We refine your vision and structure it into a scalable digital business model.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600",
  },
  {
    icon: Search,
    title: "Market Intelligence",
    description:
      "We validate your concept through deep research and competitive positioning.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "We craft brands that command authority and inspire trust.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600",
  },
  {
    icon: Code,
    title: "Platform Development",
    description:
      "We build powerful web and mobile platforms engineered for growth.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
  },
  {
    icon: Megaphone,
    title: "Digital Amplification",
    description:
      "We design strategic marketing systems that drive engagement.",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1600",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "We optimize, measure, and scale your digital ecosystem sustainably.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
  },
];

export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  /* AUTO SLIDE */
  useEffect(() => {
    progressRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, AUTO_DURATION);

    return () => {
      if (progressRef.current) clearTimeout(progressRef.current);
    };
  }, [active]);

  const progressPercent = (active / (steps.length - 1)) * 100;

  /* PARTICLES GENERATED ONCE */
  const [particles] = useState(() =>
    [...Array(35)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
  );

  /* STAGGER ANIMATION */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-20 bg-white overflow-hidden"
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* GLOW */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-white via-emerald-100 to-white blur-[90px] rounded-full"
      />

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-floatParticle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* HEADER */}
        <motion.div
          variants={item}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            We Walk With Your Business
            <span className="block bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
              Every Step of the Way
            </span>
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          variants={item}
          transition={{ duration: 0.9 }}
          className="relative max-w-6xl mx-auto mb-24 hidden xl:block"
        >
          <div className="absolute top-10 left-0 w-full h-[8px] bg-gray-200 rounded-full" />

          <motion.div
            className="absolute top-10 left-0 h-[8px] bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8 }}
          />

          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === active;

              return (
                <div
                  key={index}
                  onClick={() => setActive(index)}
                  className="flex flex-col items-center w-1/6 cursor-pointer"
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center z-10
                    ${
                      isActive
                        ? "bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-2xl"
                        : "bg-white border-2 border-gray-300 text-gray-600"
                    }`}
                  >
                    <Icon size={26} />
                  </motion.div>

                  <h3
                    className={`mt-6 font-semibold ${
                      isActive ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* IMAGE PANEL */}
        <motion.div
          variants={item}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl h-[520px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <motion.div
                style={{
                  y: yParallax,
                  backgroundImage: `url(${steps[active].image})`,
                }}
                className="absolute inset-0 bg-cover bg-center scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              <motion.div
                key={active}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_DURATION / 1000, ease: "linear" }}
                className="absolute top-0 left-0 h-1 bg-white/80"
              />

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-16 left-6 right-6 text-white max-w-2xl"
              >
                <h3 className="text-4xl font-bold mb-6">
                  {steps[active].title}
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {steps[active].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* BOTTOM DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 120" className="w-full h-24" preserveAspectRatio="none">
          <path
            d="M0,40 C360,140 1080,-40 1440,60 L1440,120 L0,120 Z"
            fill="#0f2a4d"
          />
        </svg>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
        }

        .animate-floatParticle {
          animation: floatParticle infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}