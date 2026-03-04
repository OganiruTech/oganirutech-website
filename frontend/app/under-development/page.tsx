"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const UnderDevelopment = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1C2D] to-[#081520] text-white flex items-center px-6 md:px-12 py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Illustration */}
        <div className="relative w-full h-[300px] md:h-[450px]">
          <Image
            src="/under-development2.svg"
            alt="Under development illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-xl">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            This Page is <span className="text-emerald-400">Under Development</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            We’re currently designing and refining this experience.
            It’s coming soon — crafted with precision and intention.
          </p>

          <button
            onClick={() => router.push("/")}
            className="relative group overflow-hidden bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Back to Home</span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;