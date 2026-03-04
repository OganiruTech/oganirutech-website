"use client";

import React, { useEffect, useRef, useState } from "react";

const careers = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-Time",
    description:
      "Work on building responsive, dynamic interfaces for Tailor's Clutch and other products.",
  },
  {
    title: "Backend Engineer",
    location: "Aba, Nigeria",
    type: "Full-Time",
    description:
      "Develop and maintain APIs, database schemas, and server-side logic to power our applications.",
  },
  {
    title: "Product Designer",
    location: "Hybrid",
    type: "Contract",
    description:
      "Design intuitive user experiences and visuals across web and mobile platforms.",
  },
];

const CareerSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* SUBTLE GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* STRIPE STYLE FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-500/40 rounded-full animate-floatParticle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* HEADING */}
      <div
        className={`relative max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
          Build the Future with{" "}
          <span className="text-emerald-600">Oganiru Technologies</span>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          We design and build transformative digital products that empower industries.
        </p>
      </div>

      {/* JOB LISTINGS WITH GLASS MORPHISM */}
      <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-24">
        {careers.map((job, index) => (
          <div
            key={index}
            className={`group relative backdrop-blur-xl bg-white/60 border border-white/40 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 rounded-t-2xl"></div>

            <h3 className="text-2xl font-semibold text-blue-950 mb-3">
              {job.title}
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              {job.location} • {job.type}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {job.description}
            </p>

            {/* PREMIUM BUTTON */}
            <button className="relative overflow-hidden bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:bg-emerald-700">
              <span className="relative z-10">Apply Now</span>

              {/* SHIMMER EFFECT */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            </button>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div
        className={`relative text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-gray-600 mb-6 text-lg">
          Don't see your role? We're always open to exceptional talent.
        </p>

        <button className="relative overflow-hidden bg-blue-950 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <span className="relative z-10">View All Careers</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></span>
        </button>
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
};

export default CareerSection;