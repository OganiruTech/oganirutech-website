"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0B1C2D] to-[#081520] text-gray-300 pt-20 pb-12 px-6 sm:px-8 md:px-12 overflow-hidden">

      {/* Emerald Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>

      {/* Subtle Glow */}
      <div className="absolute -top-40 left-1/3 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

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
            {["T", "L", "G"].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-emerald-500/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3">
            {["About", "Products", "Careers", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300"
                >
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
            {["Blog", "Documentation", "Support", "Privacy Policy"].map(
              (link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Stay Updated
          </h4>
          <p className="text-gray-400 mb-5">
            Get product updates and company news.
          </p>

          {/* Responsive Form */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white/10 border border-white/10 focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400"
            />

            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none text-white font-medium transition-all duration-300 hover:scale-[1.03]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 mt-16 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Oganiru Technologies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;