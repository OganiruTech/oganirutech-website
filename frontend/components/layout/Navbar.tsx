"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "../Button";

const navLinks = [
  { label: "Home", href: "/"},
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
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
      <div className="mx-auto lg:px-15 px-6 py-4 flex items-center justify-between">

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
        <nav className="hidden md:flex items-center lg:gap-20 gap-8">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Navbar Button */}
        <Button
          children="Build With Us"
          href="/contact"
          display="hidden md:flex"
        />

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
        <div className={`md:hidden absolute top-full left-0 w-full bg-navy border-t border-white/10 px-6 py-6 flex flex-col gap-5 transition-all duration-300 origin-top ${
          menuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}>
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          
          <Button
            children="Build With Us"
            href="/contact"
            onClick={() => setMenuOpen(false)}
            display="flex"
            paddingY="py-3"
          />
        </div>
    </header>
  );
}