"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "../Button";
import Logo from "../brand/Logo";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#process" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation — the old menu stayed open behind the new
  // page. Adjusted during render rather than in an effect, so it never causes
  // a cascading re-render (react-hooks/set-state-in-effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const close = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape to close + lock background scroll while the sheet is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, close]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <header
      data-surface="dark"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-navy-900/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-18 items-center justify-between gap-6 py-4">
        <Logo tone="dark" />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-navy-200 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-emerald-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive(link.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm" withArrow>
            Build with us
          </Button>
        </div>

        {/* Mobile toggle — 44px target, properly labelled */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => (menuOpen ? close() : setMenuOpen(true))}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile sheet — height + opacity on the panel, staggered fade-up on
          the items. Exits in reverse rather than snapping shut. */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
            className="overflow-hidden border-t border-white/10 bg-navy-900/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="shell py-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: reduce ? 0 : -8 },
                    }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/[0.07] last:border-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex min-h-13 items-center text-base font-medium transition-colors duration-200 ${
                        isActive(link.href) ? "text-emerald-300" : "text-navy-100 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: reduce ? 0 : -8 },
                }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  href="/contact"
                  size="lg"
                  withArrow
                  className="mt-6 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Build with us
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
