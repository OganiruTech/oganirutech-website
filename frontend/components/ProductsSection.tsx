"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function ProductsSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0B1F3B] via-[#112848] to-[#070F1D] text-white flex flex-col items-center justify-center py-32">

      {/* Floating Glows with Color Shift */}
      <div className="absolute top-[-150px] left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-[float_12s_ease-in-out_infinite] bg-gradient-to-tr from-emerald-400/30 via-blue-400/20 to-purple-400/20"></div>
      <div className="absolute bottom-[-100px] right-1/3 w-[500px] h-[500px] rounded-full blur-[160px] animate-[float_15s_ease-in-out_infinite] bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-emerald-400/20"></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2 animate-[float_18s_ease-in-out_infinite] bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-emerald-400/10"></div>

      {/* Abstract Tiles */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-tr from-emerald-400/60 via-blue-500/50 to-purple-400/40 rounded-3xl shadow-2xl animate-[tileFloat1_8s_ease-in-out_infinite] hover:scale-110 hover:shadow-emerald-500/50 transition-transform duration-500"></div>
      <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-gradient-to-br from-purple-400/50 via-indigo-500/50 to-pink-400/40 rounded-3xl shadow-2xl animate-[tileFloat2_10s_ease-in-out_infinite] hover:scale-110 hover:shadow-purple-400/50 transition-transform duration-500"></div>
      <div className="absolute bottom-1/4 left-1/2 w-44 h-44 bg-gradient-to-tl from-pink-400/50 via-emerald-400/40 to-purple-400/30 rounded-3xl shadow-2xl animate-[tileFloat3_12s_ease-in-out_infinite] hover:scale-110 hover:shadow-pink-400/50 transition-transform duration-500"></div>

      {/* Tiny Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/20 rounded-full animate-[particleFloat_20s_linear_infinite]"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        ></div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Exciting Products Are On The Way
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed"
        >
          We’re crafting something extraordinary behind the scenes. Be the first to experience it when it launches.
        </motion.p>
        <motion.button
          variants={fadeUp}
          className="bg-emerald-500 px-8 py-3 rounded-lg font-semibold text-white shadow-lg duration-300 hover:scale-105 hover:shadow-emerald-500/50"
        >
          Notify Me
        </motion.button>
      </motion.div>

      {/* Animations Keyframes */}
      <style jsx>{`
        /* Text fade-in upward */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        /* Floating Glows */
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        .animate-[float_12s_ease-in-out_infinite] { animation: float 12s ease-in-out infinite; }
        .animate-[float_15s_ease-in-out_infinite] { animation: float 15s ease-in-out infinite; }
        .animate-[float_18s_ease-in-out_infinite] { animation: float 18s ease-in-out infinite; }

        /* Abstract Tiles float + rotate */
        @keyframes tileFloat1 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        .animate-[tileFloat1_8s_ease-in-out_infinite] { animation: tileFloat1 8s ease-in-out infinite; }

        @keyframes tileFloat2 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-12deg); }
        }
        .animate-[tileFloat2_10s_ease-in-out_infinite] { animation: tileFloat2 10s ease-in-out infinite; }

        @keyframes tileFloat3 {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        .animate-[tileFloat3_12s_ease-in-out_infinite] { animation: tileFloat3 12s ease-in-out infinite; }

        /* Particle float animation */
        @keyframes particleFloat {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-40px); opacity: 0.6; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
        .animate-[particleFloat_20s_linear_infinite] { animation: particleFloat 20s linear infinite; }
      `}</style>
    </section>
  );
}