"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ContactPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Future backend integration
    console.log({ email, message });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#081520] via-[#0B1C2D] to-[#050C15] text-white overflow-hidden py-28 px-6 md:px-12">

      {/* Ambient Glow */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]"
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto"
      >

        {/* HEADER */}
        <motion.div
          variants={item}
          className="text-center max-w-3xl mx-auto mb-20"
        >
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
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-xl space-y-6"
          >

            <h3 className="text-2xl font-semibold mb-4">
              Send us a message
            </h3>

            <textarea
              required
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/10
              focus:outline-none
              focus:border-emerald-400
              text-white
              placeholder-gray-400
              resize-none
              "
            />

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="
              w-full
              px-4
              py-3
              rounded-lg
              bg-white/10
              border
              border-white/10
              focus:outline-none
              focus:border-emerald-400
              text-white
              placeholder-gray-400
              "
            />

            <button
              type="submit"
              className="
              relative
              overflow-hidden
              bg-emerald-600
              px-8
              py-3
              rounded-lg
              font-semibold
              transition-transform
              hover:scale-[1.04]
              group
              "
            >

              <span className="relative z-10">Send Message</span>

              <span
                className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                -translate-x-full
                group-hover:translate-x-full
                transition-transform
                duration-700
                "
              ></span>

            </button>

          </motion.form>

          {/* RIGHT SIDE INFO */}
          <motion.div
            variants={item}
            className="space-y-12"
          >

            {/* BUSINESS HOURS */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl">

              <h3 className="text-xl font-semibold mb-4">
                Business Hours
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Monday – Friday: 9:00 AM – 6:00 PM (WAT)
              </p>

              <p className="text-gray-300">
                Saturday: 10:00 AM – 3:00 PM
              </p>

              <p className="text-gray-300">
                Sunday: Closed
              </p>

              <div className="mt-4 text-emerald-400">
                Typical response time: within 24 hours
              </div>

            </div>

            {/* SOCIAL MEDIA */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl">

              <h3 className="text-xl font-semibold mb-6">
                Connect With Us
              </h3>

              <div className="flex gap-5">

                {["Twitter", "LinkedIn", "GitHub"].map((platform, i) => (
                  <div
                    key={i}
                    className="
                    w-12
                    h-12
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-white/5
                    hover:bg-emerald-500/20
                    transition
                    hover:scale-110
                    cursor-pointer
                    "
                  >
                    {platform[0]}
                  </div>
                ))}

              </div>

              <p className="text-gray-400 mt-6">
                Follow us for product updates, engineering insights,
                and company announcements.
              </p>

            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}