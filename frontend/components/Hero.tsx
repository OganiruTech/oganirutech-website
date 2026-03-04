"use client"
import Button from "./Button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Oganiru Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Building the Digital Future Africa Deserves
          </h1>
          <p className="mt-6 mb-6 text-lg md:text-xl text-gray-200">
            We envision a continent powered by scalable technology, resilient systems, and bold innovation — shaping industries locally and influencing markets globally.
          </p>

          <div className="flex gap-6">
            <Button text="Build With Us"/>
            <Button
              text="Our Products"
              bgColor="bg-transparent"
              hoverBgColor="hover:bg-white/30"
              className="
                border
                border-gray/30
                hover:border-white
              "
            />
          </div>
          
        </div>
      </div>

      {/* Angled Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        {/* SUBTLE GRID BACKGROUND */}
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