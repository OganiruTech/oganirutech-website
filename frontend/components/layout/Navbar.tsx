"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Build With Us", href: "/build-with-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll(); // check immediately on mount

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-emerald-700 font-extrabold text-4xl tracking-tight">O</span>
          <div className="flex-col">
            <div className="text-white font-bold text-xs tracking-widest uppercase">
              OGANIRU
            </div>
            <div className="text-white font-bold text-xs tracking-widest uppercase">
              TECHNOLOGIES
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/build-with-us"
            className="bg-emerald text-white text-sm font-semibold px-5 py-2 rounded-sm tracking-wide hover:bg-emerald-light transition-colors duration-200"
          >
            Build With Us
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/build-with-us"
            onClick={() => setMenuOpen(false)}
            className="bg-emerald text-white text-sm font-semibold px-5 py-3 rounded-sm tracking-wide text-center hover:bg-emerald-light transition-colors duration-200"
          >
            Build With Us
          </Link>
        </div>
      )}
    </header>
  );
}